const chalk = require('chalk');

const henzyArt = `
                          =@%**#%
                          .@@*=*#
                          *@#*+#@:
                          %@%*:-#%.
                         .@#==++*@-
                          %%==:-%@+
                          *%*::*@@.
                          =+-+#%@=
                .*=::----*#*=+++#*+--:.:--+
                :+.:=-+*@@+=----:=%@#+--:=@.
                      .==+%+%%##%*%+-
                   .*-.  .%- =-*@*-...-+:
                 :*:     .%= =-.#*.     .=*.
                +:        #+ =- -*       . +:
              .-         .#@@%- -*.       . =:
              *.               :-            -.
             .:. .              +           ..=
             ::  .     .                ::   .+
             ::  .       :          ..  :-.  .#
             .==-::   ..   :    .:      .-+.::#
              #+*.:*@@@@@%=:     :-##*+=-.#*=-%
              @%:=@@@@@@@@@++*-=+@@@@@@@@@:#%#*
              @::@@@@@@@@@@%+=-+%@@@@@@@@@+-@@.
              -#.**#@@@@@@#=-=*=-%@@@@@@@@-=@+
              +=..=****%%=:-@*#@-:=*##%##+-:%-
              %....:..::-: %@##@+:.....::-.-+=
               *=: .   ..:=@@#*@@=. .....:.-+
               :+*.-##-  .:%@=+@%+:.+:+=-%#--
                .+-%%@%..=.:=:-+=::.:*@=*# .
                 *=*-*-=+.-:::=::--..++:.=
                -* +. ***+=**@##@@@+*-.  #
                   *  +...*==@+:+==- .
                       +.  .. #* *-  .   .
                          == :. :    .
                           .#-=-.
                            -%+-
                             *=

                          H E N Z Y
`;

const UI = {
    clear() {
        console.clear();
    },

    showBanner() {
        this.clear();
        console.log(chalk.red(henzyArt));
        console.log(chalk.gray('━'.repeat(60)));
    },

    showMenu() {
        console.log(chalk.cyan('\n[1]') + ' DM Temizle (Tüm Konuşmalar)');
        console.log(chalk.cyan('[2]') + ' Tüm Gruplardan Çık');
        console.log(chalk.cyan('[3]') + ' Tüm Sunuculardan Çık');
        console.log(chalk.cyan('[4]') + ' Whitelist Ekle');
        console.log(chalk.cyan('[5]') + ' Whitelist Çıkar');
        console.log(chalk.cyan('[6]') + ' Whitelist Göster');
        console.log(chalk.cyan('[7]') + ' Çıkış');
        console.log(chalk.gray('━'.repeat(60)));
    },

    success(message) {
        console.log(chalk.green('✓ ') + message);
    },

    error(message) {
        console.log(chalk.red('✗ ') + message);
    },

    info(message) {
        console.log(chalk.blue('ℹ ') + message);
    },

    warning(message) {
        console.log(chalk.yellow('⚠ ') + message);
    },

    progress(current, total, username) {
        const percentage = ((current / total) * 100).toFixed(1);
        console.log(chalk.gray(`[${current}/${total}] ${percentage}% - ${username}`));
    }
};

module.exports = UI;
