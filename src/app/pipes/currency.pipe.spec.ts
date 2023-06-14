import { CurrencyPipe } from './currency.pipe';

describe('CurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyPipe();
    expect(pipe).toBeTruthy();
  });

  it("adds dollar symbol to the pipe", () => {
    const INPUT_AMOUNT: string = "100";

    const pipe = new CurrencyPipe();
    expect(pipe.transform(INPUT_AMOUNT)).toContain("$");
    expect(pipe.transform(INPUT_AMOUNT)).toContain(INPUT_AMOUNT);
  })
});
