import React, { useEffect } from "react";
import { RefreshControl, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { Background, Button, ErrorToast } from "../components";
import { ModalBackground } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { PlantContext } from "../services/context";
import { useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";

export default function PlantScreen() {
  const nav = useNavigation();
  const {
    actions: { getPlants },
    state: { loading, error, plants },
  } = useContext(PlantContext);

  // Refresh plant feed on init load and subsequent focuses
  useEffect(() => {
    getPlants();
    const unsubscribe = nav.addListener("focus", () => {
      getPlants();
    });
    return unsubscribe;
  }, [nav]);

  const goToEditScreen = () => nav.navigate("EditPlantScreen");
  return (
    <Background style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getPlants} />
        }
      >
        {plants.map(({ name }, i) => (
          <Text category="p1" key={i}>
            {name}
          </Text>
        ))}
      </ScrollView>
      <Button onPress={goToEditScreen}>Create</Button>
      <ErrorToast error={error} />
    </Background>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: ModalBackground,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
