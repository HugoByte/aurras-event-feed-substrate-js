# Windows

{% hint style="info" %}
Docker with WSL 2 enabled comes with pre-installed docker-compose. If docker-compose --version gives version 1.2X and above, you may skip this setup.
{% endhint %}

### Installation Guide

1. Open Ubuntu Terminal.
2. Download a stable release of Docker Compose

```text
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

    3.  Create a symbolic link to /usr/bin

```text
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

    4. Apply executable permissions to the binary

```text
sudo chmod +x /usr/local/bin/docker-compose
```

    5. To confirm that Docker Compose has been installed, check the docker compose version using

```text
docker-compose --version
```

Reference: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

