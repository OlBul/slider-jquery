$(document).ready(function () {
  const $container = $('#carousel');
  const $slides = $('.slide');
  const $indicatorContainer = $('.indicators');
  const $indicators = $('.indicator');
  const $pauseBtn = $('#pause');
  const $prevBtn = $('#prev');
  const $nextBtn = $('#next');


  let currentSlide = 0;
  let isPlaying = true;
  let timerID = null;
  let interval = 2000;
  let swipeStartX = null;
  let swipeEndX = null;

  const SLIDES_LENGTH = $slides.length;
  const CODE_LEFT_ARROW = 'ArrowLeft';
  const CODE_RIGHT_ARROW = 'ArrowRight';
  const CODE_SPACE = 'Space';

  function gotoNth(n) {
    $($slides[currentSlide]).toggleClass('active');
    $($indicators[currentSlide]).toggleClass('active');
    currentSlide = (n + SLIDES_LENGTH) % SLIDES_LENGTH;
    $($slides[currentSlide]).toggleClass('active');
    $($indicators[currentSlide]).toggleClass('active');
  }

  const gotoPrev = () => gotoNth(currentSlide - 1);

  const gotoNext = () => gotoNth(currentSlide + 1);

  function pause() {
    clearInterval(timerID);
    isPlaying = false;
    $pauseBtn.html('Play');
  }

  function play() {
    timerID = setInterval(gotoNext, interval);
    isPlaying = true;
    $pauseBtn.html('Pause');
  }

  const pausePlay = () => isPlaying ? pause() : play();

  function prev() {
    gotoPrev();
    pause();
  }

  function next() {
    gotoNext();
    pause();
  }

  function indicate(e) {
    gotoNth(+this.attr('data-slide-to'));
    pause();
  }

  function pressKey(e) {
    if (e.code === CODE_LEFT_ARROW) prev();
    if (e.code === CODE_RIGHT_ARROW) next();
    if (e.code === CODE_SPACE) pausePlay();
  }

  function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
  }
  function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX < -100) prev();
    if (swipeStartX - swipeEndX > 100) next();
  }

  function initListeners() {

    $pauseBtn.on('click', pausePlay);
    $prevBtn.on('click', prev);
    $nextBtn.on('click', next);
    $indicatorContainer.on('click', indicate);
    $container.on('touchstart', swipeStart);
    $container.on('touchend', swipeEnd);
    $(document).on('keydown', pressKey);
  }


  function init() {
    initListeners();
    timerID = setInterval(gotoNext, interval);
  }
  init();
}());


