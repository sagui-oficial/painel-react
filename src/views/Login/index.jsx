import React, { useState } from 'react';
import {
  Divider,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  ListItemText,
  IconButton,
  Snackbar,
  TextField,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import connectDB from '../../utils/firestore';

const database = connectDB.firestore();
const GET_PATIENTS = database.collection('patientes');

const Login = () => {
  const defaultValues = { patiente: '', age: '' };
  const defaultMsg = { open: false, text: 'Error try again.' };
  const [values, setValues] = useState(defaultValues);
  const [allData, setAllData] = useState([]);
  const [msg, setMsg] = useState(defaultMsg);

  const handleOnClose = () => {
    setMsg(defaultMsg);
  };

  const updateInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const getData = () => {
    const wholeData = [];

    GET_PATIENTS
      .orderBy('patiente', 'asc')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          wholeData.push({ ...doc.data(), id: doc.id });
        });
        setAllData(wholeData);
      })
      .catch((error) => {
        const message = { error: `Error ${error}` };
        throw message;
      });
  };

  const addData = (e) => {
    e.preventDefault();

    if (values.patiente && values.age) {
      GET_PATIENTS.add({
        ...values,
        createdAt: new Date(),
      });
      setValues({ ...defaultValues });
      getData();
    }
  };

  const deleteData = (id) => {
    GET_PATIENTS.doc(id).delete().then(() => {
      setMsg({ open: true, text: 'Documento removido!' });
      getData();
    }).catch((error) => {
      const message = { error: `Error ${error}` };
      setMsg({ open: true, text: 'Erro ao tentar remover!' });
      throw message;
    });
  };

  const listOfData = allData.map((val) => {
    const { patiente, age, id } = val;

    return (
      <ListItem key={id}>
        <ListItemAvatar>
          <Avatar aria-label={patiente}>
            {patiente.substring(0, 1).toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={patiente}
          secondary={age}
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => deleteData(id)}
            aria-label="Deletar"
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });

  return (
    <div>
      <Snackbar
        open={msg.open}
        message={<span id="message-id">{msg.text}</span>}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleOnClose}
        onExited={handleOnClose}
        ContentProps={{ 'aria-describedby': 'message-id' }}
      />

      <Typography variant="h6" color="inherit">
        Login
      </Typography>
      <Divider />

      <form onSubmit={addData} noValidate autoComplete="off">
        <TextField
          type="text"
          label="Nome"
          name="patiente"
          margin="normal"
          onChange={e => updateInput(e)}
          value={values.patiente}
        />
        <br />
        <TextField
          type="number"
          label="Idade"
          name="age"
          margin="normal"
          onChange={e => updateInput(e)}
          value={values.age}
        />
        <br />
        <br />
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          type="submit"
        >
          Enviar
        </Button>
      </form>
      <br />
      <List>{listOfData}</List>
    </div>
  );
};

export default Login;
