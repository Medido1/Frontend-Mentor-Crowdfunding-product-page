const toggleMenuBtn = document.querySelector(".toggle_menu_btn");
const toggleBtnImg = document.querySelector(".toggle_btn");
const mobileMenu = document.querySelector(".mobile_menu");
const modal = document.querySelector(".modal");
const backBtn = document.querySelector(".back"); /* back this project btn */
const closeModal = document.querySelector(".close");
const pledgeContainers = modal.querySelectorAll(".pledge_container");
const pledgeContainersMain = document.querySelectorAll(".pledge_container_main");
const radioBtns = modal.querySelectorAll("input[type='radio']");
const inputGrps = modal.querySelectorAll(".input_grp");
const pledgeInputs = modal.querySelectorAll("input[type='number']");
const continueBtns = modal.querySelectorAll(".continue");
const rewardBtns = document.querySelectorAll(".btn.reward");
const remainingTexts = modal.querySelectorAll(".remaining");
const remainingTextsMain = document.querySelectorAll(".remaining_main");
const thankYouModal = document.querySelector(".thank_you_modal");
const closeThankYouModal = thankYouModal.querySelector("button");
const totalMoneyPledgedText = document.querySelector(".money_collected");
const totalBackerText = document.querySelector(".total_backers");
const progressBar = document.querySelector(".progress_bar div");
const bookMarkBtn = document.querySelector(".bookmark")


let totalMoneyPledged = 0;
totalMoneyPledgedText.textContent = `$${totalMoneyPledged}`;
let totalBackers = 0;
totalBackerText.textContent = totalBackers;

const iconSrcs = 
[
  {src:"./images/icon-hamburger.svg"},
  {src:"./images/icon-close-menu.svg"}
];
const remainingPledges = 
[
  {name: "bamboo_stand", remaining: 101},
  {name: "black_edition_stand", remaining: 64},
  {name: "mahogany_special_edition", remaining: 1}
]
let isMenuOpen = false;

remainingTexts.forEach((text, index) => {
  text.textContent = remainingPledges[index].remaining;
})
remainingTextsMain.forEach((text, index) => {
  text.textContent = remainingPledges[index].remaining;
})

function changeIcon() {
  toggleBtnImg.src = isMenuOpen ? iconSrcs[0].src : iconSrcs[1].src;
  isMenuOpen = !isMenuOpen;
}

function showModal(e) {
  e.stopPropagation();
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

function checkPledgeInput(index){
  let verified = true;
  if (pledgeInputs[index].value.trim() === ""){
    alert("Please enter a pledge!!");
    verified = false;
  }
  else if (Number(pledgeInputs[index].value) < 0) {
    alert("lol");
    verified = false;
  }
  else if (index === 1 && pledgeInputs[1].value < 25) {
    alert("minimum pledge is 25$!");
    verified = false;
  }
  else if (index === 2 && pledgeInputs[2].value < 75){
    alert("minimum pledge is 75$!");
    verified = false;
  }
  return verified;
}

function checkSucess() {
  return totalMoneyPledged >= 10000 ? true : false;
}

function fillProgressBar(){
  let percentage = (Number(totalMoneyPledged) * 100) / 10000;
  let currentWidth = parseFloat(progressBar.style.width) || 0;
  function fillBar() {
    currentWidth += 1;
    progressBar.style.width = `${currentWidth}%`;
    if (currentWidth >= percentage) {
      clearInterval(intervalId)
    }
  }
  const intervalId = setInterval(fillBar, 50);
}

function markOutOfStock(index) {
  pledgeContainers[index + 1].classList.add("out_of_stock");
  pledgeContainersMain[index].classList.add("out_of_stock");
  rewardBtns[index].textContent = "Out of Stock";
  rewardBtns[index].style.cursor = "not-allowed";
  rewardBtns[index].style.pointerEvents = "none";
}

function updateInfo(index) {
  if (!checkPledgeInput(index)) return;
    if (index > 0) {
      remainingPledges[index - 1].remaining -= 1;
      remainingTexts[index -1].textContent = remainingPledges[index - 1].remaining;
      remainingTextsMain[index -1].textContent = remainingPledges[index - 1].remaining;
      if (remainingPledges[index -1].remaining < 1) {
        markOutOfStock(index - 1);
      }
    }
    totalMoneyPledged = Number(pledgeInputs[index].value) + totalMoneyPledged;
    totalMoneyPledgedText.textContent = `$${totalMoneyPledged}`;
    totalBackers += 1;
    totalBackerText.textContent = totalBackers;
    if (checkSucess()) {
      alert("You have just ended world hunger!!");
      hideModal();
      return;
    }
    thankYouModal.classList.remove("hidden");
    pledgeInputs[index].value = "";
}

/* events */
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
    updateInfo(index);
  })
})
closeThankYouModal.addEventListener("click", () => {
  thankYouModal.classList.add("hidden");
  pledgeContainers.forEach(container => {
    container.classList.remove("selected");
    hideModal();
    fillProgressBar();
  })
})
bookMarkBtn.addEventListener("click", () => {
  bookMarkBtn.classList.toggle("clicked");
})
rewardBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    showModal();
    selectPledge(index + 1);
  })
})
window.addEventListener("click", (e) => {
  if (modal.style.display === "flex" && !modal.contains(e.target)) {
    hideModal();
  }
})