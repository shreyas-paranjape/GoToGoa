'use strict';
$( document ).ready(function() {
    $('.jumbo-wrapper').height($(window).height());
    $('.gridster .grid').gridster({
        'widget_margins': [0,0],
        'widget_base_dimensions': [200, 200],
        'widget_selector': 'section'
    });
    $('.gridster .grid section').each(function() {
        var hue = 'rgb(' + (Math.floor((256-199)*Math.random()) + 200) + ',' + 
		(Math.floor((256-100)*Math.random()) + 200) + ',' + (Math.floor((256-220)*Math.random()) + 200) + ')';
         $(this).css('background-color', hue);
    });
});