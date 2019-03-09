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

export const OrderByDate = (arr = [], propName, order = 'asc') => (
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

export const formatDate = (_string, _locale = 'pt-BR') => {
  const dateString = new Date(_string);
  const optionsDate = {
    // weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    year: 'numeric', month: 'numeric', day: 'numeric',
  };

  return dateString.toLocaleDateString(_locale, optionsDate);
};

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
