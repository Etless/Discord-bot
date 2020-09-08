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

    // Check what role user should be
    if (this.sin > 0) this.user.role.set(0);
    if (this.sin < 0) this.user.role.set(1);

    return this.sin;
  }

  // Save points to _json
  _save() {
    this.user._json['saint_points'] = this.sin;
  }
}
