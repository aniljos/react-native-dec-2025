import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
const baseUrl = "http://localhost:9000";

type Product = {
    id: string
    name: string
    price: number,
    descritpion: string,
    imageUrl: string
}
const ProductDetails = () => {

    const { id } = useLocalSearchParams<{ id: string }>();
    const [product, setProduct] = useState<Product| null>(null);

    useEffect(() => {
        fetchProductDetails();
    }, [])

    const fetchProductDetails = async () => {

        try {
            const url = `${baseUrl}/products/${id}`;
            const response = await axios.get<Product>(url);
            const product = response.data;
            setProduct(product);
        } catch (error) {
            Alert.alert("Error", "Could not fetch product details");
        }

    }

    return (
        <View>
            <Text>ProductDetails : {id}</Text>
            {product && <View>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>{product.name}</Text>
                <Text style={{color: 'green'}}>{product.price}</Text>
                <Text>{product.descritpion}</Text>
            </View>}
        </View>
    )
}

export default ProductDetails

const styles = StyleSheet.create({})