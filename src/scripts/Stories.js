class Stories {
    constructor(rootElement, modalIndex) {
        this.rootElement = rootElement
        this.modalIndex = modalIndex
        this.currentStory = 0
        this.timer = null

        this.selectors = {
            closeButton: '[data-js-stories-close-button]',
            prevButton: '[data-js-stories-button-prev]',
            nextButton: '[data-js-stories-button-next]',
            progressBar: '[data-js-stories-progress-bar]',
            contentWrapper: '[data-js-stories-content-wrapper]',
        }

        this.stateClasses = {
            isActive: 'is-active',
            isLock: 'is-lock',
        }

        this.contentWrapperElements = this.rootElement.querySelectorAll(this.selectors.contentWrapper)
        this.progressBarElements = this.rootElement.querySelectorAll(this.selectors.progressBar)
        this.closeButtonElement = this.rootElement.querySelector(this.selectors.closeButton)
        this.prevButtonElement = this.rootElement.querySelector(this.selectors.prevButton)
        this.nextButtonElement = this.rootElement.querySelector(this.selectors.nextButton)

        this.bindEvents()
        this.openStories()
    }

    bindEvents() {
        this.closeButtonElement.addEventListener('click', this.closeStories)
        this.prevButtonElement.addEventListener('click', this.openPrevSlide)
        this.nextButtonElement.addEventListener('click', this.openNextSlide)
    }

    openStories = () => {
        this.rootElement.classList.add(this.stateClasses.isActive)
        this.toggleClass()
        this.changeSlide()
        this.lockBody()
    }

    lockBody = () => {
        document.documentElement.classList.toggle(this.stateClasses.isLock,
            this.rootElement.classList.contains(this.stateClasses.isActive)
         )
    }

    closeStories = () => {
        clearInterval(this.timer)
        this.rootElement.classList.remove(this.stateClasses.isActive)
        this.currentStory = 0
        this.toggleClass()
        this.resetProgressBars()
        this.lockBody()
    }

    resetProgressBars() {
        this.progressBarElements.forEach(bar => {
            const fill = bar.querySelector('.stories-popup__progress-bar-fill')
            if (fill) fill.style.width = '0%'
        })
    }

    toggleClassActive = (elements) => {
        elements.forEach((element, index) => {
            element.classList.toggle(this.stateClasses.isActive, index === this.currentStory)
        })
    }

    toggleClass = () => {
        this.toggleClassActive(this.contentWrapperElements)
        this.toggleClassActive(this.progressBarElements)
    }

    changeSlide = () => {
        if (this.timer) clearInterval(this.timer)

        const duration = 2000
        const interval = 10
        const step = 100 / (duration / interval)
        let width = 0

        const activeBarChild = () =>
            this.rootElement.querySelector('.stories-popup__progress-bar.is-active')?.firstElementChild

        const animate = () => {
            const bar = activeBarChild()
            if (!bar) return

            width += step
            bar.style.width = width + '%'

            if (width >= 100) {
                clearInterval(this.timer)

                if (this.currentStory < this.contentWrapperElements.length - 1) {
                    this.currentStory++
                    this.toggleClass()
                    this.changeSlide()
                } else {
                    this.closeStories()
                    const nextModal = document.querySelectorAll('[data-js-stories-popup]')[this.modalIndex + 1]
                    if (nextModal) {
                        new Stories(nextModal, this.modalIndex + 1)
                    }
                }
            }
        }

        this.timer = setInterval(animate, interval)
    }

    openNextSlide = () => {
        if (this.currentStory < this.contentWrapperElements.length - 1) {
            const activeBarChild = this.rootElement.querySelector('.stories-popup__progress-bar.is-active')?.firstElementChild
            if (activeBarChild) activeBarChild.style.width = '100%'

            this.currentStory++
            this.toggleClass()
            this.changeSlide()
        } else {
            this.closeStories()
            const nextModal = document.querySelectorAll('[data-js-stories-popup]')[this.modalIndex + 1]
            if (nextModal) {
                new Stories(nextModal, this.modalIndex + 1)
            }
        }
    }

    openPrevSlide = () => {
        if (this.currentStory > 0) {
            const activeBarChild = this.rootElement.querySelector('.stories-popup__progress-bar.is-active')?.firstElementChild
            if (activeBarChild) activeBarChild.style.width = '0%'
    
            this.currentStory--
            this.toggleClass()
            this.changeSlide()
        } else {
            this.closeStories()
            const prevModal = document.querySelectorAll('[data-js-stories-popup]')[this.modalIndex - 1]
            if (prevModal) {
                new Stories(prevModal, this.modalIndex - 1)
            }
        }
    }
}

export default Stories
