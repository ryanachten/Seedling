import { Card, Input, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Margin } from "../constants/Sizes";
import { Button } from "./Button";
import { ErrorToast } from "./ErrorToast";

export const EditPlantForm = () => {
  const [name, setName] = useState("");
  return (
    <Card>
      <Input
        label="Name"
        placeholder="San pedro cactus"
        value={name}
        onChange={(e) => setName(e.nativeEvent.text)}
        style={styles.input}
      />
      {/* <Button loading={loading} onPress={loginUser}>
        Create!
      </Button> */}
      {/* <ErrorToast error={error} /> */}
    </Card>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: Margin.sm,
  },
});
