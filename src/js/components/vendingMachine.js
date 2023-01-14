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
    // 입금 버튼 기능
    this.btnPut.addEventListener("click", (event) => {
      const inputCost = parseInt(this.inputCostEl.value);
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(",", ""));
      const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));

      if (inputCost) {
        // 입금액이 소지금보다 적다면
        if (inputCost <= myMoneyVal && inputCost > 0) {
          this.myMoney.textContent =
            //Intl.NumberFormat : 언어에 맞는 숫자 서식을 문자열로 반환합니다. IE11 부터 지원
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

    // 거스름돈 반환 버튼 기능
    this.btnReturn.addEventListener("click", (event) => {
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(",", ""));
      const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));

      if (balanceVal) {
        this.myMoney.textContent =
          new Intl.NumberFormat().format(balanceVal + myMoneyVal) + " 원";
        this.balance.textContent = "원";
      }
    });

    // 자판기 메뉴 기능
    const btnCola = this.itemList.querySelectorAll("button");

    btnCola.forEach((item) => {
      item.addEventListener("click", (event) => {
        const targetEl = event.currentTarget;
        const balanceVal = parseInt(
          this.balance.textContent.replaceAll(",", "")
        );
        let isStaged = false; // 이미 선택되었는가?
        let targetElPrice = parseInt(targetEl.dataset.price);
        const stagedListItem = this.stagedList.querySelectorAll("li");

        // 입금된 금액이 음료수 값보다 많거나 같을 경우(구매 가능)
        if (balanceVal >= targetElPrice) {
          this.balance.textContent =
            new Intl.NumberFormat().format(balanceVal - targetElPrice) + " 원";

          // forEach 문을 사용할 경우 반복의 종료가 불가능하다 (return, break 작동안함). 모든 원소를 순환할 필요가 없다면 비효율적.
          // 클릭한 음료수가 내가 이미 선택한 아이템인지 탐색
          for (const item of stagedListItem) {
            // 내가 클릭한 상품과 내가 담은 상품이 같을 경우
            if (item.dataset.item === targetEl.dataset.item) {
              item.querySelector(".num-counter").textContent++;
              isStaged = true;
              break;
            }
          }

          // 해당 아이템을 처음 선택했을 경우
          if (!isStaged) {
            this.stagedItemGenerator(targetEl);
          }
          // 콜라의 갯수 줄이기
          targetEl.dataset.count--;

          // 상품이 소진되면 품절 표시
          if (parseInt(targetEl.dataset.count) === 0) {
            targetEl.parentElement.classList.add("sold-out");
            const warning = document.createElement("em");
            warning.textContent = "해당 상품은 품절입니다.";
            warning.classList.add(".ir");
            // em 요소를 button 요소 앞으로 배치
            targetEl.parentElement.insertBefore(warning, targetEl);
          }
        } else {
          alert("잔액이 부족합니다. 돈을 입금해주세요.");
        }
      });
    });

    // 획득 버튼 기능
  }
}

export default VendingMachine;
