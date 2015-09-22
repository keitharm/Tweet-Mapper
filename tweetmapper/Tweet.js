var Tweet = function(tweet) {
  this.data = tweet;
};

Tweet.prototype.getCoords = function(array) {
  array = array || false;

  // Specific point - 37.833238,-122.357031
  if (this.data.coordinates !== null) {
    var raw_coords = this.data.coordinates.coordinates;
    return array ? [raw_coords[1], raw_coords[0]] : raw_coords[1] + " " + raw_coords[0];

  // Bounding Box
  } else if (this.data.place && Array.isArray(this.data.place.bounding_box.coordinates)) {
    var box = this.data.place.bounding_box.coordinates;
    var sum = box[0].reduce(function(prev, current) {
      return [prev[0] + current[0], prev[1] + current[1]];
    });
    var coords = [sum[0]/4, sum[1]/4];
    return array ? [coords[1], coords[0]] : coords[1] + "," + coords[0];

  // No coords
  } else {
    return array ? [] : "n/a";
  }
};

Tweet.prototype.getStatus = function() {
  return this.data.text;
};

Tweet.prototype.getID = function() {
  return this.data.id;
};

Tweet.prototype.getDate = function() {
  return this.data.created_at;
}


module.exports = Tweet;