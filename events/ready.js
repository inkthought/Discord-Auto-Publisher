const bot = require('../bot.js').bot;
const config = require('../config.json');
const logger = require('../modules/logger.js');
const blacklist = require('../modules/blacklistManager.js');

module.exports = async () => {
	logger.log('Connected!', 'ready');

	function presence() {
		const servers = bot.guilds.cache.size;
		logger.log(`Updating presence. Servers: ${servers}`, 'debug');

		bot.user.setPresence({
			activity: {
				name: `inkthought labs`,
				type: 'WATCHING',
			},
		})
			.catch((error) => logger.log(error, 'error'));
	}

	presence();
	setInterval(() => { presence(); }, config.presenceInterval * 60 * 1000);

	// Checks for blacklisted guilds and leaves them
	logger.log('Checking for blacklisted guilds.', 'debug');
	blacklist.startupCheck();

	// Calculates all members across all guilds
	logger.log('Calculating total members across all servers.', 'debug');

	let totalMembers = 0;
	bot.guilds.cache.forEach(guild => {
		if (!blacklist.check(guild)) totalMembers += guild.memberCount;
	});

	logger.log(`Publishing on ${bot.guilds.cache.size} servers with ${totalMembers.toLocaleString(config.log.locale)} total members.`, 'info');
};
