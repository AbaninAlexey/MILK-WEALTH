const rootSelector = '[data-js-popup-root]';

class Popup {
    selectors = {
        rootSelector: rootSelector,
        openButton: '[data-js-popup-open-button]',
        closeButton: '[data-js-popup-close-button]',
        popupWindow: '[data-js-popup-window]',
    }


    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
    }

    constructor() {
        this.rootSelector = document.querySelector(this.selectors.rootSelector)
        this.popupWindow = this.rootSelector.querySelector(this.selectors.popupWindow)
        this.closeButton = this.rootSelector.querySelector(this.selectors.closeButton)
        this.openButton = this.rootSelector.querySelector(this.selectors.openButton)
        this.bindEvents()
    }

    clickOnOpenButton = () => {
        this.openButton.classList.toggle(this.stateClasses.isActive)
        this.popupWindow.classList.toggle(this.stateClasses.isActive)
        document.documentElement.classList.toggle(this.stateClasses.isLock)
    }

    clickOnCloseButton = () => {
        this.openButton.classList.toggle(this.stateClasses.isActive)
        this.popupWindow.classList.toggle(this.stateClasses.isActive)
        document.documentElement.classList.toggle(this.stateClasses.isLock)
    }


    bindEvents() {
        this.openButton.addEventListener('click', this.clickOnOpenButton)
        this.closeButton.addEventListener('click', this.clickOnCloseButton)
    }
}

class PopupCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Popup(element)
        })
    };
};

export default PopupCollection;