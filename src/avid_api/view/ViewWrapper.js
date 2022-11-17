/**
 * Copyright 2022 by Avid Technology, Inc.
 */
/* eslint-disable */

import ApplicationContainer from '../../app/index';

// Need to be bcs it is used in main App :
export default class ViewWrapper {
    onInit(config, { dispatch }) {
        this.trigger = dispatch;
        this.state = config.state;
    }

    onRender({ domElement }) {
        this.el = document.createElement('div');
        this.el.style.cssText = 'width: 100%; height: 100%;';
        this.pane = new ApplicationContainer();
        this.pane.render(this.el);
        domElement.appendChild(this.el);
    }

    onDestroy(data) {}

    onRevalidate(data) {}

    onFocusLost() {}

    onFocusGained(event) {}

    enqueueLoading(promise) {}

    name(newName) {
        return '';
    }

    isShown() {
        return true;
    }

    isVisible() {
        return true;
    }

    closeAllowed() {
        return true;
    }

    destroy() {}

    getMinHeight() {
        return 50;
    }

    getMinWidth() {
        return 50;
    }

    getTitle() {
        return this.pane && this.pane.getTitle();
    }

    get publicScope() {
        return {
            getTitle: this.getTitle.bind(this),
        };
    }
}
