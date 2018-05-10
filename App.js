import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image } from 'react-native'
import HTML from 'react-native-render-html'

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://don.crakac.com/api/v1/timelines/public')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        })
      })
      .catch((error) =>{
        console.error(error);
      })
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20, justifyContent: 'center'}}>
          <ActivityIndicator size="large"/>
        </View>
      )
    }
    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) =>
            <View style={{flex: 1, flexDirection: 'row', padding: 4}}>
              <Image style={{width: 48, height: 48}} source={{uri: item.account.avatar}}/>
              <View style={{flex:1, paddingLeft: 4}}>
                <Text>{item.account.display_name}@{item.account.acct}</Text>
                <HTML html={item.content}/>
              </View>
            </View>
          }
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
