/**
 * Copyright 2017 by Avid Technology, Inc.
 */

import appConfig from '../../package.json';
import ViewWrapper from './ViewWrapper';

const ViewConfig = {
    config: {
        menuName: appConfig.name,
        singleton: false,
        useLegacyStyles: false,
        icon: `/plugins/${appConfig.name}/images/icon.svg`,

    },
    factory: () => {
        return new ViewWrapper();
    },
    _proto: new ViewWrapper(),
};

export default ViewConfig;
