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
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("");
  const [baseado_em_manga, setBaseadoEmManga] = useState("");
  const [estudio, setEstudio] = useState("");
  const [genero, setGenero] = useState("");


  const [enviando, setEnviando] = useState(false);

    async function criarAnime(){
        if(!title.trim()){
            Alert.alert("Preencha ao menos o titulo");
            return
        }
        setEnviando(true);
        try {
            const payload = {
                title: title.trim(),
                description: description.trim(),
                status: status.trim(),
                baseado_em_manga: baseado_em_manga.trim().toLowerCase() === "true"===true,
                estudio: estudio.trim(),
                genero: genero.trim(),
            };
            if(imageUrl.trim()){
                payload.imageUrl = imageUrl.trim();
            }
            
            const resposta = await api.post("/api/animes", payload);
            Alert.alert("Sucesso", `anime "${resposta.data.title}" criado com sucesso!, criado`);
            setTitle("");
            setDescription("");
            setImageUrl("");
            setStatus("");
            setBaseadoEmManga("");
            setEstudio("");
            setGenero("");
        } catch (e) {
            Alert.alert("Detalhes do erro na API", e.response?.data);

            const msgApi = e.response?.data?.details?.fieldErrors?.imageUrl
            ? "informe uma URL válida para a imagem"
            : "Falha ao criar anime";

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

        <Text style={styles.rotulo}>Título</Text>
        <TextInput
          style={styles.campo}
          value={title}
          onChangeText={setTitle}
          placeholder="Ex: Naruto"
        />

        <Text style={styles.rotulo}>Descrição</Text>
        <TextInput
          style={styles.campo}
          value={description}
          onChangeText={setDescription}
          placeholder="Ex: Anime do ninja que quer virar presidente"
        />


        <Text style={styles.secao}>Campos específicos do tema animes</Text>

        <Text style={styles.rotulo}>Genero</Text>
        <TextInput
          style={styles.campo}
          value={genero}
          onChangeText={setGenero}
          placeholder="Ex: Ação"
        />

        <Text style={styles.rotulo}>Status</Text>
        <TextInput
          style={styles.campo}
          value={status}
          onChangeText={setStatus}
          placeholder="Ex: Em andamento"
        />

        <Text style={styles.rotulo}>Estúdio</Text>
        <TextInput
          style={styles.campo}
          value={estudio}
          onChangeText={setEstudio}
          placeholder="Ex: Studio Ghibli"
        />

        <Text style={styles.rotulo}>URL da Imagem</Text>
        <TextInput
          style={styles.campo}
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="Ex: https://example.com/imagem.jpg"
        />

        <Text style={styles.rotulo}>Baseado em Manga</Text>
        <TextInput
          style={styles.campo}
          value={baseado_em_manga}
          onChangeText={setBaseadoEmManga}
          placeholder="Ex: true"
        />

        <Pressable style={styles.botao} onPress={criarAnime} disabled={enviando}>
          <Text style={styles.botaoTexto}>{enviando ? "Enviando..." : "Criar anime"}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#6b0210" },
  conteudo: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 16 },
  tituloPagina: { fontSize: 24, fontWeight: "800", color: "#8d0444" },
  subtitulo: { fontSize: 14, color: "#e00808", marginTop: 2 },
  secao: {
    fontSize: 14,
    fontWeight: "700",
    color: "#102542",
    marginTop: 8,
    marginBottom: 8,
  },

  rotulo: { fontSize: 13, fontWeight: "600", color: "#fc5656", marginBottom: 4 },
  campo: {
    borderWidth: 1,
    borderColor: "#060d16",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "red",
  },
  botao: {
    backgroundColor: "#cf2f2f",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoTexto: { color: "white", fontWeight: "700" },
});