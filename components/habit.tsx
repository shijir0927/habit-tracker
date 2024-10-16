
import React, { Children } from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Pressable,
    View,
    Text
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import COLOR_MAP from '../constants/color_map';

type HabitProps = PropsWithChildren<{
    title: string;
    id: string;
}>;

function Habit({ title, id }: HabitProps): JSX.Element {

    async function deleteHabit() {
        await firestore()
            .collection('habits')
            .doc(id)
            .delete()
            .then(() => {
                console.log('Habit deleted!');
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>• {title}</Text>
            <Pressable onPress={deleteHabit}>
                <AntDesignIcon name="delete" size={18} color={'#d50000'} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    textStyle: {
        color: '#fff',
        fontSize: 18
    },
    delete: {
        color: 'red',
        fontSize: 12
    }
});

export default Habit;
