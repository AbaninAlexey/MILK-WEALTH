class Header {
    selectors = {
        root: '[data-js-header]',
        overlay: '[data-js-overlay]',
        button: '[data-js-burger-button]',
        headerBody: '[data-js-header-body]',
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        this.overlayElement = this.rootElement.querySelector(this.selectors.overlay)
        this.buttonElement = this.rootElement.querySelector(this.selectors.button)
        this.headerBodyElement = this.rootElement.querySelector(this.selectors.headerBody)
        this.bindEvents()
    }

    showMenu = () => {
        this.overlayElement.classList.toggle(this.stateClasses.isActive)
        this.buttonElement.classList.toggle(this.stateClasses.isActive)
        this.headerBodyElement.classList.toggle(this.stateClasses.isActive)
        document.documentElement.classList.toggle(this.stateClasses.isLock)
    }

    bindEvents() {
        this.buttonElement.addEventListener('click',  this.showMenu)
    }
}

export default Header


