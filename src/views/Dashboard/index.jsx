import React from 'react';
import { Chart } from 'react-google-charts';
import { Grid } from '@material-ui/core';

import {
  Dashboard as DashboardIcon,
  LibraryBooks as LibraryBooksIcon,
} from '@material-ui/icons';

import Master from '../../components/Master';
import Loading from '../../components/Loading';
import BoxChart from '../../components/BoxChart';

const colors = ['#0098b8', '#f1c100'];

const Dashboard = () => (
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
        chartType="Line"
        loader={<Loading />}
        style={{ marginTop: 10 }}
        chartLanguage="pt-BR"
        data={[
          ['', 'Faturamento', 'Glosadas'],
          ['01/2019', { v: 6600.90, f: 'R$ 6.600,90' }, { v: 350, f: 'R$ 350,00' }],
          ['02/2019', 10450, 5280],
          ['03/2019', 23400, 12420],
          ['04/2019', 1776.8, 1180],
          ['05/2019', 1860.78, 110],
          ['06/2019', 9990.98, 890],
          ['07/2019', 567.90, 89],
          ['08/2019', 1200.60, 30],
          ['09/2019', 3600.87, 856],
          ['10/2019', 4500.24, 578],
          ['11/2019', 8000.45, 450],
          ['12/2019', 12000.79, 15680],
        ]}
        options={{
          colors,
          chart: {
            title: 'Faturamento mensal de guias',
            subtitle: 'valores em reais (R$)',
          },
        }}
      />
    </Grid>
  </Master>
);

export default Dashboard;
