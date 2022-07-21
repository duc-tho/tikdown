type Config = {
     onSuccess?: (registration: ServiceWorkerRegistration) => void;
     onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
     if ('serviceWorker' in navigator) {
          const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
          if (publicUrl.origin !== window.location.origin) return;

          window.addEventListener('load', () => {
               const swUrl = `${process.env.PUBLIC_URL}/custom-sw.js`;
               registerValidSW(swUrl, config);
          });
     }
}

function registerValidSW(swUrl: string, config?: Config) {
     navigator.serviceWorker
          .register(swUrl)
          .then((registration) => {
               initPush();
               registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    if (installingWorker == null) return;
                    installingWorker.onstatechange = () => {
                         if (installingWorker.state === 'installed') {
                              if (navigator.serviceWorker.controller)
                                   if (config && config.onUpdate) config.onUpdate(registration);
                                   else if (config && config.onSuccess) config.onSuccess(registration);
                         }
                    };
               };
          }).catch((error) => {
               console.error('Error during service worker registration:', error);
          });
}

function initPush() {
     if (!navigator.serviceWorker.ready) return;

     new Promise(function (resolve, reject) {
          const permissionResult = Notification.requestPermission(function (result) {
               resolve(result);
          });

          if (permissionResult) {
               permissionResult.then(resolve, reject);
          }
     }).then((permissionResult) => {
          if (permissionResult !== 'granted') {
               throw new Error('We weren\'t granted permission.');
          }
     });
}

export function unregister() {
     if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready
               .then((registration) => {
                    registration.unregister();
               })
               .catch((error) => {
                    console.error(error.message);
               });
     }
}
