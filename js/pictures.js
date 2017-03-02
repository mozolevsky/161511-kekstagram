'use strict';

(function () {
  var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var pictures;

  var picturesContainer = document.querySelector('.pictures');
  var picTemplate = document.getElementById('picture-template');
  var picTemplateToClone = picTemplate.content;

  function makeNode(elem) {
    var newElem = picTemplateToClone.cloneNode(true);
    var newElemImg = newElem.querySelector('img');
    newElemImg.src = elem.url;

    var newElemLikes = newElem.querySelector('.picture-likes');
    newElemLikes.insertAdjacentHTML('afterbegin', elem.likes);

    var newElemComments = newElem.querySelector('.picture-comments');
    newElemComments.insertAdjacentHTML('afterbegin', elem.comments.length);

    picturesContainer.appendChild(newElem);
  }

  var onLoad = function (data) {
    pictures = JSON.parse(data);

    picturesContainer.innerHTML = '';
    pictures.forEach(makeNode);
  };

  window.load(url, onLoad);
  picturesContainer.addEventListener('click', function (event) {
    var target = event.target;
    event.preventDefault();

    while (target !== picturesContainer) {
      if (target.tagName === 'A') {
        window.showGallery(target);
        return;
      }
      target = target.parentNode;
    }
  });

  var filters = document.querySelector('.filters');
  filters.classList.remove('hidden');

  var popularButton = document.getElementById('filter-popular');
  popularButton.addEventListener('click', function () {
    window.load(url, onLoad);
  });

  var newButton = document.getElementById('filter-new');
  newButton.addEventListener('click', function () {
    window.load(url, function (data) {
      pictures = JSON.parse(data);
      var differentPictures = [];

      function getRandomPicture(arr) {
        var randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
      }

      function checkOverlap(arr) {
        if (differentPictures.indexOf(arr) === -1) {
          differentPictures.push(arr);
        }
      }

      while (differentPictures.length <= 10) {
        var arr = getRandomPicture(pictures);
        checkOverlap(arr);
      }

      picturesContainer.innerHTML = '';
      differentPictures.forEach(makeNode);
    });
  });

  var discussButton = document.getElementById('filter-discussed');
  discussButton.addEventListener('click', function () {
    window.load(url, function (data) {
      pictures = JSON.parse(data);

      function compareCommentCount(arr1, arr2) {
        return (arr1.comments.length > arr2.comments.length) ? -1 : 1;
      }

      var sortedPictures = pictures.slice().sort(compareCommentCount);
      picturesContainer.innerHTML = '';
      sortedPictures.forEach(makeNode);
    });
  });
})();

