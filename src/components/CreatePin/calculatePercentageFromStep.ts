import { Board } from "types";

const calculatePercentageFromStep = (
  stepValue: number | string,
  board: Board,
  userId: string
): number => {
  try {
    const versionId = board.members[userId]?.version || null;
    const version = board.versions[versionId] || null;
    const { startStep, endStep } = version;
    if (typeof stepValue === "number") {
      return ((stepValue - startStep) / (endStep - startStep)) * 100;
    } else {
      throw new Error("Step type is not yet handled");
    }
  } catch {
    return null;
  }
};

export default calculatePercentageFromStep;
