import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import Header from "./Header.js";
import TabsCollection from "./Tabs.js";
import VideoPlayerCollection from "./VideoPlayer.js";
import Stories from "./Stories.js";

new Header()
new TabsCollection()
new VideoPlayerCollection()
new Stories()

const thumbsSlider = new Swiper(".thumbs-slider", {
    direction: "horizontal", 
    slidesPerView: 3, 
    spaceBetween: 45,
    breakpoints: {
      630: {
          spaceBetween: 45,
      },

      320: {
        spaceBetween: 10,
      },
    },
});


  new Swiper('.pure-slider', {
    slidesPerView: 1,
    direction: 'horizontal',
    loop: true,
    navigation: {
      nextEl: '.custom-next',
      prevEl: '.custom-prev',
    },
    thumbs: {
      swiper: thumbsSlider,
    },
    
  });

  new Swiper('.reviews-slider', {
    slidesPerView: 3.3,
    breakpoints: {
      640: {
          slidesPerView: 3.2,
          spaceBetween: 30,
      },

      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },

    direction: 'horizontal',
    loop: true,
  });

  new Swiper('.stories-slider', {
    breakpoints: {
        630: {
          slidesPerView: 6,
          spaceBetween: 20,
        },

        320: {
            slidesPerView: 5,
            spaceBetween: 10,
          }, 
      },
    direction: 'horizontal',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  
  new Swiper('.cloud-slider', {
    slidesPerView: 1,
    direction: 'horizontal',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  new Swiper('.about-us-slider', {
    slidesPerView: 1,
    direction: 'horizontal',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });


