import HeightType from "../enums/HeightType";

export default class Height {
  private _value: number;
  private _type: HeightType;
  constructor(value: number, type: HeightType) {
    this._value = value;
    this._type = type;
  }
  get value() {
    switch (this._type) {
      case HeightType.inch:
        return this._value * 2.54;
      case HeightType.centimeter:
      default:
        return this._value;
    }
  }
}
