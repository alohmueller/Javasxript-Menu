;(function (window, document, undefined) {
    'use strict';

    // Feature support
    var supports = 'querySelector' in document;
    if ( !supports ) return;

    // Defaults
    var pluginName = 'nav';

    // overrideable defaults
    var defaults = {
        pluginClass: pluginName,
        activeClass: pluginName + '--active',
    }

    // Constructor
    function Nav(toggle) {
        this.toggleElem = document.querySelector(toggle);
        this.element = this.toggleElem.nextElementSibling;
        console.log(this.element);
        this.collapsed = true;
    }

    // Methods
    Nav.prototype = {
        init: function() {
            this.initHeight = this.element.clientHeight;
            this._addA11yAttrs();
            this._bindEvents();
            this.collapse();
        },

        _addA11yAttrs: function() {
            this.element.setAttribute('aria-hidden', true);
            this.element.setAttribute( "tabindex", "-1" );
        },

        _bindEvents: function(){
            var self = this;

            this.toggleElem.addEventListener('click', function(e) {
                self.toggle( e.target );
            });
        },

        collapse: function () {
            this.element.classList.remove( defaults.activeClass );
            this.element.style.height = 0;
            this.element.setAttribute('aria-hidden', true);
            this.collapsed = true;
        },

        expand: function () {
            this.element.classList.add( defaults.activeClass );
            this.element.style.height = this.initHeight + "px";
            this.element.setAttribute('aria-hidden', false);
            this.collapsed = false;
        },


        toggle: function() {
            if ( this.collapsed ) {
                this.expand();
            } else {
                this.collapse();
            }
        }
    }

    var navi = new Nav('#nav-toggle');
    navi.init();
})(window, document);

