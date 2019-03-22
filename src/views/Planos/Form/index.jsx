import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  Grid,
  Divider,
  TextField,
} from '@material-ui/core';

import {
  addPlano, loadPlanoDetail,
  updatePlano,
} from '../../../actions/planos';
import Breadcrumb from '../../../components/Breadcrumb';
import Message from '../../../components/Message';

const styles = theme => ({
  divider: {
    ...theme.divider,
    marginBottom: theme.spacing.unit * 1.2,
  },
  form: {
    marginTop: theme.spacing.unit * 2,
  },
  addBtn: {
    ...theme.roundedBtn,
    marginLeft: '1.5rem',
    '&.footerBtn': {
      marginLeft: 0,
      marginTop: theme.spacing.unit * 5,
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0',
      marginTop: '0.5rem',
      width: '100%',
    },
  },
});

class PlanoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      breadcrumb: [
        { label: 'Planos', url: '/planos' },
        { label: 'Cadastrar', url: '/planos/criar' },
      ],
      sendPlano: {
        Status: 1,
        NomeFantasia: String(),
        RazaoSocial: String(),
        CNPJ: String(),
        ListaProcedimentos: [],
      },
      boxMessage: {
        open: false,
        text: '',
      },
    };

    this.onHandleAdd = this.onHandleAdd.bind(this);
    this.onHandleTarget = this.onHandleTarget.bind(this);
    this.onHandlePageLoad = this.onHandlePageLoad.bind(this);
    this.onHandleMessage = this.onHandleMessage.bind(this);
    this.onHandleOnClose = this.onHandleOnClose.bind(this);
  }

  componentDidMount() {
    this.onHandlePageLoad();
    this.onHandleMessage();
  }

  componentDidUpdate(prevProps) {
    const { plano } = this.props;

    if (prevProps.plano !== plano) {
      this.onHandleSendPlano(plano);
    }
  }

  onHandleMessage(text) {
    if (typeof text !== 'undefined') {
      this.setState({ boxMessage: { open: true, text } });
    }
  }

  onHandleOnClose() {
    const { boxMessage } = this.state;
    const { text } = boxMessage;

    this.setState({
      boxMessage: { open: false, text },
    });
  }

  onHandleSendPlano(plano) {
    this.setState({
      sendPlano: plano,
    });
  }

  onHandlePageLoad() {
    const {
      match,
      loadPlanoDetail: propLoadPlanoDetail,
    } = this.props;

    if (match.params.id) {
      propLoadPlanoDetail(match.params.id);

      this.setState({
        editing: true,
      });
    }
  }

  onHandleTarget({ value, name }) {
    const { sendPlano } = this.state;

    this.setState({
      sendPlano: {
        ...sendPlano,
        [name]: value,
      },
    });
  }

  async onHandleAdd() {
    const {
      addPlano: propAddPlano,
      updatePlano: propUpdatePlano, history,
    } = this.props;
    const { sendPlano, editing } = this.state;
    const PublicID = uuidv1();

    if (editing) {
      await propUpdatePlano({
        ...sendPlano,
      }, sendPlano.id);
      this.onHandleMessage('Plano modificado.');
    } else {
      await propAddPlano({
        ...sendPlano,
        id: PublicID,
        PublicID,
      });

      this.setState({ editing: true });
      this.onHandleMessage('Plano adicionado.');
      history.push(`/planos/${PublicID}`);
    }
  }

  render() {
    const { classes } = this.props;
    const {
      sendPlano, breadcrumb,
      editing, boxMessage,
    } = this.state;

    return (
      <Fragment>
        <Message
          text={boxMessage.text}
          open={boxMessage.open}
          onHandleOnClose={this.onHandleOnClose}
        />
        <Grid container alignItems="center">
          <Typography variant="h6" color="inherit" noWrap>
            {editing ? 'Editar' : 'Cadastrar'}
            {' '}
            plano
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            className={classes.addBtn}
            onClick={this.onHandleAdd}
          >
            Salvar
          </Button>
        </Grid>

        <Divider className={classes.divider} />

        <Breadcrumb breadcrumb={breadcrumb} />

        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={16}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="CNPJ"
                name="CNPJ"
                value={sendPlano.CNPJ}
                onChange={e => (
                  this.onHandleTarget(e.target)
                )}
                helperText="Digite o CNPJ"
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing={16}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Nome do plano"
                name="NomeFantasia"
                value={sendPlano.NomeFantasia}
                onChange={e => (
                  this.onHandleTarget(e.target)
                )}
                helperText="Digite o nome do plano."
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            color="primary"
            size="medium"
            className={`${classes.addBtn} footerBtn`}
            onClick={this.onHandleAdd}
          >
            Salvar
          </Button>
        </form>
      </Fragment>
    );
  }
}

PlanoForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  plano: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object).isRequired,
  addPlano: PropTypes.func.isRequired,
  updatePlano: PropTypes.func.isRequired,
  loadPlanoDetail: PropTypes.func.isRequired,
};

PlanoForm.defaultProps = {
  plano: {},
};

const mapStateToProps = state => ({
  plano: state.planosReducer.plano,
});

export default connect(mapStateToProps, {
  addPlano, loadPlanoDetail, updatePlano,
})(withStyles(styles)(PlanoForm));
