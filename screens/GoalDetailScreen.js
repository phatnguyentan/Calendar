import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  // TextInput,
  TouchableOpacity,
  SectionList,
  View
} from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
// import { Header } from "react-native-elements";
import { ListItem, Button } from "react-native-elements";

import template from "./../assets/data/template";
import { connectActionSheet } from "react-native-awesome-action-sheet";
import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Theme from "../assets/theme";
import Test from "../assets/test";
import CONSTANTS from "../constants";
import { List, TextInput, Headline, Appbar } from 'react-native-paper';

class GoalDetailScreen extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      text: template.basic,
      title: template.basic,
      options: "",
      phone: "",
      checked: false,
      query: "",
      data: [
        { title: 'To Do:', data: [{ section: 0, text: "" }] },
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
    const list = [
      {
        subtitle: 'Eat'
      },
      {
        subtitle: 'Drink'
      }
    ]
    return (
      <KeyboardAvoidingView style={styles.container}>
        <KeyboardAwareScrollView behavior="padding">
          <Appbar.Header>
            <Appbar.BackAction
              onPress={this._goBack}
            />
            <Appbar.Content
              title="Title"
              subtitle="Subtitle"
            />
            <Appbar.Action icon="search" onPress={this._onSearch} />
            <Appbar.Action icon="more-vert" onPress={this._onMore} />
          </Appbar.Header>
          <View style={{ flex: 1, padding: 10, justifyContent: "space-between", height: "100%" }}>
            <TextInput
              label='Title'
              value={this.state.title}
              onChangeText={title => this.setState({ title })}
            />
            <Headline>Todo List:</Headline>
            <SectionList
              renderItem={({ item, index, section }) => <View style={{ flexDirection: "row" }}>
                <CheckBox
                  checkedIcon={<Icon
                    name='check'
                    size={Theme.SIZES.CHECKBOX_WIDTH}
                    type='font-awesome'
                    color={Theme.COLORS.SUCCESS}
                  />
                  }
                  uncheckedIcon={< Icon
                    name='check'
                    size={Theme.SIZES.CHECKBOX_WIDTH}
                    type='font-awesome'
                    color={Theme.COLORS.MUTED}
                  />}
                  checked={this.state.checked}
                  onPress={() => this.setState({ checked: !this.state.checked })}
                />
                <TextInput
                  onChangeText={(text) => {
                    if (this.state.data[item.section].data.length - 1 == index) {
                      this.state.data[item.section].data.push({ section: item.section, text: "" });
                    }
                    this.state.data[item.section].data[index].text = text;
                    this.setState({ data: this.state.data });
                  }}
                  value={this.state.data[item.section].data[index].text}
                  placeholder={CONSTANTS.TEXTS.INPUT_DESCRIPTION}
                ></TextInput>
                <Button
                  icon={
                    <Icon
                      name='close'
                      size={Theme.SIZES.CHECKBOX_WIDTH}
                      type='material'
                      color={Theme.COLORS.ERROR}
                    />
                  }
                  type="clear"
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
          </View>
        </KeyboardAwareScrollView>
        <View>
          {
            list.map((l, i) => (
              <List.Item
                key={i}
                style={Test.STYLES.listItem}
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
        </View>
      </KeyboardAvoidingView>

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

