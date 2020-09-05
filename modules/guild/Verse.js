function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const versesJson = require('../../../verses.json');
var verses = [];
for(let key in versesJson) {
  verses.push([key, versesJson[key]]);
}


module.exports = class {
  constructor(guild) {
    this.guild = guild;
    this.verse = guild._json['verse']['active'];
  }

  reset() {this.verse = -1;}
  getNewVerse() {
    let i = getRandomInt(verses.length);
    this.verse = i;
    return verses[i];
  }
  checkVerse(v) {
    if (this.verse === -1) return false;
    var bool = v.toLowerCase() === verses[this.verse][0].toLowerCase();

    if (bool) this.reset();

    return bool;
  }

  _save() {
    this.guild._json['verse']['active'] = this.verse;
  }
}
