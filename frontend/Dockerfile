FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# .env 파일을 명시적으로 복사
COPY .env .env
# 빌드 시 환경 변수 포함
RUN npm run build
CMD ["npm", "start"]