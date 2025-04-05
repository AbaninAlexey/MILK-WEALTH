const rootSelector = '[data-js-video-player]'

class VideoPlayer {
    selectors = {
        root: rootSelector,
        video: '[data-js-video-player-video]',
        panel: '[data-js-video-player-panel]',
        popup: '[data-js-video-player-popup]',
        playButton: '[data-js-video-player-play-button]',
        closeButton: '[data-js-video-player-close-button]',
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.videoElement = this.rootElement.querySelector(this.selectors.video);
        this.playButtonElement = this.rootElement.querySelector(this.selectors.playButton);
        this.closeButtonElement = this.rootElement.querySelector(this.selectors.closeButton);
        this.popupElement = this.rootElement.querySelector(this.selectors.popup);
        this.bindEvents();
      }

      showPopup = () => {
        this.popupElement.classList.add(this.stateClasses.isActive);
        document.documentElement.classList.add(this.stateClasses.isLock)
        this.videoElement.controls = true;
        this.playButtonElement.classList.add(this.stateClasses.isActive);
        this.videoElement.play()
      }

      closePopup = () => {
        this.popupElement.classList.remove(this.stateClasses.isActive);
        document.documentElement.classList.remove(this.stateClasses.isLock)
        this.videoElement.controls = false;
        this.playButtonElement.classList.remove(this.stateClasses.isActive);
        this.videoElement.pause();
      }

      bindEvents() {
        this.playButtonElement.addEventListener('click', this.showPopup);
        this.closeButtonElement?.addEventListener('click', this.closePopup);
      }

}

class VideoPlayerCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new VideoPlayer(element)
        })
    }
}

export default VideoPlayerCollection

