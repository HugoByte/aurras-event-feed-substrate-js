# Windows

### Deployment Guide

1. Clone [aurras-deployment-kubernetes](https://github.com/HugoByte/aurras-deployment-kubernetes) with submodules

```text
git clone https://github.com/HugoByte/aurras-deployment-kubernetes --recurse-submodules
```

   2. Navigate to openwhisk setup directory

```text
cd aurras-deployment-kubernetes/openwhisk
```

   3. Get InternalIP of the cluster

```text
kubectl describe nodes | grep InternalIP
```

   4. Creating mycluster.yaml with **apiHostName** as InternalIP of the nodes 

{% hint style="info" %}
Assuming the IP returned from the above step 3 as "192.168.65.3"
{% endhint %}

```text
whisk:
  ingress:
    type: NodePort
    apiHostName: 192.168.65.3
    apiHostPort: 31001

nginx:
  httpsNodePort: 31001
```

   5. Create a namespace

```text
kubectl create namespace aurras
```

   6. Indicate the Kubernetes worker nodes that should be used to execute user containers by OpenWhisk's invokers

```text
kubectl label nodes --all openwhisk-role=invoker
```

  7. Deploy Openwhisk using helm

```text
helm install openwhisk ./helm/openwhisk -n aurras -f mycluster.yaml
```

  8. Get the summary of installation using

```text
helm status openwhisk -n aurras
```

