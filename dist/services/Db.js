import authManager from "../app.js";

const Db = {
  firebaseConfig: {
    apiKey: "AIzaSyBxVp8ahKiNFnEFTN7y8NUvMxw4j-iVihU",
    authDomain: "envoy-journal.firebaseapp.com",
    databaseURL: "https://envoy-journal.firebaseio.com",
    projectId: "envoy-journal",
    storageBucket: "envoy-journal.appspot.com",
    messagingSenderId: "848247662625",
    appId: "1:848247662625:web:00ee4b9afb3dcbedb11b60",
    measurementId: "G-32L1PFTM63",
  },

  init: function () {
    firebase.initializeApp(this.firebaseConfig);

    firebase.analytics();
  },
  addTrade: function (trade) {
    firebase
      .firestore()
      .collection("users")
      .doc(`${authManager.uid}`)
      .collection("trades")
      .doc()
      .set(Object.assign({}, trade))
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  },
  removeTrade: function (trade) {},
  modifyTrade: function (trade) {},
  getAllTrades: async function () {
    let docs = [];
    await firebase
      .firestore()
      .collection("users")
      .doc(`${authManager.uid}`)
      .collection("trades")
      .get()
      .then(function (snapshot) {
        console.log("Got the documents");
        snapshot.forEach((doc) => docs.push(doc.data()));
      })
      .catch(function (err) {
        console.error(`Error getting documents: ${err}`);
      });
    return docs;
  },
  getGlobalTrades: async function () {
    let docs = [];
    await firebase
      .firestore()
      .collection("alltrades")
      .get()
      .then(function (snapshot) {
        console.log("Got the documents");
        snapshot.forEach((doc) => docs.push(doc.data()));
      })
      .catch(function (err) {
        console.error(`Error getting documents: ${err}`);
      });
    return docs;
  },
  getPairTrades: function (pair) {},
  getTrade: function (pair, id) {},
};

export default Db;
