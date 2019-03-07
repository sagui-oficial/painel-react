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

    this.loadGuia = this.loadGuia.bind(this);
    this.updateGuia = this.updateGuia.bind(this);
  }

  componentDidMount() {
    this.loadGuia();
  }

  componentDidUpdate(prevProps) {
    this.updateGuia(prevProps);
  }

  updateGuia(prevProps) {
    const { loadGuiaData } = this.props;

    if (prevProps.loadGuiaData !== loadGuiaData) {
      this.setState({ loadGuiaLocal: loadGuiaData });
    }
  }

  async loadGuia() {
    const { loadGuiaData, loadGuiaDetail: loadGuiaFunc, match } = this.props;

    if (loadGuiaData.length === 0) {
      await loadGuiaFunc(match.params.id);
    } else {
      this.setState({ loadGuiaLocal: loadGuiaData.find(item => item.id === match.params.id) });
    }
  }

  render() {
    const { classes } = this.props;
    const { loadGuiaLocal } = this.state;

    return (
      <div>
        {loadGuiaLocal && (
          <div className={classes.box}>
            {loadGuiaLocal.publicID && (<p>{loadGuiaLocal.publicID}</p>)}
            {loadGuiaLocal.paciente && (
              <Fragment>
                <p>{loadGuiaLocal.paciente.nome && loadGuiaLocal.paciente.nome}</p>
                <p>{loadGuiaLocal.paciente.cpf && loadGuiaLocal.paciente.cpf}</p>
                <p>{loadGuiaLocal.paciente.email && loadGuiaLocal.paciente.email}</p>
                <p>{loadGuiaLocal.paciente.telefone && loadGuiaLocal.paciente.telefone}</p>
              </Fragment>
            )}

            {loadGuiaLocal.vencimento && (<p>{loadGuiaLocal.vencimento}</p>)}

            {
              typeof loadGuiaLocal.status !== 'undefined' && (
                <p>
                  {loadGuiaLocal.status === 1 ? (
                    <span>Ativo</span>
                  ) : (
                    <span>Removido</span>
                  )}
                </p>
              )
            }

            {
              loadGuiaLocal.procedimentos
              && loadGuiaLocal.procedimentos.length > 0
              && loadGuiaLocal.procedimentos.map(item => (
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
  classes: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  loadGuiaData: PropTypes.instanceOf(Object).isRequired,
  loadGuiaDetail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loadGuiaData: state.guiasReducer.guias,
  guiasError: state.guiasReducer.fetchError,
});

export default connect(mapStateToProps, {
  loadGuiaDetail,
})(withStyles(styles)(GuiaDetail));
