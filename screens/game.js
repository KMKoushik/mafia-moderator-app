import React from 'react';
import { StyleSheet, Text, View ,StatusBar,ScrollView,TouchableOpacity,TextInput,Alert,ActivityIndicator,AsyncStorage} from 'react-native';
import styles from '../ReactLibrary/styles';
import {HytteNavBar} from '../ReactLibrary/HytteComponents'

export default class App extends React.Component {


constructor(props) {
      super(props);
      this.state = {
      tabstatus:'',
      gameName:'',
      playerCount:'',
      loading:false,
      gameDetails:{},
      mafiaCount:0,
      civilian:0,
    }
}

componentWillMount(){

    AsyncStorage.getItem('gameDetails').then((value) => {

    this.setState({"gameDetails":JSON.parse(value)})

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
		gamedetail = this.state.gameDetails
		console.log(this.state.gameDetails)

		if(this.state.gameDetails.playerDetail)
		{
		return(
			<View style={{flex:1}}>
      <HytteNavBar title="Mafia Moderator"/>
      <StatusBar  barStyle="light-content"  backgroundColor="#F79F1A"/>
      <View style={[styles.creamBackGround,{alignItems: 'center',flexDirection:'row'}]}>
       <Text>{JSON.stringify(gamedetail)}</Text>
      </View>
      </View>
			)
	}
	else{
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
     </View>
     </View>
     );

	}
	}

}