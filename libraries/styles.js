
import { Platform,AppRegistry, StyleSheet} from 'react-native';

var riactClr = '#60b4f3';
var backgroundColor = '#fff';
var riactBtnClr = '#1485d8';
var minWidth = 300;
var minHeight =50;
var mlivClr = '#F79F1A';
var creamClr = '#f6f5ed';

module.exports= {

  splashScreen :{
    justifyContent:  'center' ,
    alignItems: 'center',
    flex:1,
    backgroundColor:backgroundColor,
  },

  cardView:{
    margin:5,
    padding: 5,
    backgroundColor:backgroundColor,
    borderWidth: .5,
  borderRadius: 3,
  borderColor: '#ddd',
  shadowColor: '#000',
  shadowOffset: {width: 0, height: .3},
  shadowOpacity: 0.5,
  shadowRadius: 1,
  },

  profileView:{
    height:150,
    backgroundColor:backgroundColor,
  borderRadius: 3,
  borderColor: '#ddd',
  shadowColor: '#000',
  shadowOffset: {width: 0, height: .3},
  shadowOpacity: 0.5,
  shadowRadius: 1,
  },

  profileViewTitle:{
   marginTop:10,
    fontSize : 30,
    color: 'black',
  },

  cardViewTitle:{
  borderColor: '#ddd',
      borderBottomWidth: 1,
    backgroundColor:'#1c58d8',

  },

  cardViewText:{
    fontSize: 16,
    fontWeight: 'bold',
    padding:6,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    color:'#fff'
  },

  cardViewFooter:{
    padding:6,
  },

  creamBackGround:{
    flex:1,
    margin:10,
    backgroundColor:creamClr
  },

  scrollsplashScreen :{
    justifyContent: (Platform.OS === 'ios') ? 'center' : 'flex-start',
    alignItems: 'center',
    flex:1,
    backgroundColor:backgroundColor,
  },

  scrollViewContainer :{
  flex: 1,
  },

  centerAlignView:{
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerAlignText :{
       textAlign: 'center',
    justifyContent: 'center',

  },

  appHeader :
  {
    backgroundColor: (Platform.OS === 'ios') ? '#F3B059':'#F3B059',
    flexDirection: 'column',
    justifyContent: 'space-between'

  },


  //Nav Bar Style starts Here 
  statusBar: {
    backgroundColor: (Platform.OS === 'ios') ?mlivClr: '#d88b15', 
  },
  navBar: {
    backgroundColor: mlivClr,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  
 title: {
    // NavButtonText styles here (all text styles are valid) 
 
    // default styles: 
    justifyContent:'center',
    alignItems : 'center',
    color:'#ffffff',
        backgroundColor: mlivClr,

  },

  linkText:{
    color:'#1c58d8',
    marginTop:10,
    marginBottom:10,
    textDecorationLine:'underline'
  },

  sliderSelectedView:{
      flex:3,
      borderBottomWidth: 3,
      borderColor: '#F79F1A',
  },
  
  sliderSelectedText:{
    textAlign: 'center',
    fontSize:15,
    fontWeight: 'bold',
    color:"#F79F1A"
  },

  sliderNotSelectedView:{
      flex:3,
  },
  
  sliderNotSelectedText:{
    textAlign: 'center',
    fontSize:15,
    fontWeight: 'bold',
  },


smallButtonText:{
    color:'#1c58d8',
    marginTop:10,
    marginBottom:10,
  },


  navTitle:{
    justifyContent:'center',
    alignItems : 'center',
    backgroundColor: mlivClr,
  },


  //Nav Bar ends here

  tableHeader:{
    color: '#24bc09',//#1c58d8'#24bc09'
    fontSize:18,
    fontWeight: 'bold',
    marginTop:10,

  },


  headerText :
  {
   textAlign: 'center',
   marginTop:10,
    fontSize : 20,
    color: 'black',
  },

mlivWelcomeText :
  {
   textAlign: 'center',
   marginTop:15,
    fontSize : 30,
    color: '#F79F1A',
  },

  appBody :{
    
    alignItems: 'center',

  },
   primaryButton: {
    minWidth : minWidth,
    minHeight :minHeight,
    borderRadius: 7,
    marginTop:12,
    marginBottom:12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F79F1A',
    
  },
  smallWhiteButton: {
    width : 150,
    minHeight :30,
    borderRadius: 7,
    marginTop:12,
    marginBottom:12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: .5,
    borderColor: '#000',
  },
  smallOrangeButton: {
    width : 150,
    minHeight :30,
    borderRadius: 7,
    marginTop:12,
    marginBottom:12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mlivClr,
  },

  roundButton : {
     minWidth : minWidth,
    minHeight :minHeight,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F79F1A',
  },
  buttonText: {
    fontSize : (Platform.OS === 'ios') ? 20 : 13,
    color: 'white'
  },
  primaryTextInput : {
    minWidth : minWidth,
    marginBottom : (Platform.OS === 'ios')?12:6,
    marginTop:(Platform.OS === 'ios') ?12:6,
    minHeight :50,
    borderRadius: 7,
    padding : 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: (Platform.OS === 'ios') ? 'gray':'#fff',
    borderWidth: 1
  },
  multiLineTextInput : {
    minWidth : minWidth,
    marginBottom : (Platform.OS === 'ios')?12:6,
    marginTop:(Platform.OS === 'ios') ?12:6,
        fontSize : 17,
    minHeight :80,
    borderRadius: 7,
    padding : 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: (Platform.OS === 'ios') ? 'gray':'#fff',
    borderWidth: 1
  },

  welcomeText:{
    fontSize : 20,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom:(Platform.OS === 'ios') ?30:15,
  },

  headLineText:{
    fontWeight: 'bold',
    fontSize : 15,

  },

  newsContent:{
    fontSize : 14,
    marginTop:4,

  },

  imageTitleText:{

    fontSize : 11,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop:5,
    color:mlivClr,
        fontWeight: 'bold',

  },
  welcomeTextWhite:{
    padding:10,
    fontSize : 20,
    color : '#fff',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom:(Platform.OS === 'ios') ?30:15,
  },

  riactButton:{
    minWidth : minWidth,
    minHeight :minHeight,
    borderRadius: 7,
    marginTop:12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: riactBtnClr,

  },



  listViewContainer: {
        alignItems:'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center',
    },
  listitem: {
        backgroundColor: '#C2DFFF',
        margin: 12,
        width: 150,
        height:60,
        justifyContent:'center',
        alignItems:'center'

  },

    documentListViewContainer: {
        alignItems:'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center',


    },
    documentListitem: {
        width : 150,
        minHeight :30,
        borderRadius: 7,
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: .5,
        borderColor: '#000',
    },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2632b',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a22af1',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d13030',
  },

  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c357a',
  },
bgContainer: { flex:1, width: 300, height: 400 } ,

actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  listItemText:{
        fontSize :17,
  },

transparentButton: {
    width : 100,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#000',

  },

  mlivBackgroundClr:{
    backgroundColor:mlivClr
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  innerContainer: {
    alignItems: 'center',
  },

}
