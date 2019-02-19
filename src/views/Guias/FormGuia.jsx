import React, { Component } from 'react';
import PropTypes from 'prop-types';

// MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// LOCAL IMPORTS
import { formatCurrency } from '../../helpers';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    '& th:first-child': {
      width: '120px',
      padding: '0 20px',
    },
    '& th:not(:first-child)': {
      paddingRight: '20px',
    },
    '& th:nth-child(2)': {
      width: '30%',
    },
    '& td': {
      paddingRight: '20px',
    },
  },
  buttonTd: {
    paddingLeft: '20px',
    paddingRight: '20px !important',
    width: '120px',
    '& button': {
      padding: '5px',
      '& svg': {
        fontSize: '18px',
      },
      '&:first-child svg': {
        fill: '#320369',
      },
      '&:last-child svg': {
        fill: '#a7a7a7',
      },
    },
  },
});

class FormGuias extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guia: {},
      open: false,
    };

    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const { state } = location;

    this.setState({ guia: state });
  }

  handleToggleModal() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { classes } = this.props;
    const { guia } = this.state;

    return (
      <div>
        {guia && (
          <Grid item xs={12}>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {guia.numero && (<TableCell>{guia.numero}</TableCell>)}
                    {guia.paciente && (<TableCell align="left">{guia.paciente.nome}</TableCell>)}
                    {guia.vencimento && (<TableCell align="left">{guia.vencimento}</TableCell>)}
                    {guia.status && (<TableCell align="left">{guia.status}</TableCell>)}
                    {guia.procedimentos && <TableCell align="left">{formatCurrency(guia.procedimentos[0].valorprocedimento)}</TableCell>}
                  </TableRow>
                </TableHead>
              </Table>
            </Paper>
          </Grid>
        )}
      </div>
    );
  }
}

FormGuias.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(FormGuias);
