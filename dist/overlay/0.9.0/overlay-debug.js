define("#overlay/0.9.0/overlay-debug", ["$","position","iframe-shim","base"], function(require, exports, module) {

    var $ = require('$'),
        Position = require('position'),
        Shim = require('iframe-shim'),
        Base = require('base');

    var Overlay = Base.extend({
        options: {
            srcNode: null,
            template: '',
            content: '',
            zIndex: 10,
            width: 'auto',
            height: 'auto',
            minHeight: 0,
            parentNode: document.body,
            pinOffset: {
                x: 0,
                y: 0
            },
            baseObject: {
                element: document.body,
                x: 0,
                y: 0
            }
        },

        initialize: function(options) {
            this.options = $.extend({}, this.options, options);
            //this.setOptions(options);
            $.extend(this, this.options);
        },

        render: function() {
            var elem;
            if (!this.srcNode) {
                elem = $(this.template);
                this.content && elem.html(this.content);
                this.srcNode = elem[0];
                elem.appendTo(this.parentNode);
            } else {
                elem = $(this.srcNode);
            }
            this.sync();
            this.iframeshim = new Shim(this.srcNode);
            this.on('show hidden sync', this.iframeshim.sync);
            return this;
        },

        sync: function() {
            if (this.srcNode) {
                this.trigger('sync');
                var elem = $(this.srcNode);
                elem.css({
                    width: this.width,
                    height: this.height,
                    zIndex: this.zIndex,
                    minHeight: this.minHeight
                });
                Position.pin({
                    element: this.srcNode,
                    x: this.pinOffset.x,
                    y: this.pinOffset.y
                }, this.baseObject);
            }
            return this;
        },

        show: function() {
            this.trigger('show');
            $(this.srcNode).show();
            return this;
        },

        hide: function() {
            $(this.srcNode).hide();
            this.trigger('hidden');
            return this;
        }

    });

    module.exports = Overlay;

});

