$(function() {



  $('#preloader').delay(2000).fadeOut('slow');
  //$('.preloader-wrapper').delay(2000).fadeout('slow');
  $('#main').delay(2000).fadein('slow');
  $('footer').delay(2000).fadein('slow');

/*
  $('.carousel').carousel({
    indicators: true,
    dist: -50,
    padding: 50
  });

  var interval = 1000;
  var transition_carousel = function() {
    $('.carousel').carousel('next');
  };

  var carousel_interval = setInterval(transition_carousel, 5000);
  $('.carousel-item').hover(function() {
    clearInterval(carousel_interval);
  }, function(){
    carousel_interval = setInterval(transition_carousel, 5000);
  });
*/
});
