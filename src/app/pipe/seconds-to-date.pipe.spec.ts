import { SecondsToDatePipe } from './seconds-to-date.pipe';

describe('SecondsToDatePipe', () => {
  it('create an instance', () => {
    const pipe = new SecondsToDatePipe();
    expect(pipe).toBeTruthy();
  });
});
