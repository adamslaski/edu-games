import { ideas } from "./ideas";

describe('Ideas', () => {

  it('all names are pairways different', () => {
    const set = new Set([...ideas].map(idea => idea.word));
    expect(set.size).toBe(ideas.length);
  });

  it('all urls are pairways different', () => {
    const set = new Set([...ideas].map(idea => idea.url));
    expect(set.size).toBe(ideas.length);
  });
});