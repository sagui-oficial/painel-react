import {
  convertDatePicker,
  formatPhone,
} from '../../helpers';

describe(('Formatters strings'), () => {
  it('Should format to datepicker', () => {
    expect(
      convertDatePicker(new Date('Tue Jun 04 2019 20:44:46 GMT-0300')),
    ).toBe('2019-06-04');
  });
  it('Should format Brazil phone number', () => {
    expect(
      formatPhone(1190909090),
    ).toBe('(11) 9090-9090');
  });
});
