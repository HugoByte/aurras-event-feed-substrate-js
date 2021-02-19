# 0.1.0
* Initial release
* Reading Configuration based on Environment
* Override Configuration if Environment Variables provided
* Configurations for Chain endpoint Sections and Methods from extrinsic to Exclude, types, Openwhisk Endpoint, Openwhisk Auth Key, Trigger Endpoint, Kafka Topic and Brokers
* Connects to the chain
* Add custom type to chain initialization if provided
* Subscribes to system.events
* Filters Events based on excludes provided
* Post Events to trigger Endpoint
* Dockerfile for Substrate Event Feed Package

# 0.1.1
* Add dotenv to get environment variables from .env
* Add Test env config
* Update Schema Validation
* Add Configuration for Health API Port