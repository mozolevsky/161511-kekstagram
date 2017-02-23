'use strict';

(function (exports) {

  function changeState(elem, stateName) {
    if (elem.hasAttribute(stateName)) {
      if (elem.getAttribute(stateName) === 'true') {
        elem.setAttribute(stateName, false);
      } else {
        elem.setAttribute(stateName, true);
      }
    }
  }

  exports.isEscPressed = function (event) {
    return event.keyCode && event.keyCode === 27;
  };

  exports.isEnterPressed = function (event) {
    return event.keyCode && event.keyCode === 13;
  };

  exports.showElement = function (element) {
    element.classList.remove('invisible');
    changeState(element, 'aria-hidden');
  };

  exports.hideElement = function (element) {
    element.classList.add('invisible');
    changeState(element, 'aria-hidden');
  };

  exports.hasClass = function (target, cssClass) {
    return target.className.indexOf(cssClass) !== -1;
  };
})(window.utils = {});
