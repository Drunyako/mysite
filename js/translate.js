import {main} from './main-function.js';
export var translate = {
    translateDefaultText: 'https://easy-image.b-cdn.net/translate/text-translate.json',
    translateButtonText: 'https://easy-image.b-cdn.net/translate/button-translate.json',

    init: function () {
        this.getUserBrowserLanguage();
    },

    regexpLanguageBrowser: function (lang) {
        let getUserQuery = new URLSearchParams(window.location.search);
        let getLanguageCode = getUserQuery.get('ln');
        return this.changePageText(getLanguageCode.toLowerCase());
    },

    getUserBrowserLanguage: function() {
        if (navigator.languages && navigator.languages.length > 0) {
            return this.regexpLanguageBrowser(navigator.languages[0]);
        } else {
            return null;
        }
    },

    getTranslateDefaultText: function () {
        let listTranslate = {};
        try {
            $.ajax({
                method: 'GET',
                url: this.translateDefaultText,
                async: false,
                success: function (data) {
                    listTranslate = data;
                    console.log(data)
                },
                error: function (error) {
                    console.log(error);
                }
            });
            return listTranslate;
        } catch (error) {
            console.log(`Error get translate: ${error}`);
        }
    },

    setTranslateButton: function (listTranslate, language) {
        main.buttonTextInstall = listTranslate[language]['install_btn'];
        main.buttonTextInstallation =  listTranslate[language]['installation_btn'];
        main.buttonTextOpen =  listTranslate[language]['open_app_text'];
        main.buttonTextInstalled =  listTranslate[language]['install_text'];
        main.buttonTextDownloading =  listTranslate[language]['download_btn'];
        main.buttonTextDownload =  listTranslate[language]['downloading_btn'];
    },

    changePageText: function (language) {
        let listTranslate = this.getTranslateDefaultText();
        let languageCode = language === 'ru' ? 'rus' : language === 'uk' ? 'ukr' : language;

        if (listTranslate[languageCode]) {
            for (let idElement in listTranslate[languageCode]) {
                if (idElement === 'data_save_text') {
                    $(`#dataSecurity_text`).html(listTranslate[languageCode]['data_save_text'])
                }
                if (idElement === 'other_apps') {
                    $(`#developer_name_text_another`).html(listTranslate[languageCode]['other_apps'])
                }
                if (idElement === 'footer_answer_yes') {
                    $('.btn__yes').html(listTranslate[languageCode]['footer_answer_yes'])
                }
                if (idElement === 'footer_answer_no') {
                    $('.btn__no').html(listTranslate[languageCode]['footer_answer_no'])
                }
                if (idElement === 'review_text_count_like') {
                    $('.helpful-comment').html(listTranslate[languageCode]['review_text_count_like'])
                }
                if(idElement === 'footer_title_question') {
                    $('.comment_question__content').html(listTranslate[languageCode]['footer_title_question'])
                }
                $(`#${idElement}`).html(listTranslate[languageCode][idElement])
            }

            this.setTranslateButton(listTranslate, languageCode);
        } else {
            console.log('undefined')
        }
    }
}

$(document).ready(function () {
    translate.init()
});