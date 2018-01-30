import request, {GET} from './requests';

const serviceRoots = '/apis/avid.ctms.registry;version=0;realm=global/serviceroots';

const getServiceRoots = () => {
    return request(GET, serviceRoots)
        .then(response => {
            return Promise.resolve(response.data)
        })
        .catch(err => console.warn(err));

};

const getAssetData = (systemId, mobId) => {
    return getServiceRoots().then(roots => {

        let assetInfo = roots.resources["aa:asset-by-id"];
        let target = undefined;

        assetInfo.forEach(asset => {
            let found = asset.systems.find(system => system.systemID === systemId);
            if (found) target = asset;
        });

        let requestUrl = target.href;

        requestUrl = requestUrl.replace('{id}', mobId);
        const info = request(GET, requestUrl);
        const thumbMailURL = request(GET, `/apis/avid.pam;version=2;realm=${systemId}/assets/${mobId}/thumbs`);
        return Promise.all([info, thumbMailURL]).then((data) => {
            const result = Object.assign({}, {'base': data[0].data.base}, {'common': data[0].data.common}, {'thumbnail': data[1].data.thumbnail});
            return Promise.resolve(result);
        });
    })
};

const exportAssetData = (globalId) => new Promise((resolve, reject) => {
    const systemId = globalId.split(':')[1];
    const mobId = globalId.split(':')[3];

    getAssetData(systemId, mobId)
        .then(response => {
            let assetData = {globalId: globalId, base: response.base, common: response.common, thumbnail: response.thumbnail};
            resolve(assetData);
        })
        .catch(error => reject(error));
});

const getAsset = (event) => {
    event.preventDefault();

    if (!event.dataTransfer) {
        return;
    }

    let typesSet = new Set(event.dataTransfer.types);
    let globalId = "";

    if (typesSet.has("text/x.avid.asset-list")) {
        globalId = event.dataTransfer.getData("text/x.avid.asset-list");
    } else if (typesSet.has("text/x-avid.asset-list")) {
        globalId = event.dataTransfer.getData("text/x-avid.asset-list");
    }
    if (globalId) {
        return Promise.resolve(exportAssetData(globalId));
    } else {
        return Promise.reject(error => console.warn(error))
    }
};

export default getAsset;
