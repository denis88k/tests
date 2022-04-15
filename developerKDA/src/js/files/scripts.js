const btn = document.querySelector('.menu__btn');
const navLinks = document.querySelector('.nav-links');
const navItem = document.querySelectorAll('.nav__item');
const navLink = document.querySelectorAll('.nav__link');
const main = document.querySelector('.main');


btn.addEventListener('click', () => {
   btn.classList.toggle('menu__btn-active');
   navLinks.classList.toggle('nav-links-active');
   document.body.classList.toggle('lock');
   navLink.forEach((e) => {
      e.classList.remove('nav__link-active');
   });
   main.classList.toggle('main-bg');
});

navItem.forEach((item) => {

   item.addEventListener('click', (e) => {
      e.preventDefault();
      const eTarget = e.target;
      // console.log(eTarget);
      if (eTarget.classList.contains('nav__link-active')) {
         eTarget.classList.remove('nav__link-active');
      } else {
         navLink.forEach((e) => {
            e.classList.remove('nav__link-active');
         });
         eTarget.classList.add('nav__link-active')
      }
   })
})

main.addEventListener('click', () => {
   navLink.forEach((e) => {
      e.classList.remove('nav__link-active');
   });
   document.body.classList.remove('lock');
   btn.classList.remove('menu__btn-active');
   navLinks.classList.remove('nav-links-active');
   main.classList.remove('main-bg');
});

//slider
let swiper = new Swiper('.swiper', {
   slidesPerView: "auto",
   centeredSlides: true,
   loop: true,
   autoplay: {
      delay: 5000,
   },
   pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
   },
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
});


//inputMask
const form = document.querySelector('.form__request');
const telSelector = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask('+7 (999) 999-99-99');
inputMask.mask(telSelector);

const validation = new JustValidate('.form');

validation
   .addField('.input-name', [
      {
         rule: 'minLength',
         value: 3,
      },
      {
         rule: 'maxLength',
         value: 30,
      },
      {
         rule: 'required',
         value: true,
         errorMessage: 'Введите имя!'
      }
   ])
   .addField('.input-tel', [
      {
         rule: 'required',
         value: true,
         errorMessage: 'Телефон обязателен!',
      },
      {
         rule: 'function',
         validator: function () {
            const phone = telSelector.inputmask.unmaskedvalue();
            return phone.length === 10;
         },
         errorMessage: 'Введите корректный телефон',
      },
   ])
   .onSuccess((event) => {
      console.log('Validation passes and form submitted', event);

      event.target.reset();
   });


