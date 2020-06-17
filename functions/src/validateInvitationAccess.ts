import * as functions from "firebase-functions";

const validateInvitationAccess = async (
  db: any,
  auth: any,
  invitationId: string,
  password: string
) => {
  const docRef = db.collection("invitations").doc(invitationId);
  const invitationDoc = await docRef.get();
  try {
    if (invitationDoc.exists) {
      const privateDoc = await docRef
        .collection("private")
        .doc("private")
        .get();
      if (privateDoc.exists) {
        const boardId = invitationDoc.data().boardId;
        if (privateDoc.data().password === password) {
          await db
            .collection("boards")
            .doc(boardId)
            .update({
              [`owners.${auth.uid}`]: {
                username: "",
              },
            });
          return boardId;
        } else {
          throw new functions.https.HttpsError(
            "permission-denied",
            "The password your entered is wrong."
          );
        }
      }
    } else {
      throw new functions.https.HttpsError(
        "not-found",
        "This invitation is not valid."
      );
    }
  } catch (e) {
    throw e;
  }
};

export default validateInvitationAccess;
