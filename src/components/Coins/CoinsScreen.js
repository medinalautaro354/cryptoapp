import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Colors from '../../utils/colors';
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';
import CoinsSearch from './CoinsSearch';

const CoinsScreen = ({ navigation }) => {

    const [coins, setCoins] = useState([]);
    const [allCoins, setAllCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');


    useEffect(() => {
        getAndSetCoins();
    }, [])

    const getCoins = async () => {
        const response = await Http.instance.get('https://api.coinlore.net/api/tickers/');

        return response;
    }

    const getAndSetCoins = async () => {
        const response = await getCoins();

        setCoins(response.data);
        setAllCoins(response.data);
        setLoading(false);
    }

    const handlerPress = (coin) => {
        navigation.navigate("Detalle", { coin });
    }

    const handlerSearch = () => {

        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(query.toLowerCase())
        })

        setCoins(coinsFiltered);
    }


    const renderItem = ({ item }) => {
        return (<CoinsItem
            name={item.name}
            symbol={item.symbol}
            percent_change_1h={item.percent_change_1h}
            price={item.price_usd}
            onPress={() => handlerPress(item)}
        />
        )
    }

    return (
        <View style={styles.container}>
            <CoinsSearch
                setQuery={setQuery}
                handlerSearch={handlerSearch}
            />
            {loading ?
                <ActivityIndicator color="#fff" size="large" />
                : <FlatList
                    data={coins}
                    renderItem={renderItem}
                    style={styles.flatList}

                />}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blackPearl,
    },
    flatList:{
        backgroundColor: Colors.charade
    },
    title: {
        color: '#fff',
        textAlign: 'center'
    },
    btn: {
        padding: 8,
        backgroundColor: 'blue',
        borderRadius: 8,
        margin: 16
    },
    btnText: {
        color: '#fff',
        textAlign: 'center'
    }
});

export default CoinsScreen;