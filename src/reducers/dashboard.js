import { GET_DATA } from '../actions/dashboard';
import { formatCurrency } from '../helpers';

const INITIAL_STATE = {
  planos: [],
};

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_DATA:
      return {
        ...state,
        planos: payload.map(item => (
          [
            item.operadora,
            { v: item.total, f: formatCurrency(item.total) },
            { v: item.glosadas, f: formatCurrency(item.glosadas) },
          ]
        )),
      };
    default:
      return state;
  }
}
