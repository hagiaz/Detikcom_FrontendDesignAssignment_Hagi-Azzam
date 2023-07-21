function home(){
    window.location.href = "/"
}

const carousel = document.querySelector('.carousel');
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);
carousel.addEventListener('mouseup', dragEnd);
carousel.addEventListener('touchend', dragEnd);
carousel.addEventListener('mousemove', drag);
carousel.addEventListener('touchmove', drag);

function dragStart(e) {
  e.preventDefault();
  if (e.type === 'touchstart') {
    startPosition = e.touches[0].clientX;
  } else {
    startPosition = e.clientX;
    document.body.style.cursor = 'grabbing';
  }
  isDragging = true;
  animationID = requestAnimationFrame(animation);
}

function drag(e) {
  if (isDragging) {
    let currentPosition = 0;
    if (e.type === 'touchmove') {
      currentPosition = e.touches[0].clientX;
    } else {
      currentPosition = e.clientX;
    }
    const diff = currentPosition - startPosition;
    currentTranslate = prevTranslate + diff;
    setTransform(currentTranslate);
  }
}

function dragEnd() {
  cancelAnimationFrame(animationID);
  prevTranslate = currentTranslate;
  isDragging = false;
  document.body.style.cursor = 'default';

  carousel.style.transition = 'transform 0.4s ease-in-out';
  currentTranslate = 0;
  setTransform(currentTranslate);

  setTimeout(() => {
    carousel.style.transition = 'none';
  }, 400);
}

function animation() {
  setTransform(currentTranslate);
  if (isDragging) requestAnimationFrame(animation);
}

function setTransform(translate) {
  carousel.style.transform = `translateX(${translate}px)`;
}
