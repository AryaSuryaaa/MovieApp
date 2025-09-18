import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TrendingCard = ({ movie, index }: TrendingCardProps) => {
  return (
    <Link href={`/movie/${movie.movie_id}`} asChild>
      <TouchableOpacity style={styles.touch}>
        <Image
          source={{ uri: movie.poster_url }}
          style={styles.poster}
          resizeMode="cover"
        />

        <View style={styles.rankContainer}>
          <MaskedView
            maskElement={<Text style={styles.rankText}>{index + 1}</Text>}
          >
            <Image
              source={images.rankingGradient}
              style={styles.rankImage}
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  touch: {
    width: 128,
    position: "relative",
    paddingLeft: 20,
  },
  poster: {
    width: 128,
    height: 192,
    borderRadius: 12,
  },
  rankContainer: {
    position: "absolute",
    bottom: 36,
    left: -7,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  rankText: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 48,
  },
  rankImage: {
    width: 56,
    height: 56,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
    color: "#E5E7EB",
  },
});

export default TrendingCard;
