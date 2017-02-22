'use strict';

window.initializeFilters = function (clickArea, cssClass, filterObject, key) {


  function getFilterName(target) {
    var attr = target.getAttribute('for');
    return attr.replace('upload-', '');
  }

  clickArea.addEventListener('click', function (event) {
    var target = event.target;

    if (window.isTarget(target.parentNode, cssClass)) {
      filterObject.className = 'filter-image-preview ' + getFilterName(target.parentNode);
    }
  });

  clickArea.addEventListener('keydown', function (event) {
    var target = event.target;
    if (window.isTarget(target, cssClass) && window.checkKeyCode(event, key)) {
      filterObject.className = 'filter-image-preview ' + getFilterName(target);
    }
  });

};
