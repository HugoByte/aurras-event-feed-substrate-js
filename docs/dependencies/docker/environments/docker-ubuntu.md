# Ubuntu

### Installation Guide

1. Update the apt package index and install packages to allow apt to use a repository over HTTPS

```text
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

2. Add Docker’s official GPG key:

```text
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

3. Verify that the key has the fingerprint`9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88`, by searching for the last 8 characters of the fingerprint.

```text
sudo apt-key fingerprint 0EBFCD88
```

> pub     rsa4096 2017-02-22 \[SCEA\]  
>             9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88  
> uid                         \[ unknown\] Docker Release \(CE deb\) [docker@docker.com](mailto:docker@docker.com)  
> sub       rsa4096 2017-02-22 \[S\]

4. Set up the docker repository

```text
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

5. Update the apt package index, and install the latest version of Docker Engine and containerd

```text
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

6. Create the docker group.

```text
sudo groupadd docker
```

7. Add user to the docker group.

```text
sudo usermod -aG docker $USER
```

8. Log out and log back in so that your group membership is re-evaluated.

9. To confirm that Docker has been installed, check the docker version using

```text
docker --version
```

Reference: 

1. [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)

