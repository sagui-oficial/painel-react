import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

// MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';
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

// LOCAL IMPORTS
import {
  formatCurrency, randomPrice, randomStatusGuias, randomNames,
} from '../../../helpers';
import { loadGuias, addGuia, deleteGuias } from '../../../actions/guias';
import BoxSearch from '../../../components/BoxSearch';

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
    this.handleDeleteGuia = this.handleDeleteGuia.bind(this);
    this.handleAddGuia = this.handleAddGuia.bind(this);
  }

  componentDidMount() {
    const { loadGuias: propLoadGuias } = this.props;
    propLoadGuias();
  }

  handleDeleteGuia(postID) {
    const { deleteGuias: propDeleteGuias } = this.props;
    propDeleteGuias(postID);
  }

  handleAddGuia() {
    const { addGuia: propAddGuia } = this.props;
    const createID = uuidv1();

    propAddGuia(
      {
        id: createID,
        numGuia: createID.split('-')[0].toUpperCase(),
        paciente: randomNames(),
        vencimento: new Date().toLocaleDateString('pt-br'),
        status: randomStatusGuias(),
        valor: randomPrice(50, 1500),
      },
    );
  }

  render() {
    const { classes, guias } = this.props;

    return (
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleAddGuia}
        >
        Adicionar Guia Mock
        </Button>

        <BoxSearch />

        <Paper className={classes.root}>
          {
            guias.length > 0 && (
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
                            pathname: `/guias/${row.numGuia}`,
                            state: { ...row },
                          }}
                          component={NavLink}
                          aria-label="Editar"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => this.handleDeleteGuia(row.id)}
                          aria-label="Deletar"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
          }
        </Paper>
      </Grid>
    );
  }
}

Guias.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  guias: PropTypes.instanceOf(Array).isRequired,
  loadGuias: PropTypes.func.isRequired,
  addGuia: PropTypes.func.isRequired,
  deleteGuias: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ guias: state.guiasReducer.guias });

export default connect(mapStateToProps, {
  deleteGuias, loadGuias, addGuia,
})(withStyles(styles)(Guias));
