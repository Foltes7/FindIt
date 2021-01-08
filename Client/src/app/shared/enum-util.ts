export type EnumValue = string | number;

export class EnumUtil {

  public static getEnumValueByKey<E extends EnumValue>(e: object, key: string): E {
    return e[key];
  }

  public static getEnumKeyByValue(e: object, value: EnumValue): string {
    return this.getEnumKeys(e).find(key => e[key] === value);
  }

  public static getEnumKeys(e: object): string[] {
    return Object.keys(e).filter(String);
  }

  public static getEnumKeysByPredicate(e: object, func: (e: string) => boolean): string[] {
    return this.getEnumKeys(e).filter(func);
  }

  public static getEnumValues(e: object): EnumValue[] {
    return this.getEnumKeys(e).map(key => e[key]);
  }

  public static prepareItem<T>(e: object, func: (key: string, value: EnumValue) => T): T[] {
    return this.getEnumKeys(e).map(key => func(key, this.getEnumValueByKey(e, key)));
  }

  public static prepareItemForValues<T>(e: object,
                                        func: (key: string, value: EnumValue) => T,
                                        ...values: EnumValue[]): T[] {
    let obj;
    if (values && values.length) {
      obj = {};
      values.forEach(v => obj[EnumUtil.getEnumKeyByValue(e, v)] = v);
    } else {
      obj = e;
    }
    return EnumUtil.prepareItem(obj, func);
  }

}