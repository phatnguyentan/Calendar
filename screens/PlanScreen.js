import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  DatePickerIOS,
  View,
  Platform
} from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
// import { ListItem, Button } from "react-native-elements";

import template from "./../assets/data/template";
// import { CheckBox } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Theme from "../assets/theme";
import { List, TextInput, Appbar } from 'react-native-paper';
import Plan from "../libs/models/plan.model";

export class PlanScreen extends React.Component {
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
      chosenDate: new Date(),
      data: new Plan()
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
    let datePicker;
    if (Platform.OS === "ios") {
      datePicker = <DatePickerIOS
        date={this.state.chosenDate}
        onDateChange={this.setDate}
      />
    } else {

    }
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
            <TextInput
              label="Plan"
              mode="outlined"
              theme={{ colors: { primary: "black" } }}
              value={data.content}
              onChangeText={content => this.setState({ data: { content } })}
              multiline={true}
            />
            {datePicker}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

