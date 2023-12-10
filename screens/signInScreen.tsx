import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    Pressable,
    FlatList,
    Button,
    StatusBar
} from 'react-native';
import { PageContainer, Habit } from '../components'
import firestore from '@react-native-firebase/firestore';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import HomeScreen from './homeScreen';


function SignInScreen(): JSX.Element {
    const backgroundStyle = {
        backgroundColor: '#000',
        height: '100%'
    };

    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const signIn = async () => {
        try {
            console.log("here");
            await GoogleSignin.hasPlayServices();
            console.log("here1");
            const response = await GoogleSignin.signIn();
            const { accessToken, idToken, user } = response;
            console.log("response: ", response);
            setUserInfo(user);
            setLoggedIn(true);
            console.log("here3");
            const credential = auth.GoogleAuthProvider.credential(
                idToken,
                accessToken,
            );
            console.log("here4");
            await auth().signInWithCredential(credential);
            console.log("here5");
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                Alert.alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                // some other error happened
                console.log(error);
            }
        }
    };

    const handleSignOutPress = () => {
        setLoggedIn(false);
        setUserInfo([]);
    }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                '985723193964-0iqbolfe82pkudeedm0k986mc6v7c4tj.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }, []);

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={backgroundStyle}>
                <View style={styles.body}>
                    {!loggedIn && (<>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.logo}>Habits</Text>
                            <GoogleSigninButton
                                style={{ width: 192, height: 48 }}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={() => signIn()}
                            />
                        </View>
                    </>)}
                    {loggedIn && (
                        <>
                            <HomeScreen handleSignOutPress={() => handleSignOutPress()} />
                        </>

                    )}
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'black',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        color: 'white',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 24
    }
});

export default SignInScreen;
