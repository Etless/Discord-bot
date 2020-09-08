const User = require('../modules/user/User.js');
const {create} = require('../modules/Role.js');

module.exports = {
  name: 'init',
  description: 'Initialize bot on guild.',
  guildOnly: true,
  adminOnly: true,
  execute(message, args) {
    // Create roles and wait for the roles to be updated
    create(message.guild).then(bool => {
      if (bool) message.channel.send("Roles created.");
      else      message.channel.send("Roles are already created.");

      // Loop through members and update their roles
      var members = message.guild.members.cache;
      members.forEach(member => {
        // Check if user is not a bot
        if (!member.user.bot) {
          var user = new User(member);
          user.role.update();
        }
      });
    });
  },
};
