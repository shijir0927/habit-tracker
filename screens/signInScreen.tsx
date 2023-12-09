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


function SignInScreen(): JSX.Element {
    const backgroundStyle = {
        backgroundColor: '#000',
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

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth()
                .signOut()
                .then(() => Alert.alert('Your are signed out!'));
            setLoggedIn(false);
            setUserInfo([]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                '985723193964-0iqbolfe82pkudeedm0k986mc6v7c4tj.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }, []);

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={{}}>
                    <View style={styles.body}>
                        <View style={styles.sectionContainer}>
                            <GoogleSigninButton
                                style={{ width: 192, height: 48 }}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={() => signIn()}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            {!loggedIn && <Text>You are currently logged out</Text>}
                            {loggedIn && (
                                <>
                                    <Text> Hi {userInfo.name}!</Text>
                                    <Button
                                        onPress={() => signOut()}
                                        title="LogOut"
                                        color="red"></Button>
                                </>

                            )}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    body: {

    },
    sectionContainer: {

    },
    buttonContainer: {

    }
});

export default SignInScreen;
