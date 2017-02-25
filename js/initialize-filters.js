'use strict';

(function () {
  var getFilter = function (target, elem) {
    var attr = target.getAttribute('for');
    elem.className = 'filter-image-preview ' + attr.replace('upload-', '');
  };

  var initializeFilters = function (clickArea, cssClass, filterObject, applyFilter) {

    clickArea.addEventListener('click', function (event) {
      var target = event.target;

      if (window.utils.hasClass(target.parentNode, cssClass)) {
        applyFilter(target.parentNode, filterObject);
      }
    });

    clickArea.addEventListener('keydown', function (event) {
      var target = event.target;
      if (window.utils.hasClass(target, cssClass) && window.utils.isEnterPressed(event)) {
        applyFilter(target, filterObject);
      }
    });
  };
  initializeFilters(window.croppingImgForm, 'upload-filter-label', window.mainImage, getFilter);
})();
