# Kubernetes

Only OpenWhisk Kubernetes deployment should be used for production deployment

{% hint style="warning" %}
For production deployment generate a new user and namespace with **wskadmin\_openwhisk-wskadmin** container cli \([reference](https://github.com/apache/openwhisk/tree/master/tools/admin)\) and override default provided system and guest auth
{% endhint %}

### Prerequisites

* [Kubernetes](../../../kubernetes/)
* [Helm](../../../helm.md)

### Environment

* [Windows](environment/windows.md)
* [macOS](environment/macos.md)
* [Ubuntu](environment/ubuntu.md)
* [IBM Cloud Private \(ICP\)](https://github.com/apache/openwhisk-deploy-kube/blob/master/docs/k8s-ibm-private.md#configuring-openwhisk)
* [IBM Kubernetes Service \(IKS\)](https://github.com/apache/openwhisk-deploy-kube/blob/master/docs/k8s-ibm-public.md#configuring-openwhisk)
* [Google Kubernetes Engine \(GKE\)](https://github.com/apache/openwhisk-deploy-kube/blob/master/docs/k8s-google.md#configuring-openwhisk)
* [Amazon Elastic Kubernetes Service \(EKS\)](https://github.com/apache/openwhisk-deploy-kube/blob/master/docs/k8s-aws.md#configuring-openwhisk)

