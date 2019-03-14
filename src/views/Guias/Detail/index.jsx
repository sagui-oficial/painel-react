import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';

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
    this.handleUpdateStateGuia = this.handleUpdateStateGuia.bind(this);
  }

  componentDidMount() {
    this.loadGuia();
  }

  componentDidUpdate(prevProps) {
    this.handleUpdateStateGuia(prevProps);
  }

  handleUpdateStateGuia(prevProps) {
    const { loadGuiaData } = this.props;

    if (prevProps.loadGuiaData !== loadGuiaData) {
      this.setState({ loadGuiaLocal: loadGuiaData });
    }
  }

  async loadGuia() {
    const { loadGuiaData, loadGuiaDetail: loadGuiaFunc, match } = this.props;

    if (loadGuiaData.length === 0) {
      await loadGuiaFunc(match.params.Id);
    } else {
      this.setState({ loadGuiaLocal: loadGuiaData.find(item => item.Id === match.params.Id) });
    }
  }

  render() {
    const { classes } = this.props;
    const { loadGuiaLocal } = this.state;

    return (
      <div>
        {loadGuiaLocal && (
          <div className={classes.box}>
            {loadGuiaLocal.PublicID && (<p>{loadGuiaLocal.PublicID}</p>)}
            {loadGuiaLocal.Paciente && (
              <Fragment>
                <p>{loadGuiaLocal.Paciente.Nome && loadGuiaLocal.Paciente.Nome}</p>
                <p>{loadGuiaLocal.Paciente.CPF && loadGuiaLocal.Paciente.CPF}</p>
                <p>{loadGuiaLocal.Paciente.Email && loadGuiaLocal.Paciente.Email}</p>
                <p>{loadGuiaLocal.Paciente.Telefone && loadGuiaLocal.Paciente.Telefone}</p>
              </Fragment>
            )}

            {loadGuiaLocal.Vencimento && (<p>{loadGuiaLocal.Vencimento}</p>)}

            {
              typeof loadGuiaLocal.Status !== 'undefined' && (
                <p>
                  {loadGuiaLocal.Status === 1 && ('Criada')}
                  {loadGuiaLocal.Status === 2 && ('Concluida')}
                  {loadGuiaLocal.Status === 99 && ('Deletada')}
                </p>
              )
            }

            {
              loadGuiaLocal.procedimentos
              && loadGuiaLocal.procedimentos.length > 0
              && loadGuiaLocal.procedimentos.map(item => (
                <p key={item.PublicID}>{formatCurrency(item.valorprocedimento)}</p>
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
