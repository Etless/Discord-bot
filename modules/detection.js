const fs = require('fs');
const User = require('./user/User.js');

const punishment = -10;
const words = [];

// Filter commands to only javascript files
const Files = fs.readdirSync('../words');
for (const file of Files) {
  const data = fs.readFileSync(`../words/${file}`, 'utf8')
    .toLowerCase().split(/\r?\n/);

  for (const word of data) {
    if (word.trim() === "") continue;
    words.push(word);
  }
}

module.exports = function(message) {
    const msg = message.content;

    for (const word of words) {
      if (msg.includes(word)) {
        console.log("Detected \""+word+"\"");
        message.reply("Bitch! I heard that!");
        const user = new User(message.member);
        user.sin.add(punishment);
        user.save();
        return;
      }
    }
};
