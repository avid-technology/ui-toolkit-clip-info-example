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
        const isPAM = roots.systems.find(system => (system.systemID === systemId && system.systemType === 'interplay-pam'));
        let assetInfo;
        if(isPAM) {
            assetInfo = roots.resources['aa:asset-by-id'];
        } else {
            assetInfo = roots.resources['aa:asset'];
        }

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
        const info = () => request(GET, requestUrl).then(assetById => {
            return request(GET, assetById.data._links['aa:thumb'].href).then(thumbData => {
                const result = Object.assign({}, {'base': assetById.data.base}, {'common': assetById.data.common}, {'thumbnail': thumbData.data.thumbnail});
                return Promise.resolve(result);
            });
        });
        return info();
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
