import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import AnnonceService from './service/AnnonceService'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useTheme } from '@react-navigation/native';
import { PermissionsAndroid } from 'react-native';
import { ConfirmDialog  } from 'react-native-simple-dialogs';
import { useIsFocused } from '@react-navigation/native'

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Location Permission',
        'message': 'This app needs access to your location',
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
    } else {
      console.log("Location permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const MapScreen=({navigation})=>{
  const isFocused = useIsFocused();
    const initialMapState = {
        region: {
            latitude: 31.7923,
            longitude:-7.0801,
            latitudeDelta:10,
            longitudeDelta:10
        },
      };
      const [AllAnnonces, setAllAnnonces] = React.useState([]);
      const [ListPictures, setListPictures] = React.useState([]);
      const [Types, setTypes] = React.useState([]);
      const [ToggleFilter, setToggleFilter] = React.useState(false);
      const [enableGPS, setenableGPS] = React.useState(false);
      const [enableSlideshow, setenableSlideshow] = React.useState(true);
      const [enableAdd, setenableAdd] = React.useState(false);
      const [dialogVisible,setdialogVisible]=React.useState(false);
      const [AlertAddAnnonce,setAlertAddAnnonce]=React.useState(false);
      const [categorieElement,setCategorie]=React.useState("");
      const [addedCoordinate,setAddedCoordinate]=React.useState({
        latitude:0,
        longitude:0
      });
      let mapIndex = 0;
      let mapAnimation = new Animated.Value(0);

      useEffect(() => {
        AnnonceService.GetAcceptsAnnonces().then(
          result=>{
            setAllAnnonces(result.data)
          }
        ).then(
          AnnonceService.GetAllPictures().then(
            result1=>{
              setListPictures(result1.data)
            }
          )
        ).then(
          setAddedCoordinate({
            latitude:0,
            longitude:0
          })
        )
      }, [isFocused]);
      useEffect(() => {
        mapAnimation.addListener(({ value }) => {
          let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
          if (index >= AllAnnonces.length) {
            index = AllAnnonces.length - 1;
          }
          if (index <= 0) {
            index = 0;
          }
    
          clearTimeout(regionTimeout);
    
          const regionTimeout = setTimeout(() => {
            if( mapIndex !== index ) {
              mapIndex = index;
              const  coordinate  = {
                latitude: AllAnnonces[index].lat,
                longitude: AllAnnonces[index].lon,
              };
              _map.current.animateToRegion(
                {
                  ...coordinate,
                  latitudeDelta: initialMapState.region.latitudeDelta,
                  longitudeDelta: initialMapState.region.longitudeDelta,
                },
                350
              );
            }
          }, 10);
        });
      });
      const handelUserLocation=()=>{
        requestLocationPermission()
        Geolocation.getCurrentPosition(info => {
          const  coordinate  = {
            latitude: info.latitude,
            longitude: info.longitude,
          };
            _map.current.animateToRegion(
            {
            ...coordinate,
            latitudeDelta: initialMapState.region.latitudeDelta,
            longitudeDelta: initialMapState.region.longitudeDelta,
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 100000, maximumAge: 1000 }
            ); 
        
        }
          )
          // setdialogVisible(false);
        
      }
      const AddElement=(e)=>{
        let element=e.nativeEvent.coordinate;
        console.log(element)
        if(enableAdd){
          setAddedCoordinate(element)
          navigation.navigate('AddAnnonce',{lon:element.longitude,lat:element.latitude})
        }
      }
      const interpolations = AllAnnonces.map((annonce) => {
        let index=AllAnnonces.indexOf(annonce);
        const inputRange = [
          (index - 1) * CARD_WIDTH,
          index * CARD_WIDTH,
          ((index + 1) * CARD_WIDTH),
        ];
    
        const scale = mapAnimation.interpolate({
          inputRange,
          outputRange: [1, 1.5, 1],
          extrapolate: "clamp"
        });
    
        return { scale };
      });
    const GetAllTypes=(categorie)=>{
        setTypes([]);
        setCategorie(categorie.toString())
        if(categorie=="typebien"){
            AnnonceService.GetAllTypeBien().then(
                result=>{
                    setTypes(result.data.concat({
                      id:9000,
                      type:"Tous"
                    }))
                }
            )
        }
        else{
            AnnonceService.GetAllTypeOperation().then(
                result=>{
                    setTypes(result.data.concat({
                      id:9000,
                      type:"Tous"
                    }))
                }
            )
        }
    }
    const GetPicture=(id_annonce)=>{
      let foundElements=ListPictures.filter(e=>e.id_annonce==id_annonce)
      if(foundElements.length!=0){
        return foundElements[0].image
      }
    }
    const FilterMap=(typeid)=>{
      console.log(typeid)
     if(typeid==9000){
        AnnonceService.GetAcceptsAnnonces().then(
          result=>{
            setAllAnnonces(result.data)
          }
        )
      }
      else if(categorieElement=="typebien"){
        setAllAnnonces(AllAnnonces.filter(e=>e.type_bien==typeid))
      }
      else{
        setAllAnnonces(AllAnnonces.filter(e=>e.type_operation==typeid))
      }
    }
    const onMarkerPress = (mapEventData) => {
      const markerID = mapEventData;
      //  console.log(markerID)
      let x = (markerID * CARD_WIDTH) + (markerID * 20); 
  
      _scrollView.current.scrollTo({x: x, y: 0, animated: true});
    }
    const [state, setState] = React.useState(initialMapState);
    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);
    return(
        <View style={styles.container}>
             <MapView
               onPress={(e)=>AddElement(e)}
             showsUserLocation={enableGPS}
                ref={_map}
                zoomEnabled={true}
                    scrollEnabled={true}
                    showsScale={true}
                initialRegion={state.region}
                style={styles.container}
                provider={PROVIDER_GOOGLE}
            >
                {
                 AllAnnonces.map((annonce)=>{
                  let index=AllAnnonces.indexOf(annonce);
                  const scaleStyle = {
                    transform: [
                      {
                        scale: interpolations[index].scale,
                      },
                    ],
                  };
                    return (
                        <MapView.Marker key={annonce.id} 
                        coordinate={{
                            latitude: annonce.lat,
                             longitude: annonce.lon,
                        }}
                          onPress={(e)=>onMarkerPress(AllAnnonces.indexOf(annonce))}
                         >
                          <Animated.View style={[styles.markerWrap]}>
                            <Animated.Image
                              source={require('../assets/marker.png')}
                              style={[styles.marker,
                                 scaleStyle
                              ]}
                              resizeMode="cover"
                            />
                          </Animated.View>
                        </MapView.Marker>
                      );
                 }
                )   
                }
                  <MapView.Marker key={3000000} 
                        coordinate={{
                            latitude:addedCoordinate.latitude ,
                             longitude: addedCoordinate.longitude
                        }}
                         >
                          <Animated.View style={[styles.markerWrap]}>
                            <Animated.Image
                              source={require('../assets/edit_marker.png')}
                              style={[styles.marker
                              ]}
                              resizeMode="cover"
                            />
                          </Animated.View>
                        </MapView.Marker>
            </MapView>
            {/* <ScrollView></ScrollView> */}
            {/* filter */}
                <TouchableOpacity  style={styles.searchBox}>
                <MaterialCommunityIcons name="filter-menu" color='#009387' size={26}
                onPress={(e)=>{
                    setToggleFilter(!ToggleFilter)
                    setTypes([])
                }}
                />
              </TouchableOpacity>
              {/* toggleEye */}
              <TouchableOpacity  style={styles.toggleEye}>
                {
                enableSlideshow?
                <MaterialCommunityIcons name="eye-outline" color='#009387' size={26}
                onPress={(e)=>{
                  setenableSlideshow(!enableSlideshow)
                }}
                />
                :
                <MaterialCommunityIcons name="eye-off-outline" color='#009387' size={26}
                onPress={(e)=>{
                  setenableSlideshow(!enableSlideshow)
                }}
                />
              }
              </TouchableOpacity>
              {/* yourposition */}
              <TouchableOpacity  style={styles.yourposition}>
                <MaterialCommunityIcons name="crosshairs-gps" color='#009387' size={26}
                onPress={(e)=>{
                  setdialogVisible(true);
                  // setenableGPS(true)
                }}
                />
              </TouchableOpacity>
              {/* addannonce */}
              <TouchableOpacity  style={styles.addannonce}>
                {
                  (enableAdd)?
                <MaterialCommunityIcons name="plus-thick" color='#8B0000' size={26}
                onPress={(e)=>{
                  setenableAdd(!enableAdd)
                }}
                />
                :
                <MaterialCommunityIcons name="plus-thick" color='#009387' size={26}
                onPress={(e)=>{
                  setenableAdd(!enableAdd)
                  setAlertAddAnnonce(true)
                }}
                />
              }
              </TouchableOpacity>
                {
                ToggleFilter && 
                <ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    height={50}
                    style={styles.chipsScrollFilter}
                    contentInset={{ // iOS only
                    top:0,
                    left:0,
                    bottom:0,
                    right:20
                    }}
                    contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0
                    }}
                >
                    <TouchableOpacity  style={styles.chipsItem}
                    onPress={()=>{
                        GetAllTypes("typeops")
                    }}
                    >
                        <Text>Type d'opération</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.chipsItem}
                      onPress={()=>{
                        GetAllTypes("typebien")
                    }}
                    >
                        <Text>Type de bien</Text>
                    </TouchableOpacity>
                    
                </ScrollView>   
                } 
                <ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    height={50}
                    style={styles.chipsScrollView}
                    contentInset={{ // iOS only
                    top:0,
                    left:0,
                    bottom:0,
                    right:20
                    }}
                    contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0
                    }}
                >
                    {
                    Types.map((type) => (
                    <TouchableOpacity key={type.id} style={styles.chipsItem}
                    onPress={()=>{
                      FilterMap(type.id)
                    }}
                    >
                        <Text>{type.type}</Text>
                    </TouchableOpacity>
                    ))
                    
                    }
                    
                </ScrollView>
                {
                  enableSlideshow &&
                <Animated.ScrollView
                      ref={_scrollView}
                      horizontal
                      pagingEnabled
                      scrollEventThrottle={1}
                      showsHorizontalScrollIndicator={false}
                      snapToInterval={CARD_WIDTH + 20}
                      snapToAlignment="center"
                      style={styles.scrollView}
                      contentInset={{
                        top: 0,
                        left: SPACING_FOR_CARD_INSET,
                        bottom: 0,
                        right: SPACING_FOR_CARD_INSET
                      }}
                      contentContainerStyle={{
                        paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                      }}
                      onScroll={Animated.event(
                        [
                          {
                            nativeEvent: {
                              contentOffset: {
                                x: mapAnimation,
                              }
                            },
                          },
                        ],
                        {useNativeDriver: true}
                      )}
                    >
                  {
                    AllAnnonces.map((annonce)=>{
                      return(
                      
                      <View style={styles.card} key={annonce.id}>
                        <Image style={styles.cardImage}
                        source={{
                          uri:`data:image/jpeg;base64,${GetPicture(annonce.id)}`
                        }}
                        resizeMode="cover"
                        />
                        <Text numberOfLines={1} style={styles.cardtitle}>{annonce.date}</Text>
                        <Text numberOfLines={1} style={styles.cardDescription}>{annonce.description}</Text>
                        <View style={styles.button}>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('detailannonce',{idannonce:annonce.id})
                            }}
                            style={[styles.signIn, {
                              borderColor: '#FF6347',
                              borderWidth: 1
                            }]}
                          >
                            <Text style={[styles.textSign, {
                              color: '#FF6347'
                            }]}>Voir plus</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  })
                }
                 </Animated.ScrollView>
                 }
            <ConfirmDialog 
                visible={dialogVisible} 
                message="Vous voulez utiliser votre GPS ?"
                onTouchOutside={() => setdialogVisible(false)} 
                positiveButton={{
                  title: "Oui",
                  onPress: () => {
                    setenableGPS(true)
                    setdialogVisible(false);
                  }
              }}
              negativeButton={{
                  title: "Non",
                  onPress: () => {
                    alert("L'opération est annulée!") 
                    setdialogVisible(false);
                  }
              }}
              >
       </ConfirmDialog>
       <ConfirmDialog 
                visible={AlertAddAnnonce} 
                message="Vous avez activé l'option d'ajout d'une annonce !"                onTouchOutside={() => {
                  setAlertAddAnnonce(false)
                }} 
                positiveButton={{
                  title: "D'accord",
                  onPress: () => {
                    setAlertAddAnnonce(false)
                  }
              }}
              negativeButton={{
                  title: "Annuler",
                  onPress: () => {
                    alert("L'opération est annulée!") 
                    setAlertAddAnnonce(false)
                    setenableAdd(false)
                  }
              }}
              >
       </ConfirmDialog>
        </View>
    )
}
export default MapScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchBox: {
      position:'absolute', 
      top: 10, 
      flexDirection:"row",
      backgroundColor: '#fff',
      width: '12%',
      padding: 10,
      shadowColor: '#ccc',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },
    toggleEye: {
      position:'absolute', 
      top :60, 
      flexDirection:"row",
      backgroundColor: '#fff',
      width: '12%',
      padding: 10,
      shadowColor: '#ccc',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },
    yourposition: {
      position:'absolute', 
      top :110, 
      flexDirection:"row",
      backgroundColor: '#fff',
      width: '12%',
      padding: 10,
      shadowColor: '#ccc',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },
    addannonce: {
      position:'absolute', 
      top :160, 
      flexDirection:"row",
      backgroundColor: '#fff',
      width: '12%',
      padding: 10,
      shadowColor: '#ccc',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },
    chipsScrollFilter: {
      position:'absolute', 
      top:Platform.OS === 'ios' ? 40 : 15, 
      right:20
    },
    chipsScrollView: {
        position:'absolute', 
        top:Platform.OS === 'ios' ? 90 : 60, 
        left:50
      },
    chipsIcon: {
      marginRight: 5,
    },
    chipsItem: {
      flexDirection:"row",
      backgroundColor:'#fff', 
      borderRadius:20,
      padding:8,
      paddingHorizontal:20, 
      marginHorizontal:10,
      height:35,
      shadowColor: '#ccc',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10,
    },
    scrollView: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingVertical: 10,
    },
    endPadding: {
      paddingRight: width - CARD_WIDTH,
    },
    card: {
      // padding: 10,
      elevation: 2,
      backgroundColor: "#FFF",
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      marginHorizontal: 10,
      shadowColor: "#000",
      shadowRadius: 5,
      shadowOpacity: 0.3,
      shadowOffset: { x: 2, y: -2 },
      height: CARD_HEIGHT,
      width: CARD_WIDTH,
      overflow: "hidden",
    },
    cardImage: {
      flex: 3,
      width: "100%",
      height: "100%",
      alignSelf: "center",
    },
    textContent: {
      flex: 2,
      padding: 10,
    },
    cardtitle: {
      fontSize: 12,
      // marginTop: 5,
      fontWeight: "bold",
    },
    cardDescription: {
      fontSize: 12,
      color: "#444",
    },
    markerWrap: {
      alignItems: "center",
      justifyContent: "center",
      width:50,
      height:50,
    },
    marker: {
      width: 30,
      height: 30,
    },
    button: {
      alignItems: 'center',
      marginTop: 5
    },
    signIn: {
        width: '100%',
        padding:5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    }
  });