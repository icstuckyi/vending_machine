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
  setup() {
    this.bindEvents();
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
    // myMoney, inputCostEl input창에 콤마찍기 event
    this.myMoney.addEventListener("keyup", (event) => {
      let myMoneyVal = parseInt(this.myMoney.value.replaceAll(",", ""));
      if (myMoneyVal) {
        myMoneyVal = new Intl.NumberFormat().format(myMoneyVal);
        this.myMoney.value = myMoneyVal;
      } else {
        return "";
      }
    });

    this.inputCostEl.addEventListener("keyup", (event) => {
      let inputCostVal = parseInt(this.inputCostEl.value.replaceAll(",", ""));
      if (inputCostVal) {
        inputCostVal = new Intl.NumberFormat().format(inputCostVal);
        this.inputCostEl.value = inputCostVal;
      } else {
        return "";
      }
    });

    // 입금 버튼 기능
    this.btnPut.addEventListener("click", (event) => {
      const inputCost = parseInt(this.inputCostEl.value.replaceAll(",", ""));
      const myMoneyVal = parseInt(this.myMoney.value.replaceAll(",", ""));
      const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));

      console.log(myMoneyVal);

      if (inputCost) {
        // 입금액이 소지금보다 적다면
        if (inputCost <= myMoneyVal && inputCost > 0) {
          this.myMoney.value =
            //Intl.NumberFormat : 언어에 맞는 숫자 서식을 문자열로 반환합니다. IE11 부터 지원
            new Intl.NumberFormat().format(myMoneyVal - inputCost);
          this.balance.textContent = new Intl.NumberFormat().format(
            (balanceVal ? balanceVal : 0) + inputCost
          );
        } else {
          alert("소지금이 부족합니다.");
        }
        this.inputCostEl.value = null;
      }
    });

    // 거스름돈 반환 버튼 기능
    this.btnReturn.addEventListener("click", (event) => {
      const myMoneyVal = parseInt(this.myMoney.value.replaceAll(",", ""));
      const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));

      if (balanceVal) {
        this.myMoney.value = new Intl.NumberFormat().format(
          balanceVal + myMoneyVal
        );
        this.balance.textContent = 0;
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
          this.balance.textContent = new Intl.NumberFormat().format(
            balanceVal - targetElPrice
          );

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
            targetEl.parentElement.classList.add("soldout");
            targetEl.disabled = true;
            const warning = document.createElement("em");
            warning.textContent = "해당 상품은 품절입니다.";
            warning.classList.add("ir_wa");
            // em 요소를 button 요소 앞으로 배치
            targetEl.parentElement.insertBefore(warning, targetEl);
          }
        } else {
          alert("잔액이 부족합니다. 돈을 입금해주세요.");
        }
      });
    });

    // 획득 버튼 기능
    this.btnGet.addEventListener("click", (event) => {
      let isGot = false;
      let totalPrice = 0;

      // 내가 고른 음료수 목록과 이미 구입한 목록을 비교
      for (const itemStaged of this.stagedList.querySelectorAll("li")) {
        for (const itemGot of this.gotList.querySelectorAll("li")) {
          let itemGotCount = itemGot.querySelector(".num-counter");
          // 획득할 아이템이 이미 획득한 음료 리스트에 존재하는지 확인
          if (itemStaged.dataset.item === itemGot.dataset.item) {
            // 획득한 음료 리스트의 아이템 갯수 업데이트
            itemGotCount.textContent =
              parseInt(itemGotCount.textContent) +
              parseInt(itemStaged.querySelector(".num-counter").textContent);
            isGot = true;
            break;
          }
        }
        // 처음 획득하는 음료수라면
        if (!isGot) {
          this.gotList.appendChild(itemStaged);
        }
      }
      // stagedList 목록의 내용을 초기화
      this.stagedList.innerHTML = null;

      // 획득한 음료 리스트를 순환하면서 총 금액을 계산
      this.gotList.querySelectorAll("li").forEach((itemGot) => {
        totalPrice +=
          itemGot.dataset.price *
          parseInt(itemGot.querySelector(".num-counter").textContent);
      });
      this.txtTotal.textContent = new Intl.NumberFormat().format(totalPrice);
    });
  }
}

export default VendingMachine;
