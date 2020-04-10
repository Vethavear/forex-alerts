import authManager from '../../app.js';

let Signup = {
  render: async () => {
    let view = /*html*/ `
    <div class="authContainer">
    <div class="row">
      <label for="email">E-mail</label>
      <input type="email" name="email" id="signupEmail">
    </div>
    <div class="row">
      <label for="password">Password</label>
      <input type="password" name="password" id="signupPassword">
    </div>
    <div class="row">
      <label for="password">Repeat password</label>
      <input type="password" name="password" id="signupPassword2">
    </div>
    <div class="row">
  <button id="signupBtn">Sign up</button>
    </div>
    <div class="row">
    <button><a href="#/signin">Or Sign In</a></button>
      </div>
  </div>
        `;
    return view;
  },

  after_render: async () => {
    document.getElementById('signupBtn').addEventListener('click', authManager.signup)
  }

}

export default Signup;
