# 🌿- Control de Luminiscencia en Invernadero

Este repositorio contiene una aplicación web desarrollada en Flask, diseñada para el control de luminiscencia en invernaderos. La aplicación es capaz de recibir datos en tiempo real mediante un fotoresistor y utilizarlos para regular la iluminación en función de las necesidades de las plantas. 🌱

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

### 🤖 - Configuración del Microcontrolador ESP8266
