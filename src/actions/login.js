export function loginSubmit(login, password) {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = await getFirebase();

    return firebase.auth().signInWithEmailAndPassword(login, password)
      .then(() => ({
        type: 'success',
        message: '',
      })).catch(() => ({
        type: 'error',
        message: 'Tente novamente.',
      }));
  };
}

export function logout() {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = await getFirebase();

    firebase.logout();
    firebase.auth().signOut().then(() => {
      dispatch({ type: 'LOGOUT' });
    });
  };
}

export function signup({ name, email, password }) {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = await getFirebase();
    const firestore = getFirestore();

    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => firestore.collection('users').doc(res.user.uid).set({
        name,
        email,
      })).then(() => ({
        type: 'success',
        message: 'Usuário adicionado!',
      }))
      .catch(err => ({
        type: 'error',
        message: err,
      }));
  };
}
