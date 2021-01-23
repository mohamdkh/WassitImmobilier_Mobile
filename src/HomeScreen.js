import React from 'react'
import Swiper from 'react-native-swiper'
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
const HomeScreen=(props)=>{
    return(
        <ScrollView style={styles.container}>
            <View style={styles.sliderContainer}>
            <Swiper
            spaceBetween={50}
           autoplay
          horizontal={false}
          height={200}
          activeDotColor="#FF6347">
          <View style={styles.slide}>
            <Image
              source={require('../assets/img1.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/img2.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/img3.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/img4.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper>
            </View>
            <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
          }}>
            A propos de l'appli
        </Text>
        <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Plateforme responsive</Text>
            {/* <StarRating ratings={4} reviews={99} /> */}
            <Text style={styles.cardDetails}>
            Votre application mobile est à votre service, une plateforme assez responsive conçue selon vos plus particuliers besoins pour attaquer avec exactitude vos attentes soit en terme de gestion ou exécution de vos transactions immobilières
            </Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Confidentialité </Text>
            {/* <StarRating ratings={4} reviews={99} /> */}
            <Text style={styles.cardDetails}>
            Nous vieillissons à la sécurité de vos données personnelles qui nous sont d’une grande priorité, sur ce volet nous vous garantissons une fluidité spéciale de navigation et de recherche selon vos critères les plus détaillés
           </Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Vous êtes safe ! </Text>
            {/* <StarRating ratings={4} reviews={99} /> */}
            <Text style={styles.cardDetails}>
            Et vous êtes toujours safe de toute arnaque extérieure grâce à l’équipe administration qui veille à sécuriser votre compte et aussi tout contenu vous étant proposé et qui supervise presque en totalité tous les comptes utilisateurs pour en approuver ceux qui s’avèrent pertinents
           </Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Rassurer vous ...</Text>
            {/* <StarRating ratings={4} reviews={99} /> */}
            <Text style={styles.cardDetails}>
            Notre objectif principal est de satisfaire vous besoin et ainsi vous livrer le meilleur service fondé sur une base technique très solide. Et nous sommes toujours à l’écoute de votre retour sur l’application donc n’hésitez pas à nous évaluer et nous resterons ouverts à vos propositions (onglets réclamations).
           </Text>
          </View>
        </View>
        </ScrollView>
    )
}
export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: 14,
    },
    cardDetails: {
        fontSize: 14,
        color: '#444',
    },
});