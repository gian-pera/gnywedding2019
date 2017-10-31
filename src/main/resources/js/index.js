$.gmap3({
  key: 'AIzaSyDqPw4fG0ksLZNU26TvubY6u4B-5dKUJio'
});

$(function() {

  var venueCoords = [9.62536, 123.8010313];
  $('.map').gmap3({
    center: venueCoords,
    zoom: 14
  }).marker({
    url: 'https://goo.gl/maps/j8rme19iR3t',
    position: venueCoords
  });
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
