import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const CoinMakertItem = ({item}) => {

    const {name, price} = item;
    return(<View style={styles.container}>

        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.priceText}>{price} $</Text>
    </View>);
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgba(0,0,0, 0.1)',
        borderColor: colors.zircon,
        borderWidth: 1,
        padding: 16,
        marginRight: 8,
        alignItems: 'center',
        borderRadius: 10,
    },
    nameText:{
        color: colors.white,
        fontWeight: 'bold'
    },
    priceText:{
        color: colors.white
    }
});

export default CoinMakertItem;