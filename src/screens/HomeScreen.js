import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function HomeScreen({ navigation }) {
  // Estado para almacenar los datos del perfil
  const [profile, setProfile] = useState({
    nombre: '',
    apellido: '',
    comidaFavorita: ''
  });

  // Estados para gestionar la carga y la actualización del perfil
  const [isLoadingProfile, setIsLoadingProfile] = useState(true); // Carga del perfil
  const [isUpdating, setIsUpdating] = useState(false); // Actualización de perfil
  const [error, setError] = useState(''); // Error general

  // Cargar el perfil al montar el componente
  useEffect(() => {
    loadProfile();
  }, []);

  // Función para cargar los datos del perfil del usuario
  const loadProfile = async () => {
    setIsLoadingProfile(true);
    setError(''); // Resetear el error antes de cargar
    try {
      const docRef = doc(db, 'usuarios', auth.currentUser.uid); // Referencia al documento del perfil
      const docSnap = await getDoc(docRef);
      
      // Si el documento existe, se establece el perfil, de lo contrario se muestra un error
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        setError('No se encontraron datos del perfil.');
      }
    } catch (error) {
      console.error('Error al cargar perfil:', error);
      setError('Error al cargar el perfil. Intenta nuevamente.');
    } finally {
      setIsLoadingProfile(false); // Finaliza la carga
    }
  };

  // Función para manejar la actualización de perfil
  const handleUpdate = async () => {
    setIsUpdating(true);
    setError(''); // Resetear el error antes de la actualización
    try {
      await setDoc(doc(db, 'usuarios', auth.currentUser.uid), profile); // Actualizar los datos en Firestore
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setError('Error al actualizar perfil. Intenta nuevamente.');
    } finally {
      setIsUpdating(false); // Finaliza la actualización
    }
  };

  // Función para manejar el cierre de sesión
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Cerrar sesión de Firebase
      navigation.replace('Login'); // Navegar a la pantalla de login
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setError('Error al cerrar sesión. Intenta nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Si el perfil está cargando, mostrar indicador de carga */}
      {isLoadingProfile ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      ) : (
        <>
          {/* Título de la pantalla */}
          <Text h4 style={styles.title}>Mi Perfil</Text>

          {/* Campos de entrada para el perfil del usuario */}
          <Input
            placeholder="Nombre"
            value={profile.nombre}
            onChangeText={(text) => setProfile({ ...profile, nombre: text })}
          />
          <Input
            placeholder="Apellido"
            value={profile.apellido}
            onChangeText={(text) => setProfile({ ...profile, apellido: text })}
          />
          <Input
            placeholder="Comida Favorita"
            value={profile.comidaFavorita}
            onChangeText={(text) => setProfile({ ...profile, comidaFavorita: text })}
          />

          {/* Mostrar mensaje de error si existe */}
          {error ? <Text style={styles.error}>{error}</Text> : null}

          {/* Mostrar indicador de carga o el botón de actualización */}
          {isUpdating ? (
            <ActivityIndicator size="small" color="#0000ff" style={styles.loading} />
          ) : (
            <Button
              title="Actualizar Perfil"
              onPress={handleUpdate} // Actualizar perfil
              containerStyle={styles.button}
              disabled={isUpdating || isLoadingProfile} // Deshabilitar si está cargando o actualizando
            />
          )}

          {/* Botón para cerrar sesión */}
          <Button
            title="Cerrar Sesión"
            type="outline"
            onPress={handleSignOut} // Cerrar sesión
            containerStyle={styles.button}
            disabled={isUpdating || isLoadingProfile} // Deshabilitar si está cargando o actualizando
          />
        </>
      )}
    </View>
  );
}

// Estilos para los componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Centrado vertical
  },
  title: {
    textAlign: 'center', // Centrar título
    marginBottom: 30, // Espaciado inferior
  },
  button: {
    marginVertical: 10, // Espaciado entre botones
  },
  loading: {
    marginVertical: 20, // Espaciado del indicador de carga
  },
  error: {
    color: 'red', // Color del mensaje de error
    textAlign: 'center', // Centrado del texto
    marginBottom: 10, // Espaciado inferior
  },
});
