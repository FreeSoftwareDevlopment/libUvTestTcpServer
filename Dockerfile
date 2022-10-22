FROM alpine:3.14

WORKDIR /app

RUN apk add --no-cache cmake build-base make

COPY libuv libuv
COPY libUvTest libUvTest
COPY CMakeLists.txt .

RUN mkdir /server
RUN cmake -S . -B /server -G "Unix Makefiles"
RUN cmake --build /server

WORKDIR /server/libUvTest

RUN rm -rf /app
RUN apk del cmake build-base make

EXPOSE 8000

CMD ["./libUvTest"]
