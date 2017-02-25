'use strict';

var mainImageScaleBlock = document.querySelector('.upload-resize-controls-value');

function changeScaleMainImg(scale) {
  mainImageScaleBlock.value = scale + '%';
  window.mainImage.style.transform = 'scale(' + scale * 0.01 + ')';
}

(function initializeScale(element, step, scale, changeScaleFunc) {

  element.addEventListener('click', function (event) {
    var target = event.target;

    if (window.utils.hasClass(target, 'upload-resize-controls-button-dec')) {
      if (scale > 25) {
        scale = scale - step;
        changeScaleFunc(scale);
      }
    }

    if (window.utils.hasClass(target, 'upload-resize-controls-button-inc')) {
      if (scale < 100) {
        scale += step;
        changeScaleFunc(scale);
      }
    }
  });
})(window.croppingImgForm, 25, 100, changeScaleMainImg);


