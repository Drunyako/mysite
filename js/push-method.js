// js/push-method.js
import { main } from './main-function.js';

window.OneSignalDeferred = window.OneSignalDeferred || [];

export var push = {
  titleNotification: '',
  buttonCancel: '',
  buttonSubscribe: '',
  langQuery: null,
  TimeCheckUserId: 0,
  TimerId: null,
  oneSignalContainerPrompt: '',
  oneSignalButtonCancelPrompt: '',
  oneSignalButtonAcceptPrompt: '',

  init() {
    this.langQuery = localStorage.getItem('lnpush');
  },

  /**
   * Безпечний виклик гілок main з логуванням
   */
  async _proceed(status, id) {
    try {
      if (status === 'redirect') {
        await main.sendInslallWebRedirectPush(id ?? 'error', status);
      } else {
        await main.startAnimationPreloaderPwa(id ?? 'error', status);
      }
    } catch (e) {
      console.error('Proceed error:', e);
    }
  },

  /**
   * Чекає доступності OneSignal SDK або кидає по таймауту
   */
  _waitForOneSignal(ms = 2500) {
    return new Promise((resolve, reject) => {
      let settled = false;

      // 1) коли SDK готовий — отримаємо інстанс
      window.OneSignalDeferred.push((OneSignal) => {
        if (settled) return;
        settled = true;
        resolve(OneSignal);
      });

      // 2) таймаут — йдемо у фолбек
      setTimeout(() => {
        if (settled) return;
        settled = true;
        reject(new Error('OneSignal SDK timeout'));
      }, ms);
    });
  },

  /**
   * Отримати permission ('granted' | 'denied' | 'default')
   */
  _getPermission(OneSignal) {
    try {
      return OneSignal?.Notifications?.permission ?? 'default';
    } catch {
      return 'default';
    }
  },

  /**
   * Спроба отримати userId з кількома ретраями
   */
  async _getUserId(OneSignal, attempts = 3, delayMs = 400) {
    for (let i = 0; i < attempts; i++) {
      try {
        const id = OneSignal?.User?.PushSubscription?.id;
        if (id) return id;
      } catch {}
      await new Promise((r) => setTimeout(r, delayMs));
    }
    return null;
  },

  /**
   * Головний вхід: 'install' (імітація завантаження) або 'redirect' (другий клік)
   */
  async initPushOneSignal(status_redirect) {
    const status = status_redirect === 'redirect' ? 'redirect' : 'install';

    // пробуємо дочекатися SDK
    let OneSignal;
    try {
      OneSignal = await this._waitForOneSignal();
    } catch (e) {
      console.warn('OneSignal not ready, fallback flow:', e?.message);
      // Фолбек — все одно запускаємо потрібну гілку
      await this._proceed(status, 'error-sdk');
      return;
    }

    // 1) Ініт SDK (якщо ще не ініціалізований)
    try {
      await OneSignal.init({
        appId: '81d5d9e6-33bc-4916-926a-942d8072e051'
      });
    } catch (e) {
      console.error('OneSignal.init failed:', e);
      await this._proceed(status, 'error-init');
      return;
    }

    // 2) Запит на дозвіл (може одразу повернути поточний статус)
    try {
      await OneSignal.Notifications.requestPermission();
    } catch (e) {
      console.warn('requestPermission error:', e);
      // продовжуємо — просто перевіримо фактичний статус нижче
    }

    // 3) Перевіряємо permission строго
    const permission = this._getPermission(OneSignal);
    console.log('[push] permission =', permission);

    if (permission !== 'granted') {
      // Відмова/за замовчуванням — ідемо далі без userId
      await this._proceed(status, 'decline');
      return;
    }

    // 4) Пробуємо забрати userId
    const userId = await this._getUserId(OneSignal);
    console.log('[push] userId =', userId || '(null)');

    // 5) Фінальна дія
    await this._proceed(status, userId ?? 'no-id');
  },

  showNativePrompt(status_pwa) {
    // status_pwa: 'install' або 'redirect'
    this.initPushOneSignal(status_pwa);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  push.init();
});
