import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { loadGuiaDetail } from '../../../actions/guias';

// LOCAL IMPORTS
import { formatCurrency } from '../../../helpers';

const styles = (/* theme */) => ({
  box: {
    padding: '20px',
    border: '1px solid #ccc',
  },
});

class GuiaDetail extends Component {
  componentDidMount() {
    const {
      match,
      loadGuiaDetail: propLoadGuia,
    } = this.props;

    propLoadGuia(match.params.id);
  }

  render() {
    const { classes, guia } = this.props;

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
  guia: PropTypes.instanceOf(Object).isRequired,
  loadGuiaDetail: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  guia: state.guiasReducer.guias,
  guiasError: state.guiasReducer.fetchError,
});

export default connect(mapStateToProps, {
  loadGuiaDetail,
})(withStyles(styles)(GuiaDetail));
