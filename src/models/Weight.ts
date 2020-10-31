import { WeightType } from "../enums";

export default class Weight {
  private _value: number;
  private _type: WeightType;
  constructor(value: number, type: WeightType) {
    this._value = value;
    this._type = type;
  }

  get value() {
    switch (this._type) {
      case WeightType.pounds:
        return this._value / 2.205;
      case WeightType.kilogram:
      default:
        return this._value;
    }
  }
}
