class VendingMachine {
  constructor() {
    const vMachine = document.querySelector(".selectitem_art");
    this.itemList = vMachine.querySelector(".selectitem_itemul");
    this.balance = vMachine.querySelector(".pricecalculate_balance_number");
    this.inputCostEl = vMachine.querySelector(".pricecalculate_input");
    this.btnPut = vMachine.querySelector(".pricecalculate_income");
    this.btnReturn = vMachine.querySelector(".pricecalculate_change");
    this.btnGet = vMachine.querySelector(".pricecalculate_orderbutton");
    this.stagedList = vMachine.querySelector(".pricecalculate_ordereditem");

    const myinfo = document.querySelector(".acquireditems_art");
    this.myMoney = myinfo.querySelector("#walletmoney_input"); //input이라서 value로 써야함
    this.gotList = myinfo.querySelector(".acquireditems_wholecounts_drinks_ul");
    this.txtTotal = myinfo.querySelector(".txt-total");
  }

  // 선택한 음료수 목록 생성
  stagedItemGenerator(target) {
    const stagedItem = document.createElement("li");
    stagedItem.dataset.item = target.dataset.item;
    stagedItem.dataset.price = target.dataset.price;
    stagedItem.innerHTML = `
      <button type="button" class="btn-staged">
        <img src="./src/images/${target.dataset.img}" alt="" class="img-item" />
        <strong class="txt-item">${target.dataset.item}</strong>
        <span class="num-counter">1</span>
      </button>
    `;
    this.stagedList.appendChild(stagedItem);
  }

  bindEvents() {
    this.btnPut.addEventListener("click", (event) => {
      const inputCost = parseInt(this.inputCostEl.value);
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(",", ""));
      const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));

      if (inputCost) {
        if (inputCost <= myMoneyVal && inputCost > 0) {
          this.myMoney.textContent =
            new Intl.NumberFormat().format(myMoneyVal - inputCost) + " 원";
          this.balance.textContent =
            new Intl.NumberFormat().format(
              (balanceVal ? balanceVal : 0) + inputCost
            ) + " 원";
        } else {
          alert("소지금이 부족합니다.");
        }
        this.inputCostEl.value = null;
      }
    });
    
  }
}

export default VendingMachine;
