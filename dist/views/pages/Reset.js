import authManager from '../../app.js';

let Login = {
  render: async () => {
    let view = /*html*/ `
    <div class="authContainer">
    <div class="row">
      <label for="email">E-mail</label>
      <input type="email" name="email" id="resetEmail">
    </div>
    <div class="row">
  <button id="resetBtn">Reset password</button>
    </div>
  </div>
        `;
    return view;
  },

  after_render: async () => {
    document.getElementById('resetBtn').addEventListener('click', authManager.resetPassword)
  }

}

export default Login;
