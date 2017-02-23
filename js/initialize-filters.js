'use strict';

(function () {
  function getFilterName(target) {
    var attr = target.getAttribute('for');
    return attr.replace('upload-', '');
  }

  var initializeFilters = function (clickArea, cssClass, filterObject) {

    clickArea.addEventListener('click', function (event) {
      var target = event.target;

      if (window.utils.hasClass(target.parentNode, cssClass)) {
        filterObject.className = 'filter-image-preview ' + getFilterName(target.parentNode);
      }
    });

    clickArea.addEventListener('keydown', function (event) {
      var target = event.target;
      if (window.utils.hasClass(target, cssClass) && window.utils.isEnterPressed(event)) {
        filterObject.className = 'filter-image-preview ' + getFilterName(target);
      }
    });
  };
  initializeFilters(window.croppingImgForm, 'upload-filter-label', window.mainImage);
})();
