const thumbsSlider = new Swiper(".thumbs-slider", {
    direction: "horizontal", 
    slidesPerView: 3, 
    spaceBetween: 45,
});


   new Swiper('.main-slider', {
    sliderRerView: 1,
    direction: 'horizontal',
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: thumbsSlider,
    },
    
  });


