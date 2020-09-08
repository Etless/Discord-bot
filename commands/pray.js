const User   = require('../modules/user/User.js');
const Random = require('../modules/util/Random.js')

module.exports = {
  name: 'pray',
  description: 'Prayed for forgiveness.',
  guildOnly: true,
  adminOnly: false,
  execute(message, args) {
    const _reply = ["Prayed for forgiveness :pray:","Read the bible :book:"];

    var user = new User(message.member);
    const diff = user.time.diff();
    // Check if difference between now and then is over 2 hours
    if (diff >= 2) {
      user.saint.add(10);
      user.time.now();
      message.channel.send(`${message.author}`+" "+_reply[Random.nextInt(2)]);
    } else {
      // Calculate time left
      const hour = Math.floor(diff);
      const min  = Math.floor((diff % 1) * 60);
      message.channel.send(`${message.author}`+" You need to wait "+(hour !== 0 ? hour+"h " : "")+ (min !== 0 ? min+"m" : "") +".");
    }
    user.save();
  },
};
