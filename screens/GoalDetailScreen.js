import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View
} from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
// import { ListItem, Button } from "react-native-elements";

import template from "./../assets/data/template";
// import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Theme from "../assets/theme";
import Test from "../assets/test";
import CONSTANTS from "../constants";
import { List, TextInput, Headline, Appbar, Button } from 'react-native-paper';


class GoalDetailScreen extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      text: template.basic,
      title: "",
      options: "",
      phone: "",
      query: "",
      data: [
        { text: "", checked: true }
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

  _goBack() {
    navigate("Home");
  }

  render() {
    const list = [
      {
        subtitle: 'Eat'
      },
      {
        subtitle: 'Drink'
      }
    ]
    const { navigation } = this.props;
    const file = navigation.getParam('file', {});
    let data = JSON.parse(file.content);
    this.setState({ data })
    return (
      <KeyboardAvoidingView style={styles.container}>
        <KeyboardAwareScrollView behavior="padding">
          <Appbar.Header style={Theme.STYLES.mainHeader}>
            <Appbar.BackAction
              onPress={this._goBack}
            />
            <Appbar.Content
              title="Calendar"
              subtitle="Subtitle"
            />
            {/* <Appbar.Action icon="search" onPress={this._onSearch} /> */}
            {/* <Appbar.Action icon="more-vert" onPress={this._onMore} /> */}
          </Appbar.Header>
          <View style={{ flex: 1, padding: 10, justifyContent: "space-between", height: "100%" }}>
            <TextInput
              label='Title'
              mode="outlined"
              theme={{ colors: { primary: "black" } }}
              value={this.state.title}
              onChangeText={title => this.setState({ title })}
            />
            <FlatList
              data={this.state.data}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item, index }) =>
                <View key={index} style={{ flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center', }}>
                  <Icon
                    style={{ padding: 15 }}
                    name='check'
                    size={Theme.SIZES.CHECKBOX_WIDTH}
                    type='font-awesome'
                    color={this.state.data[index].checked ? Theme.COLORS.SUCCESS : Theme.COLORS.MUTED}
                    onPress={() => {
                      this.state.data[index].checked = !this.state.data[index].checked;
                      this.state.data = [...this.state.data];
                      this.setState({ data: this.state.data });
                    }}
                  />
                  <TextInput
                    style={{ flex: 3 }}
                    mode="outlined"
                    theme={{ colors: { primary: "black" } }}
                    onChangeText={(text) => {
                      if (this.state.data.length - 1 == index) {
                        this.state.data.push({ text: "" });
                      }
                      this.state.data[index].text = text;
                      this.state.data = [...this.state.data];
                      this.setState({ data: this.state.data });
                    }}
                    value={this.state.data[index].text}
                    label={CONSTANTS.TEXTS.INPUT_DESCRIPTION}
                  ></TextInput>
                  <Icon
                    style={{ padding: 15 }}
                    name='close'
                    size={Theme.SIZES.CHECKBOX_WIDTH}
                    type='font-awesome'
                    color={Theme.COLORS.ERROR}
                    onPress={() => {
                      if (this.state.data[index].text && this.state.data[index].text !== "") {
                        this.state.data.splice(index, 1);
                      } else {
                        this.state.data[index].text = "";
                      }
                      this.state.data = [...this.state.data];
                      this.setState({ data: this.state.data });
                    }}
                  />
                </View>}
            />
          </View>
        </KeyboardAwareScrollView>
        <View>
          {
            list.map((l, i) => (
              <List.Item
                key={i}
                title={l.subtitle}
                left={props => < Icon
                  name='star'
                  size={20}
                  type='font-awesome'
                />}
              />
            ))
          }
        </View>
      </KeyboardAvoidingView>

    );
  }
}

export default GoalDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

