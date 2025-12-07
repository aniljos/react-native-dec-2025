import axios from "axios";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BASE_URL } from "../../config/api";
import { useAuthGuard } from "../../../hooks/useAuthGuard";
import { useThemePreference, ColorPalette } from "../../../hooks/useThemePreference";

type Product = {
  id: string;
  name: string;
  price: number;
  descritpion: string;
  imageUrl: string;
};
const ProductDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const { accessToken, userName, isAuthenticated } = useAuthGuard();
  const { colors } = useThemePreference();
  const styles = useMemo(() => createStyles(colors), [colors]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProductDetails();
    }
  }, [isAuthenticated]);

  const fetchProductDetails = async () => {
    try {
      const url = `${BASE_URL}/products/${id}`;
      const response = await axios.get<Product>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const product = response.data;
      setProduct(product);
    } catch (error) {
      Alert.alert("Error", "Could not fetch product details");
    }
  };

  if (!product) {
    return (
      <View style={styles.screen}>
        <Text style={styles.loadingText}>Loading product...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Pressable onPress={() => router.back()} style={styles.backLink}>
        <Text style={styles.backText}>← Back to products</Text>
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
      </View>
      {userName ? <Text style={styles.subtitle}>Viewing as {userName}</Text> : null}

      <Image
        source={{ uri: `${BASE_URL}/${product.imageUrl}` }}
        style={styles.heroImage}
        contentFit="cover"
        transition={200}
      />

      <View style={styles.detailCard}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.descritpion}</Text>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

const createStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingTop: 56,
    },
    content: {
      paddingBottom: 32,
    },
    loadingText: {
      color: colors.text,
      fontSize: 16,
      textAlign: "center",
      marginTop: 40,
    },
    backLink: {
      marginBottom: 16,
    },
    backText: {
      color: colors.muted,
      fontSize: 15,
      fontWeight: "600",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 12,
    },
    title: {
      color: colors.text,
      fontSize: 26,
      fontWeight: "800",
      flex: 1,
      marginRight: 12,
    },
    price: {
      color: colors.success,
      fontSize: 20,
      fontWeight: "700",
    },
    subtitle: {
      color: colors.muted,
      fontSize: 15,
      marginBottom: 8,
    },
    heroImage: {
      width: "100%",
      height: 260,
      borderRadius: 16,
      marginBottom: 16,
    },
    detailCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 18,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 5,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 8,
    },
    description: {
      color: colors.muted,
      fontSize: 15,
      lineHeight: 21,
    },
  });
