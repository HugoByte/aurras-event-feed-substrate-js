const defer = require('config/defer').deferConfig;
const _ = require('lodash');

module.exports = {
    // Name of the chain
    chainName: undefined,

    chainEndpoint: undefined,
    
    // Loggers config fetched through environment variable
    loggerConfigurations: undefined,
    
    /**
     * TODO: Since the limitation of json schema-to-yup not supporting array validation as we wanted
     * we are forced to add the make object than array. Once we add array handle to schema-to-yup
     * we can fix the below transformer to have different loggers and array with key value pair.
     */

    // Transform the config fetched through environment variable
    loggers: defer(function () {
        // Split loggers config to get indepndent logger
        var loggers = _.split(_.trim(this.loggerConfigurations), ";");

        loggers = _.reduce(loggers, function (object, loggerConfiguration) {
            // Return the accumulator if the value is empty.
            if (_.isEmpty(loggerConfiguration)) return object;

            // Get logger options
            const logger = _.reduce(_.split(loggerConfiguration, ","), function (object, item, index) {
                // Return the accumulator if the value is empty.
                if (_.isEmpty(item)) return object;

                // Get Logger type as key of the first object
                const loggerType = Object.keys(object)[0];

                // Type of Logger from the 1st argument
                if (index === 0) object[item] = { enabled: true };

                // Level of the logger from the 2nd argument
                if (index === 1) object[loggerType]["level"] = item;
                
                // Optional Argument based on the logger from 3rd argument
                if (index === 2) {
                    // Map to get the option based on type of logger
                    const keyMap = {
                        file: "location",
                    };

                    // keyMap[loggerType] to get the option based on the type of the logger
                    object[loggerType][keyMap[loggerType]] = item;
                }
                return object;
            }, {});

            // 
            return _.assign(object, logger);
        }, {});

        return loggers;
    })
}