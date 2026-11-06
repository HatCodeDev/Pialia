# Pialia - SmartBin EcoSort (Interactive Pitch Demo)

Prototipo interactivo PWA de alta fidelidad diseñado para demostraciones y pitch de emprendimiento universitario. Simula la experiencia de usuario y el flujo de reciclaje inteligente con visión computacional y gamificación institucional en la Universidad del Valle de Puebla (UVP).

---

## ⚠️ Alcance y Limitaciones de esta Demo

Este repositorio contiene un **prototipo funcional de interfaz (Front-End PWA)** optimizado para pitch e impacto visual ante inversores y jurado. 

Por diseño, **NO incluye**:
1. **Validación de Ubicación por Hardware/Antifraude:** No hay candado por geofencing estricto, análisis de señal RSSI ni enlace criptográfico con antenas de campus para evitar suplantaciones de GPS.
2. **Conexión IoT Física en Tiempo Real:** Las peticiones al hardware de los contenedores (ESP32, cámara OV2640, servomotores y sensores ultrasónicos HC-SR04) están simuladas mediante estados interactivos locales.
3. **Inferencia de Red Neuronal en Backend Real:** El escaneo visual utiliza una simulación de Computer Vision orientada a la experiencia de usuario (bounding boxes dinámicas, reconocimiento instantáneo de botellas PET y tapitas) sin requerir un clúster de inferencia YOLOv8 en la nube.
4. **Persistencia Backend Permanente:** Los datos de puntos, racha y canje de premios se almacenan de manera reactiva en el cliente (`localStorage` / estado en memoria) para permitir restablecer y repetir el demo tantas veces como sea necesario durante la exposición.

---

## ✨ Características del Prototipo
- **Simulador de Depósito Inteligente:** Interfaz de escáner con detección simulada de residuos (PET vs Objeto no reciclable).
- **Gamificación Institucional UVP:** Tablero de puntos, racha activa, nivel de "Pantera Eco-Guardián" y retos semanales ("Reto Sable").
- **Leaderboard en Vivo:** Clasificación por estudiantes y por facultades universitarias (Ingeniería vs Negocios).
- **Marketplace de Recompensas:** Catálogo de canje con generación de códigos QR dinámicos para cafetería y merchandising UVP.
- **Diseño Mobile-First (PWA):** Interfaz fluida adaptable a smartphone o tablet para demostraciones en mano.

---

## 🚀 Puesta en Marcha Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build
```
