const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotification = functions.firestore
  .document('messages/{messageId}')
  .onCreate(async (snap, context) => {
    const msg = snap.data();
    const usersQuery = await admin.firestore().collection('users').get();
    const tokens = [];
    usersQuery.forEach(userDoc => {
      const user = userDoc.data();
      if (user.uid !== msg.uid && user.tokens) { // Don't notify sender
        tokens.push(...user.tokens);
      }
    });

    if (tokens.length === 0) return;

    const payload = {
      notification: {
        title: `New message from ${msg.senderName} 💌`,
        body: msg.text,
        icon: 'https://files.catbox.moe/74tj86.jpg'
      }
    };

    return admin.messaging().sendToDevice(tokens, payload);
  });
