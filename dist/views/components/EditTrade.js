import { raid, continuation } from "../pages/Trades.js";

let EditTrade = {
  render: async () => {
    let view = /*html*/ `
    <div class="edit_modal p2">
    </div>
    `;
    return view;
  },

  after_render: async () => {},

  fillModal(trade) {
    const editModal = document.querySelector(".edit_modal");

    let pairNameMarkup = /*html*/ `
    <h1>Edit trade</h1> 
    <div class="trade_pair">
      <div>
      <input class="input" type="text" id="pair" value="${trade.pair}">
      </div>
      <div>
      <input class="input" type="text" id="profit" value="${trade.profit}">
      </div>
      <div>
      <input class="input" type="text" id="chart" value="${trade.chart}">
      </div>
      <div>
      <input class="input" type="date" id="date" value="${trade.date}">
      </div>
    </div>
    <div class ="close"><img src="./img/icon-remove.svg"> </div>
    <div class="trade_data">
    </div>
    <div class ="btn_wrapper"><a class ="btn_edit">Save</a></div>
  `;
    editModal.insertAdjacentHTML("afterbegin", pairNameMarkup);

    const tradeData = document.querySelector(".trade_data");

    let tardeDataMarkup = addSelects(trade);
    tradeData.insertAdjacentHTML("beforeend", tardeDataMarkup);
  },
};

export default EditTrade;

function addSelects(trade) {
  let markup = ``;
  for (let key in raid) {
    markup += `
    <div>
      <label for="${key}">${key}</label>
      <select id="${key}" class="select">
        ${addOptions(key, trade)}
      </select>
    </div>
  `;
  }
  return markup;
}

function addOptions(key, trade) {
  let markup = ``;

  for (let val of raid[key]) {
    if (val == trade[key]) {
      markup += `
      <option value="${val}" selected>${val}</option>
    `;
    } else {
      markup += `
      <option value="${val}">${val}</option>
    `;
    }
  }
  return markup;
}
