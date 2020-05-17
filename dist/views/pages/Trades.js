import { dbManager } from "../../app.js";

const raid = {
  question1: ["msb type: shady", "msb type: origin"],
  entry: [
    "Middle between MSB and minor liq hunt",
    "Middle between MSB and swing",
    "0.236 between MSB and swing",
    "Ballin in da pool",
    "Reclaim",
    "0.64",
    "0.786",
    "0.88",
  ],
  stop: [
    "Swing",
    "0.78 stop",
    "0.88 stop",
    "gambling stop",
    "Stop behind 1 (minor liq line)",
  ],
  tp: [
    "First liq pool",
    "Major liq pool",
    "First untested base",
    "Opposite signal occured",
    "-0.236",
    "-0.64",
    "-1",
  ],
  timeframe: ["1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h"],
  question2: [
    "clear msb on higher timeframe?: yes",
    "clear msb on higher timeframe?: no",
  ],
  question3: ["pool type: shady", "pool type: minor", "pool type: major"],
};

const continuation = {
  question1: ["Base type: blocky", "Base type: wicky"],
  entry: ["body", "wicks", "middle of base"],
  stop: ["swing", "stop above minor hight on LFT", "gambling stop"],
  tp: [
    "First liq pool",
    "Major liq pool",
    "First untested base",
    "Opposite signal occured",
  ],
  timeframe: ["1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h"],
  question2: ["Visible on htf?: yes", "Visible on htf?:no"],
  question3: [
    "Was there bigger base on the left?:yes",
    "Was there bigger base on the left?:no",
  ],
};

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
    const docs = await dbManager.getAllTrades();
    const globalTrades = await dbManager.getGlobalTrades();
    const tradeSection = document.querySelector(".type-container");

    if (globalTrades.length > 0) {
      tradeSection.insertAdjacentHTML(
        "afterbegin",
        addStatistics(globalTrades, "Global Raids", raid)
      );
      tradeSection.insertAdjacentHTML(
        "afterbegin",
        addStatistics(globalTrades, "Global Continuation", continuation)
      );
    }
    if (docs.length > 0) {
      docs.forEach(addTrade);
      tradeSection.insertAdjacentHTML(
        "afterbegin",
        addStatistics(docs, "Raids", raid)
      );
      tradeSection.insertAdjacentHTML(
        "afterbegin",
        addStatistics(docs, "Continuation", continuation),
        continuation
      );
      marklastOfFriday();
    }

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

function addStatistics(docs, tradeType = "Raids", tradeProperties = {}) {
  let columns = ``;
  let tr = ``;
  let columnName;
  for (let key in tradeProperties) {
    tr += "<td>";
    if (key == "question1" || key == "question2" || key == "question3") {
      columnName = tradeProperties[key][0].split(":")[0];
    } else {
      columnName = key;
    }
    columns += `<th> ${columnName} </th>`;

    tradeProperties[key].forEach((el) => {
      const type = el.split(":")[1] || el;
      tr += `<span>${type}: ${calculateStats(docs, key, el)}%</span><br>`;
    });
    tr += "</td>";
  }
  let markup = /*html*/ `
  <div class="type p1">
    <div class ="header" >
      <h1>${tradeType} </h1>
      <div>
        <i class="fas fa-plus"></i>
      </div>
    </div>
    <div class="tab-wrapper">
      <table>
        <thead>
          <tr>
            ${columns}
          </tr>
        </thead>
        <tbody>
          ${tr}
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
    <td>${trade.pair}</td>
    <td>${trade.setup}</td>
    <td>${trade.stop}</td>
    <td>${trade.profit}</td>
    <td>${trade.entry}</td>
    <td>${trade.tp}</td>
    <td><a href="${trade.chart}" target="_blank">tradingview...</a></td>
    <td>${trade.question1}</td>
    <td>${trade.question2}</td>
    <td>${trade.question3}</td>
    <td class="date">${trade.date}</td>
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

function marklastOfFriday() {
  const list = [];
  Array.from(document.querySelectorAll(".date")).forEach((el) => {
    const id = list.findIndex((item) => item.innerHTML == el.innerHTML);
    if (id == -1) {
      list.push(el);
    }
  });
  list.forEach((el) => {
    const tradeDate = el.innerHTML.split("-");
    const date = new Date(tradeDate);
    if (date.getDay() == 5) {
      el.parentElement.style.background = "#55def1";
    }
  });
}
