# Configuration

Configuration values below are passed through environment variables.



#### CHAIN\_NAME [Mandatory]

An alphanumeric string to identify the chain.

| Environment Variable | Sample Values |
| :--- | :--- |
| CHAIN\_NAME | `CHAIN_NAME=Node Template` |



#### CHAIN\_ENDPOINT [Mandatory]

The Endpoint of the chain node to which the event feed should connect to. Protocols Supported: ws \(WebSocket\) and wss \(WebSocket Secure\)

<table>
  <thead>
    <tr>
      <th style="text-align:left">Environment Variable</th>
      <th style="text-align:left">Sample Values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">CHAIN_ENDPOINT</td>
      <td style="text-align:left">
        <p><code>CHAIN_ENDPOINT=ws://localhost:9944</code>
        </p>
        <p><code>CHAIN_ENDPOINT=wss://localhost:9944</code>
        </p>
      </td>
    </tr>
  </tbody>
</table>



#### LOGGERS [Mandatory]

The configuration pertains to the loggers enabled for the event feed. This configuration is extensible to add multiple logging such as logging to a file, logging to console, logging to monitoring system based on different levels of logging. Winston is used under the hood. 

Loggers Available:

* console 
* file

Logger Levels:

* info
* warning
* error
* debug

Format:  
LOGGERS=type,level\[,param\]

Multiple loggers can be provided separated by ";"

| Environment Variable | Sample Values |
| :--- | :--- |
| LOGGERS | `LOGGERS=console,info;file,error,/logs/event-feed.log` |



#### EXCLUDES [Optional]

Sections or Methods of a specific section can be excluded provided through this configuration.

* A Section can be excluded as whole
* Specific methods of the section can be excluded

Format: EXCLUDES="section\[=methods\]"

Multiple sections to be provided separated by ";"

Multiple methods to be separated by ","

| Environment Variable | Sample Values |
| :--- | :--- |
| EXCLUDES | `EXCLUDES="system;balance=transfer;"` |



#### TYPES\_FILE [Optional]

Location to custom types for the chain.

| Environment Variable | Sample Values |
| :--- | :--- |
| TYPES\_FILE | `TYPES_FILE="/opt/types.json"` |



#### KAFKA\_BROKERS [Mandatory]

List of Kafka brokers where the event should be posted. separated by ";"

| Environment Variable | Sample Values |
| :--- | :--- |
| KAFKA\_BROKERS | `KAFKA_BROKERS=172.17.0.1:9092` |



#### TOPICS [Mandatory]

Topic to which events from certain sections to be posted ";"

Multiple sections with topic can be provided separated by ";"

| Environment Variable | Sample Values |
| :--- | :--- |
| TOPICS | `TOPICS=balances=c76b7a5d-d18a-43e6-a28f-db6bb7520986` |



#### OPENWHISK\_API\_KEY [Mandatory]

Openwhisk authentication key.

| Environment Variable | Sample Values |
| :--- | :--- |
| OPENWHISK\_API\_KEY | `OPENWHISK_API_KEY=23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP` |



#### OPENWHISK\_API\_HOST [Mandatory]

Openwhisk API Endpoint

| Environment Variable | Sample Values |
| :--- | :--- |
| OPENWHISK\_API\_HOST | `OPENWHISK_API_HOST=https://localhost:31001` |



#### OPENWHISK\_NAMESPACE [Mandatory]

Organization space where the actions, rules, and triggers related to aurras resides.

| Environment Variable | Sample Values |
| :--- | :--- |
| OPENWHISK\_NAMESPACE | `OPENWHISK_NAMESPACE=guest` |


#### EVENT\_RECEIVER [Mandatory]

Action which accepts events from feeds.

| Environment Variable | Sample Values |
| :--- | :--- |
| EVENT\_RECEIVER | `EVENT_RECEIVER=event-receiver` |


#### EVENT\_PROCESSOR [Mandatory]

Action which is responsible for parsing the events to generic specification.

| Environment Variable | Sample Values |
| :--- | :--- |
| EVENT\_PROCESSOR | `EVENT_PROCESSOR=substrate-event-processor` |


#### HEALTH\_API\_PORT [Optional]

Configuration for Health API port primarily used for Kubernetes readiness and liveness probe. Default port is 80.

| Environment Variable | Sample Values |
| :--- | :--- |
| HEALTH\_API\_PORT | `HEALTH_API_PORT=8080` |
