import React,{useContext,useRef,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Button,
  StatusBar,
  Platform,
  ScrollView
} from 'react-native';
import styles from './style'
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
 import AnnonceService,{types_bien,types_operation} from '../service/AnnonceService'
import AddAnnonceContext from '../context/AddAnnonceContext'
const Step3=(props)=>{
    const context = useContext(AddAnnonceContext);
    const GetTypeName=(categorie,idtype)=>{
        console.log(idtype)
      let typeElement;
      if(categorie=="typebien"){
        types_bien.forEach(item=>{
          if(item.id.toString()==idtype.toString()){
            typeElement= item.type
          }
        })
        // return types_bien.filter(e=>e.id==idtype)[0].type
      }
      else{
        types_operation.forEach(item=>{
          if(item.id.toString()==idtype.toString()){
            typeElement= item.type
          }
          
        })
      }
      return typeElement;
    }
    const Envoyer=()=>{
      AnnonceService.SendData(context.dataInfos)
      alert("Votre annonce a été bien enregistré et elle sera traitée par nos intermédiaires")
      context.GoBack()
    }
    const [Visiblepopup,setvisiblepopup]=React.useState(false)
    return (
        <View
        style={styles.container}>
            <Animatable.View 
            animation ="fadeInDownBig"
            duraton ="2500" 
            style={styles.header}>
            <Text style={styles.text_header}>Etape 3 : Finalisation</Text>
        </Animatable.View>
        <Animatable.View 
         animation ="fadeInLeft"
         duraton ="2500"
        style={styles.footer}>
            <ScrollView style={Addedstyles.container}>
      <View style={Addedstyles.sliderContainer}>
      <Swiper
        spaceBetween={50}
        showsButtons 
        loop={false}
        autoplay={false}
      // horizontal={false}
      height={200}
      activeDotColor="#FF6347">
     {
           context.dataInfos.pictures.map(file=>{
                return (
                  <View style={Addedstyles.slide} key={ context.dataInfos.pictures.indexOf(file)}>
                    <Image
                      source={{
                        uri:file.response.uri
                      }}
                      height="100%"
                      resizeMode="cover"
                      style={Addedstyles.sliderImage}
                    />
                  </View>
                  )
                  }
              )
              }
    </Swiper>
        </View>
        <View style={Addedstyles.cardsWrapper}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={Addedstyles.title}>Description</Text>
          </View>
         <View style={[Addedstyles.section, Addedstyles.sectionLarge]}>
          <Text style={Addedstyles.sectionContent}>{context.dataInfos.description}</Text>
          <Text style={Addedstyles.title}>Prix : {context.dataInfos.prix}</Text>
          <Text style={Addedstyles.title}>Superficie :{context.dataInfos.surface}</Text>
          <Text style={Addedstyles.title}>Type de bien : {GetTypeName('typebien',context.dataInfos.type_bien)}</Text>
          <Text style={Addedstyles.title}>Type d'opération : {GetTypeName('typeops',context.dataInfos.type_operation)}</Text>
        </View>
        <View style={[Addedstyles.section, {height: 250}]}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={{
              latitude: context.dataInfos.lat,
              longitude: context.dataInfos.lon,
              latitudeDelta: 4,
              longitudeDelta: 4,
            }}>
            <MapView.Marker
              coordinate={
                  {
                    latitude: context.dataInfos.lat,
                    longitude: context.dataInfos.lon,
                  }
              }
              // image={require('../assets/marker.png')}
            />
          </MapView>
          </View>
    </View>
    <View style={styles.button}>
            <TouchableOpacity
                    style={styles.signIn}
                     onPress={() => {
                      Envoyer()
                     }}
                >
                    <LinearGradient
                     colors={['#08d4c4', '#01ab9d']}
                     style={styles.signIn}
                    >
                        <Text style={styles.textSign,{
                            color:'#fff'
                        }}>Envoyer l'annonce</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                       onPress={() =>context.GoBack()}
                     style={styles.signUp}
                    >
                        <Text style={styles.textSign,{
                            color:'#009387'
                        }}>Annuler l'opération</Text>
                    </TouchableOpacity>
        </View>
    </ScrollView>
        </Animatable.View>
        </View>
    )
}
export default Step3;
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;
const Addedstyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text_footer:{
      color: '#05375a',
      fontSize: 18
    },
    action:{
      flexDirection: 'row',
      marginTop: 20,
      marginLeft:10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
    },
    textInput:{
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
    },
    button:{
      alignItems: 'center',
      marginTop: 20
    },
    textSign: {
      fontSize: 23,
      fontWeight: 'bold'
  },
  signUp:{
    width: '99%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
    borderColor: '#009387',
    borderWidth: 1,
  
  },
    signIn:{
      width: '99%',
      marginTop:50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
    },
    sliderContainer: {
        height: 200,
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
    },
  
    wrapper: {},
  
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
    },
    categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
    },
    categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        alignSelf: 'center',
    },
    categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#fdeae7' /* '#FF6347' */,
        borderRadius: 50,
    },
    categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        color: '#de4f35',
    },
    cardsWrapper: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    card: {
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImgWrapper: {
        flex: 1,
    },
    cardImg: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    cardInfo: {
        flex: 2,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    },
  title:{
    fontSize: 20,
  },
  section:{
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionLarge:{
  
  },
  sectionContent:{
    fontSize: 16,
    textAlign: 'justify',
  }
  });