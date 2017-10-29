$(function() {
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

  function initVenueMap() {
    var coordinates = {lat:9.62536, lng: 123.8010313};
    var map = new google.maps.Map($('#location-map'), {
      zoom: 4,
      center: coordinates
    });
    var marker = new google.maps.Marker({
      position: coordinates,
      map: map
    });
  }
});
