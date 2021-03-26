import React, { useEffect } from "react";
import { RefreshControl, StyleSheet, ScrollView } from "react-native";
import { Text } from "@ui-kitten/components";
import { Background, Button, ErrorToast } from "../components";
import { ModalBackground } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { PlantContext } from "../services/context";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { selectPlants } from "../selectors/plant.selectors";

export default function PlantScreen() {
  const nav = useNavigation();
  const {
    actions: { getPlants },
    state: { loading, error, plants },
  } = useContext(PlantContext);

  const selectedPlants = useSelector(selectPlants);
  console.log("selectedPlants", selectedPlants);

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
      <Button onPress={goToEditScreen}>Create Plant</Button>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getPlants} />
        }
      >
        {plants.map(({ name }, i) => (
          <Text key={i}>{name}</Text>
        ))}
      </ScrollView>
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
