const User = require('../modules/user/User.js');

module.exports = {
  name: 'rank',
  description: 'Get your rank.',
  guildOnly: true,
  adminOnly: false,
  execute(message, args) {

    if (args[0] === '-user') {
      // Check if someone has been mentioned in the message
      const member = message.mentions.members.first();
      if (member == null)
        return message.reply('You need to mention a user to see their rank!');

      const user = new User(member);
      return message.channel.send(`${user.member}`+", "+user.saint.get());
    }

    // Default response
    const user = new User(message.member);
    message.reply(user.saint.get());
  },
};
