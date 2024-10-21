import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Alert,
    StatusBar
} from 'react-native';
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
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            const { accessToken, idToken, user } = response;
            setUserInfo(user);
            setLoggedIn(true);
            const credential = auth.GoogleAuthProvider.credential(
                idToken,
                accessToken,
            );
            await auth().signInWithCredential(credential);
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                Alert.alert('Sign in attempt cancelled!');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                // some other error happened
                Alert.alert(error);
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
