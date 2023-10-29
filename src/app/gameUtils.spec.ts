import { GameUtils } from "./gameUtils";

describe('gameUtils', () => {

  it('should pick one', () => {
    const gameUtils = new GameUtils();

    spyOn(gameUtils, 'randomInt').and.returnValues(2);

    expect(gameUtils.pickOne([1,2,3])).toBe(3);
  });

  it('should shuffle', () => {
    const gameUtils = new GameUtils();

    spyOn(gameUtils, 'getRandomValues').and.returnValues(new Uint32Array([10,20,30]));

    expect(gameUtils.shuffle([1,2,3])).toEqual([1,2,3]);
  });

  it('should shuffle reverse', () => {
    const gameUtils = new GameUtils();

    spyOn(gameUtils, 'getRandomValues').and.returnValues(new Uint32Array([30,20,10]));

    expect(gameUtils.shuffle([1,2,3])).toEqual([3,2,1]);
  });

  it('should get riddle', () => {
    const gameUtils = new GameUtils();

    spyOn(gameUtils, 'getRandomValues').and.returnValues(new Uint32Array([30,20,10]));
    spyOn(gameUtils, 'randomInt').and.returnValues(1);


    expect(gameUtils.getRiddle(['a', 'b', 'c'], 2)).toEqual({ options: ['c', 'b'], answer: 'b'});
  });

  it('should get number riddle in range reverse', () => {
    const gameUtils = new GameUtils();

    spyOn(gameUtils, 'getRandomValues').and.returnValues(new Uint32Array([5, 4, 3, 2, 1]));
    spyOn(gameUtils, 'randomInt').and.returnValues(0, 0);


    expect(gameUtils.getNumberRiddleInRange(1, 10, 5, 2)).toEqual({ options: [5, 4], answer: 5});
  });

  it('should get number riddle in range', () => {
    const gameUtils = new GameUtils();

    spyOn(gameUtils, 'getRandomValues').and.returnValues(new Uint32Array([1,2,3,4,5]));
    spyOn(gameUtils, 'randomInt').and.returnValues(0, 0);


    expect(gameUtils.getNumberRiddleInRange(1, 10, 5, 2)).toEqual({ options: [1, 2], answer: 1});
  });

  it('should get number riddle with max from the range', () => {
    const gameUtils = new GameUtils();

    spyOn(gameUtils, 'getRandomValues').and.returnValues(new Uint32Array([1,2,3,4,5,6,7,8,9,10].reverse()));
    spyOn(gameUtils, 'randomInt').and.callFake(n => n - 1);


    expect(gameUtils.getNumberRiddleInRange(1, 10, 5, 2)).toEqual({ options: [10, 9], answer: 9});
  });

  it('should get random number from the range (min)', () => {
    const gameUtils = new GameUtils();

    spyOn(gameUtils, 'randomInt').and.returnValue(0);

    expect(gameUtils.randomIntFromInclusiveRange(30, 50)).toEqual(30);
  });

  it('should get random number from the range (max)', () => {
    const gameUtils = new GameUtils();

    spyOn(gameUtils, 'randomInt').and.callFake(n => n-1);

    expect(gameUtils.randomIntFromInclusiveRange(30, 50)).toEqual(50);
  });
});