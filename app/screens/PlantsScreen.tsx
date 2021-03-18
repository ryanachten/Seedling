import React from "react";
import { RefreshControl, StyleSheet, ScrollView } from "react-native";
import { List, ListItem, Text } from "@ui-kitten/components";
import { Background, Button, ErrorToast } from "../components";
import { ModalBackground } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { PlantContext } from "../services/context";
import { useContext } from "react";
import { useScreenFocus } from "../hooks/useScreenFocus";
import { Plant } from "../constants/Interfaces";

export default function PlantScreen() {
  const nav = useNavigation();
  const {
    actions: { getPlants },
    state: { loading, error, plants },
  } = useContext(PlantContext);

  useScreenFocus(() => {
    getPlants();
  });

  const goToEditScreen = () => nav.navigate("EditPlantScreen");
  const goToDetailScreen = (plant: Plant) => nav.navigate("PlantDetailScreen", {
    plantId: plant.id
  });

  return (
    <Background>
      <Button onPress={goToEditScreen}>Create Plant</Button>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getPlants} />
        }
      >
        <List
          data={plants}
          renderItem={({ item, index }) => (
            <ListItem key={index} title={item.name} onPress={() => goToDetailScreen(item)}/>
          )}
        />
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
