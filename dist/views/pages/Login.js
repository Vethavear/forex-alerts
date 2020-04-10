import authManager from '../../app.js';

let Login = {
  render: async () => {
    let view = /*html*/ `
    <div class="authContainer">

    <div class="row">
      <label for="email">E-mail</label>
      <input type="email" name="email" id="email">
    </div>
    <div class="row">
      <label for="password">Password</label>
      <input type="password" name="password" id="password">
    </div>
    <div class="row">
  <button id="loginBtn">Sign in</button>
    </div>
    <div class="row">
  <button><a href="#/signup">Or Sign Up</a></button>
    </div>
  
  
  </div>
        `;
    return view;
  },

  after_render: async () => {
    document.getElementById('loginBtn').addEventListener('click', authManager.signin)
  }

}

export default Login;
