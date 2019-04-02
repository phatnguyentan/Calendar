import React from "react";
import {
  AsyncStorage,
  StyleSheet,
  View
} from "react-native";
import { WebBrowser } from "expo";

import CalendarPicker from "react-native-calendar-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { FloatingAction } from "react-native-floating-action";
import { List, Appbar } from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import CONSTANTS from "../constants";
import { SQLite } from 'expo';
import Todo from "../libs/models/todo.model";
import ItemsList from "../libs/models/items-list.model";
import Plan from "../libs/models/plan.model";
import Theme from "../assets/theme";

const db = SQLite.openDatabase(CONSTANTS.CONFIGS.DB);

const actions = [
  {
    text: "Todo List",
    color: Theme.COLORS.PRIMARY,
    textColor: Theme.COLORS.BLACK,
    icon: <Icon
      name='calendar-check-o'
      size={20}
      type='font-awesome'
    />,
    name: "bt_accessibility",
    position: 1
  }
];

class HomeScreen extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      language: "",
      itemsList: new ItemsList()
    };
  }
  static navigationOptions = {
    header: null
  };

  onDateChange(e) {
    console.log(e);
  }

  _onSearch() {

  }

  _onMore() {
    try {
      // AsyncStorage.getItem('@MySuperStore:key').then(res => {
      //   console.log(res);

      // });
    } catch (error) {
      // Error saving data
    }
  }

  componentWillMount() {

    this.state.itemsList.push(new Todo({ title: "todo today", content: [{ checked: false, text: "ah do" }], type: "todo", icon: "calendar-check-o" }));
    this.state.itemsList.push(new Plan({ title: "plan today", content: "", type: "plan", icon: "file-text-o" }));
  }

  render() {
    const theme = this.props.theme;
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content
            title="Calendar"
            subtitle="Subtitle"
          />
          {/* <Appbar.Action icon="search" onPress={this._onSearch.bind(this)} /> */}
          {/* <Appbar.Action icon="more-vert" onPress={this._onMore} /> */}
        </Appbar.Header>
        <CalendarPicker onDateChange={this.onDateChange} />
        <List.Section style={{ flex: 1 }}>
          {
            this.state.itemsList.map((l, i) => (
              <List.Item
                key={i}
                theme={theme}
                title={l.title}
                onPress={e => { this.viewDetail(l) }}
                left={props => <Icon
                  name={l.icon}
                  style={{ padding: 5 }}
                  size={20}
                  type='font-awesome'
                />}
              />
            ))
          }
        </List.Section>
        <FloatingAction
          actions={actions}
          color={Theme.COLORS.PRIMARY}
          style={{ color: Theme.COLORS.PRIMARY }}
          onPressItem={name => { this.createNew(name) }}
        />
      </View>
    );
  }
  componentDidMount() {

  }

  viewDetail(item) {
    item = { ...item }
    if (item.type == 'todo') {
      item = new Todo(item);
      item.setMetadata({ saved: true });
      item.createEmpty();
      const { navigate } = this.props.navigation;
      navigate("Todos", item);
    }
    if (item.type == 'plan') {
      const { navigate } = this.props.navigation;
      navigate("Plan", item);
    }
  }

  createNew(e) {
    let todo = new Todo();
    todo.setMetadata({ saved: false });
    todo.createEmpty();
    this.props.navigation.navigate("Todos", todo);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
export default withTheme(HomeScreen);