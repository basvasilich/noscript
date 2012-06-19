// ----------------------------------------------------------------------------------------------------------------- //
// no
// ----------------------------------------------------------------------------------------------------------------- //

var no = {};

// ----------------------------------------------------------------------------------------------------------------- //

no.inherits = function(ctor, base, mixin) {
    var F = function() {};
    F.prototype = base.prototype;
    var proto = ctor.prototype = new F();
    ctor.prototype.constructor = ctor;

    if (mixin) {
        no.extend(proto, mixin);
    }

    return ctor;
};

// ----------------------------------------------------------------------------------------------------------------- //

/**
    @param {!Object} dest
    @param {...!Object} srcs
    @return {!Object}
*/
no.extend = function(dest) {
    var srcs = [].slice.call(arguments, 1);

    for (var i = 0, l = srcs.length; i < l; i++) {
        var src = srcs[i];
        for (var key in src) {
            dest[key] = src[key];
        }
    }

    return dest;
};

// ----------------------------------------------------------------------------------------------------------------- //

/**
    Do not clone functions, only data.
    @param {!Object} dest
    @param {!Object} src
    @return {!Object}
*/
no.extendRecursive = function(dest, src) {
    for (var key in src) {
        var value = src[key];

        if (value instanceof Array) {
            var ar = dest[key] = [];
            for (var j = 0, m = value.length; j < m; j++) {
                var item = value[j];
                ar[j] = (typeof item === 'object') ? no.extendRecursive( {}, item ) : item;
            }

        } else if (typeof value === 'object') {
            dest[key] = no.extendRecursive( {}, value );

        } else {
            dest[key] = value;

        }
    }

    return dest;
};

// ----------------------------------------------------------------------------------------------------------------- //

/**
    Пустая функция. No operation.
*/
no.pe = function() {};

// ----------------------------------------------------------------------------------------------------------------- //

/**
    @param {string} className
    @param {Element} context
    @return {(Element|undefined)}
*/
//  FIXME: Мне не нравится использовать jQuery в noscript'е,
//  со временем я хочу выпилить jQuery совсем.
//  Пока что вот так странно.
if (document.getElementsByClassName) {

    no.byClass = function(className, context) {
        context = context || document;
        return context.getElementsByClassName(className);
    };

} else {

    no.byClass = function(className, context) {
        context = context || document;
        return $(context).find('.' + className);
    };

}

// ----------------------------------------------------------------------------------------------------------------- //

/**
    @param {Element} oldNode
    @param {Element} newNode
*/
no.replaceNode = function(oldNode, newNode) {
    oldNode.parentNode.replaceChild(newNode, oldNode);
};

// ----------------------------------------------------------------------------------------------------------------- //

no.todo = function() {
    throw new Error('Unimplemented');
};

no.html2node = function(html) {
    var div = document.createElement('div');
    div.innerHTML = html;

    return div.firstChild;
};

no.parseQuery = function(s) {
    var o = {};

    s.split('&').forEach(function(s) {
        var p = s.split('=');
        //  FIXME: decode-бла-бла.
        o[ p[0] ] = p[1];
    });

    return o;
};

