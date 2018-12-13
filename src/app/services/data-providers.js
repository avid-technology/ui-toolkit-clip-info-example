import request, {GET} from './requests';

const serviceRoots = '/apis/avid.ctms.registry;version=0;realm=global/serviceroots';

const getServiceRoots = () => {
    return request(GET, serviceRoots)
        .then(response => {
            return Promise.resolve(response.data);
        })
        .catch(err => console.warn(err));
};

const getAssetData = (systemId, mobId) => {
    // First you need to look what file systems are available
    return getServiceRoots().then(roots => {
        // For given system find method responsible for asset details
        const assetInfo = roots.resources['aa:asset-by-id'];
        let target;

        assetInfo.forEach(asset => {
            // Find one matching our system
            const found = asset.systems.find(system => system.systemID === systemId);
            if (found) {
                target = asset;
            }
        });

        let requestUrl = target.href;

        requestUrl = requestUrl.replace('{id}', mobId);
        const info = request(GET, requestUrl);
        // Hardcoded for Pinterplay PAM. Thumb
        const thumbMailURL = request(GET, `/apis/avid.pam;version=2;realm=${systemId}/assets/${mobId}/thumbs`);
        return Promise.all([info, thumbMailURL]).then((data) => {
            const result = Object.assign({}, {'base': data[0].data.base}, {'common': data[0].data.common}, {'thumbnail': data[1].data.thumbnail});
            return Promise.resolve(result);
        });
    });
};

const exportAssetData = (assetInfo) => new Promise((resolve, reject) => {
    const systemId = assetInfo.systemID;
    const mobId = assetInfo.id;

    getAssetData(systemId, mobId)
        .then(response => {
            const assetData = {globalId: mobId, base: response.base, common: response.common, thumbnail: response.thumbnail};
            resolve(assetData);
        })
        .catch(error => reject(error));
});

const getAsset = (event) => {
    event.preventDefault();

    if (!event.dataTransfer) {
        return Promise.reject(() => {
            console.warn('No event.dataTransfer');
        });
    }

    const typesSet = new Set(event.dataTransfer.types);
    let assetInfo = '';

    if (typesSet.has('text/x.avid.asset-list')) {
        // http://developer.avid.com/mcux_ui_plugin/clux-api/context.html
        assetInfo = JSON.parse(event.dataTransfer.getData('text/x.avid.asset-list+json'))[0];
    }
    if (assetInfo) {
        return Promise.resolve(exportAssetData(assetInfo));
    } else {
        return Promise.reject(error => console.warn(error));
    }
};

export default getAsset;
