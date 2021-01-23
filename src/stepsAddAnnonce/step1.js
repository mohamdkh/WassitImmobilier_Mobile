import React,{useContext} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
} from 'react-native';
import styles from './style'
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AddAnnonceContext from '../context/AddAnnonceContext'
const Step1=(props)=>{
    const context = useContext(AddAnnonceContext);
      OnNext=()=>{
         console.log(context.dataInfos)
         props.next()
     }
     return (
         <View
         style={styles.container}>
             <Animatable.View 
             animation ="fadeInDownBig"
             duraton ="2500" 
             style={styles.header}>
             <Text style={styles.text_header}>Etape 1 : Informations générales</Text>
         </Animatable.View>
         <Animatable.View 
          animation ="fadeInLeft"
          duraton ="2500"
         style={styles.footer}>
             <Text style={styles.text_footer}>Nom complet</Text>
             <View style={styles.action}>
                 <FontAwesome 
                 name="user-o"
                 color="#009387"
                 size={20}
                 />
                 <TextInput 
                 style={styles.textInput}
                 placeholder="Nom complet"
                  onChangeText={(val) => context.setInfos({
                      ...context.dataInfos,
                      nom:val
                  })}
                 />
             </View>
             <Text style={styles.text_footer}>Email</Text>
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
                  onChangeText={(val) => context.setInfos({
                     ...context.dataInfos,
                     email:val
                 })}
                 />
             </View>
             <Text style={styles.text_footer}>Téléphone</Text>
             <View style={styles.action}>
                 <FontAwesome 
                 name="phone"
                 color="#009387"
                 size={23}
                 />
                 <TextInput 
                 style={styles.textInput}
                 placeholder="Votre téléphone"
                 // secureTextEntry={data.confirmsecureTextEntry}
                  onChangeText={(val) => context.setInfos({
                     ...context.dataInfos,
                     tel:val
                 })}
                 />
             </View>
             <View style={styles.button}>
             <TouchableOpacity
                     style={styles.signIn}
                     onPress={() => {OnNext()}}
                 >
                     <LinearGradient
                      colors={['#08d4c4', '#01ab9d']}
                      style={styles.signIn}
                     >
                         <Text style={styles.textSign,{
                             color:'#fff'
                         }}>Suivant</Text>
                     </LinearGradient>
                 </TouchableOpacity>
                    
         </View>
         <View style={styles.button}>
             
         </View>
         </Animatable.View>
       
         </View>
 
     )
 }
 export default Step1;