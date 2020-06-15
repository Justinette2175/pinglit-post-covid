import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts";

import { Pin as PinType, PinGroup } from "../../types";
import BoardInterface from "./BoardInterface";

interface BoardProps {
  boardId: string;
  userIsBoardOwner: boolean;
}

const Board: React.FC<BoardProps> = ({ boardId, userIsBoardOwner }) => {
  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState<Error>(null);
  const [user] = useContext(UserContext);

  const [firstStep, setFirstStep] = useState<number>(null);
  const [lastStep, setLastStep] = useState<number>(null);

  const [creatorPins, setCreatorPins] = useState<Array<PinType>>([]);

  const [boardVisiblePins, setBoardVisiblePins] = useState<Array<PinType>>([]);

  const getFirstOrLastStep = async (which: "first" | "last"): Promise<void> => {
    let pinSnapshot;
    if (which === "first") {
      pinSnapshot = await firebase.firestore
        .collection("pins")
        .where("boardId", "==", boardId)
        .orderBy("location.percentage")
        .limit(1)
        .get();
    } else {
      pinSnapshot = await firebase.firestore
        .collection("pins")
        .where("boardId", "==", boardId)
        .orderBy("location.percentage", "desc")
        .limit(1)
        .get();
    }
    let step;
    pinSnapshot.forEach((p: any) => (step = p.data().location.percentage));
    if (which === "first") {
      setFirstStep(step);
    } else if (which === "last") {
      setLastStep(step);
    }
  };

  const fetchCreatorPins = (): any => {
    return firebase.firestore
      .collection("pins")
      .where("boardId", "==", boardId)
      .where("permission", "==", "PRIVATE")
      .where("createdBy.userId", "==", user.uid)
      .onSnapshot((snapshot: any) => {
        const newPins: Array<PinType> = [];
        snapshot.forEach((snap: any) => {
          newPins.push({ uid: snap.id, ...snap.data() });
        });
        setCreatorPins(newPins);
      });
  };

  const fetchBoardVisiblePins = (): any => {
    return firebase.firestore
      .collection("pins")
      .where("boardId", "==", boardId)
      .where("permission", "==", "BOARD")
      .onSnapshot((snapshot: any) => {
        const newPins: Array<PinType> = [];
        snapshot.forEach((snap: any) => {
          newPins.push({ uid: snap.id, ...snap.data() });
        });
        setBoardVisiblePins(newPins);
      });
  };

  const listenToPins = (): Array<any> => {
    const unsubscribeFromCreatorPins = fetchCreatorPins();
    const unsubscribeFromBoardPins = fetchBoardVisiblePins();
    return [unsubscribeFromCreatorPins, unsubscribeFromBoardPins];
  };

  const unsubscribe = (unsubscribers: any) => {
    unsubscribers.forEach((u: any) => {
      if (u) {
        u();
      }
    });
  };

  useEffect(() => {
    getFirstOrLastStep("first");
    getFirstOrLastStep("last");
    const unsubscribers = listenToPins();
    return () => unsubscribe(unsubscribers);
  }, []);

  const makePinsGroups = (ungroupedPins: Array<PinType>): Array<PinGroup> => {
    const existingQuoteIds: Array<string> = [];
    return ungroupedPins.reduce((acc, p) => {
      if (
        p.referenceQuoteId &&
        existingQuoteIds.indexOf(p.referenceQuoteId) > -1
      ) {
        const index = acc.findIndex(
          (group) => group.referenceQuoteId === p.referenceQuoteId
        );
        acc[index].pins.push(p);
      } else {
        if (p.referenceQuoteId) {
          existingQuoteIds.push(p.referenceQuoteId);
        }
        acc.push({
          uid: p.uid,
          referenceQuote: p.referenceQuote,
          percentage: p.location.percentage,
          referenceQuoteId: p.referenceQuoteId,
          pins: [p],
        });
      }
      return acc;
    }, []);
  };

  const pinGroups = makePinsGroups([...creatorPins, ...boardVisiblePins]).sort(
    (a, b) => a.percentage - b.percentage
  );

  console.log("pins are", pinGroups);

  return <BoardInterface boardId={boardId} pinsGroups={pinGroups} />;
};

export default Board;
