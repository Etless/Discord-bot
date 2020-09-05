module.exports = class {
  constructor(user) {
    this.user = user;
    this.time = user._json['pray']['timestamp'];
  }

  get() { return this.time; }
  now() { this.time = new Date().getTime(); }
  diff() {
    var now = new Date().getTime();
    var diff = Math.abs(now - this.time) * 0.00000027777; // 3600000
    return diff;
  }

  _save() {
    this.user._json['pray']['timestamp'] = this.time;
  }
}
