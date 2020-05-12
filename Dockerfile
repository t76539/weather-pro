FROM openjdk:8-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ARG DEPENDENCY=target/dependency
COPY ./wserver.jar wserver.jar
COPY ./weather.csv weather.csv
ENTRYPOINT ["java","-jar","wserver.jar"]