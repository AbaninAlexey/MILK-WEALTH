class Stories  {
    imagesArr = [] // Массив с изображениями из кружочков
    currentStory = 0 //Счетчик истории
    storyTimeout // Обьявление переменной таймера

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
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        this.storiesElement = this.rootElement.querySelectorAll(this.selectors.stories)
        this.storiesPopupElement = this.rootElement.querySelector(this.selectors.storiesPopup)
        this.closeButtonElement = this.rootElement.querySelector(this.selectors.closeButton)
        this.prevButtonElement = this.rootElement.querySelector(this.selectors.prevButton)
        this.nextButtonElement = this.rootElement.querySelector(this.selectors.nextButton)
        this.progressBarElement = this.rootElement.querySelector(this.selectors.progressBar)
        this.imagesElement = this.rootElement.querySelectorAll(this.selectors.image)
        this.storiesPopupImageElement = this.rootElement.querySelector(this.selectors.storiesPopupImage)
        this.bindEvents()
    }

    bindEvents() {
        this.pushImagesToArr()
        this.storiesElement.forEach( (element, index) => {
            element.addEventListener('click', () => {
                this.showStoriesPopup(index)
            })
        })
        this.closeButtonElement.addEventListener('click', this.closeStoriesPopup)
        this.prevButtonElement.addEventListener('click', this.prevStory)
        this.nextButtonElement.addEventListener('click', this.nextStory)
    }

    showStoriesPopup = (index) => {
        this.currentStory = index;
        this.storiesPopupElement.classList.toggle(this.stateClasses.isActive)
        document.documentElement.classList.toggle(this.stateClasses.isLock)
        this.loadStory()
    }

    closeStoriesPopup = () => {
        this.storiesPopupElement.classList.toggle(this.stateClasses.isActive)
        this.progressBarElement.style.transition = "none"; 
        this.progressBarElement.style.width = "0%"; 
        document.documentElement.classList.toggle(this.stateClasses.isLock)
        clearTimeout(this.storyTimeout) //Очистка таймера при закрытии

    }

    loadStory  = () => {
        clearTimeout(this.storyTimeout)
        this.progressBarElement.style.width = "0%"; //Сбросс прогрессбара
        this.storiesPopupImageElement.src = this.imagesArr[this.currentStory].src 

        setTimeout(() => {
            this.progressBarElement.style.width = "100%"; 
            this.progressBarElement.style.transition = "width 5s linear"; 
        }, 20);
    
        this.storyTimeout = setTimeout(() => {
            this.nextStory()
        }, 5000);

        this.progressBarElement.style.transition = "none";
    }

    nextStory = () => {
            if (this.currentStory < this.imagesArr.length - 1) {
                this.currentStory++
                this.loadStory()    
            } else {
                this.closeStoriesPopup()
            }
    }

    prevStory = () => {
        if (this.currentStory > 0) {
            this.currentStory--
            this.loadStory()    
        } else {
            this.closeStoriesPopup()
        }
}

    pushImagesToArr = () => {
        this.imagesElement.forEach((image) => {
            this.imagesArr.push(image)
        })
    }
}

export default Stories
