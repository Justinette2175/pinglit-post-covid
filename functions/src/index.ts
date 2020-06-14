import * as functions from "firebase-functions";
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");

admin.initializeApp();

const db = admin.firestore();

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = "quotes";
const adminClient = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const searchClient = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const findSmiliarQuote = async (
  quote: string,
  percentage: number,
  boardId: string
) => {
  const index = searchClient.initIndex(ALGOLIA_INDEX_NAME);

  try {
    const upperBound = percentage + 3;
    const lowerBound = percentage - 3;
    const { hits } = await index.search(quote, {
      attributesToRetrieve: ["referenceQuoteId"],
      filters: `boardId:${boardId} AND (percentage:${lowerBound} TO ${upperBound})`,
    });
    return hits[0] || null;
  } catch (e) {
    //
  }
};

const createNewReferenceQuote = async (
  referenceQuote: string,
  boardId: string,
  location: any
) => {
  const index = adminClient.initIndex(ALGOLIA_INDEX_NAME);
  const newReferenceRef = db.collection("referenceQuotes").doc();
  const referenceQuoteId = newReferenceRef.id;
  const newReferenceQuote = {
    boardId,
    referenceQuote,
    referenceQuoteId,
    percentage: location.percentage,
  };
  try {
    await index.saveObject({
      ...newReferenceQuote,
      objectID: referenceQuoteId,
    });
    await newReferenceRef.set(newReferenceQuote);
    return referenceQuoteId;
  } catch (e) {
    console.log("Error in creating ref quote", e);
    return "";
  }
};

exports.onCreatePin = functions.firestore
  .document("pins/{pinId}")
  .onCreate(async (snap) => {
    const { createdBy, referenceQuote, boardId, location } = snap.data();
    let similarQuote;
    let referenceQuoteId = "";
    if (referenceQuote) {
      similarQuote = await findSmiliarQuote(
        referenceQuote,
        location.percentage,
        boardId
      );
      console.log("Similar quote is", similarQuote);
      if (!similarQuote) {
        referenceQuoteId = await createNewReferenceQuote(
          referenceQuote,
          boardId,
          location
        );
      } else {
        referenceQuoteId = similarQuote.referenceQuoteId;
      }
    }
    return snap.ref
      .update({
        referenceQuoteId,
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
