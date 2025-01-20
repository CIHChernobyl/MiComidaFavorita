# Mi Comida Favorita 

## Descripción

Mi Comida Favorita es una aplicación móvil que permite a los usuarios registrarse, iniciar sesión y gestionar su perfil personal, que incluye el nombre, apellido y su comida favorita. La aplicación también permite la validación en tiempo real de los campos del formulario y proporciona un feedback visual sobre los errores en cada paso del proceso.

### Mejoras Implementadas

1. **Validación en tiempo real**:
   - La validación de los campos de email, contraseña y confirmación de contraseña se realiza mientras el usuario escribe.
   - Se muestran mensajes de error claros y específicos si los campos no cumplen con los requisitos establecidos.

2. **Indicadores de carga**:
   - Se ha implementado un indicador de carga (`ActivityIndicator`) durante el proceso de inicio de sesión y registro.
   - Los botones de la aplicación están deshabilitados durante la carga para evitar acciones redundantes.

3. **Feedback visual de errores**:
   - Se muestran mensajes de error inmediatos si los campos están vacíos o contienen datos inválidos, tanto en el registro como en el inicio de sesión.
   - La aplicación valida que las contraseñas coincidan antes de enviar el formulario.

4. **Flujo de autenticación con Firebase**:
   - Utiliza Firebase para autenticar a los usuarios mediante email y contraseña.
   - Los usuarios pueden crear una cuenta, iniciar sesión, y actualizar su perfil con facilidad.

5. **Deshabilitación de botones durante procesos largos**:
   - Se deshabilitan los botones de acción durante los procesos de carga (registro, inicio de sesión, actualización de perfil) para mejorar la UX.

---

## Instalación

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

### 1. Clonar el repositorio
Primero, clona el repositorio desde GitHub:


```bash
git clone https://github.com/tu-usuario/mi-comida-favorita.git
```

### 2. Navegar al directorio del proyecto

Accede al directorio del proyecto:

```bash
cd mi-comida-favorita
```

### 3. Instalar las dependencias

Asegúrate de tener npm o yarn instalados. Luego, instala las dependencias necesarias con:

```bash
npm install
```


### 4. Configuración de Firebase

Debes configurar Firebase en el proyecto. Crea un proyecto en Firebase Console y obtiene las credenciales para la configuración.

Crea un archivo .env en el directorio raíz del proyecto y agrega las siguientes variables de configuración de Firebase:

```bash
FIREBASE_API_KEY=tu-api-key
FIREBASE_AUTH_DOMAIN=tu-auth-domain
FIREBASE_PROJECT_ID=tu-project-id
FIREBASE_STORAGE_BUCKET=tu-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
FIREBASE_APP_ID=tu-app-id
```

### 5. Ejecutar la aplicación

Para ejecutar la aplicación en un emulador o dispositivo real, usa el siguiente comando:

```bash
npx expo start
```

