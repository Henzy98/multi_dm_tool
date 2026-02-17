const UI = require('../utils/ui');
const HENZY = require('../core/henzyCore');
const chalk = require('chalk');
const readlineSync = require('readline-sync');

const groupHandler = {
    async leaveAllGroups(client) {
        try {
            UI.info('Grup DM\'ler yükleniyor...');

            const groupChannels = client.channels.cache.filter(c => c.type === 'GROUP_DM');
            const totalGroups = groupChannels.size;

            if (totalGroups === 0) {
                UI.warning('Çıkılacak grup bulunamadı');
                return;
            }

            UI.info(`Toplam ${totalGroups} grup bulundu\n`);

            const useWhitelist = readlineSync.keyInYN('Whitelist kullanmak istiyor musunuz?');

            if (useWhitelist) {
                UI.info('\nWhitelist\'e eklemek için grup ID\'lerini girin (bitirmek için boş bırakın):');
                while (true) {
                    const channelId = readlineSync.question('Grup ID: ');
                    if (!channelId) break;

                    const channel = groupChannels.get(channelId);
                    if (channel) {
                        HENZY.addToGroupWhitelist(channelId);
                        UI.success(`Eklendi: ${channel.name || 'İsimsiz Grup'}`);
                    } else {
                        UI.error('Grup bulunamadı');
                    }
                }
            }

            console.log(chalk.gray('\n' + '━'.repeat(60)));
            UI.warning('⚠️  TÜM GRUPLARDAN ÇIKILACAK!');
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

            for (const [channelId, channel] of groupChannels) {
                processed++;
                const groupName = channel.name || 'İsimsiz Grup';

                if (HENZY.isGroupWhitelisted(channelId)) {
                    UI.warning(`Atlandı (Whitelist): ${groupName}`);
                    skipped++;
                    continue;
                }

                try {
                    await channel.delete();
                    UI.success(`Çıkıldı: ${groupName}`);
                    left++;
                    await this.delay(1000);
                } catch (error) {
                    UI.error(`Çıkılamadı: ${groupName} - ${error.message}`);
                    failed++;
                }

                UI.progress(processed, totalGroups, groupName);
            }

            console.log(chalk.gray('\n' + '━'.repeat(60)));
            UI.success(`İşlem tamamlandı!`);
            UI.info(`Toplam: ${totalGroups} grup`);
            UI.info(`Çıkılan: ${left} grup`);
            UI.info(`Atlanan: ${skipped} grup (Whitelist)`);
            if (failed > 0) {
                UI.warning(`Başarısız: ${failed} grup`);
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

module.exports = groupHandler;
