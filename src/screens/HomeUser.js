import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { Image, ScrollView, StatusBar } from "react-native";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const HomeUser = () => {
    const navigation = useNavigation();
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#dce6f0" }}>
            <StatusBar backgroundColor="#dce6f0" barStyle='dark-content' />
            <Image source={require('../img/gambar1.jpg')} style={{ width: 390, height: 400, marginTop: 30 }} />
            <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: '#0D47A1', fontFamily: "Ephesis-Regular" }}>Welcome B00K$ </Text>
            <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: '#0D47A1', fontFamily: "Ephesis-Regular" }}>App Hidayat</Text>
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '500', marginTop: 20, color: '#0D47A1' }}>Take Your Literacy to the Next Level</Text>
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '500', color: '#0D47A1' }}>and become a BEAST</Text>

            <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Registrasi')}
                    style={{ backgroundColor: '#1A237E', padding: 15, width: 150, borderRadius: 30, marginTop: 30, }}>
                    <Text style={{ color: 'white', fontSize: 20, textAlign: "center" }}>I'M NEW</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={{ borderWidth: 2, borderColor: '#1A237E', padding: 15, width: 150, borderRadius: 30, marginTop: 30, marginLeft: 30 }}>
                    <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>LOG IN</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default HomeUser;