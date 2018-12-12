var templateCarousel = document.getElementById('template-carousel').innerHTML;
var elem = document.querySelector('.main-carousel');

Mustache.parse(templateCarousel);

for (var i = 0; i < slideShow.length; i++) {
    elem.insertAdjacentHTML('beforeEnd', Mustache.render(templateCarousel, slideShow[i]));
}

var flkty = new Flickity(elem, {
    cellAlign: 'left',
    contain: true,
    //hash: true,
});

var restartButton = document.querySelector('button');

restartButton.addEventListener('click', function () {
    flkty.select(0);
});

var progressBar = document.querySelector('.progress-bar')

flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});

window.initMap = function () {
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 5,
            center: slideShow[0].coords
        }
    );

    var markers = [];

    for (let j = 0; j < slideShow.length; j++) {
        markers.push(new google.maps.Marker({
            position: slideShow[j].coords,
            map: map
        }));
        markers[j].addListener('click', function () {
            flkty.select(j);
        });
    }
    flkty.on('change', function (j) {
        flkty.select(j);
        map.panTo(slideShow[j].coords);
        map.setZoom(10);
    });
};