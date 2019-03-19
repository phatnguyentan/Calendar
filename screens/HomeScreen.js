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
      language: ""
    };
  }
  static navigationOptions = {
    header: null
  };

  onDateChange(e) {
    console.log(e);
  }

  _onSearch() {
    try {
      AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.').then(res => {
        console.log(res);
      })
    } catch (error) {
      // Error saving data
    }
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

  render() {
    const { navigate } = this.props.navigation;
    const theme = this.props.theme;
    const list = [
      {
        subtitle: 'Todo test 1'
      },
      {
        subtitle: 'Todo test 2'
      }
    ]
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={e => {
              // this.props.theme
              console.log(this.props.theme);
            }}
          />
          <Appbar.Content
            title="Title"
            subtitle="Subtitle"
          />
          <Appbar.Action icon="search" onPress={this._onSearch} />
          <Appbar.Action icon="more-vert" onPress={this._onMore} />
        </Appbar.Header>
        <CalendarPicker onDateChange={this.onDateChange} />
        <View style={{ flex: 1 }}>
          {
            list.map((l, i) => (
              <List.Item
                key={i}
                // style={{ backgroundColor: Theme.COLORS.PRIMARY }}
                theme={theme}
                title={l.subtitle}
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