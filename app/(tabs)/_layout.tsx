import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

type TabIconProps = {
  focused: boolean;
  icon: any;
  name: string;
};

const TabIcon = ({ focused, icon, name }: TabIconProps) => {
  if (focused) {
    return (
      <ImageBackground source={images.highlight} style={styles.focusedTab}>
        <Image source={icon} style={styles.focusedIcon} />
        <Text style={styles.focusedText}>{name}</Text>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.unfocusedTab}>
      <Image source={icon} style={styles.unfocusedIcon} />
    </View>
  );
};

const _TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} name="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} name="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} name="Saved" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} name="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _TabsLayout;

const styles = StyleSheet.create({
  focusedTab: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
    minWidth: 112,
    minHeight: 56,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    overflow: "hidden",
  },
  focusedIcon: {
    tintColor: "#151312",
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  focusedText: {
    marginLeft: 8,
    color: "#151312",
    fontSize: 14,
    fontWeight: "600",
  },
  unfocusedTab: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    borderRadius: 9999,
  },
  unfocusedIcon: {
    tintColor: "#A8B5DB",
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
