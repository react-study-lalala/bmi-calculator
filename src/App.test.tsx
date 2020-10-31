import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { WeightType, HeightType } from "./App";

describe("App", () => {
  const inputBMIValues = async (
    height: number,
    weight: number,
    heightType: HeightType = HeightType.centimeter,
    weightType: WeightType = WeightType.kilogram
  ) => {
    await userEvent.clear(screen.getByTestId("height"));
    await userEvent.clear(screen.getByTestId("weight"));
    await userEvent.selectOptions(
      screen.getByTestId("weight-type"),
      weightType
    );
    await userEvent.selectOptions(
      screen.getByTestId("height-type"),
      heightType
    );
    await userEvent.type(screen.getByTestId("height"), height.toString());
    await userEvent.type(screen.getByTestId("weight"), weight.toString());
  };

  test("BMI 계산기가 잘 동작하나 확인합니다.", async () => {
    render(<App />);
    await inputBMIValues(100, 30);
    expect(screen.getByText(/30.00/g)).toBeInTheDocument();
  });

  test("BMI 값이 18.5에서 25 사이로 나타나면 이 사람은 정상적인 몸무게라고 출력합니다.", async () => {
    render(<App />);
    await inputBMIValues(100, 20);
    expect(screen.getByText(/정상적인 몸무게입니다./g)).toBeInTheDocument();
  });

  test("그렇지 않은 경우에는 과체중이나 저체중으로 나타낸 다음 의사와 상의하라는 문구도 출력해봅니다.", async () => {
    render(<App />);
    await inputBMIValues(100, 30);
    expect(
      screen.getByText(/과체중입니다. 의사와 상의하세요./g)
    ).toBeInTheDocument();
    await inputBMIValues(100, 10);
    expect(
      screen.getByText(/저체중입니다. 의사와 상의하세요./g)
    ).toBeInTheDocument();
  });

  test("인치 / 파운드 단위의 국제표준 단위를 모두 입력받을수 있도록 프로그램을 수정해보자.", async () => {
    render(<App />);
    await inputBMIValues(70.8661, 180.779, HeightType.inch, WeightType.pounds);
    expect(
      screen.getByText(/과체중입니다. 의사와 상의하세요./g)
    ).toBeInTheDocument();
  });
});
