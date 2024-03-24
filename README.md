# ELK Manager Elastic Microservice

This server is used to simulate the ELK behavior so that the ELK Manager Mini can be interactive.

## Deploy

```bash
docker build -t elasticsearch .
docker run -p 3010:3010 -d elasticsearch
```

## Usage

### Connecting with websocket

Clients can connect to the server using WebSocket to receive real-time updates and interact with the ELK Manager Mini.

## API Endpoints

### Users

  - **GET /api/users**: Retrieves information about all connected users.
    - **Response**:
      ```json
      {
        "number": 3,
        "users": ["user1", "user2", "user3"]
      }
      ```

### Status

  - **GET /api/status**: Retrieves the status of a specific user's engine.
    - **Query Parameters**:
      - `userId`: The unique identifier of the user.
    - **Response**:
      ```json
      {
        "userId": "user1",
        "module": "elasticsearch",
        "status": "on"
      }
      ```

### Configuration

  - **GET /api/config**: Retrieves the current configuration settings for a user.
    - **Query Parameters**:
      - `userId`: The unique identifier of the user.
    - **Response**:
      ```json
      {
        "jvm_size": 3,
        "password": "password",
        "port": 9500
      }
      ```

  - **PUT /api/config**: Updates the configuration settings for a user.
    - **Query Parameters**:
      - `userId`: The unique identifier of the user.
    - **Request Body**:
      ```json
      {
        "jvm_size": 4,
        "password": "newpassword",
        "port": 9600
      }
      ```
    - **Response**:
      ```json
      {
        "jvm_size": 4,
        "password": "newpassword",
        "port": 9600
      }
      ```

### Actions

  - **POST /api/action**: Performs an action on the user's engine.
    - **Query Parameters**:
      - `userId`: The unique identifier of the user.
    - **Request Body**:
      ```json
      {
        "action": "start"
      }
      ```
    - **Response**:
      ```
      Engine started!
      ```
      or
      ```
      Engine stopped!
      ```
  

## Configuration

The server supports configuration through environment variables:

### Server

  - SERVER_PORT: The port on which the server runs. Default is 3010.
  - SERVER_HOST: The host on which the server is hosted. Default is localhost.

### User

  - MAX_CONNECTIONS: The maximum number of WebSocket connections allowed. Default is 5.

### Engine

  - MIN_START_LOADING_TIME: The minimum time (in milliseconds) to start loading the engine. Default is 4000.
  - MAX_START_LOADING_TIME: The maximum time (in milliseconds) to start loading the engine. Default is 10000.
  - MIN_STOP_LOADING_TIME: The minimum time (in milliseconds) to stop loading the engine. Default is 1000.
  - MAX_STOP_LOADING_TIME: The maximum time (in milliseconds) to stop loading the engine. Default is 2000.
  - ON_DISPATCHER_TIME: The time interval (in milliseconds) for the engine dispatcher. Default is 1000.