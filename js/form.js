'use strict';

var getElement = function (selector) {
  return document.querySelector(selector);
};

var uploadForm = getElement('#upload-select-image');
var inputUploadFile = getElement('#upload-file');
var croppingImgFormWrapper = getElement('.upload-overlay');
var croppingImgForm = getElement('#upload-filter');
var uploadFormCancel = getElement('.upload-form-cancel');

var mainImage = getElement('.filter-image-preview');

var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;

function showElement(element) {
  element.classList.remove('invisible');
}

function hideElement(element) {
  element.classList.add('invisible');
}

var isTarget = function (target, cssClass) {
  var targetStatus;
  targetStatus = target.className.indexOf(cssClass) !== -1;
  return targetStatus;
};

var checkKeyCode = function (event, key) {
  return event.keyCode && event.keyCode === key;
};

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
    var result = elem.getAttribute(stateName) === 'true' ? elem.setAttribute(stateName, false) : elem.setAttribute(stateName, true);
  }
  return result;
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
});

window.initializeFilters(croppingImgForm, 'upload-filter-label', mainImage, ENTER_KEY_CODE);
window.initializeScale(croppingImgForm, 25, 50);


