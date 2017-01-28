"use strict"

function getElement(selector) {
  return document.querySelector(selector);
}

var uploadForm = getElement("#upload-select-image");
var inputUploadFile = getElement("#upload-file");
var croppingImgFormWrapper = getElement(".upload-overlay");
var croppingImgForm = getElement("#upload-filter");
var uploadFormCancel = getElement(".upload-form-cancel");

var mainImage = getElement(".filter-image-preview");
var mainImageScaleBlock = getElement(".upload-resize-controls-value");
var mainImageScale = parseInt(mainImageScaleBlock.getAttribute("value"));

function showElement() {
  this.classList.remove("invisible");
}

function hideElement() {
  this.classList.add("invisible");
}

function getFilterName(attr) {
  return attr.slice(7);
}

function reduceMainImg() {
  if (mainImageScale > 25) {
    mainImageScale -=25;
    mainImageScaleBlock.value = mainImageScale + "%";
    mainImage.style.transform = "scale(" + mainImageScale * 0.01 + ")";
  }
}

function enlargeMainImg() {
  if (mainImageScale < 100) {
    mainImageScale +=25;
    mainImageScaleBlock.value = mainImageScale + "%";
    mainImage.style.transform = "scale(" + mainImageScale * 0.01 + ")";
  }
}

inputUploadFile.addEventListener("change", function () {
  hideElement.call(uploadForm);
  showElement.call(croppingImgFormWrapper);
});

croppingImgForm.addEventListener("click", function (event) {
  var target = event.target;

  if (target == uploadFormCancel) {
    hideElement.call(croppingImgFormWrapper);
    showElement.call(uploadForm);
  }

  if (~target.className.indexOf("upload-filter-preview")) {
    var attr = target.parentElement.getAttribute('for');
    var filterName = getFilterName(attr);
    mainImage.className = "filter-image-preview " + filterName;
  }

  if (~target.className.indexOf("upload-resize-controls-button-dec")) {
    reduceMainImg();
  }

  if (~target.className.indexOf("upload-resize-controls-button-inc")) {
    enlargeMainImg()
  }

});



