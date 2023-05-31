# 🌿- Control de Luminiscencia en Invernadero

Este repositorio contiene una aplicación web desarrollada en Flask, diseñada para el control de luminiscencia en invernaderos. La aplicación es capaz de recibir datos en tiempo real mediante un fotoresistor y utilizarlos para regular la iluminación en función de las necesidades de las plantas. 🌱

![Photo](https://i.imgur.com/PNguLgR.png)
### 🚀 - Características principales 
- 🐍 - Implementada en Flask, un framework de desarrollo web en Python, que proporciona un entorno ágil y eficiente. 
- 🌞 - Recopila datos en tiempo real provenientes de sensores ubicados en el invernadero, como la intensidad lumínica para ver en qué secciones del invernadero, en función de la etapa de día, se necesita aplicar luz artificial. 
- 📈 - Utiliza algoritmos de control para ajustar la iluminación artificial en función de los datos recibidos, visualizar los datos recibidos y graficarlos para ver la variación de la luminiscencia con respecto al tiempo 
- 🖥️ - Proporciona una interfaz intuitiva y fácil de usar, que permite visualizar los datos recopilados y realizar ajustes manuales si es necesario. 
- 📊 - Ofrece la posibilidad de generar informes y gráficos para analizar el comportamiento de la iluminación en el invernadero a lo largo del tiempo. 

Con este repositorio, podrás construir y personalizar tu propio sistema de control de luminiscencia en invernadero, adaptándolo a tus necesidades específicas. ¡Optimiza el crecimiento de tus plantas y maximiza tu producción agrícola con esta aplicación web en Flask! 🌼

*Nota: Este repositorio se encuentra en desarrollo activo y se agregarán nuevas funcionalidades próximamente. ¡Mantente atento!* ⚙️

# 📚 - Guía de Instalación

### 🐍 - Instalación de Entorno Virtual de Flask

Antes de comenzar la instalación, asegúrate de cumplir con los siguientes requisitos:
- Tener la versión más reciente de Python instalada en tu sistema.
- Tanto el servidor como el microcontrolador deben estar conectados a la misma red para establecer la conexión cliente-servidor.

**Paso 1: Descarga de la Aplicación**
Descarga la carpeta del entorno FlaskApplication desde el siguiente [enlace de descarga](https://github.com/LuisRodrigoBarbaNavarro/probable-engine). Una vez descargada, descomprímela en tu sistema.

**Paso 2: Configuración del Entorno Virtual de Python**
1. Abre una ventana de línea de comandos (cmd) y navega hasta la carpeta FlaskApplication.
2. Accede a la carpeta "Source" dentro de FlaskApplication, donde se encuentran los archivos esenciales de la aplicación.

**Paso 3: Configuración de la Dirección IP en app.py**
Abre el archivo "app.py" y busca la sección de código a continuación:
```python
import socket
import time

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('192.168.43.22', 8585))
s.listen(0)
```
Modifica la dirección IP dentro de la función `s.bind()` con la dirección IP de tu conexión a internet. Por ejemplo:
```python
s.bind(('192.168.1.100', 8585))
```
Guarda los cambios realizados en el archivo.

**Paso 4: Activación del Entorno Virtual**
En la ventana de línea de comandos, ejecuta el siguiente comando para activar el entorno virtual del proyecto:
```
<nombre-del-entorno-virtual>\Scripts\activate
```
**Paso 5: Ejecución de la Aplicación**
Una vez activado el entorno virtual, estás listo para ejecutar la aplicación. En la ventana de línea de comandos, dentro de la carpeta "Source", ejecuta el siguiente comando:
```
python app.py
```
¡Listo! La primera parte de la guía de instalación está completada.
*Nota: Asegúrate de contar con los permisos necesarios en tu sistema para ejecutar aplicaciones y modificar archivos.*

### 🤖 - Configuración del Cliente Socket en Arduino

Para establecer la comunicación entre el microcontrolador y el servidor, es necesario cargar el archivo "SocketClient.ino" en tu microcontrolador utilizando el Arduino IDE. Sigue los pasos a continuación:

1. Descarga e instala el Arduino IDE desde el siguiente [enlace de descarga](https://www.arduino.cc/en/software).
2. Abre el Arduino IDE y crea un nuevo proyecto.
3. Copia y pega el contenido del archivo "SocketClient.ino" en el proyecto en el Arduino IDE.

Dentro del archivo "SocketClient.ino", encontrarás las siguientes variables de conexión:
```cpp
const uint16_t port = 8585;
const char *host = "192.168.1.70";
const String ussid = "Rodrigo's Phone";
const String password = "bf9292jfi9q1";
```
Modifica estas variables de acuerdo a tu configuración de red. Reemplaza el valor de `host` con la dirección IP del servidor donde se ejecuta la aplicación Flask. Asimismo, actualiza los valores de `ussid` y `password` con los datos de tu red Wi-Fi.

Conecta tu microcontrolador al ordenador y selecciona el puerto correcto en el Arduino IDE. Luego, haz clic en el botón de carga (upload) para cargar el programa en el microcontrolador.

Una vez cargado con éxito, el microcontrolador estará listo para enviar y recibir datos del servidor Flask.

¡Enhorabuena! Has completado la configuración del cliente socket en Arduino. Ahora podrás intercambiar datos con la aplicación web en Flask y controlar la luminiscencia en tu invernadero de manera efectiva.

Recuerda que si necesitas realizar ajustes adicionales, puedes modificar los archivos correspondientes según tus requerimientos específicos.

*Nota: Asegúrate de tener los controladores necesarios instalados para tu microcontrolador y que esté correctamente conectado al ordenador.*

```Made with love by Shinia```
