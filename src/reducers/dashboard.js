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
        grafico: payload.Grafico && payload.Grafico.map(item => (
          [
            item.Operadora,
            { v: item.Total, f: formatCurrency(item.Total) },
            { v: item.Glosadas, f: formatCurrency(item.Glosadas) },
          ]
        )),
        guiasGlosadas: payload.GuiasGlosadas || {},
        faturamento: payload.Faturamento || {},
        pacienteAtendidos: payload.PacienteAtendidos || 0,
      };
    default:
      return state;
  }
}
