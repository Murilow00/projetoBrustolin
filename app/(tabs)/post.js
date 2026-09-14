import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
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

export default function AnimesCriarScreen() {
  const [title, setTitle] = useState("");
  const [genero, setGenero] = useState("");
  const [numero_episodios, setNumero_Episodios] = useState("");
  const [ano_lancamento, setAno_Lancamento] = useState("");
  const [estudio, setEstudio] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [enviando, setEnviando] = useState(false);

  async function criarAnime() {
    if (
      !title.trim() ||
      !genero.trim() ||
      !numero_episodios.trim() ||
      !ano_lancamento.trim() ||
      !estudio.trim()
    ) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    setEnviando(true);
    try {
      const payload = {
        title: title.trim(),
        genero: genero.trim(),
        numero_episodios: numero_episodios.trim(),
        ano_lancamento: ano_lancamento.trim(),
        estudio: estudio.trim(),
        imageUrl: imageUrl.trim() ? imageUrl.trim() : null,
      };

      const resposta = await api.post("/api/animes", payload);
      Alert.alert("Sucesso", `Anime "${resposta.data.title}" criado com sucesso!`);

      setTitle("");
      setGenero("");
      setNumero_Episodios("");
      setAno_Lancamento("");
      setEstudio("");
      setImageUrl("");
    } catch (e) {
      const msgApi =
        e.response?.data?.message || "Falha ao criar anime. Verifique os dados.";
      Alert.alert("Erro", msgApi);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Criar um anime</Text>
          <Text style={styles.subtitulo}>POST /api/animes</Text>
        </View>

        <Text style={styles.rotulo}>Título *</Text>
        <TextInput
          style={styles.campo}
          value={title}
          onChangeText={setTitle}
          placeholder="Ex: Naruto"
        />

        <Text style={styles.secao}>Campos específicos do tema animes</Text>

        <Text style={styles.rotulo}>Gênero *</Text>
        <TextInput
          style={styles.campo}
          value={genero}
          onChangeText={setGenero}
          placeholder="Ex: Ação"
        />

        <Text style={styles.rotulo}>Número de Episódios *</Text>
        <TextInput
          style={styles.campo}
          value={numero_episodios}
          onChangeText={setNumero_Episodios}
          placeholder="Ex: 220"
          keyboardType="numeric"
        />

        <Text style={styles.rotulo}>Ano de Lançamento *</Text>
        <TextInput
          style={styles.campo}
          value={ano_lancamento}
          onChangeText={setAno_Lancamento}
          placeholder="Ex: 2002"
          keyboardType="numeric"
        />

        <Text style={styles.rotulo}>Estúdio *</Text>
        <TextInput
          style={styles.campo}
          value={estudio}
          onChangeText={setEstudio}
          placeholder="Ex: Pierrot"
        />

        <Text style={styles.rotulo}>URL da Imagem (Opcional)</Text>
        <TextInput
          style={styles.campo}
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="Ex: https://example.com/imagem.jpg"
        />

        <Pressable style={styles.botao} onPress={criarAnime} disabled={enviando}>
          <Text style={styles.botaoTexto}>
            {enviando ? "Enviando..." : "Criar anime"}
          </Text>
        </Pressable>
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
  secao: {
    fontSize: 14,
    fontWeight: "700",
    color: "#e2e8f0",
    marginTop: 8,
    marginBottom: 8,
  },
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
  },
  botaoTexto: { color: "#f8fafc", fontWeight: "700" },
});