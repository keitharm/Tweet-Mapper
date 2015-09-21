$(function() {
  var searched = false;

  // Slide down at start
  $("#search").slideDown(1000);

  $("form").on("submit", function(e) {
    e.preventDefault();

    // Hide search and show Nyan Cat loader
    $("#search").fadeOut(1000, function() {
      $("#loading").fadeIn(1000);
    })

    $.ajax({
      type: 'GET',
      url: '/fetchUser/' + $('#handle').val(),
      success: function (data) {
        // Hide loading symbol
        console.log(data);
      }
    });
  });
});
