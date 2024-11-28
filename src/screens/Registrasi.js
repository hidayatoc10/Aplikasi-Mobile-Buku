import { useNavigation } from "@react-navigation/native";
import Axios from "axios";
import React, { useState } from "react";
import { Button, Text, View, StatusBar, ScrollView, Image, TextInput, TouchableOpacity, Alert, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { API } from "../API/api";

const Registrasi = () => {
    const [nama, setNama] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [telepon, setTelepon] = useState("+62");
    const [cpassword, setCpassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalemail, setmodalemail] = useState(false);
    const navigation = useNavigation();
    const [showpw1, setShowpw1] = useState(false);
    const [showpw2, setShowpw2] = useState(false);
    const [modalsukses, setmodalsukses] = useState(false);
    const [kosong, setkosong] = useState(false);
    const [min, setmin] = useState(false);
    const [validasi, setvalidasi] = useState(false);
    const [validasiP, setValidasiP] = useState(false);

    const show2 = () => {
        setShowpw2(!showpw2);
    }
    const show1 = () => {
        setShowpw1(!showpw1);
    }

    const btnLogin = () => {
        navigation.navigate("Login")
    }

    const reset = () => {
        setNama("");
        setUsername("");
        setEmail("");
        setPassword("");
        setTelepon("+62");
        setCpassword("");
    }
    const handlePhoneChange = (text) => {
        if (text.startsWith("+62")) {
            setTelepon(text);
        } else if (text === "") {
            setTelepon("+62");
        } else {
            Alert.alert("Invalid Format", "Phone number must start with 62");
        }
    }
    const btnRegistrasi = () => {
        const data = {
            nama,
            username,
            email,
            password,
            phone: parseInt(telepon),
        };
        const validasi = /^[a-zA-z0-9._%+-]+@(gmail\.com|outlook\.com)$/;
        if (nama == "" || username == "" || email == "" || password == "" || telepon == "" || cpassword == "") {
            setkosong(true);
            return false;
        } else if (nama == " " || username == " " || email == " " || password == " " || telepon == " " || cpassword == " ") {
            setkosong(true);
            return false;
        } else if (password.length < 3 || username.length < 3 || telepon.length < 9) {
            setvalidasi(true);
            return false;
        } else if (!(validasi.test(email))) {
            setmin(true);
            return false;
        } else if (password !== cpassword) {
            setValidasiP(true);
            return false;
        } else {
            Axios.post(`${API}/api/auth/register`, data)
                .then((ress) => {
                    setmodalsukses(true);
                    console.log("Berhasil", ress.data);
                    reset();
                }).catch((e) => {
                    if (e.response && e.response.data) {
                        const message = e.response.data.message;
                        if (message.includes("Username sudah terdaftar")) {
                            setModalVisible(true);
                        } else if (message.includes("Email sudah terdaftar")) {
                            setmodalemail(true);
                        } else {
                            Alert.alert("Error", "Registrasi gagal, coba lagi nanti");
                        }
                    } else {
                        Alert.alert("Error", "Terjadi Kesalahan");
                    }
                })
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setmodalemail(false);
        setmodalsukses(false);
        setkosong(false);
        setmin(false);
        setvalidasi(false);
        setValidasiP(false);
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#1976D2" barStyle="light-content" />
            <View style={{ backgroundColor: "#2196F3", padding: 18, elevation: 20 }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', }}>Aplikasi Buku</Text>
            </View>
            <ScrollView>
                <View style={{ alignItems: 'center', marginTop: 60 }}>
                    <Image source={require("../img/digital-contract.png")} style={{ width: 200, height: 200 }} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 30, color: '#000', fontWeight: 'bold', marginLeft: 25 }}>Registrasi</Text>
                    <Text style={{ marginLeft: 25, color: '#000', fontSize: 14 }}>Create your account now and explore!</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TextInput placeholder="Nama" autoFocus tabIndex={1} style={{ borderWidth: 1, borderColor: '#000', marginTop: 30, borderRadius: 8, paddingLeft: 15, fontSize: 14, color: '#000', fontWeight: 'bold', flex: 1, marginLeft: 25 }} value={nama} onChangeText={(text) => { setNama(text) }} />
                        <TextInput placeholder="Username" tabIndex={2} style={{ borderWidth: 1, borderColor: '#000', marginTop: 30, borderRadius: 8, paddingLeft: 15, fontSize: 14, color: '#000', fontWeight: 'bold', flex: 1, marginLeft: 10, marginRight: 25 }} value={username} onChangeText={(text) => { setUsername(text) }} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TextInput placeholder="Email" tabIndex={1} style={{ borderWidth: 1, borderColor: '#000', marginTop: 14, borderRadius: 8, paddingLeft: 15, fontSize: 14, color: '#000', fontWeight: 'bold', flex: 1, marginLeft: 25 }} value={email} onChangeText={(text) => { setEmail(text) }} keyboardType="email-address" />
                        <TextInput placeholder="Nomor Telepon" tabIndex={2} style={{ borderWidth: 1, borderColor: '#000', marginTop: 14, borderRadius: 8, paddingLeft: 15, fontSize: 14, color: '#000', fontWeight: 'bold', flex: 1, marginLeft: 10, marginRight: 25 }} value={telepon} onChangeText={handlePhoneChange} keyboardType="number-pad" />
                    </View>
                    <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#000', marginTop: 14, borderRadius: 8, paddingLeft: 15, marginHorizontal: 25, alignItems: 'center' }}>
                        <TextInput placeholder="Password" tabIndex={2} style={{ flex: 1, fontSize: 14, color: '#000', fontWeight: 'bold' }} secureTextEntry={!showpw1} value={password} onChangeText={(text) => { setPassword(text) }} />
                        <TouchableOpacity onPress={show1}>
                            <Icon name={showpw1 ? "eye" : "eye-slash"} size={20} color="#000" style={{ padding: 10, }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#000', marginTop: 14, borderRadius: 8, paddingLeft: 15, marginHorizontal: 25, alignItems: 'center' }}>
                        <TextInput placeholder="Confirm Password" tabIndex={2} style={{ flex: 1, fontSize: 14, color: '#000', fontWeight: 'bold' }} secureTextEntry={!showpw2} value={cpassword} onChangeText={(text) => { setCpassword(text) }} />
                        <TouchableOpacity onPress={show2}>
                            <Icon name={showpw2 ? "eye" : "eye-slash"} size={20} color="#000" style={{ padding: 10, }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ backgroundColor: "#2196F3", padding: 15, borderRadius: 10, marginHorizontal: 23, marginTop: 20, width: 160, elevation: 5 }} onPress={btnRegistrasi}>
                        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 16, fontWeight: '700' }}>Registrasi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#2196F3", padding: 15, borderRadius: 10, marginTop: 20, width: 160, elevation: 5 }} onPress={reset}>
                        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 16, fontWeight: '700' }}>Reset</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 15, fontWeight: 'bold', color: '#000' }}>Already have an account?</Text>
                    <TouchableOpacity onPress={btnLogin}>
                        <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: '#1538FF' }}>Log in here!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 20, paddingHorizontal: 20, borderRadius: 6, alignItems: 'center' }}>
                        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={closeModal}>
                            <Text style={{ color: '#272727', fontSize: 18 }}>x</Text>
                        </TouchableOpacity>
                        <Image source={require('../img/warning.png')} style={{ width: 165, height: 150 }} />
                        <Text style={{ fontWeight: 'bold', marginTop: 20, fontSize: 16, color: '#272727', textAlign: 'center' }}>
                            Opss Username sudah terdaftar coba pakai Username lain ⚠️
                        </Text>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#617eb7', paddingVertical: 10, width: 330, borderRadius: 9, elevation: 2 }} onPress={closeModal}>
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
                            Opss Email sudah terdaftar coba pakai Email lain ⚠️
                        </Text>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#617eb7', paddingVertical: 10, width: 330, borderRadius: 9, elevation: 2 }} onPress={closeModal}>
                            <Text style={{ color: '#FFFFFF' }}>Tutup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal visible={modalsukses} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 20, paddingHorizontal: 20, borderRadius: 6, alignItems: 'center' }}>
                        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={closeModal}>
                            <Text style={{ color: '#272727', fontSize: 18 }}>x</Text>
                        </TouchableOpacity>
                        <Image source={require('../img/berhasil.png')} style={{ width: 150, height: 150 }} />
                        <Text style={{ fontWeight: 'bold', marginTop: 20, fontSize: 16, color: '#272727', textAlign: 'center' }}>
                            Registrasi Berhasil, Silahkan Login
                        </Text>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#617eb7', paddingVertical: 10, width: 330, borderRadius: 9, elevation: 2 }} onPress={btnLogin}>
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
            <Modal visible={validasi} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 20, paddingHorizontal: 20, borderRadius: 6, alignItems: 'center' }}>
                        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={closeModal}>
                            <Text style={{ color: '#272727', fontSize: 18 }}>x</Text>
                        </TouchableOpacity>
                        <Image source={require('../img/warning.png')} style={{ width: 165, height: 150 }} />
                        <Text style={{ fontWeight: 'bold', marginTop: 20, fontSize: 16, color: '#272727', textAlign: 'center' }}>
                            Username dan Password minimal 3 huruf atau Nomor Telepon minimal 9 angka ⚠️
                        </Text>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#617eb7', paddingVertical: 10, width: 330, borderRadius: 9, elevation: 2 }} onPress={closeModal}>
                            <Text style={{ color: '#FFFFFF' }}>Tutup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal visible={min} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 20, paddingHorizontal: 20, borderRadius: 6, alignItems: 'center' }}>
                        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={closeModal}>
                            <Text style={{ color: '#272727', fontSize: 18 }}>x</Text>
                        </TouchableOpacity>
                        <Image source={require('../img/warning.png')} style={{ width: 165, height: 150 }} />
                        <Text style={{ fontWeight: 'bold', marginTop: 20, fontSize: 16, color: '#272727', textAlign: 'center' }}>
                            Email Salah, Coba Lagi ⚠️
                        </Text>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#617eb7', paddingVertical: 10, width: 330, borderRadius: 9, elevation: 2 }} onPress={closeModal}>
                            <Text style={{ color: '#FFFFFF' }}>Tutup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal visible={validasiP} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 20, paddingHorizontal: 20, borderRadius: 6, alignItems: 'center' }}>
                        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={closeModal}>
                            <Text style={{ color: '#272727', fontSize: 18 }}>x</Text>
                        </TouchableOpacity>
                        <Image source={require('../img/warning.png')} style={{ width: 165, height: 150 }} />
                        <Text style={{ fontWeight: 'bold', marginTop: 20, fontSize: 16, color: '#272727', textAlign: 'center' }}>
                            Password berbeda dengan Confirmasi Password ⚠️
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

export default Registrasi;
