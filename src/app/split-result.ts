export interface ISplitResult {
  tipAmountPerPerson: number;
  totalAmountPerPerson: number;
}

export class SplitResult implements ISplitResult {
  tipAmountPerPerson: number = 0;
  totalAmountPerPerson: number = 0;

  constructor(totalAmountPerPerson: number, tipAmountPerPerson: number) {
    this.totalAmountPerPerson = totalAmountPerPerson;
    this.tipAmountPerPerson = tipAmountPerPerson;
  }

  getAmount(): string {
    return this.totalAmountPerPerson.toFixed(2);
  }

  getTip(): string {
    return this.tipAmountPerPerson.toFixed(2);
  }
}
