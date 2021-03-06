define(function(require, exports, module) {


    // 提供 Template 支持
    // ----------------


    var Handlebars = require('handlebars');
    var $ = require('$');


    var Templatable = {

        // Handlebars 的 helpers
        helpers: null,

        // 根据配置的模板和传入的数据，构建 this.element
        parseElementFromTemplate: function() {
            var helpers = this.helpers;

            // 注册 helpers
            if (helpers) {
                for (var name in helpers) {
                    Handlebars.registerHelper(name, helpers[name]);
                }
            }

            // 生成 html
            var html = Handlebars.compile(this.options.template)(this.model);

            // 卸载 helpers
            if (helpers) {
                for (name in helpers) {
                    delete Handlebars.helpers[name];
                }
            }

            this.element = $(html);
        }
    };

    module.exports = Templatable;

});
