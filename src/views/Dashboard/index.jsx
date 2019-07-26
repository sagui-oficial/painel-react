/* global window */
import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Chart } from 'react-google-charts';
import { Grid } from '@material-ui/core';

import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import 'moment/locale/pt-br';

import {
  Dashboard as DashboardIcon,
  LibraryBooks as LibraryBooksIcon,
  Person as PersonIcon,
} from '@material-ui/icons';

import { loadData } from '../../actions/dashboard';
import Master from '../../components/Master';
import Loading from '../../components/Loading';
import BoxChart from '../../components/BoxChart';
import { convertDatePicker, formatCurrency } from '../../helpers';

const colors = ['#0098b8', '#f1c100'];

class Dashboard extends Component {
  state = {
    loading: true,
    start: moment().subtract(1, 'month'),
    end: moment(),
    focused: null,
    resizeChart: 'right',
  }

  componentDidMount() {
    this.requestDashboardEndpoint();
    window.addEventListener('resize', this.chartResizeRemoveLegend);
  }

  componentDidUpdate(prevProps, prevState) {
    const { focused } = this.state;
    if (prevState.focused !== focused && prevState.focused === 'endDate') {
      this.requestDashboardEndpoint();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.chartResizeRemoveLegend);
  }

  requestDashboardEndpoint = async () => {
    const { start, end } = this.state;
    const { loadData: propsLoadData } = this.props;

    this.setState({ loading: true });

    const currentDateSelect = {
      startDate: convertDatePicker(start),
      endDate: convertDatePicker(end),
    };

    await propsLoadData(currentDateSelect);
    this.setState({ loading: false });
  }

  chartResizeRemoveLegend = () => {
    if (window.innerWidth >= 960) {
      this.setState({
        resizeChart: 'right',
      });
    } else {
      this.setState({
        resizeChart: 'none',
      });
    }
  }

  render() {
    const {
      grafico,
      faturamento,
      guiasGlosadas,
      pacienteAtendidos,
    } = this.props;
    const {
      loading,
      start,
      end,
      focused,
      resizeChart,
    } = this.state;

    return (
      <Master>
        {!loading ? (
          <Fragment>
            <Grid container justify="space-between" style={{ paddingLeft: 8, marginTop: 70, marginBottom: 20 }} spacing={16}>
              <DateRangePicker
                startDate={start}
                startDateId="startDateID"
                startDatePlaceholderText="Inicio"
                endDatePlaceholderText="Fim"
                endDate={end}
                endDateId="endDateID"
                onDatesChange={({ startDate, endDate }) => (
                  this.setState({ start: startDate, end: endDate })
                )}
                focusedInput={focused}
                onFocusChange={focusChange => this.setState({ focused: focusChange })}
                numberOfMonths={1}
                hideKeyboardShortcutsPanel
                isOutsideRange={() => false}
                small
              />
            </Grid>

            <Grid container justify="space-between" spacing={16}>
              <BoxChart
                options={{
                  title: 'Receitas',
                }}
                icon={DashboardIcon}
                bgColor="#00b898"
              >
                {faturamento.Previsto && (
                  <p>
                    <strong>Previstas: </strong>
                    {formatCurrency(faturamento.Previsto)}
                  </p>
                )}
                {faturamento.Realizado && (
                  <p>
                    <strong>Pagas: </strong>
                    {formatCurrency(faturamento.Realizado)}
                  </p>
                )}
              </BoxChart>
              <BoxChart
                options={{
                  title: 'Guias glosadas',
                }}
                icon={LibraryBooksIcon}
              >
                {guiasGlosadas.Valor !== 'undefined' && (
                  <p>
                    <strong>Valor: </strong>
                    {formatCurrency(guiasGlosadas.Valor)}
                  </p>
                )}
                {guiasGlosadas.quantidade && (
                  <p>
                    <strong>Qntd: </strong>
                    {guiasGlosadas.quantidade}
                  </p>
                )}
              </BoxChart>
              <BoxChart
                options={{
                  title: 'Pacientes atendidos',
                  data: pacienteAtendidos,
                }}
                icon={PersonIcon}
              />
            </Grid>

            <Grid container alignItems="center">
              <Chart
                width="100%"
                height="400px"
                chartType="Bar"
                loader={<Loading />}
                style={{ marginTop: 10 }}
                chartLanguage="pt-BR"
                data={grafico && [
                  ['Planos', 'Receitas', 'Glosadas'],
                  ...grafico,
                ]}
                options={{
                  colors,
                  chartArea: { width: '100%' },
                  chart: {
                    title: 'Receitas do período selecionado',
                    subtitle: 'valores em reais (R$)',
                  },
                  legend: {
                    position: resizeChart,
                  },
                }}
              />
            </Grid>
          </Fragment>
        ) : (
          <Loading />
        )}
      </Master>
    );
  }
}

Dashboard.propTypes = {
  grafico: PropTypes.instanceOf(Object).isRequired,
  faturamento: PropTypes.instanceOf(Object).isRequired,
  guiasGlosadas: PropTypes.instanceOf(Object).isRequired,
  pacienteAtendidos: PropTypes.number.isRequired,
  loadData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  grafico: state.dashboardReducer.grafico,
  faturamento: state.dashboardReducer.faturamento,
  guiasGlosadas: state.dashboardReducer.guiasGlosadas,
  pacienteAtendidos: state.dashboardReducer.pacienteAtendidos,
});

export default connect(mapStateToProps, {
  loadData,
})(Dashboard);
