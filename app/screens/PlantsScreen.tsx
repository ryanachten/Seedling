import React, { useEffect } from "react";
import { RefreshControl, StyleSheet, ScrollView } from "react-native";
import { Text } from "@ui-kitten/components";
import { Background, Button, ErrorToast } from "../components";
import { ModalBackground } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { requestPlants } from "../reducers/plant.reducer";
import {
  getPlants,
  hasPlantError,
  isPlantsLoading,
} from "../selectors/plant.selectors";

function PlantScreen() {
  const nav = useNavigation();
  const goToEditScreen = () => nav.navigate("EditPlantScreen");

  const dispatch = useDispatch();
  const dispatchPlants = () => dispatch(requestPlants.started(undefined));
  const plants = useSelector(getPlants);
  const error = useSelector(hasPlantError);
  const loading = useSelector(isPlantsLoading);

  // Refresh plant feed on init load and subsequent focuses
  useEffect(() => {
    dispatchPlants();
    const unsubscribe = nav.addListener("focus", () => {
      dispatchPlants();
    });
    return unsubscribe;
  }, [nav]);

  return (
    <Background style={styles.container}>
      <Button onPress={goToEditScreen}>Create Plant</Button>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={dispatchPlants} />
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

export default PlantScreen;

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
