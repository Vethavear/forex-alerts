import authManager from '../../app.js';

let Signup = {
  render: async () => {
    let view = /*html*/ `
    <div class="authContainer">
    <div class="row">
    <h2> Contact Veth or Dzordz to sing up! </h2>
    </div>
    <div class="row">
    <button><a href="#/login">Sign in if you have account</a></button>
      </div>
  </div>
        `;
    return view;
  },

  after_render: async () => {
  }

}

export default Signup;
