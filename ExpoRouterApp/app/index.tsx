import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Expo Router Application</Text>

      <Link href="/dimensions" style={{ marginTop: 20 }}>
        <View style={styles.linkContainer}>
           <Text style={styles.linkText}>Dimensions</Text>
        </View>
        
      </Link>
      <Link href="/linking" style={{ marginTop: 20 }}>
        <View style={styles.linkContainer}>
           <Text style={styles.linkText}>Linking</Text>
        </View>
      </Link>
      <Link href="/share" style={{ marginTop: 20 }}>
        <View style={styles.linkContainer}>
           <Text style={styles.linkText}>Share</Text>
        </View>
      </Link>
      <Link href="/products" style={{ marginTop: 20 }}>
        <View style={styles.linkContainer}>
           <Text style={styles.linkText}>Products</Text>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  linkText: {
    color: "blue",
    padding: 10,
    
  },
  linkContainer: {
    borderWidth: 2,
    borderColor: "#0f0aadff",
    marginVertical: 10,
    padding: 10,
    width: 150,
    height: 60,
    marginTop: 20,
  }

});
