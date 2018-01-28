(function () {

  $('#submit').on('click', function(e)) {
    e.preventDefault();
    alert(JSON.stringify(token));
  }

}());
