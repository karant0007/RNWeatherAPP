import React, { Component } from 'react';  

import { AppRegistry, FlatList,  
    StyleSheet, Text, View,Alert, SafeAreaView, TouchableOpacity, Image, Platform, PermissionsAndroid, ActivityIndicator } from 'react-native';  
    import MapView, { Marker } from 'react-native-maps';
  
    import Geolocation from '@react-native-community/geolocation';

export default class Details extends Component{
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
     console.log(position.coords);
     this.setState({pos:position});
  
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
         console.log(position.coords);
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


componentDidMount(){
   this.setState({selected:this.props.route.params.data,pos:this.props.route.params.pos});
    // this.requestLocationPermission();
}

    render(){ 
        if(this.state.selected){
        return(
<SafeAreaView style={{flex:1,backgroundColor:"white"}}>
 <View style={{padding:15,backgroundColor:"#00804A",justifyContent:"center",flexDirection:"row",alignItems:"center",}}>
  <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{position:"absolute",left:10}}>
       <Image source={require('../assets/left-arrow.png')} style={{height:20,width:20,}}/>
</TouchableOpacity>
<Text style={{fontSize:20,color:"white",fontWeight:"500"}}>Weather App</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"grey"}}>
                    <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude:this.state.pos.coords.latitude,
            longitude: this.state.pos.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}>
          <Marker
            draggable
            coordinate={{
              latitude: this.state.pos.coords.latitude,
              longitude: this.state.pos.coords.longitude,
            }}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'Test Marker'}
            description={'This is a description of the marker'}
          />
        </MapView>
                    </View>
                    <View style={{flexDirection:"row"}}>
<View style={{justifyContent:"center",alignSelf:"flex-start",marginBottom:30,margin:5}}> 

<Text style={{fontSize:20,fontWeight:"bold",padding:10}}>{this.state.selected.name}</Text>
<Text style={styles.item}  
                              >{this.state.selected.weather[0].main+" ("+this.state.selected.weather[0].description+")"}</Text>
<Text style={styles.item}>Humidity: {this.state.selected.main.humidity}</Text>
                         <Text style={styles.item}>Wind Speed: {this.state.selected.main.humidity}</Text>
                         <Text style={styles.item}>Max. Temp: {this.state.selected.main.temp_max}<Text style={{fontSize:20}}>{"\u2103"}</Text></Text>
                         <Text style={styles.item}>Min. Temp: {this.state.selected.main.temp_min}<Text style={{fontSize:20}}>{"\u2103"}</Text></Text>
                         
                      
</View> 

<View style={{justifyContent:"center",flex:1,alignItems:"center"}}>
<Text style={{fontSize:25}}  
                            >{this.state.selected.main.temp}<Text style={{fontSize:25}}>{"\u2103"}</Text></Text>
                            <Image source={require('../assets/cloud.png')} style={{height:150,width:150}}/>
</View>
</View>
 </SafeAreaView>
        );}
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
        );
        
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
  