import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Theme from "./assets/theme";
import { SQLite } from 'expo';
import CONSTANTS from "./constants";

const db = SQLite.openDatabase(CONSTANTS.CONFIGS.DB);

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: Theme.COLORS.PRIMARY,
    accent: Theme.COLORS.ACCENT,
    background: "white",
    surface: "red",
  }
};

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  componentDidMount() {
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'drop table if exists files'
    //   );
    //   tx.executeSql(
    //     'create table if not exists files (id integer primary key not null, title int, content text, type string, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);'
    //   );
    //   tx.executeSql(
    //     'INSERT INTO files (title, type, content) VALUES ("Test Title", "todo", "[{\"checked\": true, \"text\": \"show some thing\"}]");'
    //   );
    // });
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'drop table files'
    //   );
    //   tx.executeSql(
    //     'create table if not exists files (id integer primary key not null, title string, content text, type string, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);'
    //   );
    //   let str = [{ checked: true, text: "show some thing" }];

    //   tx.executeSql(
    //     'INSERT INTO files (title, type, content) VALUES ("Test Title", "todo", "' + escape(JSON.stringify(str)) + '");'
    //   );
    // });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </PaperProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
