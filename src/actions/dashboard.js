export const GET_DATA = 'GET_DATA';

export function loadData() {
  return {
    type: GET_DATA,
    payload: [
      {
        operadora: 'Dental Par',
        total: 8260.90,
        glosadas: 490.80,
      },
      {
        operadora: 'Prodent',
        total: 6900.67,
        glosadas: 898.56,
      },
      {
        operadora: 'Uniodonto',
        total: 9104.55,
        glosadas: 90.89,
      },
      {
        operadora: 'Unimed',
        total: 3409.77,
        glosadas: 129.84,
      },
      {
        operadora: 'Prevident',
        total: 908.51,
        glosadas: 10.70,
      },
      {
        operadora: 'Interodonto',
        total: 4560.09,
        glosadas: 200.98,
      },
      {
        operadora: 'SulAmérica',
        total: 2090.88,
        glosadas: 348.21,
      },
      {
        operadora: 'Metlife',
        total: 1130.90,
        glosadas: 330.98,
      },
    ],
  };
}
