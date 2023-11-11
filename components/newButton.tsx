
import React, { Children } from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Pressable,
    Text
} from 'react-native';

const PRIMARY_COLOR = '#8B5CF6';

type NewButtonProps = PropsWithChildren<{
    handlePress(): void;
}>;

function NewButton({ handlePress }: NewButtonProps): JSX.Element {
    return (
        <Pressable style={styles.newButton} onPress={handlePress}>
            <Text style={styles.textStyle}>New</Text>
        </Pressable>);
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#fff'
    },
    newButton: {
        borderColor: PRIMARY_COLOR,
        borderWidth: 2,
        borderRadius: 8,
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 16,
        paddingLeft: 16
    },
});

export default NewButton;
