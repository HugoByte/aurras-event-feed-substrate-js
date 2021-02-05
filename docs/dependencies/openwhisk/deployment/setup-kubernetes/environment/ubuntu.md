# Ubuntu

### Deployment Guide

1. Clone [aurras-deployment-kubernetes](https://github.com/HugoByte/aurras-deployment-kubernetes) with submodules

```text
git clone https://github.com/HugoByte/aurras-deployment-kubernetes --recurse-submodules
```

   2. Navigate to openwhisk setup directory

```text
cd aurras-deployment-kubernetes/openwhisk
```

   3. Label the two worker nodes so that one is reserved for the invoker and the other will be used to run the rest of the OpenWhisk system.

```text
kubectl label node kind-worker openwhisk-role=core
kubectl label node kind-worker2 openwhisk-role=invoker
```

   4. Get InternalIP of the cluster

```text
kubectl describe node kind-worker | grep InternalIP: | awk '{print $2}'
```

   5. Creating mycluster.yaml with **apiHostName** as InternalIP of the nodes 

{% hint style="info" %}
Assuming the IP returned from the above step 4 as "192.168.65.3"
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

   6. Create a namespace

```text
kubectl create namespace aurras
```

    7. Deploy Openwhisk using helm

```text
helm install openwhisk ./helm/openwhisk -n aurras -f mycluster.yaml
```

  8. Get the summary of installation using

```text
helm status openwhisk -n aurras
```

