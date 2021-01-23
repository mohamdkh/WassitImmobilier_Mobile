import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AnnonceService from './service/AnnonceService'
const ContactScreen=(props)=>{
    const [data, setInfos] = React.useState({
        email: '',
        message: ''
    });
    const InputEmail = (val) => {
            setInfos({
                ...data,
                email: val,
            });
        }
    
    const InputMessage = (val) => {
        setInfos({
            ...data,
            message: val,
        });
    }
    const EnvoyerMessage=()=>{
        AnnonceService.SendEmail(data.email,data.message).then(
            alert("Message a été bien envoyé")
        )
    }

    return(
        <View
        style={styles.container}>
            <Animatable.View 
            animation ="fadeInDownBig"
            duraton ="2500" 
            style={styles.header}>
            <Text style={styles.text_header}>Contacter nous !</Text>
        </Animatable.View>
        <Animatable.View 
         animation ="fadeInLeft"
         duraton ="2500"
        style={styles.footer}>
            <Text style={styles.text_footer}>Email :</Text>
            <View style={styles.action}>
                <FontAwesome 
                name="user-o"
                color="#009387"
                size={20}
                />
                <TextInput 
                style={styles.textInput}
                placeholder="Votre email"
                onChangeText={(val) => InputEmail(val)}
                />
            </View>
            <Text style={styles.text_footer}>Votre Message :</Text>
            <View style={styles.action}>
                <FontAwesome 
                name="envelope"
                color="#009387"
                size={20}
                />
                <TextInput 
                style={styles.textInput}
                multiline={true}
                numberOfLines={Platform.OS === 'ios' ? null : 6}
                placeholder="Saisissez votre Message"
                onChangeText={(val) => InputMessage(val)}
                />
            </View>
            <View style={styles.button}>
            <TouchableOpacity
                    style={styles.signIn}
                     onPress={() => {EnvoyerMessage()}}
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
        </View>
        <View style={styles.button}>
            
        </View>
        </Animatable.View>
      
        </View>
    )
}
export default ContactScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    signUp:{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 15,
        borderColor: '#009387',
        borderWidth: 1,

    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });