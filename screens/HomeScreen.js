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
import { List, TextInput, Headline, Appbar } from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import CONSTANTS from "../constants";
import { SQLite } from 'expo';
import Todo from "../libs/models/todo.model";
import ItemsList from "../libs/models/items-list.model";

const db = SQLite.openDatabase(CONSTANTS.CONFIGS.DB);

const actions = [
  {
    text: "Todo List",
    icon: < Icon
      name='list'
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
      itemsList: { items: [] }
    };
  }
  static navigationOptions = {
    header: null
  };

  onDateChange(e) {
    console.log(e);
  }

  _onSearch() {
    // db.transaction(
    //   tx => {
    //     tx.executeSql('select * from files', [], (_, { rows: { _array } }) => {
    //       this.setState({ itemsList: new ItemsList(_array) });
    //       console.log(this.state.itemsList);
    //     }
    //     );
    //   }
    // );
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
    db.transaction(
      tx => {
        tx.executeSql('select * from files', [], (_, { rows: { _array } }) => {
          // console.log(_array);
          // console.log(new ItemsList(_array));
          // let newList = new ItemsList(_array)
          this.setState({ itemsList: new ItemsList(_array) });
          // console.log(this.state.itemsList);
        }
        );
      }
    );
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
            this.state.itemsList.items.map((l, i) => (
              <List.Item
                key={i}
                theme={theme}
                title={l.title}
                onPress={e => { this.viewDetail(l) }}
                left={props => < Icon
                  name='star'
                  size={20}
                  type='font-awesome'
                  color='#CDDC39'
                />}
              />
            ))
          }
        </List.Section>
        <FloatingAction
          actions={actions}
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
      item.content = JSON.parse(unescape(item.content));
      let todo = new Todo();
      todo.setData(item);
      todo.setMetadata({ saved: true });
      todo.createEmpty();
      const { navigate } = this.props.navigation;
      navigate("Todos", todo);
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