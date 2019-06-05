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
