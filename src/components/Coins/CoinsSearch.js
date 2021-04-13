import React, { useEffect, useState } from 'react';
import { Text, TextInput, Platform, View, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

import Colors from '../../utils/colors';

const CoinsSearch = ({ setQuery, handlerSearch }) => {

    const [value, onChangeText] = useState('');

    useEffect(() => {
        handlerSearch()
    }, [value]);

    return (<TextInput
        onChangeText={text => {
            onChangeText(text);
            setQuery(text);
        }}
        style={[
            styles.textInput,
            Platform.OS == 'ios' ?
                styles.textInputIOS :
                styles.textInputAndroid
        ]}
        value={value}
        placeholder='Search coins'
    />);
}

const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: Colors.charade,
        paddingLeft: 16,
        color: Colors.white
    },
    textInputAndroid: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.zircon
    },
    textInputIOS:{
        margin: 8,
        borderRadius: 8,
    }
});

export default CoinsSearch;