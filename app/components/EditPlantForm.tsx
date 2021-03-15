import {
  Autocomplete,
  AutocompleteItem,
  Card,
  Input,
  Spinner,
  Text,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SearchResult } from "../constants/Interfaces";
import { Margin } from "../constants/Sizes";
import { PlantActions, PlantState } from "../reducers/plant";
import { ErrorToast } from "./ErrorToast";
import { Icon } from "./Icon";

type EditPlantFormProps = {
  context: {
    state: PlantState;
    actions: PlantActions;
  };
};

export const EditPlantForm = ({ context }: EditPlantFormProps) => {
  const {
    state: { error, loading },
    actions: { searchPlant },
  } = context;
  const [name, setName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [bioResourceKey, setBioResourceKey] = useState<number>();
  const [searchResults, setSearchResults] = useState<Array<SearchResult>>([]);

  const searchForScientificName = async (term: string) => {
    // TODO: might need to debounce this to prevent excess queries
    if (term.length < 4) {
      return setSearchResults([]);
    }
    const results = await searchPlant(term);
    setSearchResults(results || []);
  };

  useEffect(() => {
    searchForScientificName(scientificName);
  }, [scientificName]);

  // const selectScientificName = (index: number) => {
  //   const { scientificName, key } = searchResults[index];
  //   setScientificName(scientificName);
  //   setBioResourceKey(key);
  // };

  return (
    <Card>
      <Input
        label="Name"
        placeholder="San pedro cactus"
        value={name}
        onChange={(e) => setName(e.nativeEvent.text)}
        style={styles.input}
      />
      <Input
        label="Search Scientific name"
        placeholder="Echinopsis pachanoi"
        value={scientificName}
        onChange={(e) => setScientificName(e.nativeEvent.text)}
        accessoryRight={() =>
          loading ? (
            <Spinner size="small" status="primary" />
          ) : (
            <Icon size="sm" name="search-outline" />
          )
        }
        style={styles.input}
      />
      {searchResults.map((r) => (
        <Text>{r.scientificName}</Text>
      ))}
      {/* <Button loading={loading} onPress={loginUser}>
        Create!
      </Button> */}
      <ErrorToast error={error} />
    </Card>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: Margin.sm,
  },
});
