/**
 * Removes js-disabled attribute.
 *
 * The js-disabled attribute provides a way for CSS to react to Javascript being disabled.
 * If this code can execute, it’s no longer necessary and has to be removed.
 */

document.addEventListener('DOMContentLoaded', function () {
  document.body.removeAttribute('js-disabled');
});

/**
 * Device-agnostic detection of interaction techniques.
 */

function observeTouch() {
  document.body.setAttribute('uses-touch', '');
  window.removeEventListener('touchstart', observeTouch);
}

document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('touchstart', observeTouch, { passive: true });
});

function observeKey() {
  document.body.setAttribute('uses-keyboard', '');
  document.removeEventListener('keydown', observeKey);
}

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('keydown', observeKey, { passive: true });
});

/**
 * Lazy-load gallery images
 */

document.addEventListener('DOMContentLoaded', function () {
  initLazyLoading();
});

const observerOptions = {
  root: document.querySelector('.slider__list')
};

function initLazyLoading() {
  const slideItems = Array.from(document.querySelectorAll('.slide'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(handler, observerOptions);
    slideItems.forEach(slide => observer.observe(slide));
  } else {
    slideItems.forEach(slide => loadImage(slide.querySelector('img')));
  }
}

function handler(entries, observer) {
  for (const entry of entries) {
    entry.target.classList.remove('visible');

    if (entry.isIntersecting) {
      loadImage(entry.target.querySelector('img'));
      entry.target.classList.add('visible');
    }
  }
}

function loadImage(image) {
  if (image.dataset.src) {
    image.setAttribute('src', image.dataset.src);
    image.removeAttribute('data-src');
  }
}

/**
 * Arrow key navigation
 */
document.addEventListener('DOMContentLoaded', function () {
  if (!CSS.supports('(scroll-snap-points-x: repeat(100%)) or (-webkit-scroll-snap-points-x: repeat(100%))')) {
    document.addEventListener('keydown', handleKeyboardInput, { passive: false });
  }
});

function handleKeyboardInput(event) {
  const sliderList = document.querySelector('.slider__list');
  if (document.activeElement !== sliderList) {
    return;
  }

  if (event.keyCode in controlKeyNames) {
    event.preventDefault();
    const keyName = controlKeyNames[event.keyCode];
    controlKey[keyName].trigger(sliderList);
  }
}

const controlKeyNames = Object.freeze({
  37: 'arrowLeft',
  39: 'arrowRight'
});

const controlKey = Object.freeze({
  arrowLeft: {
    direction: 'prev',
    trigger: function (sliderList) {
      navigateSlide(sliderList, this.direction);
    }
  },
  arrowRight: {
    direction: 'next',
    trigger: function (sliderList) {
      navigateSlide(sliderList, this.direction);
    }
  }
});

/**
 * Navigation buttons
 */
document.addEventListener('DOMContentLoaded', function () {
  const sliderList = document.querySelector('.slider__list');
  const sliderControls = Array.from(document.querySelectorAll('.slider-control'));

  sliderControls.forEach(control => control.addEventListener('click', event => {
    navigateSlide(sliderList, event.currentTarget.dataset.direction);
  }));
});

/**
 * Slide navigation interface
 *
 * @param {HTMLElement} sliderList
 * @param {String} direction
 */
function navigateSlide(sliderList, direction) {
  const visibleSlides = document.querySelectorAll('.slide.visible');
  let targetSlide;

  if (visibleSlides.length === 1) {
    targetSlide = direction === 'prev' ? currentSlide.previousElementSibling : currentSlide.nextElementSibling;
  } else {
    targetSlide = visibleSlides[direction === 'prev' ? 0 : visibleSlides.length - 1];
  }

  const targetIndex = Array.from(sliderList.children).indexOf(targetSlide);
  scrollSlide(sliderList, targetIndex);
}

function scrollSlide(sliderList, targetPos) {
  sliderList.scrollLeft = targetPos * (sliderList.scrollWidth / sliderList.childElementCount);
}
