import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe("App", () => {
  test('BMI 계산기라는 제목이 있어야 합니다.', () => {
    render(<App />);
    const linkElement = screen.getByText(/BMI 계산기/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("BMI 계산기가 잘 동작하나 확인합니다.", async () => {
    render(<App />);
    await userEvent.type(screen.getByTestId("height"), "100");
    await userEvent.type(screen.getByTestId("weight"), "30");
    render(<App />);
    const linkElement = screen.getByText(/30.00/g);
    expect(linkElement).toBeInTheDocument();
  })
})
