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

    this.loadGuia = this.loadGuia.bind(this);
  }

  componentDidMount() {
    this.loadGuia();
  }

  async loadGuia() {
    const { loadGuiaDetail: loadGuiaFunc, match } = this.props;
    await loadGuiaFunc(match.params.Id);
  }

  render() {
    const { classes, loadGuiaData } = this.props;

    return (
      <div>
        {loadGuiaData && (
          <div className={classes.box}>
            {loadGuiaData.PublicID && (<p>{loadGuiaData.PublicID}</p>)}
            {loadGuiaData.Paciente && (
              <Fragment>
                <p>{loadGuiaData.Paciente.Nome && loadGuiaData.Paciente.Nome}</p>
                <p>{loadGuiaData.Paciente.CPF && loadGuiaData.Paciente.CPF}</p>
                <p>{loadGuiaData.Paciente.Email && loadGuiaData.Paciente.Email}</p>
                <p>{loadGuiaData.Paciente.Telefone && loadGuiaData.Paciente.Telefone}</p>
              </Fragment>
            )}

            {loadGuiaData.Vencimento && (<p>{loadGuiaData.Vencimento}</p>)}

            {
              typeof loadGuiaData.Status !== 'undefined' && (
                <p>
                  {loadGuiaData.Status === 1 && ('Criada')}
                  {loadGuiaData.Status === 2 && ('Concluida')}
                  {loadGuiaData.Status === 99 && ('Deletada')}
                </p>
              )
            }

            {
              loadGuiaData.procedimentos
              && loadGuiaData.procedimentos.length > 0
              && loadGuiaData.procedimentos.map(item => (
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
