import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { addGuia } from '../../../actions/guias';
import { randomPrice, randomNames } from '../../../helpers';

const styles = theme => ({
  box: {
    padding: '20px',
    border: '1px solid #ccc',
  },
  addBtn: {
    ...theme.roundedBtn,
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0',
      marginTop: '0.5rem',
      width: '100%',
    },
  },
});

class GuiaCreate extends Component {
  constructor(props) {
    super(props);

    this.handleAddGuia = this.handleAddGuia.bind(this);
  }

  async handleAddGuia() {
    const { addGuia: propAddGuia, history } = this.props;
    const createID = uuidv1();

    await propAddGuia({
      id: createID,
      status: 1,
      publicID: createID,
      numero: createID.split('-')[0].toUpperCase(),
      solicitacao: new Date(),
      vencimento: new Date(),
      planooperadora: {
        id: 1,
        publicID: uuidv1(),
        nomefantasia: 'Operadora 1',
        razaosocial: null,
        cnpj: null,
        dataenviolote: new Date(),
        datarecebimentolote: new Date(),
        listaprocedimentos: null,
        listaarquivos: null,
      },
      paciente: {
        id: 1,
        publicID: uuidv1(),
        listaplanooperadorapaciente: null,
        funcao: null,
        nome: randomNames(),
        anotacoes: null,
        cpf: null,
        email: null,
        telefone: null,
      },
      arquivos: [
        {
          nome: 'ArquivoTeste',
          stream: null,
          datacriacao: new Date(),
          patharquivo: 'C:\\',
        },
      ],
      procedimentos: [
        {
          id: 1,
          publicID: uuidv1(),
          codigo: 1,
          nomeprocedimento: 'Procedimento de Teste090',
          valorprocedimento: randomPrice(50, 1500),
          exigencias: 'Lorem lorem',
          anotacoes: 'Bla Bla bla',
        },
      ],
    });

    history.push(`/guias/${createID}`);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          className={classes.addBtn}
          onClick={this.handleAddGuia}
        >
          Salvar
        </Button>
        <h1 className={classes.box}>Guias</h1>
      </div>
    );
  }
}

GuiaCreate.propTypes = {
  addGuia: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  guia: state.guiasReducer.guias,
  guiasError: state.guiasReducer.fetchError,
});

export default connect(mapStateToProps, {
  addGuia,
})(withStyles(styles)(GuiaCreate));
