import React from 'react';
import { Text, View, StyleSheet, Pressable ,Image, Platform } from 'react-native';

import Colors from '../../utils/colors';

const CoinsItem = ({name, symbol, percent_change_1h, price, onPress}) =>{

    const getImageArrow = (percent) =>{
        if(percent > 0){
            return require('../../assets/up-arrow.png');
        }

        return require('../../assets/down-arrow.png');
    }
    return (<Pressable 
        onPress={onPress}
        style={styles.container}>
        <View style={styles.row}>
            <Text style={styles.symbolText}>{symbol}</Text>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.priceText}>$ {price}</Text>
        </View>

        <View style={styles.row}>
            <Text style={styles.percenText}>{percent_change_1h} %</Text>
            <Image
                source={getImageArrow(percent_change_1h)}
                style={styles.image}
            />
        </View>

    </Pressable>);
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderColor: Colors.zircon,
        borderBottomWidth: 1,
        paddingLeft: Platform.OS == 'ios' ? 0 : 16,
        marginLeft: Platform.OS == 'ios' ? 16 : 0
    },
    row:{
        flexDirection: 'row'
    },
    symbolText: {
        fontWeight: 'bold',
        color: Colors.white,
        fontSize: 16,
        marginRight: 12
    },
    nameText:{
        color: Colors.white,
        fontSize: 14,
        marginRight: 10
    },
    priceText:{
        color: Colors.white,
        fontSize: 14
    },
    percenText: {
        color: Colors.white,
        fontSize: 12,
        marginRight: 8
    },
    image:{
        width: 22,
        height: 22
    }
});

export default CoinsItem;