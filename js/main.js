let $carousel = $('.carousel');
let $slides = $('.slides__item');
let $containerIndicators = $('.indicators');
let $indicatorsItems = $('.indicators__item');
let $pausePlayBtn = $('.indicators__pause');
let $nextBtn = $('.controls__next');
let $prevBtn = $('.controls__prev');

let currentSlide = 0;
let carouselInterval = 2000;
let carouselStatus = true;

let gotoNSlide = (n) => {
  $($slides[currentSlide]).toggleClass('active');
  $($indicatorsItems[currentSlide]).toggleClass('active');
  currentSlide = (n + $slides.length) % $slides.length;
  $($slides[currentSlide]).toggleClass('active');
  $($indicatorsItems[currentSlide]).toggleClass('active');
};

let gotoNextSlide = () => gotoNSlide(currentSlide + 1);

let gotoPrevSlide = () => gotoNSlide(currentSlide - 1);

let slideInterval = setInterval(gotoNextSlide, carouselInterval);

let pauseSlideShow = () => {
  if (carouselStatus) {
    $pausePlayBtn.html('<i class="fas fa-pause"></i>');
    carouselStatus = !carouselStatus;
    clearInterval(slideInterval);
  }
};

let playSlideShow = () => {
  $pausePlayBtn.html('<i class="fas fa-play"></i>');
  carouselStatus = !carouselStatus;
  slideInterval = setInterval(gotoNextSlide, carouselInterval);
};

let clickPausePlayBtn = () => carouselStatus ? pauseSlideShow() : playSlideShow();

let clickNextBtn = () => {
  pauseSlideShow();
  gotoNextSlide();
};

let clickPrevBtn = () => {
  pauseSlideShow();
  gotoPrevSlide();
};

$pausePlayBtn.on('click', clickPausePlayBtn);
$nextBtn.on('click', clickNextBtn);
$prevBtn.on('click', clickPrevBtn);

let indicatorHandler = (e) => {
  pauseSlideShow();
  gotoNSlide(+e.target.getAttribute('data-slide-to'));
};

$containerIndicators.on('click', '.indicators__item', indicatorHandler);

// TODO: press key control

function pressKey(e) {
  if (e.key === 'ArrowLeft') clickPrevBtn();
  if (e.key === 'ArrowRight') clickNextBtn();
  if (e.key === ' ') clickPausePlayBtn();
}

$(document).on('keydown', pressKey);

// TODO: swipe control

let swipeStartX = null;
let swipeEndX = null;

function swipeStart(e) {
  swipeStartX = e.changedTouches[0].pageX;
}

function swipeEnd(e) {
  swipeEndX = e.changedTouches[0].pageX;
  swipeStartX - swipeEndX < -100 && clickPrevBtn();
  swipeStartX - swipeEndX > 100 && clickNextBtn();
}

$carousel.on('touchstart', swipeStart);
$carousel.on('touchend', swipeEnd);