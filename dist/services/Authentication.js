class Auth {




    constructor() {

        document.getElementById('signout').addEventListener('click', this.signout);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                document.getElementById('signout').classList.remove('hide');
                this.logged = true;
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
                document.getElementById('signout').classList.add('hide');
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
                            this.adjustDisplayName(user);
                            document.getElementById('signout').classList.remove('hide');
                            // User is signed in.
                            resolve(user)
                        } else {
                            this.adjustDisplayName(user);
                            document.getElementById('signout').classList.add('hide');
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

    adjustDisplayName(user) {

        if(user){

            this.displayName = user.email.split('@').shift();
            this.displayName = this.displayName.charAt(0).toUpperCase() + this.displayName.slice(1);
            document.getElementById('username').innerHTML = `<p>Welcome ${this.displayName}</p>`;
        }
        }
    signin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
            location.reload();

        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

    }

    signup() {

        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(result => {
            location.reload();
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        })
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
        document.getElementById('signout').classList.add('hide');
        location.reload();
        firebase.auth().signOut();
    }

}

export default Auth;