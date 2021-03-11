import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "@ui-kitten/components";
import { Margin } from "../constants/Sizes";

type PotentialError = Error | string | null | undefined;

interface ErrorToastProps {
  error?: PotentialError;
}

const getErrorMessage = (error: PotentialError): string | null => {
  if (!error) {
    return null;
  }
  if (typeof error === "string") {
    return error;
  }
  if (typeof error === "object" && "message" in error) {
    return error.message;
  }
  return null;
};

export const ErrorToast = ({ error }: ErrorToastProps) => {
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    setShowError(Boolean(error));
  }, [error]);
  const message = getErrorMessage(error);
  if (!message || !showError) {
    return null;
  }
  return (
    <Card
      style={styles.root}
      status="danger"
      onPress={() => setShowError(!showError)}
    >
      <Text>{message}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: Margin.md,
  },
});
