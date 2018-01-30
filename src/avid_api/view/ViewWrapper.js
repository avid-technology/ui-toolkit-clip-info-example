/**
 * Copyright 2017 by Avid Technology, Inc.
 */

import ApplicationContainer from '../../app/index';

// Need to be bcs it is used in main App :
export default class ViewWrapper {
    createElement() {
        this.el = document.createElement('div');
        this.el.style.cssText = 'width: 100%; height: 100%;';
        return Promise.resolve(this.el);
    }

    onInit() {
        this.pane = new ApplicationContainer({
            contextCallback: function (context) {
                this.trigger('contextChange', context);
            }.bind(this),
        });
    }

    onRender() {
        this.el.appendChild(this.pane.returnElement());
    }

    onDestroy(data) {}

    onRevalidate(data) {}

    onFocusLost() {}

    onFocusGained(event) {}

    enqueueLoading(promise) {}

    name(newName) {return '';}

    isShown() {return true;}

    isVisible() {return true;}

    closeAllowed() {return true;}

    destroy() {}

    getMinHeight() {return 50;}

    getMinWidth() {return 50;}

    get publicScope() {
        return {};
    }
}
