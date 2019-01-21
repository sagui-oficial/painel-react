import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material Imports
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
// import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import CadastroGuias from '../../components/FormCadastro/CadastroGuias';

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
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const { guia } = location;

    this.setState({ guia });
  }

  render() {
    const { classes } = this.props;
    const { guia } = this.state;

    return (
      <Grid item xs={12}>
        {/* <Button variant="contained"
          color="primary" onClick={this.handleToggleModal}>Novo</Button> */}
        {/* <CadastroGuias fullScreen={false}
          open={open} onClose={this.handleToggleModal} /> */}
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>{guia.id}</TableCell>
                <TableCell align="left">{guia.paciente}</TableCell>
                <TableCell align="left">{guia.vencimento}</TableCell>
                <TableCell align="left">{guia.status}</TableCell>
                <TableCell align="left">{guia.valor}</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Paper>
      </Grid>
    );
  }
}

FormGuias.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(FormGuias);
