const { Client } = require('discord.js-selfbot-v13');
const readlineSync = require('readline-sync');
const HENZY = require('./core/henzyCore');
const UI = require('./utils/ui');
const dmHandler = require('./handlers/dmHandler');
const groupHandler = require('./handlers/groupHandler');
const guildHandler = require('./handlers/guildHandler');

const henzyClient = new Client({ checkUpdate: false });

async function main() {
    const config = HENZY.loadConfig();

    if (!config.token) {
        UI.error('Token bulunamadı! config.henzy dosyasına token ekleyin.');
        process.exit(1);
    }

    UI.showBanner();
    UI.info('Giriş yapılıyor...');

    try {
        await henzyClient.login(config.token);
    } catch (error) {
        UI.error(`Giriş başarısız: ${error.message}`);
        process.exit(1);
    }
}

henzyClient.once('ready', async () => {
    UI.success(`Giriş başarılı: ${henzyClient.user.tag}`);
    await showMainMenu();
});

async function showMainMenu() {
    while (true) {
        UI.showBanner();
        UI.info(`Kullanıcı: ${henzyClient.user.tag}`);
        UI.showMenu();

        const choice = readlineSync.question('\nSeçim: ');

        switch (choice) {
            case '1':
                await dmHandler.cleanAllDMs(henzyClient);
                readlineSync.question('\nDevam etmek için Enter...');
                break;

            case '2':
                await groupHandler.leaveAllGroups(henzyClient);
                readlineSync.question('\nDevam etmek için Enter...');
                break;

            case '3':
                await guildHandler.leaveAllGuilds(henzyClient);
                readlineSync.question('\nDevam etmek için Enter...');
                break;

            case '4':
                const addId = readlineSync.question('Eklenecek User ID: ');
                if (HENZY.addToWhitelist(addId)) {
                    UI.success('Whitelist\'e eklendi');
                } else {
                    UI.warning('Zaten whitelist\'te');
                }
                readlineSync.question('\nDevam etmek için Enter...');
                break;

            case '5':
                const removeId = readlineSync.question('Çıkarılacak User ID: ');
                if (HENZY.removeFromWhitelist(removeId)) {
                    UI.success('Whitelist\'ten çıkarıldı');
                } else {
                    UI.warning('Whitelist\'te bulunamadı');
                }
                readlineSync.question('\nDevam etmek için Enter...');
                break;

            case '6':
                const config = HENZY.loadConfig();
                UI.info(`Whitelist (${config.whitelist.length} kişi):`);
                if (config.whitelist.length === 0) {
                    UI.warning('Whitelist boş');
                } else {
                    config.whitelist.forEach((id, index) => {
                        console.log(`  ${index + 1}. ${id}`);
                    });
                }
                readlineSync.question('\nDevam etmek için Enter...');
                break;

            case '7':
                UI.info('Çıkış yapılıyor...');
                process.exit(0);

            default:
                UI.error('Geçersiz seçim');
                readlineSync.question('\nDevam etmek için Enter...');
        }
    }
}

main();
