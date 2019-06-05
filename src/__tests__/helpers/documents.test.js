import {
  formatCPF,
  validateCPF,
  formatCNPJ,
  validateCNPJ,
  validateEmail,
} from '../../helpers';

describe('CPF field', () => {
  it('Should format number to string CPF', () => {
    expect(formatCPF(30030030030)).toBe('300.300.300-30');
  });
  it('Should check if CPF is valid', () => {
    expect(validateCPF('39814811009')).toBeTruthy();
  });
  it('Should check if CPF is invalid', () => {
    expect(validateCPF(30030030033)).toBeFalsy();
  });
  it('Should invalidate sequential CPF numbers', () => {
    expect(validateCPF(33333333333)).toBeFalsy();
    expect(validateCPF('11111111111')).toBeFalsy();
    expect(validateCPF('22222222222')).toBeFalsy();
  });
});

describe('CNPJ field', () => {
  it('Should format number to string CNPJ', () => {
    expect(formatCNPJ('00900900000190')).toBe('00.900.900/0001-90');
    expect(formatCNPJ(90900900000190)).toBe('90.900.900/0001-90');
  });
  /* it('Should check if CNPJ is valid', () => {
    expect(validateCNPJ('90900900000190')).toBeTruthy();
    expect(validateCNPJ('76582133000185')).toBeTruthy();
  }); */
  it('Should check if CNPJ is invalid', () => {
    expect(validateCNPJ('90900900000190')).toBeFalsy();
  });
});

describe('E-mail field', () => {
  it('Should return false if e-mail is invalid', () => {
    expect(validateEmail('emailemailemail')).toBeFalsy();
    expect(validateEmail('email@email')).toBeFalsy();
  });
  it('Should return true if e-mail is valid', () => {
    expect(validateEmail('email@email.com')).toBeTruthy();
    expect(validateEmail('email@email.com.br')).toBeTruthy();
  });
});
