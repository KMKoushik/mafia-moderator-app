import React from 'react';
import {Text, View,Image,TouchableOpacity,StatusBar,Dimensions,Platform,WebView,ActivityIndicator} from 'react-native';
import styles from './styles';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav'
import { Share } from 'react-native';


class HytteNavBar extends React.Component {
  render() {
        var {title} = this.props;
    return (
      <View>
        <NavBar style={styles}>
      <NavButtonText>
      </NavButtonText>
      <NavTitle style={styles.title}>
        {title}
      </NavTitle>
      <NavButtonText>
      </NavButtonText>
      </NavBar>
      </View>
    )
  }
}


class CardView extends React.Component {

  render() {
  	var { children,title,height,footer,titleColor,titleBackground} = this.props;

  	titleTag=<View></View>

  	if(title!="")
  	{
  		titleTag=
	  		<View style={[styles.cardViewTitle,{backgroundColor:titleBackground}]}>
	      		<Text style={[styles.cardViewText,{color:titleColor}]}>
	      			{title}
	      		</Text>
	     	 </View>
  	}


    return (
      <View style={[styles.cardView]}>
      {titleTag}
      <View style={{flex:3,padding:5,}}>
        {children}
       </View>
       <View style={styles.cardViewFooter}>
       {footer}
       </View>
      </View>
    )
  }
}

class NewsCardView extends React.Component {

  render() {
  	var { children,title,height,footer,titleColor,titleBackground,imgUri} = this.props;

    return (
      <View style={[styles.cardView,{height:height}]}>
      <Image style={styles.bgContainer} resizeMode='cover' source={{uri:imgUri}} />

      <View style={{flex:3,padding:5,}}>
        {children}
       </View>
       <View style={styles.cardViewFooter}>
       {footer}
       </View>
      </View>
    )
  }
}

class ProfileCard extends React.Component {

  render() {
  	var { children,title,height,footer,titleColor,titleBackground} = this.props;

  	titleTag=<View></View>

  	if(title!="")
  	{
  		titleTag=
	  		<View style={[styles.cardViewTitle,{backgroundColor:titleBackground}]}>
	      		<Text style={[styles.cardViewText,{color:titleColor}]}>
	      			{title}
	      		</Text>
	     	 </View>
  	}


    return (
      <View style={[styles.profileView,{height:height}]}>
      {titleTag}
      <View style={{flex:3,padding:5,}}>
        {children}
       </View>
       <View style={{flex:1}}>
       {footer}
       </View>
      </View>
    )
  }
}


class HytteWebView extends React.Component {

	constructor(props) {
    super(props);
    
    this.state = {loading:false}

  }
  render() {
  	const { children,uri,reactComponent,showHeader,title,onMessageEnable} = this.props;
  	loading = this.state.loading
  	console.log(loading)
  	indicator=<View></View>
  	header = <View></View>
  	

  	if(showHeader!=false){
  		header = 

  	<NavBar style={styles}>
      <StatusBar  barStyle="light-content"  backgroundColor="#F79F1A"/>

      <NavButton  style={{marginLeft:0}} onPress={() => reactComponent.setState({openNews:false,uri:''})}>
	      <NavButtonText style={styles.title}>
	        {"close"}
	      </NavButtonText>
      </NavButton>
      <NavTitle style={styles.title}>
        {title}
      </NavTitle>
      <NavButton   onPress={() => 
      	Share.share({
    		message: 'Try out M-Liv, One of the best app for People who like cars & bike',
    		url: uri,
    		title: 'M-Liv vehicle news'
  			})}>
	      <NavButtonText style={styles.title}>
	        {"share"}
	      </NavButtonText>
      </NavButton>
      </NavBar>

  	}
  	
    return (
      <View style={{flex:1}}>
      {header}
      <WebView source={{uri: uri}} scalesPageToFit={false} onMessage={onMessageEnable ? (event) => this.onMessage(event,onMessageEnable,reactComponent) : null } renderLoading={() => {return(<View style={styles.splashScreen}><ActivityIndicator size="large" color='#F79F1A' /></View>)}}
   		startInLoadingState/>
      </View>

    )
}

onMessage(data,onMessageEnable,reactComponent) {
 
 if(onMessageEnable == true){
 	
 	 reactComponent.onMessage(data)
  	
  	}
}

}

module.exports={CardView,HytteWebView,NewsCardView,ProfileCard,HytteNavBar}