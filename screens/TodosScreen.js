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
import CONSTANTS from "../constants";
import { List, TextInput, Appbar } from 'react-native-paper';
import { decode } from "iconv-lite";
import Todo from "../libs/models/todo.model";


class TodosScreen extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      text: template.basic,
      title: "",
      options: "",
      phone: "",
      query: "",
      metadata: {},
      options: {},
      data: new Todo()
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const data = navigation.state.params;
    this.setState({ data });
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
    const { navigate } = this.props.navigation;
    navigate("Home");
  }

  _save() {

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
    let data = this.state.data;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <KeyboardAwareScrollView behavior="padding">
          <Appbar.Header style={Theme.STYLES.mainHeader}>
            <Appbar.BackAction
              onPress={this._goBack.bind(this)}
            />
            <Appbar.Content
              title="Calendar"
              subtitle="Subtitle"
            />
            <Appbar.Action icon="save" onPress={this._save.bind(this)} />
          </Appbar.Header>
          <View style={{ flex: 1, padding: 10, justifyContent: "space-between", height: "100%" }}>
            <TextInput
              label="Title"
              mode="outlined"
              theme={{ colors: { primary: "black" } }}
              value={data.title}
              onChangeText={title => this.setState({ title })}
            />
            <FlatList
              data={data.content}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item, index }) =>
                <View key={index} style={{ flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center', }}>
                  <Icon
                    style={{ padding: 15 }}
                    name='check'
                    size={Theme.SIZES.CHECKBOX_WIDTH}
                    type='font-awesome'
                    color={data.content[index].checked ? Theme.COLORS.SUCCESS : Theme.COLORS.MUTED}
                    onPress={() => {
                      data.content[index].checked = !data.content[index].checked;
                      this.state.data.content = [...this.state.data.content];
                      this.setState({ data: this.state.data });

                    }}
                  />
                  <TextInput
                    style={{ flex: 3 }}
                    mode="outlined"
                    theme={{ colors: { primary: "black" } }}
                    onChangeText={(text) => {
                      if (data.content.length - 1 == index) {
                        data.createEmpty();
                      }
                      data.content[index].text = text;
                      this.state.data.content = [...data.content];
                      this.setState({ data });
                    }}
                    value={data.content[index].text}
                    label={CONSTANTS.TEXTS.INPUT_DESCRIPTION}
                  ></TextInput>
                  <Icon
                    style={{ padding: 15 }}
                    name='close'
                    size={Theme.SIZES.CHECKBOX_WIDTH}
                    type='font-awesome'
                    color={Theme.COLORS.ERROR}
                    onPress={() => {
                      if (data.content[index].text && data.content[index].text !== "") {
                        data.content.splice(index, 1);
                      } else {
                        data.content[index].text = "";
                      }
                      data.content = [...data.content];
                      this.setState({ data });
                    }}
                  />
                </View>}
            />
          </View>
        </KeyboardAwareScrollView>
        <List.Section>
          {
            list.map((l, i) => (
              <List.Item
                key={i}
                title={l.subtitle}
                left={props => <List.Icon {...props} icon="star" />}
              />
            ))
          }
        </List.Section>
      </KeyboardAvoidingView>
    );
  }
}

export default TodosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

