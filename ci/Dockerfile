FROM feeds.axadmin.net/docker/node

ENV ASPNETCORE_URLS=http://+:8080

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

RUN chmod +x ./ci/build.sh

ENTRYPOINT ["./ci/build.sh"]