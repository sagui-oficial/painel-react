import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

  componentDidUpdate(prevProps) {
    const { guia, history } = this.props;

    if (prevProps.guia !== guia) {
      history.push(`/guias/${guia.id}`);
    }
  }

  handleAddGuia() {
    const { addGuia: propAddGuia } = this.props;
    const createID = uuidv1();

    propAddGuia({
      id: createID,
      status: 0,
      publicID: createID,
      numero: createID.split('-')[0].toUpperCase(),
      planooperadora: {
        id: 1,
        publicID: createID,
        nomefantasia: 'Operadora 1',
        razaosocial: null,
        cnpj: null,
        dataenviolote: '0001-01-01T00:00:00',
        datarecebimentolote: '0001-01-01T00:00:00',
        listaprocedimentos: null,
        listaarquivos: null,
      },
      paciente: {
        id: 1,
        publicID: createID,
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
          datacriacao: '2019-01-14T20:43:07.4768306-02:00',
          patharquivo: 'C:\\',
        },
      ],
      solicitacao: '2019-01-14T20:43:07.4698345-02:00',
      vencimento: '2019-02-14T20:43:07.4748316-02:00',
      procedimentos: [
        {
          id: 1,
          publicID: createID,
          codigo: 1,
          nomeprocedimento: 'Procedimento de Teste090',
          valorprocedimento: randomPrice(50, 1500),
          exigencias: 'Lorem lorem',
          anotacoes: 'Bla Bla bla',
        },
      ],
    });
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
  guia: PropTypes.instanceOf(Object),
};

GuiaCreate.defaultProps = {
  guia: {},
};

const mapStateToProps = state => ({
  guia: state.guiasReducer.guias,
  guiasError: state.guiasReducer.fetchError,
});

export default connect(mapStateToProps, {
  addGuia,
})(withStyles(styles)(GuiaCreate));
