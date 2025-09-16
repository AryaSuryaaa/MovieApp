import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity style={styles.touch}>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image",
          }}
          style={styles.poster}
        />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.starContainer}>
          <Image source={icons.star} style={styles.starIcon} />
          <Text style={styles.ratingText}>
            {vote_average.toFixed(1)} | {release_date.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  touch: {
    width: "30%",
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover",
  },
  title: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  starIcon: {
    width: 12,
    height: 12,
    tintColor: "#f5c518",
    resizeMode: "contain",
  },
  ratingText: {
    color: "white",
    fontSize: 10,
    fontWeight: "500",
  },
});
