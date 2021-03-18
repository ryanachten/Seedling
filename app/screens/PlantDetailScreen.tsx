import { StackScreenProps } from "@react-navigation/stack";
import React, { useContext } from "react";
import { ScrollView } from "react-native";
import {Text} from "@ui-kitten/components";
import { Background } from "../components";
import { useScreenFocus } from "../hooks/useScreenFocus";
import { PlantParamList } from "../navigation/types";
import { PlantContext } from "../services/context";

type Props = StackScreenProps<PlantParamList, "PlantDetailScreen">;

export const PlantDetailScreen = ({route}: Props) => {
    const plantId = route.params.plantId;
    
    const {
        state: {plants, loading, error},
        actions: { getPlantById }
    } = useContext(PlantContext);
    
    useScreenFocus(() => {
        getPlantById(plantId);
    });

    const plant = plants.find(p => p.id === plantId);
    return (
        <Background>
        <ScrollView>
            {plant && (
                <Text>{plant.name}</Text>
            )}
        </ScrollView>
    </Background>
    );
};