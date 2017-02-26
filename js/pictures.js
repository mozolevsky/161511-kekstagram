'use strict';

(function () {
  var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var pictures;

  var picturesContainer = document.querySelector('.pictures');
  var picTemplate = document.getElementById('picture-template');
  var picTemplateToClone = picTemplate.content;

  var onLoad = function (data) {
    pictures = JSON.parse(data);

    picturesContainer.innerHTML = '';

    for (var i = 0; i < pictures.length; i++) {
      var newElem = picTemplateToClone.cloneNode(true);
      var newElemImg = newElem.querySelector('img');
      newElemImg.src = pictures[i].url;

      var newElemLikes = newElem.querySelector('.picture-likes');
      newElemLikes.insertAdjacentHTML('afterbegin', pictures[i].likes);

      var newElemComments = newElem.querySelector('.picture-comments');
      newElemComments.insertAdjacentHTML('afterbegin', pictures[i].comments.length);

      picturesContainer.appendChild(newElem);
    }

    var allPictures = document.querySelectorAll('.picture');

    for (var j = 0; j < allPictures.length; j++) {
      var makeListener = function () {
        var currentValue = j;
        return function (event) {
          event.preventDefault();
          window.showGallery(pictures[currentValue]);
        };
      };
      allPictures[j].addEventListener('click', makeListener(event));
    }
  };

  window.load(url, onLoad);

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

      for (var i = 0; i < differentPictures.length; i++) {
        var newElem = picTemplateToClone.cloneNode(true);
        var newElemImg = newElem.querySelector('img');
        newElemImg.src = differentPictures[i].url;

        var newElemLikes = newElem.querySelector('.picture-likes');
        newElemLikes.insertAdjacentHTML('afterbegin', differentPictures[i].likes);

        var newElemComments = newElem.querySelector('.picture-comments');
        newElemComments.insertAdjacentHTML('afterbegin', differentPictures[i].comments.length);

        picturesContainer.appendChild(newElem);
      }

      var allPictures = document.querySelectorAll('.picture');

      for (var j = 0; j < allPictures.length; j++) {
        var makeListener = function () {
          var currentValue = j;
          return function (event) {
            event.preventDefault();
            window.showGallery(differentPictures[currentValue]);
          };
        };
        allPictures[j].addEventListener('click', makeListener(event));
      }
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

      for (var i = 0; i < sortedPictures.length; i++) {
        var newElem = picTemplateToClone.cloneNode(true);
        var newElemImg = newElem.querySelector('img');
        newElemImg.src = sortedPictures[i].url;

        var newElemLikes = newElem.querySelector('.picture-likes');
        newElemLikes.insertAdjacentHTML('afterbegin', sortedPictures[i].likes);

        var newElemComments = newElem.querySelector('.picture-comments');
        newElemComments.insertAdjacentHTML('afterbegin', sortedPictures[i].comments.length);

        picturesContainer.appendChild(newElem);
      }

      var allPictures = document.querySelectorAll('.picture');

      for (var j = 0; j < allPictures.length; j++) {
        var makeListener = function () {
          var currentValue = j;
          return function (event) {
            event.preventDefault();
            window.showGallery(sortedPictures[currentValue]);
          };
        };
        allPictures[j].addEventListener('click', makeListener(event));
      }
    });
  });

})();

