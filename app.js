console.log('Initializing...');

// Load required library
const fs = require('fs');
const member = require('./modules/member.js');

// Load config file
const {prefix, token} = require('../config.json'); // ./config.json

// Initialize discord api
const Discord = require('discord.js');
const client = new Discord.Client();

// Add collection of commands to client (bot)
client.commands = new Discord.Collection();

// Filter commands to only javascript files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Runs when bot is ready!
client.on('ready', () => {
  console.log('Bot is ready...');
});

// Listen for messages
client.on('message', message => {
  // Return if message is sent by a bot
  if (message.author.bot) return;

  // Commands
  if (message.content.startsWith(prefix)) {
    // Change message to array and use shift to remove command out of arguments.
    const args = message.content.slice(prefix.length).trim().split(' ');
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) {
      return message.reply('Huh?'); // Huh?
    }
    // Check if command can only be called in guild
    if (command.guildOnly && message.channel.type === 'dm')
      return message.reply('I can\'t execute that command inside DMs!');

    command.execute(message, args);
  }

  // Word detection
});

// Connect bot to account with token
client.login(token);
