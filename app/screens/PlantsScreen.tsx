import React from "react";
import { RefreshControl, StyleSheet, ScrollView } from "react-native";
import { List, ListItem } from "@ui-kitten/components";
import { Background, Button, ErrorToast } from "../components";
import { useNavigation } from "@react-navigation/native";
import { useScreenFocus } from "../hooks/useScreenFocus";
import { Plant } from "../constants/Interfaces";
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

  useScreenFocus(() => {
    dispatch(requestPlants.started(undefined));
  });

  const goToDetailScreen = (plant: Plant) =>
    nav.navigate("PlantDetailScreen", {
      plantId: plant.id,
    });

  return (
    <Background>
      <Button onPress={goToEditScreen}>Create Plant</Button>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={dispatchPlants} />
        }
      >
        <List
          data={plants}
          renderItem={({ item, index }) => (
            <ListItem
              key={index}
              title={item.name}
              onPress={() => goToDetailScreen(item)}
            />
          )}
        />
      </ScrollView>
      <ErrorToast error={error} />
    </Background>
  );
}

export default PlantScreen;

const styles = StyleSheet.create({});
