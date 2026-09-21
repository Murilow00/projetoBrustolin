import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
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

export default function AnimesEditarScreen() {

  const [animes, setAnimes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [selecionado, setSelecionado] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [genero, setGenero] = useState("");
  const [numeroEpisodios, setNumeroEpisodios] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [estudio, setEstudio] = useState("");

  async function buscarAnimes() {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await api.get("/api/animes", {
        params: { limit: 50 },
      });

      setAnimes(resposta.data.data || []);
    } catch (e) {
      setErro("Erro ao carregar a lista de animes.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarAnimes();
  }, []);

  function selecionarAnime(anime) {
    setSelecionado(anime);
    setTitle(anime.title ?? "");
    setImageUrl(anime.imageUrl ?? "");
    setGenero(anime.genero ?? "");
    setNumeroEpisodios(String(anime.numero_episodios ?? ""));
    setAnoLancamento(String(anime.ano_lancamento ?? ""));
    setEstudio(anime.estudio ?? "");
  }

  function limparFormulario() {
    setSelecionado(null);
    setTitle("");
    setImageUrl("");
    setGenero("");
    setNumeroEpisodios("");
    setAnoLancamento("");
    setEstudio("");
  }

  async function salvarEdicao() {
    if (!selecionado) return;

    setSalvando(true);


    const payload = {
      title: title.trim(),
      imageUrl: imageUrl.trim() ? imageUrl.trim() : null,
      genero: genero.trim(),
      numero_episodios: Number(numeroEpisodios),
      ano_lancamento: Number(anoLancamento),
      estudio: estudio.trim(),
    };

    try {
      const resposta = await api.put(`/api/animes/${selecionado.id}`, payload);

      Alert.alert("Sucesso!", `Anime "${resposta.data.title || title}" atualizado.`);
      limparFormulario();
      buscarAnimes();
    } catch (e) {
      Alert.alert(
        "Erro ao atualizar",
        "Confira se todos os campos preenchidos respeitam as regras da API."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Editar anime</Text>
          <Text style={styles.subtitulo}>PUT /api/animes/:id</Text>
        </View>

        {!selecionado && (
          <>
            <Text style={styles.instrucao}>Toque em um anime pra editar:</Text>

            {carregando && <ActivityIndicator style={{ marginVertical: 16 }} color="#8b5cf6" />}
            {erro && <Text style={styles.erro}>{erro}</Text>}

            {!carregando &&
              animes.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.linha}
                  onPress={() => selecionarAnime(item)}
                >
                  <Text style={styles.linhaTitulo}>{item.title}</Text>
                  <Text style={styles.linhaSeta}>editar ›</Text>
                </Pressable>
              ))}
          </>
        )}

        {selecionado && (
          <>
            <Pressable onPress={limparFormulario} style={styles.voltar}>
              <Text style={styles.voltarTexto}>‹ voltar pra lista</Text>
            </Pressable>

            <Text style={styles.rotulo}>Título (obrigatório, 3-120 chars)</Text>
            <TextInput
              style={styles.campo}
              value={title}
              onChangeText={setTitle}
              placeholder="Ex: Naruto"
            />

            <Text style={styles.rotulo}>URL da Imagem (opcional)</Text>
            <TextInput
              style={styles.campo}
              value={imageUrl}
              onChangeText={setImageUrl}
              placeholder="Ex: https://exemplo.com/imagem.jpg"
            />

            <Text style={styles.rotulo}>Gênero (obrigatório)</Text>
            <TextInput
              style={styles.campo}
              value={genero}
              onChangeText={setGenero}
              placeholder="Ex: Ação, Comédia"
            />

            <Text style={styles.rotulo}>Número de episódios (numérico)</Text>
            <TextInput
              style={styles.campo}
              value={numeroEpisodios}
              onChangeText={setNumeroEpisodios}
              placeholder="Ex: 24"
              keyboardType="numeric"
            />

            <Text style={styles.rotulo}>Ano de lançamento (numérico)</Text>
            <TextInput
              style={styles.campo}
              value={anoLancamento}
              onChangeText={setAnoLancamento}
              placeholder="Ex: 2020"
              keyboardType="numeric"
            />

            <Text style={styles.rotulo}>Estúdio (obrigatório)</Text>
            <TextInput
              style={styles.campo}
              value={estudio}
              onChangeText={setEstudio}
              placeholder="Ex: MAPPA"
            />

            <Pressable
              style={styles.botao}
              onPress={salvarEdicao}
              disabled={salvando}
            >
              <Text style={styles.botaoTexto}>
                {salvando ? "Salvando..." : "Salvar alterações"}
              </Text>
            </Pressable>
          </>
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

  instrucao: { fontSize: 14, color: "#cbd5e1", marginBottom: 8 },
  erro: { color: "#fca5a5", marginTop: 12 },

  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#111827",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  linhaTitulo: { fontSize: 15, fontWeight: "700", color: "#f8fafc" },
  linhaSeta: { fontSize: 13, color: "#a78bfa", fontWeight: "600" },

  voltar: { marginBottom: 16 },
  voltarTexto: { color: "#a78bfa", fontWeight: "700" },

  rotulo: { fontSize: 13, fontWeight: "600", color: "#cbd5e1", marginBottom: 4 },
  campo: {
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "#111827",
    color: "#f8fafc",
  },
  botao: {
    backgroundColor: "#8b5cf6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  botaoTexto: { color: "#f8fafc", fontWeight: "700" },
});
