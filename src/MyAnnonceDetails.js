import React, {useRef,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AnnonceService,{types_bien,types_operation} from './service/AnnonceService'

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;
const MyAnnonceDetails=({navigation,route})=>{
     const id = route.params.idannonce;
     const GetTypeName=(categorie,idtype)=>{
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
    const [Visiblepopup,setvisiblepopup]=React.useState(false)
    const [nom,setNom]=React.useState("")
    const [email,setEmail]=React.useState("")
    const [message,setmessage]=React.useState("")
    const [tel,setTel]=React.useState("")
    const [data, setInfos] = React.useState({
        id: 0,
        type_bien:'',
        type_operation:'',
        surface:'',
        prix:'',
        date:'',
        description: '',
        lat:0,
        lon:0
    });
    
    const [ListPictures, setListPictures] = React.useState([]);
    useEffect(() => {
        AnnonceService.GetAnnonceDetail(id).then( result=>{
            setInfos({
                ...data,
                type_bien: result.data.type_bien,
                type_operation: result.data.type_operation,
                surface: result.data.surface,
                prix: result.data.prix,
                date: result.data.date,
                description: result.data.description,
                lat: result.data.lat,
                lon: result.data.lon,
            });
            AnnonceService.GetImagesAnnonce(id).then(resultat1=>{
              setListPictures(resultat1.data)
          })
        }
        )
    },[])
    DemandeAnnonce=()=>{
      AnnonceService.DemandeAnnonce(nom,tel,email,id).then(
        result=>{
          setmessage("votre demande a été bien enregistré")
        }
      )
    }
    return(
      <ScrollView style={styles.container}>
      <View style={styles.sliderContainer}>
      <Swiper
        spaceBetween={50}
        showsButtons 
        loop={false}
        autoplay={false}
      // horizontal={false}
      height={200}
      activeDotColor="#FF6347">
     {
              ListPictures.map(file=>{
                return (
                  <View style={styles.slide} key={ListPictures.indexOf(file)}>
                    <Image
                      source={{
                        uri:`data:image/jpeg;base64,${file.image}`
                      }}
                      height="100%"
                      resizeMode="cover"
                      style={styles.sliderImage}
                    />
                  </View>
                  )
                  }
              )
              }
    </Swiper>
        </View>
        <View style={styles.cardsWrapper}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Description</Text>
          </View>
         <View style={[styles.section, styles.sectionLarge]}>
          <Text style={styles.sectionContent}>{data.description}</Text>
          <Text style={styles.title}>Prix : {data.prix} dhs</Text>
          <Text style={styles.title}>Superficie: {data.surface} m²</Text>
          <Text style={styles.title}>Type de bien : {GetTypeName('typebien',data.type_bien)}</Text>
          <Text style={styles.title}>Type d'opération : {GetTypeName('typeops',data.type_operation)}</Text>
        </View>
        <View style={[styles.section, {height: 250}]}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={{
              latitude: data.lat,
              longitude: data.lon,
              latitudeDelta: 4,
              longitudeDelta: 4,
            }}>
            <MapView.Marker
              coordinate={
                  {
                    latitude: data.lat,
                    longitude: data.lon,
                  }
              }
              // image={require('../assets/marker.png')}
            />
          </MapView>
          </View>
    </View>
    <View style={styles.button}>
                    <TouchableOpacity
                       onPress={() =>  navigation.goBack()}
                     style={styles.signUp}
                    >
                        <Text style={styles.textSign,{
                            color:'#009387'
                        }}>Retour</Text>
                    </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>

        <Modal isVisible={Visiblepopup}>
          <View style={{flex: 1,backgroundColor:"#fff",marginTop:80}}>
            <View style={styles.action}>
                <FontAwesome 
                name="user-o"
                color="#009387"
                size={20}
                />
                <TextInput 
                style={styles.textInput}
                placeholder="Votre nom"
                 onChangeText={(val) => setNom(val)}
                />
            </View>
            <View style={styles.action}>
                <FontAwesome 
                name="envelope"
                color="#009387"
                size={23}
                />
                <TextInput 
                style={styles.textInput}
                placeholder="Votre email"
                // secureTextEntry={data.secureTextEntry}
                onChangeText={(val) => setEmail(val)}
                />
            </View>
            <View style={styles.action}>
                <FontAwesome 
                name="phone"
                color="#009387"
                size={23}
                />
                <TextInput 
                style={styles.textInput}
                placeholder="Votre numéro de téléphone"
                onChangeText={(val) => setTel(val)}
                />
            </View>
            <View style={styles.button}>
            <TouchableOpacity
                    style={styles.signIn}
                  onPress={() => {DemandeAnnonce()}}
                >
                    <LinearGradient
                     colors={['#08d4c4', '#01ab9d']}
                     style={styles.signIn}
                    >
                        <Text style={styles.textSign,{
                            color:'#fff'
                        }}>Envoyer</Text>
                    </LinearGradient>
                </TouchableOpacity>
                    <TouchableOpacity
                       onPress={() => setvisiblepopup(false)}
                     style={styles.signUp}
                    >
                        <Text style={styles.textSign,{
                            color:'#009387'
                        }}>Annuler</Text>
                    </TouchableOpacity>
              </View>
              <View style={styles.action}>
              <Text style={{color:"#008000"}}>{message}</Text>
              </View>
          </View>
        </Modal>
      </View>
      {/* } */}
    </ScrollView>
    )
}
export default MyAnnonceDetails;
const styles = StyleSheet.create({
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
  marginBottom:10,
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