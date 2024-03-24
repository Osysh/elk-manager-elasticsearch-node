# ELK Manager elastic Microservice

This server is used to simulate the ELK comportement so that the ELK Manager Mini can be interactive 

## Deploy

```docker build -t elasticsearch .```
```docker run -p 3010:3010 -d elasticsearch```

Config {
  jvmSize: number;
  password: string;
  port: number;
}

## Comment utiliser:

- Se connecter avec la socket

## Tasks

- Ajouter un logger