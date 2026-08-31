import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY = "cv_lwism4C1nf2n1REyVB4NfRjncK_i9ZUroAEP6CJcHuVRS-mLfvQKEW10TIKv85Cf";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

// ---------- DELETE: apagar um herói existente ----------
export default function HeroisExcluirScreen() {
  const [animes, setAnimes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  
  const [excluindoId, setExcluindoId] = useState(null);

  async function buscarAnimes() {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await api.get("/api/animes", {
        params: { limit: 50 },
      });
      setAnimes(resposta.data.data);
    } catch (e) {
      setErro("Não foi possível carregar os animes. Tenta de novo em instantes.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarAnimes();
  }, []);

  async function excluirAnime(id) {
    setExcluindoId(id);
    try {
      
      await api.delete(`/api/animes/${id}`);

      setAnimes((atual) => atual.filter((item) => item.id !== id));
    } catch (e) {
      Alert.alert(
        "Não deu pra excluir o anime",
        "A API respondeu com erro. Tenta de novo em instantes."
      );
    } finally {
      setExcluindoId(null);
    }
  }


  
  function confirmarExclusao(anime) {
    Alert.alert(
      "Excluir anime",
      `Tem certeza que quer excluir "${anime.title}"? Essa ação não pode ser desfeita.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => excluirAnime(anime.id),
        },
      ]
    );
  }

  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Excluir anime</Text>
          <Text style={styles.subtitulo}>DELETE /api/animes/:id</Text>
        </View>

        {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}
        {erro && <Text style={styles.erro}>{erro}</Text>}

        {!carregando &&
          animes.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.imagem} />
              <View style={styles.info}>
                <Text style={styles.titulo}>{item.title}</Text>
                <Text style={styles.categoria}>
                  {item.universo} · {item.poder}
                </Text>
              </View>
              <Pressable
                style={styles.botaoExcluir}
                onPress={() => confirmarExclusao(item)}
                disabled={excluindoId === item.id}
              >
                <Text style={styles.botaoExcluirTexto}>
                  {excluindoId === item.id ? "..." : "Excluir"}
                </Text>
              </Pressable>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000000" },
  conteudo: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 16 },
  tituloPagina: { fontSize: 24, fontWeight: "800", color: "#ff25be" },
  subtitulo: { fontSize: 14, color: "#e9ecf0", marginTop: 2 },

  erro: { color: "#c62828", marginTop: 12 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    paddingRight: 12,
  },
  imagem: { width: 64, height: 64 },
  info: { flex: 1, justifyContent: "center" },
  titulo: { fontSize: 16, fontWeight: "700" },
  categoria: { fontSize: 13, color: "#ccd5e2" },

  botaoExcluir: {
    backgroundColor: "#ec0909",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  botaoExcluirTexto: { color: "white", fontWeight: "700", fontSize: 13 },
});