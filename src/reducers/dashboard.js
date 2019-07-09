import { GET_DATA } from '../actions/dashboard';
import { formatCurrency } from '../helpers';

const INITIAL_STATE = {
  grafico: [],
  faturamento: {},
  guiasGlosadas: {},
  pacienteAtendidos: 0,
};

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case GET_DATA:
      return {
        ...state,
        grafico: payload.grafico && payload.grafico.map(item => (
          [
            item.operadora,
            { v: item.total, f: formatCurrency(item.total) },
            { v: item.glosadas, f: formatCurrency(item.glosadas) },
          ]
        )),
        guiasGlosadas: payload.guiasGlosadas && payload.guiasGlosadas,
        faturamento: payload.faturamento && payload.faturamento,
        pacienteAtendidos: payload.pacienteAtendidos && payload.pacienteAtendidos,
      };
    default:
      return state;
  }
}
