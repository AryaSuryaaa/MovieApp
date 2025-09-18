import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { colors } from "@/theme";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
    reset: resetMovies,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetchMovies();
      } else {
        resetMovies();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (movies && movies.length > 0) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);

  return (
    <View style={styles.container}>
      <Image source={images.bg} style={styles.banner} />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        style={styles.listMovieContainer}
        contentContainerStyle={{ paddingBottom: 128 }}
        ListHeaderComponent={
          <>
            <View style={styles.listContainerHeader}>
              <Image source={icons.logo} style={styles.imgLogo} />
            </View>

            <View style={styles.searchContainer}>
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                style={styles.activityIndicator}
              />
            )}

            {moviesError && (
              <Text style={styles.errorText}>
                Error: ${moviesError.message}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text style={styles.searchTitle}>
                  Search Results for {searchQuery}
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View style={styles.notFoundContainer}>
              <Text style={styles.notFoundText}>No movies found</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  banner: {
    width: "100%",
    height: 350,
    position: "absolute",
    resizeMode: "cover",
    zIndex: 0,
  },
  listMovieContainer: {
    marginTop: 50,
    paddingHorizontal: 16,
  },
  listContainerHeader: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
  },
  imgLogo: {
    width: 48,
    height: 40,
  },
  searchContainer: {
    marginVertical: 20,
  },
  activityIndicator: { marginVertical: 20 },
  errorText: { color: "red", marginVertical: 20, paddingHorizontal: 20 },
  searchTitle: { color: colors.accent, marginBottom: 20 },
  notFoundContainer: { marginTop: 50, alignItems: "center" },
  notFoundText: { color: colors.accent },
});
