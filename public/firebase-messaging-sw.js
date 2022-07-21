importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
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

// phần firebaseConfig tương tự như ở trên nhé

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging()

messaging.onMessage(function (payload) {
     console.log('Received background message ', payload);

     const notificationTitle = payload.notification.title;
     const notificationOptions = {
          body: payload.notification.body,
     };

     self.registration.showNotification(notificationTitle,
          notificationOptions);
});