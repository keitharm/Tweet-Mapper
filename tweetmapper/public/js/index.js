$(function() {
  var searched = false;

  // Slide down at start
  $("#search").slideDown(1000);

  $("form").on("submit", function(e) {
    e.preventDefault();

    // Hide search and show Nyan Cat loader
    $("#search").fadeOut(1000, function() {
      $("#loading").fadeIn(1000);
    });

    $.ajax({
      type: 'GET',
      url: '/fetchUser/' + $('#handle').val() + '/200',
      success: function (data) {
        var coords = data;
        var avg = avgCoords(coords);
        setTimeout(function() {
          $("#loading").fadeOut(1000, function() {
            var map;
            map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: avg[0], lng: avg[1]},
              zoom: 3
            });
            $("#map").fadeIn(1000, function() {
              coords.coords.forEach(function(coord) {
                var coord = coord.coords
                new google.maps.Marker({
                  map: map,
                  animation: google.maps.Animation.DROP,
                  position: {lat: coord[0], lng: coord[1]}
                });
              });
              /*
              marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: {lat: avg[0], lng: avg[1]}
              });
              */
              /*
              a(200, 0, 283, 2500);
              function a(t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
              };
              */
            });
          })
        }, 2000)
      }
    });
  });

  var avgCoords = function(coords) {
    var sum = coords.coords.reduce(function(prev, current) {
      var set = current.coords;
      console.log(set);
      return [prev[0] + set[0], prev[1] + set[1]];
    }, [0,0]);
    var avg = [sum[0]/coords.info.received, sum[1]/coords.info.received];
    return avg;
  }
});
