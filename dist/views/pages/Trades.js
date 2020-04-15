import Db from "../../services/Db.js";

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
    const globalTrades = await Db.getGlobalTrades();
    const tradeSection = document.querySelector(".type-container");

    docs.forEach(addTrade);
    tradeSection.insertAdjacentHTML(
      "afterbegin",
      raidTrades(globalTrades, "Global Raids")
    );
    tradeSection.insertAdjacentHTML(
      "afterbegin",
      contunationTrades(globalTrades, "Global Continuation")
    );
    tradeSection.insertAdjacentHTML("afterbegin", raidTrades(docs));
    tradeSection.insertAdjacentHTML("afterbegin", contunationTrades(docs));

    tradeSection.addEventListener("click", expandType);
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

function contunationTrades(docs, global = "Continuation") {
  let markup = /*html*/ `
  <div class="type p1">
    <div class ="header" >
      <h1>${global} </h1> 
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
            <th>Stop</th>
            <th>Take Profit</th>
            <th>Time Frame</th>
            <th>Visible on HTF</th>
            <th>Base on the left</th>
          </tr>
        </thead>
        <tbody>  
          <tr>
            <td>
              Wicky: ${calculateStats(
                docs,
                "question1",
                "Base type: wicky"
              )}% <br> 
              Blocky: ${calculateStats(docs, "question1", "Base type: blocky")}%
            </td>
            <td>
              Body: ${calculateStats(docs, "entry", "body")} % <br>
              Wicks: ${calculateStats(docs, "entry", "wicks")} % <br> 
              MoB: ${calculateStats(docs, "entry", "middle of base")} %
            </td>
            <td>
              Swing: ${calculateStats(docs, "stop", "swing")}% <br> 
              Minor High on LFT: ${calculateStats(
                docs,
                "stop",
                "stop above minor hight on LFT"
              )}% <br>
              Gamble: ${calculateStats(docs, "stop", "gambling stop")}%
            </td>
            <td>
              First liq pool: ${calculateStats(
                docs,
                "tp",
                "first liq pool"
              )}% <br>
              Major liq pool: ${calculateStats(
                docs,
                "tp",
                "major liq pool"
              )}% <br>
              First untested base: ${calculateStats(
                docs,
                "tp",
                "first untested base"
              )}% <br>
              Opposite signal: ${calculateStats(
                docs,
                "tp",
                "opposite signal occured"
              )}%
            </td>
            <td>
              5m: ${calculateStats(docs, "timeframe", "5m")}% <br>
              15m: ${calculateStats(docs, "timeframe", "15m")}% <br>
              30m: ${calculateStats(docs, "timeframe", "30m")}% <br>
              1h: ${calculateStats(docs, "timeframe", "1h")}% <br>
              2h: ${calculateStats(docs, "timeframe", "2h")}% <br>
              4h: ${calculateStats(docs, "timeframe", "4h")}%
            </td>
            <td>
              Yes: ${calculateStats(
                docs,
                "question2",
                "Visible on higher tf?:yes"
              )}% <br>
              No: ${calculateStats(
                docs,
                "question2",
                "Visible on higher tf?:no"
              )}%
            </td>
            <td>
            Yes: ${calculateStats(
              docs,
              "question3",
              "Was there bigger base on the left?:yes"
            )}% <br>
            No: ${calculateStats(
              docs,
              "question3",
              "Was there bigger base on the left?:no"
            )}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `;
  return markup;
}

function raidTrades(docs, global = "Raids") {
  let markup = /*html*/ `
  <div class="type p1">
    <div class ="header" >
      <h1>${global} </h1>
      <div>
        <i class="fas fa-plus"></i>
      </div>
    </div>
    <div class="tab-wrapper">
      <table>
        <thead>
          <tr>
            <th>MSB Type</th>
            <th>Entry</th>
            <th>Stop Lose</th>
            <th>Take Profit</th>
            <th>Time Frame</th>
            <th>Clear MSB on HTF</th>
            <th>Pool Type</th>
          </tr>
        </thead>
        <tbody>
          <td>
            Origin: ${calculateStats(
              docs,
              "question1",
              "msb type: origin"
            )}% <br>
            Shady: ${calculateStats(docs, "question1", "msb type: shady")}%
          </td>
          <td>
            Middle between MSB and minor liq hunt: ${calculateStats(
              docs,
              "entry",
              "msb type: Middle between MSB and minor liq hunt"
            )}% <br>
            0.65: ${calculateStats(docs, "entry", "0.65")}% <br>
            0.78: ${calculateStats(docs, "entry", "0.78")}% <br>
            0.88: ${calculateStats(docs, "entry", "0.88")}%
          </td>
          <td>
            Stop behind 1 (minor liq line): ${calculateStats(
              docs,
              "stop",
              "Stop behind 1 (minor liq line)"
            )}% <br>
            Swing: ${calculateStats(docs, "stop", "swing")}% <br>
            0.78 stop: ${calculateStats(docs, "stop", "0.78 stop")}% <br>
            0.88 stop: ${calculateStats(docs, "stop", "0.88 stop")}% <br>
            Gamble: ${calculateStats(docs, "stop", "gambling stop")}%
          </td>
          <td>
            First liq pool: ${calculateStats(
              docs,
              "profit",
              "First liq pool"
            )}% <br>
            Major liq pool: ${calculateStats(
              docs,
              "profit",
              "Major liq pool"
            )}% <br>
            First untested base: ${calculateStats(
              docs,
              "profit",
              "First untested base"
            )}% <br>
            Oposite signal: ${calculateStats(
              docs,
              "profit",
              "Oposite signal occured"
            )}% <br>
            -0.236: ${calculateStats(docs, "tp", "-0.236")}% <br>
            -0.65: ${calculateStats(docs, "tp", "-0.65")}% <br>
            -1: ${calculateStats(docs, "tp", "-1")}% <br>
           </td>
          <td>
            5m: ${calculateStats(docs, "timeframe", "5m")}% <br>
            15m: ${calculateStats(docs, "timeframe", "15m")}% <br>
            30m: ${calculateStats(docs, "timeframe", "30m")}% <br>
            1h: ${calculateStats(docs, "timeframe", "1h")}% <br>
            2h: ${calculateStats(docs, "timeframe", "2h")}% <br>
            4h: ${calculateStats(docs, "timeframe", "4h")}%
          </td>
          <td>
           Yes: ${calculateStats(
             docs,
             "question2",
             "clear msb on higher timeframe?: yes"
           )}% <br>
           No: ${calculateStats(
             docs,
             "question2",
             "clear msb on higher timeframe?: no"
           )}%
          </td>
          <td>
            Shady: ${calculateStats(
              docs,
              "question3",
              "pool type: shady"
            )}% <br>
            Minor: ${calculateStats(
              docs,
              "question3",
              "pool type: minor"
            )}% <br>
            Major: ${calculateStats(docs, "question3", "pool type: major")}% 
          </td>
        </tbody>
      </table>
    </div>
  </div>`;
  return markup;
}

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function calculateStats(docs, key, filter) {
  let allTrades = 0;
  let profitableTrades = 0;
  docs.forEach((el) => {
    if (el[key].toLowerCase() == filter.toLowerCase()) {
      if (el.profit > 0) {
        profitableTrades += 1;
      }
      allTrades += 1;
    }
  });
  return allTrades > 0 ? roundToTwo((profitableTrades * 100) / allTrades) : 0;
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
