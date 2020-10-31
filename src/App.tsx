import React, { useEffect, useState } from "react";

export enum WeightType {
  pounds = "pounds",
  kilogram = "kilogram",
}
export enum HeightType {
  inch = "inch",
  centimeter = "centimeter",
}

export class Weight {
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

export class Height {
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

export class BMI {
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

export default function App() {
  const [height, setHeight] = useState<number>(100);
  const [weight, setWeight] = useState<number>(30);
  const [heightType, setHeightType] = useState<HeightType>(
    HeightType.centimeter
  );
  const [weightType, setWeightType] = useState<WeightType>(WeightType.kilogram);
  const [bmi, setBMI] = useState<BMI>(
    new BMI(new Weight(weight, weightType), new Height(height, heightType))
  );

  useEffect(() => {
    setBMI(
      () =>
        new BMI(new Weight(weight, weightType), new Height(height, heightType))
    );
  }, [height, weight, heightType, weightType]);

  return (
    <div>
      <h1>BMI 계산기</h1>
      <div>
        <label htmlFor="height">키:</label>
        <input
          id="height"
          data-testid="height"
          name="height"
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
        <select
          id="height-type"
          name="height-type"
          data-testid="height-type"
          onChange={(e) => setHeightType(e.target.value as HeightType)}
        >
          {Object.values(HeightType).map((value) => (
            <option key={value} value={value} defaultValue={heightType}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="weight">몸무게:</label>
        <input
          id="weight"
          data-testid="weight"
          name="weight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
        <select
          id="weight-type"
          name="weight-type"
          data-testid="weight-type"
          onChange={(e) => setWeightType(e.target.value as WeightType)}
        >
          {Object.values(WeightType).map((value) => (
            <option key={value} value={value} defaultValue={weightType}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div>당신의 BMI 지수는: {bmi.value.toFixed(2)}</div>
      <div>{bmi.message}</div>
    </div>
  );
}
