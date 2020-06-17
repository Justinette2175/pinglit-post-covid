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
        if (privateDoc.data().password === password) {
          await db
            .collection("boards")
            .doc(invitationDoc.data().boardId)
            .update({
              [`owners[${auth.uid}]`]: {
                username: "",
              },
            });
          return true;
        }
      }
    }
    return false;
  } catch (e) {
    return false;
  }
};

export default validateInvitationAccess;
