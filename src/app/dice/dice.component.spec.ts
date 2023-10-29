import { DiceComponent } from "./dice.component";

describe('DiceComponent', () => {

  it('sum on a dice should be correct', () => {
    const dc = new DiceComponent();

    for (let index = 1; index <= 25; index++) {
      dc.n = index;
      expect(dc.getNumbers().reduce((acc, v) => acc+v, 0)).toBe(index);  
    }
  });

});