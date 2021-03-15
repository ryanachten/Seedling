import { Card, Input, List, ListItem, Spinner } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
  const [searchTerm, setSearchTerm] = useState("");
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
    searchForScientificName(searchTerm);
  }, [searchTerm]);

  const selectScientificName = (index: number) => {
    const { scientificName, key } = searchResults[index];
    setScientificName(scientificName);
    setBioResourceKey(key);
    setSearchResults([]);
  };

  return (
    <Card style={styles.root}>
      <Input
        label="Name"
        placeholder="San pedro cactus"
        value={name}
        onChange={(e) => setName(e.nativeEvent.text)}
        style={styles.input}
      />
      {scientificName ? (
        <Input
          disabled
          label="Scientific Name"
          value={scientificName}
          style={styles.input}
        />
      ) : null}
      {bioResourceKey ? (
        <Input
          disabled
          label="GBIF Key"
          value={bioResourceKey.toString()}
          style={styles.input}
        />
      ) : null}
      <Input
        label="Search Scientific Name"
        placeholder="Echinopsis pachanoi"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.nativeEvent.text)}
        accessoryRight={() =>
          loading ? (
            <Spinner size="small" status="primary" />
          ) : (
            <Icon
              size="sm"
              name="search-outline"
              onPress={() => searchForScientificName(searchTerm)}
            />
          )
        }
        style={styles.input}
      />
      <ScrollView style={{ maxHeight: 200 }}>
        <List
          data={searchResults}
          renderItem={({ item, index }) => (
            <ListItem
              title={`${item.scientificName}`}
              onPress={() => selectScientificName(index)}
            />
          )}
        />
        {/* <Button loading={loading} onPress={loginUser}>
        Create!
      </Button> */}
      </ScrollView>
      <ErrorToast error={error} />
    </Card>
  );
};

const styles = StyleSheet.create({
  root: {
    marginLeft: Margin.md,
    marginRight: Margin.md,
  },
  input: {
    marginBottom: Margin.sm,
    width: "100%",
  },
});
