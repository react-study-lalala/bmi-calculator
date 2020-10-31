import { Weight, Height } from ".";

export default class BMI {
  private _weight: Weight;
  private _height: Height;
  constructor(weight: Weight, height: Height) {
    this._weight = weight;
    this._height = height;
  }

  get message(): string {
    if (this.value >= 18.5 && this.value <= 25) return "정상적인 몸무게입니다.";
    else if (this.value > 25) return "과체중입니다. 의사와 상의하세요.";
    else if (this.value < 18.5) return "저체중입니다. 의사와 상의하세요.";
    return "";
  }

  get value(): number {
    const heightToMeter = this._height.value / 100;
    return this._weight.value / (heightToMeter * heightToMeter);
  }
}
