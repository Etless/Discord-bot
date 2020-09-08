module.exports = {
  name: 'ping',
  description: 'Ping!',
  guildOnly: false,
  adminOnly: false,
  execute(message, args) {
    message.channel.send('Pong!');
  },
};
