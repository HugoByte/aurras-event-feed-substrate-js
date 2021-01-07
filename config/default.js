const defer = require('config/defer').deferConfig;
const { loggersHelper, excludesHelper, typesHelper } = require('./helper');

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
        return loggersHelper(this.loggerConfigurations)
    }),

    // Section Methods to exclude fetched through environment variable
    sectionMethodExcludes: undefined,

    excludes: defer(function () {
        return excludesHelper(this.sectionMethodExcludes)
    }),

    typesLocation: undefined,

    types: defer(function () {
        return typesHelper(this.typesLocation);
    })
}