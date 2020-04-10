class Auth {

    constructor() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('logged');
                // User is signed in.
                this.logged = true;
                this.displayName = user.displayName;
                this.email = user.email;
                this.emailVerified = user.emailVerified;
                this.photoURL = user.photoURL;
                this.isAnonymous = user.isAnonymous;
                this.uid = user.uid;
                this.providerData = user.providerData;
                // ...
            } else {
                // User is signed out.
                console.log('logged out');
                this.logged = false;
                // ...
            }
        });

    };
    async  IsLoggedIn() {
        try {
            await new Promise((resolve, reject) =>
                firebase.auth().onAuthStateChanged(
                    user => {
                        if (user) {
                            // User is signed in.
                            resolve(user)
                        } else {
                            // No user is signed in.
                            reject('no user logged in')
                        }
                    },
                    // Prevent console error
                    error => reject(error)
                )
            )
            return true
        } catch (error) {
            return false
        }
    }


    signin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
        document.location.href = '';

    }

    signup() {
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
        document.location.href = '';
    }
    resetPassword() {
        const email = document.getElementById('resetEmail').value;

        firebase.auth().sendPasswordResetEmail(email).then(function () {
            // Email sent.
        }).catch(function (error) {
            // An error happened.
        });
    }
    signout() {
        document.location.href = '';
        firebase.auth().signOut();
    }

}

export default Auth;