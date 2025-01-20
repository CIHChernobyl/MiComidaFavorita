import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

// Función para validar la contraseña
const validatePassword = (password) => {
  // Expresión regular que asegura que la contraseña tenga al menos:
  // - 8 caracteres, una letra mayúscula, una letra minúscula, un número, un carácter especial
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
};

export default function RegisterScreen({ navigation }) {
  // Estados para manejar email, contraseñas, errores y carga
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Validar el formulario cada vez que cambien los campos
  useEffect(() => {
    setError(validateForm());
  }, [email, password, confirmPassword]);

  // Función para validar el formulario de registro
  const validateForm = () => {
    let errors = {};
    
    // Validación de email
    if (!email) errors.email = 'El email es requerido';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email inválido';
    
    // Validación de contraseña
    if (!password) errors.password = 'La contraseña es requerida';
    else if (!validatePassword(password)) {
      errors.password =
        'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial';
    }

    // Validación de confirmación de contraseña
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    return errors;
  };

  // Comprobar si el formulario es válido
  const isFormValid = () => {
    const errors = validateForm();
    return Object.keys(errors).length === 0;
  };

  // Función para manejar el registro de usuario
  const handleRegister = async () => {
    const errors = validateForm();
    setError(errors);

    // Si hay errores, no continuar
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true); // Mostrar indicador de carga

    try {
      // Crear usuario con email y contraseña
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('Home'); // Navegar a la pantalla principal si el registro es exitoso
    } catch (err) {
      setError({ general: 'Error al registrarse: ' + err.message }); // Mostrar mensaje de error si algo falla
    } finally {
      setIsLoading(false); // Ocultar indicador de carga
    }
  };

  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <Text h3 style={styles.title}>
        Registro
      </Text>

      {/* Campo para el email */}
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        errorMessage={error.email} // Mostrar error si existe
      />

      {/* Campo para la contraseña */}
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Campo de contraseña oculta
        errorMessage={error.password} // Mostrar error si existe
      />

      {/* Campo para confirmar la contraseña */}
      <Input
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry // Campo de contraseña oculta
        errorMessage={error.confirmPassword} // Mostrar error si existe
      />

      {/* Mostrar error general si existe */}
      {error.general ? <Text style={styles.error}>{error.general}</Text> : null}

      {/* Mostrar indicador de carga o botón de registro */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Registrarse"
          onPress={handleRegister}
          containerStyle={styles.button}
          disabled={isLoading || !isFormValid()} // Deshabilitar si hay errores o está cargando
        />
      )}

      {/* Botón para volver al login */}
      <Button
        title="Volver al Login"
        type="outline"
        onPress={() => navigation.navigate('Login')}
        containerStyle={styles.button}
        disabled={isLoading} // Deshabilitar si está cargando
      />
    </View>
  );
}

// Estilos para los componentes de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Centrar contenido verticalmente
  },
  title: {
    textAlign: 'center', // Centrar título
    marginBottom: 30, // Separación inferior
  },
  button: {
    marginVertical: 10, // Separación vertical entre botones
  },
  error: {
    color: 'red', // Color de texto para errores
    textAlign: 'center', // Centrar texto
    marginBottom: 10, // Separación inferior
  },
});
