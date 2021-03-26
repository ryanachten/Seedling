import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { SEEDLING_EVA_THEME } from "./constants/Theme";
import { CombinedContext } from "./services/context";
import { Provider } from "react-redux";
import { store } from "./reducers";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{ ...eva.light, ...SEEDLING_EVA_THEME }}
        >
          <SafeAreaProvider>
            <Provider store={store}>
              <CombinedContext>
                <Navigation colorScheme={colorScheme} />
              </CombinedContext>
            </Provider>
            <StatusBar />
          </SafeAreaProvider>
        </ApplicationProvider>
      </>
    );
  }
}
