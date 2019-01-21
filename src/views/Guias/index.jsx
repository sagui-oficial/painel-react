import React, { Component } from 'react';
import {/*  Link, */ NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

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
import CadastroGuias from '../../components/FormCadastro/CadastroGuias';
// import FormGuia from './FormGuia';

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

/* MOCK */
const createData = (...items) => ({
  id: items[0],
  numGuia: items[1],
  paciente: items[2],
  vencimento: items[3],
  status: items[4],
  valor: items[5],
});

const createRowsMock = [
  createData(12, 92093, 'Pedrão', '20/02/2019', 'Enviada', 'R$ 25,00'),
  createData(22, 92094, 'Maria Joaquina', '20/02/2019', 'Enviada', 'R$ 1.250,00'),
  createData(202, 92094, 'Maria Joaquina', '20/02/2019', 'Enviada', 'R$ 125,00'),
  createData(32, 92095, 'Fabio José da Silva Santos Batista Jr.', '20/02/2019', 'Pago', 'R$ 5,90'),
  createData(452, 92095, 'Bla Bla Bla Bla', '20/02/2019', 'Pago', 'R$ 9.525,00'),
  createData(302, 92095, 'Fabio', '20/02/2019', 'Glosada', 'R$ 3.125,00'),
  createData(142, 92096, 'Lorem Ipsum Lorem', '20/02/2019', 'Atualizada', 'R$ 125,00'),
  createData(422, 92096, 'Lorem Ipsum Lorem', '20/02/2019', 'Excluida', 'R$ 1.245,00'),
];
/* MOCK */

class Guias extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      rows: [],
    };

    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.handleDeletarGuia = this.handleDeletarGuia.bind(this);
  }

  componentDidMount() {
    this.setState({ rows: [...createRowsMock] });
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

  render() {
    const { classes } = this.props;
    const { open, rows } = this.state;

    return (
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleToggleModal}
        >
          Abrir modal exemplo
        </Button>

        <CadastroGuias fullScreen={false} open={open} onClose={this.handleToggleModal} />
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
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.numGuia}
                  </TableCell>
                  <TableCell align="left">{row.paciente}</TableCell>
                  <TableCell align="left">{row.vencimento}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="left">{row.valor}</TableCell>
                  <TableCell className={classes.buttonTd} align="center">
                    <IconButton
                      // to={`/guias/${row.id}`}
                      to={{
                        pathname: `/guias/${row.id}`,
                        guia: { ...row },
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
};

export default withStyles(styles)(Guias);
