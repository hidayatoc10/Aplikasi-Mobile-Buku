import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React, { Component, useState, useEffect } from "react";
import { Text, View, TextInput, FlatList, TouchableOpacity, Image, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from "react-native-vector-icons/Ionicons";

const Search = () => {
    const Navigation = useNavigation();
    const [htmlCss, setHtmlCss] = useState([
        {
            judul: 'HTML Dasar',
            image: require('../img/buku.jpg'),
            author: 'Svetlin Nakov dkk',
        },
        {
            judul: 'Belajar CSS dasar',
            image: require('../img/css.jpg'),
            author: 'Dotan Nahum',
        },
        {
            judul: 'HTML & CSS Mahir',
            image: require('../img/html.jpg'),
            author: 'Community',
        },
    ]);
    const [js, setJs] = useState([
        {
            judul: 'Javascript Dasar',
            image: require('../img/js.jpg'),
            author: 'Dotan Nahum',
        },
        {
            judul: 'Javascript Menengah',
            image: require('../img/js2.jpg'),
            author: 'Dotan Nahum',
        },
        {
            judul: 'Javascript Atas',
            image: require('../img/js3.jpg'),
            author: 'Community',
        },
        {
            judul: 'Javascript Mahir',
            image: require('../img/js4.jpg'),
            author: 'Hidayatullah',
        },
    ]);
    return (
        <ScrollView>
            <View style={{ marginTop: 18, flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => Navigation.navigate("Home")}
                    style={{ flex: 1, marginLeft: 20 }}>
                    <Icon2 name="arrow-back-outline" size={25} color="#000" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', flex: 15 }}>
                    Search Book
                </Text>
            </View>
            <View style={{ margin: 15, marginTop: 20, flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: '#383636', borderRadius: 10 }}>
                <Icon name="search" size={23} style={{ position: 'relative', left: 10, }} color="black" />
                <TextInput placeholder='Search For Book'
                    autoFocus={true}
                    style={{ flex: 1, paddingLeft: 20, fontSize: 18 }} />
            </View>
            <View style={{ marginLeft: 20, marginTop: 15 }}>
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                    <Text style={{ fontWeight: '900', color: '#212121', fontSize: 15 }}>
                        HTML & CSS
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Buku')}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                        }}>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={htmlCss}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                width: 150,
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                marginTop: 10,
                            }}>
                            <Image
                                source={item.image}
                                style={{ width: 130, height: 150, borderRadius: 5 }}
                                resizeMode="contain"
                            />
                            <Text style={{ fontWeight: 'bold' }}>{item.judul}</Text>
                            <Text style={{ fontSize: 14 }}>{item.author}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <View style={{ marginLeft: 20, marginTop: 20, marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                    <Text style={{ fontWeight: '900', color: '#212121', fontSize: 15 }}>JAVASCRIPT</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Buku')}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                        }}>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={js}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                width: 150,
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                marginTop: 10,
                            }}>
                            <Image
                                source={item.image}
                                style={{ width: 130, height: 150, borderRadius: 5 }}
                                resizeMode="contain"
                            />
                            <Text style={{ fontWeight: 'bold' }}>{item.judul}</Text>
                            <Text style={{ fontSize: 14 }}>{item.author}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={{ marginLeft: 20, marginTop: 15, marginBottom: 40 }}>
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                    <Text style={{ fontWeight: '900', color: '#212121', fontSize: 15 }}>
                        PHP DASAR
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Buku')}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                        }}>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={htmlCss}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                width: 150,
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                marginTop: 10,
                            }}>
                            <Image
                                source={item.image}
                                style={{ width: 130, height: 150, borderRadius: 5 }}
                                resizeMode="contain"
                            />
                            <Text style={{ fontWeight: 'bold' }}>{item.judul}</Text>
                            <Text style={{ fontSize: 14 }}>{item.author}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ScrollView>
    );
}

export default Search;