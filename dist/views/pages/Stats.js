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
    <div class="weeklystats">
      <h2>Weekly performance</h2>
      <div class="row">
        <label for="date">From</label>
        <input type="date" name="date" id="date">
      </div>
      <div class="row">
        <label for="date">To</label>
        <input type="date" name="date" id="date">
        </div>
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
                <p id="weeklyTradesCount" class="weeklyData">55</p>
              </td>
              <td>
                <p id="weeklyLoses" class="weeklyData">55</p>
              </td>
              <td>
                <p id="weeklyWins" class="weeklyData">55</p>
              </td>
              <td>
                <p id="weeklyWinratio" class="weeklyData">55</p>
              </td>
              <td>
                <p id="weeklyR" class="weeklyData">55</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>;`
    return view;
  },

  after_render: async () => {

    const userTrades = await dbManager.getAllTrades();
    const globalTrades = await dbManager.getGlobalTrades();
    const userCellsToFill = document.querySelectorAll('.userData');
    const globalCellsToFill = document.querySelectorAll('.globalData');
    // const weeklyCellsToFill = document.querySelectorAll('.weeklyData');

    const userStats = calculateStats(userTrades);
    const globalStats = calculateStats(globalTrades);
    // userStats = calculateStats(userTrades);

    userCellsToFill.forEach(el => {
      const objKey = el.id.replace('user', '');
      el.innerHTML = userStats[objKey];
    })
    globalCellsToFill.forEach(el => {
      const objKey = el.id.replace('global', '');
      el.innerHTML = globalStats[objKey];
    })

  },
};

export default Stats;


function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function calculateStats(trades) {

  let tradesData = {};
  tradesData.Wins = 0;
  tradesData.TradesCount = 0;
  trades.forEach(el => {
    if (el.profit > 0) {
      tradesData.Wins += 1;
    }
    tradesData.TradesCount += 1;

  });
  console.log(tradesData.Wins);
  tradesData.Winratio = tradesData.TradesCount > 0 ? roundToTwo((tradesData.Wins * 100) / tradesData.TradesCount) : 0;
  tradesData.Loses = tradesData.TradesCount - tradesData.Wins;
  console.log(tradesData);
  return tradesData;
}


