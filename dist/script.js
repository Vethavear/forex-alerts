const StorageCtrl = (function() {
  return {
    getAlerts: function() {
      let alerts;
      if (localStorage.getItem("alerts") == null) {
        alerts = {
          eurusd: [],
          eurgbp: [],
          usdjpy: [],
          audusd: [],
          usdchf: [],
          usdcad: [],
          gbpusd: []
        };
      } else {
        alerts = JSON.parse(localStorage.getItem("alerts"));
      }
      return alerts;
    },
    updateStorage: function(data) {
      localStorage.setItem("alerts", JSON.stringify(data));
    }
  };
})();

const PairCtrl = (function(StorageCtrl) {
  const alerts = StorageCtrl.getAlerts();

  return {
    getAlerts: function() {
      return alerts;
    },
    addAlert: function(pair, price) {
      const date = new Date();
      const alert = {
        id: Date.now() + Math.random(),
        price: parseFloat(price),
        date: `${date.getFullYear()}-${("0" + date.getMonth()).slice(-2)}-${(
          "0" + date.getDate()
        ).slice(-2)}`
      };
      alerts[pair.toLowerCase()].push(alert);
      StorageCtrl.updateStorage(alerts);
      return alert;
    },
    getPricesFromApi: async function(pairs) {
      try {
        const respone = await fetch(
          `https://cors-anywhere.herokuapp.com/https://www.freeforexapi.com/api/live?pairs=${pairs}`
        );
        const json = await respone.json();
        const prices = json.rates;
        return prices;
      } catch (err) {
        console.log("Error getting prices", err);
      }
    },
    removeAlert: function(pair, alertId) {
      const index = alerts[pair].findIndex(el => el.id == alertId);
      alerts[pair].splice(index, 1);
      StorageCtrl.updateStorage(alerts);
    }
  };
})(StorageCtrl);

const UICtrl = (function() {
  const selectors = {
    pairContainer: document.querySelector("#pairpicker .pairsmenu"),
    alertsContainer: document.querySelector(".alerts .table .container"),
    inputField: document.getElementById("inputprice"),
    addBtn: document.getElementById("add"),
    currentPair: document.getElementById("currentpair")
  };

  return {
    getSelectors: function() {
      return selectors;
    },

    displayAlert: function(alert) {
      const markup = `
        <div class="row" id =${alert.id}>
          <p>${alert.price}</p>
          <p>${alert.date}</p>
          <button class="delete"><i class="fas fa-times-circle"></i></button>
        </div>
    `;
      selectors.alertsContainer.insertAdjacentHTML("beforeend", markup);
    },
    removeAlert: function(id) {
      document.getElementById(id).remove();
    },
    changePair: function(pair) {
      selectors.currentPair.innerHTML = pair.toUpperCase();
    }
  };
})();

const AppCtrl = (function(PairCtrl, UICtrl) {
  const alerts = PairCtrl.getAlerts();
  const selectors = UICtrl.getSelectors();

  function addAlerts() {
    const pair = selectors.currentPair.textContent.toLowerCase();
    selectors.alertsContainer.innerHTML = "";
    alerts[pair].forEach(UICtrl.displayAlert);
  }

  return {
    init: async function() {
      addAlerts();

      // Remove Alert
      selectors.alertsContainer.addEventListener("click", function(e) {
        const target = e.target;
        if (target.tagName != "I") {
          return;
        }
        const alertId = target.closest(".row").id;
        UICtrl.removeAlert(alertId);
        const pair = selectors.currentPair.innerHTML.toLowerCase();
        PairCtrl.removeAlert(pair, alertId);
      });

      // Add Alert
      selectors.addBtn.addEventListener("click", function() {
        const price = selectors.inputField.value;
        const pair = selectors.currentPair.textContent;
        if (price > 0) {
          const alert = PairCtrl.addAlert(pair, parseFloat(price));
          UICtrl.displayAlert(alert);
          selectors.inputField.value = "";
        }
      });

      // Change Pair
      selectors.pairContainer.addEventListener("click", function(e) {
        const target = e.target;

        if (!target.matches(".changepair")) {
          return;
        }
        const pair = target.innerHTML.replace("/", "");
        UICtrl.changePair(pair);
        addAlerts();
      });
      let prices;
      // Get prices from API
      // EURGBP,USDJPY,EURUSD, GBPUSD, AUDUSD, USDCHF, USDCAD
      setInterval(async () => {
        let pairs = "";
        for (key in alerts) {
          if (alerts[key].length > 0) {
            pairs += `${key.toUpperCase()},`;
          }
        }
        if (pairs.length > 0) {
          prices = await PairCtrl.getPricesFromApi(pairs);
        } else {
          return;
        }
        if (prices) {
          for (pair in prices) {
            alerts[pair.toLowerCase()].forEach(el => {
              if (prices[pair].rate >= el.price) {
                const alertId = alerts[pair.toLowerCase()].findIndex(
                  p => p.id == el.id
                );
                PairCtrl.removeAlert(pair, alertId);
                UICtrl.removeAlert(el.id);
                alert(`${pair} price on liq`);
              }
            });
          }
        }
      }, 60000);
    }
  };
})(PairCtrl, UICtrl);

AppCtrl.init();
