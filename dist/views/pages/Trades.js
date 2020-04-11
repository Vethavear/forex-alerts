import Db from "../../services/Db.js";
import authManager from "../../app.js";

let Trades = {
  render: async () => {
    let view = /*html*/ `
    <section class ="p2" id="trades">     
    <div class="type-container p2">
    </div> 
      <table>
        <thead>
          <tr>
            <th>Pair</th>
            <th>Setup</th>
            <th>Stop</th>
            <th>Profit</th>
            <th>Entry</th>
            <th>Tp</th>
            <th>Chart</th>
            <th>Question 1</th>
            <th>Question 2</th>
            <th>Question 3</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody id ="trade-list">
        </tbody>
      </table>
    </section>`;
    return view;
  },

  after_render: async () => {
    const docs = await Db.getAllTrades();
    docs.forEach(addTrade);

    const tradeSection = document.querySelector(".type-container");
    tradeSection.insertAdjacentHTML("afterbegin", raidTrades());
    tradeSection.insertAdjacentHTML("afterbegin", contunationTrades(docs));

    tradeSection.addEventListener("click", expandType);
    // global trades
  },
};

export default Trades;

function expandType(e) {
  const target = e.target;
  if (target.tagName != "I") {
    return;
  }
  if (target.classList.contains("fa-plus")) {
    target.classList.remove("fa-plus");
    target.classList.add("fa-minus");
  } else {
    target.classList.remove("fa-minus");
    target.classList.add("fa-plus");
  }

  const type = target.closest(".header").nextElementSibling;
  const ch = type.clientHeight,
    sh = type.scrollHeight,
    isCollapsed = !ch,
    noHeightSet = !type.style.height;
  type.style.height = (isCollapsed || noHeightSet ? sh : 0) + "px";
}

function contunationTrades(docs, global = false) {
  let markup = /*html*/ `
  <div class="type p1">
    <div class ="header" >
      <h1>Continuation </h1> 
      <div>
        <i class="fas fa-plus"></i>
      </div>
    </div>
    <div class="tab-wrapper">
      <table>
        <thead>
          <tr>
            <th>Base Type</th>
            <th>Entry</th>
            <th>Stop Lose</th>
            <th>Take Profit</th>
            <th>Time Frame</th>
            <th>Visible on HTF</th>
            <th>LFT SL</th>
            <th>TP on MLP</th>
          </tr>
        </thead>
        <tbody>  
          <tr>
          <td>Wicky: x%<br> Blocky: y%</td>
            <td>Body: ${calculateStats(docs, "entry", "body")} %
            <br> Wicks: ${calculateStats(docs, "entry", "wicks")} %
            <br> MoB: ${calculateStats(docs, "entry", "middle of base")} %</td>
            <td>Wicky: x%<br> Blocky: y%</td>
            <td>Wicky: x%<br> Blocky: y%</td>
            <td>Wicky: x%<br> Blocky: y%</td>
            <td>Wicky: x%<br> Blocky: y%</td>
            <td>Wicky: x%<br> Blocky: y%</td>
            <td>Wicky: x%<br> Blocky: y%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `;
  return markup;
}

function raidTrades() {
  let markup = /*html*/ `
  <div class="type p1">
    <div class ="header" >
      <h1>Raids </h1>
      <div>
        <i class="fas fa-plus"></i>
      </div>
    </div>
    <div class="tab-wrapper">
      <table>
        <thead>
          <tr>
            <th>Base Type</th>
            <th>Entry</th>
            <th>Stop Lose</th>
            <th>Take Profit</th>
            <th>Time Frame</th>
            <th>Visible on HTF</th>
            <th>LFT SL</th>
            <th>TP on MLP</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>`;
  return markup;
}

function calculateStats(docs, key, filter) {
  let allTrades = 0;
  let profitableTrades = 0;
  docs.forEach((el) => {
    if (el[key].toLowerCase() == filter) {
      if (el.profit > 0) {
        profitableTrades += 1;
      }
      allTrades += 1;
    }
  });
  return allTrades > 0 ? (profitableTrades * 100) / allTrades : 0;
}

function addTrade(trade) {
  const table = document.getElementById("trade-list");
  let row =
    /*html*/
    `
    <td> 
      ${trade.pair}
    </td>
    <td> 
      ${trade.setup}
    </td>
    <td> 
      ${trade.stop}
    </td>
    <td> 
     ${trade.profit}
    </td>
    <td> 
     ${trade.entry}
    </td>
    <td> 
      ${trade.tp}
    </td>
    <td> 
      <a href="${trade.chart}" target="_blank">tradingview...</a>
    </td>
    <td> 
      ${trade.question1}
    </td>
    <td> 
      ${trade.question2}
    </td>
    <td> 
      ${trade.question3}
    </td>
    <td> 
      ${trade.date}
    </td>
  `;

  let markup =
    /*html*/
    `
    <tr>
      ${row}
    </tr>
    `;
  table.insertAdjacentHTML("beforeend", markup);
}
