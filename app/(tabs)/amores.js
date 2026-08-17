import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const amores = [
    "O computador dele 🖥️",
    "A cama dele 🛏️",
    "Os dados dele 🎲",
    "Desenvolver sistemas 🎮",
    "Do homem aranha 🕷️",
    "DELTARUNE ❤️"
];

export default function LessonsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Coisas que ele ama</Text>
        <Text style={styles.description}>
          Aqui se consiste nas coisas que o Murilo mais ama na vida dele, tipo como não amar a própria cama?
        </Text>

        <View style={styles.list}>
          {amores.map((amores, index) => (
            <View key={amores} style={styles.listItem}>
              <Text style={styles.badge}>{index + 1}</Text>
              <Text style={styles.listText}>{amores}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#6e031e",
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#f3f2ee",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#f5f4f1",
  },
  list: {
    gap: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#ffffff",
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    textAlign: "center",
    lineHeight: 32,
    fontSize: 14,
    fontWeight: "700",
    color: "#fefffb",
    backgroundColor: "#e20bf5",
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: "#3d2c00",
  },
});
