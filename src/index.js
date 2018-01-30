/**
 * Copyright 2017 by Avid Technology, Inc.
 */

import appConfig from './package.json';

import ViewConfig from './avid_api/view/ViewConfig';
import AppEntry from './avid_api/entry/EntryConfig';

export const avid = [
    {
        name: `${appConfig.name}-view`,
        provides: ['views'],
        create: () => ViewConfig,
    },
    {
        name: `${appConfig.name}-default-theme`,
        provides: ['theme'],
        create: () => ({
            key: 'dark',
            css: './style.css',
        }),
    },
    {
        name: appConfig.name,
        provides: ['apps'],
        create: () => AppEntry,
    },
];
