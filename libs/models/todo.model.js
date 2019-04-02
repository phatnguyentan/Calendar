import ObjectDataModel from "../core/models/object-data.model";

class Todo extends ObjectDataModel {

  static props = { title: "", content: [], type: "todo", icon: "calendar-check-o" }
  static contentProps = { checked: false, text: "" }

  constructor(data = Todo.props) {
    super(data);

    this.createEmpty = () => {
      this.content.push(Todo.contentProps);
    }
  }

  // createEmpty() {
  //   this.content.push(Todo.contentProps);
  // }
}
export default Todo;