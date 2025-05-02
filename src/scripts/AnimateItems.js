const rootSelector = '[data-js-animate-root]'

class AnimateItems {
    selectors = {
        rootElement: rootSelector,
        animateItem: '[data-js-animate-item]'
    }

    stateClasses = {
        animate: 'animate',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.rootElement)
        this.animateItems = this.rootElement.querySelectorAll(this.selectors.animateItem)
        this.bindEvents()
    }

    options = {
        root: this.rootElement,
        threshold: 0.3
    }

    callback = (entries) => {
        entries.forEach((entrie) => {
            if (entrie.isIntersecting) {
                entrie.target.classList.add(this.stateClasses.animate)
            }
        })
    }

    observer = new IntersectionObserver(this.callback, this.options)

    animatingItems = () => {
        this.animateItems.forEach((item) => {
            this.observer.observe(item)
        })
    }


    bindEvents() {
        this.animatingItems()
    }
}

class AnimateItemsCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new AnimateItems(element)
        })
    }
}

export default AnimateItemsCollection