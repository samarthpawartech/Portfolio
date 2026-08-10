# =========================================================
# BUILD STAGE
# =========================================================

FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app


# =========================================================
# MAVEN DEPENDENCIES
# =========================================================

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

RUN chmod +x mvnw && ./mvnw dependency:go-offline -B


# =========================================================
# APPLICATION SOURCE
# =========================================================

COPY src ./src

# Tests require PostgreSQL, which is not available
# during Docker image build.
RUN ./mvnw clean package -DskipTests -B


# =========================================================
# RUNTIME STAGE
# =========================================================

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app


# =========================================================
# CREATE NON-ROOT USER
# =========================================================

RUN addgroup -S spring && adduser -S spring -G spring


# =========================================================
# COPY SPRING BOOT JAR
# =========================================================

COPY --from=build /app/target/*.jar app.jar


# =========================================================
# RUN AS NON-ROOT USER
# =========================================================

USER spring:spring


# =========================================================
# DEFAULT PORT
# =========================================================

EXPOSE 8080


# =========================================================
# START SPRING BOOT
# =========================================================

ENTRYPOINT ["java", "-jar", "/app/app.jar"]