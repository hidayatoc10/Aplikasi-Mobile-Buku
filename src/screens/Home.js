import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    TextInput,
    Button,
    Alert,
    Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation, route }) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [nama, setnama] = useState("");
    const [nohp, setnohp] = useState("");
    const [id, setId] = useState("");
    const [logoutt, setlogoutt] = useState(false);
    const [greeting, setGreeting] = useState('');


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
    const [daftarRekomendasi, setDaftarRekomendasi] = useState([
        {
            judul: '7 Buku Pemrograman terbaik',
            deskripsi: '7 buku pemrograman ini sangat direkomendasikan untuk dibaca',
            image: require('../img/intro_to_programming.jpg'),
        },
        {
            judul: 'Mahir Dalam Back End Website',
            deskripsi: 'Mahir dalam back end pemrograman website, direkomendasikan untuk dibaca',
            image: require('../img/programming_react_native.png'),
        },
        {
            judul: '7 Buku Pemrograman terbaik',
            deskripsi: '7 buku pemrograman ini sangat direkomendasikan untuk dibaca',
            image: require('../img/react_native_grow.png'),
        },
    ]);

    useEffect(() => {
        const getUsername = async () => {
            const username = await AsyncStorage.getItem("username");
            const nama = await AsyncStorage.getItem("nama");
            const email = await AsyncStorage.getItem("email");
            const nohp = await AsyncStorage.getItem("phone");
            const id = await AsyncStorage.getItem("id");
            setUsername(username);
            setnama(nama);
            setEmail(email);
            setnohp(nohp);
            setId(id);
        };

        const setGreetingMessage = () => {
            const now = new Date();
            const hours = now.getHours();
            if (hours >= 5 && hours < 12) {
                setGreeting('Selamat Pagi');
            } else if (hours >= 12 && hours < 15) {
                setGreeting('Selamat Siang');
            } else if (hours >= 15 && hours < 18) {
                setGreeting('Selamat Sore');
            } else {
                setGreeting('Selamat Malam');
            }
        };
        getUsername();
        setGreetingMessage();
    }, []);

    const logout = () => {
        setlogoutt(true);
    };

    const logout2 = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('nama');
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('phone');
        await AsyncStorage.removeItem('id');
        navigation.replace('Login');
    }
    const closeModal = () => {
        setlogoutt(false);
    }
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#3880ff" barStyle="light-content" />
            <ScrollView>
                <View
                    style={{
                        backgroundColor: '#3880ff',
                        paddingBottom: 15,
                        borderBottomEndRadius: 30,
                        borderBottomLeftRadius: 30,
                        elevation: 5,
                    }}>
                    <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                        <Text style={{ color: '#FFFFFF', fontSize: 15 }}>{greeting}</Text>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FFFFFF' }}>
                            {nama}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        style={{ position: 'absolute', top: 10, right: 20 }}>
                        <Image
                            source={require('../img/user.png')}
                            style={{ width: 70, height: 70 }}
                        />
                    </TouchableOpacity>

                    <View style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>
                        <FlatList
                            data={daftarRekomendasi}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        marginRight: 20,
                                        elevation: 3,
                                        padding: 10,
                                        marginBottom: 10,
                                        borderRadius: 5,
                                    }}>
                                    <View style={{ marginRight: 10, width: 200 }}>
                                        <Text
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: 20,
                                                color: '#212121',
                                            }}>
                                            {item.judul}
                                        </Text>
                                        <Text style={{ fontSize: 16, paddingTop: 10 }}>{item.deskripsi}</Text>
                                    </View>
                                    <View>
                                        <Image
                                            source={item.image}
                                            style={{ width: 130, height: 150, borderRadius: 5 }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
                <View style={{ margin: 15, marginTop: 20, flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: '#383636', borderRadius: 10 }}>
                    <Icon name="search" size={23} style={{ position: 'relative', left: 10, }} color="black" />
                    <TextInput placeholder='Search For Book' style={{ flex: 1, paddingLeft: 20, fontSize: 18 }} />
                </View>

                <View style={{ marginLeft: 20, marginTop: 15 }}>
                    <View style={{ flexDirection: 'row', marginRight: 10 }}>
                        <Text style={{ fontWeight: '900', color: '#212121', fontSize: 15 }}>
                            HTML & CSS
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Search')}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                            }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginRight: 5 }}>Lihat Semua</Text>
                                <Icon name="arrow-right" size={18} color="black" />
                            </View>
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
                            onPress={() => navigation.navigate('Search')}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                            }}><View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginRight: 5 }}>Lihat Semua</Text>
                                <Icon name="arrow-right" size={18} color="black" />
                            </View>
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
                <View style={{ marginLeft: 20, marginTop: 20, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', marginRight: 10 }}>
                        <Text style={{ fontWeight: '900', color: '#212121', fontSize: 15 }}>BACK END PHP</Text>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                            }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Search")}
                                style={{ flexDirection: 'row' }}>
                                <Text style={{ marginRight: 5 }}>Lihat Semua</Text>
                                <Icon name="arrow-right" size={18} color="black" />
                            </TouchableOpacity>
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
            <View style={{ flexDirection: 'row', paddingVertical: 8, paddingBottom: 15, backgroundColor: 'white', borderRadius: 10, padding: 10, elevation: 4, margin: 17 }}>
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 5, }}>
                    <Icon name="home" size={24} color="#3880ff" />
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Search")}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 5, }}>
                    <Icon name="search" size={24} color="#c0bebe" />
                    <Text>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Belajar')}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 5, }}>
                    <Icon name="book" size={24} color="#c0bebe" />
                    <Text>Books</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('User', { id, username, nama, email, nohp })}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 5, }}>
                    <Icon name="user-alt" size={24} color="#c0bebe" />
                    <Text>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={logout}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 5, }}>
                    <Icon name="cog" size={24} color="#c0bebe" />
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={logoutt} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 20, paddingHorizontal: 20, borderRadius: 6, alignItems: 'center' }}>
                        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={closeModal}>
                            <Text style={{ color: '#272727', fontSize: 18 }}>x</Text>
                        </TouchableOpacity>
                        <Image source={require('../img/warning.png')} style={{ width: 165, height: 150 }} />
                        <Text style={{ fontWeight: 'bold', marginTop: 20, fontSize: 16, color: '#272727', textAlign: 'center' }}>
                            Apakah Anda Ingin Logout? ⚠️
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#617eb7', paddingVertical: 10, width: 150, marginHorizontal: 10, borderRadius: 9, elevation: 2 }} onPress={logout2}>
                                <Text style={{ color: '#FFFFFF' }}>Keluar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#617eb7', paddingVertical: 10, width: 150, marginHorizontal: 10, borderRadius: 9, elevation: 2 }} onPress={closeModal}>
                                <Text style={{ color: '#FFFFFF' }}>Tutup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal >
        </View>
    );
};

export default Home;
