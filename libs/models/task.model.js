import ObjectDataModel from "../core/models/object-data.model";
import Project from "./project.model";
import Feature from "./feature.model";

export default class Task extends ObjectDataModel {
  title = "aaaaaaaa";
  description = "aaaaaaaa";
  deadline = new Date();
  user_id = -1;
  assignee = -1;
  status = "new";
  prority = "high";
  project_id = -1;
  project = new Project();
  feature_id = -1;
  feature = new Feature();
  icon = "calendar-check-o"

  constructor(data = {}) {
    super(data);
  }
}