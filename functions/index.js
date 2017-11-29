const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp(functions.config().firebase);

exports.updateConversation = functions.https.onRequest((req, res) => {
    let conversationRef = admin.firestore().doc('/conversations/a-conversation')
    let counter = parseInt(req.param('counter', '0'), 10);
    console.log('counter', counter);
    // update conversation with counter coming from request and reply
    return conversationRef.update({counter: counter}).then(updateResult => {
        console.log('update completed');
        cors(req, res, () => {});
        res.send('set counter to: ' + counter);
        return {result: 'ok'};
    });
})