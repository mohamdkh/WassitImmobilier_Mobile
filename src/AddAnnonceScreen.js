import React,{useContext} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
} from 'react-native';
import styles from './stepsAddAnnonce/style'
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AsyncStorage } from '@react-native-community/async-storage';
import { useTheme } from 'react-native-paper';
import { cos } from 'react-native-reanimated';
import AddAnnonceContext from './context/AddAnnonceContext'
import AnimatedMultistep from "react-native-animated-multistep";
import Step1 from './stepsAddAnnonce/step1'
import Step2 from './stepsAddAnnonce/step2'
import Step3 from './stepsAddAnnonce/step3'
const AddAnnonceScreen=({navigation,route})=>{
        const [dataInfos, setInfos] = React.useState({
            nom: '',
            email: '',
            tel:'',
            prix:0,
            surface:0,
            description:"",
            type_operation:"",
            type_bien:"",
            lon:route.params.lon,
            lat:route.params.lat,
            pictures:[],
        }); 
     GoBack=()=>{
       navigation.navigate("Home")
     }
    const allSteps = [
        { name: "step 1", component: Step1 },
        { name: "step 2", component: Step2 },
        { name: "step 3", component: Step3 },
      ];
      const onNext = () => {
        console.log("Next");
      };
     
      /* define the method to be called when you go on back step */
     
      const onBack = () => {
        console.log("Back");
      };
     
      /* define the method to be called when the wizard is finished */
     
      const finish = finalState => {
        console.log(finalState);
      };
    return(
        <AddAnnonceContext.Provider value={{setInfos,dataInfos,GoBack}}>
        <View style={{ flex: 1 }}>
        <AnimatedMultistep
          steps={allSteps}
          onFinish={this.finish}
          onBack={this.onBack}
          onNext={this.onNext}
          comeInOnNext="bounceInUp"
          OutOnNext="bounceOutDown"
          comeInOnBack="bounceInDown"
          OutOnBack="bounceOutUp"
        />
      </View>
      </AddAnnonceContext.Provider>
    )
}
export default AddAnnonceScreen;
