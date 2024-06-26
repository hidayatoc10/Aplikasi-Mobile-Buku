import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View, Modal } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/Ionicons";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../API/api";

const User = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id, username, nama, email, nohp } = route.params;
    const [modalsukses, setmodalsukses] = useState(false);
    const [unama, setUnama] = useState(nama);
    const [uusername, setuusername] = useState(username);
    const [uemail, setuemail] = useState(email);
    const [upassword, setupassword] = useState("");
    const [ucpassword, setucpassword] = useState("");
    const [utelepon, setutelepon] = useState("+62");
    const [showpw1, setShowpw1] = useState(false);
    const [showpw2, setShowpw2] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [validasiP, setValidasiP] = useState(false);
    const [modalemail, setmodalemail] = useState(false);

    const show1 = () => setShowpw1(!showpw1);
    const show2 = () => setShowpw2(!showpw2);

    const handlePhoneChange = (text) => {
        if (text.startsWith("+62")) {
            setutelepon(text);
        } else if (text === "") {
            setutelepon("+62");
        } else {
            Alert.alert("Invalid Format", "Phone number must start with +62");
        }
    }
    const closeModal = () => {
        setmodalsukses(false);
        setModalVisible(false);
        setmodalemail(false);
        setValidasiP(false);
    }
    const berhasil = async () => {
        await AsyncStorage.removeItem('token');
    }
    const save = async () => {
        const data = {
            nama: unama,
            username: uusername,
            email: uemail,
            password: upassword,
            phone: parseInt(utelepon)
        };
        if (upassword !== ucpassword) {
            setValidasiP(true);
            return false;
        } else {
            try {
                const response = await Axios.put(`${API}/api/me/${id}`, data);
                setmodalsukses(true)
                await AsyncStorage.removeItem('token');
                navigation.navigate('Login');
            } catch (e) {
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
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: "#2196F3", padding: 25, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={{ flex: 2 }}>
                    <Icon2 name="arrow-back-outline" size={25} color="#fff" />
                </TouchableOpacity>
                <Text style={{ flex: 2.7, color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Profile</Text>
            </View>
            <View style={{ justifyContent: 'center', flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 28, color: '#000', marginLeft: 25 }}>Profile</Text>
                <Text style={{ marginLeft: 25, color: '#000', fontSize: 15 }}>Please update your profile information below</Text>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TextInput placeholder="Name" style={styles.input} value={unama} onChangeText={setUnama} />
                        <TextInput placeholder="Username" style={styles.input2} value={uusername} onChangeText={setuusername} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TextInput placeholder="Email" style={styles.input3} value={uemail} keyboardType="email-address" onChangeText={setuemail} />
                        <TextInput placeholder={nohp} style={styles.input4} value={utelepon} keyboardType="number-pad" onChangeText={handlePhoneChange} />
                    </View>
                    <View style={styles.passwordContainer}>
                        <TextInput placeholder="Password" style={styles.passwordInput} value={upassword} secureTextEntry={!showpw1} onChangeText={(text) => { (setupassword(text)) }} />
                        <TouchableOpacity onPress={show1}>
                            <Icon name={showpw1 ? "eye" : "eye-slash"} size={20} color="#000" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.passwordContainer}>
                        <TextInput placeholder="Confirm Password" style={styles.passwordInput} secureTextEntry={!showpw2} value={ucpassword} onChangeText={setucpassword} />
                        <TouchableOpacity onPress={show2}>
                            <Icon name={showpw2 ? "eye" : "eye-slash"} size={20} color="#000" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.saveButton} onPress={save}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal visible={modalsukses} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 20, paddingHorizontal: 20, borderRadius: 6, alignItems: 'center' }}>
                        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={closeModal}>
                            <Text style={{ color: '#272727', fontSize: 18 }}>x</Text>
                        </TouchableOpacity>
                        <Image source={require('../img/berhasil.png')} style={{ width: 150, height: 150 }} />
                        <Text style={{ fontWeight: 'bold', marginTop: 20, fontSize: 16, color: '#272727', textAlign: 'center' }}>
                            Profile Berhasil Di Ubah
                        </Text>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#617eb7', paddingVertical: 10, width: 330, borderRadius: 9, elevation: 2 }} onPress={berhasil}>
                            <Text style={{ color: '#FFFFFF' }}>Tutup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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

const styles = {
    input: {
        borderWidth: 1, borderColor: '#000', marginTop: 30, borderRadius: 8, paddingLeft: 15, fontSize: 14, color: '#000', fontWeight: 'bold', flex: 1, marginLeft: 25
    },
    input2: {
        borderWidth: 1, borderColor: '#000', marginTop: 30, borderRadius: 8, paddingLeft: 15, fontSize: 14, color: '#000', fontWeight: 'bold', flex: 1, marginLeft: 10, marginRight: 25
    },
    input3: {
        borderWidth: 1, borderColor: '#000', marginTop: 14, borderRadius: 8, paddingLeft: 15, fontSize: 14, color: '#000', fontWeight: 'bold', flex: 1, marginLeft: 25
    },
    input4: {
        borderWidth: 1, borderColor: '#000', marginTop: 14, borderRadius: 8, paddingLeft: 15, fontSize: 14, color: '#000', fontWeight: 'bold', flex: 1, marginLeft: 10, marginRight: 25
    },
    passwordContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#000',
        marginTop: 14,
        borderRadius: 8,
        paddingLeft: 15,
        marginHorizontal: 25,
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold'
    },
    icon: {
        padding: 10,
    },
    saveButton: {
        backgroundColor: "#2196F3",
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 25,
        marginTop: 20
    },
    saveButtonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    }
};

export default User;
