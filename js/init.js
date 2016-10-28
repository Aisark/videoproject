(function($){
  $(function(){

    $('.button-collapse').sideNav({
      menuWidth: 250,
      closeOnClick: true
    });
    $('.parallax').parallax();
    $('.scrollspy').scrollSpy();
    $('.fixed-action-btn').closeFAB();

  }); // end of document ready
})(jQuery); // end of jQuery name space
