L.mapbox.accessToken = 'pk.eyJ1IjoicnVjaGl0YSIsImEiOiJjaWZpNmM3bzlibGMxcnlseHUzcWxnYTh6In0.7ppP-aYdwpHPgoYDYKa8vg';
var map = L.mapbox.map('map')
    .setView([15.4989, 73.8278], 10)
    .addLayer(L.mapbox.tileLayer('mapbox.streets'));

var customizeMarker = function (e) {
    var marker = e;
    var feature = marker.feature;
    var images = feature.properties.images;
    var slideshowContent = '';
    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        if (img[0].split(" ")[0].localeCompare("<iframe") == 0) {
            slideshowContent += '<div class="image' + (i === 0 ? ' active' : '') + '">' + img[0] + '<div class="caption">' + img[1] + '</div>' + '</div>';
        } else {
            slideshowContent += '<div class="image' + (i === 0 ? ' active' : '') + '">' +

                '<img src="' + img[0] + '" />' +

                '<div class="caption">' + img[1] + '</div>' +

                '</div>';
        }

    }

    // Create custom popup content
    var popupContent = '<div id="' + feature.properties.id + '" class="popup">' +
        '<h2>' + feature.properties.title + '</h2>' +
        '<div class="slideshow">' +
        slideshowContent +
        '</div>' +

        '<div class="cycle">' +
        '<a href="#" class="prev">&laquo; Previous</a>' +
        '<a href="#" class="next">Next &raquo;</a>' +
        '</div>'
    '</div>';
    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent, {
        closeButton: false,
        minWidth: 320
    });

};



var featureLayer = L.mapbox.featureLayer();
var myLayer = featureLayer.addTo(map);
L.mapbox.featureLayer().loadURL('map.geojson').on('ready', function (e) {
    // The clusterGroup gets each marker in the group added to it
    // once loaded, and then is added to the map
    var clusterGroup = new L.MarkerClusterGroup();
    e.target.eachLayer(function (layer) {
        customizeMarker(layer);
        clusterGroup.addLayer(layer);
    });
    map.addLayer(clusterGroup);
});

$('#map').on('click', '.popup .cycle a', function () {
    var $slideshow = $('.slideshow'),
        $newSlide;

    if ($(this).hasClass('prev')) {
        $newSlide = $slideshow.find('.active').prev();
        if ($newSlide.index() < 0) {
            $newSlide = $('.image').last();
        }
    } else {
        $newSlide = $slideshow.find('.active').next();
        if ($newSlide.index() < 0) {
            $newSlide = $('.image').first();
        }
    }

    $slideshow.find('.active').removeClass('active').hide();
    $newSlide.addClass('active').show();
    return false;
});
