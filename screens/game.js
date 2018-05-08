import React from 'react';
import { StyleSheet, Text, View ,StatusBar,ScrollView,TouchableOpacity,TextInput,Alert,ActivityIndicator,AsyncStorage,ListView} from 'react-native';
import styles from '../ReactLibrary/styles';
import {HytteNavBar} from '../ReactLibrary/HytteComponents'
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
        tabstatus:'',
        gameName:'',
        playerCount:'',
        loading:false,
        mafiaCount:0,
        civilian:0,
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
}

	render(){
        
		gamedetail = this.state.playerDetail

		if(this.state.playerDetail)
		{
		return(
			<View style={{flex:1}}>
      <HytteNavBar title="Mafia Moderator"/>
      <StatusBar  barStyle="light-content"  backgroundColor="#F79F1A"/>
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
      </View>
			)
	}
	else{
	return(
	<View style={{flex:1}}>s
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
     </View>
     </View>
     );

	}
	}

}