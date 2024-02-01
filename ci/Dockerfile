# Etapa de construcción
# --------------------
# Selecciona una imagen base con Node.js
FROM node:14-slim as build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo de dependencias y las instala
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del código fuente de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Etapa de ejecución
# ------------------
# Selecciona una imagen base más ligera para la ejecución
FROM node:14-slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el código fuente construido y los módulos de Node.js necesarios desde la etapa 'build'
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules

# Expone el puerto que la aplicación utilizará
EXPOSE 8080

# Define el comando para ejecutar la aplicación
CMD ["node", "build/index.js"]
