# Kubernetes

Kubernetes is a portable, extensible, open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation. It has a large, rapidly growing ecosystem. Kubernetes services, support, and tools are widely available. You do not need to have detailed knowledge of either Kubernetes or Helm to use this project, but you may find it useful to review their basic documentation to become familiar with their key concepts and terminology.

Kubernetes can be set up using multiple approaches.

### Simple Docker-based options

{% hint style="info" %}
Consider using this only for development and testing
{% endhint %}

#### Prerequisites

1. [Docker](../docker/)

#### Environment

* [Windows](environments/windows.md)
* [macOS](environments/macos.md)
* [Ubuntu](environments/kubernetes-ubuntu.md)

### Kubernetes cluster from a cloud provider

This will be an ideal, easier and a managed solution to deploy aurras to production.

#### Common Cloud Providers

* [IBM Cloud Private \(ICP\)](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_3.1.1/getting_started/introduction.html)
* [IBM Kubernetes Service \(IKS\)](www.ibm.com/kubernetes/service)
* [Google Kubernetes Engine \(GKE\)](https://cloud.google.com/containers/gke)
* [Amazon Elastic Kubernetes Service \(EKS\)](https://aws.amazon.com/eks/)

### Self Build Kubernetes Cluster

Building your own cluster setup requires advanced technical and networking skills, and a good understanding of Kubernetes. This solution is recommended only for advanced users.

