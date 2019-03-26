const messages = {
  saved: 'Your data has been saved successfully!',
  updated: 'Your data has been updated successfully!',
  deleted: 'Your data has been deleted successfully!',
  error: 'Something went wrong! Please try again.',
};

export function loginSubmit(login, password) {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = await getFirebase();

		return await firebase.auth().signInWithEmailAndPassword(login, password)
			.then(() => {
				return {
					type: 'success',
					message: ''
				};
			}).catch((err) => {
				return {
					type: 'error',
					message: err.message
				};
			});
	};
}

export function logout() {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = await getFirebase();

		firebase.auth().signOut().then(() => {
			dispatch({ type: 'LOGOUT' });
		});
	};
}

export function signup({name, email, password}) {
	return async (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = await getFirebase();
		const firestore = getFirestore();

		return await firebase.auth().createUserWithEmailAndPassword(email, password).then(async (res) => {
      return await firestore.collection('users').doc(res.user.uid).set({
				name,
				email
			});
		}).then(() => {
			return {
				type: 'success',
				message: messages.saved
			};
		}).catch((err) => {
			return {
				type: 'error',
				message: err
			};
		});
	};
}
