// manage Navbar behaviour !
// $(document) prevents from assigning event handlers to non existing elements!
$(document).on('click','.nav a',function(){

    // Collapse mobile navbar menu on click !
    if($('.navbar-toggle').is(":visible")) {  $('#navbar').collapse('hide'); }

    // manage active navbar items !
    //$(".nav").find(".active").removeClass("active");
    //$(this).parent().addClass("active");
    // no need anymore - ember.js is setting active class on li element!
});

$(window).on('resize', function () {
    // TODO: make an efficient way to prevent menu extend on screen rotation!
    if (window.innerWidth > 767) $('#navbar').collapse('hide');
});