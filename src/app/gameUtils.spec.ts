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

    spyOn(gameUtils, 'getRandomValues').and.returnValues(new Uint32Array([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));
    spyOn(gameUtils, 'randomInt').and.returnValues(0, 0);


    expect(gameUtils.getNumberRiddleInRange(10, 5, 2)).toEqual({ options: [5, 4], answer: 5});
  });

  it('should get number riddle in range', () => {
    const gameUtils = new GameUtils();

    spyOn(gameUtils, 'getRandomValues').and.returnValues(new Uint32Array([1,2,3,4,5,6,7,8,9,10]));
    spyOn(gameUtils, 'randomInt').and.returnValues(0, 0);


    expect(gameUtils.getNumberRiddleInRange(10, 5, 2)).toEqual({ options: [1, 2], answer: 1});
  });
});