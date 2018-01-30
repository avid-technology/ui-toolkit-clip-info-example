/**
 * Copyright 2017 by Avid Technology, Inc.
 */

import appConfig from '../../package.json';
import EntryWrapper from './EntryWrapper';

export default {
    factory: (config) => {
        return new EntryWrapper(config);
    },
    config: {
        breakpoints: {
            0: 'narrow',
            250: 'small',
            705: 'medium',
            945: 'wide',
            1350: 'extrawide',
        },
        dockable: false,
        timeline: false,
        inspector: false,
        inspectorConfig: {
            playerEditModeOn: false,
        },
        isMultiInstance: true,
        color: 'rgb(232, 108, 49)',
        unrenderOnHide: false,
    },
    menuIcon: {
        group: 200,
        orderInGroup: 202,
        title: appConfig.name,
        icon: `/plugins/${appConfig.name}/images/icon.svg`,
        gradient: ['#ba2f82', '#cf4c85'],
    },
};
