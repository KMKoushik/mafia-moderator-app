import React from 'react';
import { StyleSheet, Text, View ,StatusBar,ScrollView,TouchableOpacity,TextInput,Alert,ActivityIndicator,AsyncStorage,ListView} from 'react-native';
import styles from '../libraries/styles';
import {HytteNavBar} from '../libraries/HytteComponents'
import constants from '../constants'

export default class Player extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            currentRole:0,
            name:'',
            gameName:'',
        }
        this.syncRoleNow()
    }

    syncRoleNow(){
        const {thisComponent} = this.props;
        url= "https://mafias.herokuapp.com/api/getRole/?gameName=" + thisComponent.state.gameName + "&playerId=" + thisComponent.state.playerName
        console.log(url)
        return fetch(url)
        .then((response) => response.json())
        .then((responseArray) => {
            console.log(responseArray)
            if(responseArray.status == "success"){
                //Alert.alert('Success',"Assigned Roles successfully")
                this.setState({currentRole:responseArray.message.role})
            }
            else{
                Alert.alert('Error',"Error in updateing service"+responseArray.message)
            }
        })
        .catch((error) => {
            
        });
    }

    render(){
        const {thisComponent} = this.props;
        return(
            <View style={{flex:1}}>
                <HytteNavBar title="Mafia Moderator"/>
                <StatusBar  barStyle="light-content"  backgroundColor="#F79F1A"/>
                <View style={[styles.creamBackGround,styles.splashScreen]}>
                <Text> {constants.roleConstants[this.state.currentRole]}</Text>
                <TouchableOpacity underlayColor="white" onPress={()=>this.syncRoleNow()}>
                    <View style={[styles.smallOrangeButton]} >
                        <Text style={[styles.smallButtonText,{color:'#fff'}]}>Sync Now</Text>
                    </View>
                </TouchableOpacity>
                <Text onPress={()=>thisComponent.setState({tabstatus:'',loading:false})} style={styles.linkText}>Back</Text>
                </View>
            </View>
        )   
    }
}