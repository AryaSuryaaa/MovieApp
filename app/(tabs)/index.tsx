import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { colors } from "@/theme";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

const Index = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.topBg} />

      <ScrollView
        style={styles.sv}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.svContainer}
      >
        <Image source={icons.logo} style={styles.logo} />

        <View style={styles.searchContainer}>
          <SearchBar
            onPress={() => {
              router.push("/search");
            }}
            placeholder="Search for a movie"
          ></SearchBar>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  topBg: {
    position: "absolute",
    zIndex: 0,
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
  sv: {
    flex: 1,
    paddingHorizontal: 20,
  },
  svContainer: {
    minHeight: "100%",
    paddingBottom: 10,
  },
  logo: {
    width: 48,
    height: 40,
    marginTop: 60,
    marginBottom: 20,
    marginHorizontal: "auto",
  },
  searchContainer: {
    flex: 1,
    marginTop: 40,
  },
});
