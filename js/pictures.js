'use strict';

(function () {
  var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var pictures;

  var picturesContainer = document.querySelector('.pictures');
  var picTemplate = document.getElementById('picture-template');
  var picTemplateToClone = picTemplate.content;

  window.load(url, function (data) {
    pictures = JSON.parse(data);

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
          /*window.console.log(pictures[currentValue]);*/
        };
      };
      allPictures[j].addEventListener('click', makeListener(event));
    }
  });
})();

