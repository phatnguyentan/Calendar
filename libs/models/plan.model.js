import ObjectDataModel from "../core/models/object-data.model";

export default class Plan extends ObjectDataModel {

  static props = { title: "", content: "", deadline: "", type: "plan", icon: "file-text-o" }

  constructor(data = Plan.props) {
    super(data);
  }

}