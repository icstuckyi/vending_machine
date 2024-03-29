class ColaGenerator {
  constructor() {
    this.itemList = document.querySelector(".selectitem_itemul");
  }

  async setup() {
    await this.loadData((json) => {
      this.colaFactory(json);
    });
  }

  async loadData(callback) {
    const response = await fetch("src/js/items.json");

    if (response.ok) {
      callback(await response.json());
    } else {
      alert("통신 에러!" + response.status);
    }
  }

  // 콜라를 생산하는 함수
  colaFactory(data) {
    const docFrag = document.createDocumentFragment();
    data.forEach((el) => {
      const item = document.createElement("li");
      const itemTemplate = `
        <button type="button" class="btn-item" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
        <img src="src/images/${el.img}" alt="" class="img-item" />
        <strong class="tit-item">${el.name}</strong>
        <span class="txt-price">${el.cost}원</span>
        </button>
      `;
      item.innerHTML = itemTemplate;
      docFrag.appendChild(item);
    });
    this.itemList.appendChild(docFrag);
  }
}

export default ColaGenerator;
