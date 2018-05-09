import React from 'react';
import { StyleSheet, Text, View ,StatusBar,ScrollView,TouchableOpacity,TextInput,Alert,ActivityIndicator,AsyncStorage} from 'react-native';
import styles from './libraries/styles';
import {HytteNavBar} from './libraries/HytteComponents'
import Game from './screens/game'
import Player from './screens/player'



export default class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
      tabstatus:'',
      gameName:'',
      playerCount:'',
      loading:false,
      gameDetails:{},
      playerName:'',
    }

  this.create = this.create.bind(this);

  }

  create(){
    if(this.state.gameName == ''){
      Alert.alert('Enter game name')
    }
    else{
     this.setState({"loading":true})
     url= "https://mafias.herokuapp.com/api/createNewGame/?gameName="+this.state.gameName+"&playerCount="+this.state.playerCount
     console.log(url)
    return fetch(url)
      .then((response) => response.json())
      .then((responseArray) => {

        console.log(responseArray)
        if(responseArray.status == "success"){
                AsyncStorage.setItem("gameDetails",'{}');
                AsyncStorage.setItem("gameName",this.state.gameName);
                 this.setState({"loading":false})
                this.setState({"tabstatus":'game'})
                this.setState({"gameDetails":{}})


        }
        else{
        this.closeServiceModal()
        Alert.alert('Error',"Error in updateing service"+responseArray.message)

        }

        })
      .catch((error) => {
        
      });
    }
  }

  join(){

    if(this.state.gameName == ''){
      Alert.alert('Enter game name')
    }
    else{
     this.setState({"loading":true})
     url= "https://mafias.herokuapp.com/api/moderatorJoin/?gameName="+this.state.gameName
     console.log(url)
    return fetch(url)
      .then((response) => response.json())
      .then((responseArray) => {

        console.log(responseArray)
        if(responseArray.status == "success"){
          AsyncStorage.setItem("gameDetails",JSON.stringify(responseArray.message));
          AsyncStorage.setItem("gameName",this.state.gameName);
          this.setState({"loading":false})
          this.setState({"tabstatus":'game'})
          this.setState({"gameDetails":responseArray.message})
        }
        else{
        this.closeServiceModal()
        Alert.alert('Error',"Error in updateing service"+responseArray.message)

        }

        })
      .catch((error) => {
        
      });
    }
  }

  playerJoin(){
    if(this.state.gameName == ''){
      Alert.alert('Enter game name')
    }
    else{
     this.setState({"loading":true})
     url= "https://mafias.herokuapp.com/api/addPlayer/?gameName="+this.state.gameName+"&playerName="+this.state.playerName
     console.log(url)
    return fetch(url)
      .then((response) => response.json())
      .then((responseArray) => {
        console.log(responseArray)
        if(responseArray.status == "success"){
          AsyncStorage.setItem("gameName",this.state.gameName);
          this.setState({"loading":false})
          this.setState({"tabstatus":'player'})
        }else{
          Alert.alert('Error',"Error in updateing service"+responseArray.message)
        }
      })
      .catch((error) => {
        
      });
    }
  }

  render() {
    loading = this.state.loading

    indicator = <View></View>
    if(loading){

            indicator =   <ActivityIndicator size="large" color='#F79F1A' />
    }

    if(this.state.tabstatus == ''){
    return (
      <View style={{flex:1}}>
      <HytteNavBar title="Mafia Moderator"/>
      <StatusBar  barStyle="light-content"  backgroundColor="#F79F1A"/>
      <View style={[styles.creamBackGround,styles.splashScreen]}>
      <Text >Moderator Menu</Text>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity    underlayColor="white" style={{margin:5}} onPress={()=>this.setState({tabstatus:'create'})}>
            <View style={styles.smallOrangeButton} >
                  <Text style={[styles.smallButtonText,{color:'#fff'}]}>Create Game</Text>
                </View>
          </TouchableOpacity>

          <TouchableOpacity    underlayColor="white" style={{margin:5}} onPress={()=>this.setState({tabstatus:'join'})}>
            <View style={[styles.smallOrangeButton]} >
                  <Text style={[styles.smallButtonText,{color:'#fff'}]}>Join Game</Text>
                </View>
          </TouchableOpacity>
        </View>
        <Text >Player Menu</Text>
      <View >
      <TouchableOpacity underlayColor="white" onPress={()=>this.setState({tabstatus:'playerjoin'})}>
        <View style={[styles.smallOrangeButton]} >
              <Text style={[styles.smallButtonText,{color:'#fff'}]}>Player</Text>
            </View>
      </TouchableOpacity>
      </View>
      </View>
      </View>
    );
    }else if(this.state.tabstatus=='create'){
      return (
      <View style={{flex:1}}>
      <HytteNavBar title="Mafia Moderator"/>
      <StatusBar  barStyle="light-content"  backgroundColor="#F79F1A"/>
      <ScrollView style={styles.creamBackGround} >
      <View style={{justifyContent: 'center',alignItems: 'center'}}>
      <TextInput  style={[styles.primaryTextInput,{marginTop:25}]} placeholder="Game Name" autoCorrect={false}   onChangeText={(gameName) => this.setState({gameName})}/>
      <TextInput  style={[styles.primaryTextInput,{marginTop:25}]}    keyboardType='numeric' placeholder="Player Count" autoCorrect={false}   onChangeText={(playerCount) => this.setState({playerCount})}/>
      <TouchableOpacity onPress = {()=> this.create()}  style={{justifyContent: 'center',alignItems: 'center'}} underlayColor="white">
          <View style={styles.primaryButton} >
            <Text style={styles.buttonText}>Create</Text>
          </View>
        </TouchableOpacity>
      <Text onPress={()=>this.setState({tabstatus:'',loading:false})} style={styles.linkText}>Back</Text>
      {indicator}
      </View>
      </ScrollView>
      </View>
    );
    }else if(this.state.tabstatus=='join'){

      return (
      <View style={{flex:1}}>
      <HytteNavBar title="Mafia Moderator"/>
      <StatusBar  barStyle="light-content"  backgroundColor="#F79F1A"/>
      <ScrollView style={styles.creamBackGround}>
      <View style={{justifyContent: 'center',alignItems: 'center'}}>
      <TextInput  style={[styles.primaryTextInput,{marginTop:25}]} placeholder="Game Name" autoCorrect={false}   onChangeText={(gameName) => this.setState({gameName})}/>
      <TouchableOpacity onPress={() => this.join()}   style={{justifyContent: 'center',alignItems: 'center'}} underlayColor="white">
          <View style={styles.primaryButton} >
            <Text style={styles.buttonText}>Join</Text>
          </View>
        </TouchableOpacity>
      <Text onPress={()=>this.setState({tabstatus:'',loading:false})} style={styles.linkText}>Back</Text>
            {indicator}
      </View>
      </ScrollView>
      </View>
    );
    }else if(this.state.tabstatus=='playerjoin'){
      return (
      <View style={{flex:1}}>
      <HytteNavBar title="Player Menu"/>
      <StatusBar  barStyle="light-content"  backgroundColor="#F79F1A"/>
      <ScrollView style={styles.creamBackGround} >
      <View style={{justifyContent: 'center',alignItems: 'center'}}>
      <TextInput  style={[styles.primaryTextInput,{marginTop:25}]} placeholder="Game Name" autoCorrect={false}   onChangeText={(gameName) => this.setState({gameName})}/>
      <TextInput  style={[styles.primaryTextInput,{marginTop:25}]} placeholder="Your Name" autoCorrect={false}   onChangeText={(playerName) => this.setState({playerName})}/>
      <TouchableOpacity onPress = {()=> this.playerJoin()}  style={{justifyContent: 'center',alignItems: 'center'}} underlayColor="white">
          <View style={styles.primaryButton} >
            <Text style={styles.buttonText}>Join Game</Text>
          </View>
        </TouchableOpacity>
      <Text onPress={()=>this.setState({tabstatus:'',loading:false})} style={styles.linkText}>Back</Text>
      {indicator}
      </View>
      </ScrollView>
      </View>
    );
    }else if(this.state.tabstatus=='game'){
      return(
        <Game thisComponent={this}/>
        )
    }else if(this.state.tabstatus=='player'){
      return(
        <Player thisComponent={this}/>
        )
    }
  }
}

