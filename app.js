console.log('Initializing...');

// Load required library
const fs = require('fs');

// Load config file
const {prefix, token} = require('./config.json');

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
    const args = message.content.slice(prefix.lenght).trim().split(' ');
    const command = args.shift().toLowerCase();

    try {
      client.commands.get(command).execute(message, args);
    } catch (error) {
      // Handle help command
      if (command === 'help') {
        var msg = "";
        client.commands.forEach((name, command) => {
          msg += name + " : " + command.description + "\r\n";
        });
        message.reply(msg);
      } else message.reply('Huh?'); // Huh?
    }
  }

  // Word detection
});

// Connect bot to account with token
client.login(token);
