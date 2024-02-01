#!/bin/bash

# Detener el script si ocurre algún error
set -e

# Instalar dependencias de Node.js
echo "Instalando dependencias..."
npm install

# Construir la aplicación
echo "Construyendo la aplicación..."
npm run build

echo "Construcción completada."
