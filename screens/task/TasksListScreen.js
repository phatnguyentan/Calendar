import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  Text,
  View
} from "react-native";

import Icon from "react-native-vector-icons/AntDesign";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Task from "../../libs/models/task.model";
import Theme from "../../assets/theme";


export default class TasksListScreen extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      data: [new Task(), new Task()]
    }
  }

  componentDidMount() {
    // const { navigation } = this.props;
    // const data = navigation.state.params;
    // this.setState({ data });
  }

  _goBack() {
    const { navigate } = this.props.navigation;
    navigate("Home");
  }

  _save() {

  }

  render() {
    let data = this.state.data;
    return (
      <KeyboardAwareScrollView behavior="padding">
        <View style={{ height: 50, backgroundColor: Theme.COLORS.PRIMARY }}></View>
        <View style={{ flex: 1, padding: 10, justifyContent: "space-between", height: "100%" }}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) =>
              <View key={index} style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ flex: 1 }}>{item.description}</Text>
                <View>
                  <Text>{item.status}</Text>
                </View>
              </View>}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

