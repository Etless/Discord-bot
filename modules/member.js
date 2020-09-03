const fs = require('fs');

module.exports = class {
  constructor(member) {
    this.member = member;

    this._load();
  }

  // Load json
  _load() {
    var data = {};
    try {
      // Try to load data
<<<<<<< HEAD
      data = JSON.parse(fs.readFileSync('../data/'+this.member.user.id+'.json', 'utf8'));
=======
      data = JSON.parse(fs.readFileSync('../data/'+this.member.user.id+'.json'));
>>>>>>> fb59bf1e91621328bfad6eed8f02ede9f97b58ea
    } catch (err) {
      // Use template.json for new members
      data = require('./template.json');
    }
    // Set json as data
    this.json = data;
  }

  // Save json
  _save() {
    try {
      // Try to write json
      fs.writeFileSync('../data/'+this.member.user.id+'.json', JSON.stringify(this.json, null, 2), 'utf8');
      console.log("Saved json to client : "+this.member.user.id);
    } catch(err) {
      console.log(err);
    }
  }
}