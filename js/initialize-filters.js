'use strict';

window.initializeFilters = function (clickArea, cssClass, filterObject) {

  function getFilterName(target) {
    var attr = target.parentElement.getAttribute('for');
    return attr.replace('upload-', '');
  }

  function isTarget(target) {
    var targetStatus;
    targetStatus = target.className.indexOf(cssClass) !== -1;
    return targetStatus;
  }

  clickArea.addEventListener('click', function (event) {
    var target = event.target;

    if (isTarget(target)) {
      filterObject.className = 'filter-image-preview ' + getFilterName(target);
    }
  });

};
