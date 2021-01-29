require('dotenv').config();

const Discord = require('discord.js-light');
const bot = new Discord.Client({
	shards: 'auto',
	cacheGuilds: true,
	cacheChannels: true,
	cacheOverwrites: false,
	cacheRoles: false,
	cacheEmojis: false,
	cachePresences: false,
	messageCacheMaxSize: 50,
});

require('./modules/initialization.js')(bot);

// Promise rejection handler
const logger = require('./modules/logger.js');

process.on('unhandledRejection', (error) => {
	logger.log(JSON.stringify(error, null, 4), 'error');
});

bot.on("message"), (message) => {
	if (message.channel.id === "804351457054031902") {
		if (!message.content.startsWith("!suggest") message.delete
	}
})

module.exports = { bot };
