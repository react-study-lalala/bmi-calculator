import React, { useEffect, useState } from "react";
export default function App() {
  const [height, setHeight] = useState<number>(100);
  const [weight, setWeight] = useState<number>(30);
  const [bmi, setBMI] = useState<number>(0);

  useEffect(() => {
    const heightToMeter = height / 100;
    setBMI(() => weight / (heightToMeter * heightToMeter));
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
    </div>
  );
}
