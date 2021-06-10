import React, { Component } from 'react';  
import { AppRegistry, FlatList,  
    StyleSheet, Text, View,Alert, SafeAreaView, TouchableOpacity, Image, Platform, PermissionsAndroid, ActivityIndicator } from 'react-native';  
import MapView, { Marker } from 'react-native-maps';
  
import Geolocation from '@react-native-community/geolocation';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
 
export default class List extends Component {  
    state={
        data:null,screen:false,selected:null,lat:null,long:null,pos:null
    }
  
      async requestLocationPermission () {
        if (Platform.OS === 'ios') {
          this.getOneTimeLocation();
          this.subscribeLocationLocation();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Access Required',
                message: 'This App needs to Access your location',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //To Check, If Permission is granted
              this.getOneTimeLocation();
              this.subscribeLocationLocation();
            } else {
              console.log('Permission Denied');
            }
          } catch (err) {
            console.warn(err);
          }
        }
      };
   
        getOneTimeLocation = () => { 
        Geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => { 
    
            //getting the Longitude from the location json
            const currentLongitude = 
              JSON.stringify(position.coords.longitude);
    
            //getting the Latitude from the location json
            const currentLatitude = 
              JSON.stringify(position.coords.latitude);
    //  console.log(position.coords);
     this.setState({pos:position});
     this.get_data();  
          },
          (error) => {
            console.log(error.message);
          },
          {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
          },
        );
      };
    
   subscribeLocationLocation = () => {
        Geolocation.watchPosition(
          (position) => {
            //Will give you the location on location change
             
            console.log(position);
    
            //getting the Longitude from the location json        
            const currentLongitude =
              JSON.stringify(position.coords.longitude);
    
            //getting the Latitude from the location json
            const currentLatitude = 
              JSON.stringify(position.coords.latitude);
    
            //Setting Longitude state
        //  console.log(position.coords);
          },
          (error) => {
            console.log(error.message);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 1000
          },
        );
      };




    async get_data(){


        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          

          

          fetch("https://api.openweathermap.org/data/2.5/find?lat="+this.state.pos.coords.latitude+"&lon="+this.state.pos.coords.longitude+"&cnt=50&units=metric&appid=5c3091a1ce4e94e53d89e67771c23ee6", requestOptions)
            .then(response => response.json())
            .then((result) => {this.setState({data:result.list}),this.get_weather()})
            .catch(error => console.log('error', error));
            // console.log(this.state.data);
      
         
           
           }

           async get_weather(){


            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
              
              fetch("https://api.openweathermap.org/data/2.5/weather?lat="+this.state.pos.coords.latitude+"&lon="+this.state.pos.coords.longitude+"&units=metric&appid=5c3091a1ce4e94e53d89e67771c23ee6", requestOptions)
                .then(response => response.json())
                .then((result) => {this.noti(result)})
                .catch(error => console.log('error', error));
                // console.log(this.state.data);
          
             
               
               }


noti(data){
  console.log(data);
  const timeElapsed = Date.now()+ (3 * 1000);
  // console.log(timeElapsed);
const today = new Date(timeElapsed);
Platform.OS=="ios" ? PushNotificationIOS.scheduleLocalNotification({alertBody:"Alert noti",fireDate:today.toISOString(),alertTitle:"Notifi",})
:null;
 

  PushNotification.createChannel(
    {
      channelId: "1", // (required)
      channelName: "My channel", // (required)
      // channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      // playSound: false, // (optional) default: true
    //  importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      // vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  PushNotification.localNotificationSchedule({
    channelId:'1',
    message: "Current Temparature "+data.main.temp+"\u2103",
    largeIconUrl:'https://www.iconsdb.com/icons/preview/white/clouds-xxl.png', // (required)
    number: 1,
    title:"Weathe App",
    date: new Date(Date.now() + (3 * 1000)) // in 3 secs
  });
}

           go(item){
             console.log(item);
             this.setState({selected:item})
             this.props.navigation.navigate('details',{'data':item,'pos':this.state.pos})
           }
    componentDidMount(){
        this.requestLocationPermission();


    }
  
    //handling onPress action  
    getListViewItem = (item) => {  
        Alert.alert(item.key);  
    }  
  
    render() {  
        if(this.state.data)
        return (  
            <SafeAreaView >
                <View  >  
                    <View style={{padding:15,backgroundColor:"#00804A",justifyContent:"center",alignItems:"center"}}>
<Text style={{fontSize:20,color:"white",fontWeight:"500"}}>Weather App</Text>
                    </View>
                <FlatList  
                    data={this.state.data}  
                    style={{backgroundColor:"white"}}
                    renderItem={({item}) =>  
                    <TouchableOpacity onPress={()=>this.go(item)} style={{flexDirection:'row',borderBottomWidth:0.2,borderBottomColor:"grey",justifyContent:"space-between",alignItems:"center"}}>
                        <View>
                        <Text style={styles.item}  
                               >{item.name}</Text>
                         <Text style={styles.item}  
                              >{item.weather[0].main+" ("+item.weather[0].description+")"}</Text>
                              </View>
                              <Text style={styles.item}  
                            >{item.main.temp}<Text style={{fontSize:20}}>{"\u2103"}</Text></Text>
                         
                              </TouchableOpacity>
                              
                              }   
                />  
                </View>
            </SafeAreaView>  
        );else {
            return(
              <ActivityIndicator
              color='#17868b'
              animating={true}
              style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
              }}
              size={50}
          />
            )
        }
    }  
}  
  
const mapStyle = [
    {elementType: 'geometry', },
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}],
    },
  ];

const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
    },  
    item: {  
        padding: 10,  
        fontSize: 18,  
        height: 44,  
    },  
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
})  
  
   