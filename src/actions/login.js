const messages = {
  saved: 'Your data has been saved successfully!',
  updated: 'Your data has been updated successfully!',
  deleted: 'Your data has been deleted successfully!',
  error: 'Something went wrong! Please try again.',
};

export function loginSubmit(login, password) {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = await getFirebase();

    return firebase.auth().signInWithEmailAndPassword(login, password)
      .then(() => ({ type: 'success', message: '' }))
      .catch(err => ({ type: 'error', message: err.message }));
  };
}

export function logout() {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = await getFirebase();
    firebase.auth().signOut().then(() => dispatch({ type: 'LOGOUT' }));
  };
}

export function signup({ name, email, password }) {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = await getFirebase();
    const firestore = getFirestore();

    return firebase.auth().createUserWithEmailAndPassword(email, password).then(
      async res => firestore.collection('users').doc(res.user.uid).set({ name, email }),
    )
      .then(() => ({ type: 'success', message: messages.saved }))
      .catch(() => ({ type: 'error', message: messages.error }));
  };
}
