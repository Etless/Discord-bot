// Get random boolean
module.exports.nextBoolean = function() {
  return Math.random() >= 0.5;
}
// Get random float
module.exports.nextFloat = function() {
  return Math.random();
}
// Get random int
module.exports.nextInt = function(bound) {
  return Math.floor(Math.random() * Math.floor(bound));
}
