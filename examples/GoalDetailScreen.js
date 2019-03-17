import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  SectionList,
  View
} from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
import { Header } from "react-native-elements";
import { ListItem } from "react-native-elements";

import template from "./../assets/data/template";
import { connectActionSheet } from "react-native-awesome-action-sheet";
import { CheckBox } from 'react-native-elements'
import { Input } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';

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
      phone: "",
      checked: false,
      query: "",
      data: [
        { title: template.basic, data: [{ section: 0, text: "" }, { section: 0, text: "" }, { section: 0, text: "" }, { section: 0, text: "" }] },
        { title: 'To Do:', data: [{ section: 1, text: "" }] },
      ]
    }

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
    const data = [];
    return (
      <ScrollView style={styles.container}>
        <Header
          placement="left"
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <ScrollView style={{ padding: 10, flex: 1 }}>
          <SectionList
            renderItem={({ item, index, section }) => <View style={{ flexDirection: "row" }}>
              <CheckBox
                checkedIcon={<Icon
                  name='check'
                  size={30}
                  type='font-awesome'
                  color='#4CAF50'
                />
                }
                uncheckedIcon={< Icon
                  name='check'
                  size={30}
                  type='font-awesome'
                  color='#E0E0E0'
                />}
                checked={this.state.checked}
                onPress={() => this.setState({ checked: !this.state.checked })}
              />
              <TextInput
                value={this.state.data[item.section].data[index].text}
                style={{ backgroundColor: 'gray', width: "70%", borderRadius: 10 }}
                onChangeText={(text) => {
                  if (this.state.data[item.section].data.length - 1 == index) {
                    this.state.data[item.section].data.push({ section: item.section, text: "" });
                  }
                  this.state.data[item.section].data[index].text = text;
                  this.setState({ data: this.state.data });
                }}
              ></TextInput>
              <Icon
                name='close'
                size={20}
                type='material'
                color='#FF3D00'
                onPress={e => {
                  if (this.state.data[item.section].data[index].text && this.state.data[item.section].data[index].text !== "") {
                    this.state.data[item.section].data.splice(index, 1);
                  } else {
                    this.state.data[item.section].data[index].text = "";
                  }
                  this.setState({ data: this.state.data });
                }}
              />
            </View>}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{ fontWeight: 'bold' }}>{title}</Text>
            )}
            sections={this.state.data}
            keyExtractor={(item, index) => item + index}
          />
        </ScrollView>
      </ScrollView>
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

