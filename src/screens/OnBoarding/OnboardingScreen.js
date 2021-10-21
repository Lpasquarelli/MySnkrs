import React from 'react'
import { 
    Image,
    View,
    StyleSheet,
    Button
 } from 'react-native'

 import Onboarding from 'react-native-onboarding-swiper'
 
 function OnboardingScreen({navigation}) {

    return (
        <Onboarding 
            onSkip={() => navigation.replace("Login")}
            onDone={() => navigation.navigate("Login")}
            pages={[
                {
                    backgroundColor: '#fdeb93',
                    image: <Image source={require('../../assets/Images/jordan11.png')} style={{width: 500, height: 200}} resizeMode={'contain'} />,
                    title: 'Monte sua Coleção',
                    subtitle: 'Você adiciona o seu tenis á coleção e leva seus queridinhos aonde você for'
                },
                {
                    backgroundColor: '#a6e4d0',
                    image: <Image source={require('../../assets/Images/jordan1.png')} style={{width: 500, height: 200}} resizeMode={'contain'}/>,
                    title: 'Compartilhe com seus amigos',
                    subtitle: 'É sempre bom compartilhar seus COPs mais recentes'
                },
                {
                    backgroundColor: '#e9bcbe',
                    image: <Image source={require('../../assets/Images/maxone.png')} style={{width: 500, height: 150}} resizeMode={'contain'}/>,
                    title: 'Fique Ligado!',
                    subtitle: 'Veja o quão grande sua coleção está ficando e quanto está valendo'
                }
            ]} />
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default OnboardingScreen
