import React, { useEffect, useState } from "react";
export default function App() {
  const [height, setHeight] = useState<number>(100);
  const [weight, setWeight] = useState<number>(30);
  const [bmi, setBMI] = useState<number>(0);

  const getMessage = (bmi: number) => {
    if (bmi >= 18.5 && bmi <= 25) return "정상적인 몸무게입니다.";
    else if (bmi > 25) return "과체중입니다. 의사와 상의하세요.";
    else if (bmi < 18.5) return "저체중입니다. 의사와 상의하세요.";
  }

  const getBMI = (weight: number, height: number) => {
    const heightToMeter = height / 100;
    return weight / (heightToMeter * heightToMeter);
  }

  useEffect(() => {
    setBMI(() => getBMI(weight, height));
  }, [height, weight]);

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
      </div>
      <div>당신의 BMI 지수는: {bmi.toFixed(2)}</div>
      <div>{getMessage(bmi)}</div>
    </div>
  );
}
