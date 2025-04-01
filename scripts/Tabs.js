const rootSelector = '[data-js-tabs]'


class Tabs {
    selectors = {
        root: rootSelector,
        button: '[data-js-tabs-button]',
        content: '[data-js-tabs-content]',
        contentAbove: '[data-js-tabs-content-above]',
    }

    stateClasses = {
        isActive: 'is-active',
    }

    stateAttributes = {
        ariaSelected: 'aria-selected',
        tabIndex: 'tabindex',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)
        this.contentAboveElements = this.rootElement.querySelectorAll(this.selectors.contentAbove)
        this.state = {
            activeTabIndex: [...this.buttonElements].findIndex((buttonElement) => {
                buttonElement.classList.contains(this.stateClasses.isActive)
            })
        }
        this.limitTabIndex = this.buttonElements.lenght - 1
        this.bindEvents()
    }

    updateUI() {
        const {activeTabIndex} = this.state

        this.buttonElements.forEach((buttonElement, index) => {
            const isActive = index === activeTabIndex
            buttonElement.classList.toggle(this.stateClasses.isActive, isActive)

            buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString)
            buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? '0' : '-1')
        })

        this.contentElements.forEach((contentElement, index) => {
            const isActive = index === activeTabIndex
            contentElement.classList.toggle(this.stateClasses.isActive, isActive)
        })

        this.contentAboveElements.forEach((contentElement, index) => {
            const isActive = index === activeTabIndex
            contentElement.classList.toggle(this.stateClasses.isActive, isActive)
        })


    }

    activateTab(newTabIndex) {
        this.state.activeTabIndex = newTabIndex
        this.buttonElements[newTabIndex].focus()
    }

    previousTab = () => {
        const newTabIndex = this.state.activeTabIndex === 0 
        ? this.limitTabIndex 
        : this.state.activeTabIndex - 1

        console.log(this.newTabIndex)

        this.activateTab(newTabIndex)
    }

    nextTab = () => {
        const newTabIndex = this.state.activeTabIndex === this.limitTabIndex 
        ? 0 
        : this.state.activeTabIndex + 1

        this.activateTab(newTabIndex)
    }

    firstTab = () => {
        activateTab(0)
    }
    lastTab = () => {
        activateTab(this.limitTabIndex)
    }

    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex
        this.updateUI()
    }

    onKeyDown = (event) => {
        const {code, metaKey} = event

        const action = {
            ArrowLeft: this.previousTab,
            ArrowRight: this.nextTab,
            Home: this.firstTab,
            End: this.lastTab,
        }[code]

        const isMacHomeKey = metaKey && code === 'ArrowLeft'
        if (isMacHomeKey) {
            this.firstTab()
            this.updateUI()
            return
        }

        const isMacEndKey = metaKey && code === 'ArrowRight'
        if (isMacHomeKey) {
            this.lastTab()
            this.updateUI()
            return
        }

        if (action) {
            action()
            this.updateUI()
        }
        
    }

    headerHeight = document.querySelector('[data-js-header]').offsetHeight

    bindEvents() {
        this.buttonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener('click', (e) => {
                this.onButtonClick(index)
                let buttonElementPosition = e.target.offsetTop - this.headerHeight
                window.scrollTo({top: buttonElementPosition - 20})
            })
        })
        this.rootElement.addEventListener('keydown', this.onKeyDown)
    }
}

class TabsCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Tabs(element)
        })
    }
}

export default TabsCollection