let Magix = require('magix');
let $ = require('$');
Magix.applyStyle('@index.less');
module.exports = Magix.View.extend({
    tmpl: '@index.html',
    init(data) {
        let me = this;
        me.assign(data);
        me['@{owner.node}'] = $('#' + me.id);
    },
    assign(data) {
        this.updater.set({
            lang: data.lang,
            pic: data.pic,
            disabled: (data.disabled + '') == 'true'
        });
        return true;
    },
    render() {
        let me = this;
        me.updater.digest();
    },
    '@{show.dlg}<click>'() {
        let me = this;
        me.mxDialog('@./list', {
            width: 945,
            done(pic) {
                me.updater.digest({
                    pic: pic.src
                });
                me['@{owner.node}'].trigger({
                    type: 'change',
                    pic
                });
            }
        });
    }
});