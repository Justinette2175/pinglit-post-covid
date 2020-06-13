type BoardContentType = "BOOK" | "ARTICLE";
type StepUnit = "INTEGER" | "NUMBER" | "LETTER";
type PinType =
  | "IMAGE"
  | "VIDEO"
  | "REACTION"
  | "LABEL"
  | "AUDIO"
  | "QUOTE"
  | "WORD"
  | "TEXT";

type BillingAccountType = "FREE";

interface Address {
  address: string;
  postalCode: string;
  country: string;
  city: string;
}

export interface Label {
  uid: string;
  name: string;
  color: string;
}

export interface Reaction {
  uid: string;
  name: string;
  color: string;
  icon?: string;
}

export interface Board {
  uid: string;
  pinCount: number;
  createdOn: string;
  owners: {
    [userId: string]: {
      username: string;
    };
  };
  permissions: {
    users: {
      [userId: string]: Permission;
    };
  };
  content: {
    type: BoardContentType;
    title: string;
    author?: string;
    image?: string;
  };
  stepUnit: {
    type: StepUnit;
    key: string;
  };
  bookVersions: {
    [key: string]: BookVersion;
  };
  pinAuthors: {
    [userId: string]: {
      username: string;
    };
  };
  boardLabels: {
    [labelId: string]: Label;
  };
  usedLabels: {
    [labelId: string]: Label;
  };
  boardReactions: {
    [reactionId: string]: Reaction;
  };
  usedReactions: {
    [reactionId: string]: Reaction;
  };
}

export interface Permission {
  write?: boolean;
  read?: boolean;
  update?: boolean;
  react?: boolean;
  delete?: boolean;
}

export interface BookVersion {
  id: string;
  startStep: number;
  endStep: number;
  image: string;
  authors: Array<string>;
  title: string;
}

export interface NewPin {
  boardId: string;
  commentsCount: number;
  createdBy: {
    username: string;
    userId: string;
  };
  createdOn?: any;
  location: {
    percentage?: number;
    stepValue: number | string;
  };
  referenceQuote?: string;
  labels: {
    [labelId: string]: Label;
  };
  reactions?: {
    [reactionId: string]: Reaction;
  };
  content?: Content[];
}

export interface Pin {
  uid: string;
  boardId: string;
  referenceQuoteId?: string;
  location: {
    percentage?: number;
    stepValue?: number | string;
  };
  createdBy: {
    username: string;
    userId: string;
  };
  createdOn: string;
  referenceQuote?: string;
  content?: Content[];
  commentsCount?: number;
  labels?: {
    [labelId: string]: Label;
  };
  reactions?: {
    [reactionId: string]: Reaction;
  };
  permissions: {
    [userId: string]: Permission;
  };
}

export type Content =
  | ImagePinContent
  | VideoPinContent
  | TextPinContent
  | WordPinContent
  | AudioPinContent;

export interface PinComment {
  createdBy: {
    [userId: string]: {
      username: string;
    };
  };
  createdOn: string;
  content: {
    text: string;
  };
  permissions: {
    boardMembers: Permissions;
    boardOwners: Permissions;
    commentCreator: Permissions;
  };
}

export interface User {
  uid: string;
  username?: string;
  billingAccount?: {
    id: string;
    type: BillingAccountType;
    active: boolean;
  };
  labels?: {
    [labelId: string]: Label;
  };
}

export interface BillingAccount {
  id: string;
  type: BillingAccountType;
  active: boolean;
  users: Array<string>;
  billing: {
    address: Address;
    email: string;
  };
}

interface PinContent {
  type: PinType;
}

export interface ImagePinContent extends PinContent {
  url: string;
  alt: string;
}

export interface VideoPinContent extends PinContent {
  url: string;
}

export interface TextPinContent extends PinContent {
  text: string;
}

export interface WordPinContent extends PinContent {
  word: string;
  text: string;
}

export interface AudioPinContent extends PinContent {
  url: string;
}

export interface PinDimension {
  height?: number;
  left?: number;
  top?: number;
}
