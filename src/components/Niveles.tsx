import React, { FC, useState } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../theme/app.Theme'
import { listaDefectosInterface } from '../interfaces/listaDefectos'
import { TextoPantallas } from './Constant'
import { black, grey } from './colores';
interface niveles {
    item: listaDefectosInterface,
    onPressMin: (num: Number) => void,
    onPressPlus: (num: Number) => void,
    nivel: Number,
    text: string
}
export const Niveles: FC<niveles> = ({ item, onPressMin, onPressPlus, nivel, text }) => {
    const [num, setNum] = useState<string>('')
    return (
        <>

            <View style={{ flexDirection: 'row', width: '80%', marginVertical: 5, alignItems: 'center' }}>
                <View style={{ width: '55%', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ width: '30%', color: '#000' }}> {text + ': '}</Text>
                    <TextInput
                        value={nivel + ''}
                        placeholder='0'
                        textAlign='center'
                        editable={false}
                        placeholderTextColor={grey}
                        style={[styles.viewsAuditoria, { width: '15%', backgroundColor: '#fff', color: '#000', borderColor:grey }]}
                    />
                </View>
                <TouchableOpacity style={[styles.botonSumaResta, { width: '15%' }]}
                    onPress={() => {
                        onPressMin(num.length > 0 ? parseInt(num) : 0)
                        setNum('')
                    }}
                >
                    <Text style={{ color: 'white', fontSize: TextoPantallas }}>-</Text>
                </TouchableOpacity>

                <TextInput
                    onChangeText={(value) => setNum(value)}
                    value={num + ''}
                    placeholder='0'
                    textAlign='center'
                    keyboardType='decimal-pad'
                    placeholderTextColor={grey}
                    style={[styles.viewsAuditoria, { width: '15%', backgroundColor: '#fff', color: '#000',borderColor:grey }]} />

                <TouchableOpacity style={[styles.botonSumaResta, { width: '15%' }]}
                    onPress={() => {
                        onPressPlus(num.length > 0 ? parseInt(num) : 0)
                        setNum('')
                    }}

                >
                    <Text style={{ color: 'white', fontSize: TextoPantallas }}>+</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}
