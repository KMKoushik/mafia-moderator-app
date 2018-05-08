import React from 'react';
import { StyleSheet, Text, View ,StatusBar,ScrollView,TouchableOpacity,TextInput,Alert,ActivityIndicator,AsyncStorage,ListView} from 'react-native';
import styles from '../libraries/styles';
import {HytteNavBar} from '../libraries/HytteComponents'
import constants from '../constants'

export default class App extends React.Component {


constructor(props) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    super(props);
    this.state = {
        rolelist:[],
        playerlist:[],
        playerDetail:{},
        datasource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2}),
        datasource1:new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2}),
        gameName:'',
        playerCount:'',
        loading:false,
        mafiaCount:0,
        civilian:0,
		joker:0,
        angel:0,
        detective:0,
        silencer:0,
        terrorist:0,
        sheela:0,
        gamestatus:'role',
    }
    AsyncStorage.getItem('gameDetails').then((value) => {
        gameDetails = JSON.parse(value);
        playerDetails = gameDetails.playerDetail;
        rolelist = [], playerlist = [];
        playerDetails && Object.keys(playerDetails).forEach(function(key) {
          playerlist.push(key);
          rolelist.push(constants.roleConstants[playerDetails[key]]);
        });
        this.state.rolelist = rolelist;
        this.state.playerlist = playerlist;
        this.setState({datasource : ds.cloneWithRows(this.state.rolelist)});
        this.setState({datasource1 : ds.cloneWithRows(this.state.playerlist)});
    });
}

componentWillMount(){

    AsyncStorage.getItem('gameDetails').then((value) => {
    jsonData = JSON.parse(value)
    this.setState({"gameDetails":jsonData})
    if(Object.keys(jsonData).length>0){
       this.setState({gamestatus:'player'});
    }
	});
    AsyncStorage.getItem('gameName').then((value) => {
    this.setState({"gameName":value})
	});
}

incrementCount(role){
		console.log(role)
	if(role==1){
		this.state.mafiaCount = this.state.mafiaCount+1;
		this.setState({mafiaCount:this.state.mafiaCount});
	}
	else if(role ==8){
		this.state.civilian = this.state.civilian+1;
		this.setState({civilian:this.state.civilian});
	}
    else if(role ==2){
		this.state.detective = this.state.detective+1;
		this.setState({detective:this.state.detective});
	}
    else if(role ==3){
		this.state.joker = this.state.joker+1;
		this.setState({joker:this.state.joker});
	}
    else if(role ==4){
		this.state.angel = this.state.angel+1;
		this.setState({angel:this.state.angel});
	}
    else if(role ==5){
		this.state.sheela = this.state.sheela+1;
		this.setState({sheela:this.state.sheela});
	}
    else if(role ==6){
		this.state.silencer = this.state.silencer+1;
		this.setState({silencer:this.state.silencer});
	}
    else if(role ==7){
		this.state.terrorist = this.state.terrorist+1;
		this.setState({terrorist:this.state.terrorist});
	}

}

decrementCount(role){

	if(role==1){
		this.state.mafiaCount = this.state.mafiaCount-1;
		this.setState({mafiaCount:this.state.mafiaCount});
	}
	else if(role ==8){
		this.state.civilian = this.state.civilian-1;
		this.setState({civilian:this.state.civilian});
	}
    else if(role ==2){
		this.state.detective = this.state.detective-1;
		this.setState({detective:this.state.detective});
	}
    else if(role ==3){
		this.state.joker = this.state.joker-1;
		this.setState({joker:this.state.joker});
	}
    else if(role ==4){
		this.state.angel = this.state.angel-1;
		this.setState({angel:this.state.angel});
	}
    else if(role ==5){
		this.state.sheela = this.state.sheela-1;
		this.setState({sheela:this.state.sheela});
	}
    else if(role ==6){
		this.state.silencer = this.state.silencer-1;
		this.setState({silencer:this.state.silencer});
	}
    else if(role ==7){
		this.state.terrorist = this.state.terrorist-1;
		this.setState({terrorist:this.state.terrorist});
	}
}
    
addRoles(){
    var roleJson = {}
    roleJson["1"] = this.state.mafiaCount
    roleJson["2"] = this.state.detective
    roleJson["3"] = this.state.joker
    roleJson["4"] = this.state.angel
    roleJson["5"] = this.state.sheela
    roleJson["6"] = this.state.silencer
    roleJson["7"] = this.state.terrorist
    roleJson["8"] = this.state.civilian
    url= "https://mafias.herokuapp.com/api/addRoles/?gameName="+this.state.gameName+"&roles="+JSON.stringify(roleJson);
    console.log(url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseArray) => {
        console.log(responseArray)
        if(responseArray.status == "success"){  
                 this.setState({"loading":false})
                 this.setState({"gamestatus":'player'})
        }
        else{
        this.closeServiceModal()
        Alert.alert('Error',"Error in updateing service"+responseArray.message)

        }

        })
      .catch((error) => {
        
      });
}

    assign(){

    if(this.state.gameName == ''){
      
      Alert.alert('Enter game name')
    }
    else{
     this.setState({"loading":true})
     url= "https://mafias.herokuapp.com/api/assignRoles/?gameName="+this.state.gameName
     console.log(url)
    return fetch(url)
      .then((response) => response.json())
      .then((responseArray) => {

        console.log(responseArray)
        if(responseArray.status == "success"){
            Alert.alert('Success',"Assigned Roles successfully")
        }
        else{
            Alert.alert('Error',"Error in updateing service"+responseArray.message)
        }

        })
      .catch((error) => {
        
      });
    }
  }
	render(){
        const {thisComponent} = this.props;
        gamestatus = this.state.gamestatus
		gamedetail = this.state.playerDetail

		if(gamestatus=='player'){
            return(
                <View style={{flex:1}}>
                  <HytteNavBar title="Mafia Moderator"/>
                  <StatusBar  barStyle="light-content"  backgroundColor="#F79F1A"/>
                  <TouchableOpacity onPress={() => this.assign()}   style={{justifyContent: 'center',alignItems: 'center'}} underlayColor="white">
                    <View style={styles.primaryButton} >
                      <Text style={styles.buttonText}>Assign Roles</Text>
                    </View>
                  </TouchableOpacity>
                    <View style={[styles.creamBackGround,{alignItems: 'center',flexDirection:'row'}]}>
                      {/*<Text>{JSON.stringify(gamedetail)}</Text>*/}
                      <ListView
                    dataSource={this.state.datasource.cloneWithRows(this.state.playerlist)}
                    renderRow={(data) => <View><Text>{data}</Text></View>}
                  />
                      <ListView
                    dataSource={this.state.datasource1.cloneWithRows(this.state.rolelist)}
                    renderRow={(data) => <View><Text>{data}</Text></View>}
                  />
                  </View>
                    <View ><Text onPress={()=>thisComponent.setState({tabstatus:'',loading:false})} style={styles.linkText}>Back</Text></View>
                  </View>
            )
   }else if(gamestatus=="role"){
        return(
        <View style={{flex:1}}>
         <HytteNavBar title="Mafia Moderator"/>
         <StatusBar  barStyle="light-content"  backgroundColor="#F79F1A"/>
         <View style={[styles.creamBackGround,{alignItems: 'center'}]}>
             <View style={{flexDirection:'row',padding:10,marginTop:10}}>
             <Text style={{fontSize:18}}>Mafia</Text>
             <Text onPress={()=>this.incrementCount(1)} style={{color:'#1c58d8',fontSize:20,marginLeft:50}}>+</Text>
             <Text style={{fontSize:18,marginLeft:18}}>{this.state.mafiaCount}</Text>
              <Text onPress={()=>this.decrementCount(1)} style={{color:'#1c58d8',fontSize:20,marginLeft:18}}>-</Text>
             </View>

             <View style={{flexDirection:'row',padding:10,marginTop:10}}>
             <Text style={{fontSize:18}}>Civilian</Text>
             <Text onPress={()=>this.incrementCount(8)} style={{color:'#1c58d8',fontSize:20,marginLeft:50}}>+</Text>
             <Text style={{fontSize:18,marginLeft:18}}>{this.state.civilian}</Text>
              <Text onPress={()=>this.decrementCount(8)} style={{color:'#1c58d8',fontSize:20,marginLeft:18}}>-</Text>
             </View>

             <View style={{flexDirection:'row',padding:10,marginTop:10}}>
             <Text style={{fontSize:18}}>Joker</Text>
             <Text onPress={()=>this.incrementCount(3)} style={{color:'#1c58d8',fontSize:20,marginLeft:50}}>+</Text>
             <Text style={{fontSize:18,marginLeft:18}}>{this.state.joker}</Text>
              <Text onPress={()=>this.decrementCount(3)} style={{color:'#1c58d8',fontSize:20,marginLeft:18}}>-</Text>
             </View>

             <View style={{flexDirection:'row',padding:10,marginTop:10}}>
             <Text style={{fontSize:18}}>Angel</Text>
             <Text onPress={()=>this.incrementCount(4)} style={{color:'#1c58d8',fontSize:20,marginLeft:50}}>+</Text>
             <Text style={{fontSize:18,marginLeft:18}}>{this.state.angel}</Text>
              <Text onPress={()=>this.decrementCount(4)} style={{color:'#1c58d8',fontSize:20,marginLeft:18}}>-</Text>
             </View>

             <View style={{flexDirection:'row',padding:10,marginTop:10}}>
             <Text style={{fontSize:18}}>Detective</Text>
             <Text onPress={()=>this.incrementCount(2)} style={{color:'#1c58d8',fontSize:20,marginLeft:50}}>+</Text>
             <Text style={{fontSize:18,marginLeft:18}}>{this.state.detective}</Text>
              <Text onPress={()=>this.decrementCount(2)} style={{color:'#1c58d8',fontSize:20,marginLeft:18}}>-</Text>
             </View>

             <View style={{flexDirection:'row',padding:10,marginTop:10}}>
             <Text style={{fontSize:18}}>Sheela</Text>
             <Text onPress={()=>this.incrementCount(5)} style={{color:'#1c58d8',fontSize:20,marginLeft:50}}>+</Text>
             <Text style={{fontSize:18,marginLeft:18}}>{this.state.sheela}</Text>
              <Text onPress={()=>this.decrementCount(5)} style={{color:'#1c58d8',fontSize:20,marginLeft:18}}>-</Text>
             </View>

             <View style={{flexDirection:'row',padding:10,marginTop:10}}>
             <Text style={{fontSize:18}}>Terrorist</Text>
             <Text onPress={()=>this.incrementCount(7)} style={{color:'#1c58d8',fontSize:20,marginLeft:50}}>+</Text>
             <Text style={{fontSize:18,marginLeft:18}}>{this.state.terrorist}</Text>
              <Text onPress={()=>this.decrementCount(7)} style={{color:'#1c58d8',fontSize:20,marginLeft:18}}>-</Text>
             </View>

             <View style={{flexDirection:'row',padding:10,marginTop:10}}>
             <Text style={{fontSize:18}}>Silencer</Text>
             <Text onPress={()=>this.incrementCount(6)} style={{color:'#1c58d8',fontSize:20,marginLeft:50}}>+</Text>
             <Text style={{fontSize:18,marginLeft:18}}>{this.state.silencer}</Text>
              <Text onPress={()=>this.decrementCount(6)} style={{color:'#1c58d8',fontSize:20,marginLeft:18}}>-</Text>
             </View>

             <TouchableOpacity onPress={() => this.addRoles()}   style={{justifyContent: 'center',alignItems: 'center'}} underlayColor="white">
              <View style={styles.primaryButton} >
                <Text style={styles.buttonText}>Join</Text>
              </View>
            </TouchableOpacity>
         </View>
         </View>
         );

    }
	}

}