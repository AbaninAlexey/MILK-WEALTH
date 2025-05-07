class Stories  {
    imagesArr = [] 
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
                console.log(`Индекс удаления класса ${index}`)
            } else if (index === this.currentStory) {
                elem.classList.add(this.stateClasses.isActive)
                console.log(`Индекс добавления класса ${index}`)
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
                console.log(`Индекс интервала ${this.currentStory}`)

                if (this.currentStory == this.progressBarElements.length) {
                    clearInterval(this.timer)
                    return
                }
                
            }

        }, interval)
        
    }

    openNextSlide = () => {
        if ( this.currentStory < this.contentWrapperElements.length) {
            this.currentStory++
            this.toggleClass()
            this.changeSlide()
            console.log(`Вперед индекс ${this.currentStory}`)
        }
    }
    
    openPrevSlide = () => {
        if ( this.currentStory > 0 && this.currentStory <= this.contentWrapperElements.length) {
            this.currentStory--
            this.toggleClass()
            this.changeSlide()
            console.log(`Назад индекс ${this.currentStory}`)
        }
    }

    bindEvents() {
        this.changeSlide()
        this.prevButtonElement.addEventListener('click', this.openPrevSlide)
        this.nextButtonElement.addEventListener('click', this.openNextSlide)
    }
}

export default Stories
