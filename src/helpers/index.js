export function getUNIXDate() {
  const getDate = new Date();
  const day = `0${getDate.getDate()}`;
  const month = `0${getDate.getMonth() + 1}`;
  const year = getDate.getFullYear();

  return `${day.substr(-2)}/${month.substr(-2)}/${year}`;
}

export const formatCurrency = (_number, _locale = 'pt-BR', _format = 'BRL') => new Intl.NumberFormat(_locale, {
  style: 'currency',
  currency: _format,
  minimumFractionDigits: 2,
}).format(_number);

export function randomPrice(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

export function randomStatusGuias() {
  const statusItems = ['Vencida', 'Paga', 'Enviada', 'Cancelada', 'Glosada'];
  const randomItem = Math.floor(Math.random() * statusItems.length);
  return statusItems[randomItem];
}

export default { getUNIXDate, formatCurrency };
