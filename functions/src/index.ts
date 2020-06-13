import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.onCreatePin = functions.firestore
  .document("pins/{pinId}")
  .onCreate((snap) => {
    const { createdBy } = snap.data();
    return snap.ref
      .update({
        permissions: {
          [createdBy.userId]: {
            read: true,
            update: true,
            react: true,
            delete: true,
          },
        },
      })
      .catch(() => {
        //
      });
  });
