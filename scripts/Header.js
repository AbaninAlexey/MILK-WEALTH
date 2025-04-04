class Header {
    selectors = {
        root: '[data-js-header]',
        overlay: '[data-js-overlay]',
        button: '[data-js-burger-button]',
        headerBody: '[data-js-header-body]',
        headerButton: '[data-js-header-button]',
        headerLogo: '[data-js-header-logo]',
        headerLink: '[data-js-header-link]',
        headerStories: '[data-js-header-stories]',
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
        inTopPosition: 'in-top-position',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        this.overlayElement = this.rootElement.querySelector(this.selectors.overlay)
        this.buttonElement = this.rootElement.querySelector(this.selectors.button)
        this.headerBodyElement = this.rootElement.querySelector(this.selectors.headerBody)
        this.headerButtonElement = this.rootElement.querySelector(this.selectors.headerButton)
        this.headerLogoElement = this.rootElement.querySelector(this.selectors.headerLogo)
        this.headerLinkElement = this.rootElement.querySelectorAll(this.selectors.headerLink)
        this.headerStoriesElement = this.rootElement.querySelector(this.selectors.headerStories)
        this.bindEvents()
    }

    showMenu = () => {
        this.overlayElement.classList.toggle(this.stateClasses.isActive)
        this.buttonElement.classList.toggle(this.stateClasses.isActive)
        this.headerBodyElement.classList.toggle(this.stateClasses.isActive)
        document.documentElement.classList.toggle(this.stateClasses.isLock)
        if (document.querySelector('[data-js-page]')) {
            if (window.scrollY !== 0) {
                this.removeInTopPositionClass()
            } else {
                this.toggleInTopPositionClass()
            }
        }

    }

    removeInTopPositionClass = () => {
        this.headerLogoElement?.classList.remove(this.stateClasses.inTopPosition)
        this.headerButtonElement?.classList.remove(this.stateClasses.inTopPosition)
        this.headerBodyElement?.classList.remove(this.stateClasses.inTopPosition)
        this.headerBodyElement?.classList.remove(this.stateClasses.inTopPosition)
        this.headerStoriesElement?.classList.remove(this.stateClasses.inTopPosition)
        this.headerLinkElement.forEach( (link) => {
                link?.classList?.remove(this.stateClasses.inTopPosition)
            })
        this.buttonElement?.classList.remove(this.stateClasses.inTopPosition)
    }

    toggleInTopPositionClass = () => {
        this.headerLogoElement?.classList.toggle(this.stateClasses.inTopPosition)
        this.headerButtonElement?.classList.toggle(this.stateClasses.inTopPosition)
        this.headerBodyElement?.classList.toggle(this.stateClasses.inTopPosition)
        this.headerStoriesElement?.classList.toggle(this.stateClasses.inTopPosition)
        this.headerLinkElement.forEach( (link) => {
                link?.classList.toggle(this.stateClasses.inTopPosition)
            })
        this.buttonElement?.classList.toggle(this.stateClasses.inTopPosition)
    }

    scrollPage = () => {
        if (window.scrollY !== 0) {
            this.removeInTopPositionClass() 
        } else {
            this.toggleInTopPositionClass()
        }

    }

    bindEvents() {
        this.buttonElement.addEventListener('click',  this.showMenu)
        if (document.querySelector('[data-js-page]')) {
            document.addEventListener('scroll', this.scrollPage)
        }
    
    }
}

export default Header


