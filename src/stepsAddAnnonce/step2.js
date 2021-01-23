import React,{useContext,useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    Button,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Modal from 'react-native-modal';
import Animated from 'react-native-reanimated';
import {Picker} from '@react-native-picker/picker';
import styles from './style'
import AnnonceService from './../service/AnnonceService'
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AddAnnonceContext from '../context/AddAnnonceContext'
import * as ImagePicker from 'react-native-image-picker';
const Step2=(props)=>{
    bs=React.createRef();
    fall=new Animated.Value(1);
    const context = useContext(AddAnnonceContext);
    const [AllTypeBien, setAllTypeBien] = React.useState([])
    const [AllTypeOperation, setAllTypeOperation] = React.useState([])
    const [ListPicture, setListPicture] = React.useState([])
    const [typebien, setTypeBien] = React.useState(0)
    const [typeOperation, setTypeOperation] = React.useState(0)
    const [SelectedImage, setSelectedImage] = React.useState("")
    const [Visiblepopup, setVisiblepopup] = React.useState(false)
    useEffect(() => {
        AnnonceService.GetAllTypeBien().then(result=>{
            setAllTypeBien(result.data)
        }).then(
            AnnonceService.GetAllTypeOperation().then(result1=>{
                setAllTypeOperation(result1.data)
            })
        )
    },[])

  const viewListPicture=()=>{
    console.log("helloo"+ListPicture.length)
   
  }
    const takePhotoFromCamera=()=>{
      const options = {
        noData: true,
      };
      if(context.dataInfos.pictures.length<4){
          ImagePicker.launchCamera(options, (response) => {
            console.log(response)
            if (response.uri) {
              // console.log(response)
              const newList = context.dataInfos.pictures.concat({ response });
              context.setInfos({
                  ...context.dataInfos,
                  pictures:newList
              })
               setListPicture(newList)
            }
          });
    }
    }
    const DeleteImage=(item)=>{
      let deletedItem;
      ListPicture.map(elem=>{
        if(elem.response.uri==item){
          deletedItem=elem
        }
      })
      setListPicture(ListPicture.filter(el => el != deletedItem ))
      context.setInfos({
        ...context.dataInfos,
        pictures:ListPicture.filter(el => el != deletedItem )
    })
      setVisiblepopup(false)
    }
    const choosePhotoFromLibrary=()=>{
      const options = {
        noData: true,
      };
      if(context.dataInfos.pictures.length<4){
          ImagePicker.launchImageLibrary(options, (response) => {
            if (response.uri) {
              const newList = context.dataInfos.pictures.concat({ response });
              context.setInfos({
                  ...context.dataInfos,
                  pictures:newList
              })
               setListPicture(newList)
               console.log(response)
            }
          });
        }
    }
    DetailImage=(elem)=>{

    }
    renderInner = () => (
        <View style={Addedstyles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={Addedstyles.panelTitle}>Importer une image</Text>
            <Text style={Addedstyles.panelSubtitle}>Chosir les photos de votre bien</Text>
          </View>
          <TouchableOpacity style={Addedstyles.panelButton}
            onPress={takePhotoFromCamera}
           >
            <Text style={Addedstyles.panelButtonTitle}>Prendre une photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Addedstyles.panelButton}
           onPress={choosePhotoFromLibrary}
           >
            <Text style={Addedstyles.panelButtonTitle}>Choisir une image dans la galerie </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Addedstyles.panelButton}
            onPress={() => this.bs.current.snapTo(1)}>
            <Text style={Addedstyles.panelButtonTitle}>Annuler</Text>
          </TouchableOpacity>
        </View>
      );
      renderHeader = () => (
        <View style={Addedstyles.header}>
          <View style={Addedstyles.panelHeader}>
            <View style={Addedstyles.panelHandle} />
          </View>
        </View>
      );
    return (
        <ScrollView
         style={styles.container}>
             <Animatable.View 
             animation ="fadeInDownBig"
             duraton ="2500" 
             style={styles.header}>
             <Text style={styles.text_header}>Etape 2 : Description du bien</Text>
         </Animatable.View>
         <Animatable.View 
          animation ="fadeInLeft"
          duraton ="2500"
         style={styles.footer}>
             <Text style={styles.text_footer}>Superficie :</Text>
             <View style={styles.action}>
                 <TextInput 
                  keyboardType="number-pad"
                 style={styles.textInput}
                 placeholder="Superficie en m²"
                  onChangeText={(val) => context.setInfos({
                      ...context.dataInfos,
                      surface:val
                  })}
                 />
             </View>
             <Text style={styles.text_footer}>Prix</Text>
             <View style={styles.action}>
                 <TextInput 
                 keyboardType="number-pad"
                 style={styles.textInput}
                 placeholder="Estimer un Prix de bien en MAD (dhs)"
                 // secureTextEntry={data.secureTextEntry}
                  onChangeText={(val) => context.setInfos({
                     ...context.dataInfos,
                     prix:val
                 })}
                 />
             </View>
             <Text style={styles.text_footer}>Type bien</Text>
             <View style={styles.action}>
                 <Picker
                     selectedValue={typebien}
                     accessibilityLabel='Type de bien '
                     style={styles.textInput}
                    // style={{height: 50, width: "100%"}}
                    onValueChange={(itemValue, itemIndex) =>{
                        setTypeBien(itemValue)
                        context.setInfos({
                            ...context.dataInfos,
                            type_bien:itemValue
                        })
                    }
                        
                        // this.setState({language: itemValue})
                    }>{
                        AllTypeBien.map(type=>
                            <Picker.Item key={type.id} label={type.type} value={type.id } />
                            
                            )
                    }
                    
                    </Picker>
             </View>
             <Text style={styles.text_footer}>Type d'opération</Text>
             <View style={styles.action}>
                 <Picker
                     selectedValue={typeOperation}
                     accessibilityLabel='Type de bien '
                     style={styles.textInput}
                    // style={{height: 50, width: "100%"}}
                    onValueChange={(itemValue, itemIndex) =>{
                        setTypeOperation(itemValue)
                        context.setInfos({
                            ...context.dataInfos,
                            type_operation:itemValue
                        })
                    }
                        
                        // this.setState({language: itemValue})
                    }>{
                        AllTypeOperation.map(type=>
                            <Picker.Item key={type.id} label={type.type} value={type.id } />
                            
                            )
                    }
                    
                    </Picker>
             </View>
             <Text style={styles.text_footer}>Description </Text>
             <View style={styles.action}>
                 <TextInput 
                  multiline={true}
                 numberOfLines={Platform.OS === 'ios' ? null : 6}
                 style={styles.textInput}
                 placeholder="Décrire le bien "
                 // secureTextEntry={data.secureTextEntry}
                 minHeight={(Platform.OS === 'ios' && numberOfLines) ? (20 * numberOfLines) : null}
                  onChangeText={(val) => context.setInfos({
                     ...context.dataInfos,
                     description:val
                 })}
                 />
             </View>
             <View style={styles.button}>
             <TouchableOpacity
                     style={styles.signIn}
                     onPress={() => { bs.current.snapTo(0)
                    }}
                 >
                     <LinearGradient
                      colors={['#08d4c4', '#01ab9d']}
                      style={styles.signIn}
                     >
                         <View style={{flexDirection:"row"}}>
                         <Text style={styles.textSign,{
                             color:'#fff'
                         }}>Importer les images  </Text>
                          <FontAwesome 
                            name="upload"
                            color="#fff"
                            size={20}
                            />
                        </View>
                     </LinearGradient>
                 </TouchableOpacity>
                 </View>
                 <View style={{
                   flexDirection:"row",
                   marginTop:10
                 }}>
                   {
                  ListPicture.map((elem)=>
                   <Button key={ListPicture.indexOf(elem)} title={'Photo N° '+(ListPicture.indexOf(elem)+1)}
                   onPress={()=>{
                    setSelectedImage(elem.response.uri);
                    setVisiblepopup(true)
                   }}
                   />
                    )
                }
                </View>
             <View style={styles.button}>
            <View style={{flexDirection:"row"}}>
             <TouchableOpacity
                     style={styles.buttonElement}
                     onPress={() => {props.back()}}
                 >
                     <LinearGradient
                      colors={['#08d4c4', '#01ab9d']}
                      style={styles.buttonElement}
                     >
                         <Text style={styles.textSign,{
                             color:'#fff'
                         }}>Précédent</Text>
                     </LinearGradient>
                 </TouchableOpacity>
                 <TouchableOpacity
                     style={styles.buttonElement}
                     onPress={() => {props.next()}}
                 >
                     <LinearGradient
                      colors={['#08d4c4', '#01ab9d']}
                      style={styles.buttonElement}
                     >
                         <Text style={styles.textSign,{
                             color:'#fff'
                         }}>Suivant</Text>
                     </LinearGradient>
                 </TouchableOpacity>
             </View>
                    
         </View>
         </Animatable.View>
         <BottomSheet
        //  style={{marginTop:"10%"}}
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Modal isVisible={Visiblepopup}>
      <View style={{flex: 1,backgroundColor:"#fff",marginTop:10}}>
      <Image
           source={{
              uri:SelectedImage
                      }}
                      style={{height: "50%", width: "100%"}}
                    />
        < View 
        style={{
          marginTop:50,
          flexDirection:"column",
          marginHorizontal:20
        }}
        > 
        <View  style={{
          width: '100%',
          height: 50,
          borderRadius: 10,

        }}>
        <Button title="Supprimer"
       onPress={()=>DeleteImage(SelectedImage)}
        ></Button>
        </View>
        <View  style={{
          width: '100%',
          height: 50,
          borderRadius: 10,
          
        }}>
         <Button title="Annuler"
         onPress={()=>setVisiblepopup(false)}
        ></Button>
      </View>
        </View>
        </View>
      </Modal>
         </ScrollView>
    )
}
export default Step2;
const Addedstyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    commandButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginTop: 10,
    },
    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      // shadowColor: '#000000',
      // shadowOffset: {width: 0, height: 0},
      // shadowRadius: 5,
      // shadowOpacity: 0.4,
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 10,
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: '#009387',
      alignItems: 'center',
      marginVertical: 7,
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
    },
  });