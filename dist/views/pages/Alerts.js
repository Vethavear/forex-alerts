let Alerts = {
    render: async () => {
        let view =  /*html*/`
      

        <section id="pairpicker">
        <div class="pairsmenu">
          <ul>
            <h2 class="p1 center">Pairs</h4>
              <li class="p1">
                <button class="changepair">EUR/USD</button>
              </li>
              <li class="p1">
                <button class="changepair">EUR/GBP</button>
              </li>
              <li class="p1">
                <button class="changepair">GBP/USD</button>
              </li>
              <li class="p1">
                <button class="changepair">USD/JPY</button>
              </li>
              <li class="p1">
                <button class="changepair">AUD/USD</button>
              </li>
              <li class="p1">
                <button class="changepair">USD/CHF</button>
              </li>
              <li class="p1">
                <button class="changepair">USD/CAD</button>
              </li>
          </ul>
        </div>
    
        <div class="alerts">
          <h1 id="currentpair" class="my-1">GBPUSD</h1>
          <div class="addalert my-1">
            <input type="text" name="inputprice" id="inputprice" placeholder="1.2303">
            <button id="add">Add</button>
          </div>
          <div class="radio-container">
            <label for="short">Short</label>
            <input type="radio" name="direction" id="short" value="short">
            <label for="long">Long</label>
            <input type="radio" name="direction" id="long" value="long">
          </div>
    
          <div class="table">
            <div class="row">
              <h3>Price</h3>
              <h3>Time</h3>
              <h3>Delete</h3>
            </div>
            <div class="container">
              <!-- <div class="row">
              <p>2000</p>
              <p>10:23</p>
              <button id="delete"><i class="fas fa-times-circle"></i></button>
            </div>
            <div class="row">
              <p>2000</p>
              <p>10:23</p>
              <button id="delete"><i class="fas fa-times-circle"></i></button>
            </div> -->
            </div>
          </div>
        </div>
        <div class="alertsfired">
          <h2 class="p1 center">Recently fired alerts</h4>
            <div class="labels">
              <h3>Pair</h3>
              <h3>Price</h3>
              <h3>Time</h3>
            </div>
            <ul>
            </ul>
        </div>
      </section>
        `
        return view
    },

    after_render: async () => {
        const StorageCtrl = (function () {
            return {
                getAlerts: function () {
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
                updateStorage: function (data) {
                    localStorage.setItem("alerts", JSON.stringify(data));
                }
            };
        })();

        const PairCtrl = (function (StorageCtrl) {
            const alerts = StorageCtrl.getAlerts();

            return {
                getAlerts: function () {
                    return alerts;
                },
                addAlert: function (pair, price, direction) {
                    const date = new Date();
                    const alert = {
                        id: Date.now() + Math.random(),
                        price: parseFloat(price),
                        date: `${date.getFullYear()}-${("0" + date.getMonth() + 1).slice(-2)}-${(
                            "0" + date.getDate()
                        ).slice(-2)}`,
                        direction: direction
                    };
                    alerts[pair.toLowerCase()].push(alert);
                    StorageCtrl.updateStorage(alerts);
                    return alert;
                },
                getPricesFromApi: async function (pairs) {
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
                removeAlert: function (pair, alertId) {
                    const index = alerts[pair].findIndex(el => el.id == alertId);
                    alerts[pair].splice(index, 1);
                    StorageCtrl.updateStorage(alerts);
                }
            };
        })(StorageCtrl);

        const UICtrl = (function () {
            const selectors = {
                pairContainer: document.querySelector("#pairpicker .pairsmenu"),
                alertsContainer: document.querySelector(".alerts .table .container"),
                inputField: document.getElementById("inputprice"),
                addBtn: document.getElementById("add"),
                currentPair: document.getElementById("currentpair"),
                firedAlertsContainer: document.querySelector(".alertsfired ul")
            };

            return {
                getSelectors: function () {
                    return selectors;
                },

                displayAlert: function (alert) {
                    const markup = `
                  <div class="row" id =${alert.id}>
                    <p>${alert.price}</p>
                    <p>${alert.date}</p>
                    <button class="delete"><i class="fas fa-times-circle"></i></button>
                  </div>
              `;
                    selectors.alertsContainer.insertAdjacentHTML("beforeend", markup);
                },
                removeAlert: function (id) {
                    document.getElementById(id).remove();
                },
                addAlertToFiredAlerts: function (alert, pair) {
                    const today = new Date();
                    const date = today.getMonth() + 1 + "." + today.getDate();
                    const time = today.getHours() + ":" + today.getMinutes();
                    const dateTime = date + " " + time;
                    const markup = `
                <li>
                <p>${pair}</p>
                <p>${alert.price}</p>
                <p>${dateTime}</p>
                 </li>
              `;
                    selectors.firedAlertsContainer.insertAdjacentHTML("afterbegin", markup);
                },
                changePair: function (pair) {
                    selectors.currentPair.innerHTML = pair.toUpperCase();
                }
            };
        })();

        const AppCtrl = (function (PairCtrl, UICtrl) {
            const alerts = PairCtrl.getAlerts();
            const selectors = UICtrl.getSelectors();

            function addAlerts() {
                const pair = selectors.currentPair.textContent.toLowerCase();
                selectors.alertsContainer.innerHTML = "";
                alerts[pair].forEach(UICtrl.displayAlert);
            }
            function prepareAudio() {
                const audio = document.createElement("AUDIO");
                audio.src = "alertsound.mp3";
                audio.setAttribute("preload", "auto");
                audio.setAttribute("controls", "none");
                audio.style.display = "none";
                document.body.appendChild(audio);

                return {
                    play: function () {
                        audio.play();
                    },
                    stop: function () {
                        audio.pause();
                    }
                };
            }
            return {
                init: async function () {
                    addAlerts();
                    const audioCtrl = prepareAudio(); // Prepare alert audio

                    // Remove Alert
                    selectors.alertsContainer.addEventListener("click", function (e) {
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
                    selectors.addBtn.addEventListener("click", function () {
                        let direction;
                        try {
                            direction = document.querySelector("input[name=direction]:checked")
                                .value;
                        } catch {
                            alert("Pick direction");
                            return;
                        }
                        const price = selectors.inputField.value;
                        const pair = selectors.currentPair.textContent;
                        if (price > 0) {
                            const alert = PairCtrl.addAlert(pair, parseFloat(price), direction);
                            UICtrl.displayAlert(alert);
                            selectors.inputField.value = "";
                            console.log(alert);
                        }
                    });

                    // Change Pair
                    selectors.pairContainer.addEventListener("click", function (e) {
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
                                alerts[pair.toLowerCase()].forEach(alert => {
                                    const alertId = alerts[pair.toLowerCase()].findIndex(
                                        p => p.id == alert.id
                                    );
                                    if (
                                        prices[pair].rate >= alert.price &&
                                        alert.direction == "short"
                                    ) {
                                        PairCtrl.removeAlert(pair.toLowerCase(), alertId);
                                        UICtrl.addAlertToFiredAlerts(alert, pair);
                                        UICtrl.removeAlert(alert.id);
                                        audioCtrl.play();
                                        // alert(`${pair} price on liq`);
                                        // audioCtrl.stop();
                                    } else if (
                                        prices[pair].rate <= alert.price &&
                                        alert.direction == "long"
                                    ) {
                                        PairCtrl.removeAlert(pair.toLowerCase(), alertId);
                                        UICtrl.addAlertToFiredAlerts(alert, pair);
                                        UICtrl.removeAlert(alert.id);
                                        audioCtrl.play();
                                    }
                                });
                            }
                        }
                        console.log('pobrano ' + Date.now());
                    }, 300000);
                }
            };
        })(PairCtrl, UICtrl);

        AppCtrl.init();
    }
}

export default Alerts;