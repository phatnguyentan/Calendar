import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View
} from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
import { Header } from "react-native-elements";
import DropdownMenu from "react-native-dropdown-menu";
import { TextInput } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";

import template from "./../assets/data/template";
import { Entypo } from "@expo/vector-icons";
import { connectActionSheet } from "react-native-awesome-action-sheet";

const sports = [
  {
    label: "Football",
    value: "football"
  }
];

class GoalDetailScreen extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      text: template.basic,
      options: "",
      language: "",
      selectedIndex: 0,
      numbers: [
        {
          label: "1",
          value: 1,
          color: "orange"
        },
        {
          label: "2",
          value: 2,
          color: "green"
        }
      ],
      favSport0: undefined,
      favSport1: undefined,
      favSport2: undefined,
      favSport3: undefined,
      favSport4: "baseball",
      favNumber: undefined
    };
    this.inputRefs = {
      firstTextInput: null,
      favSport0: null,
      favSport1: null,
      lastTextInput: null
    };
  }
  static navigationOptions = {
    header: null
  };

  onDateChange(e) {
    console.log(e);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  textChange(text) {
    console.log(text);
    this.setState({ text });
  }

  _onOpenActionSheet = () => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    let options = ["Delete", "Save", "Cancel"];
    let destructiveButtonIndex = 0;
    let cancelButtonIndex = 2;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex
      },
      buttonIndex => {
        // Do something here depending on the button index selected
      }
    );
  };

  render() {
    const buttons = [];
    const { selectedIndex } = this.state;
    const placeholder = {
      label: "Select a sport...",
      value: null,
      color: "#9EA0A4"
    };
    var data = [["Last Content", "Basic Content"]];
    return (
      <View style={styles.container}>
        <Header
          placement="left"
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <View
          style={{
            height: 50
          }}
        >
          <View style={{ width: 150 }}>
            {/* <DropdownMenu
              bgColor={"yellow"}
              tintColor={"#666666"}
              activityTintColor={"green"}
              titleStyle={{ fontSize: 16 }}
              handler={(selection, row) => {
                this.setState({ options: data[selection][row] });
                if (data[selection][row] == "Basic Content") {
                  this.setState({ text: template.basic });
                } else {
                  this.setState({ text: template.basic });
                }
              }}
              data={data}
            /> */}
            {/* <Button
              onPress={e => {
                const options = ["Delete", "Save", "Cancel"];
                const destructiveButtonIndex = 0;
                const cancelButtonIndex = 2;

                this.props.showActionSheetWithOptions(
                  {
                    options,
                    cancelButtonIndex,
                    destructiveButtonIndex
                  },
                  buttonIndex => {
                    // Do something here depending on the button index selected
                  }
                );
              }}
              title="Learn More"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            /> */}
            <Entypo.Button
              style={{ paddingHorizontal: 20 }}
              name="code"
              backgroundColor="#3e3e3e"
              onPress={this._onOpenActionSheet}
            >
              <Text style={{ fontSize: 15, color: "#fff" }}>. . .</Text>
            </Entypo.Button>
          </View>
        </View>

        <View style={{ padding: 10 }}>
          <TextInput
            style={{
              height: 400,
              padding: 10,
              fontSize: 20
            }}
            multiline={true}
            placeholder="Description"
            onChangeText={text => {
              this.setState({ text });
              console.log(text);
            }}
            value={this.state.text}
          />
        </View>
      </View>
    );
  }
}

export default connectActionSheet(GoalDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    // borderColor: "eggplant",
    borderRadius: 8,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});
