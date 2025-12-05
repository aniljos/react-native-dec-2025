import axios from 'axios';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';

type Product = {
    id: string
    name: string
    price: number,
    descritpion: string,
    imageUrl: string
}
const baseUrl = "http://localhost:9000";

const ProductListing = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchProducts();
    }, [])

    async function fetchProducts(){

        try {
            const url = `${baseUrl}/products`;
            const response = await axios.get<Product[]>(url);
            const products = response.data;
            setProducts(products);
        } catch (error) {
            Alert.alert("Error", "Could not fetch products");
        }
    }

    function viewDetails(productId: string){
        router.navigate(`/products/${productId}`);
    }

  return (
    <View>
      <Text>Product Listing</Text>

      <FlatList data={products} keyExtractor={(item) => item.id} 
        renderItem={({item}) => {
            return <View style={{borderWidth: 1, margin: 10, padding: 10}}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
                <Text style={{color: 'green'}}>{item.price}</Text>
                <Text>{item.descritpion}</Text>
                <Image source={{uri: `${baseUrl}/${item.imageUrl}`}} style={{width: 100, height: 100}} />
                <Button title='View Details' onPress={() => viewDetails(item.id)}/>
            </View>
        }}/>
    </View>
  )
}

export default ProductListing

const styles = StyleSheet.create({

})