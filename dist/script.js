// Chose pair

const PairCtrl = (function() {
  const alerts = {
    eurusd: [
      {
        id: "a4",
        price: 1.045,
        date: "2019-02-26 12:30"
      },
      {
        id: "a5",
        price: 1.07,
        date: "2019-02-26 15:30"
      }
    ],
    eurgbp: [],
    usdjpy: [
      {
        id: "a3",
        price: 109.4,
        date: "2019-02-26 17:30"
      },
      {
        id: "a2",
        price: 110.5,
        date: "2019-02-26 11:30"
      }
    ],
    audusd: [],
    usdchf: [],
    usdcad: [],
    gbpusd: [
      {
        id: "a2",
        price: 110.5,
        date: "2019-02-26 11:30"
      }
    ]
  };

  return {
    getAlerts: function() {
      return alerts;
    },

    addAlert: function(pair, price) {
      const date = new Date();
      const alert = {
        id: Date.now() + Math.random(),
        price: parseInt(price),
        date: `${date.getFullYear()}-${("0" + date.getMonth()).slice(-2)}-${(
          "0" + date.getDate()
        ).slice(-2)}`
      };
      alerts[pair.toLowerCase()].push(alert);

      return alert;
    }
  };
})();

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
    init: function() {
      addAlerts();

      selectors.alertsContainer.addEventListener("click", function(e) {
        const target = e.target;
        if (target.tagName != "I") {
          return;
        }
        const alertId = target.closest(".row").id;
        UICtrl.removeAlert(alertId);
        const pair = selectors.currentPair.innerHTML.toLowerCase();
        const index = alerts[pair].findIndex(el => el.id == alertId);
        alerts[pair].splice(index, 1);
      });

      // Add Alert
      selectors.addBtn.addEventListener("click", function() {
        const price = selectors.inputField.value;
        const pair = selectors.currentPair.textContent;
        if (price > 0) {
          const alert = PairCtrl.addAlert(pair, price);
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
    }
  };
})(PairCtrl, UICtrl);

AppCtrl.init();
