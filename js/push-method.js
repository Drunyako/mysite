import { main } from './main-function.js';
window.OneSignalDeferred = window.OneSignalDeferred || [];
export var push = {
    init: function() {
        this.titleNotification = '';
        this.buttonCancel = '';
        this.buttonSubscribe = '';
        this.langQuery = localStorage.getItem('lnpush');
        this.TimeCheckUserId = 0;
        this.TimerId = null;
        this.oneSignalContainerPrompt = '';
        this.oneSignalButtonCancelPrompt = '';
        this.oneSignalButtonAcceptPrompt = '';
    },

    initPushOneSignal: function(status_redirect) {
        OneSignalDeferred.push((OneSignal) => {
            OneSignal.init({
                appId: "81d5d9e6-33bc-4916-926a-942d8072e051"
            }).then(() => {
                return OneSignal.Notifications.requestPermission();
            }).then((permission) => {
                console.log(permission, 'permission 24' ,OneSignalDeferred.length)
                return this.checkPermissionOneSignalMethod();
            }).then((permission) => {
                console.log(permission, 'permission 27', OneSignalDeferred.length)
                if (permission) {
                    return this.getIdUserOneSignalMethod();
                } else {
                    return 'decline';
                }
            }).then((idUser) => {
                console.log('idUser', idUser)
                if(status_redirect === 'redirect') {
                    main.sendInslallWebRedirectPush(idUser, status_redirect);
                } else {
                    main.startAnimationPreloaderPwa(idUser, status_redirect);
                }
            }).catch((e) => {
                console.error('OneSignal SDK initialization failed:', e);
            })
        });
        setTimeout(() => {
            if (!window.OneSignal) {
                console.error('OneSignal SDK is not loaded');
                (async () => {
                    try {
                        if (status_redirect === 'redirect') {
                            console.log('23')
                            await main.sendInslallWebRedirectPush('error', status_redirect);
                        } else if (status_redirect === 'install') {
                            console.log('26')
                            await main.startAnimationPreloaderPwa('error', status_redirect);
                        }
                    } catch (error) {
                        console.error('Error in startAnimationPreloaderPwa:', error);
                    }
                })();
                return;
            }
        }, 2000)
    },


    showNativePrompt: function (status_pwa) {
        let pwa_offer_redirect = status_pwa;
        this.initPushOneSignal(pwa_offer_redirect);
    },

    checkPermissionOneSignalMethod: function() {
        return new Promise((resolve) => {
            OneSignalDeferred.push(function(OneSignal) {
                let permission = OneSignal.Notifications.permission;
                resolve(permission);
            });
        });
    },

    getIdUserOneSignalMethod: function() {
        return new Promise((resolve) => {
            OneSignalDeferred.push((OneSignal) => {
                let idUser = OneSignal.User.PushSubscription.id;
                resolve(idUser);
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', function() {
    push.init();
});
