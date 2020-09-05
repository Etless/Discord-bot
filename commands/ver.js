const User  = require('../modules/user/User.js');
const Guild = require('../modules/guild/Guild.js');

module.exports = {
  name: 'ver',
  description: 'Write down the verse.',
  guildOnly: true,
  execute(message, args) {
    const guild = new Guild(message.guild);

    if (guild.verse.checkVerse(args[0])) {
      const user = new User(message.member);
      user.balance.add(100);
      user.saint.add(20);
      user.save();
      message.reply('you are correct.');
    } else {
      message.reply('this shit is wrong.');
    }
    guild.save();
  },
};
