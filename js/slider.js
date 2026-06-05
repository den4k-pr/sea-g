document.addEventListener("DOMContentLoaded", function () {
  
  // Ініціалізація Слайдера 1 (Відео)
  const callsSliderEl = document.querySelector('.calls-swiper');
  let callsSwiperInstance = null;

  if (callsSliderEl) {
    callsSwiperInstance = new Swiper(callsSliderEl, {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 1.5, 
      autoHeight: true, 
      autoplay: {
        delay: 20000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.calls-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.calls-btn-next',
        prevEl: '.calls-btn-prev',
      },
      on: {
        // Якщо користувач перегортає слайд — зупиняємо всі активні відео в слайдері
        slideChange: function () {
          document.querySelectorAll('.calls-media-wrapper').forEach(wrapper => {
            const video = wrapper.querySelector('.calls-video-element');
            if (video && !video.paused) {
              video.pause();
              wrapper.classList.remove('is-playing');
            }
          });
        }
      }
    });

    // Логіка перемикання Картинка -> Відео при натисканні
    document.querySelectorAll('.calls-media-wrapper').forEach(wrapper => {
      wrapper.addEventListener('click', function () {
        const video = this.querySelector('.calls-video-element');
        
        if (video && !this.classList.contains('is-playing')) {
          // Зупиняємо автовідтворення слайдера, щоб він не зсувався під час перегляду
          if (callsSwiperInstance && callsSwiperInstance.autoplay) {
            callsSwiperInstance.autoplay.stop();
          }
          
          this.classList.add('is-playing');
          video.play();
        }
      });
    });
  }

  // Ініціалізація Слайдера 2 (Лише картинки)
  const resultsSliderEl = document.querySelector('.results-swiper');
  
  if (resultsSliderEl) {
    new Swiper(resultsSliderEl, {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 1.8,
      autoplay: { 
        delay: 20000, 
        disableOnInteraction: false 
      },
      pagination: { 
        el: '.results-pagination', 
        clickable: true 
      },
      navigation: { 
        nextEl: '.results-btn-next', 
        prevEl: '.results-btn-prev' 
      },
    });
  }

  // Ініціалізація Слайдера 3 (Картки-відгуки з картинками та відео)
  const rrSliderEl = document.querySelector('.rr-slider');
  let rrSwiperInstance = null;

  if (rrSliderEl) {
    rrSwiperInstance = new Swiper(rrSliderEl, {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 'auto', // Працює у парі з фіксованою шириною .swiper-slide в CSS
      centeredSlides: false,
      autoplay: { 
        delay: 20000, 
        disableOnInteraction: false 
      },
      pagination: { 
        el: '.rr-pagination', 
        clickable: true 
      },
      navigation: { 
        nextEl: '.rr-btn-next', 
        prevEl: '.rr-btn-prev' 
      },
      on: {
        // Якщо користувач перегортає слайд — зупиняємо відео
        slideChange: function () {
          document.querySelectorAll('.slide-video').forEach(video => {
            if (!video.paused) {
              video.pause();
              const wrapper = video.closest('.slide-media-wrapper');
              if (wrapper) wrapper.classList.remove('is-playing');
            }
          });
        }
      }
    });

    // Логіка кліку по відео/постеру для Слайдера 3
    document.querySelectorAll('.slide-media-wrapper').forEach(wrapper => {
      const video = wrapper.querySelector('.slide-video');
      
      if (video) {
        wrapper.addEventListener('click', function () {
          if (video.paused) {
            // 1. Зупиняємо всі інші відео перед запуском нового
            document.querySelectorAll('.slide-video').forEach(v => {
              v.pause();
              const vWrapper = v.closest('.slide-media-wrapper');
              if (vWrapper) vWrapper.classList.remove('is-playing');
            });

            // 2. Зупиняємо автовідтворення слайдера
            if (rrSwiperInstance && rrSwiperInstance.autoplay) {
              rrSwiperInstance.autoplay.stop();
            }
            
            // 3. Запускаємо поточне
            video.play();
            this.classList.add('is-playing');
          } else {
            // Якщо клікнути по працюючому відео, воно зупиниться
            video.pause();
            this.classList.remove('is-playing');
          }
        });
      }
    });
  }

});