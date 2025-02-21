
import Header from "./Header.js";

new Header()

$(document).ready(function(){
    $('.stories-slider').owlCarousel({
        responsive: {
          360: {
            margin: 0,
            items: 4,
          },
          639: {
            items: 6,
            margin: 20,
          },
        },
        nav: true,
        dots: false,
        'stageClass': 'stories-slider__stage',
        'stageOuterClass': 'stories-slider__outer',
    });
  });


  $(document).ready(function(){
    $('.cloud-slider').owlCarousel({
        items: 1,
        nav: false,
        dots: true,
    });
  });

  $(document).ready(function(){
    $('.reviews__slider').owlCarousel({
      responsive: {
        360: {
          margin: 0,
          items: 1,
          margin: 30,
        },
        640: {
          items: 2,
          margin: 30,
        },
      },
        nav: false,
        dots: false,
        loop: true,
        autoWidth: true,
        stagePadding: 362,
    });
  });

