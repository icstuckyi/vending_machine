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
}
