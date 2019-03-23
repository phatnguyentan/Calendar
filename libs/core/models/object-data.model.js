import { ModelBase } from "../base/model.base";

export default class ObjectDataModel extends ModelBase {
  // metadata = { saved: false, saveable: true }
  // data = { primary: null, sencondary: null };
  // optional = {};

  constructor(data = {}, metadata = { saved: false, saveable: true }, options = {}) {
    super();
    this.setData(data);
    this._metadata = metadata;
    this._options = options;
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