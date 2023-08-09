export type ObjectInputProps = {
  value: string;
  type: string;
  placeholder: string | null;
  help?: string | null;
  IsShowInfoHelp: boolean;
  onFocus: boolean;
  IsEnabled?: boolean;
  IsRequire?: boolean;
  name: string;
  isopen?: boolean | null;
};

export type InfoAboutEmailInput = {
  enabled?: boolean;
  emailRequire?: boolean;
  emailHelp: string | null;
  emailPlaceholder: string | null;
};

export type InfoAboutDescriptionInput = {
  enabled?: boolean;
  descriptionRequire?: boolean;
  itemDescriptionHelp: string | null;
  itemDescriptionPlaceholder: string | null;
};
export type InfoAboutNameInput = {
  enabled?: boolean;
  descriptionRequire?: boolean;
  itemNameHelp: string | null;
  itemNamePlaceholder: string | null;
};
export type itemFromList = {
  ItemID: string;
  description: string;
  discount: string;
  name: string;
};

export enum positionType {
  MANUAL = "MANUAL",
  MANUAL_LIST = "MANUAL_LIST",
  LIST = "LIST",
}

export type responseForm = {
  clientId: string;
  clientTitle: string;
  email: InfoAboutEmailInput;
  employee: string;
  employeeName: string;
  itemDescription: InfoAboutDescriptionInput;
  itemList?: itemFromList[];
  itemName: InfoAboutNameInput;
  keyGen: string;
  positionType: positionType;
};
