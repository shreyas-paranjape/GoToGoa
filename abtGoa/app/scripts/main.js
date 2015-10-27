 L.mapbox.accessToken = 'pk.eyJ1IjoicnVjaGl0YSIsImEiOiJjaWZpNmM3bzlibGMxcnlseHUzcWxnYTh6In0.7ppP-aYdwpHPgoYDYKa8vg';

 // var map = L.mapbox.map('map')
 //     .setView([40.73, -74.011], 13)
 //     .addLayer(L.mapbox.tileLayer('mapbox.streets'));
 //
 // 
 // L.mapbox.featureLayer('examples.map-h61e8o8e').on('ready', function (e) {
 //     
 //     var clusterGroup = new L.MarkerClusterGroup();
 //     e.target.eachLayer(function (layer) {
 //         clusterGroup.addLayer(layer);
 //     });
 //     map.addLayer(clusterGroup);
 // });
 var map = L.mapbox.map('map', 'mapbox.streets');

 var myLayer = L.mapbox.featureLayer().addTo(map);

 var geoJson = [{
     type: 'Feature',
     "geometry": {
         "type": "Point",
         "coordinates": [74.0200, 15.4000]
     },
     "properties": {
         'title': 'Ponda',
         'marker-color': '#3c4e5a',
         'marker-symbol': 'monument',
         'marker-size': 'large',
         // Store the image url and caption in an array.
         'images': [
['<iframe src="http://www.youtube.com/embed/jRXaQC0jKcg?autoplay=0" width="301" height="205" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> ', '1st video'],
          ['https://i.imgur.com/O6QEpBs.jpg', 'The U.S. Capitol after the burning of Washington during the War of 1812'],
          ['https://i.imgur.com/xND1MND.jpg', 'Ford\'s Theatre in the 19th century, site of the 1865 assassination of President Lincoln'],
          ['https://i.imgur.com/EKJmqui.jpg', 'The National Cherry Blossom Festival is celebrated around the city each spring.']
        ]
     }
}, {
     type: 'Feature',
     "geometry": {
         "type": "Point",
         "coordinates": [73.9581, 15.2736]
     },
     "properties": {
         'title': 'Margao',
         'marker-color': '#3c4e5a',
         'marker-symbol': 'city',
         'marker-size': 'large',
         'images': [
          ['<iframe src="http://www.youtube.com/embed/jRXaQC0jKcg?autoplay=0" width="301" height="205" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> ', '2nd video'],
          ['https://i.imgur.com/exemdwr.png', 'Peter Minuit is credited with the purchase of the island of Manhattan in 1626.'],
          ['https://i.imgur.com/LHNDBpf.jpg', 'During the mid-19th Century, Broadway was extended the length of Manhattan.'],
          ['https://i.imgur.com/Pk3DYH1.jpg', 'Times Square has the highest annual attendance rate of any tourist attraction in the world.']
        ]
     }
}];

 // Add custom popup html to each marker.
 myLayer.on('layeradd', function (e) {
     var marker = e.layer;
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
 });

 // Add features to the map
 myLayer.setGeoJSON(geoJson);

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
 map.setView([15.4989, 73.8278], 10);
