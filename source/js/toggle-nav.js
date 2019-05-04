var menu = document.querySelector('.navigation-list');
var navToggle = document.querySelector('.header-navigation__trigger');
var navButton = document.querySelector('.header-navigation__trigger-pic');
var header = document.querySelector('.header');
navToggle.addEventListener('click', function() {
  if (menu.classList.contains('navigation-list--closed')) {
    menu.classList.remove('navigation-list--closed');
    menu.classList.add('navigation-list--active');
    header.classList.remove('header--closed');
    header.classList.add('header--open');

    navButton.classList.remove('header-navigation__trigger-pic--open');
    navButton.classList.add('header-navigation__trigger-pic--close');
  } else {
    menu.classList.add('navigation-list--closed');
    menu.classList.remove('navigation-list--active');
    header.classList.remove('header--open');
    header.classList.add('header--close');
    navButton.classList.remove('header-navigation__trigger-pic--close');
    navButton.classList.add('header-navigation__trigger-pic--open');
  }
});
