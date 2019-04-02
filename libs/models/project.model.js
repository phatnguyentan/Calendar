import ObjectDataModel from "../core/models/object-data.model";

export default class Project extends ObjectDataModel {

  static props = {
    name: "",
    description: "",
    start_date: new Date(),
    end_date: new Date()
  };

  constructor(data = Project.props) {
    super(data);
  }
}