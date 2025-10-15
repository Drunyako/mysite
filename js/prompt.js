import { main } from './main-function.js';

export var prompt = {
    deferredPrompt: null,
    flagFastInstall: null,
    flagLongInstall: null,
    init: function () {
        this.initPwaPrompt();
    },
    initPwaPrompt: function () {
        window.addEventListener('beforeinstallprompt', function(event) {
            event.preventDefault();
            this.deferredPrompt = event;
            this.flagFastInstall = 1;
            this.flagLongInstall = 0;
        }.bind(this));
    }
}
