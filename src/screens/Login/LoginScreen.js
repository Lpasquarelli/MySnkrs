import React from 'react';
import { PRIMEIRA_COLOR,SEGUNDA_COLOR,TERCEIRA_COLOR,QUARTA_COLOR,CINZA_COLOR, QUINTA_COLOR} from '../../GlobalStyles'
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    Text,
    View,
    Button,
    Platform,
    TextInput,
    StatusBar,
    Alert
} from 'react-native';

import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'


import { useTheme } from '@react-navigation/native';

import { AuthContext } from '../../config/context';

const LoginScreen = ({navigation}) =>{

    
    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true 
    })
    
    
    const { colors } = useTheme()
    //const { signIn } = React.useContext(AuthContext)

    const textInpuChange = (e) => {
        e.length != 0 ? setData({ ...data, email:e,check_textInputChange: true }) : setData({ ...data, email:e,check_textInputChange: false })  
    }
    const handlePasswordChange = (e) => {
        setData({ ...data, password:e })
    }
    const updateSecurityWord = () => {
        setData({ ...data, secureTextEntry: !data.secureTextEntry })
    }
    const registrar = () => {
        //navega pra tela de registro
    }
    const loginHandle = (username, password) => {
        navigation.navigate('Onboarding')
        // const foundUser = Users.filter( item => {
        //         return username == item.username && password == item.password
        //     })
        // if(foundUser.length == 0) {
        //     Alert.alert('Login Inválido','Usuário ou Senha Inválidos!', [{text: 'OK'}])
        //     return
        // }
        // signIn(foundUser)
    }

    const handleValidUser = (e) =>{
        /////// validar se existe
        if (e.length > 0){
            if(!e.trim().includes('@')){
                setData({
                    ...data,
                    isValidUser: false
                })
            }else{
                setData({
                    ...data,
                    isValidUser: true
                })
            }
        } else{
            setData({
                ...data,
                isValidUser: true
            })
        }
        
    }

    const handleValidPassword = (e) =>{
        if (e.length == 0){
            setData({
                ...data,
                isValidPassword: false
            })
        } else{
            setData({
                ...data,
                isValidPassword: true
            })
        }
    }

  return(
    <View style={styles.container}>
        
        <View style={styles.header}>
            <Text style={styles.text_header}>Bem-Vindo!</Text>
        </View>
        <Animatable.View animation={'fadeInUpBig'} style={[styles.footer, {backgroundColor: colors.background}]}>
            <Text style={[styles.text_footer,{color: colors.text}]}>E-mail</Text>
            <View style={styles.action}>
                <FontAwesome name='user-o' color={colors.color_escura} size={20} />
                <TextInput onChangeText={(e) => textInpuChange(e)} onEndEditing={(e) => handleValidUser(e.nativeEvent.text)} placeholderTextColor={colors.color_clara} placeholder={'Informe o Email'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                {data.check_textInputChange ?<Animatable.View animation={'bounceIn'}><Feather name='check-circle' color='green' size={20} /></Animatable.View>: null}
                
            </View>
            {data.isValidUser ? null : errorMsg('Usuário Inválido')}
            <Text style={[styles.text_footer, {marginTop: 35, color: colors.color_escura}]}>Senha</Text>
            <View style={styles.action}>
                <Feather name='lock' color={colors.color_escura} size={20} />
                <TextInput onChangeText={(e) => handlePasswordChange(e)} onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)} secureTextEntry={data.secureTextEntry} placeholderTextColor={colors.color_clara} placeholder={'Informe a Senha'} style={[styles.textInput,{color: colors.color_escura}]} autoCapitalize={'none'}/>
                <TouchableOpacity  onPress={() => {updateSecurityWord()}}>
                    {data.secureTextEntry? <Feather name='eye-off' color='grey' size={20}/> :<Feather name='eye' color='grey' size={20}/>}
                </TouchableOpacity>
                
            </View>
            {data.isValidPassword ? null : errorMsg('Senha Inválida')}
            <View style={styles.button}>
                <TouchableOpacity onPress={() => loginHandle(data.email, data.password)} style={styles.signIn}>
                    <LinearGradient colors={[QUINTA_COLOR,QUINTA_COLOR]} style={styles.signIn} > 
                        <Text style={[styles.textSign, {color:CINZA_COLOR}]}>Entrar</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => registrar()} style={[styles.signIn,{marginTop: 8}]}>
                    <LinearGradient colors={[TERCEIRA_COLOR,TERCEIRA_COLOR]} style={styles.signIn} > 
                        <Text style={[styles.textSign, {color:QUINTA_COLOR}]}>Registrar</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>
    </View>
  )
}

const errorMsg = (text) => {
    return(
        <Animatable.View animation={'fadeInLeft'} duration={500}>
            <Text style={styles.errorMsg}>{text}</Text>
        </Animatable.View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: TERCEIRA_COLOR
    },
    header:{
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer:{
        flex:3,
        backgroundColor: CINZA_COLOR,
        borderTopLeftRadius:30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header:{
        color: CINZA_COLOR,
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer:{
        color: TERCEIRA_COLOR,
        fontSize: 18
    },
    action:{
        flexDirection:'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dbdbdb',
        paddingBottom: 5
    },
    textInput:{
        flex: 1,
        marginTop:Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10
    },
    button:{
        alignItems:'center',
        marginTop:50
    },
    signIn:{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 10
    },
    textSign:{
        fontSize:18,
        fontWeight:'bold'
    },
    forgotPassword:{
        marginTop: 10
    },
    textforgotPassword:{
        color: TERCEIRA_COLOR
    },
    errorMsg:{
        fontSize: 12,
        color: '#ee0000',
        marginHorizontal: 4
    }
});


export default LoginScreen;