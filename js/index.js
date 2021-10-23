const slider = document.querySelector(".slider-container");
const slides = Array.from(document.querySelectorAll(".slide"));
const homeButtons = Array.from(document.querySelectorAll(".homebutton"));
const nextButton = document.querySelector(".nextbutton");
const detailsButton = document.querySelector(".detailsbutton");
const sperms = document.querySelector(".sperms");
const covered = document.querySelector(".covered");
const closeDetailsButton = document.querySelector(".closebutton");
const uncoveredElements = Array.from(document.querySelectorAll(".uncovered"));
const coveredElements = Array.from(document.querySelectorAll(".covered"));
const previousButton = document.querySelector(".previous");
const followingButton = document.querySelector(".following");
const firstCircle = document.querySelector(".firstCircle");
const secondCircle = document.querySelector(".secondCircle");
const text13 = document.querySelector(".text1-3");
const text46 = document.querySelector(".text4-6");

let startPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let coveredPage = 1;

slides.forEach((slide, index) => {
  slide.addEventListener("touchstart", touchStart(index));
  slide.addEventListener("touchend", touchEnd);
  slide.addEventListener("touchmove", touchMove);
});

homeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    currentIndex = 0;
    slider.style.transform = `translateX(0px)`;
  });
});

nextButton.addEventListener("click", function () {
  slider.style.transform = `translateX(-1024px)`;
  currentIndex++;
  checkAnimation();
});

detailsButton.addEventListener("click", function () {
  slides[2].style.backgroundImage = `url('images/bg4.png')`;
  slides[2].style.backgroundSize = "1024px 768px";
  uncoveredElements.forEach((element) => {
    element.style.visibility = "hidden";
  });
  coveredElements.forEach((element) => {
    element.style.visibility = "visible";
  });
  closeDetailsButton.style.zIndex = 3;
  previousButton.style.zIndex = 3;
  followingButton.style.zIndex = 3;
});

closeDetailsButton.addEventListener("click", function () {
  slides[2].style.backgroundImage = `url('images/bg3.png')`;
  slides[2].style.backgroundSize = "1024px 768px";
  coveredElements.forEach((element) => {
    element.style.visibility = "hidden";
  });
  uncoveredElements.forEach((element) => {
    element.style.visibility = "visible";
  });
  text46.style.visibility = "hidden";
});

followingButton.addEventListener("click", function () {
  if (coveredPage == 1) {
    firstCircle.style.left = "49px";
    secondCircle.style.left = "29px";
    text13.style.visibility = "hidden";
    text46.style.visibility = "visible";
    coveredPage = 2;
  }
});

previousButton.addEventListener("click", function () {
  if (coveredPage == 2) {
    firstCircle.style.left = "29px";
    secondCircle.style.left = "49px";
    text13.style.visibility = "visible";
    text46.style.visibility = "hidden";
    coveredPage = 1;
  }
});

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPosition = event.touches[0].screenX;
  };
}

function touchEnd() {
  const movedBy = currentTranslate - previousTranslate;
  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();
}

function touchMove(event) {
  const currentPosition = event.touches[0].screenX;
  currentTranslate = previousTranslate + currentPosition - startPosition;
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  previousTranslate = currentTranslate;
  slider.style.transform = `translateX(${currentTranslate}px)`;
  checkAnimation();
}

function checkAnimation() {
  setTimeout(() => {
    if (currentIndex == 1) {
      sperms.classList.add("sperm-moving");
    } else {
      sperms.classList.remove("sperm-moving");
    }
  });
}
