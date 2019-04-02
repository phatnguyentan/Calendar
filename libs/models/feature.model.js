import ObjectDataModel from "../core/models/object-data.model";
import Project from "./project.model";

export default class Feature extends ObjectDataModel {

  static props = {
    name: "",
    description: "",
    start_date: new Date(),
    end_date: new Date(),
    project_id: -1,
    project: new Project()
  };

  constructor(data = Feature.props) {
    super(data);
  }
}