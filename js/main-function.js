import { prompt } from './prompt.js';
import { push } from './push-method.js';

export var main = {
    svg: null,
    animations: null,
    contentAfter: null,
    commentTops: null,
    buttonMenus: null,
    popupMenu: null,
    commentSpans: null,
    urlPwa: null,
    userRedirectInPwaRedirect: null,
    userRedirectInSiteRedirect: null,
    mainContainer: null,
    appLoaderAnimation: null,
    urlPwaLinkQuery: null,
    buttonLoader: null,
    securePwaKey: null,
    userLeadId: null,
    languageCodePwa: null,
    buttonInstallPwa: null,

    buttonTextInstall: "Installare",
    buttonTextInstallation: "Installazione",
    buttonTextOpen: "Aprire",
    buttonTextInstalled: "Installare",
    buttonTextDownloading: "Scaricare",
    buttonTextDownload: "Download in corso",

    init: function () {
        this.redirectFacebookToBrowser();
        prompt.init();
        this.userRedirectInPwaRedirect = localStorage.getItem('u_install');
        this.userRedirectInSiteRedirect = localStorage.getItem('u_redirect');
        this.urlPwaLinkQuery = new URL(location.href);
        this.securePwaKey = this.urlPwaLinkQuery.searchParams.get('key');
        this.userLeadId = this.urlPwaLinkQuery.searchParams.get('lead_id');
        this.languageCodePwa = this.urlPwaLinkQuery.searchParams.get('ln');
        this.mainContainer = $('.container');
        this.appLoaderAnimation = $('.open_animation');
        this.svg = document.querySelector('.open_animation__svg');
        this.animations = this.svg.getElementsByTagName('animateTransform');
        this.contentAfter = document.querySelector('.open_animation__content');
        this.urlPwa = `${window.location.hostname}${window.location.pathname}`;
        this.buttonLoader = $('.loader');
        this.buttonInstallPwa = $('#firstButton');
        this.statusRegisterEvent();
        this.showButtonLoader();
        this.addDomainManifest();
        this.userRedirectInPwa();
        this.userRedirectInSite();
        this.pageComponents();
        this.hidePopup();
        this.addEventToButtonReview();
        this.eventInitButtonUsefulReview();
        this.showPopupSpam();
        this.showPopupGallery();
        this.hidePopupGallery();
        this.saveParametersLocalStorage();
        this.hideListReview();
        this.showFullListReview();
        this.backButtonRedirect();
        this.preloaderContainer();
    },

    preloaderContainer: function() {
        let redirectStatus = localStorage.getItem('redirect_status');

        if (redirectStatus) {
            $('.preloader-gplay').addClass('hide-preloader');
        }
    },

    backButtonRedirect: function() {
        const urlObject = new URL(window.location.href);
        let sub1 = urlObject.searchParams.get('sub1');
        let sub2 = urlObject.searchParams.get('sub2');
        let sub3 = urlObject.searchParams.get('sub3');
        let sub4 = urlObject.searchParams.get('sub4');
        let sub5 = urlObject.searchParams.get('sub5');
        let sub6 = urlObject.searchParams.get('sub6');
        let sub15 = urlObject.searchParams.get('sub15');
        let sub16 = urlObject.searchParams.get('sub16');
        let sub17 = urlObject.searchParams.get('sub17');
        let sub18 = urlObject.searchParams.get('sub18');
        let sub19 = urlObject.searchParams.get('sub19');
        let sub20 = urlObject.searchParams.get('sub20');
        let leadId = this.userLeadId;

        const self = this
        $('#buttonBack').on('click', function() {
            window.location.href = `${urlObject.origin}${urlObject.pathname}?lead_id=${leadId}&sub_id_30=open_offer&sub1=${sub1}&sub2=${sub2}&sub3=${sub3}&sub4=${sub4}&sub5=${sub5}&sub6=${sub6}&sub9=decline&sub10=backbtn&sub15=${sub15}&sub16=${sub16}&sub17=${sub17}&sub18=${sub18}&sub19=${sub19}&sub20=${sub20}`;
        })
    },

    iosSecondClick: function() {
        const urlObject = new URL(window.location.href);
        let sub1 = urlObject.searchParams.get('sub1');
        let sub2 = urlObject.searchParams.get('sub2');
        let sub3 = urlObject.searchParams.get('sub3');
        let sub4 = urlObject.searchParams.get('sub4');
        let sub5 = urlObject.searchParams.get('sub5');
        let sub6 = urlObject.searchParams.get('sub6');
        let sub15 = urlObject.searchParams.get('sub15');
        let sub16 = urlObject.searchParams.get('sub16');
        let sub17 = urlObject.searchParams.get('sub17');
        let sub18 = urlObject.searchParams.get('sub18');
        let sub19 = urlObject.searchParams.get('sub19');
        let sub20 = urlObject.searchParams.get('sub20');
        let leadId = this.userLeadId;
        let self =  this;
        self.buttonInstallPwa.on('click', function() {
            self.sendInstallUser(leadId, null, 'redirect')
                .then(res =>
                    window.location.href = `${urlObject.origin}${urlObject.pathname}?lead_id=${leadId}&sub_id_30=open_offer&sub1=${sub1}&sub2=${sub2}&sub3=${sub3}&sub4=${sub4}&sub5=${sub5}&sub6=${sub6}&sub9=decline&sub10=ios_redirect&sub15=${sub15}&sub16=${sub16}&sub17=${sub17}&sub18=${sub18}&sub19=${sub19}&sub20=${sub20}`
                )
                .catch(e => {
                    window.location.href = `${urlObject.origin}${urlObject.pathname}?lead_id=${leadId}&sub_id_30=open_offer&sub1=${sub1}&sub2=${sub2}&sub3=${sub3}&sub4=${sub4}&sub5=${sub5}&sub6=${sub6}&sub9=decline&sub10=ios_redirect&sub15=${sub15}&sub16=${sub16}&sub17=${sub17}&sub18=${sub18}&sub19=${sub19}&sub20=${sub20}`
                });
        })
    },

    downloadingAnimation: function() {
            const userAgent = navigator.userAgent.toLowerCase();
            const isIOS = userAgent.includes('iphone') || userAgent.includes('ipad');
            const isSafari = /safari/i.test(userAgent) && !/chrome/i.test(userAgent);

        const self = this

        if (isIOS || isSafari) {
            this.buttonInstallPwa.html(this.buttonTextDownloading);
            let firstClick = true;

            this.buttonInstallPwa.on('click', () => {
                if (firstClick) {
                    let containerTitle = $('.title');
                    let imageIconPwa = $('.img-avatar');
                    let preloaderContainer = $('.preloader');
                    imageIconPwa.css({ 'width': '60%', 'height': '60%' });
                    containerTitle.append(
                        '<svg class="preloader" viewbox="0 0 100 100">\
                            <path fill="none"\
                            stroke-linecap="round"\
                            stroke-width="5"\
                            stroke="#fff"\
                            stroke-dasharray="281.2,0"\
                            d="M50 5 a 40 40 0 0 1 0 90 a 40 40 0 0 1 0 -90"\
                            />\
                            <path fill="none"\
                            stroke-linecap="round"\
                            stroke-width="5"\
                            stroke="var(--main-color)"\
                            stroke-dasharray="281.2,0"\
                            d="M50 5 a 40 40 0 0 1 0 90 a 40 40 0 0 1 0 -90"\
                            >\
                            <animate class="preload-animation" attributeName="stroke-dasharray" from="0,281.2" to="281.2,0" dur="7s"/>\
                            </path>\
                        </svg>');
                    this.buttonInstallPwa.html('');
                    this.animationDownloading();
                    this.buttonDownloadingAnimation(this.buttonTextDownload);

                    setTimeout(function() {
                        imageIconPwa.css({'width': '100%', 'height': '100%'});
                        $('.preloader').css({'display': 'none'});
                        self.buttonInstallPwa.off('click');
                        self.removeButtonAnimationDownload();
                        self.buttonInstallPwa.html(self.buttonTextOpen);
                        self.iosSecondClick();
                    }, 9000);
                } else {
                    self.iosSecondClick();
                }
            });
            console.log(firstClick, 'firstClick')
        } else {
            this.buttonInstallPwa.html(this.buttonTextDownloading);
            this.buttonInstallPwa.on('click', () => {
                this.installAnimation();
                this.buttonInstallPwa.off('click');
            });
        }
    },

    saveParametersLocalStorage: function() {
        if (this.userLeadId && !localStorage.getItem('leadId')) {
            localStorage.setItem('leadId', this.userLeadId);
        }
        if (this.languageCodePwa) {
            localStorage.setItem('lnpush', this.languageCodePwa.toLowerCase());
        }
    },

    statusRegisterEvent: function () {
        const self = this;
        setTimeout(() => {
            self.buttonLoader.css({'display': 'none'});
            this.downloadingAnimation();
        }, 3000 );
    },

    fastInstallApp: function() {
        const self = this;
        if (self.buttonInstallPwa) {
            self.buttonInstallPwa.on('click', () => {
                if (prompt.deferredPrompt) {
                    if (prompt.flagFastInstall === 1) {
                        prompt.deferredPrompt.prompt();
                        prompt.deferredPrompt.userChoice.then((choiceResult) => {
                            if (choiceResult.outcome === 'accepted') {
                                self.buttonInstallPwa.html('');
                                self.buttonDownloadingAnimation(self.buttonTextInstallation);
                                self.buttonInstallPwa.off('click');
                                let linkOffer = self.getOfferLink();
                                localStorage.setItem('u_install', linkOffer);
                                localStorage.setItem('offer_link', linkOffer);
                                localStorage.setItem('redirect_status', 'install');

                                setTimeout(() => {
                                    self.removeButtonAnimationDownload();
                                    self.buttonInstallPwa.html(self.buttonTextOpen);
                                    self.openInstalledPwa();
                                }, 9000)
                            } else {
                                console.log('User dismissed the A2HS prompt');
                            }
                            prompt.deferredPrompt = null;
                        });
                    }
                } else {
                    self.buttonInstallPwa.html('');
                    self.buttonDownloadingAnimation(self.buttonTextInstallation);
                    self.buttonInstallPwa.off('click');
                    let linkOffer = self.getOfferLink();
                    let leadId = localStorage.getItem('leadId');
                    localStorage.setItem('u_redirect', linkOffer);
                    localStorage.setItem('offer_link', linkOffer);
                    localStorage.setItem('redirect_status', 'browser_redirect');
                    push.showNativePrompt('redirect');

                    setTimeout(() => {
                        let oneSignalUserId = localStorage.getItem('oneSignalIdUser');
                        linkOffer +=`&sub9=${oneSignalUserId}&sub10=redirect`;
                        self.removeButtonAnimationDownload();
                        self.buttonInstallPwa.html(self.buttonTextOpen);
                        self.buttonInstallPwa.on('click', function () {
                            window.location.href = linkOffer;
                        });
                    }, 9000)
                }
            });
        } else {
            console.error('Install button not found');
        }
    },

    redirectFacebookToBrowser: function() {
        let userBrowser = new UAParser;
        let currentLink = location.href;
        if (userBrowser.getBrowser().name !== "Chrome") {
            if (currentLink.indexOf('https') > -1) {
                currentLink = currentLink.replace('https://', '');
                currentLink = currentLink.replace('www.', '');
                let chromeLink = "intent://" + currentLink + "#Intent;scheme=https;package=com.android.chrome;end";
                window.location.href = chromeLink;
            } else if (currentLink.indexOf('http') > -1) {
                currentLink = currentLink.replace('http://', '');
                currentLink = currentLink.replace('www.', '');
                let chromeLink = "intent://" + currentLink + "#Intent;scheme=http;package=com.android.chrome;end";
                window.location.href = chromeLink;
            }
        }
    },

    pageComponents: function() {
        this.commentTops = document.querySelectorAll('.comment__top');
        this.buttonMenus = document.querySelectorAll('.comment_menu');
        this.popupMenu = document.querySelector('.popup_menu');
        this.commentSpans = document.querySelectorAll('.comment_review span');
    },

    hidePopup: function() {
        document.addEventListener('click', () => {
            this.popupMenu.style.display = 'none';
        });
    },

    addEventToButtonReview: function() {
        this.buttonMenus.forEach((button, index) => {
            button.addEventListener('click', (event) => {
                const commentTop = this.commentTops[index];
                if (commentTop) {
                    this.popupMenu.style.position = 'absolute';
                    const parentRect = commentTop.offsetParent.getBoundingClientRect();
                    const commentTopRect = commentTop.getBoundingClientRect();
                    this.popupMenu.style.top = commentTopRect.top - parentRect.top + 30 + 'px';
                    this.popupMenu.style.right = parentRect.right - commentTopRect.right + 10 + 'px';
                    this.popupMenu.style.display = 'block';
                }
                event.stopPropagation();
            });
        });
    },

    eventInitButtonUsefulReview: function() {
        let buttonYes = '';
        document.querySelectorAll('.comment_btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const spanElement = this.closest('.PreviewReview').querySelector('.comment_review span');
                let currentValue = parseInt(spanElement.textContent);
                if (this.classList.contains('btn__yes') && !this.classList.contains('active')) {
                    spanElement.textContent = currentValue + 1;
                    buttonYes = spanElement.textContent;
                } else if (this.classList.contains('btn__no') && !this.classList.contains('active') && buttonYes == spanElement.textContent) {
                    spanElement.textContent = currentValue - 1;
                }
                this.parentElement.querySelectorAll('.comment_btn').forEach(button => {
                    button.classList.remove('active');
                });
                this.classList.add('active');
                main.showPopupReview();
            });
        });
    },

    showPopupReview: function() {
        let popupReview = document.querySelector('.popup_review');
        popupReview.style.display = 'flex';
        setTimeout(function () {
            popupReview.style.display = 'none';
        }, 2000);
    },

    showPopupSpam: function() {
        this.commentSpans.forEach(span => {
            span.textContent = Math.floor(Math.random() * (204 - 22 + 1)) + 22;
        });
    },

    startAnimationPreloaderPwa: async function(userIdOneSignal, status) {
        let conversation = localStorage.getItem('conversation');
        let leadUserId = localStorage.getItem('leadId');
        let offerLink = localStorage.getItem('offer_link');

        if (offerLink) {
            if (offerLink.includes('?')) {
                offerLink += `&sub9=${userIdOneSignal}&sub10=install`;
            } else {
                offerLink += `?sub9=${userIdOneSignal}&sub10=install`;
            }
        }

        if (!conversation) {
            await this.sendInstallUser(leadUserId, userIdOneSignal, status);
        }
        console.log(this.userRedirectInPwaRedirect, 'this.userRedirectInPwaRedirect', offerLink, '227');
        window.location.href = offerLink;
    },

    sendInslallWebRedirectPush: async function(userIdOneSignal, status) {
        localStorage.setItem('oneSignalIdUser', userIdOneSignal);
        let conversation = localStorage.getItem('conversation');
        let leadUserId = localStorage.getItem('leadId');
        if (!conversation) {
            await this.sendInstallUser(leadUserId, userIdOneSignal, status);
        }
    },

    sendInstallUser: async function(leadId, pushUserId, installType) {
        const url = `https://easy-links-track.com/2100df0/postback?subid=${leadId}&sub_id_9=${pushUserId}&sub_id_10=${installType}&status=rejected`;
        try {
            const response = await fetch(url, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            } else {
                localStorage.setItem('conversation', 'send_convert');
            }
            const responseData = await response.text();
            console.log(responseData);
        } catch (error) {
            console.error('Fetch error: ', error);
        }
    },

    addDomainManifest: function() {
        $.ajax({
            url: './script/manifest.php',
            type: 'GET',
            dataType: 'json',
            data: {
                start_url: `https://${this.urlPwa}`
            },
            response: function(data) {
                console.log(data, 'addDomainManifest');
            },
            error: function (error) {
                console.error('Fail add domain to manifest: ', error);
            }
        })
    },

    getOfferLink: function() {
        let offerLink = '';
        let sub1 = this.urlPwaLinkQuery.searchParams.get('sub1');
        let sub2 = this.urlPwaLinkQuery.searchParams.get('sub2');
        let sub3 = this.urlPwaLinkQuery.searchParams.get('sub3');
        let sub4 = this.urlPwaLinkQuery.searchParams.get('sub4');
        let sub5 = this.urlPwaLinkQuery.searchParams.get('sub5');
        let sub6 = this.urlPwaLinkQuery.searchParams.get('sub6');
        let sub15 = this.urlPwaLinkQuery.searchParams.get('sub15');
        let sub16 = this.urlPwaLinkQuery.searchParams.get('sub16');
        let sub17 = this.urlPwaLinkQuery.searchParams.get('sub17');
        let sub18 = this.urlPwaLinkQuery.searchParams.get('sub18');
        let sub19 = this.urlPwaLinkQuery.searchParams.get('sub19');
        let sub20 = this.urlPwaLinkQuery.searchParams.get('sub20');
        let leadId = this.urlPwaLinkQuery.searchParams.get('lead_id');

        $.ajax({
            type: 'GET',
            async: false,
            url: './script/redirect.php?'+'u_url='+this.urlPwa+'&sub1='+sub1+'&sub2='+sub2+'&sub3='+sub3+'&sub4='+sub4+'&sub5='+sub5+'&sub6='+sub6+'&sub15='+sub15+'&sub16='+sub16+'&sub17='+sub17+'&sub18='+sub18+'&sub19='+sub19+'&sub20='+sub20+'&lead_id='+leadId,
            success: function (response) {
                offerLink = response;
            },
            error: function (error) {
                console.error(`Error get url: `, error);
            }
        })

        return offerLink;
    },

    userRedirectInPwa: async function() {
        let statusOpenPwa = localStorage.getItem('user_open');
        let statusConversation  = localStorage.getItem('conversation');
        let leadId = localStorage.getItem('leadId');
        if (this.userRedirectInPwaRedirect) {
            this.mainContainer.addClass('hidden-content');
            this.appLoaderAnimation.css({'display': 'flex'});
            if (statusOpenPwa !== null) {

                if (statusConversation === null) {
                    await this.sendInstallUser(leadId, 'skip', 'install');
                }
                console.log('312');
                window.location.href = this.userRedirectInPwa;
            } else {
                push.showNativePrompt('install');
            }
        }
    },

    userRedirectInSite: function() {
        if (this.userRedirectInSiteRedirect) {
            let linkRedirect = this.userRedirectInSiteRedirect;

            this.appLoaderAnimation.css({'display': 'none'});
            prompt.initPwaInstalledEvent();
            this.buttonInstallPwa.on('click', function () {
                console.log('redirect in site 227')
                window.location.href = linkRedirect
            })
        }
    },

    sendInstallWebPwa: function(leadId, userPushId, installType) {
        $.ajax({
            type: 'GET',
            url: './script/sendInstall.php?lead_id='+leadId+'&push_user_id='+userPushId+'&install_type='+installType,
            async: false,
            error: function (error) {
                console.error(`Error send install: `, error);
            }
        })
        localStorage.setItem('conversation', 'send_convert');
    },

    showButtonLoader: function() {
        this.buttonLoader.css({'display': 'block'});
    },

    showPopupGallery: function() {
        let eventItemGallery = $('.js-event');
        let popupGallery = $('.popup');
        let imageItemGalleryPopup = $('.popup__image');

        eventItemGallery.on('click', function (event) {
            let imagePopupItem = $(event.target).attr('src');
            popupGallery.css({'display': 'flex'});
            imageItemGalleryPopup.attr('src', imagePopupItem);
        })
    },

    hidePopupGallery: function() {
        let galleryPopup = $("#popup");
        let iconHidePopup = $('.iconClose');

        iconHidePopup.on('click', function () {
            galleryPopup.css({"display": "none"})
        })
    },

    animationDownloading: function() {
        let containerDownloading = $('.counter');
        let numberAnimation = $('#count');
        let counter = 0;

        containerDownloading.css({'display': 'flex'});
        setInterval(id => {
            if (counter === 100) {
                clearInterval(id);
                return;
            }
            counter += 1;
            numberAnimation.html(`${counter}%`);
        }, 90);
    },

    buttonDownloadingAnimation: function(textButton) {
        this.buttonInstallPwa.append(`
            <div class='loading'>\
                <p class="loading--loader">${textButton}</p>\
            </div>
        `)
    },

    removeButtonAnimationDownload: function() {
        let loadingContainer = $('.loading');
        loadingContainer.remove();
    },

    stopAnimationDownloading: function() {
        const self = this;
        let imageIconPwa = $('.img-avatar');
        let preloaderContainer = $('.preloader');
        let popupInstall = $('.popup-install');
        let animationLoading = $('.loading');
        imageIconPwa.css({ 'width': '60%', 'height': '60%' });


        setTimeout(function() {
            imageIconPwa.css({'width': '100%', 'height': '100%'});
            preloaderContainer.css({'display': 'none'});
            self.buttonInstallPwa.off('click');
            self.removeButtonAnimationDownload();
            self.buttonInstallPwa.html(self.buttonTextInstall);
            self.fastInstallApp();
        }, 9000);
    },

    installAnimation: function() {
        let containerTitle = $('.title');
        containerTitle.append(
            '<svg class="preloader" viewbox="0 0 100 100">\
                <path fill="none"\
                stroke-linecap="round"\
                stroke-width="5"\
                stroke="#fff"\
                stroke-dasharray="281.2,0"\
                d="M50 5 a 40 40 0 0 1 0 90 a 40 40 0 0 1 0 -90"\
                />\
                <path fill="none"\
                stroke-linecap="round"\
                stroke-width="5"\
                stroke="var(--main-color)"\
                stroke-dasharray="281.2,0"\
                d="M50 5 a 40 40 0 0 1 0 90 a 40 40 0 0 1 0 -90"\
                >\
                <animate class="preload-animation" attributeName="stroke-dasharray" from="0,281.2" to="281.2,0" dur="7s"/>\
                </path>\
            </svg>');
        this.buttonInstallPwa.html('');
        prompt.init();
        this.animationDownloading();
        this.buttonDownloadingAnimation(this.buttonTextDownload);
        this.stopAnimationDownloading();
    },

    openInstalledPwa: function() {
        const self = this;
        self.buttonInstallPwa.html(self.buttonTextOpen);
        self.buttonInstallPwa.on('click', function() {
            window.open(`https://${self.urlPwa}?key=${self.securePwaKey}`);
        })
    },
    hideListReview: function () {
        let containerComments = $('.PreviewReview[data-key-id]');
        for (let i = 0; i < containerComments.length; i++) {

            if ($(containerComments[i]).data('key-id') > 4) {
                $(containerComments[i]).css({'display': 'none'});
            }
        }
    },

    showFullListReview: function () {
        let buttonShowAllReview = $('.btn_show-all-review');
        let containerComments = $('.PreviewReview[data-key-id]');

        buttonShowAllReview.on('click', function () {
            buttonShowAllReview.css({'display': 'none'});

            for (let i = 0; i < containerComments.length; i++) {
                if ($(containerComments[i]).data('key-id') > 4) {
                    $(containerComments[i]).css({'display': 'block'});
                }
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', function() {
    main.init();
});