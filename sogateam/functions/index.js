const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const SENDGRID_API_KEY = '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';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.firestoreEmail = functions.firestore.document('users/{userId}')
.onWrite((snap, event) => {
    let userId = event.params.userId;

    const db = admin.firestore();

    return db.collection('users').doc(userId)
             .get()
             .then(doc => {

                const user = doc.data();

                const msg = {
                    to: user.email,
                    from: 'hello@angularfirebase.com',
                    subject:  'New Follower',
                     text: `Hey ${user.name}. You have a new follower!!! `,
                     html: `<strong>Hey ${user.name}. You have a new follower!!!</strong>`,
    
                };

                return sgMail.send(msg)
            })
            .then(() => console.log('email sent!') )
            .catch(err => console.log(err) )
                 

});

    
                     

