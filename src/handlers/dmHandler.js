const HENZY = require('../core/henzyCore');
const UI = require('../utils/ui');
const chalk = require('chalk');
const readlineSync = require('readline-sync');

const dmHandler = {
    async cleanAllDMs(client) {
        try {
            UI.info('DM kanalları yükleniyor...');

            const dmChannels = client.channels.cache.filter(c => c.type === 'DM');
            const totalChannels = dmChannels.size;

            if (totalChannels === 0) {
                UI.warning('Temizlenecek DM bulunamadı');
                return;
            }

            UI.info(`Toplam ${totalChannels} DM kanalı bulundu\n`);

            console.log(chalk.gray('━'.repeat(60)));
            UI.warning('⚠️  TÜM DM MESAJLARINIZ SİLİNECEK!');
            UI.warning('⚠️  BU İŞLEM GERİ ALINAMAZ!');
            UI.info('ℹ️  Whitelist\'teki kullanıcılar atlanacak');
            console.log(chalk.gray('━'.repeat(60)));

            const confirm = readlineSync.keyInYN('\nDevam etmek istediğinize emin misiniz?');
            if (!confirm) {
                UI.info('İşlem iptal edildi');
                return;
            }

            UI.info('\nTemizlik başlıyor...\n');

            let processed = 0;
            let deleted = 0;
            let skipped = 0;

            for (const [channelId, channel] of dmChannels) {
                processed++;
                const recipient = channel.recipient;
                const username = recipient ? recipient.tag : 'Bilinmeyen';
                const userId = recipient ? recipient.id : null;

                if (userId && HENZY.isWhitelisted(userId)) {
                    UI.warning(`Atlandı (Whitelist): ${username}`);
                    skipped++;
                    continue;
                }

                try {
                    let messages = await channel.messages.fetch({ limit: 100 });
                    let totalDeleted = 0;

                    while (messages.size > 0) {
                        const userMessages = messages.filter(m => m.author.id === client.user.id);

                        for (const msg of userMessages.values()) {
                            try {
                                await msg.delete();
                                totalDeleted++;
                                await this.delay(350);
                            } catch (err) {
                                if (err.code !== 10008) {
                                    UI.error(`Mesaj silinemedi: ${err.message}`);
                                }
                            }
                        }

                        if (userMessages.size === 0) break;

                        messages = await channel.messages.fetch({ limit: 100 });
                        await this.delay(600);
                    }

                    if (totalDeleted > 0) {
                        UI.success(`${username} - ${totalDeleted} mesaj silindi`);
                        deleted += totalDeleted;
                    } else {
                        UI.info(`${username} - Mesaj yok`);
                    }

                } catch (error) {
                    UI.error(`${username} - Hata: ${error.message}`);
                }

                UI.progress(processed, totalChannels, username);
            }

            console.log(chalk.gray('\n' + '━'.repeat(60)));
            UI.success(`Temizlik tamamlandı!`);
            UI.info(`Toplam: ${totalChannels} kanal`);
            UI.info(`Silinen: ${deleted} mesaj`);
            UI.info(`Atlanan: ${skipped} kanal (Whitelist)`);
            console.log(chalk.gray('━'.repeat(60)));

        } catch (error) {
            UI.error(`Kritik hata: ${error.message}`);
        }
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

module.exports = dmHandler;
