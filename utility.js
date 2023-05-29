const menuBtn = document.querySelector(".fa-bars");
const menu = document.querySelector(".menu");
const displayMenu = () => {
  menu.classList.toggle("display");
};
menuBtn.addEventListener("click", displayMenu);

changeIcon = (icon) => icon.classList.toggle("fa-times");
