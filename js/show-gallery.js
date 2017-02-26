'use strict';

window.showGallery = (function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryClose = document.querySelector('.gallery-overlay-close');

  return function (data) {
    window.utils.showElement(galleryOverlay);

    var galleryImg = galleryOverlay.querySelector('img');
    galleryImg.src = data.url;

    var galleryLikes = galleryOverlay.querySelector('.likes-count');
    galleryLikes.innerHTML = data.likes;

    var galleryComments = galleryOverlay.querySelector('.comments-count');
    galleryComments.innerHTML = data.comments.length;

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
