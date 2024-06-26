import React, { useState, useEffect } from "react";
import { Alert, Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import axios from 'axios';

const Belajar = () => {
    const [gambar, setGambar] = useState("");
    const [gambarUri, setGambarUri] = useState("");
    const [fetchedImages, setFetchedImages] = useState([]);

    const tekan = () => {
        let options = {
            storageOptions: {
                path: "img"
            }
        };
        launchImageLibrary(options, response => {
            if (response.didCancel || response.error || !response.assets) {
                Alert.alert("Error selecting image");
                return;
            }
            setGambar(response.assets[0].uri);
            setGambarUri(response.assets[0].uri);
        });
    };

    const simpan = async () => {
        if (!gambarUri) {
            Alert.alert("No image selected");
            return;
        }

        const formData = new FormData();
        formData.append('file', {
            uri: gambarUri,
            type: 'image/jpeg', // or the correct MIME type for your image
            name: 'image.jpg'
        });

        try {
            const response = await axios.post("http://192.168.80.251:5000/api/gambar", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            Alert.alert("Image uploaded successfully", "Berhasil");
            fetchImages();
        } catch (error) {
            Alert.alert("Failed to upload image");
            console.error(error);
        }
    };

    const fetchImages = async () => {
        try {
            const response = await axios.get("http://192.168.80.251:5000/api/gambar");
            setFetchedImages(response.data);
        } catch (error) {
            Alert.alert("Failed to fetch images");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: gambar }} style={{ width: 300, height: 400 }} />
            <TouchableOpacity style={{ backgroundColor: 'blue', padding: 20, marginHorizontal: 20, borderRadius: 10, elevation: 10 }} onPress={tekan}>
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Pilih Gambar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'blue', padding: 20, marginHorizontal: 20, borderRadius: 10, elevation: 10 }} onPress={simpan}>
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Simpan</Text>
            </TouchableOpacity>
            {fetchedImages.length > 0 ? (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
                    {fetchedImages.map((imgUri, index) => (
                        <Image key={index} source={{ uri: imgUri }} style={{ width: 100, height: 100, margin: 5 }} />
                    ))}
                </View>
            ) : (
                <Text>No images fetched</Text>
            )}
        </ScrollView>
    );
}

export default Belajar;
