import { icons } from "@/constants/icons";
import { colors } from "@/theme";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: Props) => {
  return (
    <View style={styles.conatiner}>
      <Image source={icons.search} style={styles.icSearch} />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=""
        onChangeText={() => {}}
        placeholderTextColor={"#888"}
        style={styles.searchInput}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark[200],
    borderRadius: 9999,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  icSearch: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: "ab8bff",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: "white",
  },
});
