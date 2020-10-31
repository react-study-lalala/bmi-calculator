import React, { useEffect, useState } from "react";
import { HeightType, WeightType } from "./enums";
import { BMI, Height, Weight } from "./models";

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
          value={heightType}
          onChange={(e) => setHeightType(e.target.value as HeightType)}
        >
          {Object.values(HeightType).map((value) => (
            <option key={value} value={value}>
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
          value={weightType}
          onChange={(e) => setWeightType(e.target.value as WeightType)}
        >
          {Object.values(WeightType).map((value) => (
            <option key={value} value={value}>
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
