const Guild = require('../modules/guild/Guild.js');

module.exports = {
  name: 'init',
  description: 'Write down the verse.',
  guildOnly: true,
  execute(message, args) {
    const guild = new Guild(message.guild);

    var verse = guild.verse.getNewVerse();
    message.reply(verse[1]);

    guild.save();
  },
};
