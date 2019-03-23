import ObjectDataModel from "../core/models/object-data.model";

export default class Todo extends ObjectDataModel {

  constructor(data = { title: "", content: [], type: "todo" }) {
    super(data);
    // this.props = { checked: true, text: "" };
    // this.data = Object.assign(this.data, data);
    // this.metadata = Object.assign(this.metadata, metadata);
    // this.options = Object.assign(this.options, options);
    // this = { ...this, ...data }
  }

  createEmpty() {
    this.content.push({ checked: false, text: "" });
  }
}