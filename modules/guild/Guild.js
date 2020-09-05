const Verse = require('./Verse.js');

module.exports = class {
  constructor(guild) {
    this.guild = guild;
    this._load();

    this.verse = new Verse(guild);
  }

  // Load json
  _load() {
    var data = {};
    try {
      // Try to load data
      data = JSON.parse(fs.readFileSync('../data/guild/'+this.guild.id+'.json', 'utf8'));
    } catch (err) {
      // Use template.json for new members
      data = require('./template.json');
    }
    // Set json as data
    this._json = data;
  }

  // Save json
  save() {
    this.verse.save();

    try {
      // Try to write json
      fs.writeFileSync('../data/guild/'+this.guild.id+'.json', JSON.stringify(this._json, null, 2), 'utf8');
      console.log('Saved json to guild : '+this.guild.id);
    } catch(err) {
      console.log(err);
    }
  }
}
