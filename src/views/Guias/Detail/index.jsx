import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

// LOCAL IMPORTS
import { loadGuiaDetail } from '../../../actions/guias';
import { formatCurrency } from '../../../helpers';

const styles = (/* theme */) => ({
  box: {
    padding: '20px',
    border: '1px solid #ccc',
  },
});

class GuiaDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadGuiaLocal: {},
    };
  }

  componentDidMount() {
    const {
      match,
      loadGuiaDetail: propLoadGuia,
      location,
    } = this.props;

    if (Object.keys(location).length > 0) {
      if (typeof location.state !== 'undefined') {
        this.setState({ loadGuiaLocal: { ...location.state } });
        return;
      }
    }

    propLoadGuia(match.params.id);
  }

  render() {
    const { classes, loadGuiaRequest } = this.props;
    const { loadGuiaLocal } = this.state;

    let guia = {};
    if (Object.keys(loadGuiaLocal).length > 0) {
      guia = loadGuiaLocal;
    } else {
      guia = loadGuiaRequest;
    }

    return (
      <div>
        {guia && (
          <div className={classes.box}>
            {guia.publicID && (<p>{guia.publicID}</p>)}
            {guia.paciente && (
              <Fragment>
                <p>{guia.paciente.nome && guia.paciente.nome}</p>
                <p>{guia.paciente.cpf && guia.paciente.cpf}</p>
                <p>{guia.paciente.email && guia.paciente.email}</p>
                <p>{guia.paciente.telefone && guia.paciente.telefone}</p>
              </Fragment>
            )}

            {guia.vencimento && (<p>{guia.vencimento}</p>)}

            {
              typeof guia.status !== 'undefined' && (
                <p>
                  {guia.status === 0 ? (
                    <span>Ativo</span>
                  ) : (
                    <span>Removido</span>
                  )}
                </p>
              )
            }

            {
              guia.procedimentos
              && guia.procedimentos.length > 0
              && guia.procedimentos.map(item => (
                <p key={item.publicID}>{formatCurrency(item.valorprocedimento)}</p>
              ))
            }
          </div>
        )}
      </div>
    );
  }
}

GuiaDetail.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  loadGuiaRequest: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object),
  loadGuiaDetail: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
};

GuiaDetail.defaultProps = {
  location: { state: {} },
};

const mapStateToProps = state => ({
  loadGuiaRequest: state.guiasReducer.guias,
  guiasError: state.guiasReducer.fetchError,
});

export default connect(mapStateToProps, {
  loadGuiaDetail,
})(withStyles(styles)(GuiaDetail));
