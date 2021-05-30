export type ClassProperties = {
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

export interface IContent {
  content: ClassProperties;
}

export interface IPagination {
  pagination: ClassProperties;
}

export interface IWaitMessage {
  waitMessage: ClassProperties;
}
