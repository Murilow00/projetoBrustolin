import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const raziel = require("../../assets/raziel.png");

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Image
            source={raziel}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.eyebrow}>Resenha + Tecnologia</Text>
          <Text style={styles.title}>Murilo 👽</Text>
          <Text style={styles.description}>
            Mais do que um aluno, um representande
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>O que ele sabe?</Text>
          <Text style={styles.cardItem}>• TUDO</Text>
          <Text style={styles.cardItem}>• Jogar qualquer jogo</Text>
          <Text style={styles.cardItem}>• Rpg de mesa</Text>
          <Text style={styles.cardItem}>• Transformar agua em anti-matéria</Text>
        </View>

        <Link href="/modal" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Abrir coisas que ele gosta</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0b1020',
    },
    container: {
        flex: 1,
        padding: 24,
        gap: 20,
        backgroundColor: '#0b1020',
    },
    hero: {
        alignItems: 'center',
        gap: 10,
        padding: 24,
        borderRadius: 24,
        backgroundColor: '#111827',
        borderWidth: 1,
        borderColor: '#8b5cf6',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 4,
        borderRadius: 100,
    },
    eyebrow: {
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: '#a78bfa',
        textAlign: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#f8fafc',
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#cbd5e1',
        textAlign: 'center',
    },
    card: {
        gap: 8,
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#1e293b',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#f8fafc',
    },
    cardItem: {
        fontSize: 15,
        color: '#cbd5e1',
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
        alignItems: 'center',
        backgroundColor: '#8b5cf6',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#f8fafc',
    },
});
