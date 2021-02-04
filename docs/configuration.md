# Configuration

Configuration values below are passed through environment variables.



#### CHAIN\_NAME

An alphanumeric string to identify the chain.

| Environment Variable | Sample Values |
| :--- | :--- |
| CHAIN\_NAME | `CHAIN_NAME=polkadot` |



#### CHAIN\_ENDPOINT

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



#### LOGGERS

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



#### EXCLUDES

Sections or Methods of a specific section can be excluded provided through this configuration.

* A Section can be excluded as whole
* Specific methods of the section can be excluded

Format: EXCLUDES="section\[=methods\]"

Multiple sections to be provided separated by ";"

Multiple methods to be separated by ","

| Environment Variable | Sample Values |
| :--- | :--- |
| EXCLUDES | `EXCLUDES="system;balance=transfer;"` |



#### TYPES\_FILE

Location to custom types for the chain.

| Environment Variable | Sample Values |
| :--- | :--- |
| TYPES\_FILE | `TYPES_FILE="/opt/types.json"` |



#### KAFKA\_BROKERS

List of Kafka brokers where the event should be posted. separated by ";"

| Environment Variable | Sample Values |
| :--- | :--- |
| KAFKA\_BROKERS | `KAFKA_BROKERS=localhost:9091;localhost:9092` |



#### KAFKA\_TOPIC

Kafka topic to which events to be posted ";"

| Environment Variable | Sample Values |
| :--- | :--- |
| KAFKA\_TOPIC | `KAFKA_TOPIC=substrate` |



#### OPENWHISK\_API\_KEY

Openwhisk authentication key.

| Environment Variable | Sample Values |
| :--- | :--- |
| OPENWHISK\_API\_KEY | `OPENWHISK_API_KEY=cafebabe-cafe-babe-cafe-babecafebabe:007zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP` |



#### OPENWHISK\_API\_HOST

Openwhisk API Endpoint

| Environment Variable | Sample Values |
| :--- | :--- |
| OPENWHISK\_API\_HOST | `OPENWHISK_API_HOST=http://localhost:3232` |



#### OPENWHISK\_NAMESPACE

Organization space where the actions, rules, and triggers related to aurras resides.

| Environment Variable | Sample Values |
| :--- | :--- |
| OPENWHISK\_NAMESPACE | `OPENWHISK_NAMESPACE=aurras` |
