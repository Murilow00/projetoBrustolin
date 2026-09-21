import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";


const API_KEY = 'cv_u2X3L4lp_GpSq6ziXFXbrtyGyP5AxxfBAyXkrQW-U-dCHJlzMhDSrUx4y1ftsGgx';


const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

// ---------- GET por id: buscar um herói específico ----------
export default function HeroisBuscarScreen() {
  const [id, setId] = useState("");
  const [anime, setAnime] = useState(null);
  const [buscando, setBuscando] = useState(false);
  const [erro, setErro] = useState(null);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  async function buscarPorId() {
    if (!id) {
      setErro("Digite um id pra buscar.");
      return;
    }

    Keyboard.dismiss();
    setBuscando(true);
    setErro(null);
    setNaoEncontrado(false);
    setAnime(null);

    try {

      const resposta = await api.get(`/api/animes/${id}`);
      setAnime(resposta.data);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setNaoEncontrado(true);
      } else {
        setErro("Não foi possível buscar o anime. Tenta de novo em instantes.");
      }
    } finally {
      setBuscando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Buscar anime</Text>
          <Text style={styles.subtitulo}>GET /api/animes/:id</Text>
        </View>

        <Text style={styles.rotulo}>Id do anime</Text>
        <View style={styles.linhaBusca}>
          <TextInput
            style={styles.campo}
            value={id}
            onChangeText={setId}
            placeholder="Ex: 1"
            keyboardType="numeric"
          />
          <Pressable style={styles.botao} onPress={buscarPorId} disabled={buscando}>
            <Text style={styles.botaoTexto}>{buscando ? "..." : "Buscar"}</Text>
          </Pressable>
        </View>

        {buscando && <ActivityIndicator style={{ marginVertical: 16 }} />}
        {erro && <Text style={styles.erro}>{erro}</Text>}

        {naoEncontrado && (
          <Text style={styles.avisoNaoEncontrado}>
            Nenhum anime encontrado com o id "{id}".
          </Text>
        )}

        {anime && (
          <View style={styles.card}>
            {anime.imagemUrl && (
              <Image source={{ uri: anime.imagemUrl }} style={styles.imagem} />
            )}
            <View style={styles.info}>
              <Text style={styles.titulo}>{anime.title}</Text>
              <Text style={styles.categoria}>
                {anime.genero} · {anime.numero_episodios} episódios
              </Text>
              <Text style={styles.detalhes}>
                {anime.ano_lancamento} · {anime.estudio}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0b1020" },
  conteudo: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 16 },
  tituloPagina: { fontSize: 24, fontWeight: "800", color: "#8b5cf6" },
  subtitulo: { fontSize: 14, color: "#94a3b8", marginTop: 2 },

  rotulo: { fontSize: 13, fontWeight: "600", color: "#cbd5e1", marginBottom: 4 },
  linhaBusca: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
  campo: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#111827",
    color: "#f8fafc",
  },
  botao: {
    backgroundColor: "#8b5cf6",
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoTexto: { color: "#f8fafc", fontWeight: "bold" },

  erro: { color: "#fca5a5", marginTop: 12 },
  avisoNaoEncontrado: { color: "#34d399", marginTop: 16, fontStyle: "italic" },

  card: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    backgroundColor: "#111827",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  imagem: { width: 88, height: 88 },
  info: { flex: 1, justifyContent: "center", paddingRight: 12, gap: 2 },
  titulo: { fontSize: 17, fontWeight: "700", color: "#f8fafc" },
  categoria: { fontSize: 13, color: "#cbd5e1" },
  detalhes: { fontSize: 13, color: "#cbd5e1" },
});
