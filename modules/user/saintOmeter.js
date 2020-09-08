//sinOmeter
//hellOmeter
const min = -100;
const max =  100;

module.exports = class {
  constructor(user) {
    this.user = user;
    this.sin = user._json['saint_points'];
  }

  // Points "operators"
  get() { return this.sin; }
  add(points) {
    this.sin += points;
    if (this.sin < min) this.sin = min;
    if (this.sin > max) this.sin = max;
    return this.sin;
  }

  // Save points to _json
  _save() {
    this.user._json['saint_points'] = this.sin;
  }
}
