const StorageCtrl = (function () {

  //   // firestore
  //   return {
  //     getAlerts: function () {
  //       let alerts;
  //       if (localStorage.getItem("alerts") == null) {
  //         alerts = {
  //           eurusd: [],
  //           eurgbp: [],
  //           usdjpy: [],
  //           audusd: [],
  //           usdchf: [],
  //           usdcad: [],
  //           gbpusd: []
  //         };
  //       } else {
  //         alerts = JSON.parse(localStorage.getItem("alerts"));
  //       }
  //       return alerts;
  //     },
  //     updateStorage: function (data) {
  //       localStorage.setItem("alerts", JSON.stringify(data));
  //     }
  //   };
})();

const PairCtrl = (function (StorageCtrl) {
  //   const alerts = StorageCtrl.getAlerts();

  //   return {
  //     getAlerts: function () {
  //       return alerts;
  //     },
  //     addAlert: function (pair, price) {
  //       const date = new Date();
  //       const alert = {
  //         id: Date.now() + Math.random(),
  //         price: parseFloat(price),
  //         date: `${date.getFullYear()}-${("0" + date.getMonth()).slice(-2)}-${(
  //           "0" + date.getDate()
  //         ).slice(-2)}`
  //       };
  //       alerts[pair.toLowerCase()].push(alert);
  //       StorageCtrl.updateStorage(alerts);
  //       return alert;
  //     },
  //     getPricesFromApi: async function (pairs) {
  //       try {
  //         const respone = await fetch(
  //           `https://cors-anywhere.herokuapp.com/https://www.freeforexapi.com/api/live?pairs=${pairs}`
  //         );
  //         const json = await respone.json();
  //         const prices = json.rates;
  //         return prices;
  //       } catch (err) {
  //         console.log("Error getting prices", err);
  //       }
  //     },
  //     removeAlert: function (pair, alertId) {
  //       const index = alerts[pair].findIndex(el => el.id == alertId);
  //       alerts[pair].splice(index, 1);
  //       StorageCtrl.updateStorage(alerts);
  //     }
  //   };
})(StorageCtrl);

const UICtrl = (function () {
  const selectors = {
    pairContainer: document.querySelector("#pairpicker .pairsmenu"),
    alertsContainer: document.querySelector(".alerts .table .container"),
    inputField: document.getElementById("inputprice"),
    addBtn: document.getElementById("add"),
    currentPair: document.getElementById("currentpair"),
    firedAlertsContainer: document.querySelector(".alertsfired ul"),
    // Journal
    currentTradeR: document.getElementById('result'),
    dailytrades: document.getElementById('dailytrades'),
    weeklytrades: document.getElementById('weeklytrades'),
    gains: document.getElementById('R'),
    journalPairsContainer: document.querySelector('.pairsTabs ul'),
    journalCurrentPair: document.getElementById('pair'),
    // Adding trade radios etc
    journalRadios: document.querySelectorAll('.info'),
    setup: document.getElementById('setup'),
    fill: document.getElementById('fill'),
    continuation: document.getElementById('continuation'),
    raid: document.getElementById('raid'),
    basesContainer: document.getElementById('bases'),
    raidsContainer: document.getElementById('raids'),
    continuationStops: document.getElementById('continuationStops'),
    continuationEntries: document.getElementById('continuationEntries'),
    raidsStops: document.getElementById('raidsStops'),
    ifswingDiv: document.getElementById('ifswingDiv'),
    missedRInputContainer: document.getElementsByClassName('missedR').item(0),
    ifSwingStopWorked: document.getElementById('ifSwingYes'),
    ifSwingStopDidntWork: document.getElementById('ifSwingNo'),
    ifLTFDiv: document.getElementById('ifLTFDiv'),
    ifWicksDiv: document.getElementById('ifWicksDiv'),
    cuttedRStopDiv: document.getElementById('cuttedRStopDiv'),
    cuttedREntryCloseDiv: document.getElementById('cuttedREntryCloseDiv'),
    cuttedREntryMiddleDiv: document.getElementById('cuttedREntryMiddleDiv'),
    stopBasesYes: document.getElementById('stopBasesYes'),
    ifWicksCloseYes: document.getElementById('ifWicksCloseYes'),
    ifWicksMiddleYes: document.getElementById('ifWicksMiddleYes'),
    ifWickClosesNo: document.getElementById('ifWickClosesNo'),
    ifWicksMiddleNo: document.getElementById('ifWicksMiddleNo'),
    ifLTFStopWorked: document.getElementById('ifLTFYes'),
    ifLTFStopDidntWork: document.getElementById('ifLTFNo'),
    // timeframeRadio: document.getElementsByName('timeframe'),
    // setupRadio: document.getElementsByName('setup'),
    // basesRadio: document.getElementsByName('bases'),
    // visibleRadio: document.getElementsByName('visible'),
    // stopRadio: document.getElementsByName('stop'),
    // msbRadio: document.getElementsByName('msb'),
    // msbRadio: document.getElementsByName('msb'),


  };

  return {
    getSelectors: function () {
      return selectors;
    },

    // displayAlert: function (alert) {
    //   const markup = `
    //     <div class="row" id =${alert.id}>
    //       <p>${alert.price}</p>
    //       <p>${alert.date}</p>
    //       <button class="delete"><i class="fas fa-times-circle"></i></button>
    //     </div>
    // `;
    //   selectors.alertsContainer.insertAdjacentHTML("beforeend", markup);
    // },
    // removeAlert: function (id) {
    //   document.getElementById(id).remove();
    // },
    // addAlertToFiredAlerts: function (alert, pair) {

    //   const today = new Date();
    //   const date = today.getMonth() +1 +'.'+ today.getDate();
    //   const time = today.getHours() + ":" + today.getMinutes();
    //   const dateTime = date + ' ' + time;
    //   const markup = `
    //   <li>
    //   <p>${pair}</p>
    //   <p>${alert.price}</p>
    //   <p>${dateTime}</p>
    //    </li>
    // `;
    //   selectors.firedAlertsContainer.insertAdjacentHTML('afterbegin', markup);
    // },
    // changePair: function (pair) {
    //   selectors.currentPair.innerHTML = pair.toUpperCase();
    // }
    changeJournalPair: (pair, clickedTab) => {
      selectors.journalCurrentPair.innerHTML = pair.toUpperCase();
      const currentlyChecked = document.querySelector('.checked');
      currentlyChecked.classList.remove('checked');
      // add checked class to currently clicked class
      clickedTab.setAttribute('class', 'checked');
    },
    hideContainer: (container, hide) => {
      if (hide) {
        container.classList.add('hide')
      } else {
        container.classList.remove('hide');
      }
    }
  };
})();

const AppCtrl = (function (PairCtrl, UICtrl) {
  // const alerts = PairCtrl.getAlerts();
  const selectors = UICtrl.getSelectors();

  // function addAlerts() {
  //   const pair = selectors.currentPair.textContent.toLowerCase();
  //   selectors.alertsContainer.innerHTML = "";
  //   alerts[pair].forEach(UICtrl.displayAlert);
  // }
  // function prepareAudio() {
  //   const audio = document.createElement("AUDIO");
  //   audio.src = 'alertsound.mp3';
  //   audio.setAttribute("preload", "auto");
  //   audio.setAttribute("controls", "none");
  //   audio.style.display = "none";
  //   document.body.appendChild(audio);

  //   return {
  //     play: function () {
  //       audio.play();
  //     },
  //     stop: function () {
  //       audio.pause();
  //     }
  //   }
  // }
  return {
    init: async function () {
      // addAlerts();
      // const audioCtrl = prepareAudio();
      // // Prepare alert audio
      // // Remove Alert
      // selectors.alertsContainer.addEventListener("click", function (e) {
      //   const target = e.target;
      //   if (target.tagName != "I") {
      //     return;
      //   }
      //   const alertId = target.closest(".row").id;
      //   UICtrl.removeAlert(alertId);
      //   const pair = selectors.currentPair.innerHTML.toLowerCase();
      //   PairCtrl.removeAlert(pair, alertId);
      // });

      // // Add Alert
      // selectors.addBtn.addEventListener("click", function () {
      //   const price = selectors.inputField.value;
      //   const pair = selectors.currentPair.textContent;
      //   if (price > 0) {
      //     const alert = PairCtrl.addAlert(pair, parseFloat(price));
      //     UICtrl.displayAlert(alert);
      //     selectors.inputField.value = "";
      //   }
      // });

      // // Change Pair
      // selectors.pairContainer.addEventListener("click", function (e) {
      //   const target = e.target;

      //   if (!target.matches(".changepair")) {
      //     return;
      //   }
      //   const pair = target.innerHTML.replace("/", "");
      //   UICtrl.changePair(pair);
      //   addAlerts();
      // });

      // change Journal pair
      selectors.journalPairsContainer.addEventListener("click", (e) => {
        const target = e.target;
        console.log(target.parentElement.classList);
        if (target.matches('.change')) {
          const pair = target.innerHTML.replace("/", "");
          UICtrl.changeJournalPair(pair, target.parentElement);
        };
      });

      // expand additional info on certain conditions
      const currentTradeR = document.getElementById('result');

      currentTradeR.addEventListener('input', (e) => {

        UICtrl.hideContainer(selectors.setup, false);
        UICtrl.hideContainer(selectors.fill, true);

        // setup picker
        selectors.continuation.addEventListener('click', (e) => {
          // CONTINUATION SETUPS
          UICtrl.hideContainer(selectors.basesContainer, false);
          // If mistake
          selectors.raid.addEventListener('click', (e) => {
            UICtrl.hideContainer(selectors.basesContainer, true);
          });

          if (currentTradeR.value < 0) {
            // lose
            selectors.continuationStops.addEventListener('click', e => {
              if (e.target.matches('#stopBasesGamble') || (e.target.matches('#stopBasesLTF'))) {
                // stopped but used tighter stop, possibility of mistake
                UICtrl.hideContainer(selectors.ifswingDiv, false);
              } else {
                UICtrl.hideContainer(selectors.ifswingDiv, true);
              }
            })
          } else {
            // win, check if stop  and entry could be better

            // entries
            selectors.continuationEntries.addEventListener('click', e => {
              // entry at wick
              if (e.target.matches('#entryBasesWicks')) {
                UICtrl.hideContainer(selectors.ifWicksDiv, false);
                selectors.ifWicksCloseYes.addEventListener('click', e => {
                  UICtrl.hideContainer(selectors.cuttedREntryCloseDiv, false);
                });
                selectors.ifWickClosesNo.addEventListener('click', e => {
                  UICtrl.hideContainer(selectors.cuttedREntryCloseDiv, true);
                });
                selectors.ifWicksMiddleYes.addEventListener('click', e => {
                  UICtrl.hideContainer(selectors.cuttedREntryMiddleDiv, false);
                });
                selectors.ifWicksMiddleNo.addEventListener('click', e => {
                  UICtrl.hideContainer(selectors.cuttedREntryMiddleDiv, true);
                });

              } else {
                UICtrl.hideContainer(selectors.ifLTFDiv, true);
              }
            })

            // stops
            selectors.continuationStops.addEventListener('click', e => {
              // swing stop
              if (e.target.matches('#stopBasesYes')) {
                UICtrl.hideContainer(selectors.ifLTFDiv, false);
                selectors.ifLTFStopWorked.addEventListener('click', e => {
                  UICtrl.hideContainer(selectors.cuttedRStopDiv, false);
                });
                selectors.ifLTFStopDidntWork.addEventListener('click', e => {
                  UICtrl.hideContainer(selectors.cuttedRStopDiv, true);
                });

              } else {
                UICtrl.hideContainer(selectors.ifLTFDiv, true);
              }
            })
          }
        })
        selectors.raid.addEventListener('click', (e) => {
          // raids
          UICtrl.hideContainer(selectors.raidsContainer, false);
          // If mistake
          selectors.continuation.addEventListener('click', (e) => {
            UICtrl.hideContainer(selectors.raidsContainer, true);
          });
        })

        if (currentTradeR.value < 0) {
          // // if stopped, wait for swing stop data
          selectors.ifSwingStopWorked.addEventListener('click', (e) => {
            UICtrl.hideContainer(selectors.missedRInputContainer, false);
            // If mistake
            selectors.ifSwingStopDidntWork.addEventListener('click', (e) => {
              UICtrl.hideContainer(selectors.missedRInputContainer, true);
            });
          })
        } else {
          // positive R base case:
          selectors.ifSwingStopWorked.addEventListener('click', (e) => {
            UICtrl.hideContainer(selectors.missedRInputContainer, false);
          })
        }
      })
      // let prices;
      // // Get prices from API
      // // EURGBP,USDJPY,EURUSD, GBPUSD, AUDUSD, USDCHF, USDCAD
      // setInterval(async () => {
      //   let pairs = "";
      //   for (key in alerts) {
      //     if (alerts[key].length > 0) {
      //       pairs += `${key.toUpperCase()},`;
      //     }
      //   }
      //   if (pairs.length > 0) {
      //     prices = await PairCtrl.getPricesFromApi(pairs);
      //   } else {
      //     return;
      //   }
      //   if (prices) {
      //     for (pair in prices) {
      //       alerts[pair.toLowerCase()].forEach(alert => {
      //         if (prices[pair].rate >= alert.price) {
      //           const alertId = alerts[pair.toLowerCase()].findIndex(
      //             p => p.id == alert.id
      //           );
      //           PairCtrl.removeAlert(pair.toLowerCase(), alertId);
      //           UICtrl.addAlertToFiredAlerts(alert, pair);
      //           UICtrl.removeAlert(alert.id);
      //           audioCtrl.play();
      //           // alert(`${pair} price on liq`);
      //           // audioCtrl.stop();

      //         }
      //       });
      //     }
      //   }
      // }, 60000);
    }
  };
})(PairCtrl, UICtrl);

AppCtrl.init();
