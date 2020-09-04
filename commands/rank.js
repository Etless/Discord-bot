const User = require('../modules/user/User.js');

module.exports = {
  name: 'rank',
  description: 'Get your rank.',
  guildOnly: true,
  execute(message, args) {
    const user = new User(message.member);
    message.reply(user.saint.get());
  },
};
