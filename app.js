console.log('Initializing...');

// Load required library
const fs = require('fs');

// Load config file
const {prefix, token} = require('config.json');

// Initialize discord api
const Discord = require('discord.js');
const client = new Discord.Client();
// Add collection of commands to client (bot)
client.commands = new Discord.Collection();

// Runs when bot is ready!
client.on('ready', () => {
  console.log('Bot is ready...');
});

// Listen for messages
client.on('message', message => {

});

// Connect bot to account with token
client.login(token);
