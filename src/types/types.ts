import { string } from "yup";

export type BoardContentType = "BOOK" | "ARTICLE";
export type StepUnit = "INTEGER" | "NUMBER" | "LETTER";
type PinType =
  | "YOUTUBE"
  | "VIMEO"
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

export interface NewBoard {
  pinCount: number;
  createdOn?: string;
  owners: {
    [userId: string]: {
      username: string;
    };
  };
  members: {
    [userId: string]: { username: string; version: string; hasAccess: true };
  };
  type: BoardContentType;
  resource: {
    title: string;
    author?: string;
    image?: string;
  };
  stepUnit: {
    type: StepUnit;
    key: string;
    longName: string;
  };
  versions?: {
    [key: string]: BookVersion;
  };
}

export interface Resource {
  title: string;
  author?: string;
  image?: string;
  googleId?: string;
  publisher?: string;
  publishedDate?: string;
  description?: string;
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
  type: BoardContentType;
  members: {
    [userId: string]: { username: string; version: string; hasAccess: boolean };
  };
  resource: Resource;
  stepUnit: {
    type: StepUnit;
    key: string;
    longName: string;
  };
  versions: {
    [key: string]: BookVersion;
  };
  pinAuthors: {
    [userId: string]: {
      username: string;
    };
  };
  boardLabels: Array<Label>;
  usedLabels: {
    [labelId: string]: Label;
  };
  boardReactions: Array<Reaction>;
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
  startStep: number;
  endStep: number;
  image: string;
}

export interface NewPin {
  boardId: string;
  commentsCount: number;
  createdBy: {
    username: string;
    userId: string;
  };
  permission: PinPermission;
  createdOn?: any;
  location: {
    percentage?: number;
    stepValue?: number | string;
  };
  referenceQuote?: string;
  labels: {
    [labelId: string]: Label;
  };
  reactions?: {
    [reactionId: string]: Reaction;
  };
  content?: any[];
}

export type PinPermission = "PRIVATE" | "BOARD_OWNER" | "BOARD";
export type PinCommentPermission = "NONE" | "BOARD" | "COMMENTOR";

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
  permission: PinPermission;
  commentPermission: PinCommentPermission;
}

export type Content =
  | LinkPinContent
  | ImagePinContent
  | VideoPinContent
  | TextPinContent
  | WordPinContent
  | AudioPinContent;

export interface PinComment {
  createdBy: {
    uid: string;
    username: string;
  };
  createdOn: string;
  content: {
    text: string;
  };
}

export interface User {
  uid?: string;
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
  widthOverHeight?: number;
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

export interface LinkPinContent extends PinContent {
  url: string;
  metadata: LinkPreview;
}

export interface PinDimension {
  height?: number;
  left?: number;
  top?: number;
}

export interface PinGroup {
  uid: string;
  referenceQuoteId: string;
  percentage: number;
  referenceQuote: string;
  pins: Array<Pin>;
  pinCount: number;
}

export interface LinkPreview {
  image: string;
  title: string;
  description: string;
  type: string;
  siteName: string;
  imageRatio?: number;
}

export interface BoardInvitation {
  boardId: string;
  password?: string;
  uid: string;
}

export interface BoardFilters {
  labels: Array<string>;
  reactions: Array<string>;
  authors: Array<string>;
}
