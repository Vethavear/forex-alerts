"use strict";

import { Alerts } from "./views/pages/Alerts.js";
import Login from "./views/pages/Login.js";
import Signup from "./views/pages/Signup.js";
import Reset from "./views/pages/Reset.js";
import Journal from "./views/pages/Journal.js";
import Db from "./services/Db.js";
import Auth from "./services/Authentication.js";
// import Error404 from './views/pages/Error404.js'
import Utils from "./services/Utils.js";



// List of supported routes. Any url other than these routes will throw a 404 error
const LoggedInroutes = {
  "/": Alerts,
  "/journal": Journal,
  // , '/p/:id': PostShow
  // , '/register': Register
};
// when logged out
const routes = {
  "/": Alerts,
  "/journal": Login,
  "/login": Login,
  "/signup": Signup,
  "/reset": Reset,
  // , '/p/:id': PostShow

};

// inits
Alerts.after_render();
export const dbManager = new Db();
export const authManager = new Auth();


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
  // Lazy load view element:
  const content = null || document.getElementById("pageContent");

  // Get the parsed URl from the addressbar
  let request = Utils.parseRequestURL();

  // Parse the URL and if it has an id part, change it with the string ":id"
  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? "/" + request.verb : "");

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  // CHECK CREDENTIALS:
  let page;
  console.log(await authManager.IsLoggedIn());
  if (await authManager.IsLoggedIn()) {
    page = LoggedInroutes[parsedURL] ? LoggedInroutes[parsedURL] : Error404;
  } else {
    page = routes[parsedURL] ? routes[parsedURL] : Error404;
  }
  // page = LoggedInroutes[parsedURL] ? LoggedInroutes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

// Listen on hash change:
window.addEventListener("hashchange", router);

// Listen on page load:
window.addEventListener("load", router);

document.getElementById('signout').addEventListener('click', authManager.signout);
export default authManager;
