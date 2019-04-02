import { ModelBase } from "../base/model.base";

export default class ObjectDataModel extends ModelBase {
  constructor(data = {}, metadata = { saved: false, saveable: true }, options = {}) {
    super();
    this.setData(data);
    this._metadata = metadata;
    this._options = options;

    if (this.id) {
      this.setMetadata({ saved: true });
    } else {
      this.setMetadata({ saved: false });
    }
  }

  setData(data) {
    Object.keys(data).forEach(e => {
      this[e] = data[e];
    });
  }

  setMetadata(metadata) {
    this._metadata = Object.assign(this._metadata, metadata);
  }
}