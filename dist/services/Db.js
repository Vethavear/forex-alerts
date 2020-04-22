import authManager from "../app.js";
import Pairs from "../views/components/Pairs.js";

class Db {
  firebaseConfig = {
    apiKey: "AIzaSyBxVp8ahKiNFnEFTN7y8NUvMxw4j-iVihU",
    authDomain: "envoy-journal.firebaseapp.com",
    databaseURL: "https://envoy-journal.firebaseio.com",
    projectId: "envoy-journal",
    storageBucket: "envoy-journal.appspot.com",
    messagingSenderId: "848247662625",
    appId: "1:848247662625:web:00ee4b9afb3dcbedb11b60",
    measurementId: "G-32L1PFTM63",
  };

  constructor() {
    firebase.initializeApp(this.firebaseConfig);
    firebase.analytics();
  }

  async addTrade(trade) {
    await firebase
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
        alert("Error with saving to database. Try again later.");
        console.error("Error writing document: ", error);
      });
    await firebase
      .firestore()
      .collection("alltrades")
      .doc()
      .set(Object.assign({}, trade))
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        alert("Error with saving to database. Try again later.");
        console.error("Error writing document: ", error);
      });
  }

  async getAllTrades() {
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
  }

  async getGlobalTrades() {
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
  }

  getPairTrades(pair) { }
  getTrade(pair, id) { }

  removeTrade(trade) { }
  modifyTrade(trade) { }
  getPairTrades(pair) { }
  getTrade(pair, id) { }

  addPair(pair) {
    // adding for specific user

    firebase
      .firestore()
      .collection("users")
      .doc(`${authManager.uid}`)
      .set({ pairs: ["GBPUSD", "EURUSD"] })
      .then(function () {
        console.log("Pair added!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    // all to all trades
  }
  removePair(pair) { }
  getPairs() {
    firebase
      .firestore()
      .collection("users")
      .doc(`${authManager.uid}`)
      .collection("pairs")
      .get()
      .then(function (pairs) {
        this.pairs = pairs;
        // querySnapshot.forEach(function (doc) {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data());
        // });
      });
  }
}

export default Db;
