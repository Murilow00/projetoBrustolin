import { View, Text, StyleSheet, Image } from "react-native";
import blueprint from "../../assets/blueprint.jpg"

export default function App() {
  return (
      <View style={styles.container}>
          <View style={styles.quadrado}>
              <Text style={styles.title}>Olá, eu sou Murilo</Text>
              <Text style={styles.subtitle}>
                  Apesar de não gostar de mobile e preferir completamente o back-end estou me
                  esforçando muito nessa atividade
              </Text>
              <Image source={blueprint} style={styles.carta} resizeMode="contain" />
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#91c0eb',
        justifyContent: 'top',
        alignItems: 'center',
    },
    title: {
        marginTop: 50,
        fontSize: 22,
        paddingLeft: 10,
        fontWeight: 'bold',
        color: '#e3e7ee',
    },
    subtitle: {
        fontSize: 14,
        color: '#e0e4e9',
        marginTop: 8,
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingRight: 20,
    },
    quadrado: {
        width: 300,
        height: 300,
        backgroundColor: '#0c0a88',
        borderRadius: 30,
        marginTop: 30,
        alignItems:"center"
    },
    carta: {
        marginTop:20,
        width: 120,
        height: 120,
        marginBottom: 4,
        borderRadius: 30,
    },
});
