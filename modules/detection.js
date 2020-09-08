const fs = require('fs');
const User = require('./user/User.js');

const punishment = -10;

// Filter words from files
const words = [];
const Files = fs.readdirSync('../words');
for (const file of Files) {
  // Make content of file lowercase and turn it into an array
  const data = fs.readFileSync(`../words/${file}`, 'utf8')
    .toLowerCase().split(/\r?\n/);

  // Check if word isnt empty
  for (const word of data) {
    if (word.trim() !== "")
      words.push(word);;
  }
}

// Function to check if a message contains keywords
// from the words array
module.exports = function(message) {
  // Change message to lowercase
  const msg = message.content.toLowerCase();

  for (const word of words) {
    if (msg.includes(word)) {
      console.log("Detected \""+word+"\"");
      message.reply("Bitch! I heard that!");
      const user = new User(message.member);
      user.saint.add(punishment);
      user.save();
      return;
    }
  }
};
