'use strict';

window.initializeScale = function (element, step) {
  var mainImageScaleBlock = window.getElement('.upload-resize-controls-value');
  var currentScale = parseInt(mainImageScaleBlock.getAttribute('value'), 10);

  function reduceMainImg() {
    if (currentScale > 25) {
      currentScale = currentScale - step;
      changeScaleMainImg();
    }
  }

  function enlargeMainImg() {
    if (currentScale < 100) {
      currentScale += step;
      changeScaleMainImg();
    }
  }

  function changeScaleMainImg() {
    mainImageScaleBlock.value = currentScale + '%';
    window.mainImage.style.transform = 'scale(' + currentScale * 0.01 + ')';
  }

  element.addEventListener('click', function (event) {
    var target = event.target;

    if (window.isTarget(target, 'upload-resize-controls-button-dec')) {
      reduceMainImg();
    }

    if (window.isTarget(target, 'upload-resize-controls-button-inc')) {
      enlargeMainImg();
    }
  });
};
