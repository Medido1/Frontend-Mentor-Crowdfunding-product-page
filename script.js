const toggleMenuBtn = document.querySelector(".toggle_menu_btn");
const toggleBtnImg = document.querySelector(".toggle_btn");
const mobileMenu = document.querySelector(".mobile_menu");
const modal = document.querySelector(".modal");
const backBtn = document.querySelector(".back"); /* back this project btn */
const closeModal = document.querySelector(".close");
const pledgeContainers = modal.querySelectorAll(".pledge_container");
const radioBtns = modal.querySelectorAll("input[type='radio']");
const inputGrps = modal.querySelectorAll(".input_grp");
const continueBtns = modal.querySelectorAll(".continue");
const remainingTexts = modal.querySelectorAll(".remaining");
const thankYouModal = document.querySelector(".thank_you_modal");
const closeThankYouModal = thankYouModal.querySelector("button");
const iconSrcs = 
[
  {src:"./images/icon-hamburger.svg"},
  {src:"./images/icon-close-menu.svg"}
];
const remainingPledges = 
[
  {name: "bamboo_stand", remaining: 101},
  {name: "black_edition_stand", remaining: 64},
  {name: "mahogany_special_edition", remaining: 0}
]
let isMenuOpen = false;

remainingTexts.forEach((text, index) => {
  text.textContent = remainingPledges[index].remaining;
})

function changeIcon() {
  toggleBtnImg.src = isMenuOpen ? iconSrcs[0].src : iconSrcs[1].src;
  isMenuOpen = !isMenuOpen;
}

function showModal() {
  modal.style.display = "flex";
}

function hideModal() {
  modal.style.display = "none";
}

function selectPledge(index) {
  if (index > 0 && remainingPledges[index - 1].remaining === 0){
    return;
  }
  pledgeContainers.forEach(container => {
    container.classList.remove("selected");
  })
  pledgeContainers[index].classList.add("selected");
}

toggleMenuBtn.addEventListener("click", () => {
  changeIcon();
  mobileMenu.classList.toggle("hidden");
})

backBtn.addEventListener("click", showModal);
closeModal.addEventListener("click", hideModal);

inputGrps.forEach((grp,index) => {
  grp.addEventListener("click", () => {
    const radioBtn = grp.querySelector("input[type='radio']");
    radioBtn.checked = true;
    selectPledge(index)
  })
})
continueBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index > 0) {
      remainingPledges[index - 1].remaining -= 1;
      remainingTexts[index -1].textContent = remainingPledges[index - 1].remaining;
    }
    thankYouModal.classList.remove("hidden");
  })
})
closeThankYouModal.addEventListener("click", () => {
  thankYouModal.classList.add("hidden");
  pledgeContainers.forEach(container => {
    container.classList.remove("selected");
  })
})