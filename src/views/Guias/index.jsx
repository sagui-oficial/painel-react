import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

// Material Imports
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import {
  getUNIXDate, formatCurrency, randomPrice, randomStatusGuias,
} from '../../helpers';

import { loadGuias, addGuia } from '../../actions/guias';
import FormCadastro from '../../components/FormCadastro';

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
    '& button, & a': {
      padding: '5px',
      '& svg': {
        fontSize: '18px',
      },
      '&:first-child svg': {
        fill: '#000',
      },
      '&:last-child svg': {
        fill: '#a7a7a7',
      },
    },
  },
  dangerLabel: {
    backgroundColor: '#d60202',
    color: 'white',
    padding: '2px 5px',
  },
});

class Guias extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.handleDeletarGuia = this.handleDeletarGuia.bind(this);
    this.handleAddGuia = this.handleAddGuia.bind(this);
  }

  componentDidMount() {
    const { loadGuias: propLoadGuias } = this.props;
    propLoadGuias();
  }

  handleToggleModal() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  handleDeletarGuia(id) {
    this.setState((state) => {
      const rows = state.rows.filter(item => item.id !== id);

      return { rows };
    });
  }

  handleAddGuia() {
    const { addGuia: propAddGuia } = this.props;

    propAddGuia(
      {
        id: uuidv1(),
        numGuia: uuidv1().split('-')[0].toUpperCase(),
        paciente: 'Maria Joaquina dos Santos',
        vencimento: getUNIXDate(),
        status: randomStatusGuias(),
        valor: randomPrice(50, 1500),
      },
    );
  }

  render() {
    const { classes, guias } = this.props;
    const { open } = this.state;

    return (
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleToggleModal}
        >
          Abrir modal exemplo
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={this.handleAddGuia}
        >
          Adicionar Guia Mock
        </Button>

        <FormCadastro fullScreen={false} open={open} onClose={this.handleToggleModal} />
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>N˚ da Guia</TableCell>
                <TableCell align="left">Paciente</TableCell>
                <TableCell align="left">Vencimento</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Valor</TableCell>
                <TableCell className={classes.buttonTd} align="center">Editar | Excluir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {guias.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.numGuia}
                  </TableCell>
                  <TableCell align="left">{row.paciente}</TableCell>
                  <TableCell align="left">{row.vencimento}</TableCell>
                  <TableCell align="left">
                    <span className={row.status === 'Glosada' ? classes.dangerLabel : null}>{row.status}</span>
                  </TableCell>
                  <TableCell align="left">{formatCurrency(row.valor)}</TableCell>
                  <TableCell className={classes.buttonTd} align="center">
                    <IconButton
                      to={{
                        pathname: `/guias/${row.id}`,
                        state: { ...row },
                      }}
                      component={NavLink}
                      aria-label="Editar"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => this.handleDeletarGuia(row.id)} aria-label="Deletar">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    );
  }
}

Guias.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  loadGuias: PropTypes.func.isRequired,
  addGuia: PropTypes.func.isRequired,
  guias: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  guias: state.guiasReducer.guias,
});

export default connect(mapStateToProps, { loadGuias, addGuia })(withStyles(styles)(Guias));
