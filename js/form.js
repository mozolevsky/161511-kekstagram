'use strict';

var uploadForm = document.querySelector('#upload-select-image');
var inputUploadFile = document.querySelector('#upload-file');
var croppingImgFormWrapper = document.querySelector('.upload-overlay');
var croppingImgForm = document.querySelector('#upload-filter');
var uploadFormCancel = document.querySelector('.upload-form-cancel');
window.mainImage = document.querySelector('.filter-image-preview');

var listenEscOnForm = function (event) {
  if (window.utils.isEscPressed(event)) {
    window.utils.hideElement(croppingImgFormWrapper);
    window.utils.showElement(uploadForm);
  }
};

inputUploadFile.addEventListener('change', function () {
  window.utils.hideElement(uploadForm);
  window.utils.showElement(croppingImgFormWrapper);
  addEventListener('keydown', listenEscOnForm);
});

uploadFormCancel.addEventListener('click', function () {
  window.utils.hideElement(croppingImgFormWrapper);
  window.utils.showElement(uploadForm);
  removeEventListener('keydown', listenEscOnForm);
});

croppingImgForm.addEventListener('keydown', function (event) {
  var target = event.target;

  if (target === uploadFormCancel && window.utils.isEscPressed(event)) {
    window.utils.hideElement(croppingImgFormWrapper);
    window.utils.showElement(uploadForm);
    removeEventListener('keydown', listenEscOnForm);
  }
});
