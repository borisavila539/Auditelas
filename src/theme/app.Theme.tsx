import { StyleSheet } from 'react-native';
import { beige, black, blue, navy, purpura, } from '../components/colores';
import { FontFamily, TextButtons, TextoPantallas } from '../components/Constant';

export const styles = StyleSheet.create({
    titulo: {
        fontSize: 30,
        color: '#fff'
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: beige,
        justifyContent: 'center',
        paddingBottom: 10,
    },
    button: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: blue,
        shadowOpacity: 0.58,
    },

    text: {
        fontSize: TextButtons,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'sans-serif'
    },
    containerSelector: {
        paddingTop: 40,
        width: '95%',
        justifyContent: 'center',
        maxWidth: 400,
        alignItems: 'center',
        flexDirection: 'row',
        shadowOpacity: 0.58,
    },
    // IconoUsuario: {
    //     width: '60%',
    //     alignItems: 'center',
    //     backgroundColor: '#EFEFEF',
    //     justifyContent: 'center',
    //     height: 400,
    //     borderRadius: 20,
    //     borderColor: 'white',
    //     bottom: 30,
    //     shadowOpacity: 0.58,
    // },

    nivelDefectosStilos: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 5,
    },
    contenedorNiveldefectos: {
        width: '96%',
        marginLeft: 7,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 2,
        borderColor: 'black',
        flexDirection: 'row',
        borderRadius: 5
    },
    contenedorDatosRollo: {
        width: '96%',
        paddingHorizontal: 5,
        alignContent: 'center',
        paddingVertical: 1,
        marginVertical: 1,
    },
    botonSumaResta: {
        backgroundColor: blue,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        borderRadius: 5,
    },
    textRender: {
        fontSize: TextoPantallas,
        color: black,
        fontWeight: 'bold',
        fontFamily: FontFamily,
    },
    textTotal: {
        color: black,
        fontWeight: 'bold',
        fontFamily: FontFamily,
        alignSelf: 'center'
    },

    input: {
        //padding: 2,
        marginLeft: 10,
        fontSize: TextButtons,
        fontFamily: 'sans-serif',
    },
    textInputs: {
        width: '90%',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 10,
        borderWidth: 1,
        fontFamily: FontFamily,
    },
    viewsAuditoria: {
        width: '33%',
        borderWidth: 1,
        height: 37,
        margin: 2,
        borderRadius: 5
    }
})