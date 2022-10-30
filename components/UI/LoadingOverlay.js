import { StyleSheet, View, ActivityIndicator } from "react-native";
import { GlobalStyles } from "../../constants/styles";
const LoadingOverlay = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={GlobalStyles.colors.primary100} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
export default LoadingOverlay;
