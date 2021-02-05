<!--
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
-->
# Event Feed - Substrate

## Event Feed package to Source Events from Substrate based Chains

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)

This Event Feed package facilitates to source events from substrate-based chains. The events will be posted to the OpenWhisk system. [polkadot-js/api](https://github.com/polkadot-js/api) is used under the hood to establish the connection to blockchain nodes and receive events.

### Prerequisites

1. [Substrate Based Chain](https://substrate.dev/docs/en/tutorials/create-your-first-substrate-chain/)
2. [Openwhisk](/docs/dependencies/openwhisk/)

### Installation

Assuming basic dependency such as [git](https://git-scm.com/) and [yarn](https://yarnpkg.com/) already installed.

1. Clone the repository

```text
git clone https://github.com/HugoByte/aurras-event-feed-substrate-js.git
```

  2. Navigate to the cloned directory

```text
cd aurras-event-feed-substrate-js
```

  3. Install dependencies

```text
yarn install
```

### Configuration

Configurations are passed through environment variables which can be found [here](/docs/configuration.md).

### Usage

Start the feed in development mode.

```text
yarn serve
```

### Testing

Run Unit test suites

```text
yarn test
```

### Deployment

Deployment is done through either docker-compose or Kubernetes which can be found [here](/docs/deployment/).

### License
Licensed under [Apache-2.0](./LICENSE)