import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext, BoardContext } from "../../contexts";

import { Pin as PinType, PinGroup, BoardFilters } from "../../types";
import BoardInterface from "./BoardInterface";

interface BoardProps {
  filters: BoardFilters;
  numberOfColumns: number;
}

const Board: React.FC<BoardProps> = ({ filters, numberOfColumns }) => {
  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState<Error>(null);
  const board = useContext(BoardContext);
  const boardId = board ? board.uid : null;
  const user = useContext(UserContext);

  const [firstStep, setFirstStep] = useState<number>(null);
  const [lastStep, setLastStep] = useState<number>(null);

  const [creatorPins, setCreatorPins] = useState<Array<PinType>>([]);

  const [boardVisiblePins, setBoardVisiblePins] = useState<Array<PinType>>([]);

  const getFirstOrLastStep = async (which: "first" | "last"): Promise<void> => {
    if (boardId) {
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
    }
  };

  const fetchCreatorPins = (): any => {
    if (boardId) {
      return firebase.firestore
        .collection("pins")
        .where("boardId", "==", boardId || "")
        .where("permission", "==", "PRIVATE")
        .where("createdBy.userId", "==", user.uid)
        .onSnapshot((snapshot: any) => {
          const newPins: Array<PinType> = [];
          snapshot.forEach((snap: any) => {
            newPins.push({ uid: snap.id, ...snap.data() });
          });
          setCreatorPins(newPins);
        });
    }
  };

  const fetchBoardVisiblePins = (): any => {
    return firebase.firestore
      .collection("pins")
      .where("boardId", "==", boardId || "")
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
    if (boardId) {
      getFirstOrLastStep("first");
      getFirstOrLastStep("last");
      const unsubscribers = listenToPins();
      return () => unsubscribe(unsubscribers);
    }
  }, [boardId]);

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
        acc[index].pinCount += 1;
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
          pinCount: 1,
        });
      }
      return acc;
    }, []);
  };

  const pins = [...creatorPins, ...boardVisiblePins];

  const pinGroups = makePinsGroups(pins).sort(
    (a, b) => a.percentage - b.percentage
  );

  const pinSteps = pins.reduce((acc: Array<number>, p) => {
    if (acc.indexOf(p.location.percentage) < 0) {
      acc.push(p.location.percentage);
    }
    return acc;
  }, []);

  console.log("pinSteps", pinSteps);

  return (
    <BoardInterface
      boardId={boardId}
      pinsGroups={pinGroups}
      numberOfColumns={numberOfColumns}
      pinSteps={pinSteps}
    />
  );
};

export default Board;
