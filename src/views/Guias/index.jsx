import React, { Component } from 'react';
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

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  buttonTd: {
    paddingLeft: '2px',
    paddingRight: '2px',
  },
});


/* MOCK */
let id = 0;
function createData(numGuia, paciente, vencimento, status, valor) {
  id += 1;
  return {
    id, numGuia, paciente, vencimento, status, valor,
  };
}

const createRowsMock = [
  createData(92093, 'Pedrão', '20/02/2019', 'Enviada', 'R$ 125,00'),
  createData(92093, 'Maria Joaquina', '20/02/2019', 'Enviada', 'R$ 125,00'),
  createData(92093, 'Fabio', '20/02/2019', 'Enviada', 'R$ 125,00'),
  createData(92093, 'Jomal', '20/02/2019', 'Enviada', 'R$ 125,00'),
];
/* MOCK */


class Guias extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      rows: [...createRowsMock],
    };

    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.handleDeletarGuia = this.handleDeletarGuia.bind(this);
  }

  handleToggleModal() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  handleDeletarGuia(i) {
    const { rows } = this.state;

    rows.splice(i, 1);

    this.setState({
      rows: [...rows],
    });
  }

  render() {
    const { classes } = this.props;
    const { open, rows } = this.state;

    return (
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={this.handleToggleModal}>Novo</Button>
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
                <TableCell className={classes.buttonTd} align="center">Editar</TableCell>
                <TableCell className={classes.buttonTd} align="center">Excluir</TableCell>
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
                    <IconButton aria-label="Editar">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell className={classes.buttonTd} align="center">
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
