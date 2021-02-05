# Docker Compose

OpenWhisk docker-compose deployment is used for local development and testing and should not be used for production.

### Prerequisites

1. [Docker](../../docker/)
2. [Docker Compose](../../docker-compose/)

### Deployment Guide

1. Clone [aurras-deployment-docker-compose](https://github.com/HugoByte/aurras-deployment-docker-compose)

```text
git clone https://github.com/HugoByte/aurras-deployment-docker-compose
```

    2. Navigate to openwhisk setup directory

```text
cd aurras-deployment-docker-compose/openwhisk
```

   3. Run docker-compose command to start the services

```text
docker-compose --project-name openwhisk up -d
```

