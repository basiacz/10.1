var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
    cellAlign: 'left',
    contain: true,
    hash: true,
});

var button = document.querySelector('.button');
button.addEventListener('click', function (event) {
    var selector = event.target.getAttribute('data-selector');
    flkty.selectCell(selector);
});

var progressBar = document.querySelector('.progress-bar');

flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});