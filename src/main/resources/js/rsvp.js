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
          email: $('#email').val()
        },
        success: function (data) {
          
        }
      });

      $('#submit').button('reset');
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
