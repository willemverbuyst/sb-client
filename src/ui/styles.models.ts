export type ClassProperties = {
  [key: string]:
    | {
        [key: string]: string | number;
      }
    | string
    | number;
};
