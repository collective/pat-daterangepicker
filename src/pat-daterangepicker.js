(function (root, factory) {
    // We use AMD (Asynchronous Module Definition) or browser globals to create
    // this module.
    if (typeof define === 'function' && define.amd) {
        define([
            "jquery",
            "pat-base",
            "pat-registry",
            "pat-parser",
            "pat-logger",
            "moment",
            "underscore",
            "daterangepicker"
        ], function() {
            return factory.apply(this, arguments);
        });
    } else {
        // If require.js is not available, you'll need to make sure that these
        // global variables are available.
        factory($, patterns.Base, patterns, patterns.Parser, patterns.logger, moment, underscore, daterangepicker);
    }
}(this, function($, Base, registry, Parser, logger) {
    'use strict';

    var log = logger.getLogger("pat-daterangepicker");
    /* For logging, you can call log.debug, log.info, log.warn, log.error and log.fatal.
     *
     * For more information on how to use the logger and how to view log messages, please read:
     * https://github.com/Patternslib/logging
     */
    log.debug("pattern loaded");

    var parser = new Parser('daterangepicker');
    /* If you'd like your pattern to be configurable via the
     * data-pat-daterangepicker attribute, then you need to
     * specify the available arguments here, by calling parser.addArgument.
     *
     * The addArgument method takes the following parameters:
     *  - name: The required name of the pattern property which you want to make
     *      configurable.
     *  - default_value: An optional default string value of the property if the user
     *      doesn't provide one.
     *  - choices: An optional set (Array) of values that the property might take.
     *      If specified, values outside of this set will not be accepted.
     *  - multiple: An optional boolean value which specifies wether the
     *      property can be multivalued or not.
     *
     *  For example:
     *      parser.addArgument('color', 'blue', ['red', 'green', 'blue'], false);
     */
    parser.addArgument("text", "Patternslib pat-daterangepicker demo with default options.");

    return Base.extend({
        /* The name is used to store the pattern in a registry and needs to be
         * unique.
         */
        name: 'daterangepicker',
        /* The trigger specifies the selector (CSS or jQuery) which Patternslib
         * will scan for in order to identifiy and initialize this pattern.
         */
        trigger: ".pat-daterangepicker",

        init: function initUndefined () {
            this.options = parser.parse(this.$el);
            /* this.options will now contain the configured pattern properties
             * you've registered with the parser.addArgument method.
             *
             * If the user provided any values via the data-pat-daterangepicker
             * attribute, those values will already be set.
             */
            // Just for the demo, do something:
            this.$el.daterangepicker();
            this.$el.on('apply.daterangepicker', function(ev, picker) {
                console.log("what is going on?")
  console.log(picker.startDate.format('YYYY-MM-DD'));
  console.log(picker.endDate.format('YYYY-MM-DD'));
});
            log.debug("pattern initialized");
        }
    });
}));
