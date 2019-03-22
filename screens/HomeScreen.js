import React from "react";
import {
  AsyncStorage,
  StyleSheet,
  View
} from "react-native";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";
import CalendarPicker from "react-native-calendar-picker";
import Icon from "react-native-vector-icons/AntDesign";
import { FloatingAction } from "react-native-floating-action";
import { List, TextInput, Headline, Appbar } from 'react-native-paper';
import data from "../assets/data/file.json"
import Theme from "../assets/theme";
import { withTheme } from 'react-native-paper';
import CONSTANTS from "../constants";
import { SQLite } from 'expo';

const db = SQLite.openDatabase(CONSTANTS.CONFIGS.DB);

const actions = [
  {
    text: "Goal",
    // icon: require("./images/ic_accessibility_white.png"),
    name: "bt_accessibility",
    position: 1
  }
];

class HomeScreen extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      language: "",
      list: []
    };
  }
  static navigationOptions = {
    header: null
  };

  onDateChange(e) {
    console.log(e);
  }

  _onSearch() {
    db.transaction(
      tx => {
        tx.executeSql('select * from files', [], (_, { rows: { _array } }) => {
          this.setState({ list: _array });
          console.log(this.state.list)
        }
        );
      }
      // this.update  
    );
  }

  _onMore() {
    try {
      AsyncStorage.getItem('@MySuperStore:key').then(res => {
        console.log(res);

      });
    } catch (error) {
      // Error saving data
    }
  }

  componentDidMount() {
    db.transaction(
      tx => {
        tx.executeSql('select * from files', [], (_, { rows: { _array } }) => {
          this.setState({ list: _array });
          console.log(this.state.list)
        }
        );
      }
    );
  }


  render() {
    const { navigate } = this.props.navigation;
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
        <View style={{ flex: 1 }}>
          {
            this.state.list.map((l, i) => (
              <List.Item
                key={i}
                theme={theme}
                title={l.title}
                onPress={e => {
                  navigate("Detail", { file: l });
                }}
                left={props => < Icon
                  name='star'
                  size={20}
                  type='font-awesome'
                  color='#CDDC39'
                />}
              />
            ))
          }
          <FloatingAction
            actions={actions}
            onPressItem={name => {
              navigate("Detail", { name: "Jane" });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
export default withTheme(HomeScreen);