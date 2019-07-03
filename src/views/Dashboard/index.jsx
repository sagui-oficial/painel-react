import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Chart } from 'react-google-charts';
import { Grid } from '@material-ui/core';

import {
  Dashboard as DashboardIcon,
  LibraryBooks as LibraryBooksIcon,
} from '@material-ui/icons';

import { loadData } from '../../actions/dashboard';
import Master from '../../components/Master';
import Loading from '../../components/Loading';
import BoxChart from '../../components/BoxChart';

const colors = ['#0098b8', '#f1c100'];

class Dashboard extends Component {
  componentDidMount() {
    const { loadData: propsLoadData } = this.props;
    propsLoadData();
  }

  render() {
    const { planos } = this.props;

    return (
      <Master>
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
