const User   = require('../modules/user/User.js');
const Random = require('../modules/util/Random.js')

const reward = 10;

module.exports = {
  name: 'pray',
  description: 'Pray for forgiveness.',
  guildOnly: true,
  adminOnly: false,
  execute(message, args) {
    const _reply = ["Prayed for forgiveness :pray:","Read the bible :book:"];

    var user = new User(message.member);
    var diff = user.time.diff();

    // Check if difference between now and then is over 2 hours
    if (diff >= 2) {
      user.saint.add(reward);
      user.time.now();
      message.channel.send(`${message.author}`+" "+_reply[Random.nextInt(2)]);
      user.save();
    } else {
      // Calculate time left
      diff = 2 - diff;
      const hour = Math.floor(diff);
      const min  = Math.floor(diff % 1 * 60);
      message.channel.send(`${message.author}`+" You need to wait "+
        (hour !== 0 ? hour+"h " : "")+ // Write hours
        (min !== 0 ? min+"m" : "")+    // Write minutes
        ".");
    }
  },
};
