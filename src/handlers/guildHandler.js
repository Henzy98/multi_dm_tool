const UI = require('../utils/ui');
const HENZY = require('../core/henzyCore');
const chalk = require('chalk');
const readlineSync = require('readline-sync');

const guildHandler = {
    async leaveAllGuilds(client) {
        try {
            UI.info('Sunucular yükleniyor...');

            const guilds = client.guilds.cache;
            const totalGuilds = guilds.size;

            if (totalGuilds === 0) {
                UI.warning('Çıkılacak sunucu bulunamadı');
                return;
            }

            UI.info(`Toplam ${totalGuilds} sunucu bulundu\n`);

            const useWhitelist = readlineSync.keyInYN('Whitelist kullanmak istiyor musunuz?');

            if (useWhitelist) {
                UI.info('\nWhitelist\'e eklemek için sunucu ID\'lerini girin (bitirmek için boş bırakın):');
                while (true) {
                    const guildId = readlineSync.question('Sunucu ID: ');
                    if (!guildId) break;

                    const guild = guilds.get(guildId);
                    if (guild) {
                        HENZY.addToGuildWhitelist(guildId);
                        UI.success(`Eklendi: ${guild.name}`);
                    } else {
                        UI.error('Sunucu bulunamadı');
                    }
                }
            }

            console.log(chalk.gray('\n' + '━'.repeat(60)));
            UI.warning('⚠️  TÜM SUNUCULARDAN ÇIKILACAK!');
            UI.warning('⚠️  BU İŞLEM GERİ ALINAMAZ!');
            console.log(chalk.gray('━'.repeat(60)));

            const confirm = readlineSync.keyInYN('\nDevam etmek istediğinize emin misiniz?');
            if (!confirm) {
                UI.info('İşlem iptal edildi');
                return;
            }

            UI.info('\nİşlem başlıyor...\n');

            let processed = 0;
            let left = 0;
            let skipped = 0;
            let failed = 0;

            for (const [guildId, guild] of guilds) {
                processed++;
                const guildName = guild.name;

                if (HENZY.isGuildWhitelisted(guildId)) {
                    UI.warning(`Atlandı (Whitelist): ${guildName}`);
                    skipped++;
                    continue;
                }

                try {
                    await guild.leave();
                    UI.success(`Çıkıldı: ${guildName}`);
                    left++;
                    await this.delay(1200);
                } catch (error) {
                    UI.error(`Çıkılamadı: ${guildName} - ${error.message}`);
                    failed++;
                }

                UI.progress(processed, totalGuilds, guildName);
            }

            console.log(chalk.gray('\n' + '━'.repeat(60)));
            UI.success(`İşlem tamamlandı!`);
            UI.info(`Toplam: ${totalGuilds} sunucu`);
            UI.info(`Çıkılan: ${left} sunucu`);
            UI.info(`Atlanan: ${skipped} sunucu (Whitelist)`);
            if (failed > 0) {
                UI.warning(`Başarısız: ${failed} sunucu`);
            }
            console.log(chalk.gray('━'.repeat(60)));

        } catch (error) {
            UI.error(`Kritik hata: ${error.message}`);
        }
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

module.exports = guildHandler;
