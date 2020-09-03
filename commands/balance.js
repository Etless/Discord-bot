const User = require('../modules/user/User.js');

module.exports = {
  name: 'balance',
  description: 'Get balance.',
  guildOnly: true,
  execute(message, args) {
    const user = new User(message.member);
    message.reply('has '+user.balance.get()+' Holy points.');
  },
};
