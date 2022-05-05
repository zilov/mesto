export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items,
    this._renderer = renderer,
    this._container = document.querySelector(containerSelector)
  }

  renderElements() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(item, initial=false) {
    if (initial) {
      this._container.append(item);
    } else {
      this._container.prepend(item);
    }
  }
}