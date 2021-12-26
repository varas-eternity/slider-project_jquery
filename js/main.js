let slides = $('.slides__item');
let containerIndicators = $('.indicators');
let indItems = $('.indicators__item');
let pausePlayBtn = $('.indicators__pause');
let nextBtn = $('.controls__next');
let prevBtn = $('.controls__prev');

let currentSlide = 0;
let carouselInterval = 2000;
let carouselStatus = true;

let gotoNSlide = (n) => {
  $(slides[currentSlide]).toggleClass('active');
  $(indItems[currentSlide]).toggleClass('active');
  currentSlide = (n + slides.length) % slides.length;
  $(slides[currentSlide]).toggleClass('active');
  $(indItems[currentSlide]).toggleClass('active');
};

let gotoNextSlide = () => gotoNSlide(currentSlide + 1);

let gotoPrevSlide = () => gotoNSlide(currentSlide - 1);

let slideInterval = setInterval(gotoNextSlide, carouselInterval);

let pauseSlideShow = () => {
  if (carouselStatus) {
    pausePlayBtn.html('<i class="fas fa-pause"></i>');
    carouselStatus = !carouselStatus;
    clearInterval(slideInterval);
  }
};

let playSlideShow = () => {
  pausePlayBtn.html('<i class="fas fa-play"></i>');
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

pausePlayBtn.on('click', clickPausePlayBtn);
nextBtn.on('click', clickNextBtn);
prevBtn.on('click', clickPrevBtn);

let indicatorHandler = (e) => {
  pauseSlideShow();
  gotoNSlide(+e.target.getAttribute('data-slide-to'));
};

containerIndicators.on('click', '.indicators__item', indicatorHandler);