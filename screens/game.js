import React from 'react';
import { StyleSheet, Text, View ,StatusBar,ScrollView,TouchableOpacity,TextInput,Alert,ActivityIndicator,AsyncStorage} from 'react-native';
import styles from '../ReactLibrary/styles';
import {HytteNavBar} from '../ReactLibrary/HytteComponents'

export default class App extends React.Component {


constructor(props) {
      super(props);
      this.state = {
          tabstatus:'',
          gamestatus:'role',
          gameName:'',
          playerCount:'',
          loading:false,
          gameDetails:{},
          mafiaCount:0,
          civilian:0,
          joker:0,
          angel:0,
          detective:0,
          silencer:0,
          terrorist:0,
          sheela:0,
     
    }
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

	render(){
		gamedetail = this.state.gameDetails
        gamestatus = this.state.gamestatus
		console.log(this.state.gameDetails)

		if(gamestatus=='player')
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