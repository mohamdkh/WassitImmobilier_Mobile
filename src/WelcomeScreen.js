import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import welcomecontext from './context/welcomecontext';
const WelcomeScreen = () => {
    const {TogglePageWelcome}=React.useContext(welcomecontext);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
               <Animatable.Image
               animation ="fadeInDownBig"
               duraton ="2500" 
               style={{
                   width:"100%",
                   height:"110%"
               }}
               source={require('../assets/logo.jpeg')}
               />
            </View>
            <Animatable.View style={styles.footer}
            animation ="fadeInUpBig"
            duraton ="2500" 
            >
                <Text style={styles.title}>Avec <Text style={{color:"#9932CC"}}>Wassit</Text><Text style={{color:"blue"}}>Immobilier</Text>, vous avez un ami dans l'immobilier !</Text>
                <Text  style={styles.text}>La bonne adresse pour trouver la vôtre!</Text>
                <View style={styles.button}>
                    <TouchableOpacity 
                     onPress={()=>TogglePageWelcome()}
                    >
                    <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>C'est partie !</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}
export default WelcomeScreen;
const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
  });