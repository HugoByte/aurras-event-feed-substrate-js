# Ubuntu

### Setup Guide

1. Download the latest stable release of kind \(**kind-linux-amd64**\) from [https://github.com/kubernetes-sigs/kind/releases](https://github.com/kubernetes-sigs/kind/releases)
2. Create a kind-cluster.yaml to configure your cluster with below configuration

```text
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
  extraPortMappings:
    - hostPort: 31001
      containerPort: 31001
- role: worker
```

    3. Create the cluster using

```text
kind create cluster --config kind-cluster.yaml
```

    4. Confirm if the clusters have been created using

```text
kind get clusters
```

