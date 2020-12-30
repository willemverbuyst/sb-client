type ClassProperties = {
  [key: string]:
    | {
        [key: string]: string | number;
      }
    | string
    | number;
};

export interface IBreadCrumbs {
  breadCrumbs: ClassProperties;
}

export interface IDivider {
  divider: ClassProperties;
}

export interface IMessage {
  message: ClassProperties;
}

export interface IProgress {
  progress: ClassProperties;
}

export interface ISubTitle {
  subTitle: ClassProperties;
}

export interface ISubTitleSection {
  subTitleSection: ClassProperties;
}

export interface ITitle {
  title: ClassProperties;
}

export interface ITopSection {
  topSection: ClassProperties;
}
