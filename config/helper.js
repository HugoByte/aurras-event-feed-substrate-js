const _ = require('lodash');

module.exports = {
    loggersHelper: function (loggerConfigurations) {
        // Split loggers config to get indepndent logger
        var loggers = _.split(_.trim(loggerConfigurations), ";");

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

            return _.assign(object, logger);
        }, {});

        return loggers;
    },

    excludesHelper: function (sectionMethodExcludes) {
        // Split loggers config to get indepndent logger
        var sections = _.split(_.trim(sectionMethodExcludes), ";");

        sections = _.reduce(sections, function (object, sectionMethodExclude) {
            // Return the accumulator if the value is empty.
            if (_.isEmpty(sectionMethodExclude)) return object;

            //Split to get section and its method sectionMethodExcludeSplit[0] will be the section and if only specific methods need to be excluded, sectionMethodExcludeSplit[1] will be method collection
            const sectionMethodExcludeSplit = _.split(_.trim(sectionMethodExclude), "=");
            const section = sectionMethodExcludeSplit[0];
            const methods = sectionMethodExcludeSplit[1] ? _.filter(_.split(_.trim(sectionMethodExcludeSplit[1]), ","), function (value) {
                return !_.isEmpty(value);
            }) : undefined;

            object.push({
                section,
                methods
            });

            return object;
        }, []);

        return sections;
    }
}