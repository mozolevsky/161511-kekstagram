'use strict';

window.showGallery = (function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryClose = document.querySelector('.gallery-overlay-close');

  return function (elem) {
    window.utils.showElement(galleryOverlay);

    var galleryBigImg = galleryOverlay.querySelector('img');
    galleryBigImg.src = elem.children[0].src;

    var galleryLikes = galleryOverlay.querySelector('.likes-count');
    galleryLikes.innerHTML = elem.children[1].children[0].innerText;

    var galleryComments = galleryOverlay.querySelector('.comments-count');
    galleryComments.innerHTML = elem.children[1].children[1].innerText;

    galleryClose.addEventListener('click', function () {
      window.utils.hideElement(galleryOverlay);
    });

    document.addEventListener('keydown', function (event) {
      if (window.utils.isEscPressed(event)) {
        window.utils.hideElement(galleryOverlay);
      }
    });
  };
})();
