import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View, Modal } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Axios from "axios";
import { API } from "../API/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [modalsukses, setmodalsukses] = useState(false);
    const navigation = useNavigation();
    const [modalemail, setmodalemail] = useState(false);
    const [showPw, setshowPw] = useState(false);
    const [kosong, setkosong] = useState(false);

    const show = () => {
        setshowPw(!showPw);
    };

    const btnRegister = () => {
        navigation.navigate("Registrasi")
    }
    const berhasil = () => {
        navigation.navigate("Home")
    }

    const btnLogin = async () => {
        const data = {
            username,
            password,
        };

        if (!username || !password || username.trim() === "" || password.trim() === "") {
            setkosong(true);
            return;
        } else {
            try {
                const response = await Axios.post(`${API}/api/auth/login`, data);
                setmodalsukses(true);
                const { token, nama, usernama, email, phone, id } = response.data;
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('nama', nama);
                await AsyncStorage.setItem('username', username);
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem('id', id.toString());
                await AsyncStorage.setItem('phone', phone.toString());
                usernama = "";
                password = "";
                navigation.navigate('Home');
                return false;
            } catch (error) {
                if (error.response && error.response.data) {
                    const message = error.response.data.message;
                    if (message.includes("Login Gagal, Coba Lagi")) {
                        setmodalemail(true);
                        return;
                    }
                } else {
                    console.log("Error", error.message);
                }
            }
        }
    };
    const closeModal = () => {
        setmodalsukses(false);
        setmodalemail(false);
        setkosong(false);
    }
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#1976D2" barStyle="light-content" />
            <View style={{ backgroundColor: "#2196F3", padding: 18, elevation: 20 }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', }}>Aplikasi Buku</Text>
            </View>
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
                    <Image source={require("../img/auth.png")} style={{ width: 300, height: 300 }} />
                </View>
                <View>
                    <Text style={{ fontSize: 30, color: '#000', fontWeight: 'bold', marginLeft: 25 }}>Login</Text>
                    <Text style={{ marginLeft: 25, color: '#000', fontSize: 14 }}>Please login using your username and password to continue</Text>
                </View>
                <View>
                    <TextInput placeholder="Username" autoFocus tabIndex={1} style={{ borderWidth: 1, borderColor: '#000', marginHorizontal: 25, marginTop: 30, borderRadius: 8, paddingLeft: 15, fontSize: 14, color: '#000', fontWeight: 'bold' }} value={username} onChangeText={(text) => { (setUsername(text)) }} />
                    <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#000', marginHorizontal: 25, marginTop: 14, borderRadius: 8, alignItems: 'center' }}>
                        <TextInput
                            placeholder="Password"
                            tabIndex={2}
                            style={{ flex: 1, paddingLeft: 15, fontSize: 14, color: '#000', fontWeight: 'bold' }}
                            secureTextEntry={!showPw}
                            value={password}
                            onChangeText={(text) => { (setPassword(text)) }}
                        />
                        <TouchableOpacity onPress={show} style={{ padding: 13 }}>
                            <Icon name={showPw ? "eye" : "eye-slash"} size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: "#2196F3", padding: 15, borderRadius: 10, marginHorizontal: 25, marginTop: 30, elevation: 10 }} onPress={btnLogin}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 16, fontWeight: '700' }}>Login</Text>
                </TouchableOpacity>
                <View>
                    <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 15, fontWeight: 'bold', color: '#000' }}>Don't have an Account?</Text>
                    <TouchableOpacity onPress={btnRegister}>
                        <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: '#1538FF' }}>Sign Up Now!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal visible={modalsukses} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 20, paddingHorizontal: 20, borderRadius: 6, alignItems: 'center' }}>
                        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={closeModal}>
                            <Text style={{ color: '#272727', fontSize: 18 }}>x</Text>
                        </TouchableOpacity>
                        <Image source={require('../img/berhasil.png')} style={{ width: 150, height: 150 }} />
                        <Text style={{ fontWeight: 'bold', marginTop: 20, fontSize: 16, color: '#272727', textAlign: 'center' }}>
                            Login Berhasil, Selamat Datang
                        </Text>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#617eb7', paddingVertical: 10, width: 330, borderRadius: 9, elevation: 2 }} onPress={berhasil}>
                            <Text style={{ color: '#FFFFFF' }}>Tutup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal visible={modalemail} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 20, paddingHorizontal: 20, borderRadius: 6, alignItems: 'center' }}>
                        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={closeModal}>
                            <Text style={{ color: '#272727', fontSize: 18 }}>x</Text>
                        </TouchableOpacity>
                        <Image source={require('../img/warning.png')} style={{ width: 165, height: 150 }} />
                        <Text style={{ fontWeight: 'bold', marginTop: 20, fontSize: 16, color: '#272727', textAlign: 'center' }}>
                            Login Gagal, Coba Lagi Yahhh ⚠️
                        </Text>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#617eb7', paddingVertical: 10, width: 330, borderRadius: 9, elevation: 2 }} onPress={closeModal}>
                            <Text style={{ color: '#FFFFFF' }}>Tutup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal visible={kosong} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 20, paddingHorizontal: 20, borderRadius: 6, alignItems: 'center' }}>
                        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={closeModal}>
                            <Text style={{ color: '#272727', fontSize: 18 }}>x</Text>
                        </TouchableOpacity>
                        <Image source={require('../img/warning.png')} style={{ width: 165, height: 150 }} />
                        <Text style={{ fontWeight: 'bold', marginTop: 20, fontSize: 16, color: '#272727', textAlign: 'center' }}>
                            Form Registrasi Wajib Di Isi Semua ya ⚠️
                        </Text>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#617eb7', paddingVertical: 10, width: 330, borderRadius: 9, elevation: 2 }} onPress={closeModal}>
                            <Text style={{ color: '#FFFFFF' }}>Tutup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default Login;
