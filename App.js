import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React, { Component } from 'react';  
import { AppRegistry, FlatList,  
    StyleSheet, Text, View,Alert, SafeAreaView, TouchableOpacity, Image, Platform, PermissionsAndroid } from 'react-native';  
import PushNotification from 'react-native-push-notification';
// import MapView, { Marker } from 'react-native-maps';
import routes from "./src/routes/routes";

const App = routes;

export default App; 
// import Geolocation from '@react-native-community/geolocation';
// import RNLocalNotifications from 'react-native-local-notifications';
 
// export default class App extends Component {  
//     state={
//         data:null,screen:false,selected:null,lat:null,long:null,pos:null
//     }
  
//     // constructor(){
//     //   PushNotification.configure({
//     //     // (optional) Called when Token is generated (iOS and Android)
//     //     onRegister: function (token) {
//     //       console.log("TOKEN:", token);
//     //     },
      
//     //     // (required) Called when a remote is received or opened, or local notification is opened
//     //     // onNotification: function (notification) {
//     //     //   console.log("NOTIFICATION:", notification);
      
//     //     //   // process the notification
      
//     //     //   // (required) Called when a remote is received or opened, or local notification is opened
//     //     //   notification.finish(PushNotificationIOS.FetchResult.NoData);
//     //     // },
      
//     //     // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
//     //     onAction: function (notification) {
//     //       console.log("ACTION:", notification.action);
//     //       console.log("NOTIFICATION:", notification);
      
//     //       // process the action
//     //     },
      
//     //     // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
//     //     // onRegistrationError: function(err) {
//     //     //   console.error(err.message, err);
//     //     // },
      
//     //     // IOS ONLY (optional): default: all - Permissions to register.
//     //     permissions: {
//     //       alert: true,
//     //       badge: true,
//     //       sound: true,
//     //     },
      
//     //     // Should the initial notification be popped automatically
//     //     // default: true
//     //     popInitialNotification: true,
      
//     //     /**
//     //      * (optional) default: true
//     //      * - Specified if permissions (ios) and token (android and ios) will requested or not,
//     //      * - if not, you must call PushNotificationsHandler.requestPermissions() later
//     //      * - if you are not using remote notification or do not have Firebase installed, use this:
//     //      *     requestPermissions: Platform.OS === 'ios'
//     //      */
//     //     requestPermissions: true,
//     //   });
//     // }

//     componentDidMount(){
//       const timeElapsed = Date.now()+ (3 * 1000);
//       console.log(timeElapsed);
// const today = new Date(timeElapsed);
// PushNotificationIOS.scheduleLocalNotification({alertBody:"Alert noti",fireDate:today.toISOString(),alertTitle:"Notifi",});

     

//       PushNotification.createChannel(
//         {
//           channelId: "1", // (required)
//           channelName: "My channel", // (required)
//           // channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
//           // playSound: false, // (optional) default: true
//         //  importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
//           // vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
//         },
//         (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
//       );
//       PushNotification.localNotificationSchedule({
//         channelId:'1',
//         message: "My Schedule Notification Message", // (required)
//         number: 1,
//         date: new Date(Date.now() + (3 * 1000)) // in 3 secs
//       });
//     }
  
//     //handling onPress action  
 
  
//     render() {   
//         return (  
//             <SafeAreaView >
//                 <View  >  
//                     <View style={{padding:15,backgroundColor:"#00804A",justifyContent:"center",alignItems:"center"}}>
// <Text style={{fontSize:20,color:"white",fontWeight:"500"}}>Weather App</Text>
//                     </View>
               
//                 </View>
//             </SafeAreaView>  
//         );
//         }
//     }  



// const styles = StyleSheet.create({  
//     container: {  
//         flex: 1,  
//     },  
//     item: {  
//         padding: 10,  
//         fontSize: 18,  
//         height: 44,  
//     },  
//     mapStyle: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//       },
// })  
  
   