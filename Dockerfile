# FROM node:18-alphine

# WORKDIR /app

# RUN apt-get update && apt-get install -y ffmpeg

# COPY package*.json ./

# RUN npm install

# COPY . .

# # Build your Next.js application
# RUN npm run build

# EXPOSE 3000

# CMD ["npm","start"]
FROM redis:latest 
