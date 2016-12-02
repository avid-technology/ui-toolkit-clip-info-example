var View = require('avid-mcux-view'),
    viewProto = require('./impl');

module.exports = {
    config: {
        menuName: 'Clip Info',
        singleton: true,
        icon: "./resources/custom_icon.png"        
    },
    factory: function () {
        return View.create(viewProto);
    },
    _proto: viewProto // for unit tests
};
