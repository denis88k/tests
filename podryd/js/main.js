var menu = document.querySelector('.menu');
var menuInner = document.querySelector('.menu__inner');
var body = document.querySelector('body');
menu.addEventListener('click', () => {
   menu.classList.toggle('active');
   menuInner.classList.toggle('menu-active');
   body.classList.toggle('lock');
})

const sliders = document.querySelectorAll('.swiper');
sliders.forEach((el) => {
   var swiper = new Swiper(el, {
      loop: true,
      spaceBetween: 50,
      // autoplay: {
      //    delay: 5500,
      //    disableOnInteraction: false,
      // },
      pagination: {
         el: el.querySelector('.swiper-pagination'),
         clickable: true,
      },
      navigation: {
         nextEl: el.querySelector('.swiper-button-next'),
         prevEl: el.querySelector('.swiper-button-prev'),
      },
   });
})
