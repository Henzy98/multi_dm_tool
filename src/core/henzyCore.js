const fs = require('fs');
const path = require('path');

const HENZY = {
    configPath: path.join(__dirname, '../../config/config.henzy'),

    loadConfig() {
        try {
            const data = fs.readFileSync(this.configPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Config yüklenemedi:', error.message);
            process.exit(1);
        }
    },

    saveConfig(config) {
        try {
            fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
            return true;
        } catch (error) {
            console.error('Config kaydedilemedi:', error.message);
            return false;
        }
    },

    addToWhitelist(userId) {
        const config = this.loadConfig();
        if (!config.whitelist.includes(userId)) {
            config.whitelist.push(userId);
            this.saveConfig(config);
            return true;
        }
        return false;
    },

    removeFromWhitelist(userId) {
        const config = this.loadConfig();
        const index = config.whitelist.indexOf(userId);
        if (index > -1) {
            config.whitelist.splice(index, 1);
            this.saveConfig(config);
            return true;
        }
        return false;
    },

    isWhitelisted(userId) {
        const config = this.loadConfig();
        return config.whitelist.includes(userId);
    },

    addToGuildWhitelist(guildId) {
        const config = this.loadConfig();
        if (!config.guildWhitelist) config.guildWhitelist = [];
        if (!config.guildWhitelist.includes(guildId)) {
            config.guildWhitelist.push(guildId);
            this.saveConfig(config);
            return true;
        }
        return false;
    },

    removeFromGuildWhitelist(guildId) {
        const config = this.loadConfig();
        if (!config.guildWhitelist) return false;
        const index = config.guildWhitelist.indexOf(guildId);
        if (index > -1) {
            config.guildWhitelist.splice(index, 1);
            this.saveConfig(config);
            return true;
        }
        return false;
    },

    isGuildWhitelisted(guildId) {
        const config = this.loadConfig();
        return config.guildWhitelist && config.guildWhitelist.includes(guildId);
    },

    addToGroupWhitelist(channelId) {
        const config = this.loadConfig();
        if (!config.groupWhitelist) config.groupWhitelist = [];
        if (!config.groupWhitelist.includes(channelId)) {
            config.groupWhitelist.push(channelId);
            this.saveConfig(config);
            return true;
        }
        return false;
    },

    removeFromGroupWhitelist(channelId) {
        const config = this.loadConfig();
        if (!config.groupWhitelist) return false;
        const index = config.groupWhitelist.indexOf(channelId);
        if (index > -1) {
            config.groupWhitelist.splice(index, 1);
            this.saveConfig(config);
            return true;
        }
        return false;
    },

    isGroupWhitelisted(channelId) {
        const config = this.loadConfig();
        return config.groupWhitelist && config.groupWhitelist.includes(channelId);
    }
};

module.exports = HENZY;
