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

export const convertDatePicker = (_timestamp) => {
  const getDate = new Date(_timestamp);
  const year = getDate.getFullYear();
  const day = `0${(getDate.getDate())}`;
  const month = `0${getDate.getMonth() + 1}`;
  return `${year}-${month.substr(-2)}-${day.substr(-2)}`;
};

export const fixDateOnSave = (_string) => {
  const parts = _string.split('-');
  const mydate = new Date(parts[0], parts[1] - 1, parts[2]);
  return mydate;
};
