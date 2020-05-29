import { dbManager } from "../../app.js";



let Stats = {

  render: async () => {
    let view = /*html*/ `
    <div id="statsContainer">
    <div class="stats">
      <div class="userstats">
        <h2>User stats</h2>
        <table>
          <thead>
            <th>Trades</th>
            <th>Loses</th>
            <th>Wins</th>
            <th>Winratio</th>
          </thead>
          <tbody>
            <tr>
              <td>
                <p id="userTradesCount"  class="userData"></p>
              </td>
              <td>
                <p id="userLoses" class="userData"></p>
              </td>
              <td>
                <p id="userWins" class="userData"></p>
              </td>
              <td>
                <p id="userWinratio" class="userData"></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="globalstats">
        <h2>Global stats</h2>
        <table>
          <thead>
            <th>Trades</th>
            <th>Loses</th>
            <th>Wins</th>
            <th>Winratio</th>
          </thead>
          <tbody>
            <tr>
              <td>
                <p id="globalTradesCount" class="globalData"></p>
              </td>
              <td>
                <p id="globalLoses" class="globalData"></p>
              </td>
              <td>
                <p id="globalWins" class="globalData"></p>
              </td>
              <td>
                <p id="globalWinratio" class="globalData"></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="weeklyStatsNsettings">
    <div class="weeklystats">
      <h2>Weekly performance</h2>
      <form id="weeklyForm">
      <div class="row">
        <label for="date">From</label>
        <input type="date" name="date" id="dateFrom" required>
      </div>
      <div class="row">
        <label for="date">To</label>
        <input type="date" name="date" id="dateTo" required>
        </div>
        <div class="row">
        <button type="submit">Search</button>
      </div>
        </form>
        <table>
          <thead>
            <th>Trades</th>
            <th>Loses</th>
            <th>Wins</th>
            <th>Winratio</th>
            <th>R</th>
          </thead>
          <tbody>
            <tr>
              <td>
                <p id="weeklyTradesCount" class="weeklyData"></p>
              </td>
              <td>
                <p id="weeklyLoses" class="weeklyData"></p>
              </td>
              <td>
                <p id="weeklyWins" class="weeklyData"></p>
              </td>
              <td>
                <p id="weeklyWinratio" class="weeklyData"></p>
              </td>
              <td>
                <p id="weeklyR" class="weeklyData"></p>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
      <div class="settings">
      <h2>Account settings</h2>
      <form id="settingsForm">
        <div class="row">
          <label for="account">Account size</label>
          <input type="number" step="0.000001" name="account" id="account" required>
        </div>
        <div class="row">
          <label for="risk">Risk %</label>
          <input type="number" step="0.1" name="risk" id="risk" required>
        </div>
        <p class="ts2">Compound<p>
        <div class="compoundDiv">
        <label>After every trade
        <input type="radio" name="compound"  value="everytrade">
        </label>
        <label>Daily
        <input type="radio" name="compound"  value="daily">
        </label>
        <label>Weekly
        <input type="radio" name="compound"  value="weekly">
        </label>
        </div>
        <div class="row">
          <label for="changesDate">Changes date</label>
          <input type="date" name="changesDate" id="changesDate">
        </div>
        <div class="row">
          <button type="submit">Adjust changes</button>
        </div>
      </form>
    </div>
    </div>`
    return view;
  },

  after_render: async () => {

    const selectors = {
      dateFrom: document.getElementById('dateFrom'),
      dateTo: document.getElementById('dateTo'),
      userCellsToFill: document.querySelectorAll('.userData'),
      globalCellsToFill: document.querySelectorAll('.globalData'),
      weeklyCellsToFill: document.querySelectorAll('.weeklyData'),
      weeklyForm: document.getElementById('weeklyForm'),
    }

    const userTrades = await dbManager.getAllTrades();
    const globalTrades = await dbManager.getGlobalTrades();
    const userStats = calculateStats(userTrades);
    const globalStats = calculateStats(globalTrades);

    initDate(selectors.dateFrom, selectors.dateTo);
    fillWeeklyTrades();

    selectors.userCellsToFill.forEach(el => {
      const objKey = el.id.replace('user', '');
      el.innerHTML = userStats[objKey];
    })
    selectors.globalCellsToFill.forEach(el => {
      const objKey = el.id.replace('global', '');
      el.innerHTML = globalStats[objKey];
    })


    selectors.weeklyForm.addEventListener('submit', calculateWeeklyTrades);

    async function calculateWeeklyTrades(event) {
      event.preventDefault();
      fillWeeklyTrades();
    }
    async function fillWeeklyTrades() {
      const dateBasedTrades = await dbManager.getSpecificTrades('>=', '<=', 'date', selectors.dateFrom.value, selectors.dateTo.value);

      const weeklyStats = calculateStats(dateBasedTrades);

      selectors.weeklyCellsToFill.forEach(el => {
        const objKey = el.id.replace('weekly', '');
        el.innerHTML = weeklyStats[objKey];
      })
    }
  },
};

export default Stats;


function initDate(dateFrom, dateTo) {
  let date = new Date();

  const firstDayOfWeek = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  const lastDayOfWeek = firstDayOfWeek + 6;

  dateFrom.valueAsDate = new Date(date.setDate(firstDayOfWeek));
  dateTo.valueAsDate = new Date(date.setDate(lastDayOfWeek));

}


function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function calculateStats(trades) {

  let tradesData = {
    Wins: 0,
    TradesCount: 0,
    R: 0
  };
  trades.forEach(el => {
    if (el.profit > 0) {
      tradesData.Wins += 1;
    }
    tradesData.R += Number.parseFloat(el.profit);
    tradesData.TradesCount += 1;

  });
  tradesData.Winratio = tradesData.TradesCount > 0 ? roundToTwo((tradesData.Wins * 100) / tradesData.TradesCount) : 0;
  tradesData.Loses = tradesData.TradesCount - tradesData.Wins;

  return tradesData;
}


