function loadRecaptcha() {
  grecaptcha.render('captcha', {
    sitekey: '6LcV5kIUAAAAALz7b_jrvFGcCIkNdqSTwDEz9OnV',
    size: "invisible",
    callback: function(response) {
      $.ajax({
        type: "POST",
        url: "/rsvp",
        datatype: "json",
        data: {
          captcha: response,
          name: $('#name').val(),
          email: $('#email').val(),
          phone: $('#phone').val(),
          attendees: $('#attendees').val(),
          relationship: $('#relationship').val()
        },
        success: function (data) {
          if (data.success) {
            alert('Thank you for confirming your attendance! We\'ll be sending an email to you shortly.\n\n"We\'re excited to see you on our wedding."\n-Gian & Yssa');
            $('#submit').prop('disabled', true);
            $('#submit').html('Thank you for attending!');
          } else {
            $('#submit').button('reset');
            alert('Captcha request is invalid. Please submit your request again.');
          }
        },
        error: function(err) {
          $('#submit').button('reset');
          alert(err.responseJSON.message);
        }
      });

      grecaptcha.reset();
    }
  });
}

$(function () {
    $('#submit').on('click', function(e) {
      e.preventDefault();
      $(this).button('loading');
      grecaptcha.execute();
    });
});
