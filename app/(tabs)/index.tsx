import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { colors } from "@/theme";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Index = () => {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.topBg} />

      <ScrollView
        style={styles.sv}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.svContainer}
      >
        <Image source={icons.logo} style={styles.logo} />

        {moviesLoading || trendingError ? (
          <ActivityIndicator size="large" color={colors.accent} />
        ) : moviesError || trendingError ? (
          <Text>Error: {moviesError?.message || trendingError}</Text>
        ) : (
          <View style={styles.searchContainer}>
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
            />
            <>
              {trendingMovies && trendingMovies.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Trending</Text>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 36 }} />
                    )}
                    data={trendingMovies}
                    renderItem={({ item, index }) => (
                      <TrendingCard movie={item} index={index} />
                    )}
                    keyExtractor={(item) => item.title}
                  ></FlatList>
                </>
              )}

              <Text style={styles.sectionTitle}>Latest Movie</Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 16,
                }}
                style={styles.listMovieContainer}
                scrollEnabled={false}
              ></FlatList>
            </>
          </View>
        )}
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
  sectionTitle: {
    color: "white",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 12,
  },
  listMovieContainer: {
    marginTop: 8,
    paddingBottom: 128,
  },
});
