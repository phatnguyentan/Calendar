{/* <Autocomplete
                data={data}
                defaultValue={item.text}
                onChangeText={text => {
                  if (this.state.data[item.section].data.length - 1 == index) {
                    this.state.data[item.section].data.push({ section: item.section, text: "" })
                    this.setState({ data: this.state.data })
                  }
                }}
                containerStyle={{ width: "70%" }}
                inputContainerStyle={{ borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0 }}
                renderItem={itemX => (
                  <TouchableOpacity onPress={() => this.setState({ query: item })}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              // renderTextInput={e => {
              //   return <Input>aaaaaaaa</Input>
              // }}
              /> */}

// const itemEl = <View style={{ flexDirection: "row" }}>
    //   <CheckBox
    //     // style={{ width: 20, height: 20 }}
    //     checked={this.state.checked}
    //     onPress={e => {
    //       console.log(e);
    //     }}
    //   />
    //   <Autocomplete
    //     data={data}
    //     defaultValue={this.state.query}
    //     onChangeText={text => this.setState({ query: text })}
    //     containerStyle={{ width: "80%" }}
    //     renderItem={itemX => (
    //       <TouchableOpacity onPress={() => this.setState({ query: item })}>
    //         <Text>{item}</Text>
    //       </TouchableOpacity>
    //     )}
    //   />
    // </View>