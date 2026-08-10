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

# Create non-root user
RUN addgroup -S spring && adduser -S spring -G spring

# Copy Spring Boot JAR
COPY --from=build /app/target/*.jar app.jar

# Run application as non-root user
USER spring:spring

# Default application port
EXPOSE 8080

# Start Spring Boot
ENTRYPOINT ["java", "-jar", "/app/app.jar"]