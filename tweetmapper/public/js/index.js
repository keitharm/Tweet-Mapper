$(function() {
  window.markers = [];

  // Slide down at start
  $("#search").slideDown(1000);

  $("form").on("submit", function(e) {
    e.preventDefault();
    window.user = $('#handle').val();

    // Hide search and show Nyan Cat loader
    $("#search").fadeOut(1000, function() {
      $("#loading").fadeIn(1000);
    });

    $.ajax({
      type: 'GET',
      url: '/fetchUser/' + $('#handle').val() + '/3200',
      success: function (data) {
        window.sent = data;
        var coords = data;
        var avg = avgCoords(coords);
        $("#loading").fadeOut(1000, function() {
          window.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: avg[0], lng: avg[1]},
            zoom: 3
          });
          $("#map").fadeIn(1000, function() {
            $("#tweet").show();
            var tot = coords.info.received;
            for (var i = 0; i < tot; i++) {
              var interval;
              if (tot < 50) {
                interval = 50
              } else if (tot < 100) {
                interval = 25;
              } else if (tot < 200) {
                interval = 15;
              } else if (tot < 600) {
                interval = 6;
              } else {
                interval = 3;
              }
              addMarkerWithTimeout(coords.coords[i].coords, i * interval, i);
            }

            // coords.coords.forEach(function(coord) {
            //   var coord = coord.coords
            //   new google.maps.Marker({
            //     map: map,
            //     animation: google.maps.Animation.DROP,
            //     position: {lat: coord[0], lng: coord[1]}
            //   });
            //});
            /*
            marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: {lat: avg[0], lng: avg[1]}
            });
            */
            /*
            quad(0, 0, coords.info.received, 5000);
            function quad(t, b, c, d) {
              t /= d/2;
              if (t < 1) return c/2*t*t + b;
              t--;
              return -c/2 * (t*(t-2) - 1) + b;
            };
            */
          });
        })
      }
    });
  });

  var avgCoords = function(coords) {
    var sum = coords.coords.reduce(function(prev, current) {
      var set = current.coords;
      return [prev[0] + set[0], prev[1] + set[1]];
    }, [0,0]);
    var avg = [sum[0]/coords.info.received, sum[1]/coords.info.received];
    return avg;
  }

  var addMarkerWithTimeout = function(position, timeout, index) {
    window.setTimeout(function() {
      var marker = new google.maps.Marker({
        position: {lat: position[0], lng: position[1]},
        map: map,
        animation: google.maps.Animation.DROP,
        index: index
      });

      marker.addListener('mouseover', function() {
        $("#tweet").html('<blockquote class="twitter-tweet" data-cards="hidden" lang="en"><p lang="en" dir="ltr"><a id="tweetsrc" href="https://twitter.com/' + user + '/status/' + sent.coords[this.index].id + '"></a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>');
      });

      markers.push(marker);
    }, timeout);
  }
});
