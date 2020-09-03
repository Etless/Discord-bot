const User = require('../modules/user.js');

module.exports = {
  name: 'balance',
  description: 'Get balance',
  guildOnly: true,
  execute(message, args) {
    const user = new User(message.member);
    message.channel.send(user.balance.get());
  },
};
