export interface ImagePin {
  type: "IMAGE";
  url: string;
  alt?: string;
}

export interface VideoPin {
  url: string;
  provider?: "YOUTUBE" | "VIMEO";
  meta?: any;
}

export interface WordPin {
  word: string;
  text?: string;
}

export interface QuestionnairePin {
  type: "QUESTIONNAIRE";
  answersPermission: "BOARD" | "PRIVATE";
  questions: {
    [key: string]: {
      prompt: string;
      type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "TEXT";
      option?: Array<string>;
      answers: {
        [userId: string]: {
          value: string;
        };
      };
    };
  };
}
