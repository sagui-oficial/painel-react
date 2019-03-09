/**
 * Convert timestampo to string date
 * @param {convertTimestampToDate} _timestamp
 */
export function convertTimestampToDate(_timestamp) {
  const getDate = new Date(_timestamp);
  const day = `0${getDate.getDate()}`;
  const month = `0${getDate.getMonth() + 1}`;
  const year = getDate.getFullYear();

  return `${day.substr(-2)}/${month.substr(-2)}/${year}`;
}

/**
 * Order an array by propName
 * @param {*} arr
 * @param {*} propName
 */
export const OrderBy = (arr = [], propName) => (
  arr.slice(0).sort((a, b) => {
    if (a[propName] > b[propName]) return 1;
    if (a[propName] < b[propName]) return -1;
    return 0;
  }));

/**
 * Format price from currency code
 * @param {price} _number
 * @param {countryCode} _locale
 * @param {currencyFormat} _format
 */
export const formatCurrency = (_number, _locale = 'pt-BR', _format = 'BRL') => new Intl.NumberFormat(_locale, {
  style: 'currency',
  currency: _format,
  minimumFractionDigits: 2,
}).format(_number);

/**
 * Generate random price to mock DB
 * @param {minimumPrice} min
 * @param {maximumPrice} max
 */
export function randomPrice(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

/**
 * Generate random status from array
 * 'Vencida', 'Paga', 'Enviada', 'Cancelada', 'Glosada'
 */
export function randomStatusGuias() {
  const statusItems = ['Vencida', 'Paga', 'Enviada', 'Cancelada', 'Glosada'];
  const randomItem = Math.floor(Math.random() * statusItems.length);
  return statusItems[randomItem];
}

/**
 * Generate random names from array
 */
export function randomNames() {
  const namesItems = [
    'Maria Joaquina dos Santos',
    'Luis do Rosario Fonseca',
    'André Oliveiro Souza',
    'Luiza Batista dos Santos',
    'Antonieta das Neves Stevens',
    'Alfred Smith',
    'Silvio Wirtz Cazz',
    'Carmen Johnson Alves',
    'Danielle Kannenberg Silverstone',
    'Kannenberg Cazz Fonseca',
    'Olália Drummond Lombardi',
    'Alzira Müller Vargas',
  ];
  const randomItem = Math.floor(Math.random() * namesItems.length);
  return namesItems[randomItem];
}
