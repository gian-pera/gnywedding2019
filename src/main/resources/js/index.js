$(function() {

  $(window).on('load', function () {
    $('#main').removeClass('hide');
    $('#preloader').delay(2000).fadeOut('slow', function() {
      $(this).remove();
    });
  });

});
