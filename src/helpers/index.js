export const formatCurrency = (_number, _locale = 'pt-BR', _format = 'BRL') => new Intl.NumberFormat(_locale, {
  style: 'currency',
  currency: _format,
  minimumFractionDigits: 2,
}).format(_number);

export const formatDate = (_string, _locale = 'pt-BR') => {
  const dateString = new Date(_string);
  const optionsDate = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return dateString.toLocaleDateString(_locale, optionsDate);
};

export const convertDatePicker = (_string) => {
  const getDate = new Date(_string);
  const year = getDate.getFullYear();
  const day = `0${(getDate.getDate())}`;
  const month = `0${getDate.getMonth() + 1}`;
  return `${year}-${month.substr(-2)}-${day.substr(-2)}`;
};

export const fixDateOnSave = _string => new Date(`${_string}T12:00:00-0300`);

export const orderByDate = (arr = [], propName, order = 'asc') => (
  arr.slice(0).sort((a, b) => {
    const firstDate = new Date(a[propName]);
    const secondDate = new Date(b[propName]);
    let orderDesc = 1;
    let orderAsc = -1;

    if (order === 'desc') {
      orderDesc = -1;
      orderAsc = 1;
    }

    if (firstDate > secondDate) return orderAsc;
    if (firstDate < secondDate) return orderDesc;
    return 0;
  }));

export const orderBy = (arr = [], propName, order = 'asc') => (
  arr.slice(0).sort((a, b) => {
    const firstDate = a[propName];
    const secondDate = b[propName];
    let orderDesc = 1;
    let orderAsc = -1;

    if (order === 'desc') {
      orderDesc = -1;
      orderAsc = 1;
    }

    if (firstDate > secondDate) return orderDesc;
    if (firstDate < secondDate) return orderAsc;
    return 0;
  }));

export const normalizeString = (_str) => {
  if (typeof _str !== 'undefined') {
    return _str
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s\s+/, ' ')
      .toLowerCase();
  }

  return false;
};

export const matchItem = (_string, _value) => {
  const item = typeof _string !== 'undefined' ? _string.toString() : '';
  return normalizeString(item).indexOf(normalizeString(_value)) > -1;
};

export const validateCPF = (strCPF) => {
  const convertStrCPFToNumber = strCPF.replace(/[^\d]+/g, '');
  let sumNumbers;
  let getLastTwoNumbers;
  sumNumbers = 0;

  if (convertStrCPFToNumber === '00000000000') return false;

  for (let i = 1; i <= 9; i += 1) {
    sumNumbers += parseInt(convertStrCPFToNumber.substring(i - 1, i), 10) * (11 - i);
  }

  getLastTwoNumbers = (sumNumbers * 10) % 11;

  if ((getLastTwoNumbers === 10) || (getLastTwoNumbers === 11)) getLastTwoNumbers = 0;

  if (getLastTwoNumbers !== parseInt(convertStrCPFToNumber.substring(9, 10), 10)) return false;
  sumNumbers = 0;

  for (let i = 1; i <= 10; i += 1) {
    sumNumbers += parseInt(convertStrCPFToNumber.substring(i - 1, i), 10) * (12 - i);
  }

  getLastTwoNumbers = (sumNumbers * 10) % 11;

  if ((getLastTwoNumbers === 10) || (getLastTwoNumbers === 11)) getLastTwoNumbers = 0;

  if (getLastTwoNumbers !== parseInt(convertStrCPFToNumber.substring(10, 11), 10)) return false;

  return true;
};
