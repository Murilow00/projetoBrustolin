import {View, Text, StyleSheet, Image, Linking, Button} from 'react-native'
import murilow from "../../assets/murilow.jpg"

export default function Exemplo() {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={murilow} style={styles.logo} resizeMode="contain" />
                <Text style={styles.cardTitle}>Murilo Brustolin</Text>
                <Text style={styles.cardItem}>Desenvolvedor e Representante supremo</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardItem}>
                    Murilo Brustolin é o representante 1 e melhor representante que ja passou pela
                    sala de desensolvimento de sistemas. Ele adora jogar video game, programar e
                    jogar RPG de mesa
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardItem}>
                    CURIOSIDADE: Em 2024 o Murilo faltou na escola para jogar o jogo: Enigma do Medo
                    em seu lançamento
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    color="white"
                    title="GitHub"
                    style={styles.botao}
                    onPress={() => Linking.openURL('https://github.com/Murilow00')}
                />
                <Button
                    color="white"
                    title="Instagram"
                    onPress={() => Linking.openURL('https://www.instagram.com/murilobmilan')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        justifyContent: "center",
    },
    botao: {
        width: 20,
        height: 20,
        borderRadius: 30,
        backgroundColor:'#f8fafc'
    }
});
