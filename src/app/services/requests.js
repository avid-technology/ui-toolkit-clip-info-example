import request from 'axios';

export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const PATCH = 'PATCH';
export const DELETE = 'DELETE';

const service = (requestType, url, data = {}, config = {}) => {
    request.defaults.headers.common['Content-Type'] = 'application/hal+json';
    request.defaults.headers.common.Accept = 'application/hal+json;charset=UTF-8';
    request.defaults.credentials = 'same-origin';

    switch (requestType) {
        case GET: {
            return request.get(url, config);
        }
        case POST: {
            return request.post(url, data, config);
        }
        case PUT: {
            return request.put(url, data, config);
        }
        case PATCH: {
            return request.patch(url, data, config);
        }
        case DELETE: {
            return request.delete(url, config);
        }
        default: {
            throw new TypeError('No valid request type provided');
        }
    }
};

export default service;
