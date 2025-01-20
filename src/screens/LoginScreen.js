import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function LoginScreen({ navigation }) {
    // Estados para manejar email, contraseña, errores, mensaje de error general y estado de carga
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [generalError, setGeneralError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Validar formulario de inicio de sesión
    const validateLoginForm = () => {
        let errors = {};
        if (!email) errors.email = 'El email es requerido'; // Verificar si el email está vacío
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email inválido'; // Validar formato del email
        if (!password) errors.password = 'La contraseña es requerida'; // Verificar si la contraseña está vacía
        setError(errors); // Actualizar errores
        return Object.keys(errors).length === 0; // Retornar si no hay errores
    };

    // Validar formulario cuando cambien email o contraseña
    useEffect(() => {
        validateLoginForm();
    }, [email, password]);

    // Manejar el inicio de sesión
    const handleLogin = async () => {
        setGeneralError(''); // Limpiar error general
        if (!validateLoginForm()) return; // Detener si el formulario no es válido

        setIsLoading(true); // Mostrar indicador de carga
        try {
            // Intentar iniciar sesión con email y contraseña
            await signInWithEmailAndPassword(auth, email, password);
            navigation.replace('Home'); // Navegar a la pantalla principal si es exitoso
        } catch (error) {
            // Mostrar mensaje de error en caso de fallo
            setGeneralError('Error al iniciar sesión: ' + error.message);
        } finally {
            setIsLoading(false); // Ocultar indicador de carga
        }
    };

    return (
        <View style={styles.container}>
            {/* Título */}
            <Text h3 style={styles.title}>Mi Comida Favorita</Text>
            
            {/* Campo de entrada para email */}
            <Input
                placeholder="Email"
                value={email}
                onChangeText={(value) => {
                    setEmail(value); // Actualizar estado del email
                    setError((prev) => ({ ...prev, email: '' })); // Limpiar error específico
                }}
                autoCapitalize="none"
                errorMessage={error.email} // Mostrar error si existe
            />
            
            {/* Campo de entrada para contraseña */}
            <Input
                placeholder="Contraseña"
                value={password}
                onChangeText={(value) => {
                    setPassword(value); // Actualizar estado de la contraseña
                    setError((prev) => ({ ...prev, password: '' })); // Limpiar error específico
                }}
                secureTextEntry // Ocultar texto para seguridad
                errorMessage={error.password} // Mostrar error si existe
            />
            
            {/* Mensaje de error general */}
            {generalError ? <Text style={styles.error}>{generalError}</Text> : null}

            {/* Indicador de carga o botón de iniciar sesión */}
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
            ) : (
                <Button
                    title="Iniciar Sesión"
                    disabled={Object.keys(error).length > 0 || isLoading} // Deshabilitar si hay errores o carga
                    onPress={handleLogin}
                    containerStyle={styles.button}
                />
            )}

            {/* Botón para registrarse */}
            <Button
                title="Registrarse"
                type="outline"
                onPress={() => navigation.navigate('Register')} // Navegar a la pantalla de registro
                containerStyle={styles.button}
                disabled={isLoading} // Deshabilitar durante la carga
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center', // Centrar contenido verticalmente
    },
    title: {
        textAlign: 'center', // Centrar texto
        marginBottom: 30, // Separación inferior
    },
    button: {
        marginVertical: 10, // Separación vertical entre botones
    },
    loading: {
        marginVertical: 20, // Separación vertical para el indicador de carga
    },
    error: {
        color: 'red', // Texto en rojo para errores
        textAlign: 'center', // Centrar texto
        marginBottom: 10, // Separación inferior
    },
});
