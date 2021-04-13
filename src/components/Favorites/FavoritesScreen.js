import React, { useState } from "react";
import { Text, View, StyleSheet } from 'react-native';
import colors from "../../utils/colors";
import FavoritesEmptyState from "./FavoritesEmptyState";

import Storage from '../../libs/storage';
import CoinsItem from '../Coins/CoinsItem';
import { useEffect } from "react/cjs/react.development";
import { FlatList } from "react-native-gesture-handler";

const FavoritesScreen = ({ navigation }) => {

    const [favoritesCoins, setFavoritesCoins] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus',
            () => {
                getFavorites();
            });

        return unsubscribe;
    }, [navigation])

    const getFavorites = async () => {
        const allKeys = await Storage.instance.getAllKeys();

        const keys = allKeys.filter((key) => key.includes("favorite-"));

        const favs = await Storage.instance.multiGet(keys);

        const favorites = favs.map((fav) => JSON.parse(fav[1]));

        setFavoritesCoins(favorites);
    }

    const handlerPress = (coin) =>{
        navigation.navigate("Detalle", {coin})
    }

    return (
        <View style={styles.container}>
            {favoritesCoins.length == 0 ?
            <FavoritesEmptyState /> : null}
            {favoritesCoins.length >= 0 ?
                <FlatList
                    data={favoritesCoins}
                    renderItem={({ item }) => <CoinsItem
                        name={item.name}
                        symbol={item.symbol}
                        percent_change_1h={item.percent_change_1h}
                        price={item.price_usd}
                        onPress={() => handlerPress(item)} />}
                />
                : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.charade,
    }
});

export default FavoritesScreen;