// fs path has the same path as the main javascript (app.js)
const fs = require('fs');

const sinOmeter = require('./sinOmeter.js');

module.exports = class {
  constructor(member) {
    this.member = member;
    this._load();

    this.balance = new Balance(this);
    this.sin     = new sinOmeter(this);
  }

  // Load json
  _load() {
    var data = {};
    try {
      // Try to load data
      data = JSON.parse(fs.readFileSync('../data/'+this.member.user.id+'.json', 'utf8'));
    } catch (err) {
      // Use template.json for new members
      data = require('./template.json');
    }
    // Set json as data
    this._json = data;
  }

  // Save json
  save() {
    this.balance._save();
    this.sin._save();
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

  get()      { return this.balance; }
  add(money) { return this.balance += money; }

  _save() {
    this.user._json['balance'] = this.balance;
  }
}
