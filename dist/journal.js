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
    addtrade: document.getElementById('addtrade'),
    date: document.getElementById('date'),
    currentTradeR: document.getElementById('result'),
    dailytrades: document.getElementById('dailytrades'),
    weeklytrades: document.getElementById('weeklytrades'),
    gains: document.getElementById('R'),
    journalPairsContainer: document.querySelector('.pairsTabs ul'),
    journalCurrentPair: document.getElementById('pair'),
    // Adding trade radios etc
    journalRadios: document.querySelectorAll('.info'),
    setup: document.getElementById('setup'),
    greedDiv: document.getElementById('greedDiv'),
    fill: document.getElementById('fill'),
    continuation: document.getElementById('continuation'),
    raid: document.getElementById('raid'),
    basesContainer: document.getElementById('bases'),
    raidsContainer: document.getElementById('raids'),
    continuationStops: document.getElementById('continuationStops'),
    continuationEntries: document.getElementById('continuationEntries'),
    raidsStops: document.getElementById('raidsStops'),
    raidsEntries: document.getElementById('raidsEntries'),
    ifswingDiv: document.getElementById('ifswingDiv'),
    ifSwingYes: document.getElementById('ifSwingYes'),
    missedR: document.getElementById('missedR'),
    ifSwingNo: document.getElementById('ifSwingNo'),
    ifLTFDiv: document.getElementById('ifLTFDiv'),
    ifWicksDiv: document.getElementById('ifWicksDiv'),
    cuttedRStopDiv: document.getElementById('cuttedRStopDiv'),
    // cuttedREntryCloseDiv: document.getElementById('cuttedREntryCloseDiv'),
    // cuttedREntryMiddleDiv: document.getElementById('cuttedREntryMiddleDiv'),
    // stopBasesYes: document.getElementById('stopBasesYes'),
    //profit:
    // // ifWicksCloseYes: document.getElementById('ifWicksCloseYes'),
    // // ifWicksMiddleYes: document.getElementById('ifWicksMiddleYes'),
    // // ifWickClosesNo: document.getElementById('ifWickClosesNo'),
    // // ifWicksMiddleNo: document.getElementById('ifWicksMiddleNo'),
    // ifLTFStopWorked: document.getElementById('ifLTFYes'),
    // ifLTFStopDidntWork: document.getElementById('ifLTFNo'),
    // loses
    entryRaids65: document.getElementById('entryRaids65'),
    entryRaids786: document.getElementById('entryRaids786'),
    entryRaids88: document.getElementById('entryRaids88'),
    tpn0236Raids: document.getElementById('tpn0236Raids'),
    ifn065TpDiv: document.getElementById('ifn065TpDiv'),
    tpn065Raids: document.getElementById('tpn065Raids'),
    ifn1TpDiv: document.getElementById('ifn1TpDiv'),
    tpn01Raids: document.getElementById('tpn01Raids'),
    ifn0236TpDiv: document.getElementById('ifn0236TpDiv'),
    ifn0236TpYes: document.getElementById('ifn0236TpYes'),
    ifn065TpYes: document.getElementById('ifn065TpYes'),
    entryRaidsYes: document.getElementById('entryRaidsYes'),
    ifFiboExtendedDiv: document.getElementById('ifFiboExtendedDiv'),
    if01Stop: document.getElementById('if01Stop'),
    ifSwingStopRaidsDiv: document.getElementById('ifSwingStopRaidsDiv'),
    // // ifFiboExtendedYes: document.getElementById('ifFiboExtendedYes'),
    // missedR078Div: document.getElementById('missedR078Div'),
    // // ifFiboExtendedNo: document.getElementById('ifFiboExtendedNo'),
    // if01StopYes: document.getElementById('if01StopYes'),
    // if01StopNo: document.getElementById('if01StopNo'),
    missedR01Div: document.getElementById('missedR01Div'),
    ifSwingStopRaidsDiv: document.getElementById('ifSwingStopRaidsDiv'),
    // // ifSwingStopRaidsStopYes: document.getElementById('ifSwingStopRaidsStopYes'),
    // missedRSwingDiv: document.getElementById('missedRSwingDiv'),
    // ifSwingStopRaidsStopNo: document.getElementById('ifSwingStopRaidsStopNo'),
    // profit
    ifFiboDiv: document.getElementById('ifFiboDiv'),
    // ifFiboYes: document.getElementById('ifFiboYes'),
    // ifFiboNo: document.getElementById('ifFiboNo'),
    // // cuttedR065x0786: document.getElementById('cuttedR065x0786'),
    ifFibo088Div: document.getElementById('ifFibo088Div'),
    // ifFibo088Yes: document.getElementById('ifFibo088Yes'),
    // ifFibo088No: document.getElementById('ifFibo088No'),
    // // cuttedR065x088: document.getElementById('cuttedR065x088'),
    ifFibo078x088Div: document.getElementById('ifFibo078x088Div'),
    // ifFibo078x088Yes: document.getElementById('ifFibo078x088Yes'),
    // ifFibo078x088No: document.getElementById('ifFibo078x088No'),
    // cuttedR078x088: document.getElementById('cuttedR078x088'),
    ifFibo088x1Div: document.getElementById('ifFibo088x1Div'),
    // Fibo088x1Yes: document.getElementById('Fibo088x1Yes'),
    // Fibo088x1No: document.getElementById('Fibo088x1No'),
    // cuttedR088x1: document.getElementById('cuttedR088x1'),
    allInputs: document.getElementsByClassName('info')
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
      selectors.journalCurrentPair.value = pair.toUpperCase();
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
    },
    hide: (elementName, hide) => {
      const element = document.getElementById(elementName);
      if (hide) {
        element.classList.add('hide')
      } else {
        element.classList.remove('hide');
      }
    },
    initDate: () => {
      let today = new Date();
      selectors.date.valueAsDate = today;
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
      UICtrl.initDate();
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
      })

      selectors.addtrade.addEventListener('click', element => {

        if (element.target.type === 'radio') {

          if (currentTradeR.value < 0) {

            UICtrl.hideContainer(selectors.greedDiv, false);

            if (element.target.dataset.profit === 'negative') {

              if (element.target.dataset.show) {
                UICtrl.hide(element.target.dataset.show, false);
              }
              if (element.target.dataset.hide) {
                UICtrl.hide(element.target.dataset.hide, true);
              }

            } else if (element.target.dataset.profit === 'positive') {
              UICtrl.hide(element.target.dataset.hide, true);

            } else {
              if (element.target.dataset.show) {
                // if it has dataset
                UICtrl.hide(element.target.dataset.show, false);
              }
              if (element.target.dataset.hide) {
                // if it has dataset
                UICtrl.hide(element.target.dataset.hide, true);
              }
            }

            //CLEARING OTHER MARKS IF MISTAKE:
            selectors.raidsStops.addEventListener('click', e => {
              if (e.target.matches('#stopRaidsYes')) {
                // if swing stop, hide all
                UICtrl.hideContainer(selectors.if01Stop, true);
                UICtrl.hideContainer(selectors.ifFiboExtendedDiv, true);
                UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);
              }
              else if (e.target.matches('#stop078Raids')) {
                // if fibo entry
                UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);
                UICtrl.hideContainer(selectors.if01Stop, true);
              } else if (e.target.matches('#stop088Raids')) {
                UICtrl.hideContainer(selectors.ifFiboExtendedDiv, true);
                UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);
              } else if (e.target.matches('#stop1Raids')) {
                UICtrl.hideContainer(selectors.if01Stop, true);
                UICtrl.hideContainer(selectors.ifFiboExtendedDiv, true);
                UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);
              } else if (e.target.matches('#stopRaidsGamble')) {
                UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);
                UICtrl.hideContainer(selectors.if01Stop, true);
              }
            })

          }
          else {

            if (element.target.dataset.profit === 'positive') {

              if (element.target.dataset.show) {
                UICtrl.hide(element.target.dataset.show, false);
              }
              if (element.target.dataset.hide) {
                UICtrl.hide(element.target.dataset.hide, true);
              }

            } else if (element.target.dataset.profit === 'negative') {
              UICtrl.hide(element.target.dataset.hide, true);

            } else {
              if (element.target.dataset.show) {
                UICtrl.hide(element.target.dataset.show, false);
              }
              if (element.target.dataset.hide) {
                UICtrl.hide(element.target.dataset.hide, true);
              }
            }

            selectors.raidsStops.addEventListener('click', e => {

              if (e.target.matches('#stopRaidsYes') && selectors.entryRaidsYes.checked) {
                // swing stop and middle of msb entry
                UICtrl.hideContainer(selectors.ifFiboDiv, false);
                UICtrl.hideContainer(selectors.ifFibo088Div, true);
                UICtrl.hideContainer(selectors.ifFibo078x088Div, true);
                UICtrl.hideContainer(selectors.ifFibo088x1Div, true);
              } else if (e.target.matches('#stopRaidsYes') && selectors.entryRaids786.checked) {
                // swing stop and 0786 entry
                UICtrl.hideContainer(selectors.ifFiboDiv, true);
                UICtrl.hideContainer(selectors.ifFibo088Div, true);
                UICtrl.hideContainer(selectors.ifFibo088x1Div, true);
                UICtrl.hideContainer(selectors.ifFibo078x088Div, false);
              } else if (e.target.matches('#stop078Raids') && selectors.entryRaids65.checked) {
                // everything done well - hide all
                UICtrl.hideContainer(selectors.ifFiboDiv, true);
                UICtrl.hideContainer(selectors.ifFibo088Div, true);
                UICtrl.hideContainer(selectors.ifFibo078x088Div, true);
                UICtrl.hideContainer(selectors.ifFibo088x1Div, true);
              } else if (e.target.matches('#stop088Raids') && selectors.entryRaids786.checked) {
                //everything done well - hide all
                UICtrl.hideContainer(selectors.ifFiboDiv, true);
                UICtrl.hideContainer(selectors.ifFibo088Div, true);
                UICtrl.hideContainer(selectors.ifFibo078x088Div, true);
                UICtrl.hideContainer(selectors.ifFibo088x1Div, true);
              }
              else {
                UICtrl.hideContainer(selectors.ifFiboDiv, false);
                UICtrl.hideContainer(selectors.ifFibo088Div, true);
                UICtrl.hideContainer(selectors.ifFibo078x088Div, true);
                UICtrl.hideContainer(selectors.ifFibo088x1Div, true);
              }
            });
            selectors.raidsEntries.addEventListener('click', e => {

              if (e.target.matches('#entryRaids65') || e.target.matches('entryRaids786') || e.target.matches('entryRaids88')) {
                // show take profits
                if (selectors.tpn0236Raids.checked) {
                  UICtrl.hideContainer(selectors.ifn065TpDiv, false);
                } else if (selectors.tpn065Raids.checked) {
                  UICtrl.hideContainer(selectors.ifn065TpDiv, true);
                  UICtrl.hideContainer(selectors.ifn1TpDiv, false);
                } else if (selectors.tpn01Raids.checked) {
                  UICtrl.hideContainer(selectors.ifn065TpDiv, true);
                  UICtrl.hideContainer(selectors.ifn1TpDiv, true);
                }
              } else {
                UICtrl.hideContainer(selectors.ifn0236TpDiv, false);
              }
            });
            selectors.ifn0236TpYes.addEventListener('click', e => {
              UICtrl.hideContainer(selectors.ifn065TpDiv, false);
            })
            selectors.ifn065TpYes.addEventListener('click', e => {
              UICtrl.hideContainer(selectors.ifn1TpDiv, false);
            })
          }
        }
      })






      // setup picker
      // selectors.continuation.addEventListener('click', (e) => {
      //   // CONTINUATION SETUPS
      //   UICtrl.hideContainer(selectors.basesContainer, false);
      //   // If mistake
      //   selectors.raid.addEventListener('click', (e) => {
      //     UICtrl.hideContainer(selectors.basesContainer, true);
      //   });

      //   if (currentTradeR.value < 0) {
      //     // swing stop

      //     // lose
      //     selectors.continuationStops.addEventListener('click', e => {
      //       if (e.target.matches('#stopBasesGamble') || (e.target.matches('#stopBasesLTF'))) {
      //         // stopped but used tighter stop, possibility of mistake
      //         UICtrl.hideContainer(selectors.ifswingDiv, false);
      //         console.log('elo');
      //         selectors.ifSwingYes.addEventListener('click', e => {
      //           UICtrl.hideContainer(selectors.missedR, false);
      //         })
      //         selectors.ifSwingNo.addEventListener('click', e => {
      //           UICtrl.hideContainer(selectors.missedR, true);
      //         })
      //       } else {
      //         UICtrl.hideContainer(selectors.ifswingDiv, true);
      //       }
      //     })
      //   } else {
      //     // win, check if stop  and entry could be better
      //     // entries
      //     selectors.continuationEntries.addEventListener('click', e => {
      //       // entry at wick
      //       if (e.target.matches('#entryBasesWicks')) {
      //         UICtrl.hideContainer(selectors.ifWicksDiv, false);
      // selectors.ifWicksCloseYes.addEventListener('click', e => {
      //           UICtrl.hideContainer(selectors.cuttedREntryCloseDiv, false);
      //         });
      //         selectors.ifWickClosesNo.addEventListener('click', e => {
      //           UICtrl.hideContainer(selectors.cuttedREntryCloseDiv, true);
      //         });
      // selectors.ifWicksMiddleYes.addEventListener('click', e => {
      //           UICtrl.hideContainer(selectors.cuttedREntryMiddleDiv, false);
      // });
      // selectors.ifWicksMiddleNo.addEventListener('click', e => {
      //           UICtrl.hideContainer(selectors.cuttedREntryMiddleDiv, true);
      //         });
      //       } else {
      //         UICtrl.hideContainer(selectors.ifLTFDiv, true);
      //       }
      //     })
      //     // stops
      //     selectors.continuationStops.addEventListener('click', e => {
      //       if (e.target.matches('#stopBasesYes')) {
      //         UICtrl.hideContainer(selectors.ifLTFDiv, false);
      // selectors.ifLTFStopWorked.addEventListener('click', e => {
      // NIE POJAWIA SIE INPUT
      //           UICtrl.hideContainer(selectors.cuttedRStopDiv, false);
      //         });
      //         selectors.ifLTFStopDidntWork.addEventListener('click', e => {
      //           UICtrl.hideContainer(selectors.cuttedRStopDiv, true);
      //         });

      //       } else {
      //         UICtrl.hideContainer(selectors.ifLTFDiv, true);
      //       }
      //     })
      //   }
      // })

      // selectors.raid.addEventListener('click', e => {
      //   // RAIDS SETUPS
      //   UICtrl.hideContainer(selectors.raidsContainer, false);
      //   // If mistake
      //   selectors.continuation.addEventListener('click', e => {
      //     UICtrl.hideContainer(selectors.raidsContainer, true);
      //   });
      //   selectors.raidsEntries.addEventListener('click', e => {
      //     UICtrl.hideContainer(selectors.raidsStops, false);
      //     UICtrl.hideContainer(selectors.if01Stop, true);
      //     UICtrl.hideContainer(selectors.ifFiboExtendedDiv, true);
      //     UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);
      //   })

      //   // if loss
      //   if (currentTradeR.value < 0) {
      // selectors.raidsStops.addEventListener('click', e => {
      //   if (e.target.matches('#stopRaidsYes')) {
      //     // if swing stop, hide all
      //     // if (selectors.entryRaids65.checked) {
      //     // 0.78 stop, check if 0.88 and swing worked out
      //     UICtrl.hideContainer(selectors.if01Stop, true);
      //     UICtrl.hideContainer(selectors.ifFiboExtendedDiv, true);
      //     UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);
      //   }
      //   else if (e.target.matches('#stop078Raids')) {
      //     // if fibo entry
      //     // if (selectors.entryRaids65.checked) {
      //     // 0.78 stop, check if 0.88 and swing worked out
      //     UICtrl.hideContainer(selectors.ifFiboExtendedDiv, false);
      //     UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);
      //     UICtrl.hideContainer(selectors.if01Stop, true);

      //   } else if (e.target.matches('#stop088Raids')) {
      //     UICtrl.hideContainer(selectors.if01Stop, false);

      //     UICtrl.hideContainer(selectors.ifFiboExtendedDiv, true);
      //     UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);

      //   } else if (e.target.matches('#stop1Raids')) {

      //     UICtrl.hideContainer(selectors.if01Stop, true);
      //     UICtrl.hideContainer(selectors.ifFiboExtendedDiv, true);
      //     UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);
      //     UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, false);
      //   } else if (e.target.matches('#stopRaidsGamble')) {
      //     UICtrl.hideContainer(selectors.ifFiboExtendedDiv, false);
      //     UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);
      //     UICtrl.hideContainer(selectors.if01Stop, true);

      //   }

      //       // cases always true:
      // selectors.ifFiboExtendedYes.addEventListener('click', e => {
      //         UICtrl.hideContainer(selectors.missedR078Div, false);

      //         // hide rest if mistake
      //         UICtrl.hideContainer(selectors.if01Stop, true);
      //         UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);

      //       })
      // selectors.ifFiboExtendedNo.addEventListener('click', e => {
      //         UICtrl.hideContainer(selectors.missedR078Div, true);
      //         // then did stop above minor liq hunt line worked out?
      //         UICtrl.hideContainer(selectors.if01Stop, false);
      //       })
      //       selectors.if01StopYes.addEventListener('click', e => {
      //         UICtrl.hideContainer(selectors.missedR01Div, false);
      //         // hide rest if mistake
      //         UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, true);

      //       })
      //       selectors.if01StopNo.addEventListener('click', e => {
      //         UICtrl.hideContainer(selectors.missedR01Div, true);
      //         // then did swing stop worked out?
      //         UICtrl.hideContainer(selectors.ifSwingStopRaidsDiv, false);
      //       })
      // selectors.ifSwingStopRaidsStopYes.addEventListener('click', e => {
      //         UICtrl.hideContainer(selectors.missedRSwingDiv, false);
      //       })
      //       selectors.ifSwingStopRaidsStopNo.addEventListener('click', e => {
      //         UICtrl.hideContainer(selectors.missedRSwingDiv, true);
      //       })
      //     })
      //   } else {
      //     // gain RAIDS

      // selectors.raidsStops.addEventListener('click', e => {

      //   if (e.target.matches('#stopRaidsYes') && selectors.entryRaidsYes.checked) {
      //     // swing stop and middle of msb entry
      //     UICtrl.hideContainer(selectors.ifFiboDiv, false);

      //   } else if (e.target.matches('#stopRaidsYes') && selectors.entry1Raids786.checked) {
      //     // swing stop and 0786 entry
      //     UICtrl.hideContainer(selectors.ifFibo078x088Div, false);
      //   } else if (e.target.matches('#stop078Raids') && selectors.entryRaids65.checked) {
      //     // everything done well
      //     // UICtrl.hideContainer(selectors.ifFibo078x088Div, false);
      //   }
      //   else {
      //     UICtrl.hideContainer(selectors.ifFiboDiv, false);
      //   }
      // });

      //     // always true listeners
      //     selectors.ifFiboYes.addEventListener('click', e => {
      // UICtrl.hideContainer(selectors.cuttedR065x0786, false);

      //     })
      //     selectors.ifFiboNo.addEventListener('click', e => {
      // UICtrl.hideContainer(selectors.cuttedR065x0786, true);
      //       // show next
      //       UICtrl.hideContainer(selectors.ifFibo088Div, false);

      //     })
      //     selectors.ifFibo088Yes.addEventListener('click', e => {
      // UICtrl.hideContainer(selectors.cuttedR065x088, false);
      //       UICtrl.hideContainer(selectors.ifFibo078x088Div, false);

      //     })
      //     selectors.ifFibo088No.addEventListener('click', e => {
      // UICtrl.hideContainer(selectors.cuttedR065x088, true);

      //     })
      //     selectors.ifFibo078x088Yes.addEventListener('click', e => {
      //       UICtrl.hideContainer(selectors.cuttedR078x088, false);

      //     })
      //     selectors.ifFibo078x088No.addEventListener('click', e => {
      //       UICtrl.hideContainer(selectors.cuttedR078x088, true);
      //       UICtrl.hideContainer(selectors.ifFibo088x1Div, false);

      //     })
      //     selectors.Fibo088x1Yes.addEventListener('click', e => {
      //       UICtrl.hideContainer(selectors.cuttedR088x1, false);

      //     })
      //     selectors.Fibo088x1No.addEventListener('click', e => {
      //       UICtrl.hideContainer(selectors.cuttedR088x1, true);

      //     })

      // }
      // })
      // selectors on input tutaj listener:
      // })
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
