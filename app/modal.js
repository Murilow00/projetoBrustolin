import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>O que ele gosta</Text>
        <Text style={styles.description}>
          Ele gosta muito muito de Ordem Paranormal e de jogar jogos com seu amigos, sempre que ele esta sozinho ou triste eles sempre estão lá para ajuda-lo.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fafafa",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#f6f8fa",
  },
});
