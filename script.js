const toggleMenuBtn = document.querySelector(".toggle_menu_btn");
const toggleBtnImg = document.querySelector(".toggle_btn");
const iconSrcs = 
[{id: 1, src:"./images/icon-hamburger.svg"},
  {id: 2, src:"./images/icon-close-menu.svg"}
];
let currentIcon = 1;

function changeIcon() {
  if (currentIcon === 1){
    toggleBtnImg.src = iconSrcs[1].src;
    currentIcon += 1;
  } else {
    toggleBtnImg.src = iconSrcs[0].src;
    currentIcon -= 1;
  }
}

toggleMenuBtn.addEventListener("click", () => {
  changeIcon();
})