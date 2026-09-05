---
title: Preguntas frecuentes
description: Lo que suelen preguntar ciudades, operadores y desarrolladores.
---

### ¿Qué necesita una ciudad para usar opentransit?
Un feed GTFS estático publicado en una URL. GTFS-Realtime (posiciones, trip updates, alertas) y GBFS son opcionales y activan las funciones en vivo y de bicis compartidas.

### ¿Hay llaves de API o servicios de pago?
No. Mapa base de OpenFreeMap, geocodificación con Photon y las paradas del propio GTFS, enrutamiento con OpenTripPlanner. Cada ciudad puede sustituir cualquiera de ellos por configuración.

### ¿Puede una ciudad ponerle su marca?
Sí: nombre, color primario, logo, componentes y colores, fichas de servicios, enlaces oficiales y una landing pública propia, todo desde la configuración y el panel de administración. Las apps móviles se publican con el id y los iconos de la ciudad.

### ¿Cómo se calculan las tarifas si el GTFS no las trae?
Con una tarifa plana estimada por ciudad (pasaje, costo de transbordo, ventana de integración, transbordos máximos), editable en el panel. Las apps la muestran siempre como "estimada". Si el feed publica tarifas (GTFS-Fares), el enrutador las usará.

### ¿Qué pasa cuando el tiempo real falla?
Las apps no muestran paradas vacías: pasan a "por programación" y avisan "sin datos en vivo hace N s" a partir del estado de salud de la API.

### ¿Se puede integrar con taxis o apps de transporte?
Está en la hoja de ruta: estimación con la tarifa regulada de cada ciudad y traspaso por enlaces profundos a operadores configurables; las integraciones con precios en tiempo real dependen de acuerdos con cada plataforma.

### ¿Cuántas ciudades soporta una instalación?
Varias. Una instancia de la API sirve N ciudades; cada ciudad tiene su propio OpenTripPlanner. Las apps muestran un selector cuando hay más de una.

### ¿Cuánta máquina hace falta?
Para Bogotá (1.000+ rutas, 9,6 millones de `stop_times`): el grafo se construye en unos 2 minutos y OpenTripPlanner sirve con unos 3 GB de RAM; la API usa unos 200 MB.

### ¿Con qué licencia?
MIT para el código; CC BY 4.0 para esta documentación. Los datos son de cada agencia bajo su propia licencia.
