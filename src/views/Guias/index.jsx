import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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

let id = 0;
function createData(numGuia, paciente, vencimento, status, valor) {
  id += 1;
  return {
    id, numGuia, paciente, vencimento, status, valor,
  };
}

const rows = [
  createData(92093, 'Maria Joaquina', '20/02/2019', 'Enviada', 'R$ 125,00'),
];

function Guias(props) {
  const { classes } = props;

  return (
    <div>
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
                  <IconButton aria-label="Deletar">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

Guias.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Guias);
