import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import AuthState from './context/AuthState';
import {
  Inter_700Bold,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar, StyleSheet, View } from 'react-native';
import LocationState from './context/LocationState';
import CategoryState from './context/CategoryState';
import CallInApp from "./CallInApp";
import CartState from './context/CartState';
import BookedServicesState from './context/BookedServicesState';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import SearchState from './context/SearchState';
import { API_HOST_GQL } from "@env";

SplashScreen.preventAutoHideAsync();

export default function App() {

  let [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_600SemiBold,
  });


  useEffect(() => {

    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare()
  }, [])

  console.log(API_HOST_GQL)

  const client = new ApolloClient({

    // uri: 'http://192.168.207.192:4000/',

    uri: `${API_HOST_GQL}:4000/`,

    cache: new InMemoryCache(),
  });

  if (!fontsLoaded) {
    return null;
  }
  else {
    SplashScreen.hideAsync()
  }
  return (
    <View style={styles.container}>
      <AuthState>
        <ApolloProvider client={client}>
          <LocationState>
            <CategoryState>
              <SearchState>
                <CartState>
                  <BookedServicesState>
                    <NavigationContainer>
                      {/* <SplashScreen /> */}
                      <CallInApp />
                    </NavigationContainer>
                  </BookedServicesState>
                </CartState>
              </SearchState >
            </CategoryState>
          </LocationState>
        </ApolloProvider>
      </AuthState>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight || 0,
  }
})
