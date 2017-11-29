const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.updateConversation = functions.https.onRequest((req, res) => {
    let conversationRef = admin.firestore().doc('/conversations/a-conversation')
    // let conversation = conversationRef.get();
    // console.log('current conversation', conversation.data());
    let counter = parseInt(req.param('counter', '0'), 10);
    console.log('counter', counter);
    return conversationRef.update({counter: counter}).then(updateResult => {
        console.log('update completed');
        cors(req, res);
        res.send('set counter to: ' + counter);
        return {result: 'ok'};
    });
})