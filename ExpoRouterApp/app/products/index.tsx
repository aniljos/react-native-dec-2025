import axios from "axios";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BASE_URL } from "../config/api";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { useThemePreference, ColorPalette } from "../../hooks/useThemePreference";

type Product = {
  id: string;
  name: string;
  price: number;
  descritpion: string;
  imageUrl: string;
};
const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const { accessToken, userName, isAuthenticated } = useAuthGuard();
  const { colors } = useThemePreference();
  const styles = useMemo(() => createStyles(colors), [colors]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  async function fetchProducts() {
    try {
      const url = `${BASE_URL}/secure_products`;
      const response = await axios.get<Product[]>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const products = response.data;
      setProducts(products);
    } catch (error) {
      Alert.alert("Error", "Could not fetch products");
    }
  }

  function viewDetails(productId: string) {
    router.navigate(`/products/${productId}`);
  }

  const renderProduct = ({ item }: { item: Product }) => (
    <Pressable style={styles.card} onPress={() => viewDetails(item.id)}>
      <Image
        source={{ uri: `${BASE_URL}/${item.imageUrl}` }}
        style={styles.cardImage}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardPrice}>₹{item.price.toFixed(2)}</Text>
        </View>
        <Text style={styles.cardDescription} numberOfLines={3}>
          {item.descritpion}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Products</Text>
        <Text style={styles.subtitle}>
          {userName ? `Welcome, ${userName}` : "Tap a card to view details"}
        </Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContent}
        numColumns={1}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
      />
    </View>
  );
};

export default ProductListing;

const createStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingTop: 72,
    },
    header: {
      marginBottom: 20,
      paddingHorizontal: 8,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
    },
    subtitle: {
      marginTop: 6,
      fontSize: 16,
      color: colors.muted,
    },
    listContent: {
      paddingBottom: 24,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 5,
      flexDirection: "row",
      gap: 14,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    cardBody: {
      flex: 1,
    },
    cardTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "700",
      flex: 1,
      marginRight: 8,
    },
    cardPrice: {
      color: colors.success,
      fontSize: 16,
      fontWeight: "700",
    },
    cardDescription: {
      color: colors.muted,
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 10,
    },
    cardImage: {
      width: 110,
      height: 110,
      borderRadius: 12,
    },
  });
