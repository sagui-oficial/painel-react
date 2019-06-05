export const formatCurrency = (_number, _locale = 'pt-BR', _format = 'BRL') => (
  new Intl.NumberFormat(_locale, {
    style: 'currency',
    currency: _format,
    minimumFractionDigits: 2,
  })).format(_number);

export const formatCPF = _value => (
  _value
    .toString()
    .trim()
    .toUpperCase()
    .replace(/[^0-9]/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
);

export const formatCNPJ = _value => (
  _value
    .toString()
    .trim()
    .toUpperCase()
    .replace(/[^0-9]/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
);

export const formatDate = (_string, _locale = 'pt-BR') => {
  const dateString = new Date(_string);
  const optionsDate = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return dateString.toLocaleDateString(_locale, optionsDate);
};

export const formatPhone = _value => (
  _value
    .toString()
    .trim()
    .toUpperCase()
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2')
);

export const convertDatePicker = (_string) => {
  const getDate = new Date(_string);
  const year = getDate.getFullYear();
  const day = `0${(getDate.getDate())}`;
  const month = `0${getDate.getMonth() + 1}`;
  return `${year}-${month.substr(-2)}-${day.substr(-2)}`;
};

export const fixDateOnSave = _string => new Date(`${_string}T12:00:00-0300`);
