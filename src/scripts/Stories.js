class Stories  {
    currentStory = 0 

    selectors = {
        root: '[data-js-header-stories]',
        stories: '[data-js-stories]',
        storiesPopup: '[data-js-stories-popup]',
        closeButton: '[data-js-stories-close-button]',
        prevButton: '[data-js-stories-button-prev]',
        nextButton: '[data-js-stories-button-next]',
        progressBar: '[data-js-stories-progress-bar]',
        image: '[data-js-stories-image]',
        storiesPopupImage: '[data-js-stories-popup-image]',
        contentWrapper: '[data-js-stories-content-wrapper]',
    }

    stateClasses = {
        isActive: 'is-active',
        next: 'next',
        isLock: 'is-lock',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        this.storiesElement = this.rootElement.querySelectorAll(this.selectors.stories)
        this.storiesPopupElement = this.rootElement.querySelector(this.selectors.storiesPopup)
        this.closeButtonElement = this.rootElement.querySelector(this.selectors.closeButton)
        this.prevButtonElement = this.rootElement.querySelector(this.selectors.prevButton)
        this.nextButtonElement = this.rootElement.querySelector(this.selectors.nextButton)
        this.progressBarElements = this.rootElement.querySelectorAll(this.selectors.progressBar)
        this.imagesElement = this.rootElement.querySelectorAll(this.selectors.image)
        this.contentWrapperElements = this.rootElement.querySelectorAll(this.selectors.contentWrapper)
        this.storiesPopupImageElement = this.rootElement.querySelector(this.selectors.storiesPopupImage)
        this.timer = null
        this.bindEvents()
    }


    toggleClassActive = (elem) => {
        elem.forEach((elem, index) => {
            if (elem.classList.contains(this.stateClasses.isActive)
                &&
                this.currentStory <= this.contentWrapperElements.length - 1

            ) {
                elem.classList.remove(this.stateClasses.isActive)
            } else if (index === this.currentStory) {
                elem.classList.add(this.stateClasses.isActive)
            }
        })
    }

    toggleClass = () => {
        this.toggleClassActive(this.contentWrapperElements)
        this.toggleClassActive(this.progressBarElements)
    }

    changeSlide = () => {
        if (this.timer) clearInterval(this.timer)
        
        let duration = 2000,
            interval = 10,
            step =  100 / (duration / interval),
            width = 0
        this.timer = setInterval(() => {
            let activeBarChild = this.rootElement.querySelector('.stories-popup__progress-bar.is-active').firstElementChild
            width += step;
            activeBarChild.style.width = width + '%';

            if (activeBarChild.style.width == '100%') {
                if (this.currentStory < this.contentWrapperElements.length - 1) {
                    this.currentStory++
                } else {
                    clearInterval(this.timer)
                    return
                    
                }
                width = 0
                this.toggleClass()

                if (this.currentStory == this.progressBarElements.length) {
                    clearInterval(this.timer)
                    return
                }
                
            }

        }, interval)
        
    }

    openNextSlide = () => {
        if ( this.currentStory < this.contentWrapperElements.length - 1) {
            let activeBarChild = this.rootElement.querySelector('.stories-popup__progress-bar.is-active').firstElementChild
            activeBarChild.style.width = '100%'
            this.currentStory++
            this.toggleClass()
            this.changeSlide()
        }
    }
    
    openPrevSlide = () => {
        if ( this.currentStory > 0 && this.currentStory <= this.contentWrapperElements.length) {
            let activeBarChild = this.rootElement.querySelector('.stories-popup__progress-bar.is-active').firstElementChild
            activeBarChild.style.width = '0%'
            this.currentStory--
            this.toggleClass()
            this.changeSlide()
        }
    }

    openStories = () => {
        this.storiesPopupElement.classList.toggle(this.stateClasses.isActive)
        this.changeSlide()
    }

    closeStories = () => {
        this.storiesPopupElement.classList.remove(this.stateClasses.isActive)
        clearInterval(this.timer) 
        this.currentStory = 0
        this.toggleClass()
        this.progressBarElements.forEach((bar,index) => {
            bar.firstElementChild.style.width = '0'
            if (!index == this.currentStory) {
                bar.classList.remove(this.stateClasses.isActive)
            }
        })
        this.contentWrapperElements.forEach((elem,index) => {
            if (!index == this.currentStory) {
                elem.classList.remove(this.stateClasses.isActive)
            }
        })
    }

    bindEvents() {
        this.storiesElement.forEach((story, index) => {
            story.addEventListener('click', this.openStories)
        })
        this.closeButtonElement.addEventListener('click', this.closeStories)
        this.prevButtonElement.addEventListener('click', this.openPrevSlide)
        this.nextButtonElement.addEventListener('click', this.openNextSlide)
    }
}

export default Stories
