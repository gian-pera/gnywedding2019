$(function() {
  $('#rsvp').modal();

  $('#rsvp').on('submit', function(event) {
    event.preventDefault();
  });

  $('#rsvp #submit').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: '',
      method: 'POST',
      data: $('#rsvp-info').serialize()
    })
  });
});
