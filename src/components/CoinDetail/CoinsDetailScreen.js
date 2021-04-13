import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, SectionList, FlatList, ActivityIndicator, Pressable, Alert } from 'react-native';

import colors from '../../utils/colors';
import Http from '../../libs/http';
import CoinMakertItem from './CoinMarketItem';
import Storage from '../../libs/storage'

const CoinsDetailScreen = (props) => {
    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    const { coin } = props.route.params;

    useEffect(() => {

        props.navigation.setOptions({ title: coin.symbol })

        getMarketsAndSetMarkets(coin.id);

        coinIsFavorite();
    }, [])

    useEffect(() => {
        if (markets.length > 0) {
            setLoading(false);
        }
    }, [markets]);

    const getSymbolIcon = (name) => {
        if (name) {
            name = name.toLowerCase().replace(' ', '-');
            return `https://c1.coinlore.com/img/25x25/${name}.png`;
        }
    }

    const getSections = (coin) => {
        const sections = [{
            title: "Market cap",
            data: [coin.market_cap_usd]
        },
        {
            title: "Volume 24h",
            data: [coin.volume24]
        },
        {
            title: 'Change 24h',
            data: [coin.percent_change_24h]
        }
        ]

        return sections;
    }

    const getMarketsByCoinId = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

        const response = await Http.instance.get(url);

        return response;
    }

    const getMarketsAndSetMarkets = async (coinId) => {
        const response = await getMarketsByCoinId(coinId);

        setMarkets(response);
    }

    const renderItem = ({ item }) => {
        return (<View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
        </View>);
    }

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite();
        } else {
            addFavorite();
        }
    }

    const addFavorite = async () => {
        const currency = JSON.stringify(coin);
        const key = `favorite-${coin.id}`;

        const stored = await Storage.instance.store(key, currency);

        if (stored) {
            setIsFavorite(true);
        }
    }

    const removeFavorite = async () => {

        Alert.alert("Remove favorite", "Are You sure?", [
            {
                text: "Cancel",
                onPress:() => { },
                style: 'cancel'
            },
            {
                text: "Remove",
                onPress:async() => {
                    const key = `favorite-${coin.id}`;

                    const removed = await Storage.instance.remove(key);

                    if (removed) {
                        setIsFavorite(false);
                    }
                },
                style: 'destructive'
            },
        ])

    }

    const coinIsFavorite = async () => {
        const key = `favorite-${coin.id}`;

        const currency = await Storage.instance.get(key);

        if (currency) {
            setIsFavorite(true);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.subHeader}>
                <View style={styles.row}>
                    <Image style={styles.iconImage} source={{ uri: getSymbolIcon(coin.name) }} />
                    <Text style={styles.titleText}>{coin.name}</Text>
                </View>


                <Pressable style={
                    [
                        styles.btnFavorite,
                        isFavorite ?
                            styles.btnFavoriteRemove :
                            styles.btnFavoriteAdd
                    ]}
                    onPress={toggleFavorite}
                >
                    <Text style={styles.btnFavoriteText}>
                        {isFavorite ? "Remove favorite" : "Add favorite"}
                    </Text>
                </Pressable>
            </View>

            <SectionList
                style={styles.section}
                sections={getSections(coin)}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                renderSectionHeader={({ section }) => <View style={styles.sectionHeader}>
                    <Text style={styles.sectionText}>{section.title}</Text>
                </View >}
            />

            <Text style={styles.marketsTitle}>Markets</Text>
            {loading ?
                <ActivityIndicator color="#fff" size="large" />
                : <FlatList
                    style={styles.list}
                    data={markets}
                    renderItem={({ item }) => (
                        <CoinMakertItem item={item} />
                    )}
                    horizontal={true}
                />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.charade,
        flex: 1
    },
    subHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginLeft: 8
    },
    iconImage: {
        width: 25,
        height: 25
    },
    section: {
        maxHeight: 220
    },
    sectionHeader: {
        backgroundColor: 'rgba(0,0,0, 0.2)',
        padding: 8,
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: colors.white,
        fontSize: 14,
    },
    sectionText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold'
    },
    list: {
        maxHeight: 100,
        paddingLeft: 16
    },
    marketsTitle: {
        color: colors.white,
        fontSize: 16,
        marginBottom: 16,
        marginLeft: 16,
        fontWeight: 'bold'
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8
    },
    btnFavoriteAdd: {
        backgroundColor: colors.picton
    },
    btnFavoriteRemove: {
        backgroundColor: colors.carmine
    },
    btnFavoriteText: {
        color: colors.white
    },
    row: {
        flexDirection: 'row'
    }
});

export default CoinsDetailScreen;