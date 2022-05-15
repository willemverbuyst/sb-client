export const sortArrayWithObjects =
  <
    U extends keyof T,
    // eslint-disable-next-line
    T extends { [key: string]: any }
  >(
    prop: U
  ) =>
  (order: string) =>
  (arrayWithObjects: T[]): T[] => {
    const sortedArrayWithObjects = [...arrayWithObjects].sort(
      (object1, object2): number => {
        const value1 = object1[prop]
        const value2 = object2[prop]
        if (
          typeof value1 === 'string' &&
          typeof value2 === 'string' &&
          order === 'ascending'
        ) {
          return value1.toLowerCase().localeCompare(value2.toLowerCase())
        }
        if (
          typeof value1 === 'string' &&
          typeof value2 === 'string' &&
          order === 'descending'
        ) {
          return value2.toLowerCase().localeCompare(value1.toLowerCase())
        }
        if (
          typeof value1 === 'number' &&
          typeof value2 === 'number' &&
          order === 'ascending'
        ) {
          return value1 - value2
        }
        if (
          typeof value1 === 'number' &&
          typeof value2 === 'number' &&
          order === 'descending'
        ) {
          return value2 - value1
        }
        return 1
      }
    )

    return sortedArrayWithObjects
  }
