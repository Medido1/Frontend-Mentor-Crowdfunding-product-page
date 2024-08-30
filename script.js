const toggleMenuBtn = document.querySelector(".toggle_menu_btn");
const toggleBtnImg = document.querySelector(".toggle_btn");
const mobileMenu = document.querySelector(".mobile_menu");
const iconSrcs = 
[{id: 1, src:"./images/icon-hamburger.svg"},
 {id: 2, src:"./images/icon-close-menu.svg"}
];
let isMenuOpen = false;

function changeIcon() {
  toggleBtnImg.src = isMenuOpen ? iconSrcs[0].src : iconSrcs[1].src;
  isMenuOpen = !isMenuOpen;
}

toggleMenuBtn.addEventListener("click", () => {
  changeIcon();
  mobileMenu.classList.toggle("hidden");
})