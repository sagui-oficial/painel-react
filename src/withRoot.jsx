import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    background: {
      default: '#ffffff',
    },
  },
});

const withRoot = Component => props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Component {...props} />
  </MuiThemeProvider>
);

export default withRoot;
