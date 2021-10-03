const menuLink = document.querySelectorAll('.nav .nav__link');
const burger = document.querySelector('#burger');
const sidebar = document.querySelector('#sidebar');

burger.addEventListener("click", function() {
  this.classList.toggle('burger--active')
  sidebar.classList.toggle('sidebar--active')
});


[...menuLink].forEach(link => {
  link.addEventListener('click', addActive)
})

function addActive(e) {
  e.preventDefault();
  if (!!document.querySelector('.nav .nav__link--active')) {
    document.querySelector('.nav .nav__link--active').classList.remove('nav__link--active');
  }
  e.target.classList.add('nav__link--active');
}
