// jshint devel:true
console.log('\'Allo \'Allo!');
$('#myTabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
})

//$(document).ready(function(){
//$(".visible").hover(function(){
//$(".bottom-border").show();
//}, function(){
//$(".bottom-border").hide();
//});
//});
//
//                                    $(function() {
//                                        $('#datetimepicker1').datetimepicker();
//                                    });
$(document).ready(function () {
    var expanderTrigger = document.getElementById("js-expander-trigger");
    var expanderContent = document.getElementById("js-expander-content");

    $('#js-expander-trigger').click(function () {
        $(this).toggleClass("expander-hidden");
        
            $("#block").animate({
                width: "70%",
                opacity: 0.4,
                marginLeft: "0.6in",
                fontSize: "3em",
                borderWidth: "10px"
            }, 1500);
        
    });
});