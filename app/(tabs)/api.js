import { React, useState, useEffect } from "react"
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from "react-native"
import axios from "axios" // lib usada pra fazer chamadas HTTP para API
import { SafeAreaView } from "react-native-safe-area-context" // evita que conteudo fique embaixo do notch/barra do celular

const API_KEY = "cv_lwism4C1nf2n1REyVB4NfRjncK_i9ZUroAEP6CJcHuVRS-mLfvQKEW10TIKv85Cf"

const api = axios.create({
    baseURL: "https://api-ds.codeverse.dev.br",
    headers: {
        "x-api-key": API_KEY // passo pelo header a key da API
    }
})



export default function AnimesListarScreen() {
    const [animes, setAnimes] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(null)

    async function buscarAnimes() {
        setCarregando(true)
        setErro(null)
        try {
            const resposta = await api.get("/api/animes", {
                params: { limit: 50 }
            })
            setAnimes(resposta.data.data)
        } catch (error) {
            setErro("Não foi possivel carregar Animes")
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        buscarAnimes()
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Listar Animes</Text>
                    <Text style={styles.subtitulo}>GET /api/animes</Text>
                </View>

                {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}

                {erro && <Text style={styles.erro}>{erro}</Text>}

                {!carregando &&
                    animes.map((anime) => (
                        <View key={anime.id} style={styles.card}>
                            <Image source={{ uri: anime.imageUrl }} height={64} width={64}
                             style={styles.imagem} />
                            <View style={styles.info}>
                                <Text style={styles.titulo}>{anime.title}</Text>
                                <Text style={styles.categoria}>
                                     · {anime.genero}
                                </Text>
                            </View>
                        </View>
                    ))}
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

    erro: { color: "#fca5a5", marginTop: 12 },
    card: {
        flexDirection: "row",
        gap: 12,
        marginTop: 12,
        backgroundColor: "#111827",
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#1e293b",
    },
    imagem: { width: 64, height: 64, borderRadius: 8 },
    info: { flex: 1, justifyContent: "center", paddingRight: 12 },
    titulo: { fontSize: 16, fontWeight: "700", color: "#f8fafc" },
    categoria: { fontSize: 13, color: "#cbd5e1" },
});