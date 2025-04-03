# Usa una imagen base de Node.js
FROM node:20.11.1

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias de Next.js
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto donde Next.js escuchará
EXPOSE 3000

# Comando por defecto para iniciar la aplicación
CMD ["npm", "run", "dev"] 