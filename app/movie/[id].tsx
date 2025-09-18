import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { colors } from "@/theme";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | null | number;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View style={styles.infoContainer}>
    <Text style={styles.txtSection}>{label}</Text>
    <Text style={styles.txtValue}>{value || "N/A"}</Text>
  </View>
);

const DetailsMovie = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.sv}>
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_POSTER_URL}${movie?.poster_path}`,
          }}
          style={styles.imgPoster}
        />

        <View style={styles.textConatiner}>
          <Text style={styles.title}>{movie?.title}</Text>

          <View style={styles.releaseContainer}>
            <Text style={styles.txt1}>{movie?.release_date.split("-")[0]}</Text>
            <Text style={styles.txt1}>•</Text>
            <Text style={styles.txt1}>{movie?.runtime}m</Text>
          </View>

          <View style={styles.containerRating}>
            <View style={styles.containerRatingItem}>
              <Image source={icons.star} style={styles.starIcon} />
              <Text style={styles.txt2}>
                {Math.round(movie?.vote_average)}/10 ({movie?.vote_count}) votes
              </Text>
            </View>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={
              movie?.genres?.map((g: Genre) => g.name).join(" • ") || "N/A"
            }
          />

          <View style={styles.budget}>
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((c: Genre) => c.name)
                .join(" • ") || "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.btnBack} onPress={router.back}>
        <Image source={icons.arrow} style={styles.iconBack} />
      </TouchableOpacity>
    </View>
  );
};

export default DetailsMovie;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  sv: {
    paddingBottom: 30,
  },
  imgPoster: {
    width: "100%",
    height: 550,
    resizeMode: "stretch",
  },
  textConatiner: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    color: "white",
    marginTop: 16,
    marginBottom: 8,
  },
  txt1: {
    fontSize: 12,
    color: "white",
    marginBottom: 8,
  },
  releaseContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  containerRating: {
    flexDirection: "row",
    gap: 30,
  },
  containerRatingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.dark[100],
    borderRadius: 8,
  },
  starIcon: {
    width: 12,
    height: 12,
    alignContent: "center",
    resizeMode: "contain",
  },
  txt2: {
    fontWeight: "bold",
    color: "white",
    fontSize: 12,
  },
  txtSection: {
    color: colors.light[200],
  },
  txtValue: {
    color: "white",
  },
  infoContainer: {
    marginTop: 16,
  },
  budget: {
    flex: 1,
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnBack: {
    position: "absolute",
    top: 40,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
  },
  iconBack: {
    width: 20,
    height: 20,
    transform: [{ rotate: "180deg" }],
    tintColor: "#fff",
  },
});
