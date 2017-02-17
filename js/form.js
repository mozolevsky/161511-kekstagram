'use strict';

function getElement(selector) {
  return document.querySelector(selector);
}

var uploadForm = getElement('#upload-select-image');
var inputUploadFile = getElement('#upload-file');
var croppingImgFormWrapper = getElement('.upload-overlay');
var croppingImgForm = getElement('#upload-filter');
var uploadFormCancel = getElement('.upload-form-cancel');

var mainImage = getElement('.filter-image-preview');
var mainImageScaleBlock = getElement('.upload-resize-controls-value');
var mainImageScale = parseInt(mainImageScaleBlock.getAttribute('value'), 10);

var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;

function showElement(element) {
  element.classList.remove('invisible');
}

function hideElement(element) {
  element.classList.add('invisible');
}

function reduceMainImg() {
  if (mainImageScale > 25) {
    mainImageScale = mainImageScale - 25;
    changeScaleMainImg();
  }
}

function enlargeMainImg() {
  if (mainImageScale < 100) {
    mainImageScale += 25;
    changeScaleMainImg();
  }
}

function changeScaleMainImg() {
  mainImageScaleBlock.value = mainImageScale + '%';
  mainImage.style.transform = 'scale(' + mainImageScale * 0.01 + ')';
}

function isTarget(target, cssClass) {
  var targetStatus;
  targetStatus = target.className.indexOf(cssClass) !== -1;
  return targetStatus;
}

function checkKeyCode(event, key) {
  return event.keyCode && event.keyCode === key;
}

var listenEscOnForm = function () {
  document.addEventListener('keydown', function (event) {
    if (checkKeyCode(event, ESC_KEY_CODE)) {
      hideElement(croppingImgFormWrapper);
      showElement(uploadForm);
    }
  });
};

function changeState(elem, stateName) {
  if (elem.hasAttribute(stateName)) {
    if (elem.getAttribute(stateName) === 'true') {
      elem.setAttribute(stateName, false);
    } else {
      elem.setAttribute(stateName, true);
    }
  }
}

inputUploadFile.addEventListener('change', function () {
  hideElement(uploadForm);
  showElement(croppingImgFormWrapper);
  listenEscOnForm();
  changeState(croppingImgFormWrapper, 'aria-hidden');
});

uploadFormCancel.addEventListener('click', function () {
  hideElement(croppingImgFormWrapper);
  showElement(uploadForm);
  changeState(croppingImgFormWrapper, 'aria-hidden');
});

croppingImgForm.addEventListener('keydown', function (event) {
  var target = event.target;

  if (isTarget(target, 'upload-form-cancel') && checkKeyCode(event, ENTER_KEY_CODE)) {
    hideElement(croppingImgFormWrapper);
    showElement(uploadForm);
    changeState(croppingImgFormWrapper, 'aria-hidden');
  }

  if (isTarget(target, 'upload-filter-label') && checkKeyCode(event, ENTER_KEY_CODE)) {
    mainImage.className = 'filter-image-preview ' + getFilterName(target);
  }
});

window.initializeFilters(croppingImgForm, 'upload-filter-preview', mainImage);

croppingImgForm.addEventListener('click', function (event) {
  var target = event.target;

  if (isTarget(target, 'upload-resize-controls-button-dec')) {
    reduceMainImg();
  }

  if (isTarget(target, 'upload-resize-controls-button-inc')) {
    enlargeMainImg();
  }
});


