import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage,  } from "firebase/messaging";
import { saveNotiApi } from '../services/api/tiktok-save-noti.api';

const firebaseConfig = {
     apiKey: "AIzaSyCMpU6oIPQpq6x5bdzS8FAAx_n1ZUQOQOw",
     authDomain: "tiktok-downloader-df797.firebaseapp.com",
     databaseURL: "https://tiktok-downloader-df797-default-rtdb.asia-southeast1.firebasedatabase.app",
     projectId: "tiktok-downloader-df797",
     storageBucket: "tiktok-downloader-df797.appspot.com",
     messagingSenderId: "645853228477",
     appId: "1:645853228477:web:dc26d974fc0b965be876d4",
     measurementId: "G-DE7BH9YZ64"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const fetchToken = () => {
     getToken(messaging, { vapidKey: 'BAKuWQjHHf7RP218EVYaGkUcSj-rZ3bky97Px3bf2Ex49_ZULZVAJO2BKtqAuDVoYF1_wgHtHNvS81pbpH8ZBXk' }).then((currentToken) => {
          if (currentToken) {
               console.log('current token for client: ', currentToken);
               saveNotiApi.post({ deviceToken: currentToken });
          } else {
               console.log('No registration token available. Request permission to generate one.');
               // shows on the UI that permission is required 
          }
     }).catch((err: any) => {
          console.log('An error occurred while retrieving token. ', err);
          // catch error while creating client token
     });
}

export const onMessageListener = () =>
     new Promise((resolve) => {
          onMessage(messaging, (payload) => {
               resolve(payload);
          });
     });