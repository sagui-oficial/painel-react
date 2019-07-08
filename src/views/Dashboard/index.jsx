import React, { Component } from 'react';
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
} from '@material-ui/icons';

import { loadData } from '../../actions/dashboard';
import Master from '../../components/Master';
import Loading from '../../components/Loading';
import BoxChart from '../../components/BoxChart';
import { convertDatePicker } from '../../helpers';

const colors = ['#0098b8', '#f1c100'];

class Dashboard extends Component {
  state = {
    start: moment().subtract(1, 'month'),
    end: moment(),
    focused: null,
  }

  componentDidMount() {
    const { loadData: propsLoadData } = this.props;
    const { start, end } = this.state;

    const currentDateSelect = {
      startDate: convertDatePicker(start),
      endDate: convertDatePicker(end),
    };
    propsLoadData(currentDateSelect);
  }

  componentDidUpdate(prevProps, prevState) {
    const { start, end, focused } = this.state;
    const { loadData: propsLoadData } = this.props;

    if (prevState.focused !== focused && prevState.focused === 'endDate') {
      const currentDateSelect = {
        startDate: convertDatePicker(start),
        endDate: convertDatePicker(end),
      };
      propsLoadData(currentDateSelect);
    }
  }

  render() {
    const { planos } = this.props;
    const { start, end, focused } = this.state;

    return (
      <Master>
        <Grid container justify="space-between" style={{ paddingLeft: 10, marginBottom: 20 }} spacing={16}>
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
            // showClearDates
            hideKeyboardShortcutsPanel
            isOutsideRange={() => false}
          />
        </Grid>

        <Grid container justify="space-between" spacing={16}>
          <BoxChart
            title="Faturamento mês"
            data="R$ 28.900,90"
            icon={DashboardIcon}
            bgColor="#00b898"
          />
          <BoxChart
            title="Guias glosadas"
            data="R$ 900,90"
            icon={LibraryBooksIcon}
          />
          <BoxChart
            title="Planos cadastrados"
            data="6"
            icon={LibraryBooksIcon}
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
            data={planos && [
              ['Planos', 'Faturamento', 'Glosadas'],
              ...planos,
            ]}
            options={{
              colors,
              chartArea: { width: '100%' },
              chart: {
                title: 'Faturamento mensal de guias',
                subtitle: 'valores em reais (R$)',
              },
              legend: {
                position: 'bottom',
              },
            }}
          />
        </Grid>
      </Master>
    );
  }
}

Dashboard.propTypes = {
  planos: PropTypes.instanceOf(Object).isRequired,
  loadData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  planos: state.dashboardReducer.planos,
});

export default connect(mapStateToProps, {
  loadData,
})(Dashboard);
