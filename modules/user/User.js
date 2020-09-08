// fs path has the same path as the main javascript (app.js)
const fs = require('fs');
const jsonTemplate = JSON.stringify(require('./template.json'));

// Load classes
const saintOmeter = require('./saintOmeter.js');
const Time   = require('./Time.js');
const {Role} = require('../Role.js')

module.exports = class {
  constructor(member) {
    this.member = member;
    this._load();

    // Load classes from json
    this.balance = new Balance(this);
    this.saint   = new saintOmeter(this);
    this.time    = new Time(this);
    this.role    = new Role(this);
  }

  // Load json
  _load() {
    var data = {};
    try {
      // Try to load data
      data = JSON.parse(fs.readFileSync('../data/'+this.member.user.id+'.json', 'utf8'));
    } catch (err) {
      // Use template.json for new members
      data = JSON.parse(jsonTemplate);
    }
    // Set json as data
    this._json = data;
  }

  // Save json
  save() {
    // Save classes to json
    this.balance._save();
    this.saint._save();
    this.time._save();
    this.role._save();

    try {
      // Try to write json
      fs.writeFileSync('../data/'+this.member.user.id+'.json', JSON.stringify(this._json, null, 2), 'utf8');
      console.log('Saved json to client : '+this.member.user.id);
    } catch(err) {
      console.log(err);
    }
  }
}

// Handle balance of user
class Balance {
  constructor(user) {
    this.user = user;
    this.balance = user._json['balance'];
  }

  // Balance "operators"
  get()      { return this.balance; }
  add(money) { return this.balance += money; }

  // Save balance to _json
  _save() {
    this.user._json['balance'] = this.balance;
  }
}
