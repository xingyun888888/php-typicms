﻿!function () {
    window.CKEDITOR && window.CKEDITOR.dom || (window.CKEDITOR || (window.CKEDITOR = function () {
        var e = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i, t = {
            timestamp: "I3I8",
            version: "4.9.2 (Standard)",
            revision: "95e5d83ee",
            rnd: Math.floor(900 * Math.random()) + 100,
            _: {pending: [], basePathSrcPattern: e},
            status: "unloaded",
            basePath: function () {
                var t = window.CKEDITOR_BASEPATH || "";
                if (!t)for (var n = document.getElementsByTagName("script"), i = 0; i < n.length; i++) {
                    var o = n[i].src.match(e);
                    if (o) {
                        t = o[1];
                        break
                    }
                }
                if (-1 == t.indexOf(":/") && "//" != t.slice(0, 2) && (t = 0 === t.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + t : location.href.match(/^[^\?]*\/(?:)/)[0] + t), !t)throw'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                return t
            }(),
            getUrl: function (e) {
                return -1 == e.indexOf(":/") && 0 !== e.indexOf("/") && (e = this.basePath + e), this.timestamp && "/" != e.charAt(e.length - 1) && !/[&?]t=/.test(e) && (e += (0 <= e.indexOf("?") ? "&" : "?") + "t=" + this.timestamp), e
            },
            domReady: function () {
                function e() {
                    try {
                        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", e, !1), t()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", e), t())
                    } catch (e) {
                    }
                }

                function t() {
                    for (var e; e = n.shift();)e()
                }

                var n = [];
                return function (t) {
                    function i() {
                        try {
                            document.documentElement.doScroll("left")
                        } catch (e) {
                            return void setTimeout(i, 1)
                        }
                        e()
                    }

                    if (n.push(t), "complete" === document.readyState && setTimeout(e, 1), 1 == n.length)if (document.addEventListener) document.addEventListener("DOMContentLoaded", e, !1), window.addEventListener("load", e, !1); else if (document.attachEvent) {
                        document.attachEvent("onreadystatechange", e), window.attachEvent("onload", e), t = !1;
                        try {
                            t = !window.frameElement
                        } catch (e) {
                        }
                        document.documentElement.doScroll && t && i()
                    }
                }
            }()
        }, n = window.CKEDITOR_GETURL;
        if (n) {
            var i = t.getUrl;
            t.getUrl = function (e) {
                return n.call(t, e) || i.call(t, e)
            }
        }
        return t
    }()), CKEDITOR.event || (CKEDITOR.event = function () {
    }, CKEDITOR.event.implementOn = function (e) {
        var t, n = CKEDITOR.event.prototype;
        for (t in n)null == e[t] && (e[t] = n[t])
    }, CKEDITOR.event.prototype = function () {
        function e(e) {
            var i = t(this);
            return i[e] || (i[e] = new n(e))
        }

        var t = function (e) {
            return e = e.getPrivate && e.getPrivate() || e._ || (e._ = {}), e.events || (e.events = {})
        }, n = function (e) {
            this.name = e, this.listeners = []
        };
        return n.prototype = {
            getListenerIndex: function (e) {
                for (var t = 0, n = this.listeners; t < n.length; t++)if (n[t].fn == e)return t;
                return -1
            }
        }, {
            define: function (t, n) {
                var i = e.call(this, t);
                CKEDITOR.tools.extend(i, n, !0)
            }, on: function (t, n, i, o, a) {
                function r(e, a, r, l) {
                    return e = {
                        name: t,
                        sender: this,
                        editor: e,
                        data: a,
                        listenerData: o,
                        stop: r,
                        cancel: l,
                        removeListener: s
                    }, !1 !== n.call(i, e) && e.data
                }

                function s() {
                    c.removeListener(t, n)
                }

                var l = e.call(this, t);
                if (0 > l.getListenerIndex(n)) {
                    l = l.listeners, i || (i = this), isNaN(a) && (a = 10);
                    var c = this;
                    r.fn = n, r.priority = a;
                    for (var d = l.length - 1; 0 <= d; d--)if (l[d].priority <= a)return l.splice(d + 1, 0, r), {removeListener: s};
                    l.unshift(r)
                }
                return {removeListener: s}
            }, once: function () {
                var e = Array.prototype.slice.call(arguments), t = e[1];
                return e[1] = function (e) {
                    return e.removeListener(), t.apply(this, arguments)
                }, this.on.apply(this, e)
            }, capture: function () {
                CKEDITOR.event.useCapture = 1;
                var e = this.on.apply(this, arguments);
                return CKEDITOR.event.useCapture = 0, e
            }, fire: function () {
                var e = 0, n = function () {
                    e = 1
                }, i = 0, o = function () {
                    i = 1
                };
                return function (a, r, s) {
                    var l = t(this)[a];
                    a = e;
                    var c = i;
                    if (e = i = 0, l) {
                        var d = l.listeners;
                        if (d.length)for (var u, d = d.slice(0), h = 0; h < d.length; h++) {
                            if (l.errorProof)try {
                                u = d[h].call(this, s, r, n, o)
                            } catch (e) {
                            } else u = d[h].call(this, s, r, n, o);
                            if (!1 === u ? i = 1 : void 0 !== u && (r = u), e || i)break
                        }
                    }
                    return r = !i && (void 0 === r || r), e = a, i = c, r
                }
            }(), fireOnce: function (e, n, i) {
                return n = this.fire(e, n, i), delete t(this)[e], n
            }, removeListener: function (e, n) {
                var i = t(this)[e];
                if (i) {
                    var o = i.getListenerIndex(n);
                    0 <= o && i.listeners.splice(o, 1)
                }
            }, removeAllListeners: function () {
                var e, n = t(this);
                for (e in n)delete n[e]
            }, hasListeners: function (e) {
                return (e = t(this)[e]) && 0 < e.listeners.length
            }
        }
    }()), CKEDITOR.editor || (CKEDITOR.editor = function () {
        CKEDITOR._.pending.push([this, arguments]), CKEDITOR.event.call(this)
    }, CKEDITOR.editor.prototype.fire = function (e, t) {
        return e in {
            instanceReady: 1,
            loaded: 1
        } && (this[e] = !0), CKEDITOR.event.prototype.fire.call(this, e, t, this)
    }, CKEDITOR.editor.prototype.fireOnce = function (e, t) {
        return e in {
            instanceReady: 1,
            loaded: 1
        } && (this[e] = !0), CKEDITOR.event.prototype.fireOnce.call(this, e, t, this)
    }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env || (CKEDITOR.env = function () {
        var e = navigator.userAgent.toLowerCase(), t = e.match(/edge[ \/](\d+.?\d*)/), n = -1 < e.indexOf("trident/"),
            n = !(!t && !n), n = {
                ie: n,
                edge: !!t,
                webkit: !n && -1 < e.indexOf(" applewebkit/"),
                air: -1 < e.indexOf(" adobeair/"),
                mac: -1 < e.indexOf("macintosh"),
                quirks: "BackCompat" == document.compatMode && (!document.documentMode || 10 > document.documentMode),
                mobile: -1 < e.indexOf("mobile"),
                iOS: /(ipad|iphone|ipod)/.test(e),
                isCustomDomain: function () {
                    if (!this.ie)return !1;
                    var e = document.domain, t = window.location.hostname;
                    return e != t && e != "[" + t + "]"
                },
                secure: "https:" == location.protocol
            };
        n.gecko = "Gecko" == navigator.product && !n.webkit && !n.ie, n.webkit && (-1 < e.indexOf("chrome") ? n.chrome = !0 : n.safari = !0);
        var i = 0;
        return n.ie && (i = t ? parseFloat(t[1]) : n.quirks || !document.documentMode ? parseFloat(e.match(/msie (\d+)/)[1]) : document.documentMode, n.ie9Compat = 9 == i, n.ie8Compat = 8 == i, n.ie7Compat = 7 == i, n.ie6Compat = 7 > i || n.quirks), n.gecko && (t = e.match(/rv:([\d\.]+)/)) && (t = t[1].split("."), i = 1e4 * t[0] + 100 * (t[1] || 0) + 1 * (t[2] || 0)), n.air && (i = parseFloat(e.match(/ adobeair\/(\d+)/)[1])), n.webkit && (i = parseFloat(e.match(/ applewebkit\/(\d+)/)[1])), n.version = i, n.isCompatible = !(n.ie && 7 > i || n.gecko && 4e4 > i || n.webkit && 534 > i), n.hidpi = 2 <= window.devicePixelRatio, n.needsBrFiller = n.gecko || n.webkit || n.ie && 10 < i, n.needsNbspFiller = n.ie && 11 > i, n.cssClass = "cke_browser_" + (n.ie ? "ie" : n.gecko ? "gecko" : n.webkit ? "webkit" : "unknown"), n.quirks && (n.cssClass += " cke_browser_quirks"), n.ie && (n.cssClass += " cke_browser_ie" + (n.quirks ? "6 cke_browser_iequirks" : n.version)), n.air && (n.cssClass += " cke_browser_air"), n.iOS && (n.cssClass += " cke_browser_ios"), n.hidpi && (n.cssClass += " cke_hidpi"), n
    }()), "unloaded" == CKEDITOR.status && function () {
        CKEDITOR.event.implementOn(CKEDITOR), CKEDITOR.loadFullCore = function () {
            if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1; else {
                delete CKEDITOR.loadFullCore;
                var e = document.createElement("script");
                e.type = "text/javascript", e.src = CKEDITOR.basePath + "ckeditor.js", document.getElementsByTagName("head")[0].appendChild(e)
            }
        }, CKEDITOR.loadFullCoreTimeout = 0, CKEDITOR.add = function (e) {
            (this._.pending || (this._.pending = [])).push(e)
        }, function () {
            CKEDITOR.domReady(function () {
                var e = CKEDITOR.loadFullCore, t = CKEDITOR.loadFullCoreTimeout;
                e && (CKEDITOR.status = "basic_ready", e && e._load ? e() : t && setTimeout(function () {
                        CKEDITOR.loadFullCore && CKEDITOR.loadFullCore()
                    }, 1e3 * t))
            })
        }(), CKEDITOR.status = "basic_loaded"
    }(), CKEDITOR.VERBOSITY_WARN = 1, CKEDITOR.VERBOSITY_ERROR = 2, CKEDITOR.verbosity = CKEDITOR.VERBOSITY_WARN | CKEDITOR.VERBOSITY_ERROR, CKEDITOR.warn = function (e, t) {
        CKEDITOR.verbosity & CKEDITOR.VERBOSITY_WARN && CKEDITOR.fire("log", {
            type: "warn",
            errorCode: e,
            additionalData: t
        })
    }, CKEDITOR.error = function (e, t) {
        CKEDITOR.verbosity & CKEDITOR.VERBOSITY_ERROR && CKEDITOR.fire("log", {
            type: "error",
            errorCode: e,
            additionalData: t
        })
    }, CKEDITOR.on("log", function (e) {
        if (window.console && window.console.log) {
            var t = console[e.data.type] ? e.data.type : "log", n = e.data.errorCode;
            (e = e.data.additionalData) ? console[t]("[CKEDITOR] Error code: " + n + ".", e) : console[t]("[CKEDITOR] Error code: " + n + "."), console[t]("[CKEDITOR] For more information about this error go to https://docs.ckeditor.com/ckeditor4/docs/#!/guide/dev_errors-section-" + n)
        }
    }, null, null, 999), CKEDITOR.dom = {}, function () {
        var e = [], t = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "",
            n = /&/g, i = />/g, o = /</g, a = /"/g, r = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g,
            s = {lt: "<", gt: ">", amp: "&", quot: '"', nbsp: " ", shy: "­"}, l = function (e, t) {
                return "#" == t[0] ? String.fromCharCode(parseInt(t.slice(1), 10)) : s[t]
            };
        CKEDITOR.on("reset", function () {
            e = []
        }), CKEDITOR.tools = {
            arrayCompare: function (e, t) {
                if (!e && !t)return !0;
                if (!e || !t || e.length != t.length)return !1;
                for (var n = 0; n < e.length; n++)if (e[n] != t[n])return !1;
                return !0
            },
            getIndex: function (e, t) {
                for (var n = 0; n < e.length; ++n)if (t(e[n]))return n;
                return -1
            },
            clone: function (e) {
                var t;
                if (e && e instanceof Array) {
                    t = [];
                    for (var n = 0; n < e.length; n++)t[n] = CKEDITOR.tools.clone(e[n]);
                    return t
                }
                if (null === e || "object" != typeof e || e instanceof String || e instanceof Number || e instanceof Boolean || e instanceof Date || e instanceof RegExp || e.nodeType || e.window === e)return e;
                t = new e.constructor;
                for (n in e)t[n] = CKEDITOR.tools.clone(e[n]);
                return t
            },
            capitalize: function (e, t) {
                return e.charAt(0).toUpperCase() + (t ? e.slice(1) : e.slice(1).toLowerCase())
            },
            extend: function (e) {
                var t, n, i = arguments.length;
                "boolean" == typeof(t = arguments[i - 1]) ? i-- : "boolean" == typeof(t = arguments[i - 2]) && (n = arguments[i - 1], i -= 2);
                for (var o = 1; o < i; o++) {
                    var a, r = arguments[o];
                    for (a in r)!0 !== t && null != e[a] || (!n || a in n) && (e[a] = r[a])
                }
                return e
            },
            prototypedCopy: function (e) {
                var t = function () {
                };
                return t.prototype = e, new t
            },
            copy: function (e) {
                var t, n = {};
                for (t in e)n[t] = e[t];
                return n
            },
            isArray: function (e) {
                return "[object Array]" == Object.prototype.toString.call(e)
            },
            isEmpty: function (e) {
                for (var t in e)if (e.hasOwnProperty(t))return !1;
                return !0
            },
            cssVendorPrefix: function (e, n, i) {
                return i ? t + e + ":" + n + ";" + e + ":" + n : (i = {}, i[e] = n, i[t + e] = n, i)
            },
            cssStyleToDomStyle: function () {
                var e = document.createElement("div").style,
                    t = void 0 !== e.cssFloat ? "cssFloat" : void 0 !== e.styleFloat ? "styleFloat" : "float";
                return function (e) {
                    return "float" == e ? t : e.replace(/-./g, function (e) {
                        return e.substr(1).toUpperCase()
                    })
                }
            }(),
            buildStyleHtml: function (e) {
                e = [].concat(e);
                for (var t, n = [], i = 0; i < e.length; i++)(t = e[i]) && (/@import|[{}]/.test(t) ? n.push("<style>" + t + "</style>") : n.push('<link type="text/css" rel=stylesheet href="' + t + '">'));
                return n.join("")
            },
            htmlEncode: function (e) {
                return void 0 === e || null === e ? "" : String(e).replace(n, "&amp;").replace(i, "&gt;").replace(o, "&lt;")
            },
            htmlDecode: function (e) {
                return e.replace(r, l)
            },
            htmlEncodeAttr: function (e) {
                return CKEDITOR.tools.htmlEncode(e).replace(a, "&quot;")
            },
            htmlDecodeAttr: function (e) {
                return CKEDITOR.tools.htmlDecode(e)
            },
            transformPlainTextToHtml: function (e, t) {
                var n = t == CKEDITOR.ENTER_BR, i = this.htmlEncode(e.replace(/\r\n/g, "\n")),
                    i = i.replace(/\t/g, "&nbsp;&nbsp; &nbsp;"), o = t == CKEDITOR.ENTER_P ? "p" : "div";
                if (!n) {
                    var a = /\n{2}/g;
                    if (a.test(i))var r = "<" + o + ">", s = "</" + o + ">", i = r + i.replace(a, function () {
                            return s + r
                        }) + s
                }
                return i = i.replace(/\n/g, "<br>"), n || (i = i.replace(new RegExp("<br>(?=</" + o + ">)"), function (e) {
                    return CKEDITOR.tools.repeat(e, 2)
                })), i = i.replace(/^ | $/g, "&nbsp;"), i = i.replace(/(>|\s) /g, function (e, t) {
                    return t + "&nbsp;"
                }).replace(/ (?=<)/g, "&nbsp;")
            },
            getNextNumber: function () {
                var e = 0;
                return function () {
                    return ++e
                }
            }(),
            getNextId: function () {
                return "cke_" + this.getNextNumber()
            },
            getUniqueId: function () {
                for (var e = "e", t = 0; 8 > t; t++)e += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
                return e
            },
            override: function (e, t) {
                var n = t(e);
                return n.prototype = e.prototype, n
            },
            setTimeout: function (e, t, n, i, o) {
                return o || (o = window), n || (n = o), o.setTimeout(function () {
                    i ? e.apply(n, [].concat(i)) : e.apply(n)
                }, t || 0)
            },
            trim: function () {
                var e = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
                return function (t) {
                    return t.replace(e, "")
                }
            }(),
            ltrim: function () {
                var e = /^[ \t\n\r]+/g;
                return function (t) {
                    return t.replace(e, "")
                }
            }(),
            rtrim: function () {
                var e = /[ \t\n\r]+$/g;
                return function (t) {
                    return t.replace(e, "")
                }
            }(),
            indexOf: function (e, t) {
                if ("function" == typeof t) {
                    for (var n = 0, i = e.length; n < i; n++)if (t(e[n]))return n
                } else {
                    if (e.indexOf)return e.indexOf(t);
                    for (n = 0, i = e.length; n < i; n++)if (e[n] === t)return n
                }
                return -1
            },
            search: function (e, t) {
                var n = CKEDITOR.tools.indexOf(e, t);
                return 0 <= n ? e[n] : null
            },
            bind: function (e, t) {
                return function () {
                    return e.apply(t, arguments)
                }
            },
            createClass: function (e) {
                var t = e.$, n = e.base, i = e.privates || e._, o = e.proto;
                if (e = e.statics, !t && (t = function () {
                        n && this.base.apply(this, arguments)
                    }), i)var a = t, t = function () {
                    var e, t = this._ || (this._ = {});
                    for (e in i) {
                        var n = i[e];
                        t[e] = "function" == typeof n ? CKEDITOR.tools.bind(n, this) : n
                    }
                    a.apply(this, arguments)
                };
                return n && (t.prototype = this.prototypedCopy(n.prototype), t.prototype.constructor = t, t.base = n, t.baseProto = n.prototype, t.prototype.base = function () {
                    this.base = n.prototype.base, n.apply(this, arguments), this.base = arguments.callee
                }), o && this.extend(t.prototype, o, !0), e && this.extend(t, e, !0), t
            },
            addFunction: function (t, n) {
                return e.push(function () {
                        return t.apply(n || this, arguments)
                    }) - 1
            },
            removeFunction: function (t) {
                e[t] = null
            },
            callFunction: function (t) {
                var n = e[t];
                return n && n.apply(window, Array.prototype.slice.call(arguments, 1))
            },
            cssLength: function () {
                var e, t = /^-?\d+\.?\d*px$/;
                return function (n) {
                    return e = CKEDITOR.tools.trim(n + "") + "px", t.test(e) ? e : n || ""
                }
            }(),
            convertToPx: function () {
                var e;
                return function (t) {
                    return e || (e = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>', CKEDITOR.document), CKEDITOR.document.getBody().append(e)), /%$/.test(t) ? t : (e.setStyle("width", t), e.$.clientWidth)
                }
            }(),
            repeat: function (e, t) {
                return Array(t + 1).join(e)
            },
            tryThese: function () {
                for (var e, t = 0, n = arguments.length; t < n; t++) {
                    var i = arguments[t];
                    try {
                        e = i();
                        break
                    } catch (e) {
                    }
                }
                return e
            },
            genKey: function () {
                return Array.prototype.slice.call(arguments).join("-")
            },
            defer: function (e) {
                return function () {
                    var t = arguments, n = this;
                    window.setTimeout(function () {
                        e.apply(n, t)
                    }, 0)
                }
            },
            normalizeCssText: function (e, t) {
                var n, i = [], o = CKEDITOR.tools.parseCssText(e, !0, t);
                for (n in o)i.push(n + ":" + o[n]);
                return i.sort(), i.length ? i.join(";") + ";" : ""
            },
            convertRgbToHex: function (e) {
                return e.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function (e, t, n, i) {
                    for (e = [t, n, i], t = 0; 3 > t; t++)e[t] = ("0" + parseInt(e[t], 10).toString(16)).slice(-2);
                    return "#" + e.join("")
                })
            },
            normalizeHex: function (e) {
                return e.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi, function (e, t, n, i) {
                    return e = t.toLowerCase(), 3 == e.length && (e = e.split(""), e = [e[0], e[0], e[1], e[1], e[2], e[2]].join("")), "#" + e + i
                })
            },
            parseCssText: function (e, t, n) {
                var i = {};
                return n && (e = new CKEDITOR.dom.element("span").setAttribute("style", e).getAttribute("style") || ""), e && (e = CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(e))), e && ";" != e ? (e.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (e, n, o) {
                    t && (n = n.toLowerCase(), "font-family" == n && (o = o.replace(/\s*,\s*/g, ",")), o = CKEDITOR.tools.trim(o)), i[n] = o
                }), i) : i
            },
            writeCssText: function (e, t) {
                var n, i = [];
                for (n in e)i.push(n + ":" + e[n]);
                return t && i.sort(), i.join("; ")
            },
            objectCompare: function (e, t, n) {
                var i;
                if (!e && !t)return !0;
                if (!e || !t)return !1;
                for (i in e)if (e[i] != t[i])return !1;
                if (!n)for (i in t)if (e[i] != t[i])return !1;
                return !0
            },
            objectKeys: function (e) {
                var t, n = [];
                for (t in e)n.push(t);
                return n
            },
            convertArrayToObject: function (e, t) {
                var n = {};
                1 == arguments.length && (t = !0);
                for (var i = 0, o = e.length; i < o; ++i)n[e[i]] = t;
                return n
            },
            fixDomain: function () {
                for (var e; ;)try {
                    e = window.parent.document.domain;
                    break
                } catch (t) {
                    if (!(e = e ? e.replace(/.+?(?:\.|$)/, "") : document.domain))break;
                    document.domain = e
                }
                return !!e
            },
            eventsBuffer: function (e, t, n) {
                function i() {
                    a = (new Date).getTime(), o = !1, n ? t.call(n) : t()
                }

                var o, a = 0;
                return {
                    input: function () {
                        if (!o) {
                            var t = (new Date).getTime() - a;
                            t < e ? o = setTimeout(i, e - t) : i()
                        }
                    }, reset: function () {
                        o && clearTimeout(o), o = a = 0
                    }
                }
            },
            enableHtml5Elements: function (e, t) {
                for (var n, i = "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "), o = i.length; o--;)n = e.createElement(i[o]), t && e.appendChild(n)
            },
            checkIfAnyArrayItemMatches: function (e, t) {
                for (var n = 0, i = e.length; n < i; ++n)if (e[n].match(t))return !0;
                return !1
            },
            checkIfAnyObjectPropertyMatches: function (e, t) {
                for (var n in e)if (n.match(t))return !0;
                return !1
            },
            keystrokeToString: function (e, t) {
                var n = this.keystrokeToArray(e, t);
                return n.display = n.display.join("+"), n.aria = n.aria.join("+"), n
            },
            keystrokeToArray: function (e, t) {
                var n = 16711680 & t, i = 65535 & t, o = CKEDITOR.env.mac, a = [], r = [];
                return n & CKEDITOR.CTRL && (a.push(o ? "⌘" : e[17]), r.push(o ? e[224] : e[17])), n & CKEDITOR.ALT && (a.push(o ? "⌥" : e[18]), r.push(e[18])), n & CKEDITOR.SHIFT && (a.push(o ? "⇧" : e[16]), r.push(e[16])), i && (e[i] ? (a.push(e[i]), r.push(e[i])) : (a.push(String.fromCharCode(i)), r.push(String.fromCharCode(i)))), {
                    display: a,
                    aria: r
                }
            },
            transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==",
            getCookie: function (e) {
                e = e.toLowerCase();
                for (var t, n = document.cookie.split(";"), i = 0; i < n.length; i++)if (t = n[i].split("="), decodeURIComponent(CKEDITOR.tools.trim(t[0]).toLowerCase()) === e)return decodeURIComponent(1 < t.length ? t[1] : "");
                return null
            },
            setCookie: function (e, t) {
                document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + ";path=/"
            },
            getCsrfToken: function () {
                var e = CKEDITOR.tools.getCookie("ckCsrfToken");
                if (!e || 40 != e.length) {
                    var e = [], t = "";
                    if (window.crypto && window.crypto.getRandomValues) e = new Uint8Array(40), window.crypto.getRandomValues(e); else for (var n = 0; 40 > n; n++)e.push(Math.floor(256 * Math.random()));
                    for (n = 0; n < e.length; n++)var i = "abcdefghijklmnopqrstuvwxyz0123456789".charAt(e[n] % 36), t = t + (.5 < Math.random() ? i.toUpperCase() : i);
                    e = t, CKEDITOR.tools.setCookie("ckCsrfToken", e)
                }
                return e
            },
            escapeCss: function (e) {
                return e ? window.CSS && CSS.escape ? CSS.escape(e) : isNaN(parseInt(e.charAt(0), 10)) ? e : "\\3" + e.charAt(0) + " " + e.substring(1, e.length) : ""
            },
            getMouseButton: function (e) {
                var t = (e = e.data) && e.$;
                return !(!e || !t) && (CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? 4 === t.button ? CKEDITOR.MOUSE_BUTTON_MIDDLE : 1 === t.button ? CKEDITOR.MOUSE_BUTTON_LEFT : CKEDITOR.MOUSE_BUTTON_RIGHT : t.button)
            },
            convertHexStringToBytes: function (e) {
                var t, n = [], i = e.length / 2;
                for (t = 0; t < i; t++)n.push(parseInt(e.substr(2 * t, 2), 16));
                return n
            },
            convertBytesToBase64: function (e) {
                var t, n = "", i = e.length;
                for (t = 0; t < i; t += 3) {
                    var o, a = e.slice(t, t + 3), r = a.length, s = [];
                    if (3 > r)for (o = r; 3 > o; o++)a[o] = 0;
                    for (s[0] = (252 & a[0]) >> 2, s[1] = (3 & a[0]) << 4 | a[1] >> 4, s[2] = (15 & a[1]) << 2 | (192 & a[2]) >> 6, s[3] = 63 & a[2], o = 0; 4 > o; o++)n = o <= r ? n + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(s[o]) : n + "="
                }
                return n
            },
            style: {
                parse: {
                    _colors: {
                        aliceblue: "#F0F8FF",
                        antiquewhite: "#FAEBD7",
                        aqua: "#00FFFF",
                        aquamarine: "#7FFFD4",
                        azure: "#F0FFFF",
                        beige: "#F5F5DC",
                        bisque: "#FFE4C4",
                        black: "#000000",
                        blanchedalmond: "#FFEBCD",
                        blue: "#0000FF",
                        blueviolet: "#8A2BE2",
                        brown: "#A52A2A",
                        burlywood: "#DEB887",
                        cadetblue: "#5F9EA0",
                        chartreuse: "#7FFF00",
                        chocolate: "#D2691E",
                        coral: "#FF7F50",
                        cornflowerblue: "#6495ED",
                        cornsilk: "#FFF8DC",
                        crimson: "#DC143C",
                        cyan: "#00FFFF",
                        darkblue: "#00008B",
                        darkcyan: "#008B8B",
                        darkgoldenrod: "#B8860B",
                        darkgray: "#A9A9A9",
                        darkgreen: "#006400",
                        darkgrey: "#A9A9A9",
                        darkkhaki: "#BDB76B",
                        darkmagenta: "#8B008B",
                        darkolivegreen: "#556B2F",
                        darkorange: "#FF8C00",
                        darkorchid: "#9932CC",
                        darkred: "#8B0000",
                        darksalmon: "#E9967A",
                        darkseagreen: "#8FBC8F",
                        darkslateblue: "#483D8B",
                        darkslategray: "#2F4F4F",
                        darkslategrey: "#2F4F4F",
                        darkturquoise: "#00CED1",
                        darkviolet: "#9400D3",
                        deeppink: "#FF1493",
                        deepskyblue: "#00BFFF",
                        dimgray: "#696969",
                        dimgrey: "#696969",
                        dodgerblue: "#1E90FF",
                        firebrick: "#B22222",
                        floralwhite: "#FFFAF0",
                        forestgreen: "#228B22",
                        fuchsia: "#FF00FF",
                        gainsboro: "#DCDCDC",
                        ghostwhite: "#F8F8FF",
                        gold: "#FFD700",
                        goldenrod: "#DAA520",
                        gray: "#808080",
                        green: "#008000",
                        greenyellow: "#ADFF2F",
                        grey: "#808080",
                        honeydew: "#F0FFF0",
                        hotpink: "#FF69B4",
                        indianred: "#CD5C5C",
                        indigo: "#4B0082",
                        ivory: "#FFFFF0",
                        khaki: "#F0E68C",
                        lavender: "#E6E6FA",
                        lavenderblush: "#FFF0F5",
                        lawngreen: "#7CFC00",
                        lemonchiffon: "#FFFACD",
                        lightblue: "#ADD8E6",
                        lightcoral: "#F08080",
                        lightcyan: "#E0FFFF",
                        lightgoldenrodyellow: "#FAFAD2",
                        lightgray: "#D3D3D3",
                        lightgreen: "#90EE90",
                        lightgrey: "#D3D3D3",
                        lightpink: "#FFB6C1",
                        lightsalmon: "#FFA07A",
                        lightseagreen: "#20B2AA",
                        lightskyblue: "#87CEFA",
                        lightslategray: "#778899",
                        lightslategrey: "#778899",
                        lightsteelblue: "#B0C4DE",
                        lightyellow: "#FFFFE0",
                        lime: "#00FF00",
                        limegreen: "#32CD32",
                        linen: "#FAF0E6",
                        magenta: "#FF00FF",
                        maroon: "#800000",
                        mediumaquamarine: "#66CDAA",
                        mediumblue: "#0000CD",
                        mediumorchid: "#BA55D3",
                        mediumpurple: "#9370DB",
                        mediumseagreen: "#3CB371",
                        mediumslateblue: "#7B68EE",
                        mediumspringgreen: "#00FA9A",
                        mediumturquoise: "#48D1CC",
                        mediumvioletred: "#C71585",
                        midnightblue: "#191970",
                        mintcream: "#F5FFFA",
                        mistyrose: "#FFE4E1",
                        moccasin: "#FFE4B5",
                        navajowhite: "#FFDEAD",
                        navy: "#000080",
                        oldlace: "#FDF5E6",
                        olive: "#808000",
                        olivedrab: "#6B8E23",
                        orange: "#FFA500",
                        orangered: "#FF4500",
                        orchid: "#DA70D6",
                        palegoldenrod: "#EEE8AA",
                        palegreen: "#98FB98",
                        paleturquoise: "#AFEEEE",
                        palevioletred: "#DB7093",
                        papayawhip: "#FFEFD5",
                        peachpuff: "#FFDAB9",
                        peru: "#CD853F",
                        pink: "#FFC0CB",
                        plum: "#DDA0DD",
                        powderblue: "#B0E0E6",
                        purple: "#800080",
                        rebeccapurple: "#663399",
                        red: "#FF0000",
                        rosybrown: "#BC8F8F",
                        royalblue: "#4169E1",
                        saddlebrown: "#8B4513",
                        salmon: "#FA8072",
                        sandybrown: "#F4A460",
                        seagreen: "#2E8B57",
                        seashell: "#FFF5EE",
                        sienna: "#A0522D",
                        silver: "#C0C0C0",
                        skyblue: "#87CEEB",
                        slateblue: "#6A5ACD",
                        slategray: "#708090",
                        slategrey: "#708090",
                        snow: "#FFFAFA",
                        springgreen: "#00FF7F",
                        steelblue: "#4682B4",
                        tan: "#D2B48C",
                        teal: "#008080",
                        thistle: "#D8BFD8",
                        tomato: "#FF6347",
                        turquoise: "#40E0D0",
                        violet: "#EE82EE",
                        wheat: "#F5DEB3",
                        white: "#FFFFFF",
                        whitesmoke: "#F5F5F5",
                        yellow: "#FFFF00",
                        yellowgreen: "#9ACD32"
                    },
                    _borderStyle: "none hidden dotted dashed solid double groove ridge inset outset".split(" "),
                    _widthRegExp: /^(thin|medium|thick|[\+-]?\d+(\.\d+)?[a-z%]+|[\+-]?0+(\.0+)?|\.\d+[a-z%]+)$/,
                    _rgbaRegExp: /rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi,
                    _hslaRegExp: /hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi,
                    background: function (e) {
                        var t = {}, n = this._findColor(e);
                        return n.length && (t.color = n[0], CKEDITOR.tools.array.forEach(n, function (t) {
                            e = e.replace(t, "")
                        })), (e = CKEDITOR.tools.trim(e)) && (t.unprocessed = e), t
                    },
                    margin: function (e) {
                        function t(e) {
                            n.top = i[e[0]], n.right = i[e[1]], n.bottom = i[e[2]], n.left = i[e[3]]
                        }

                        var n = {}, i = e.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset)/g) || ["0px"];
                        switch (i.length) {
                            case 1:
                                t([0, 0, 0, 0]);
                                break;
                            case 2:
                                t([0, 1, 0, 1]);
                                break;
                            case 3:
                                t([0, 1, 2, 1]);
                                break;
                            case 4:
                                t([0, 1, 2, 3])
                        }
                        return n
                    },
                    border: function (e) {
                        var t = {}, n = e.split(/\s+/g);
                        return e = CKEDITOR.tools.style.parse._findColor(e), e.length && (t.color = e[0]), CKEDITOR.tools.array.forEach(n, function (e) {
                            t.style || -1 === CKEDITOR.tools.indexOf(CKEDITOR.tools.style.parse._borderStyle, e) ? !t.width && CKEDITOR.tools.style.parse._widthRegExp.test(e) && (t.width = e) : t.style = e
                        }), t
                    },
                    _findColor: function (e) {
                        var t = [], n = CKEDITOR.tools.array, t = t.concat(e.match(this._rgbaRegExp) || []),
                            t = t.concat(e.match(this._hslaRegExp) || []);
                        return t = t.concat(n.filter(e.split(/\s+/), function (e) {
                            return !!e.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi) || e.toLowerCase() in CKEDITOR.tools.style.parse._colors
                        }))
                    }
                }
            },
            array: {
                filter: function (e, t, n) {
                    var i = [];
                    return this.forEach(e, function (o, a) {
                        t.call(n, o, a, e) && i.push(o)
                    }), i
                }, forEach: function (e, t, n) {
                    var i, o = e.length;
                    for (i = 0; i < o; i++)t.call(n, e[i], i, e)
                }, map: function (e, t, n) {
                    for (var i = [], o = 0; o < e.length; o++)i.push(t.call(n, e[o], o, e));
                    return i
                }, reduce: function (e, t, n, i) {
                    for (var o = 0; o < e.length; o++)n = t.call(i, n, e[o], o, e);
                    return n
                }, every: function (e, t, n) {
                    return !e.length || (t = this.filter(e, t, n), e.length === t.length)
                }
            },
            object: {
                findKey: function (e, t) {
                    if ("object" != typeof e)return null;
                    for (var n in e)if (e[n] === t)return n;
                    return null
                }, merge: function (e, t) {
                    var n = CKEDITOR.tools, i = n.clone(e), o = n.clone(t);
                    return n.array.forEach(n.objectKeys(o), function (e) {
                        i[e] = "object" == typeof o[e] && "object" == typeof i[e] ? n.object.merge(i[e], o[e]) : o[e]
                    }), i
                }
            }
        }, CKEDITOR.tools.array.indexOf = CKEDITOR.tools.indexOf, CKEDITOR.tools.array.isArray = CKEDITOR.tools.isArray, CKEDITOR.MOUSE_BUTTON_LEFT = 0, CKEDITOR.MOUSE_BUTTON_MIDDLE = 1, CKEDITOR.MOUSE_BUTTON_RIGHT = 2
    }(), CKEDITOR.dtd = function () {
        var e = CKEDITOR.tools.extend, t = function (e, t) {
                for (var n = CKEDITOR.tools.clone(e), i = 1; i < arguments.length; i++) {
                    t = arguments[i];
                    for (var o in t)delete n[o]
                }
                return n
            }, n = {}, i = {}, o = {
                address: 1,
                article: 1,
                aside: 1,
                blockquote: 1,
                details: 1,
                div: 1,
                dl: 1,
                fieldset: 1,
                figure: 1,
                footer: 1,
                form: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                header: 1,
                hgroup: 1,
                hr: 1,
                main: 1,
                menu: 1,
                nav: 1,
                ol: 1,
                p: 1,
                pre: 1,
                section: 1,
                table: 1,
                ul: 1
            }, a = {command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1}, r = {}, s = {"#": 1},
            l = {center: 1, dir: 1, noframes: 1};
        return e(n, {
            a: 1,
            abbr: 1,
            area: 1,
            audio: 1,
            b: 1,
            bdi: 1,
            bdo: 1,
            br: 1,
            button: 1,
            canvas: 1,
            cite: 1,
            code: 1,
            command: 1,
            datalist: 1,
            del: 1,
            dfn: 1,
            em: 1,
            embed: 1,
            i: 1,
            iframe: 1,
            img: 1,
            input: 1,
            ins: 1,
            kbd: 1,
            keygen: 1,
            label: 1,
            map: 1,
            mark: 1,
            meter: 1,
            noscript: 1,
            object: 1,
            output: 1,
            progress: 1,
            q: 1,
            ruby: 1,
            s: 1,
            samp: 1,
            script: 1,
            select: 1,
            small: 1,
            span: 1,
            strong: 1,
            sub: 1,
            sup: 1,
            textarea: 1,
            time: 1,
            u: 1,
            var: 1,
            video: 1,
            wbr: 1
        }, s, {
            acronym: 1,
            applet: 1,
            basefont: 1,
            big: 1,
            font: 1,
            isindex: 1,
            strike: 1,
            style: 1,
            tt: 1
        }), e(i, o, n, l), t = {
            a: t(n, {a: 1, button: 1}),
            abbr: n,
            address: i,
            area: r,
            article: i,
            aside: i,
            audio: e({source: 1, track: 1}, i),
            b: n,
            base: r,
            bdi: n,
            bdo: n,
            blockquote: i,
            body: i,
            br: r,
            button: t(n, {a: 1, button: 1}),
            canvas: n,
            caption: i,
            cite: n,
            code: n,
            col: r,
            colgroup: {col: 1},
            command: r,
            datalist: e({option: 1}, n),
            dd: i,
            del: n,
            details: e({summary: 1}, i),
            dfn: n,
            div: i,
            dl: {dt: 1, dd: 1},
            dt: i,
            em: n,
            embed: r,
            fieldset: e({legend: 1}, i),
            figcaption: i,
            figure: e({figcaption: 1}, i),
            footer: i,
            form: i,
            h1: n,
            h2: n,
            h3: n,
            h4: n,
            h5: n,
            h6: n,
            head: e({title: 1, base: 1}, a),
            header: i,
            hgroup: {h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1},
            hr: r,
            html: e({head: 1, body: 1}, i, a),
            i: n,
            iframe: s,
            img: r,
            input: r,
            ins: n,
            kbd: n,
            keygen: r,
            label: n,
            legend: n,
            li: i,
            link: r,
            main: i,
            map: i,
            mark: n,
            menu: e({li: 1}, i),
            meta: r,
            meter: t(n, {meter: 1}),
            nav: i,
            noscript: e({link: 1, meta: 1, style: 1}, n),
            object: e({param: 1}, n),
            ol: {li: 1},
            optgroup: {option: 1},
            option: s,
            output: n,
            p: n,
            param: r,
            pre: n,
            progress: t(n, {progress: 1}),
            q: n,
            rp: n,
            rt: n,
            ruby: e({rp: 1, rt: 1}, n),
            s: n,
            samp: n,
            script: s,
            section: i,
            select: {optgroup: 1, option: 1},
            small: n,
            source: r,
            span: n,
            strong: n,
            style: s,
            sub: n,
            summary: e({h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1}, n),
            sup: n,
            table: {caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1},
            tbody: {tr: 1},
            td: i,
            textarea: s,
            tfoot: {tr: 1},
            th: i,
            thead: {tr: 1},
            time: t(n, {time: 1}),
            title: s,
            tr: {th: 1, td: 1},
            track: r,
            u: n,
            ul: {li: 1},
            var: n,
            video: e({source: 1, track: 1}, i),
            wbr: r,
            acronym: n,
            applet: e({param: 1}, i),
            basefont: r,
            big: n,
            center: i,
            dialog: r,
            dir: {li: 1},
            font: n,
            isindex: r,
            noframes: i,
            strike: n,
            tt: n
        }, e(t, {
            $block: e({audio: 1, dd: 1, dt: 1, figcaption: 1, li: 1, video: 1}, o, l),
            $blockLimit: {
                article: 1,
                aside: 1,
                audio: 1,
                body: 1,
                caption: 1,
                details: 1,
                dir: 1,
                div: 1,
                dl: 1,
                fieldset: 1,
                figcaption: 1,
                figure: 1,
                footer: 1,
                form: 1,
                header: 1,
                hgroup: 1,
                main: 1,
                menu: 1,
                nav: 1,
                ol: 1,
                section: 1,
                table: 1,
                td: 1,
                th: 1,
                tr: 1,
                ul: 1,
                video: 1
            },
            $cdata: {script: 1, style: 1},
            $editable: {
                address: 1,
                article: 1,
                aside: 1,
                blockquote: 1,
                body: 1,
                details: 1,
                div: 1,
                fieldset: 1,
                figcaption: 1,
                footer: 1,
                form: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                header: 1,
                hgroup: 1,
                main: 1,
                nav: 1,
                p: 1,
                pre: 1,
                section: 1
            },
            $empty: {
                area: 1,
                base: 1,
                basefont: 1,
                br: 1,
                col: 1,
                command: 1,
                dialog: 1,
                embed: 1,
                hr: 1,
                img: 1,
                input: 1,
                isindex: 1,
                keygen: 1,
                link: 1,
                meta: 1,
                param: 1,
                source: 1,
                track: 1,
                wbr: 1
            },
            $inline: n,
            $list: {dl: 1, ol: 1, ul: 1},
            $listItem: {dd: 1, dt: 1, li: 1},
            $nonBodyContent: e({body: 1, head: 1, html: 1}, t.head),
            $nonEditable: {
                applet: 1,
                audio: 1,
                button: 1,
                embed: 1,
                iframe: 1,
                map: 1,
                object: 1,
                option: 1,
                param: 1,
                script: 1,
                textarea: 1,
                video: 1
            },
            $object: {
                applet: 1,
                audio: 1,
                button: 1,
                hr: 1,
                iframe: 1,
                img: 1,
                input: 1,
                object: 1,
                select: 1,
                table: 1,
                textarea: 1,
                video: 1
            },
            $removeEmpty: {
                abbr: 1,
                acronym: 1,
                b: 1,
                bdi: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                mark: 1,
                meter: 1,
                output: 1,
                q: 1,
                ruby: 1,
                s: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                time: 1,
                tt: 1,
                u: 1,
                var: 1
            },
            $tabIndex: {a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1},
            $tableContent: {caption: 1, col: 1, colgroup: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1},
            $transparent: {a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1},
            $intermediate: {
                caption: 1,
                colgroup: 1,
                dd: 1,
                dt: 1,
                figcaption: 1,
                legend: 1,
                li: 1,
                optgroup: 1,
                option: 1,
                rp: 1,
                rt: 1,
                summary: 1,
                tbody: 1,
                td: 1,
                tfoot: 1,
                th: 1,
                thead: 1,
                tr: 1
            }
        }), t
    }(), CKEDITOR.dom.event = function (e) {
        this.$ = e
    }, CKEDITOR.dom.event.prototype = {
        getKey: function () {
            return this.$.keyCode || this.$.which
        }, getKeystroke: function () {
            var e = this.getKey();
            return (this.$.ctrlKey || this.$.metaKey) && (e += CKEDITOR.CTRL), this.$.shiftKey && (e += CKEDITOR.SHIFT), this.$.altKey && (e += CKEDITOR.ALT), e
        }, preventDefault: function (e) {
            var t = this.$;
            t.preventDefault ? t.preventDefault() : t.returnValue = !1, e && this.stopPropagation()
        }, stopPropagation: function () {
            var e = this.$;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
        }, getTarget: function () {
            var e = this.$.target || this.$.srcElement;
            return e ? new CKEDITOR.dom.node(e) : null
        }, getPhase: function () {
            return this.$.eventPhase || 2
        }, getPageOffset: function () {
            var e = this.getTarget().getDocument().$;
            return {
                x: this.$.pageX || this.$.clientX + (e.documentElement.scrollLeft || e.body.scrollLeft),
                y: this.$.pageY || this.$.clientY + (e.documentElement.scrollTop || e.body.scrollTop)
            }
        }
    }, CKEDITOR.CTRL = 1114112, CKEDITOR.SHIFT = 2228224, CKEDITOR.ALT = 4456448, CKEDITOR.EVENT_PHASE_CAPTURING = 1, CKEDITOR.EVENT_PHASE_AT_TARGET = 2, CKEDITOR.EVENT_PHASE_BUBBLING = 3, CKEDITOR.dom.domObject = function (e) {
        e && (this.$ = e)
    }, CKEDITOR.dom.domObject.prototype = function () {
        var e = function (e, t) {
            return function (n) {
                "undefined" != typeof CKEDITOR && e.fire(t, new CKEDITOR.dom.event(n))
            }
        };
        return {
            getPrivate: function () {
                var e;
                return (e = this.getCustomData("_")) || this.setCustomData("_", e = {}), e
            }, on: function (t) {
                var n = this.getCustomData("_cke_nativeListeners");
                return n || (n = {}, this.setCustomData("_cke_nativeListeners", n)), n[t] || (n = n[t] = e(this, t), this.$.addEventListener ? this.$.addEventListener(t, n, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + t, n)), CKEDITOR.event.prototype.on.apply(this, arguments)
            }, removeListener: function (e) {
                if (CKEDITOR.event.prototype.removeListener.apply(this, arguments), !this.hasListeners(e)) {
                    var t = this.getCustomData("_cke_nativeListeners"), n = t && t[e];
                    n && (this.$.removeEventListener ? this.$.removeEventListener(e, n, !1) : this.$.detachEvent && this.$.detachEvent("on" + e, n), delete t[e])
                }
            }, removeAllListeners: function () {
                var e, t = this.getCustomData("_cke_nativeListeners");
                for (e in t) {
                    var n = t[e];
                    this.$.detachEvent ? this.$.detachEvent("on" + e, n) : this.$.removeEventListener && this.$.removeEventListener(e, n, !1), delete t[e]
                }
                CKEDITOR.event.prototype.removeAllListeners.call(this)
            }
        }
    }(), function (e) {
        var t = {};
        CKEDITOR.on("reset", function () {
            t = {}
        }), e.equals = function (e) {
            try {
                return e && e.$ === this.$
            } catch (e) {
                return !1
            }
        }, e.setCustomData = function (e, n) {
            var i = this.getUniqueId();
            return (t[i] || (t[i] = {}))[e] = n, this
        }, e.getCustomData = function (e) {
            var n = this.$["data-cke-expando"];
            return (n = n && t[n]) && e in n ? n[e] : null
        }, e.removeCustomData = function (e) {
            var n, i, o = this.$["data-cke-expando"], o = o && t[o];
            return o && (n = o[e], i = e in o, delete o[e]), i ? n : null
        }, e.clearCustomData = function () {
            this.removeAllListeners();
            var e = this.$["data-cke-expando"];
            e && delete t[e]
        }, e.getUniqueId = function () {
            return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber())
        }, CKEDITOR.event.implementOn(e)
    }(CKEDITOR.dom.domObject.prototype), CKEDITOR.dom.node = function (e) {
        return e ? new CKEDITOR.dom[e.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : e.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : e.nodeType == CKEDITOR.NODE_TEXT ? "text" : e.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : e.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](e) : this
    }, CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject, CKEDITOR.NODE_ELEMENT = 1, CKEDITOR.NODE_DOCUMENT = 9, CKEDITOR.NODE_TEXT = 3, CKEDITOR.NODE_COMMENT = 8, CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11, CKEDITOR.POSITION_IDENTICAL = 0, CKEDITOR.POSITION_DISCONNECTED = 1, CKEDITOR.POSITION_FOLLOWING = 2, CKEDITOR.POSITION_PRECEDING = 4, CKEDITOR.POSITION_IS_CONTAINED = 8, CKEDITOR.POSITION_CONTAINS = 16, CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
        appendTo: function (e, t) {
            return e.append(this, t), e
        }, clone: function (e, t) {
            function n(i) {
                if (i["data-cke-expando"] && (i["data-cke-expando"] = !1), (i.nodeType == CKEDITOR.NODE_ELEMENT || i.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && (t || i.nodeType != CKEDITOR.NODE_ELEMENT || i.removeAttribute("id", !1), e)) {
                    i = i.childNodes;
                    for (var o = 0; o < i.length; o++)n(i[o])
                }
            }

            function i(t) {
                if (t.type == CKEDITOR.NODE_ELEMENT || t.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                    if (t.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var n = t.getName();
                        ":" == n[0] && t.renameNode(n.substring(1))
                    }
                    if (e)for (n = 0; n < t.getChildCount(); n++)i(t.getChild(n))
                }
            }

            var o = this.$.cloneNode(e);
            return n(o), o = new CKEDITOR.dom.node(o), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (this.type == CKEDITOR.NODE_ELEMENT || this.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && i(o), o
        }, hasPrevious: function () {
            return !!this.$.previousSibling
        }, hasNext: function () {
            return !!this.$.nextSibling
        }, insertAfter: function (e) {
            return e.$.parentNode.insertBefore(this.$, e.$.nextSibling), e
        }, insertBefore: function (e) {
            return e.$.parentNode.insertBefore(this.$, e.$), e
        }, insertBeforeMe: function (e) {
            return this.$.parentNode.insertBefore(e.$, this.$), e
        }, getAddress: function (e) {
            for (var t = [], n = this.getDocument().$.documentElement, i = this.$; i && i != n;) {
                var o = i.parentNode;
                o && t.unshift(this.getIndex.call({$: i}, e)), i = o
            }
            return t
        }, getDocument: function () {
            return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument)
        }, getIndex: function (e) {
            function t(e, i) {
                var o = i ? e.nextSibling : e.previousSibling;
                return o && o.nodeType == CKEDITOR.NODE_TEXT ? n(o) ? t(o, i) : o : null
            }

            function n(e) {
                return !e.nodeValue || e.nodeValue == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE
            }

            var i, o = this.$, a = -1;
            if (!this.$.parentNode || e && o.nodeType == CKEDITOR.NODE_TEXT && n(o) && !t(o) && !t(o, !0))return -1;
            do {
                e && o != this.$ && o.nodeType == CKEDITOR.NODE_TEXT && (i || n(o)) || (a++, i = o.nodeType == CKEDITOR.NODE_TEXT)
            } while (o = o.previousSibling);
            return a
        }, getNextSourceNode: function (e, t, n) {
            if (n && !n.call) {
                var i = n;
                n = function (e) {
                    return !e.equals(i)
                }
            }
            e = !e && this.getFirst && this.getFirst();
            var o;
            if (!e) {
                if (this.type == CKEDITOR.NODE_ELEMENT && n && !1 === n(this, !0))return null;
                e = this.getNext()
            }
            for (; !e && (o = (o || this).getParent());) {
                if (n && !1 === n(o, !0))return null;
                e = o.getNext()
            }
            return !e || n && !1 === n(e) ? null : t && t != e.type ? e.getNextSourceNode(!1, t, n) : e
        }, getPreviousSourceNode: function (e, t, n) {
            if (n && !n.call) {
                var i = n;
                n = function (e) {
                    return !e.equals(i)
                }
            }
            e = !e && this.getLast && this.getLast();
            var o;
            if (!e) {
                if (this.type == CKEDITOR.NODE_ELEMENT && n && !1 === n(this, !0))return null;
                e = this.getPrevious()
            }
            for (; !e && (o = (o || this).getParent());) {
                if (n && !1 === n(o, !0))return null;
                e = o.getPrevious()
            }
            return !e || n && !1 === n(e) ? null : t && e.type != t ? e.getPreviousSourceNode(!1, t, n) : e
        }, getPrevious: function (e) {
            var t, n = this.$;
            do {
                t = (n = n.previousSibling) && 10 != n.nodeType && new CKEDITOR.dom.node(n)
            } while (t && e && !e(t));
            return t
        }, getNext: function (e) {
            var t, n = this.$;
            do {
                t = (n = n.nextSibling) && new CKEDITOR.dom.node(n)
            } while (t && e && !e(t));
            return t
        }, getParent: function (e) {
            var t = this.$.parentNode;
            return t && (t.nodeType == CKEDITOR.NODE_ELEMENT || e && t.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(t) : null
        }, getParents: function (e) {
            var t = this, n = [];
            do {
                n[e ? "push" : "unshift"](t)
            } while (t = t.getParent());
            return n
        }, getCommonAncestor: function (e) {
            if (e.equals(this))return this;
            if (e.contains && e.contains(this))return e;
            var t = this.contains ? this : this.getParent();
            do {
                if (t.contains(e))return t
            } while (t = t.getParent());
            return null
        }, getPosition: function (e) {
            var t = this.$, n = e.$;
            if (t.compareDocumentPosition)return t.compareDocumentPosition(n);
            if (t == n)return CKEDITOR.POSITION_IDENTICAL;
            if (this.type == CKEDITOR.NODE_ELEMENT && e.type == CKEDITOR.NODE_ELEMENT) {
                if (t.contains) {
                    if (t.contains(n))return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING;
                    if (n.contains(t))return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
                }
                if ("sourceIndex" in t)return 0 > t.sourceIndex || 0 > n.sourceIndex ? CKEDITOR.POSITION_DISCONNECTED : t.sourceIndex < n.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
            }
            t = this.getAddress(), e = e.getAddress();
            for (var n = Math.min(t.length, e.length), i = 0; i < n; i++)if (t[i] != e[i])return t[i] < e[i] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
            return t.length < e.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
        }, getAscendant: function (e, t) {
            var n, i, o = this.$;
            t || (o = o.parentNode), "function" == typeof e ? (i = !0, n = e) : (i = !1, n = function (t) {
                return t = "string" == typeof t.nodeName ? t.nodeName.toLowerCase() : "", "string" == typeof e ? t == e : t in e
            });
            for (; o;) {
                if (n(i ? new CKEDITOR.dom.node(o) : o))return new CKEDITOR.dom.node(o);
                try {
                    o = o.parentNode
                } catch (e) {
                    o = null
                }
            }
            return null
        }, hasAscendant: function (e, t) {
            var n = this.$;
            for (t || (n = n.parentNode); n;) {
                if (n.nodeName && n.nodeName.toLowerCase() == e)return !0;
                n = n.parentNode
            }
            return !1
        }, move: function (e, t) {
            e.append(this.remove(), t)
        }, remove: function (e) {
            var t = this.$, n = t.parentNode;
            if (n) {
                if (e)for (; e = t.firstChild;)n.insertBefore(t.removeChild(e), t);
                n.removeChild(t)
            }
            return this
        }, replace: function (e) {
            this.insertBefore(e), e.remove()
        }, trim: function () {
            this.ltrim(), this.rtrim()
        }, ltrim: function () {
            for (var e; this.getFirst && (e = this.getFirst());) {
                if (e.type == CKEDITOR.NODE_TEXT) {
                    var t = CKEDITOR.tools.ltrim(e.getText()), n = e.getLength();
                    if (!t) {
                        e.remove();
                        continue
                    }
                    t.length < n && (e.split(n - t.length), this.$.removeChild(this.$.firstChild))
                }
                break
            }
        }, rtrim: function () {
            for (var e; this.getLast && (e = this.getLast());) {
                if (e.type == CKEDITOR.NODE_TEXT) {
                    var t = CKEDITOR.tools.rtrim(e.getText()), n = e.getLength();
                    if (!t) {
                        e.remove();
                        continue
                    }
                    t.length < n && (e.split(t.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild))
                }
                break
            }
            CKEDITOR.env.needsBrFiller && (e = this.$.lastChild) && 1 == e.type && "br" == e.nodeName.toLowerCase() && e.parentNode.removeChild(e)
        }, isReadOnly: function (e) {
            var t = this;
            if (this.type != CKEDITOR.NODE_ELEMENT && (t = this.getParent()), CKEDITOR.env.edge && t && t.is("textarea", "input") && (e = !0), !e && t && void 0 !== t.$.isContentEditable)return !(t.$.isContentEditable || t.data("cke-editable"));
            for (; t;) {
                if (t.data("cke-editable"))return !1;
                if (t.hasAttribute("contenteditable"))return "false" == t.getAttribute("contenteditable");
                t = t.getParent()
            }
            return !0
        }
    }), CKEDITOR.dom.window = function (e) {
        CKEDITOR.dom.domObject.call(this, e)
    }, CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
        focus: function () {
            this.$.focus()
        }, getViewPaneSize: function () {
            var e = this.$.document, t = "CSS1Compat" == e.compatMode;
            return {
                width: (t ? e.documentElement.clientWidth : e.body.clientWidth) || 0,
                height: (t ? e.documentElement.clientHeight : e.body.clientHeight) || 0
            }
        }, getScrollPosition: function () {
            var e = this.$;
            return "pageXOffset" in e ? {
                x: e.pageXOffset || 0,
                y: e.pageYOffset || 0
            } : (e = e.document, {
                x: e.documentElement.scrollLeft || e.body.scrollLeft || 0,
                y: e.documentElement.scrollTop || e.body.scrollTop || 0
            })
        }, getFrame: function () {
            var e = this.$.frameElement;
            return e ? new CKEDITOR.dom.element.get(e) : null
        }
    }), CKEDITOR.dom.document = function (e) {
        CKEDITOR.dom.domObject.call(this, e)
    }, CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
        type: CKEDITOR.NODE_DOCUMENT,
        appendStyleSheet: function (e) {
            if (this.$.createStyleSheet) this.$.createStyleSheet(e); else {
                var t = new CKEDITOR.dom.element("link");
                t.setAttributes({rel: "stylesheet", type: "text/css", href: e}), this.getHead().append(t)
            }
        },
        appendStyleText: function (e) {
            if (this.$.createStyleSheet) {
                var t = this.$.createStyleSheet("");
                t.cssText = e
            } else {
                var n = new CKEDITOR.dom.element("style", this);
                n.append(new CKEDITOR.dom.text(e, this)), this.getHead().append(n)
            }
            return t || n.$.sheet
        },
        createElement: function (e, t) {
            var n = new CKEDITOR.dom.element(e, this);
            return t && (t.attributes && n.setAttributes(t.attributes), t.styles && n.setStyles(t.styles)), n
        },
        createText: function (e) {
            return new CKEDITOR.dom.text(e, this)
        },
        focus: function () {
            this.getWindow().focus()
        },
        getActive: function () {
            var e;
            try {
                e = this.$.activeElement
            } catch (e) {
                return null
            }
            return new CKEDITOR.dom.element(e)
        },
        getById: function (e) {
            return (e = this.$.getElementById(e)) ? new CKEDITOR.dom.element(e) : null
        },
        getByAddress: function (e, t) {
            for (var n = this.$.documentElement, i = 0; n && i < e.length; i++) {
                var o = e[i];
                if (t)for (var a = -1, r = 0; r < n.childNodes.length; r++) {
                    var s = n.childNodes[r];
                    if ((!0 !== t || 3 != s.nodeType || !s.previousSibling || 3 != s.previousSibling.nodeType) && ++a == o) {
                        n = s;
                        break
                    }
                } else n = n.childNodes[o]
            }
            return n ? new CKEDITOR.dom.node(n) : null
        },
        getElementsByTag: function (e, t) {
            return CKEDITOR.env.ie && 8 >= document.documentMode || !t || (e = t + ":" + e), new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(e))
        },
        getHead: function () {
            var e = this.$.getElementsByTagName("head")[0];
            return e = e ? new CKEDITOR.dom.element(e) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0)
        },
        getBody: function () {
            return new CKEDITOR.dom.element(this.$.body)
        },
        getDocumentElement: function () {
            return new CKEDITOR.dom.element(this.$.documentElement)
        },
        getWindow: function () {
            return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView)
        },
        write: function (e) {
            this.$.open("text/html", "replace"), CKEDITOR.env.ie && (e = e.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$&\n<script data-cke-temp="1">(' + CKEDITOR.tools.fixDomain + ")();<\/script>")), this.$.write(e), this.$.close()
        },
        find: function (e) {
            return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(e))
        },
        findOne: function (e) {
            return (e = this.$.querySelector(e)) ? new CKEDITOR.dom.element(e) : null
        },
        _getHtml5ShivFrag: function () {
            var e = this.getCustomData("html5ShivFrag");
            return e || (e = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(e, !0), this.setCustomData("html5ShivFrag", e)), e
        }
    }), CKEDITOR.dom.nodeList = function (e) {
        this.$ = e
    }, CKEDITOR.dom.nodeList.prototype = {
        count: function () {
            return this.$.length
        }, getItem: function (e) {
            return 0 > e || e >= this.$.length ? null : (e = this.$[e]) ? new CKEDITOR.dom.node(e) : null
        }, toArray: function () {
            return CKEDITOR.tools.array.map(this.$, function (e) {
                return new CKEDITOR.dom.node(e)
            })
        }
    }, CKEDITOR.dom.element = function (e, t) {
        "string" == typeof e && (e = (t ? t.$ : document).createElement(e)), CKEDITOR.dom.domObject.call(this, e)
    }, CKEDITOR.dom.element.get = function (e) {
        return (e = "string" == typeof e ? document.getElementById(e) || document.getElementsByName(e)[0] : e) && (e.$ ? e : new CKEDITOR.dom.element(e))
    }, CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node, CKEDITOR.dom.element.createFromHtml = function (e, t) {
        var n = new CKEDITOR.dom.element("div", t);
        return n.setHtml(e), n.getFirst().remove()
    }, CKEDITOR.dom.element.setMarker = function (e, t, n, i) {
        var o = t.getCustomData("list_marker_id") || t.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),
            a = t.getCustomData("list_marker_names") || t.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
        return e[o] = t, a[n] = 1, t.setCustomData(n, i)
    }, CKEDITOR.dom.element.clearAllMarkers = function (e) {
        for (var t in e)CKEDITOR.dom.element.clearMarkers(e, e[t], 1)
    }, CKEDITOR.dom.element.clearMarkers = function (e, t, n) {
        var i, o = t.getCustomData("list_marker_names"), a = t.getCustomData("list_marker_id");
        for (i in o)t.removeCustomData(i);
        t.removeCustomData("list_marker_names"), n && (t.removeCustomData("list_marker_id"), delete e[a])
    }, function () {
        function e(e, t) {
            return -1 < (" " + e + " ").replace(a, " ").indexOf(" " + t + " ")
        }

        function t(e) {
            var t = !0;
            return e.$.id || (e.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), t = !1), function () {
                t || e.removeAttribute("id")
            }
        }

        function n(e, t) {
            var n = CKEDITOR.tools.escapeCss(e.$.id);
            return "#" + n + " " + t.split(/,\s*/).join(", #" + n + " ")
        }

        function i(e) {
            for (var t = 0, n = 0, i = r[e].length; n < i; n++)t += parseFloat(this.getComputedStyle(r[e][n]) || 0, 10) || 0;
            return t
        }

        var o = document.createElement("_").classList,
            o = void 0 !== o && null !== String(o.add).match(/\[Native code\]/gi), a = /[\n\t\r]/g;
        CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
            type: CKEDITOR.NODE_ELEMENT, addClass: o ? function (e) {
                return this.$.classList.add(e), this
            } : function (t) {
                var n = this.$.className;
                return n && (e(n, t) || (n += " " + t)), this.$.className = n || t, this
            }, removeClass: o ? function (e) {
                var t = this.$;
                return t.classList.remove(e), t.className || t.removeAttribute("class"), this
            } : function (t) {
                var n = this.getAttribute("class");
                return n && e(n, t) && ((n = n.replace(new RegExp("(?:^|\\s+)" + t + "(?=\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class", n) : this.removeAttribute("class")), this
            }, hasClass: function (t) {
                return e(this.$.className, t)
            }, append: function (e, t) {
                return "string" == typeof e && (e = this.getDocument().createElement(e)), t ? this.$.insertBefore(e.$, this.$.firstChild) : this.$.appendChild(e.$), e
            }, appendHtml: function (e) {
                if (this.$.childNodes.length) {
                    var t = new CKEDITOR.dom.element("div", this.getDocument());
                    t.setHtml(e), t.moveChildren(this)
                } else this.setHtml(e)
            }, appendText: function (e) {
                null != this.$.text && CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? this.$.text += e : this.append(new CKEDITOR.dom.text(e))
            }, appendBogus: function (e) {
                if (e || CKEDITOR.env.needsBrFiller) {
                    for (e = this.getLast(); e && e.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(e.getText());)e = e.getPrevious();
                    e && e.is && e.is("br") || (e = this.getDocument().createElement("br"), CKEDITOR.env.gecko && e.setAttribute("type", "_moz"), this.append(e))
                }
            }, breakParent: function (e, t) {
                var n = new CKEDITOR.dom.range(this.getDocument());
                n.setStartAfter(this), n.setEndAfter(e);
                var i, o = n.extractContents(!1, t || !1);
                if (n.insertNode(this.remove()), CKEDITOR.env.ie && !CKEDITOR.env.edge) {
                    for (n = new CKEDITOR.dom.element("div"); i = o.getFirst();)i.$.style.backgroundColor && (i.$.style.backgroundColor = i.$.style.backgroundColor), n.append(i);
                    n.insertAfter(this), n.remove(!0)
                } else o.insertAfterNode(this)
            }, contains: document.compareDocumentPosition ? function (e) {
                return !!(16 & this.$.compareDocumentPosition(e.$))
            } : function (e) {
                var t = this.$;
                return e.type != CKEDITOR.NODE_ELEMENT ? t.contains(e.getParent().$) : t != e.$ && t.contains(e.$)
            }, focus: function () {
                function e() {
                    try {
                        this.$.focus()
                    } catch (e) {
                    }
                }

                return function (t) {
                    t ? CKEDITOR.tools.setTimeout(e, 100, this) : e.call(this)
                }
            }(), getHtml: function () {
                var e = this.$.innerHTML;
                return CKEDITOR.env.ie ? e.replace(/<\?[^>]*>/g, "") : e
            }, getOuterHtml: function () {
                if (this.$.outerHTML)return this.$.outerHTML.replace(/<\?[^>]*>/, "");
                var e = this.$.ownerDocument.createElement("div");
                return e.appendChild(this.$.cloneNode(!0)), e.innerHTML
            }, getClientRect: function () {
                var e = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());
                return !e.width && (e.width = e.right - e.left), !e.height && (e.height = e.bottom - e.top), e
            }, setHtml: CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? function (e) {
                try {
                    var t = this.$;
                    if (this.getParent())return t.innerHTML = e;
                    var n = this.getDocument()._getHtml5ShivFrag();
                    return n.appendChild(t), t.innerHTML = e, n.removeChild(t), e
                } catch (n) {
                    for (this.$.innerHTML = "", t = new CKEDITOR.dom.element("body", this.getDocument()), t.$.innerHTML = e, t = t.getChildren(); t.count();)this.append(t.getItem(0));
                    return e
                }
            } : function (e) {
                return this.$.innerHTML = e
            }, setText: function () {
                var e = document.createElement("p");
                return e.innerHTML = "x", e = e.textContent, function (t) {
                    this.$[e ? "textContent" : "innerText"] = t
                }
            }(), getAttribute: function () {
                var e = function (e) {
                    return this.$.getAttribute(e, 2)
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (e) {
                    switch (e) {
                        case"class":
                            e = "className";
                            break;
                        case"http-equiv":
                            e = "httpEquiv";
                            break;
                        case"name":
                            return this.$.name;
                        case"tabindex":
                            return e = this.$.getAttribute(e, 2), 0 !== e && 0 === this.$.tabIndex && (e = null), e;
                        case"checked":
                            return e = this.$.attributes.getNamedItem(e), (e.specified ? e.nodeValue : this.$.checked) ? "checked" : null;
                        case"hspace":
                        case"value":
                            return this.$[e];
                        case"style":
                            return this.$.style.cssText;
                        case"contenteditable":
                        case"contentEditable":
                            return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
                    }
                    return this.$.getAttribute(e, 2)
                } : e
            }(), getAttributes: function (e) {
                var t, n = {}, i = this.$.attributes;
                for (e = CKEDITOR.tools.isArray(e) ? e : [], t = 0; t < i.length; t++)-1 === CKEDITOR.tools.indexOf(e, i[t].name) && (n[i[t].name] = i[t].value);
                return n
            }, getChildren: function () {
                return new CKEDITOR.dom.nodeList(this.$.childNodes)
            }, getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function (e) {
                var t = this.getWindow().$.getComputedStyle(this.$, null);
                return t ? t.getPropertyValue(e) : ""
            } : function (e) {
                return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(e)]
            }, getDtd: function () {
                var e = CKEDITOR.dtd[this.getName()];
                return this.getDtd = function () {
                    return e
                }, e
            }, getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag, getTabIndex: function () {
                var e = this.$.tabIndex;
                return 0 !== e || CKEDITOR.dtd.$tabIndex[this.getName()] || 0 === parseInt(this.getAttribute("tabindex"), 10) ? e : -1
            }, getText: function () {
                return this.$.textContent || this.$.innerText || ""
            }, getWindow: function () {
                return this.getDocument().getWindow()
            }, getId: function () {
                return this.$.id || null
            }, getNameAtt: function () {
                return this.$.name || null
            }, getName: function () {
                var e = this.$.nodeName.toLowerCase();
                if (CKEDITOR.env.ie && 8 >= document.documentMode) {
                    var t = this.$.scopeName;
                    "HTML" != t && (e = t.toLowerCase() + ":" + e)
                }
                return this.getName = function () {
                    return e
                }, this.getName()
            }, getValue: function () {
                return this.$.value
            }, getFirst: function (e) {
                var t = this.$.firstChild;
                return (t = t && new CKEDITOR.dom.node(t)) && e && !e(t) && (t = t.getNext(e)), t
            }, getLast: function (e) {
                var t = this.$.lastChild;
                return (t = t && new CKEDITOR.dom.node(t)) && e && !e(t) && (t = t.getPrevious(e)), t
            }, getStyle: function (e) {
                return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(e)]
            }, is: function () {
                var e = this.getName();
                if ("object" == typeof arguments[0])return !!arguments[0][e];
                for (var t = 0; t < arguments.length; t++)if (arguments[t] == e)return !0;
                return !1
            }, isEditable: function (e) {
                var t = this.getName();
                return !(this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[t] || CKEDITOR.dtd.$empty[t] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount()) && (!1 === e || !(!(e = CKEDITOR.dtd[t] || CKEDITOR.dtd.span) || !e["#"]))
            }, isIdentical: function (e) {
                var t = this.clone(0, 1);
                if (e = e.clone(0, 1), t.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]), e.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]), t.$.isEqualNode)return t.$.style.cssText = CKEDITOR.tools.normalizeCssText(t.$.style.cssText), e.$.style.cssText = CKEDITOR.tools.normalizeCssText(e.$.style.cssText), t.$.isEqualNode(e.$);
                if (t = t.getOuterHtml(), e = e.getOuterHtml(), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && this.is("a")) {
                    var n = this.getParent();
                    n.type == CKEDITOR.NODE_ELEMENT && (n = n.clone(), n.setHtml(t), t = n.getHtml(), n.setHtml(e), e = n.getHtml())
                }
                return t == e
            }, isVisible: function () {
                var e, t,
                    n = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility");
                return n && CKEDITOR.env.webkit && (e = this.getWindow(), !e.equals(CKEDITOR.document.getWindow()) && (t = e.$.frameElement) && (n = new CKEDITOR.dom.element(t).isVisible())), !!n
            }, isEmptyInlineRemoveable: function () {
                if (!CKEDITOR.dtd.$removeEmpty[this.getName()])return !1;
                for (var e = this.getChildren(), t = 0, n = e.count(); t < n; t++) {
                    var i = e.getItem(t);
                    if ((i.type != CKEDITOR.NODE_ELEMENT || !i.data("cke-bookmark")) && (i.type == CKEDITOR.NODE_ELEMENT && !i.isEmptyInlineRemoveable() || i.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(i.getText())))return !1
                }
                return !0
            }, hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function () {
                for (var e = this.$.attributes, t = 0; t < e.length; t++) {
                    var n = e[t];
                    switch (n.nodeName) {
                        case"class":
                            if (this.getAttribute("class"))return !0;
                        case"data-cke-expando":
                            continue;
                        default:
                            if (n.specified)return !0
                    }
                }
                return !1
            } : function () {
                var e = this.$.attributes, t = e.length, n = {"data-cke-expando": 1, _moz_dirty: 1};
                return 0 < t && (2 < t || !n[e[0].nodeName] || 2 == t && !n[e[1].nodeName])
            }, hasAttribute: function () {
                function e(e) {
                    var t = this.$.attributes.getNamedItem(e);
                    if ("input" == this.getName())switch (e) {
                        case"class":
                            return 0 < this.$.className.length;
                        case"checked":
                            return !!this.$.checked;
                        case"value":
                            return e = this.getAttribute("type"), "checkbox" == e || "radio" == e ? "on" != this.$.value : !!this.$.value
                    }
                    return !!t && t.specified
                }

                return CKEDITOR.env.ie ? 8 > CKEDITOR.env.version ? function (t) {
                    return "name" == t ? !!this.$.name : e.call(this, t)
                } : e : function (e) {
                    return !!this.$.attributes.getNamedItem(e)
                }
            }(), hide: function () {
                this.setStyle("display", "none")
            }, moveChildren: function (e, t) {
                var n = this.$;
                if (e = e.$, n != e) {
                    var i;
                    if (t)for (; i = n.lastChild;)e.insertBefore(n.removeChild(i), e.firstChild); else for (; i = n.firstChild;)e.appendChild(n.removeChild(i))
                }
            }, mergeSiblings: function () {
                function e(e, t, n) {
                    if (t && t.type == CKEDITOR.NODE_ELEMENT) {
                        for (var i = []; t.data("cke-bookmark") || t.isEmptyInlineRemoveable();)if (i.push(t), !(t = n ? t.getNext() : t.getPrevious()) || t.type != CKEDITOR.NODE_ELEMENT)return;
                        if (e.isIdentical(t)) {
                            for (var o = n ? e.getLast() : e.getFirst(); i.length;)i.shift().move(e, !n);
                            t.moveChildren(e, !n), t.remove(), o && o.type == CKEDITOR.NODE_ELEMENT && o.mergeSiblings()
                        }
                    }
                }

                return function (t) {
                    (!1 === t || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) && (e(this, this.getNext(), !0), e(this, this.getPrevious()))
                }
            }(), show: function () {
                this.setStyles({display: "", visibility: ""})
            }, setAttribute: function () {
                var e = function (e, t) {
                    return this.$.setAttribute(e, t), this
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (t, n) {
                    return "class" == t ? this.$.className = n : "style" == t ? this.$.style.cssText = n : "tabindex" == t ? this.$.tabIndex = n : "checked" == t ? this.$.checked = n : "contenteditable" == t ? e.call(this, "contentEditable", n) : e.apply(this, arguments), this
                } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function (t, n) {
                    if ("src" == t && n.match(/^http:\/\//))try {
                        e.apply(this, arguments)
                    } catch (e) {
                    } else e.apply(this, arguments);
                    return this
                } : e
            }(), setAttributes: function (e) {
                for (var t in e)this.setAttribute(t, e[t]);
                return this
            }, setValue: function (e) {
                return this.$.value = e, this
            }, removeAttribute: function () {
                var e = function (e) {
                    this.$.removeAttribute(e)
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (e) {
                    "class" == e ? e = "className" : "tabindex" == e ? e = "tabIndex" : "contenteditable" == e && (e = "contentEditable"), this.$.removeAttribute(e)
                } : e
            }(), removeAttributes: function (e) {
                if (CKEDITOR.tools.isArray(e))for (var t = 0; t < e.length; t++)this.removeAttribute(e[t]); else for (t in e = e || this.getAttributes())e.hasOwnProperty(t) && this.removeAttribute(t)
            }, removeStyle: function (e) {
                var t = this.$.style;
                if (t.removeProperty || "border" != e && "margin" != e && "padding" != e) t.removeProperty ? t.removeProperty(e) : t.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(e)), this.$.style.cssText || this.removeAttribute("style"); else {
                    var n, i = ["top", "left", "right", "bottom"];
                    "border" == e && (n = ["color", "style", "width"]);
                    for (var t = [], o = 0; o < i.length; o++)if (n)for (var a = 0; a < n.length; a++)t.push([e, i[o], n[a]].join("-")); else t.push([e, i[o]].join("-"));
                    for (e = 0; e < t.length; e++)this.removeStyle(t[e])
                }
            }, setStyle: function (e, t) {
                return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(e)] = t, this
            }, setStyles: function (e) {
                for (var t in e)this.setStyle(t, e[t]);
                return this
            }, setOpacity: function (e) {
                CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? (e = Math.round(100 * e), this.setStyle("filter", 100 <= e ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity=" + e + ")")) : this.setStyle("opacity", e)
            }, unselectable: function () {
                if (this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none")), CKEDITOR.env.ie) {
                    this.setAttribute("unselectable", "on");
                    for (var e, t = this.getElementsByTag("*"), n = 0, i = t.count(); n < i; n++)e = t.getItem(n), e.setAttribute("unselectable", "on")
                }
            }, getPositionedAncestor: function () {
                for (var e = this; "html" != e.getName();) {
                    if ("static" != e.getComputedStyle("position"))return e;
                    e = e.getParent()
                }
                return null
            }, getDocumentPosition: function (e) {
                var t = 0, n = 0, i = this.getDocument(), o = i.getBody(), a = "BackCompat" == i.$.compatMode;
                if (document.documentElement.getBoundingClientRect && (CKEDITOR.env.ie ? 8 !== CKEDITOR.env.version : 1)) {
                    var r = this.$.getBoundingClientRect(), s = i.$.documentElement,
                        l = s.clientTop || o.$.clientTop || 0, c = s.clientLeft || o.$.clientLeft || 0, d = !0;
                    CKEDITOR.env.ie && (d = i.getDocumentElement().contains(this), i = i.getBody().contains(this), d = a && i || !a && d), d && (CKEDITOR.env.webkit || CKEDITOR.env.ie && 12 <= CKEDITOR.env.version ? (t = o.$.scrollLeft || s.scrollLeft, n = o.$.scrollTop || s.scrollTop) : (n = a ? o.$ : s, t = n.scrollLeft, n = n.scrollTop), t = r.left + t - c, n = r.top + n - l)
                } else for (l = this, c = null; l && "body" != l.getName() && "html" != l.getName();) {
                    for (t += l.$.offsetLeft - l.$.scrollLeft, n += l.$.offsetTop - l.$.scrollTop, l.equals(this) || (t += l.$.clientLeft || 0, n += l.$.clientTop || 0); c && !c.equals(l);)t -= c.$.scrollLeft, n -= c.$.scrollTop, c = c.getParent();
                    c = l, l = (r = l.$.offsetParent) ? new CKEDITOR.dom.element(r) : null
                }
                return e && (r = this.getWindow(), l = e.getWindow(), !r.equals(l) && r.$.frameElement && (e = new CKEDITOR.dom.element(r.$.frameElement).getDocumentPosition(e), t += e.x, n += e.y)), document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko || a || (t += this.$.clientLeft ? 1 : 0, n += this.$.clientTop ? 1 : 0), {
                    x: t,
                    y: n
                }
            }, scrollIntoView: function (e) {
                var t = this.getParent();
                if (t)do {
                    if ((t.$.clientWidth && t.$.clientWidth < t.$.scrollWidth || t.$.clientHeight && t.$.clientHeight < t.$.scrollHeight) && !t.is("body") && this.scrollIntoParent(t, e, 1), t.is("html")) {
                        var n = t.getWindow();
                        try {
                            var i = n.$.frameElement;
                            i && (t = new CKEDITOR.dom.element(i))
                        } catch (e) {
                        }
                    }
                } while (t = t.getParent())
            }, scrollIntoParent: function (e, t, n) {
                function i(t, n) {
                    /body|html/.test(e.getName()) ? e.getWindow().$.scrollBy(t, n) : (e.$.scrollLeft += t, e.$.scrollTop += n)
                }

                function o(e, t) {
                    var n = {x: 0, y: 0};
                    if (!e.is(d ? "body" : "html")) {
                        var i = e.$.getBoundingClientRect();
                        n.x = i.left, n.y = i.top
                    }
                    return i = e.getWindow(), i.equals(t) || (i = o(CKEDITOR.dom.element.get(i.$.frameElement), t), n.x += i.x, n.y += i.y), n
                }

                function a(e, t) {
                    return parseInt(e.getComputedStyle("margin-" + t) || 0, 10) || 0
                }

                var r, s, l, c;
                !e && (e = this.getWindow()), l = e.getDocument();
                var d = "BackCompat" == l.$.compatMode;
                e instanceof CKEDITOR.dom.window && (e = d ? l.getBody() : l.getDocumentElement()), CKEDITOR.env.webkit && (l = this.getEditor(!1)) && (l._.previousScrollTop = null), l = e.getWindow(), s = o(this, l);
                var u = o(e, l), h = this.$.offsetHeight;
                r = this.$.offsetWidth;
                var f = e.$.clientHeight, g = e.$.clientWidth;
                l = s.x - a(this, "left") - u.x || 0, c = s.y - a(this, "top") - u.y || 0, r = s.x + r + a(this, "right") - (u.x + g) || 0, s = s.y + h + a(this, "bottom") - (u.y + f) || 0, (0 > c || 0 < s) && i(0, !0 === t ? c : !1 === t ? s : 0 > c ? c : s), n && (0 > l || 0 < r) && i(0 > l ? l : r, 0)
            }, setState: function (e, t, n) {
                switch (t = t || "cke", e) {
                    case CKEDITOR.TRISTATE_ON:
                        this.addClass(t + "_on"), this.removeClass(t + "_off"), this.removeClass(t + "_disabled"), n && this.setAttribute("aria-pressed", !0), n && this.removeAttribute("aria-disabled");
                        break;
                    case CKEDITOR.TRISTATE_DISABLED:
                        this.addClass(t + "_disabled"), this.removeClass(t + "_off"), this.removeClass(t + "_on"), n && this.setAttribute("aria-disabled", !0), n && this.removeAttribute("aria-pressed");
                        break;
                    default:
                        this.addClass(t + "_off"), this.removeClass(t + "_on"), this.removeClass(t + "_disabled"), n && this.removeAttribute("aria-pressed"), n && this.removeAttribute("aria-disabled")
                }
            }, getFrameDocument: function () {
                var e = this.$;
                try {
                    e.contentWindow.document
                } catch (t) {
                    e.src = e.src
                }
                return e && new CKEDITOR.dom.document(e.contentWindow.document)
            }, copyAttributes: function (e, t) {
                var n = this.$.attributes;
                t = t || {};
                for (var i = 0; i < n.length; i++) {
                    var o, a = n[i], r = a.nodeName.toLowerCase();
                    r in t || ("checked" == r && (o = this.getAttribute(r)) ? e.setAttribute(r, o) : CKEDITOR.env.ie && !this.hasAttribute(r) || (o = this.getAttribute(r), null === o && (o = a.nodeValue), e.setAttribute(r, o)))
                }
                "" !== this.$.style.cssText && (e.$.style.cssText = this.$.style.cssText)
            }, renameNode: function (e) {
                if (this.getName() != e) {
                    var t = this.getDocument();
                    e = new CKEDITOR.dom.element(e, t), this.copyAttributes(e), this.moveChildren(e), this.getParent(!0) && this.$.parentNode.replaceChild(e.$, this.$), e.$["data-cke-expando"] = this.$["data-cke-expando"], this.$ = e.$, delete this.getName
                }
            }, getChild: function () {
                function e(e, t) {
                    var n = e.childNodes;
                    if (0 <= t && t < n.length)return n[t]
                }

                return function (t) {
                    var n = this.$;
                    if (t.slice)for (t = t.slice(); 0 < t.length && n;)n = e(n, t.shift()); else n = e(n, t);
                    return n ? new CKEDITOR.dom.node(n) : null
                }
            }(), getChildCount: function () {
                return this.$.childNodes.length
            }, disableContextMenu: function () {
                function e(e) {
                    return e.type == CKEDITOR.NODE_ELEMENT && e.hasClass("cke_enable_context_menu")
                }

                this.on("contextmenu", function (t) {
                    t.data.getTarget().getAscendant(e, !0) || t.data.preventDefault()
                })
            }, getDirection: function (e) {
                return e ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" : this.getStyle("direction") || this.getAttribute("dir")
            }, data: function (e, t) {
                return e = "data-" + e, void 0 === t ? this.getAttribute(e) : (!1 === t ? this.removeAttribute(e) : this.setAttribute(e, t), null)
            }, getEditor: function (e) {
                var t, n, i, o = CKEDITOR.instances;
                e = e || void 0 === e;
                for (t in o)if (n = o[t], n.element.equals(this) && n.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || !e && (i = n.editable()) && (i.equals(this) || i.contains(this)))return n;
                return null
            }, find: function (e) {
                var i = t(this);
                return e = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(n(this, e))), i(), e
            }, findOne: function (e) {
                var i = t(this);
                return e = this.$.querySelector(n(this, e)), i(), e ? new CKEDITOR.dom.element(e) : null
            }, forEach: function (e, t, n) {
                if (!(n || t && this.type != t))var i = e(this);
                if (!1 !== i) {
                    n = this.getChildren();
                    for (var o = 0; o < n.count(); o++)i = n.getItem(o), i.type == CKEDITOR.NODE_ELEMENT ? i.forEach(e, t) : t && i.type != t || e(i)
                }
            }
        });
        var r = {
            width: ["border-left-width", "border-right-width", "padding-left", "padding-right"],
            height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"]
        };
        CKEDITOR.dom.element.prototype.setSize = function (e, t, n) {
            "number" == typeof t && (!n || CKEDITOR.env.ie && CKEDITOR.env.quirks || (t -= i.call(this, e)), this.setStyle(e, t + "px"))
        }, CKEDITOR.dom.element.prototype.getSize = function (e, t) {
            var n = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(e)], this.$["client" + CKEDITOR.tools.capitalize(e)]) || 0;
            return t && (n -= i.call(this, e)), n
        }
    }(), CKEDITOR.dom.documentFragment = function (e) {
        e = e || CKEDITOR.document, this.$ = e.type == CKEDITOR.NODE_DOCUMENT ? e.$.createDocumentFragment() : e
    }, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {
        type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
        insertAfterNode: function (e) {
            e = e.$, e.parentNode.insertBefore(this.$, e.nextSibling)
        },
        getHtml: function () {
            var e = new CKEDITOR.dom.element("div");
            return this.clone(1, 1).appendTo(e), e.getHtml().replace(/\s*data-cke-expando=".*?"/g, "")
        }
    }, !0, {
        append: 1,
        appendBogus: 1,
        clone: 1,
        getFirst: 1,
        getHtml: 1,
        getLast: 1,
        getParent: 1,
        getNext: 1,
        getPrevious: 1,
        appendTo: 1,
        moveChildren: 1,
        insertBefore: 1,
        insertAfterNode: 1,
        replace: 1,
        trim: 1,
        type: 1,
        ltrim: 1,
        rtrim: 1,
        getDocument: 1,
        getChildCount: 1,
        getChild: 1,
        getChildren: 1
    }), function () {
        function e(e, t) {
            var n = this.range;
            if (this._.end)return null;
            if (!this._.start) {
                if (this._.start = 1, n.collapsed)return this.end(), null;
                n.optimize()
            }
            var i, o = n.startContainer;
            i = n.endContainer;
            var a, r = n.startOffset, s = n.endOffset, l = this.guard, c = this.type,
                d = e ? "getPreviousSourceNode" : "getNextSourceNode";
            if (!e && !this._.guardLTR) {
                var u = i.type == CKEDITOR.NODE_ELEMENT ? i : i.getParent(),
                    h = i.type == CKEDITOR.NODE_ELEMENT ? i.getChild(s) : i.getNext();
                this._.guardLTR = function (e, t) {
                    return !(t && u.equals(e) || h && e.equals(h) || e.type == CKEDITOR.NODE_ELEMENT && t && e.equals(n.root))
                }
            }
            if (e && !this._.guardRTL) {
                var f = o.type == CKEDITOR.NODE_ELEMENT ? o : o.getParent(),
                    g = o.type == CKEDITOR.NODE_ELEMENT ? r ? o.getChild(r - 1) : null : o.getPrevious();
                this._.guardRTL = function (e, t) {
                    return !(t && f.equals(e) || g && e.equals(g) || e.type == CKEDITOR.NODE_ELEMENT && t && e.equals(n.root))
                }
            }
            var m = e ? this._.guardRTL : this._.guardLTR;
            for (a = l ? function (e, t) {
                return !1 !== m(e, t) && l(e, t)
            } : m, this.current ? i = this.current[d](!1, c, a) : (e ? i.type == CKEDITOR.NODE_ELEMENT && (i = 0 < s ? i.getChild(s - 1) : !1 === a(i, !0) ? null : i.getPreviousSourceNode(!0, c, a)) : (i = o, i.type == CKEDITOR.NODE_ELEMENT && ((i = i.getChild(r)) || (i = !1 === a(o, !0) ? null : o.getNextSourceNode(!0, c, a)))), i && !1 === a(i) && (i = null)); i && !this._.end;) {
                if (this.current = i, this.evaluator && !1 === this.evaluator(i)) {
                    if (t && this.evaluator)return !1
                } else if (!t)return i;
                i = i[d](!1, c, a)
            }
            return this.end(), this.current = null
        }

        function t(t) {
            for (var n, i = null; n = e.call(this, t);)i = n;
            return i
        }

        CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
            $: function (e) {
                this.range = e, this._ = {}
            }, proto: {
                end: function () {
                    this._.end = 1
                }, next: function () {
                    return e.call(this)
                }, previous: function () {
                    return e.call(this, 1)
                }, checkForward: function () {
                    return !1 !== e.call(this, 0, 1)
                }, checkBackward: function () {
                    return !1 !== e.call(this, 1, 1)
                }, lastForward: function () {
                    return t.call(this)
                }, lastBackward: function () {
                    return t.call(this, 1)
                }, reset: function () {
                    delete this.current, this._ = {}
                }
            }
        });
        var n = {
            block: 1,
            "list-item": 1,
            table: 1,
            "table-row-group": 1,
            "table-header-group": 1,
            "table-footer-group": 1,
            "table-row": 1,
            "table-column-group": 1,
            "table-column": 1,
            "table-cell": 1,
            "table-caption": 1
        }, i = {absolute: 1, fixed: 1};
        CKEDITOR.dom.element.prototype.isBlockBoundary = function (e) {
            return !("none" != this.getComputedStyle("float") || this.getComputedStyle("position") in i || !n[this.getComputedStyle("display")]) || !!(this.is(CKEDITOR.dtd.$block) || e && this.is(e))
        }, CKEDITOR.dom.walker.blockBoundary = function (e) {
            return function (t) {
                return !(t.type == CKEDITOR.NODE_ELEMENT && t.isBlockBoundary(e))
            }
        }, CKEDITOR.dom.walker.listItemBoundary = function () {
            return this.blockBoundary({br: 1})
        }, CKEDITOR.dom.walker.bookmark = function (e, t) {
            function n(e) {
                return e && e.getName && "span" == e.getName() && e.data("cke-bookmark")
            }

            return function (i) {
                var o, a;
                return o = i && i.type != CKEDITOR.NODE_ELEMENT && (a = i.getParent()) && n(a), o = e ? o : o || n(i), !!(t ^ o)
            }
        }, CKEDITOR.dom.walker.whitespaces = function (e) {
            return function (t) {
                var n;
                return t && t.type == CKEDITOR.NODE_TEXT && (n = !CKEDITOR.tools.trim(t.getText()) || CKEDITOR.env.webkit && t.getText() == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE), !!(e ^ n)
            }
        }, CKEDITOR.dom.walker.invisible = function (e) {
            var t = CKEDITOR.dom.walker.whitespaces(), n = CKEDITOR.env.webkit ? 1 : 0;
            return function (i) {
                return t(i) ? i = 1 : (i.type == CKEDITOR.NODE_TEXT && (i = i.getParent()), i = i.$.offsetWidth <= n), !!(e ^ i)
            }
        }, CKEDITOR.dom.walker.nodeType = function (e, t) {
            return function (n) {
                return !!(t ^ n.type == e)
            }
        }, CKEDITOR.dom.walker.bogus = function (e) {
            function t(e) {
                return !a(e) && !r(e)
            }

            return function (n) {
                var i = CKEDITOR.env.needsBrFiller ? n.is && n.is("br") : n.getText && o.test(n.getText());
                return i && (i = n.getParent(), n = n.getNext(t), i = i.isBlockBoundary() && (!n || n.type == CKEDITOR.NODE_ELEMENT && n.isBlockBoundary())), !!(e ^ i)
            }
        }, CKEDITOR.dom.walker.temp = function (e) {
            return function (t) {
                return t.type != CKEDITOR.NODE_ELEMENT && (t = t.getParent()), t = t && t.hasAttribute("data-cke-temp"), !!(e ^ t)
            }
        };
        var o = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, a = CKEDITOR.dom.walker.whitespaces(),
            r = CKEDITOR.dom.walker.bookmark(), s = CKEDITOR.dom.walker.temp(), l = function (e) {
                return r(e) || a(e) || e.type == CKEDITOR.NODE_ELEMENT && e.is(CKEDITOR.dtd.$inline) && !e.is(CKEDITOR.dtd.$empty)
            };
        CKEDITOR.dom.walker.ignored = function (e) {
            return function (t) {
                return t = a(t) || r(t) || s(t), !!(e ^ t)
            }
        };
        var c = CKEDITOR.dom.walker.ignored();
        CKEDITOR.dom.walker.empty = function (e) {
            return function (t) {
                for (var n = 0, i = t.getChildCount(); n < i; ++n)if (!c(t.getChild(n)))return !!e;
                return !e
            }
        };
        var d = CKEDITOR.dom.walker.empty(),
            u = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function (e) {
                var t, n = {};
                for (t in e)CKEDITOR.dtd[t]["#"] && (n[t] = 1);
                return n
            }(CKEDITOR.dtd.$block), {caption: 1, td: 1, th: 1});
        CKEDITOR.dom.walker.editable = function (e) {
            return function (t) {
                return t = !c(t) && !!(t.type == CKEDITOR.NODE_TEXT || t.type == CKEDITOR.NODE_ELEMENT && (t.is(CKEDITOR.dtd.$inline) || t.is("hr") || "false" == t.getAttribute("contenteditable") || !CKEDITOR.env.needsBrFiller && t.is(u) && d(t))), !!(e ^ t)
            }
        }, CKEDITOR.dom.element.prototype.getBogus = function () {
            var e = this;
            do {
                e = e.getPreviousSourceNode()
            } while (l(e));
            return !(!e || !(CKEDITOR.env.needsBrFiller ? e.is && e.is("br") : e.getText && o.test(e.getText()))) && e
        }
    }(), CKEDITOR.dom.range = function (e) {
        this.endOffset = this.endContainer = this.startOffset = this.startContainer = null, this.collapsed = !0;
        var t = e instanceof CKEDITOR.dom.document;
        this.document = t ? e : e.getDocument(), this.root = t ? e.getBody() : e
    }, function () {
        function e(e) {
            e.collapsed = e.startContainer && e.endContainer && e.startContainer.equals(e.endContainer) && e.startOffset == e.endOffset
        }

        function t(e, t, n, i, o) {
            function a(e, t, n, i) {
                var a = n ? e.getPrevious() : e.getNext();
                return i && r ? a : (l || i ? t.append(e.clone(!0, o), n) : (e.remove(), s && t.append(e, n)), a)
            }

            e.optimizeBookmark();
            var r = 0 === t, s = 1 == t, l = 2 == t;
            t = l || s;
            var c, d, u, h, f, g, m = e.startContainer, E = e.endContainer, p = e.startOffset, T = e.endOffset;
            if (l && E.type == CKEDITOR.NODE_TEXT && (m.equals(E) || m.type === CKEDITOR.NODE_ELEMENT && m.getFirst().equals(E))) n.append(e.document.createText(E.substring(p, T))); else {
                E.type == CKEDITOR.NODE_TEXT ? l ? g = !0 : E = E.split(T) : 0 < E.getChildCount() ? T >= E.getChildCount() ? (E = E.getChild(T - 1), d = !0) : E = E.getChild(T) : h = d = !0, m.type == CKEDITOR.NODE_TEXT ? l ? f = !0 : m.split(p) : 0 < m.getChildCount() ? 0 === p ? (m = m.getChild(p), c = !0) : m = m.getChild(p - 1) : u = c = !0;
                for (var C, I, O, D = m.getParents(), R = E.getParents(), v = function () {
                    var e, t, n, i = Math.min(D.length, R.length);
                    for (e = 0; e < i; e++)if (t = D[e], n = R[e], !t.equals(n))return e;
                    return e - 1
                }(), b = D.length - 1, y = R.length - 1, K = n, _ = -1, k = v; k <= b; k++) {
                    for (I = D[k], O = I.getNext(), k != b || I.equals(R[k]) && b < y ? t && (C = K.append(I.clone(0, o))) : c ? a(I, K, !1, u) : f && K.append(e.document.createText(I.substring(p))); O;) {
                        if (O.equals(R[k])) {
                            _ = k;
                            break
                        }
                        O = a(O, K)
                    }
                    K = C
                }
                for (K = n, k = v; k <= y; k++)if (n = R[k], O = n.getPrevious(), n.equals(D[k])) t && (K = K.getChild(0)); else {
                    if (k != y || n.equals(D[k]) && y < b ? t && (C = K.append(n.clone(0, o))) : d ? a(n, K, !1, h) : g && K.append(e.document.createText(n.substring(0, T))), k > _)for (; O;)O = a(O, K, !0);
                    K = C
                }
                l || function () {
                    var t = v - 1, n = u && h && !m.equals(E);
                    t < b - 1 || t < y - 1 || n ? (n ? e.moveToPosition(E, CKEDITOR.POSITION_BEFORE_START) : y == t + 1 && d ? e.moveToPosition(R[t], CKEDITOR.POSITION_BEFORE_END) : e.moveToPosition(R[t + 1], CKEDITOR.POSITION_BEFORE_START), i && (t = D[t + 1]) && t.type == CKEDITOR.NODE_ELEMENT && (n = CKEDITOR.dom.element.createFromHtml('<span data-cke-bookmark="1" style="display:none">&nbsp;</span>', e.document), n.insertAfter(t), t.mergeSiblings(!1), e.moveToBookmark({startNode: n}))) : e.collapse(!0)
                }()
            }
        }

        function n() {
            var e = !1, t = CKEDITOR.dom.walker.whitespaces(), n = CKEDITOR.dom.walker.bookmark(!0),
                i = CKEDITOR.dom.walker.bogus();
            return function (o) {
                return !(!n(o) && !t(o)) || (i(o) && !e ? e = !0 : !(o.type == CKEDITOR.NODE_TEXT && (o.hasAscendant("pre") || CKEDITOR.tools.trim(o.getText()).length) || o.type == CKEDITOR.NODE_ELEMENT && !o.is(a)))
            }
        }

        function i(e) {
            var t = CKEDITOR.dom.walker.whitespaces(), n = CKEDITOR.dom.walker.bookmark(1);
            return function (i) {
                return !(!n(i) && !t(i)) || (!e && r(i) || i.type == CKEDITOR.NODE_ELEMENT && i.is(CKEDITOR.dtd.$removeEmpty))
            }
        }

        function o(e) {
            return function () {
                var t;
                return this[e ? "getPreviousNode" : "getNextNode"](function (e) {
                    return !t && c(e) && (t = e), l(e) && !(r(e) && e.equals(t))
                })
            }
        }

        var a = {
                abbr: 1,
                acronym: 1,
                b: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                q: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                tt: 1,
                u: 1,
                var: 1
            }, r = CKEDITOR.dom.walker.bogus(), s = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, l = CKEDITOR.dom.walker.editable(),
            c = CKEDITOR.dom.walker.ignored(!0);
        CKEDITOR.dom.range.prototype = {
            clone: function () {
                var e = new CKEDITOR.dom.range(this.root);
                return e._setStartContainer(this.startContainer), e.startOffset = this.startOffset, e._setEndContainer(this.endContainer), e.endOffset = this.endOffset, e.collapsed = this.collapsed, e
            }, collapse: function (e) {
                e ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer), this.startOffset = this.endOffset), this.collapsed = !0
            }, cloneContents: function (e) {
                var n = new CKEDITOR.dom.documentFragment(this.document);
                return this.collapsed || t(this, 2, n, !1, void 0 === e || e), n
            }, deleteContents: function (e) {
                this.collapsed || t(this, 0, null, e)
            }, extractContents: function (e, n) {
                var i = new CKEDITOR.dom.documentFragment(this.document);
                return this.collapsed || t(this, 1, i, e, void 0 === n || n), i
            }, createBookmark: function (e) {
                var t, n, i, o, a = this.collapsed;
                return t = this.document.createElement("span"), t.data("cke-bookmark", 1), t.setStyle("display", "none"), t.setHtml("&nbsp;"), e && (i = "cke_bm_" + CKEDITOR.tools.getNextNumber(), t.setAttribute("id", i + (a ? "C" : "S"))), a || (n = t.clone(), n.setHtml("&nbsp;"), e && n.setAttribute("id", i + "E"), o = this.clone(), o.collapse(), o.insertNode(n)), o = this.clone(), o.collapse(!0), o.insertNode(t), n ? (this.setStartAfter(t), this.setEndBefore(n)) : this.moveToPosition(t, CKEDITOR.POSITION_AFTER_END), {
                    startNode: e ? i + (a ? "C" : "S") : t,
                    endNode: e ? i + "E" : n,
                    serializable: e,
                    collapsed: a
                }
            }, createBookmark2: function () {
                function e(e) {
                    var t, i = e.container, o = e.offset;
                    t = i;
                    var a = o;
                    if (t = t.type != CKEDITOR.NODE_ELEMENT || 0 === a || a == t.getChildCount() ? 0 : t.getChild(a - 1).type == CKEDITOR.NODE_TEXT && t.getChild(a).type == CKEDITOR.NODE_TEXT, t && (i = i.getChild(o - 1), o = i.getLength()), i.type == CKEDITOR.NODE_ELEMENT && 0 < o) {
                        e:{
                            for (t = i; o--;)if (0 <= (a = t.getChild(o).getIndex(!0))) {
                                o = a;
                                break e
                            }
                            o = -1
                        }
                        o += 1
                    }
                    if (i.type == CKEDITOR.NODE_TEXT) {
                        for (t = i, a = 0; (t = t.getPrevious()) && t.type == CKEDITOR.NODE_TEXT;)a += t.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE, "").length;
                        t = a, i.getText() ? o += t : (a = i.getPrevious(n), t ? (o = t, i = a ? a.getNext() : i.getParent().getFirst()) : (i = i.getParent(), o = a ? a.getIndex(!0) + 1 : 0))
                    }
                    e.container = i, e.offset = o
                }

                function t(e, t) {
                    var n = t.getCustomData("cke-fillingChar");
                    if (n) {
                        var i = e.container;
                        n.equals(i) && (e.offset -= CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length, 0 >= e.offset && (e.offset = i.getIndex(), e.container = i.getParent()))
                    }
                }

                var n = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0);
                return function (n) {
                    var i = this.collapsed, o = {container: this.startContainer, offset: this.startOffset},
                        a = {container: this.endContainer, offset: this.endOffset};
                    return n && (e(o), t(o, this.root), i || (e(a), t(a, this.root))), {
                        start: o.container.getAddress(n),
                        end: i ? null : a.container.getAddress(n),
                        startOffset: o.offset,
                        endOffset: a.offset,
                        normalized: n,
                        collapsed: i,
                        is2: !0
                    }
                }
            }(), moveToBookmark: function (e) {
                if (e.is2) {
                    var t = this.document.getByAddress(e.start, e.normalized), n = e.startOffset,
                        i = e.end && this.document.getByAddress(e.end, e.normalized);
                    e = e.endOffset, this.setStart(t, n), i ? this.setEnd(i, e) : this.collapse(!0)
                } else t = (n = e.serializable) ? this.document.getById(e.startNode) : e.startNode, e = n ? this.document.getById(e.endNode) : e.endNode, this.setStartBefore(t), t.remove(), e ? (this.setEndBefore(e), e.remove()) : this.collapse(!0)
            }, getBoundaryNodes: function () {
                var e, t = this.startContainer, n = this.endContainer, i = this.startOffset, o = this.endOffset;
                if (t.type == CKEDITOR.NODE_ELEMENT)if ((e = t.getChildCount()) > i) t = t.getChild(i); else if (1 > e) t = t.getPreviousSourceNode(); else {
                    for (t = t.$; t.lastChild;)t = t.lastChild;
                    t = new CKEDITOR.dom.node(t), t = t.getNextSourceNode() || t
                }
                if (n.type == CKEDITOR.NODE_ELEMENT)if ((e = n.getChildCount()) > o) n = n.getChild(o).getPreviousSourceNode(!0); else if (1 > e) n = n.getPreviousSourceNode(); else {
                    for (n = n.$; n.lastChild;)n = n.lastChild;
                    n = new CKEDITOR.dom.node(n)
                }
                return t.getPosition(n) & CKEDITOR.POSITION_FOLLOWING && (t = n), {startNode: t, endNode: n}
            }, getCommonAncestor: function (e, t) {
                var n = this.startContainer, i = this.endContainer,
                    n = n.equals(i) ? e && n.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? n.getChild(this.startOffset) : n : n.getCommonAncestor(i);
                return t && !n.is ? n.getParent() : n
            }, optimize: function () {
                var e = this.startContainer, t = this.startOffset;
                e.type != CKEDITOR.NODE_ELEMENT && (t ? t >= e.getLength() && this.setStartAfter(e) : this.setStartBefore(e)), e = this.endContainer, t = this.endOffset, e.type != CKEDITOR.NODE_ELEMENT && (t ? t >= e.getLength() && this.setEndAfter(e) : this.setEndBefore(e))
            }, optimizeBookmark: function () {
                var e = this.startContainer, t = this.endContainer;
                e.is && e.is("span") && e.data("cke-bookmark") && this.setStartAt(e, CKEDITOR.POSITION_BEFORE_START), t && t.is && t.is("span") && t.data("cke-bookmark") && this.setEndAt(t, CKEDITOR.POSITION_AFTER_END)
            }, trim: function (e, t) {
                var n = this.startContainer, i = this.startOffset, o = this.collapsed;
                if ((!e || o) && n && n.type == CKEDITOR.NODE_TEXT) {
                    if (i)if (i >= n.getLength()) i = n.getIndex() + 1, n = n.getParent(); else {
                        var a = n.split(i), i = n.getIndex() + 1, n = n.getParent();
                        this.startContainer.equals(this.endContainer) ? this.setEnd(a, this.endOffset - this.startOffset) : n.equals(this.endContainer) && (this.endOffset += 1)
                    } else i = n.getIndex(), n = n.getParent();
                    if (this.setStart(n, i), o)return void this.collapse(!0)
                }
                n = this.endContainer, i = this.endOffset, t || o || !n || n.type != CKEDITOR.NODE_TEXT || (i ? (i >= n.getLength() || n.split(i), i = n.getIndex() + 1) : i = n.getIndex(), n = n.getParent(), this.setEnd(n, i))
            }, enlarge: function (e, t) {
                function n(e) {
                    return e && e.type == CKEDITOR.NODE_ELEMENT && e.hasAttribute("contenteditable") ? null : e
                }

                var i = new RegExp(/[^\s\ufeff]/);
                switch (e) {
                    case CKEDITOR.ENLARGE_INLINE:
                        var o = 1;
                    case CKEDITOR.ENLARGE_ELEMENT:
                        var a = function (e, t) {
                            var n = new CKEDITOR.dom.range(g);
                            n.setStart(e, t), n.setEndAt(g, CKEDITOR.POSITION_BEFORE_END);
                            var o, n = new CKEDITOR.dom.walker(n);
                            for (n.guard = function (e) {
                                return !(e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary())
                            }; o = n.next();) {
                                if (o.type != CKEDITOR.NODE_TEXT)return !1;
                                if (h = o != e ? o.getText() : o.substring(t), i.test(h))return !1
                            }
                            return !0
                        };
                        if (this.collapsed)break;
                        var r, s, l, c, d, u, h, f = this.getCommonAncestor(), g = this.root, m = !1;
                        u = this.startContainer;
                        var E = this.startOffset;
                        for (u.type == CKEDITOR.NODE_TEXT ? (E && (u = !CKEDITOR.tools.trim(u.substring(0, E)).length && u, m = !!u), u && ((c = u.getPrevious()) || (l = u.getParent()))) : (E && (c = u.getChild(E - 1) || u.getLast()), c || (l = u)), l = n(l); l || c;) {
                            if (l && !c) {
                                if (!d && l.equals(f) && (d = !0), o ? l.isBlockBoundary() : !g.contains(l))break;
                                m && "inline" == l.getComputedStyle("display") || (m = !1, d ? r = l : this.setStartBefore(l)), c = l.getPrevious()
                            }
                            for (; c;)if (u = !1, c.type == CKEDITOR.NODE_COMMENT) c = c.getPrevious(); else {
                                if (c.type == CKEDITOR.NODE_TEXT) h = c.getText(), i.test(h) && (c = null), u = /[\s\ufeff]$/.test(h); else if ((c.$.offsetWidth > (CKEDITOR.env.webkit ? 1 : 0) || t && c.is("br")) && !c.data("cke-bookmark"))if (m && CKEDITOR.dtd.$removeEmpty[c.getName()]) {
                                    if (h = c.getText(), i.test(h)) c = null; else for (var p, E = c.$.getElementsByTagName("*"), T = 0; p = E[T++];)if (!CKEDITOR.dtd.$removeEmpty[p.nodeName.toLowerCase()]) {
                                        c = null;
                                        break
                                    }
                                    c && (u = !!h.length)
                                } else c = null;
                                if (u && (m ? d ? r = l : l && this.setStartBefore(l) : m = !0), c) {
                                    if (u = c.getPrevious(), !l && !u) {
                                        l = c, c = null;
                                        break
                                    }
                                    c = u
                                } else l = null
                            }
                            l && (l = n(l.getParent()))
                        }
                        for (u = this.endContainer, E = this.endOffset, l = c = null, d = m = !1, u.type == CKEDITOR.NODE_TEXT ? CKEDITOR.tools.trim(u.substring(E)).length ? m = !0 : (m = !u.getLength(), E == u.getLength() ? (c = u.getNext()) || (l = u.getParent()) : a(u, E) && (l = u.getParent())) : (c = u.getChild(E)) || (l = u); l || c;) {
                            if (l && !c) {
                                if (!d && l.equals(f) && (d = !0), o ? l.isBlockBoundary() : !g.contains(l))break;
                                m && "inline" == l.getComputedStyle("display") || (m = !1, d ? s = l : l && this.setEndAfter(l)), c = l.getNext()
                            }
                            for (; c;) {
                                if (u = !1, c.type == CKEDITOR.NODE_TEXT) h = c.getText(), a(c, 0) || (c = null), u = /^[\s\ufeff]/.test(h); else if (c.type == CKEDITOR.NODE_ELEMENT) {
                                    if ((0 < c.$.offsetWidth || t && c.is("br")) && !c.data("cke-bookmark"))if (m && CKEDITOR.dtd.$removeEmpty[c.getName()]) {
                                        if (h = c.getText(), i.test(h)) c = null; else for (E = c.$.getElementsByTagName("*"), T = 0; p = E[T++];)if (!CKEDITOR.dtd.$removeEmpty[p.nodeName.toLowerCase()]) {
                                            c = null;
                                            break
                                        }
                                        c && (u = !!h.length)
                                    } else c = null
                                } else u = 1;
                                if (u && m && (d ? s = l : this.setEndAfter(l)), c) {
                                    if (u = c.getNext(), !l && !u) {
                                        l = c, c = null;
                                        break
                                    }
                                    c = u
                                } else l = null
                            }
                            l && (l = n(l.getParent()))
                        }
                        r && s && (f = r.contains(s) ? s : r, this.setStartBefore(f), this.setEndAfter(f));
                        break;
                    case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
                    case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
                        l = new CKEDITOR.dom.range(this.root), g = this.root, l.setStartAt(g, CKEDITOR.POSITION_AFTER_START), l.setEnd(this.startContainer, this.startOffset), l = new CKEDITOR.dom.walker(l);
                        var C, I,
                            O = CKEDITOR.dom.walker.blockBoundary(e == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? {br: 1} : null),
                            D = null, R = function (e) {
                                if (e.type == CKEDITOR.NODE_ELEMENT && "false" == e.getAttribute("contenteditable"))if (D) {
                                    if (D.equals(e))return void(D = null)
                                } else D = e; else if (D)return;
                                var t = O(e);
                                return t || (C = e), t
                            }, o = function (e) {
                                var t = R(e);
                                return !t && e.is && e.is("br") && (I = e), t
                            };
                        if (l.guard = R, l = l.lastBackward(), C = C || g, this.setStartAt(C, !C.is("br") && (!l && this.checkStartOfBlock() || l && C.contains(l)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END), e == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
                            l = this.clone(), l = new CKEDITOR.dom.walker(l);
                            var v = CKEDITOR.dom.walker.whitespaces(), b = CKEDITOR.dom.walker.bookmark();
                            if (l.evaluator = function (e) {
                                    return !v(e) && !b(e)
                                }, (l = l.previous()) && l.type == CKEDITOR.NODE_ELEMENT && l.is("br"))break
                        }
                        l = this.clone(), l.collapse(), l.setEndAt(g, CKEDITOR.POSITION_BEFORE_END), l = new CKEDITOR.dom.walker(l), l.guard = e == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? o : R, C = D = I = null, l = l.lastForward(), C = C || g, this.setEndAt(C, !l && this.checkEndOfBlock() || l && C.contains(l) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START), I && this.setEndAfter(I)
                }
            }, shrink: function (e, t, n) {
                var i = "boolean" == typeof n ? n : !n || "boolean" != typeof n.shrinkOnBlockBoundary || n.shrinkOnBlockBoundary,
                    o = n && n.skipBogus;
                if (!this.collapsed) {
                    e = e || CKEDITOR.SHRINK_TEXT;
                    var a = this.clone(), r = this.startContainer, s = this.endContainer, l = this.startOffset,
                        c = this.endOffset, d = n = 1;
                    r && r.type == CKEDITOR.NODE_TEXT && (l ? l >= r.getLength() ? a.setStartAfter(r) : (a.setStartBefore(r), n = 0) : a.setStartBefore(r)), s && s.type == CKEDITOR.NODE_TEXT && (c ? c >= s.getLength() ? a.setEndAfter(s) : (a.setEndAfter(s), d = 0) : a.setEndBefore(s));
                    var a = new CKEDITOR.dom.walker(a), u = CKEDITOR.dom.walker.bookmark(),
                        h = CKEDITOR.dom.walker.bogus();
                    a.evaluator = function (t) {
                        return t.type == (e == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT)
                    };
                    var f;
                    return a.guard = function (t, n) {
                        return !!(o && h(t) || u(t)) || !(e == CKEDITOR.SHRINK_ELEMENT && t.type == CKEDITOR.NODE_TEXT || n && t.equals(f) || !1 === i && t.type == CKEDITOR.NODE_ELEMENT && t.isBlockBoundary() || t.type == CKEDITOR.NODE_ELEMENT && t.hasAttribute("contenteditable")) && (n || t.type != CKEDITOR.NODE_ELEMENT || (f = t), !0)
                    }, n && (r = a[e == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(r, t ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START), d && (a.reset(), (a = a[e == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(a, t ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END)), !(!n && !d)
                }
            }, insertNode: function (e) {
                this.optimizeBookmark(), this.trim(!1, !0);
                var t = this.startContainer, n = t.getChild(this.startOffset);
                n ? e.insertBefore(n) : t.append(e), e.getParent() && e.getParent().equals(this.endContainer) && this.endOffset++, this.setStartBefore(e)
            }, moveToPosition: function (e, t) {
                this.setStartAt(e, t), this.collapse(!0)
            }, moveToRange: function (e) {
                this.setStart(e.startContainer, e.startOffset), this.setEnd(e.endContainer, e.endOffset)
            }, selectNodeContents: function (e) {
                this.setStart(e, 0), this.setEnd(e, e.type == CKEDITOR.NODE_TEXT ? e.getLength() : e.getChildCount())
            }, setStart: function (t, n) {
                t.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[t.getName()] && (n = t.getIndex(), t = t.getParent()), this._setStartContainer(t), this.startOffset = n, this.endContainer || (this._setEndContainer(t), this.endOffset = n), e(this)
            }, setEnd: function (t, n) {
                t.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[t.getName()] && (n = t.getIndex() + 1, t = t.getParent()), this._setEndContainer(t), this.endOffset = n, this.startContainer || (this._setStartContainer(t), this.startOffset = n), e(this)
            }, setStartAfter: function (e) {
                this.setStart(e.getParent(), e.getIndex() + 1)
            }, setStartBefore: function (e) {
                this.setStart(e.getParent(), e.getIndex())
            }, setEndAfter: function (e) {
                this.setEnd(e.getParent(), e.getIndex() + 1)
            }, setEndBefore: function (e) {
                this.setEnd(e.getParent(), e.getIndex())
            }, setStartAt: function (t, n) {
                switch (n) {
                    case CKEDITOR.POSITION_AFTER_START:
                        this.setStart(t, 0);
                        break;
                    case CKEDITOR.POSITION_BEFORE_END:
                        t.type == CKEDITOR.NODE_TEXT ? this.setStart(t, t.getLength()) : this.setStart(t, t.getChildCount());
                        break;
                    case CKEDITOR.POSITION_BEFORE_START:
                        this.setStartBefore(t);
                        break;
                    case CKEDITOR.POSITION_AFTER_END:
                        this.setStartAfter(t)
                }
                e(this)
            }, setEndAt: function (t, n) {
                switch (n) {
                    case CKEDITOR.POSITION_AFTER_START:
                        this.setEnd(t, 0);
                        break;
                    case CKEDITOR.POSITION_BEFORE_END:
                        t.type == CKEDITOR.NODE_TEXT ? this.setEnd(t, t.getLength()) : this.setEnd(t, t.getChildCount());
                        break;
                    case CKEDITOR.POSITION_BEFORE_START:
                        this.setEndBefore(t);
                        break;
                    case CKEDITOR.POSITION_AFTER_END:
                        this.setEndAfter(t)
                }
                e(this)
            }, fixBlock: function (e, t) {
                var n = this.createBookmark(), i = this.document.createElement(t);
                this.collapse(e), this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), this.extractContents().appendTo(i), i.trim(), this.insertNode(i);
                var o = i.getBogus();
                return o && o.remove(), i.appendBogus(), this.moveToBookmark(n), i
            }, splitBlock: function (e, t) {
                var n = new CKEDITOR.dom.elementPath(this.startContainer, this.root),
                    i = new CKEDITOR.dom.elementPath(this.endContainer, this.root), o = n.block, a = i.block, r = null;
                return n.blockLimit.equals(i.blockLimit) ? ("br" != e && (o || (o = this.fixBlock(!0, e), a = new CKEDITOR.dom.elementPath(this.endContainer, this.root).block), a || (a = this.fixBlock(!1, e))), n = o && this.checkStartOfBlock(), i = a && this.checkEndOfBlock(), this.deleteContents(), o && o.equals(a) && (i ? (r = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), a = null) : n ? (r = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(o, CKEDITOR.POSITION_BEFORE_START), o = null) : (a = this.splitElement(o, t || !1), o.is("ul", "ol") || o.appendBogus())), {
                    previousBlock: o,
                    nextBlock: a,
                    wasStartOfBlock: n,
                    wasEndOfBlock: i,
                    elementPath: r
                }) : null
            }, splitElement: function (e, t) {
                if (!this.collapsed)return null;
                this.setEndAt(e, CKEDITOR.POSITION_BEFORE_END);
                var n = this.extractContents(!1, t || !1), i = e.clone(!1, t || !1);
                return n.appendTo(i), i.insertAfter(e), this.moveToPosition(e, CKEDITOR.POSITION_AFTER_END), i
            }, removeEmptyBlocksAtEnd: function () {
                function e(e) {
                    return function (i) {
                        return !(t(i) || n(i) || i.type == CKEDITOR.NODE_ELEMENT && i.isEmptyInlineRemoveable() || e.is("table") && i.is("caption"))
                    }
                }

                var t = CKEDITOR.dom.walker.whitespaces(), n = CKEDITOR.dom.walker.bookmark(!1);
                return function (t) {
                    for (var n, i = this.createBookmark(), o = this[t ? "endPath" : "startPath"](), a = o.block || o.blockLimit; a && !a.equals(o.root) && !a.getFirst(e(a));)n = a.getParent(), this[t ? "setEndAt" : "setStartAt"](a, CKEDITOR.POSITION_AFTER_END), a.remove(1), a = n;
                    this.moveToBookmark(i)
                }
            }(), startPath: function () {
                return new CKEDITOR.dom.elementPath(this.startContainer, this.root)
            }, endPath: function () {
                return new CKEDITOR.dom.elementPath(this.endContainer, this.root)
            }, checkBoundaryOfElement: function (e, t) {
                var n = t == CKEDITOR.START, o = this.clone();
                return o.collapse(n), o[n ? "setStartAt" : "setEndAt"](e, n ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END), o = new CKEDITOR.dom.walker(o), o.evaluator = i(n), o[n ? "checkBackward" : "checkForward"]()
            }, checkStartOfBlock: function () {
                var e = this.startContainer, t = this.startOffset;
                return CKEDITOR.env.ie && t && e.type == CKEDITOR.NODE_TEXT && (e = CKEDITOR.tools.ltrim(e.substring(0, t)), s.test(e) && this.trim(0, 1)), this.trim(), e = new CKEDITOR.dom.elementPath(this.startContainer, this.root), t = this.clone(), t.collapse(!0), t.setStartAt(e.block || e.blockLimit, CKEDITOR.POSITION_AFTER_START), e = new CKEDITOR.dom.walker(t), e.evaluator = n(), e.checkBackward()
            }, checkEndOfBlock: function () {
                var e = this.endContainer, t = this.endOffset;
                return CKEDITOR.env.ie && e.type == CKEDITOR.NODE_TEXT && (e = CKEDITOR.tools.rtrim(e.substring(t)), s.test(e) && this.trim(1, 0)), this.trim(), e = new CKEDITOR.dom.elementPath(this.endContainer, this.root), t = this.clone(), t.collapse(!1), t.setEndAt(e.block || e.blockLimit, CKEDITOR.POSITION_BEFORE_END), e = new CKEDITOR.dom.walker(t), e.evaluator = n(), e.checkForward()
            }, getPreviousNode: function (e, t, n) {
                var i = this.clone();
                return i.collapse(1), i.setStartAt(n || this.root, CKEDITOR.POSITION_AFTER_START), n = new CKEDITOR.dom.walker(i), n.evaluator = e, n.guard = t, n.previous()
            }, getNextNode: function (e, t, n) {
                var i = this.clone();
                return i.collapse(), i.setEndAt(n || this.root, CKEDITOR.POSITION_BEFORE_END), n = new CKEDITOR.dom.walker(i), n.evaluator = e, n.guard = t, n.next()
            }, checkReadOnly: function () {
                function e(e, t) {
                    for (; e;) {
                        if (e.type == CKEDITOR.NODE_ELEMENT) {
                            if ("false" == e.getAttribute("contentEditable") && !e.data("cke-editable"))return 0;
                            if (e.is("html") || "true" == e.getAttribute("contentEditable") && (e.contains(t) || e.equals(t)))break
                        }
                        e = e.getParent()
                    }
                    return 1
                }

                return function () {
                    var t = this.startContainer, n = this.endContainer;
                    return !(e(t, n) && e(n, t))
                }
            }(), moveToElementEditablePosition: function (e, t) {
                if (e.type == CKEDITOR.NODE_ELEMENT && !e.isEditable(!1))return this.moveToPosition(e, t ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START), !0;
                for (var n = 0; e;) {
                    if (e.type == CKEDITOR.NODE_TEXT) {
                        t && this.endContainer && this.checkEndOfBlock() && s.test(e.getText()) ? this.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(e, t ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START), n = 1;
                        break
                    }
                    if (e.type == CKEDITOR.NODE_ELEMENT)if (e.isEditable()) this.moveToPosition(e, t ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), n = 1; else if (t && e.is("br") && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START); else if ("false" == e.getAttribute("contenteditable") && e.is(CKEDITOR.dtd.$block))return this.setStartBefore(e), this.setEndAfter(e), !0;
                    var i = e, o = n, a = void 0;
                    i.type == CKEDITOR.NODE_ELEMENT && i.isEditable(!1) && (a = i[t ? "getLast" : "getFirst"](c)), o || a || (a = i[t ? "getPrevious" : "getNext"](c)), e = a
                }
                return !!n
            }, moveToClosestEditablePosition: function (e, t) {
                var n, i, o, a = 0, r = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START];
                return e ? (n = new CKEDITOR.dom.range(this.root), n.moveToPosition(e, r[t ? 0 : 1])) : n = this.clone(), e && !e.is(CKEDITOR.dtd.$block) ? a = 1 : (i = n[t ? "getNextEditableNode" : "getPreviousEditableNode"]()) && (a = 1, (o = i.type == CKEDITOR.NODE_ELEMENT) && i.is(CKEDITOR.dtd.$block) && "false" == i.getAttribute("contenteditable") ? (n.setStartAt(i, CKEDITOR.POSITION_BEFORE_START), n.setEndAt(i, CKEDITOR.POSITION_AFTER_END)) : !CKEDITOR.env.needsBrFiller && o && i.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (n.setEnd(i, 0), n.collapse()) : n.moveToPosition(i, r[t ? 1 : 0])), a && this.moveToRange(n), !!a
            }, moveToElementEditStart: function (e) {
                return this.moveToElementEditablePosition(e)
            }, moveToElementEditEnd: function (e) {
                return this.moveToElementEditablePosition(e, !0)
            }, getEnclosedNode: function () {
                var e = this.clone();
                if (e.optimize(), e.startContainer.type != CKEDITOR.NODE_ELEMENT || e.endContainer.type != CKEDITOR.NODE_ELEMENT)return null;
                var e = new CKEDITOR.dom.walker(e), t = CKEDITOR.dom.walker.bookmark(!1, !0),
                    n = CKEDITOR.dom.walker.whitespaces(!0);
                e.evaluator = function (e) {
                    return n(e) && t(e)
                };
                var i = e.next();
                return e.reset(), i && i.equals(e.previous()) ? i : null
            }, getTouchedStartNode: function () {
                var e = this.startContainer;
                return this.collapsed || e.type != CKEDITOR.NODE_ELEMENT ? e : e.getChild(this.startOffset) || e
            }, getTouchedEndNode: function () {
                var e = this.endContainer;
                return this.collapsed || e.type != CKEDITOR.NODE_ELEMENT ? e : e.getChild(this.endOffset - 1) || e
            }, getNextEditableNode: o(), getPreviousEditableNode: o(1), _getTableElement: function (e) {
                e = e || {td: 1, th: 1, tr: 1, tbody: 1, thead: 1, tfoot: 1, table: 1};
                var t = this.startContainer, n = this.endContainer, i = t.getAscendant("table", !0),
                    o = n.getAscendant("table", !0);
                return CKEDITOR.env.safari && i && n.equals(this.root) ? t.getAscendant(e, !0) : this.getEnclosedNode() ? this.getEnclosedNode().getAscendant(e, !0) : i && o && (i.equals(o) || i.contains(o) || o.contains(i)) ? t.getAscendant(e, !0) : null
            }, scrollIntoView: function () {
                var e, t, n, i = new CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", this.document),
                    o = this.clone();
                o.optimize(), (n = o.startContainer.type == CKEDITOR.NODE_TEXT) ? (t = o.startContainer.getText(), e = o.startContainer.split(o.startOffset), i.insertAfter(o.startContainer)) : o.insertNode(i), i.scrollIntoView(), n && (o.startContainer.setText(t), e.remove()), i.remove()
            }, _setStartContainer: function (e) {
                this.startContainer = e
            }, _setEndContainer: function (e) {
                this.endContainer = e
            }, _find: function (e, t) {
                var n, i, o, a, r = this.getCommonAncestor(), s = this.getBoundaryNodes(), l = [];
                if (r && r.find)for (i = r.find(e), n = 0; n < i.count(); n++)r = i.getItem(n), (t || !r.isReadOnly()) && (o = r.getPosition(s.startNode) & CKEDITOR.POSITION_FOLLOWING || s.startNode.equals(r), a = r.getPosition(s.endNode) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IS_CONTAINED || s.endNode.equals(r), o && a && l.push(r));
                return l
            }
        }, CKEDITOR.dom.range.mergeRanges = function (e) {
            return CKEDITOR.tools.array.reduce(e, function (e, t) {
                var n = e[e.length - 1], i = !1;
                if (t = t.clone(), t.enlarge(CKEDITOR.ENLARGE_ELEMENT), n) {
                    var o = new CKEDITOR.dom.range(t.root), i = new CKEDITOR.dom.walker(o),
                        a = CKEDITOR.dom.walker.whitespaces();
                    for (o.setStart(n.endContainer, n.endOffset), o.setEnd(t.startContainer, t.startOffset), o = i.next(); a(o) || t.endContainer.equals(o);)o = i.next();
                    i = !o
                }
                return i ? n.setEnd(t.endContainer, t.endOffset) : e.push(t), e
            }, [])
        }
    }(), CKEDITOR.POSITION_AFTER_START = 1, CKEDITOR.POSITION_BEFORE_END = 2, CKEDITOR.POSITION_BEFORE_START = 3, CKEDITOR.POSITION_AFTER_END = 4, CKEDITOR.ENLARGE_ELEMENT = 1, CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2, CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3, CKEDITOR.ENLARGE_INLINE = 4, CKEDITOR.START = 1, CKEDITOR.END = 2, CKEDITOR.SHRINK_ELEMENT = 1, CKEDITOR.SHRINK_TEXT = 2, function () {
        function e(e) {
            1 > arguments.length || (this.range = e, this.forceBrBreak = 0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ || (this._ = {}))
        }

        function t(e) {
            var t = [];
            return e.forEach(function (e) {
                if ("true" == e.getAttribute("contenteditable"))return t.push(e), !1
            }, CKEDITOR.NODE_ELEMENT, !0), t
        }

        function n(e, i, o, a) {
            e:{
                null == a && (a = t(o));
                for (var r; r = a.shift();)if (r.getDtd().p) {
                    a = {element: r, remaining: a};
                    break e
                }
                a = null
            }
            return a ? (r = CKEDITOR.filter.instances[a.element.data("cke-filter")]) && !r.check(i) ? n(e, i, o, a.remaining) : (i = new CKEDITOR.dom.range(a.element), i.selectNodeContents(a.element), i = i.createIterator(), i.enlargeBr = e.enlargeBr, i.enforceRealBlocks = e.enforceRealBlocks, i.activeFilter = i.filter = r, e._.nestedEditable = {
                element: a.element,
                container: o,
                remaining: a.remaining,
                iterator: i
            }, 1) : 0
        }

        function i(e, t, n) {
            return !!t && (e = e.clone(), e.collapse(!n), e.checkBoundaryOfElement(t, n ? CKEDITOR.START : CKEDITOR.END))
        }

        var o = /^[\r\n\t ]+$/, a = CKEDITOR.dom.walker.bookmark(!1, !0), r = CKEDITOR.dom.walker.whitespaces(!0),
            s = function (e) {
                return a(e) && r(e)
            }, l = {dd: 1, dt: 1, li: 1};
        e.prototype = {
            getNextParagraph: function (e) {
                var t, r, c, d, u;
                if (e = e || "p", this._.nestedEditable) {
                    if (t = this._.nestedEditable.iterator.getNextParagraph(e))return this.activeFilter = this._.nestedEditable.iterator.activeFilter, t;
                    if (this.activeFilter = this.filter, n(this, e, this._.nestedEditable.container, this._.nestedEditable.remaining))return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(e);
                    this._.nestedEditable = null
                }
                if (!this.range.root.getDtd()[e])return null;
                if (!this._.started) {
                    var h = this.range.clone();
                    r = h.startPath();
                    var f = h.endPath(), g = !h.collapsed && i(h, r.block), m = !h.collapsed && i(h, f.block, 1);
                    h.shrink(CKEDITOR.SHRINK_ELEMENT, !0), g && h.setStartAt(r.block, CKEDITOR.POSITION_BEFORE_END), m && h.setEndAt(f.block, CKEDITOR.POSITION_AFTER_START), r = h.endContainer.hasAscendant("pre", !0) || h.startContainer.hasAscendant("pre", !0), h.enlarge(this.forceBrBreak && !r || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS), h.collapsed || (r = new CKEDITOR.dom.walker(h.clone()), f = CKEDITOR.dom.walker.bookmark(!0, !0), r.evaluator = f, this._.nextNode = r.next(), r = new CKEDITOR.dom.walker(h.clone()), r.evaluator = f, r = r.previous(), this._.lastNode = r.getNextSourceNode(!0, null, h.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (f = this.range.clone(), f.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), f.checkEndOfBlock() && (f = new CKEDITOR.dom.elementPath(f.endContainer, f.root), this._.lastNode = (f.block || f.blockLimit).getNextSourceNode(!0))), this._.lastNode && h.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = h.document.createText(""), this._.lastNode.insertAfter(r)), h = null), this._.started = 1, r = h
                }
                for (f = this._.nextNode, h = this._.lastNode, this._.nextNode = null; f;) {
                    var g = 0, m = f.hasAscendant("pre"), E = f.type != CKEDITOR.NODE_ELEMENT, p = 0;
                    if (E) f.type == CKEDITOR.NODE_TEXT && o.test(f.getText()) && (E = 0); else {
                        var T = f.getName();
                        if (CKEDITOR.dtd.$block[T] && "false" == f.getAttribute("contenteditable")) {
                            t = f, n(this, e, t);
                            break
                        }
                        if (f.isBlockBoundary(this.forceBrBreak && !m && {br: 1})) {
                            if ("br" == T) E = 1; else if (!r && !f.getChildCount() && "hr" != T) {
                                t = f, c = f.equals(h);
                                break
                            }
                            r && (r.setEndAt(f, CKEDITOR.POSITION_BEFORE_START), "br" != T && (this._.nextNode = f)), g = 1
                        } else {
                            if (f.getFirst()) {
                                r || (r = this.range.clone(), r.setStartAt(f, CKEDITOR.POSITION_BEFORE_START)), f = f.getFirst();
                                continue
                            }
                            E = 1
                        }
                    }
                    if (E && !r && (r = this.range.clone(), r.setStartAt(f, CKEDITOR.POSITION_BEFORE_START)), c = (!g || E) && f.equals(h), r && !g)for (; !f.getNext(s) && !c;) {
                        if (T = f.getParent(), T.isBlockBoundary(this.forceBrBreak && !m && {br: 1})) {
                            g = 1, E = 0, c || T.equals(h), r.setEndAt(T, CKEDITOR.POSITION_BEFORE_END);
                            break
                        }
                        f = T, E = 1, c = f.equals(h), p = 1
                    }
                    if (E && r.setEndAt(f, CKEDITOR.POSITION_AFTER_END), f = this._getNextSourceNode(f, p, h), (c = !f) || g && r)break
                }
                if (!t) {
                    if (!r)return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null;
                    t = new CKEDITOR.dom.elementPath(r.startContainer, r.root), f = t.blockLimit, g = {
                        div: 1,
                        th: 1,
                        td: 1
                    }, t = t.block, !t && f && !this.enforceRealBlocks && g[f.getName()] && r.checkStartOfBlock() && r.checkEndOfBlock() && !f.equals(r.root) ? t = f : !t || this.enforceRealBlocks && t.is(l) ? (t = this.range.document.createElement(e), r.extractContents().appendTo(t), t.trim(), r.insertNode(t), d = u = !0) : "li" != t.getName() ? r.checkStartOfBlock() && r.checkEndOfBlock() || (t = t.clone(!1), r.extractContents().appendTo(t), t.trim(), u = r.splitBlock(), d = !u.wasStartOfBlock, u = !u.wasEndOfBlock, r.insertNode(t)) : c || (this._.nextNode = t.equals(h) ? null : this._getNextSourceNode(r.getBoundaryNodes().endNode, 1, h))
                }
                return d && (d = t.getPrevious()) && d.type == CKEDITOR.NODE_ELEMENT && ("br" == d.getName() ? d.remove() : d.getLast() && "br" == d.getLast().$.nodeName.toLowerCase() && d.getLast().remove()), u && (d = t.getLast()) && d.type == CKEDITOR.NODE_ELEMENT && "br" == d.getName() && (!CKEDITOR.env.needsBrFiller || d.getPrevious(a) || d.getNext(a)) && d.remove(), this._.nextNode || (this._.nextNode = c || t.equals(h) || !h ? null : this._getNextSourceNode(t, 1, h)), t
            }, _getNextSourceNode: function (e, t, n) {
                function i(e) {
                    return !(e.equals(n) || e.equals(o))
                }

                var o = this.range.root;
                for (e = e.getNextSourceNode(t, null, i); !a(e);)e = e.getNextSourceNode(t, null, i);
                return e
            }
        }, CKEDITOR.dom.range.prototype.createIterator = function () {
            return new e(this)
        }
    }(), CKEDITOR.command = function (e, t) {
        this.uiItems = [], this.exec = function (n) {
            return !(this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) && (this.editorFocus && e.focus(), !1 === this.fire("exec") || !1 !== t.exec.call(this, e, n))
        }, this.refresh = function (e, n) {
            return !(this.readOnly || !e.readOnly) || (this.context && !n.isContextFor(this.context) || !this.checkAllowed(!0) ? (this.disable(), !0) : (this.startDisabled || this.enable(), this.modes && !this.modes[e.mode] && this.disable(), !1 === this.fire("refresh", {
                    editor: e,
                    path: n
                }) || t.refresh && !1 !== t.refresh.apply(this, arguments)))
        };
        var n;
        this.checkAllowed = function (t) {
            return t || "boolean" != typeof n ? n = e.activeFilter.checkFeature(this) : n
        }, CKEDITOR.tools.extend(this, t, {
            modes: {wysiwyg: 1},
            editorFocus: 1,
            contextSensitive: !!t.context,
            state: CKEDITOR.TRISTATE_DISABLED
        }), CKEDITOR.event.call(this)
    }, CKEDITOR.command.prototype = {
        enable: function () {
            this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && void 0 !== this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF)
        }, disable: function () {
            this.setState(CKEDITOR.TRISTATE_DISABLED)
        }, setState: function (e) {
            return !(this.state == e || e != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) && (this.previousState = this.state, this.state = e, this.fire("state"), !0)
        }, toggleState: function () {
            this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
        }
    }, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P = 1, CKEDITOR.ENTER_BR = 2, CKEDITOR.ENTER_DIV = 3, CKEDITOR.config = {
        customConfig: "config.js",
        autoUpdateElement: !0,
        language: "",
        defaultLanguage: "en",
        contentsLangDirection: "",
        enterMode: CKEDITOR.ENTER_P,
        forceEnterMode: !1,
        shiftEnterMode: CKEDITOR.ENTER_BR,
        docType: "<!DOCTYPE html>",
        bodyId: "",
        bodyClass: "",
        fullPage: !1,
        height: 200,
        contentsCss: CKEDITOR.getUrl("contents.css"),
        extraPlugins: "",
        removePlugins: "",
        protectedSource: [],
        tabIndex: 0,
        width: "",
        baseFloatZIndex: 1e4,
        blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85]
    }, function () {
        function e(e, t, n, i, o) {
            var a, s;
            e = [];
            for (a in t) {
                s = t[a], s = "boolean" == typeof s ? {} : "function" == typeof s ? {match: s} : K(s), "$" != a.charAt(0) && (s.elements = a), n && (s.featureName = n.toLowerCase());
                var l = s;
                l.elements = r(l.elements, /\s+/) || null, l.propertiesOnly = l.propertiesOnly || !0 === l.elements;
                var c = /\s*,\s*/, d = void 0;
                for (d in N) {
                    l[d] = r(l[d], c) || null;
                    var u = l, h = S[d], f = r(l[S[d]], c), g = l[d], m = [], E = !0, T = void 0;
                    f ? E = !1 : f = {};
                    for (T in g)"!" == T.charAt(0) && (T = T.slice(1), m.push(T), f[T] = !0, E = !1);
                    for (; T = m.pop();)g[T] = g["!" + T], delete g["!" + T];
                    u[h] = !E && f || null
                }
                l.match = l.match || null, i.push(s), e.push(s)
            }
            t = o.elements, o = o.generic;
            var C;
            for (n = 0, i = e.length; n < i; ++n) {
                a = K(e[n]), s = !0 === a.classes || !0 === a.styles || !0 === a.attributes, l = a, d = h = c = void 0;
                for (c in N)l[c] = p(l[c]);
                u = !0;
                for (d in S) {
                    c = S[d], h = l[c], f = [], g = void 0;
                    for (g in h)-1 < g.indexOf("*") ? f.push(new RegExp("^" + g.replace(/\*/g, ".*") + "$")) : f.push(g);
                    h = f, h.length && (l[c] = h, u = !1)
                }
                if (l.nothingRequired = u, l.noProperties = !(l.attributes || l.classes || l.styles), !0 === a.elements || null === a.elements) o[s ? "unshift" : "push"](a); else for (C in l = a.elements, delete a.elements, l)t[C] ? t[C][s ? "unshift" : "push"](a) : t[C] = [a]
            }
        }

        function t(e, t, i, o) {
            if ((!e.match || e.match(t)) && (o || s(e, t)) && (e.propertiesOnly || (i.valid = !0), i.allAttributes || (i.allAttributes = n(e.attributes, t.attributes, i.validAttributes)), i.allStyles || (i.allStyles = n(e.styles, t.styles, i.validStyles)), !i.allClasses)) {
                if (e = e.classes, t = t.classes, o = i.validClasses, e)if (!0 === e) e = !0; else {
                    for (var a, r = 0, l = t.length; r < l; ++r)a = t[r], o[a] || (o[a] = e(a));
                    e = !1
                } else e = !1;
                i.allClasses = e
            }
        }

        function n(e, t, n) {
            if (!e)return !1;
            if (!0 === e)return !0;
            for (var i in t)n[i] || (n[i] = e(i));
            return !1
        }

        function i(e, t, n) {
            if (!e.match || e.match(t)) {
                if (e.noProperties)return !1;
                if (n.hadInvalidAttribute = o(e.attributes, t.attributes) || n.hadInvalidAttribute, n.hadInvalidStyle = o(e.styles, t.styles) || n.hadInvalidStyle, e = e.classes, t = t.classes, e) {
                    for (var i = !1, a = !0 === e, r = t.length; r--;)(a || e(t[r])) && (t.splice(r, 1), i = !0);
                    e = i
                } else e = !1;
                n.hadInvalidClass = e || n.hadInvalidClass
            }
        }

        function o(e, t) {
            if (!e)return !1;
            var n, i = !1, o = !0 === e;
            for (n in t)(o || e(n)) && (delete t[n], i = !0);
            return i
        }

        function a(e, t, n) {
            return !(e.disabled || e.customConfig && !n || !t) && (e._.cachedChecks = {}, !0)
        }

        function r(e, t) {
            if (!e)return !1;
            if (!0 === e)return e;
            if ("string" == typeof e)return "*" == (e = _(e)) || CKEDITOR.tools.convertArrayToObject(e.split(t));
            if (CKEDITOR.tools.isArray(e))return !!e.length && CKEDITOR.tools.convertArrayToObject(e);
            var n, i = {}, o = 0;
            for (n in e)i[n] = e[n], o++;
            return !!o && i
        }

        function s(e, t) {
            if (e.nothingRequired)return !0;
            var n, i, o, a;
            if (o = e.requiredClasses)for (a = t.classes, n = 0; n < o.length; ++n)if ("string" == typeof(i = o[n])) {
                if (-1 == CKEDITOR.tools.indexOf(a, i))return !1
            } else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(a, i))return !1;
            return l(t.styles, e.requiredStyles) && l(t.attributes, e.requiredAttributes)
        }

        function l(e, t) {
            if (!t)return !0;
            for (var n, i = 0; i < t.length; ++i)if ("string" == typeof(n = t[i])) {
                if (!(n in e))return !1
            } else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(e, n))return !1;
            return !0
        }

        function c(e) {
            if (!e)return {};
            e = e.split(/\s*,\s*/).sort();
            for (var t = {}; e.length;)t[e.shift()] = "cke-test";
            return t
        }

        function d(e) {
            var t, n, i, o, a = {}, r = 1;
            for (e = _(e); t = e.match(x);)(n = t[2]) ? (i = u(n, "styles"), o = u(n, "attrs"), n = u(n, "classes")) : i = o = n = null, a["$" + r++] = {
                elements: t[1],
                classes: n,
                styles: i,
                attributes: o
            }, e = e.slice(t[0].length);
            return a
        }

        function u(e, t) {
            var n = e.match(A[t]);
            return n ? _(n[1]) : null
        }

        function h(e) {
            var t = e.styleBackup = e.attributes.style, n = e.classBackup = e.attributes.class;
            e.styles || (e.styles = CKEDITOR.tools.parseCssText(t || "", 1)), e.classes || (e.classes = n ? n.split(/\s+/) : [])
        }

        function f(e, n, o, a) {
            var r, s = 0;
            if (a.toHtml && (n.name = n.name.replace(L, "$1")), a.doCallbacks && e.elementCallbacks) {
                e:{
                    r = e.elementCallbacks;
                    for (var l, c = 0, d = r.length; c < d; ++c)if (l = r[c](n)) {
                        r = l;
                        break e
                    }
                    r = void 0
                }
                if (r)return r
            }
            if (a.doTransform && (r = e._.transformations[n.name])) {
                for (h(n), c = 0; c < r.length; ++c)O(e, n, r[c]);
                m(n)
            }
            if (a.doFilter) {
                e:{
                    c = n.name, d = e._, e = d.allowedRules.elements[c], r = d.allowedRules.generic, c = d.disallowedRules.elements[c], d = d.disallowedRules.generic, l = a.skipRequired;
                    var u, f, g = {
                        valid: !1,
                        validAttributes: {},
                        validClasses: {},
                        validStyles: {},
                        allAttributes: !1,
                        allClasses: !1,
                        allStyles: !1,
                        hadInvalidAttribute: !1,
                        hadInvalidClass: !1,
                        hadInvalidStyle: !1
                    };
                    if (e || r) {
                        if (h(n), c)for (u = 0, f = c.length; u < f; ++u)if (!1 === i(c[u], n, g)) {
                            e = null;
                            break e
                        }
                        if (d)for (u = 0, f = d.length; u < f; ++u)i(d[u], n, g);
                        if (e)for (u = 0, f = e.length; u < f; ++u)t(e[u], n, g, l);
                        if (r)for (u = 0, f = r.length; u < f; ++u)t(r[u], n, g, l);
                        e = g
                    } else e = null
                }
                if (!e || !e.valid)return o.push(n), 1;
                f = e.validAttributes;
                var p = e.validStyles;
                r = e.validClasses;
                var c = n.attributes, T = n.styles, d = n.classes;
                l = n.classBackup;
                var C, I, D = n.styleBackup, R = [], g = [], v = /^data-cke-/;
                if (u = !1, delete c.style, delete c.class, delete n.classBackup, delete n.styleBackup, !e.allAttributes)for (C in c)f[C] || (v.test(C) ? C == (I = C.replace(/^data-cke-saved-/, "")) || f[I] || (delete c[C], u = !0) : (delete c[C], u = !0));
                if (!e.allStyles || e.hadInvalidStyle) {
                    for (C in T)e.allStyles || p[C] ? R.push(C + ":" + T[C]) : u = !0;
                    R.length && (c.style = R.sort().join("; "))
                } else D && (c.style = D);
                if (!e.allClasses || e.hadInvalidClass) {
                    for (C = 0; C < d.length; ++C)(e.allClasses || r[d[C]]) && g.push(d[C]);
                    g.length && (c.class = g.sort().join(" ")), l && g.length < l.split(/\s+/).length && (u = !0)
                } else l && (c.class = l);
                if (u && (s = 1), !a.skipFinalValidation && !E(n))return o.push(n), 1
            }
            return a.toHtml && (n.name = n.name.replace(F, "cke:$1")), s
        }

        function g(e) {
            var t, n = [];
            for (t in e)-1 < t.indexOf("*") && n.push(t.replace(/\*/g, ".*"));
            return n.length ? new RegExp("^(?:" + n.join("|") + ")$") : null
        }

        function m(e) {
            var t, n = e.attributes;
            delete n.style, delete n.class, (t = CKEDITOR.tools.writeCssText(e.styles, !0)) && (n.style = t), e.classes.length && (n.class = e.classes.sort().join(" "))
        }

        function E(e) {
            switch (e.name) {
                case"a":
                    if (!(e.children.length || e.attributes.name || e.attributes.id))return !1;
                    break;
                case"img":
                    if (!e.attributes.src)return !1
            }
            return !0
        }

        function p(e) {
            if (!e)return !1;
            if (!0 === e)return !0;
            var t = g(e);
            return function (n) {
                return n in e || t && n.match(t)
            }
        }

        function T() {
            return new CKEDITOR.htmlParser.element("br")
        }

        function C(e) {
            return e.type == CKEDITOR.NODE_ELEMENT && ("br" == e.name || y.$block[e.name])
        }

        function I(e, t, n) {
            var i = e.name;
            if (y.$empty[i] || !e.children.length) "hr" == i && "br" == t ? e.replaceWith(T()) : (e.parent && n.push({
                check: "it",
                el: e.parent
            }), e.remove()); else if (y.$block[i] || "tr" == i)if ("br" == t) e.previous && !C(e.previous) && (t = T(), t.insertBefore(e)), e.next && !C(e.next) && (t = T(), t.insertAfter(e)), e.replaceWithChildren(); else {
                var o, i = e.children;
                e:{
                    o = y[t];
                    for (var a, r = 0, s = i.length; r < s; ++r)if (a = i[r], a.type == CKEDITOR.NODE_ELEMENT && !o[a.name]) {
                        o = !1;
                        break e
                    }
                    o = !0
                }
                if (o) e.name = t, e.attributes = {}, n.push({check: "parent-down", el: e}); else {
                    o = e.parent;
                    for (var l, c, r = o.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == o.name, s = i.length; 0 < s;)a = i[--s], r && (a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && y.$inline[a.name]) ? (l || (l = new CKEDITOR.htmlParser.element(t), l.insertAfter(e), n.push({
                        check: "parent-down",
                        el: l
                    })), l.add(a, 0)) : (l = null, c = y[o.name] || y.span, a.insertAfter(e), o.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || a.type != CKEDITOR.NODE_ELEMENT || c[a.name] || n.push({
                        check: "el-up",
                        el: a
                    }));
                    e.remove()
                }
            } else i in {style: 1, script: 1} ? e.remove() : (e.parent && n.push({
                check: "it",
                el: e.parent
            }), e.replaceWithChildren())
        }

        function O(e, t, n) {
            var i, o;
            for (i = 0; i < n.length; ++i)if (o = n[i], !(o.check && !e.check(o.check, !1) || o.left && !o.left(t))) {
                o.right(t, w);
                break
            }
        }

        function D(e, t) {
            var n, i, o, a, r = t.getDefinition(), s = r.attributes, l = r.styles;
            if (e.name != r.element)return !1;
            for (n in s)if ("class" == n) {
                for (r = s[n].split(/\s+/), o = e.classes.join("|"); a = r.pop();)if (-1 == o.indexOf(a))return !1
            } else if (e.attributes[n] != s[n])return !1;
            for (i in l)if (e.styles[i] != l[i])return !1;
            return !0
        }

        function R(e, t) {
            var n, i;
            return "string" == typeof e ? n = e : e instanceof CKEDITOR.style ? i = e : (n = e[0], i = e[1]), [{
                element: n,
                left: i,
                right: function (e, n) {
                    n.transform(e, t)
                }
            }]
        }

        function v(e) {
            return function (t) {
                return D(t, e)
            }
        }

        function b(e) {
            return function (t, n) {
                n[e](t)
            }
        }

        var y = CKEDITOR.dtd, K = CKEDITOR.tools.copy, _ = CKEDITOR.tools.trim, k = ["", "p", "br", "div"];
        CKEDITOR.FILTER_SKIP_TREE = 2, CKEDITOR.filter = function (e) {
            if (this.allowedContent = [], this.disallowedContent = [], this.elementCallbacks = null, this.disabled = !1, this.editor = null, this.id = CKEDITOR.tools.getNextNumber(), this._ = {
                    allowedRules: {
                        elements: {},
                        generic: []
                    },
                    disallowedRules: {elements: {}, generic: []},
                    transformations: {},
                    cachedTests: {},
                    cachedChecks: {}
                }, CKEDITOR.filter.instances[this.id] = this, e instanceof CKEDITOR.editor) {
                e = this.editor = e, this.customConfig = !0;
                var t = e.config.allowedContent;
                !0 === t ? this.disabled = !0 : (t || (this.customConfig = !1), this.allow(t, "config", 1), this.allow(e.config.extraAllowedContent, "extra", 1), this.allow(k[e.enterMode] + " " + k[e.shiftEnterMode], "default", 1), this.disallow(e.config.disallowedContent))
            } else this.customConfig = !1, this.allow(e, "default", 1)
        }, CKEDITOR.filter.instances = {}, CKEDITOR.filter.prototype = {
            allow: function (t, n, i) {
                if (!a(this, t, i))return !1;
                var o, r;
                if ("string" == typeof t) t = d(t); else if (t instanceof CKEDITOR.style) {
                    if (t.toAllowedContentRules)return this.allow(t.toAllowedContentRules(this.editor), n, i);
                    o = t.getDefinition(), t = {}, i = o.attributes, t[o.element] = o = {
                        styles: o.styles,
                        requiredStyles: o.styles && CKEDITOR.tools.objectKeys(o.styles)
                    }, i && (i = K(i), o.classes = i.class ? i.class.split(/\s+/) : null, o.requiredClasses = o.classes, delete i.class, o.attributes = i, o.requiredAttributes = i && CKEDITOR.tools.objectKeys(i))
                } else if (CKEDITOR.tools.isArray(t)) {
                    for (o = 0; o < t.length; ++o)r = this.allow(t[o], n, i);
                    return r
                }
                return e(this, t, n, this.allowedContent, this._.allowedRules), !0
            }, applyTo: function (e, t, n, i) {
                if (this.disabled)return !1;
                var o, a = this, r = [], s = this.editor && this.editor.config.protectedSource, l = !1,
                    c = {doFilter: !n, doTransform: !0, doCallbacks: !0, toHtml: t};
                e.forEach(function (e) {
                    if (e.type == CKEDITOR.NODE_ELEMENT) {
                        if ("off" == e.attributes["data-cke-filter"])return !1;
                        if (!t || "span" != e.name || !~CKEDITOR.tools.objectKeys(e.attributes).join("|").indexOf("data-cke-"))if (1 & (o = f(a, e, r, c))) l = !0; else if (2 & o)return !1
                    } else if (e.type == CKEDITOR.NODE_COMMENT && e.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                        var n;
                        e:{
                            var i = decodeURIComponent(e.value.replace(/^\{cke_protected\}/, ""));
                            n = [];
                            var d, u, h;
                            if (s)for (u = 0; u < s.length; ++u)if ((h = i.match(s[u])) && h[0].length == i.length) {
                                n = !0;
                                break e
                            }
                            i = CKEDITOR.htmlParser.fragment.fromHtml(i), 1 == i.children.length && (d = i.children[0]).type == CKEDITOR.NODE_ELEMENT && f(a, d, n, c), n = !n.length
                        }
                        n || r.push(e)
                    }
                }, null, !0), r.length && (l = !0);
                var d;
                e = [], i = k[i || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)];
                for (var u; n = r.pop();)n.type == CKEDITOR.NODE_ELEMENT ? I(n, i, e) : n.remove();
                for (; d = e.pop();)if (n = d.el, n.parent)switch (u = y[n.parent.name] || y.span, d.check) {
                    case"it":
                        y.$removeEmpty[n.name] && !n.children.length ? I(n, i, e) : E(n) || I(n, i, e);
                        break;
                    case"el-up":
                        n.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || u[n.name] || I(n, i, e);
                        break;
                    case"parent-down":
                        n.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || u[n.name] || I(n.parent, i, e)
                }
                return l
            }, checkFeature: function (e) {
                return !(!this.disabled && e) || (e.toFeature && (e = e.toFeature(this.editor)), !e.requiredContent || this.check(e.requiredContent))
            }, disable: function () {
                this.disabled = !0
            }, disallow: function (t) {
                return !!a(this, t, !0) && ("string" == typeof t && (t = d(t)), e(this, t, null, this.disallowedContent, this._.disallowedRules), !0)
            }, addContentForms: function (e) {
                if (!this.disabled && e) {
                    var t, n, i, o = [];
                    for (t = 0; t < e.length && !i; ++t)("string" == typeof(n = e[t]) || n instanceof CKEDITOR.style) && this.check(n) && (i = n);
                    if (i) {
                        for (t = 0; t < e.length; ++t)o.push(R(e[t], i));
                        this.addTransformations(o)
                    }
                }
            }, addElementCallback: function (e) {
                this.elementCallbacks || (this.elementCallbacks = []), this.elementCallbacks.push(e)
            }, addFeature: function (e) {
                return !(!this.disabled && e) || (e.toFeature && (e = e.toFeature(this.editor)), this.allow(e.allowedContent, e.name), this.addTransformations(e.contentTransformations), this.addContentForms(e.contentForms), !e.requiredContent || !this.customConfig && !this.disallowedContent.length || this.check(e.requiredContent))
            }, addTransformations: function (e) {
                var t, n;
                if (!this.disabled && e) {
                    var i, o = this._.transformations;
                    for (i = 0; i < e.length; ++i) {
                        t = e[i];
                        var a = void 0, r = void 0, s = void 0, l = void 0, c = void 0, d = void 0;
                        for (n = [], r = 0; r < t.length; ++r)s = t[r], "string" == typeof s ? (s = s.split(/\s*:\s*/), l = s[0], c = null, d = s[1]) : (l = s.check, c = s.left, d = s.right), a || (a = s, a = a.element ? a.element : l ? l.match(/^([a-z0-9]+)/i)[0] : a.left.getDefinition().element), c instanceof CKEDITOR.style && (c = v(c)), n.push({
                            check: l == a ? null : l,
                            left: c,
                            right: "string" == typeof d ? b(d) : d
                        });
                        t = a, o[t] || (o[t] = []), o[t].push(n)
                    }
                }
            }, check: function (e, t, n) {
                if (this.disabled)return !0;
                if (CKEDITOR.tools.isArray(e)) {
                    for (var i = e.length; i--;)if (this.check(e[i], t, n))return !0;
                    return !1
                }
                var o, a;
                if ("string" == typeof e) {
                    if ((a = e + "<" + (!1 === t ? "0" : "1") + (n ? "1" : "0") + ">") in this._.cachedChecks)return this._.cachedChecks[a];
                    i = d(e).$1, o = i.styles;
                    var r = i.classes;
                    i.name = i.elements, i.classes = r = r ? r.split(/\s*,\s*/) : [], i.styles = c(o), i.attributes = c(i.attributes), i.children = [], r.length && (i.attributes.class = r.join(" ")), o && (i.attributes.style = CKEDITOR.tools.writeCssText(i.styles)), o = i
                } else i = e.getDefinition(), o = i.styles, r = i.attributes || {}, o && !CKEDITOR.tools.isEmpty(o) ? (o = K(o), r.style = CKEDITOR.tools.writeCssText(o, !0)) : o = {}, o = {
                    name: i.element,
                    attributes: r,
                    classes: r.class ? r.class.split(/\s+/) : [],
                    styles: o,
                    children: []
                };
                var s, r = CKEDITOR.tools.clone(o), l = [];
                if (!1 !== t && (s = this._.transformations[o.name])) {
                    for (i = 0; i < s.length; ++i)O(this, o, s[i]);
                    m(o)
                }
                return f(this, r, l, {
                    doFilter: !0,
                    doTransform: !1 !== t,
                    skipRequired: !n,
                    skipFinalValidation: !n
                }), t = !(0 < l.length) && !!CKEDITOR.tools.objectCompare(o.attributes, r.attributes, !0), "string" == typeof e && (this._.cachedChecks[a] = t), t
            }, getAllowedEnterMode: function () {
                var e = ["p", "div", "br"], t = {p: CKEDITOR.ENTER_P, div: CKEDITOR.ENTER_DIV, br: CKEDITOR.ENTER_BR};
                return function (n, i) {
                    var o, a = e.slice();
                    if (this.check(k[n]))return n;
                    for (i || (a = a.reverse()); o = a.pop();)if (this.check(o))return t[o];
                    return CKEDITOR.ENTER_BR
                }
            }(), clone: function () {
                var e = new CKEDITOR.filter, t = CKEDITOR.tools.clone;
                return e.allowedContent = t(this.allowedContent), e._.allowedRules = t(this._.allowedRules), e.disallowedContent = t(this.disallowedContent), e._.disallowedRules = t(this._.disallowedRules), e._.transformations = t(this._.transformations), e.disabled = this.disabled, e.editor = this.editor, e
            }, destroy: function () {
                delete CKEDITOR.filter.instances[this.id], delete this._, delete this.allowedContent, delete this.disallowedContent
            }
        };
        var w, N = {styles: 1, attributes: 1, classes: 1},
            S = {styles: "requiredStyles", attributes: "requiredAttributes", classes: "requiredClasses"},
            x = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,
            A = {styles: /{([^}]+)}/, attrs: /\[([^\]]+)\]/, classes: /\(([^\)]+)\)/}, L = /^cke:(object|embed|param)$/,
            F = /^(object|embed|param)$/;
        w = CKEDITOR.filter.transformationsTools = {
            sizeToStyle: function (e) {
                this.lengthToStyle(e, "width"), this.lengthToStyle(e, "height")
            }, sizeToAttribute: function (e) {
                this.lengthToAttribute(e, "width"), this.lengthToAttribute(e, "height")
            }, lengthToStyle: function (e, t, n) {
                if (!((n = n || t) in e.styles)) {
                    var i = e.attributes[t];
                    i && (/^\d+$/.test(i) && (i += "px"), e.styles[n] = i)
                }
                delete e.attributes[t]
            }, lengthToAttribute: function (e, t, n) {
                if (!((n = n || t) in e.attributes)) {
                    var i = e.styles[t], o = i && i.match(/^(\d+)(?:\.\d*)?px$/);
                    o ? e.attributes[n] = o[1] : "cke-test" == i && (e.attributes[n] = "cke-test")
                }
                delete e.styles[t]
            }, alignmentToStyle: function (e) {
                if (!("float" in e.styles)) {
                    var t = e.attributes.align;
                    "left" != t && "right" != t || (e.styles.float = t)
                }
                delete e.attributes.align
            }, alignmentToAttribute: function (e) {
                if (!("align" in e.attributes)) {
                    var t = e.styles.float;
                    "left" != t && "right" != t || (e.attributes.align = t)
                }
                delete e.styles.float
            }, splitBorderShorthand: function (e) {
                if (e.styles.border) {
                    var t = CKEDITOR.tools.style.parse.border(e.styles.border);
                    t.color && (e.styles["border-color"] = t.color), t.style && (e.styles["border-style"] = t.style), t.width && (e.styles["border-width"] = t.width), delete e.styles.border
                }
            }, listTypeToStyle: function (e) {
                if (e.attributes.type)switch (e.attributes.type) {
                    case"a":
                        e.styles["list-style-type"] = "lower-alpha";
                        break;
                    case"A":
                        e.styles["list-style-type"] = "upper-alpha";
                        break;
                    case"i":
                        e.styles["list-style-type"] = "lower-roman";
                        break;
                    case"I":
                        e.styles["list-style-type"] = "upper-roman";
                        break;
                    case"1":
                        e.styles["list-style-type"] = "decimal";
                        break;
                    default:
                        e.styles["list-style-type"] = e.attributes.type
                }
            }, splitMarginShorthand: function (e) {
                function t(t) {
                    e.styles["margin-top"] = n[t[0]], e.styles["margin-right"] = n[t[1]], e.styles["margin-bottom"] = n[t[2]], e.styles["margin-left"] = n[t[3]]
                }

                if (e.styles.margin) {
                    var n = e.styles.margin.match(/(\-?[\.\d]+\w+)/g) || ["0px"];
                    switch (n.length) {
                        case 1:
                            t([0, 0, 0, 0]);
                            break;
                        case 2:
                            t([0, 1, 0, 1]);
                            break;
                        case 3:
                            t([0, 1, 2, 1]);
                            break;
                        case 4:
                            t([0, 1, 2, 3])
                    }
                    delete e.styles.margin
                }
            }, matchesStyle: D, transform: function (e, t) {
                if ("string" == typeof t) e.name = t; else {
                    var n, i, o, a, r = t.getDefinition(), s = r.styles, l = r.attributes;
                    e.name = r.element;
                    for (n in l)if ("class" == n)for (r = e.classes.join("|"), o = l[n].split(/\s+/); a = o.pop();)-1 == r.indexOf(a) && e.classes.push(a); else e.attributes[n] = l[n];
                    for (i in s)e.styles[i] = s[i]
                }
            }
        }
    }(), function () {
        CKEDITOR.focusManager = function (e) {
            return e.focusManager ? e.focusManager : (this.hasFocus = !1, this.currentActive = null, this._ = {editor: e}, this)
        }, CKEDITOR.focusManager._ = {blurDelay: 200}, CKEDITOR.focusManager.prototype = {
            focus: function (e) {
                this._.timer && clearTimeout(this._.timer), e && (this.currentActive = e), this.hasFocus || this._.locked || ((e = CKEDITOR.currentInstance) && e.focusManager.blur(1), this.hasFocus = !0, (e = this._.editor.container) && e.addClass("cke_focus"), this._.editor.fire("focus"))
            }, lock: function () {
                this._.locked = 1
            }, unlock: function () {
                delete this._.locked
            }, blur: function (e) {
                function t() {
                    if (this.hasFocus) {
                        this.hasFocus = !1;
                        var e = this._.editor.container;
                        e && e.removeClass("cke_focus"), this._.editor.fire("blur")
                    }
                }

                if (!this._.locked) {
                    this._.timer && clearTimeout(this._.timer);
                    var n = CKEDITOR.focusManager._.blurDelay;
                    e || !n ? t.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function () {
                        delete this._.timer, t.call(this)
                    }, n, this)
                }
            }, add: function (e, t) {
                var n = e.getCustomData("focusmanager");
                if (!n || n != this) {
                    n && n.remove(e);
                    var n = "focus", i = "blur";
                    t && (CKEDITOR.env.ie ? (n = "focusin", i = "focusout") : CKEDITOR.event.useCapture = 1);
                    var o = {
                        blur: function () {
                            e.equals(this.currentActive) && this.blur()
                        }, focus: function () {
                            this.focus(e)
                        }
                    };
                    e.on(n, o.focus, this), e.on(i, o.blur, this), t && (CKEDITOR.event.useCapture = 0), e.setCustomData("focusmanager", this), e.setCustomData("focusmanager_handlers", o)
                }
            }, remove: function (e) {
                e.removeCustomData("focusmanager");
                var t = e.removeCustomData("focusmanager_handlers");
                e.removeListener("blur", t.blur), e.removeListener("focus", t.focus)
            }
        }
    }(), CKEDITOR.keystrokeHandler = function (e) {
        return e.keystrokeHandler ? e.keystrokeHandler : (this.keystrokes = {}, this.blockedKeystrokes = {}, this._ = {editor: e}, this)
    }, function () {
        var e, t = function (t) {
            t = t.data;
            var n = t.getKeystroke(), i = this.keystrokes[n], o = this._.editor;
            return e = !1 === o.fire("key", {
                    keyCode: n,
                    domEvent: t
                }), e || (i && (e = !1 !== o.execCommand(i, {from: "keystrokeHandler"})), e || (e = !!this.blockedKeystrokes[n])), e && t.preventDefault(!0), !e
        }, n = function (t) {
            e && (e = !1, t.data.preventDefault(!0))
        };
        CKEDITOR.keystrokeHandler.prototype = {
            attach: function (e) {
                e.on("keydown", t, this), CKEDITOR.env.gecko && CKEDITOR.env.mac && e.on("keypress", n, this)
            }
        }
    }(), function () {
        CKEDITOR.lang = {
            languages: {
                af: 1,
                ar: 1,
                az: 1,
                bg: 1,
                bn: 1,
                bs: 1,
                ca: 1,
                cs: 1,
                cy: 1,
                da: 1,
                de: 1,
                "de-ch": 1,
                el: 1,
                "en-au": 1,
                "en-ca": 1,
                "en-gb": 1,
                en: 1,
                eo: 1,
                es: 1,
                "es-mx": 1,
                et: 1,
                eu: 1,
                fa: 1,
                fi: 1,
                fo: 1,
                "fr-ca": 1,
                fr: 1,
                gl: 1,
                gu: 1,
                he: 1,
                hi: 1,
                hr: 1,
                hu: 1,
                id: 1,
                is: 1,
                it: 1,
                ja: 1,
                ka: 1,
                km: 1,
                ko: 1,
                ku: 1,
                lt: 1,
                lv: 1,
                mk: 1,
                mn: 1,
                ms: 1,
                nb: 1,
                nl: 1,
                no: 1,
                oc: 1,
                pl: 1,
                "pt-br": 1,
                pt: 1,
                ro: 1,
                ru: 1,
                si: 1,
                sk: 1,
                sl: 1,
                sq: 1,
                "sr-latn": 1,
                sr: 1,
                sv: 1,
                th: 1,
                tr: 1,
                tt: 1,
                ug: 1,
                uk: 1,
                vi: 1,
                "zh-cn": 1,
                zh: 1
            }, rtl: {ar: 1, fa: 1, he: 1, ku: 1, ug: 1}, load: function (e, t, n) {
                e && CKEDITOR.lang.languages[e] || (e = this.detect(t, e));
                var i = this;
                t = function () {
                    i[e].dir = i.rtl[e] ? "rtl" : "ltr", n(e, i[e])
                }, this[e] ? t() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + e + ".js"), t, this)
            }, detect: function (e, t) {
                var n = this.languages;
                t = t || navigator.userLanguage || navigator.language || e;
                var i = t.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/), o = i[1], i = i[2];
                return n[o + "-" + i] ? o = o + "-" + i : n[o] || (o = null), CKEDITOR.lang.detect = o ? function () {
                    return o
                } : function (e) {
                    return e
                }, o || e
            }
        }
    }(), CKEDITOR.scriptLoader = function () {
        var e = {}, t = {};
        return {
            load: function (n, i, o, a) {
                var r = "string" == typeof n;
                r && (n = [n]), o || (o = CKEDITOR);
                var s = n.length, l = [], c = [], d = function (e) {
                    i && (r ? i.call(o, e) : i.call(o, l, c))
                };
                if (0 === s) d(!0); else {
                    var u = function (e, t) {
                        (t ? l : c).push(e), 0 >= --s && (a && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), d(t))
                    }, h = function (n, i) {
                        e[n] = 1;
                        var o = t[n];
                        delete t[n];
                        for (var a = 0; a < o.length; a++)o[a](n, i)
                    };
                    a && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
                    for (var f = 0; f < s; f++)!function (n) {
                        if (e[n]) u(n, !0); else {
                            var o = t[n] || (t[n] = []);
                            if (o.push(u), !(1 < o.length)) {
                                var a = new CKEDITOR.dom.element("script");
                                a.setAttributes({
                                    type: "text/javascript",
                                    src: n
                                }), i && (CKEDITOR.env.ie && (8 >= CKEDITOR.env.version || CKEDITOR.env.ie9Compat) ? a.$.onreadystatechange = function () {
                                    "loaded" != a.$.readyState && "complete" != a.$.readyState || (a.$.onreadystatechange = null, h(n, !0))
                                } : (a.$.onload = function () {
                                    setTimeout(function () {
                                        h(n, !0)
                                    }, 0)
                                }, a.$.onerror = function () {
                                    h(n, !1)
                                })), a.appendTo(CKEDITOR.document.getHead())
                            }
                        }
                    }(n[f])
                }
            }, queue: function () {
                function e() {
                    var e;
                    (e = t[0]) && this.load(e.scriptUrl, e.callback, CKEDITOR, 0)
                }

                var t = [];
                return function (n, i) {
                    var o = this;
                    t.push({
                        scriptUrl: n, callback: function () {
                            i && i.apply(this, arguments), t.shift(), e.call(o)
                        }
                    }), 1 == t.length && e.call(this)
                }
            }()
        }
    }(), CKEDITOR.resourceManager = function (e, t) {
        this.basePath = e, this.fileName = t, this.registered = {}, this.loaded = {}, this.externals = {}, this._ = {waitingList: {}}
    }, CKEDITOR.resourceManager.prototype = {
        add: function (e, t) {
            if (this.registered[e])throw Error('[CKEDITOR.resourceManager.add] The resource name "' + e + '" is already registered.');
            var n = this.registered[e] = t || {};
            return n.name = e, n.path = this.getPath(e), CKEDITOR.fire(e + CKEDITOR.tools.capitalize(this.fileName) + "Ready", n), this.get(e)
        }, get: function (e) {
            return this.registered[e] || null
        }, getPath: function (e) {
            var t = this.externals[e];
            return CKEDITOR.getUrl(t && t.dir || this.basePath + e + "/")
        }, getFilePath: function (e) {
            var t = this.externals[e];
            return CKEDITOR.getUrl(this.getPath(e) + (t ? t.file : this.fileName + ".js"))
        }, addExternal: function (e, t, n) {
            e = e.split(",");
            for (var i = 0; i < e.length; i++) {
                var o = e[i];
                n || (t = t.replace(/[^\/]+$/, function (e) {
                    return n = e, ""
                })), this.externals[o] = {dir: t, file: n || this.fileName + ".js"}
            }
        }, load: function (e, t, n) {
            CKEDITOR.tools.isArray(e) || (e = e ? [e] : []);
            for (var i = this.loaded, o = this.registered, a = [], r = {}, s = {}, l = 0; l < e.length; l++) {
                var c = e[l];
                if (c)if (i[c] || o[c]) s[c] = this.get(c); else {
                    var d = this.getFilePath(c);
                    a.push(d), d in r || (r[d] = []), r[d].push(c)
                }
            }
            CKEDITOR.scriptLoader.load(a, function (e, o) {
                if (o.length)throw Error('[CKEDITOR.resourceManager.load] Resource name "' + r[o[0]].join(",") + '" was not found at "' + o[0] + '".');
                for (var a = 0; a < e.length; a++)for (var l = r[e[a]], c = 0; c < l.length; c++) {
                    var d = l[c];
                    s[d] = this.get(d), i[d] = 1
                }
                t.call(n, s)
            }, this)
        }
    }, CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"), CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function (e) {
        var t = {};
        return function (n, i, o) {
            var a = {}, r = function (n) {
                e.call(this, n, function (e) {
                    CKEDITOR.tools.extend(a, e);
                    var n, s = [];
                    for (n in e) {
                        var l = e[n], c = l && l.requires;
                        if (!t[n]) {
                            if (l.icons)for (var d = l.icons.split(","), u = d.length; u--;)CKEDITOR.skin.addIcon(d[u], l.path + "icons/" + (CKEDITOR.env.hidpi && l.hidpi ? "hidpi/" : "") + d[u] + ".png");
                            t[n] = 1
                        }
                        if (c)for (c.split && (c = c.split(",")), l = 0; l < c.length; l++)a[c[l]] || s.push(c[l])
                    }
                    if (s.length) r.call(this, s); else {
                        for (n in a)l = a[n], l.onLoad && !l.onLoad._called && (!1 === l.onLoad() && delete a[n], l.onLoad._called = 1);
                        i && i.call(o || window, a)
                    }
                }, this)
            };
            r.call(this, n)
        }
    }), CKEDITOR.plugins.setLang = function (e, t, n) {
        var i = this.get(e);
        e = i.langEntries || (i.langEntries = {}), i = i.lang || (i.lang = []), i.split && (i = i.split(",")), -1 == CKEDITOR.tools.indexOf(i, t) && i.push(t), e[t] = n
    }, CKEDITOR.ui = function (e) {
        return e.ui ? e.ui : (this.items = {}, this.instances = {}, this.editor = e, this._ = {handlers: {}}, this)
    }, CKEDITOR.ui.prototype = {
        add: function (e, t, n) {
            n.name = e.toLowerCase();
            var i = this.items[e] = {
                type: t,
                command: n.command || null,
                args: Array.prototype.slice.call(arguments, 2)
            };
            CKEDITOR.tools.extend(i, n)
        }, get: function (e) {
            return this.instances[e]
        }, create: function (e) {
            var t = this.items[e], n = t && this._.handlers[t.type],
                i = t && t.command && this.editor.getCommand(t.command), n = n && n.create.apply(this, t.args);
            return this.instances[e] = n, i && i.uiItems.push(n), n && !n.type && (n.type = t.type), n
        }, addHandler: function (e, t) {
            this._.handlers[e] = t
        }, space: function (e) {
            return CKEDITOR.document.getById(this.spaceId(e))
        }, spaceId: function (e) {
            return this.editor.id + "_" + e
        }
    }, CKEDITOR.event.implementOn(CKEDITOR.ui), function () {
        function e(e, o, r) {
            if (CKEDITOR.event.call(this), e = e && CKEDITOR.tools.clone(e), void 0 !== o) {
                if (!(o instanceof CKEDITOR.dom.element))throw Error("Expect element of type CKEDITOR.dom.element.");
                if (!r)throw Error("One of the element modes must be specified.");
                if (CKEDITOR.env.ie && CKEDITOR.env.quirks && r == CKEDITOR.ELEMENT_MODE_INLINE)throw Error("Inline element mode is not supported on IE quirks.");
                if (!n(o, r))throw Error('The specified element mode is not supported on element: "' + o.getName() + '".');
                this.element = o, this.elementMode = r, this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (o.getId() || o.getNameAtt())
            } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
            this._ = {}, this.commands = {}, this.templates = {}, this.name = this.name || t(), this.id = CKEDITOR.tools.getNextId(), this.status = "unloaded", this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config), this.ui = new CKEDITOR.ui(this), this.focusManager = new CKEDITOR.focusManager(this), this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this), this.on("readOnly", i), this.on("selectionChange", function (e) {
                a(this, e.data.path)
            }), this.on("activeFilterChange", function () {
                a(this, this.elementPath(), !0)
            }), this.on("mode", i), this.on("instanceReady", function () {
                if (this.config.startupFocus) {
                    if ("end" === this.config.startupFocus) {
                        var e = this.createRange();
                        e.selectNodeContents(this.editable()), e.shrink(CKEDITOR.SHRINK_ELEMENT, !0), e.collapse(), this.getSelection().selectRanges([e])
                    }
                    this.focus()
                }
            }), CKEDITOR.fire("instanceCreated", null, this), CKEDITOR.add(this), CKEDITOR.tools.setTimeout(function () {
                "destroyed" !== this.status ? s(this, e) : CKEDITOR.warn("editor-incorrect-destroy")
            }, 0, this)
        }

        function t() {
            do {
                var e = "editor" + ++g
            } while (CKEDITOR.instances[e]);
            return e
        }

        function n(e, t) {
            return t == CKEDITOR.ELEMENT_MODE_INLINE ? e.is(CKEDITOR.dtd.$editable) || e.is("textarea") : t == CKEDITOR.ELEMENT_MODE_REPLACE ? !e.is(CKEDITOR.dtd.$nonBodyContent) : 1
        }

        function i() {
            var e, t = this.commands;
            for (e in t)o(this, t[e])
        }

        function o(e, t) {
            t[t.startDisabled ? "disable" : e.readOnly && !t.readOnly ? "disable" : t.modes[e.mode] ? "enable" : "disable"]()
        }

        function a(e, t, n) {
            if (t) {
                var i, o, a = e.commands;
                for (o in a)i = a[o], (n || i.contextSensitive) && i.refresh(e, t)
            }
        }

        function r(e) {
            var t = e.config.customConfig;
            if (!t)return !1;
            var t = CKEDITOR.getUrl(t), n = m[t] || (m[t] = {});
            return n.fn ? (n.fn.call(e, e.config), CKEDITOR.getUrl(e.config.customConfig) != t && r(e) || e.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(t, function () {
                n.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function () {
                }, r(e)
            }), !0
        }

        function s(e, t) {
            e.on("customConfigLoaded", function () {
                if (t) {
                    if (t.on)for (var n in t.on)e.on(n, t.on[n]);
                    CKEDITOR.tools.extend(e.config, t, !0), delete e.config.on
                }
                n = e.config, e.readOnly = !!n.readOnly || (e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? e.element.is("textarea") ? e.element.hasAttribute("disabled") || e.element.hasAttribute("readonly") : e.element.isReadOnly() : e.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (e.element.hasAttribute("disabled") || e.element.hasAttribute("readonly"))), e.blockless = e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !(e.element.is("textarea") || CKEDITOR.dtd[e.element.getName()].p), e.tabIndex = n.tabIndex || e.element && e.element.getAttribute("tabindex") || 0, e.activeEnterMode = e.enterMode = e.blockless ? CKEDITOR.ENTER_BR : n.enterMode, e.activeShiftEnterMode = e.shiftEnterMode = e.blockless ? CKEDITOR.ENTER_BR : n.shiftEnterMode, n.skin && (CKEDITOR.skinName = n.skin), e.fireOnce("configLoaded"), e.dataProcessor = new CKEDITOR.htmlDataProcessor(e), e.filter = e.activeFilter = new CKEDITOR.filter(e), l(e)
            }), t && null != t.customConfig && (e.config.customConfig = t.customConfig), r(e) || e.fireOnce("customConfigLoaded")
        }

        function l(e) {
            CKEDITOR.skin.loadPart("editor", function () {
                c(e)
            })
        }

        function c(e) {
            CKEDITOR.lang.load(e.config.language, e.config.defaultLanguage, function (t, n) {
                var i = e.config.title;
                e.langCode = t, e.lang = CKEDITOR.tools.prototypedCopy(n), e.title = "string" == typeof i || !1 === i ? i : [e.lang.editor, e.name].join(", "), e.config.contentsLangDirection || (e.config.contentsLangDirection = e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? e.element.getDirection(1) : e.lang.dir), e.fire("langLoaded"), d(e)
            })
        }

        function d(e) {
            e.getStylesSet(function (t) {
                e.once("loaded", function () {
                    e.fire("stylesSet", {styles: t})
                }, null, null, 1), u(e)
            })
        }

        function u(e) {
            var t = e.config, n = t.plugins, i = t.extraPlugins, o = t.removePlugins;
            if (i)var a = new RegExp("(?:^|,)(?:" + i.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"), n = n.replace(a, ""),
                n = n + "," + i;
            if (o)var r = new RegExp("(?:^|,)(?:" + o.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"), n = n.replace(r, "");
            CKEDITOR.env.air && (n += ",adobeair"), CKEDITOR.plugins.load(n.split(","), function (n) {
                var i = [], o = [], a = [];
                e.plugins = n;
                for (var s in n) {
                    var l, c = n[s], d = c.lang, u = null, h = c.requires;
                    if (CKEDITOR.tools.isArray(h) && (h = h.join(",")), h && (l = h.match(r)))for (; h = l.pop();)CKEDITOR.error("editor-plugin-required", {
                        plugin: h.replace(",", ""),
                        requiredBy: s
                    });
                    d && !e.lang[s] && (d.split && (d = d.split(",")), 0 <= CKEDITOR.tools.indexOf(d, e.langCode) ? u = e.langCode : (u = e.langCode.replace(/-.*/, ""), u = u != e.langCode && 0 <= CKEDITOR.tools.indexOf(d, u) ? u : 0 <= CKEDITOR.tools.indexOf(d, "en") ? "en" : d[0]), c.langEntries && c.langEntries[u] ? (e.lang[s] = c.langEntries[u], u = null) : a.push(CKEDITOR.getUrl(c.path + "lang/" + u + ".js"))), o.push(u), i.push(c)
                }
                CKEDITOR.scriptLoader.load(a, function () {
                    for (var n = ["beforeInit", "init", "afterInit"], a = 0; a < n.length; a++)for (var r = 0; r < i.length; r++) {
                        var s = i[r];
                        0 === a && o[r] && s.lang && s.langEntries && (e.lang[s.name] = s.langEntries[o[r]]), s[n[a]] && s[n[a]](e)
                    }
                    for (e.fireOnce("pluginsLoaded"), t.keystrokes && e.setKeystroke(e.config.keystrokes),
                             r = 0; r < e.config.blockedKeystrokes.length; r++)e.keystrokeHandler.blockedKeystrokes[e.config.blockedKeystrokes[r]] = 1;
                    e.status = "loaded", e.fireOnce("loaded"), CKEDITOR.fire("instanceLoaded", null, e)
                })
            })
        }

        function h() {
            var e = this.element;
            if (e && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
                var t = this.getData();
                return this.config.htmlEncodeOutput && (t = CKEDITOR.tools.htmlEncode(t)), e.is("textarea") ? e.setValue(t) : e.setHtml(t), !0
            }
            return !1
        }

        function f(e, t) {
            for (var n, i, o, a = new CKEDITOR.dom.documentFragment, r = 0; r < e.length; r++) {
                var s = e[r], l = s.startContainer.getAscendant("tr", !0);
                !function (e) {
                    var t = e.startContainer, n = e.endContainer;
                    return !(!t.is || !(t.is("tr") || t.is("td") && t.equals(n) && e.endOffset === t.getChildCount()))
                }(s) ? a.append(s.cloneContents()) : (n || (n = l.getAscendant("table").clone(), n.append(l.getAscendant({
                    thead: 1,
                    tbody: 1,
                    tfoot: 1
                }).clone()), a.append(n), n = n.findOne("thead, tbody, tfoot")), i && i.equals(l) || (i = l, o = l.clone(), n.append(o)), o.append(function (e) {
                    var t = e.startContainer;
                    return t.is("tr") ? e.cloneContents() : t.clone(!0)
                }(s)))
            }
            return n ? a : t.getHtmlFromRange(e[0])
        }

        e.prototype = CKEDITOR.editor.prototype, CKEDITOR.editor = e;
        var g = 0, m = {};
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            addCommand: function (e, t) {
                t.name = e.toLowerCase();
                var n = new CKEDITOR.command(this, t);
                return this.mode && o(this, n), this.commands[e] = n
            }, _attachToForm: function () {
                function e(e) {
                    t.updateElement(), t._.required && !n.getValue() && !1 === t.fire("required") && e.data.preventDefault()
                }

                var t = this, n = t.element, i = new CKEDITOR.dom.element(n.$.form);
                n.is("textarea") && i && (i.on("submit", e), function (e) {
                    return !!(e && e.call && e.apply)
                }(i.$.submit) && (i.$.submit = CKEDITOR.tools.override(i.$.submit, function (t) {
                    return function () {
                        e(), t.apply ? t.apply(this) : t()
                    }
                })), t.on("destroy", function () {
                    i.removeListener("submit", e)
                }))
            }, destroy: function (e) {
                this.fire("beforeDestroy"), !e && h.call(this), this.editable(null), this.filter && (this.filter.destroy(), delete this.filter), delete this.activeFilter, this.status = "destroyed", this.fire("destroy"), this.removeAllListeners(), CKEDITOR.remove(this), CKEDITOR.fire("instanceDestroyed", null, this)
            }, elementPath: function (e) {
                if (!e) {
                    if (!(e = this.getSelection()))return null;
                    e = e.getStartElement()
                }
                return e ? new CKEDITOR.dom.elementPath(e, this.editable()) : null
            }, createRange: function () {
                var e = this.editable();
                return e ? new CKEDITOR.dom.range(e) : null
            }, execCommand: function (e, t) {
                var n = this.getCommand(e), i = {name: e, commandData: t || {}, command: n};
                return !(!n || n.state == CKEDITOR.TRISTATE_DISABLED || !1 === this.fire("beforeCommandExec", i) || (i.returnValue = n.exec(i.commandData), n.async || !1 === this.fire("afterCommandExec", i))) && i.returnValue
            }, getCommand: function (e) {
                return this.commands[e]
            }, getData: function (e) {
                !e && this.fire("beforeGetData");
                var t = this._.data;
                return "string" != typeof t && (t = (t = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? t.is("textarea") ? t.getValue() : t.getHtml() : ""), t = {dataValue: t}, !e && this.fire("getData", t), t.dataValue
            }, getSnapshot: function () {
                var e = this.fire("getSnapshot");
                return "string" != typeof e && (e = (e = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? e.is("textarea") ? e.getValue() : e.getHtml() : ""), e
            }, loadSnapshot: function (e) {
                this.fire("loadSnapshot", e)
            }, setData: function (e, t, n) {
                var i = !0, o = t;
                t && "object" == typeof t && (n = t.internal, o = t.callback, i = !t.noSnapshot), !n && i && this.fire("saveSnapshot"), !o && n || this.once("dataReady", function (e) {
                    !n && i && this.fire("saveSnapshot"), o && o.call(e.editor)
                }), e = {dataValue: e}, !n && this.fire("setData", e), this._.data = e.dataValue, !n && this.fire("afterSetData", e)
            }, setReadOnly: function (e) {
                e = null == e || e, this.readOnly != e && (this.readOnly = e, this.keystrokeHandler.blockedKeystrokes[8] = +e, this.editable().setReadOnly(e), this.fire("readOnly"))
            }, insertHtml: function (e, t, n) {
                this.fire("insertHtml", {dataValue: e, mode: t, range: n})
            }, insertText: function (e) {
                this.fire("insertText", e)
            }, insertElement: function (e) {
                this.fire("insertElement", e)
            }, getSelectedHtml: function (e) {
                var t = this.editable(), n = this.getSelection(), n = n && n.getRanges();
                return t && n && 0 !== n.length ? (t = f(n, t), e ? t.getHtml() : t) : null
            }, extractSelectedHtml: function (e, t) {
                var n, i = this.editable(), o = this.getSelection().getRanges(), a = new CKEDITOR.dom.documentFragment;
                if (!i || 0 === o.length)return null;
                for (n = 0; n < o.length; n++)a.append(i.extractHtmlFromRange(o[n], t));
                return t || this.getSelection().selectRanges([o[0]]), e ? a.getHtml() : a
            }, focus: function () {
                this.fire("beforeFocus")
            }, checkDirty: function () {
                return "ready" == this.status && this._.previousValue !== this.getSnapshot()
            }, resetDirty: function () {
                this._.previousValue = this.getSnapshot()
            }, updateElement: function () {
                return h.call(this)
            }, setKeystroke: function () {
                for (var e, t, n = this.keystrokeHandler.keystrokes, i = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [[].slice.call(arguments, 0)], o = i.length; o--;)e = i[o], t = 0, CKEDITOR.tools.isArray(e) && (t = e[1], e = e[0]), t ? n[e] = t : delete n[e]
            }, getCommandKeystroke: function (e) {
                if (e = "string" == typeof e ? this.getCommand(e) : e) {
                    var t, n = CKEDITOR.tools.object.findKey(this.commands, e), i = this.keystrokeHandler.keystrokes;
                    if (e.fakeKeystroke)return e.fakeKeystroke;
                    for (t in i)if (i.hasOwnProperty(t) && i[t] == n)return t
                }
                return null
            }, addFeature: function (e) {
                return this.filter.addFeature(e)
            }, setActiveFilter: function (e) {
                e || (e = this.filter), this.activeFilter !== e && (this.activeFilter = e, this.fire("activeFilterChange"), e === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(e.getAllowedEnterMode(this.enterMode), e.getAllowedEnterMode(this.shiftEnterMode, !0)))
            }, setActiveEnterMode: function (e, t) {
                e = e ? this.blockless ? CKEDITOR.ENTER_BR : e : this.enterMode, t = t ? this.blockless ? CKEDITOR.ENTER_BR : t : this.shiftEnterMode, this.activeEnterMode == e && this.activeShiftEnterMode == t || (this.activeEnterMode = e, this.activeShiftEnterMode = t, this.fire("activeEnterModeChange"))
            }, showNotification: function (e) {
                alert(e)
            }
        })
    }(), CKEDITOR.ELEMENT_MODE_NONE = 0, CKEDITOR.ELEMENT_MODE_REPLACE = 1, CKEDITOR.ELEMENT_MODE_APPENDTO = 2, CKEDITOR.ELEMENT_MODE_INLINE = 3, CKEDITOR.htmlParser = function () {
        this._ = {htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g}
    }, function () {
        var e = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, t = {
            checked: 1,
            compact: 1,
            declare: 1,
            defer: 1,
            disabled: 1,
            ismap: 1,
            multiple: 1,
            nohref: 1,
            noresize: 1,
            noshade: 1,
            nowrap: 1,
            readonly: 1,
            selected: 1
        };
        CKEDITOR.htmlParser.prototype = {
            onTagOpen: function () {
            }, onTagClose: function () {
            }, onText: function () {
            }, onCDATA: function () {
            }, onComment: function () {
            }, parse: function (n) {
                for (var i, o, a, r = 0; i = this._.htmlPartsRegex.exec(n);)if (o = i.index, o > r && (r = n.substring(r, o), a ? a.push(r) : this.onText(r)), r = this._.htmlPartsRegex.lastIndex, !(o = i[1]) || (o = o.toLowerCase(), a && CKEDITOR.dtd.$cdata[o] && (this.onCDATA(a.join("")), a = null), a))if (a) a.push(i[0]); else if (o = i[3]) {
                    if (o = o.toLowerCase(), !/="/.test(o)) {
                        var s, l = {}, c = i[4];
                        if (i = !!i[5], c)for (; s = e.exec(c);) {
                            var d = s[1].toLowerCase();
                            s = s[2] || s[3] || s[4] || "", l[d] = !s && t[d] ? d : CKEDITOR.tools.htmlDecodeAttr(s)
                        }
                        this.onTagOpen(o, l, i), !a && CKEDITOR.dtd.$cdata[o] && (a = [])
                    }
                } else(o = i[2]) && this.onComment(o); else this.onTagClose(o);
                n.length > r && this.onText(n.substring(r, n.length))
            }
        }
    }(),CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
        $: function () {
            this._ = {output: []}
        }, proto: {
            openTag: function (e) {
                this._.output.push("<", e)
            }, openTagClose: function (e, t) {
                t ? this._.output.push(" />") : this._.output.push(">")
            }, attribute: function (e, t) {
                "string" == typeof t && (t = CKEDITOR.tools.htmlEncodeAttr(t)), this._.output.push(" ", e, '="', t, '"')
            }, closeTag: function (e) {
                this._.output.push("</", e, ">")
            }, text: function (e) {
                this._.output.push(e)
            }, comment: function (e) {
                this._.output.push("\x3c!--", e, "--\x3e")
            }, write: function (e) {
                this._.output.push(e)
            }, reset: function () {
                this._.output = [], this._.indent = !1
            }, getHtml: function (e) {
                var t = this._.output.join("");
                return e && this.reset(), t
            }
        }
    }),function () {
        CKEDITOR.htmlParser.node = function () {
        }, CKEDITOR.htmlParser.node.prototype = {
            remove: function () {
                var e = this.parent.children, t = CKEDITOR.tools.indexOf(e, this), n = this.previous, i = this.next;
                n && (n.next = i), i && (i.previous = n), e.splice(t, 1), this.parent = null
            }, replaceWith: function (e) {
                var t = this.parent.children, n = CKEDITOR.tools.indexOf(t, this), i = e.previous = this.previous,
                    o = e.next = this.next;
                i && (i.next = e), o && (o.previous = e), t[n] = e, e.parent = this.parent, this.parent = null
            }, insertAfter: function (e) {
                var t = e.parent.children, n = CKEDITOR.tools.indexOf(t, e), i = e.next;
                t.splice(n + 1, 0, this), this.next = e.next, this.previous = e, e.next = this, i && (i.previous = this), this.parent = e.parent
            }, insertBefore: function (e) {
                var t = e.parent.children, n = CKEDITOR.tools.indexOf(t, e);
                t.splice(n, 0, this), this.next = e, (this.previous = e.previous) && (e.previous.next = this), e.previous = this, this.parent = e.parent
            }, getAscendant: function (e) {
                for (var t = ("function" == typeof e ? e : "string" == typeof e ? function (t) {
                    return t.name == e
                } : function (t) {
                    return t.name in e
                }), n = this.parent; n && n.type == CKEDITOR.NODE_ELEMENT;) {
                    if (t(n))return n;
                    n = n.parent
                }
                return null
            }, wrapWith: function (e) {
                return this.replaceWith(e), e.add(this), e
            }, getIndex: function () {
                return CKEDITOR.tools.indexOf(this.parent.children, this)
            }, getFilterContext: function (e) {
                return e || {}
            }
        }
    }(),CKEDITOR.htmlParser.comment = function (e) {
        this.value = e, this._ = {isBlockLike: !1}
    },CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
        type: CKEDITOR.NODE_COMMENT,
        filter: function (e, t) {
            var n = this.value;
            return (n = e.onComment(t, n, this)) ? "string" != typeof n ? (this.replaceWith(n), !1) : (this.value = n, !0) : (this.remove(), !1)
        },
        writeHtml: function (e, t) {
            t && this.filter(t), e.comment(this.value)
        }
    }),function () {
        CKEDITOR.htmlParser.text = function (e) {
            this.value = e, this._ = {isBlockLike: !1}
        }, CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_TEXT,
            filter: function (e, t) {
                if (!(this.value = e.onText(t, this.value, this)))return this.remove(), !1
            },
            writeHtml: function (e, t) {
                t && this.filter(t), e.text(this.value)
            }
        })
    }(),function () {
        CKEDITOR.htmlParser.cdata = function (e) {
            this.value = e
        }, CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_TEXT,
            filter: function () {
            },
            writeHtml: function (e) {
                e.write(this.value)
            }
        })
    }(),CKEDITOR.htmlParser.fragment = function () {
        this.children = [], this.parent = null, this._ = {isBlockLike: !0, hasInlineStarted: !1}
    },function () {
        function e(e) {
            return !e.attributes["data-cke-survive"] && ("a" == e.name && e.attributes.href || CKEDITOR.dtd.$removeEmpty[e.name])
        }

        var t = CKEDITOR.tools.extend({
                table: 1,
                ul: 1,
                ol: 1,
                dl: 1
            }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), n = {ol: 1, ul: 1},
            i = CKEDITOR.tools.extend({}, {html: 1}, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
                style: 1,
                script: 1
            }), o = {ul: "li", ol: "li", dl: "dd", table: "tbody", tbody: "tr", thead: "tr", tfoot: "tr", tr: "td"};
        CKEDITOR.htmlParser.fragment.fromHtml = function (a, r, s) {
            function l(e) {
                var t;
                if (0 < E.length)for (var n = 0; n < E.length; n++) {
                    var i = E[n], o = i.name, a = CKEDITOR.dtd[o], r = T.name && CKEDITOR.dtd[T.name];
                    r && !r[o] || e && a && !a[e] && CKEDITOR.dtd[e] ? o == T.name && (u(T, T.parent, 1), n--) : (t || (c(), t = 1), i = i.clone(), i.parent = T, T = i, E.splice(n, 1), n--)
                }
            }

            function c() {
                for (; p.length;)u(p.shift(), T)
            }

            function d(e) {
                if (e._.isBlockLike && "pre" != e.name && "textarea" != e.name) {
                    var t, n = e.children.length, i = e.children[n - 1];
                    i && i.type == CKEDITOR.NODE_TEXT && ((t = CKEDITOR.tools.rtrim(i.value)) ? i.value = t : e.children.length = n - 1)
                }
            }

            function u(t, n, i) {
                n = n || T || m;
                var o = T;
                void 0 === t.previous && (h(n, t) && (T = n, g.onTagOpen(s, {}), t.returnPoint = n = T), d(t), e(t) && !t.children.length || n.add(t), "pre" == t.name && (I = !1), "textarea" == t.name && (C = !1)), t.returnPoint ? (T = t.returnPoint, delete t.returnPoint) : T = i ? n : o
            }

            function h(e, t) {
                if ((e == m || "body" == e.name) && s && (!e.name || CKEDITOR.dtd[e.name][s])) {
                    var n, i;
                    return (n = t.attributes && (i = t.attributes["data-cke-real-element-type"]) ? i : t.name) && n in CKEDITOR.dtd.$inline && !(n in CKEDITOR.dtd.head) && !t.isOrphan || t.type == CKEDITOR.NODE_TEXT
                }
            }

            function f(e, t) {
                return (e in CKEDITOR.dtd.$listItem || e in CKEDITOR.dtd.$tableContent) && (e == t || "dt" == e && "dd" == t || "dd" == e && "dt" == t)
            }

            var g = new CKEDITOR.htmlParser,
                m = r instanceof CKEDITOR.htmlParser.element ? r : "string" == typeof r ? new CKEDITOR.htmlParser.element(r) : new CKEDITOR.htmlParser.fragment,
                E = [], p = [], T = m, C = "textarea" == m.name, I = "pre" == m.name;
            g.onTagOpen = function (o, a, r, s) {
                if (a = new CKEDITOR.htmlParser.element(o, a), a.isUnknown && r && (a.isEmpty = !0), a.isOptionalClose = s, e(a)) E.push(a); else {
                    if ("pre" == o) I = !0; else {
                        if ("br" == o && I)return void T.add(new CKEDITOR.htmlParser.text("\n"));
                        "textarea" == o && (C = !0)
                    }
                    if ("br" == o) p.push(a); else {
                        for (; s = (r = T.name) ? CKEDITOR.dtd[r] || (T._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : i, !(a.isUnknown || T.isUnknown || s[o]);)if (T.isOptionalClose) g.onTagClose(r); else if (o in n && r in n) r = T.children, (r = r[r.length - 1]) && "li" == r.name || u(r = new CKEDITOR.htmlParser.element("li"), T), !a.returnPoint && (a.returnPoint = T), T = r; else if (o in CKEDITOR.dtd.$listItem && !f(o, r)) g.onTagOpen("li" == o ? "ul" : "dl", {}, 0, 1); else if (r in t && !f(o, r)) !a.returnPoint && (a.returnPoint = T), T = T.parent; else {
                            if (r in CKEDITOR.dtd.$inline && E.unshift(T), !T.parent) {
                                a.isOrphan = 1;
                                break
                            }
                            u(T, T.parent, 1)
                        }
                        l(o), c(), a.parent = T, a.isEmpty ? u(a) : T = a
                    }
                }
            }, g.onTagClose = function (e) {
                for (var t = E.length - 1; 0 <= t; t--)if (e == E[t].name)return void E.splice(t, 1);
                for (var n = [], i = [], o = T; o != m && o.name != e;)o._.isBlockLike || i.unshift(o), n.push(o), o = o.returnPoint || o.parent;
                if (o != m) {
                    for (t = 0; t < n.length; t++) {
                        var a = n[t];
                        u(a, a.parent)
                    }
                    T = o, o._.isBlockLike && c(), u(o, o.parent), o == T && (T = T.parent), E = E.concat(i)
                }
                "body" == e && (s = !1)
            }, g.onText = function (e) {
                if (T._.hasInlineStarted && !p.length || I || C || (e = CKEDITOR.tools.ltrim(e), 0 !== e.length)) {
                    var n = T.name,
                        a = n ? CKEDITOR.dtd[n] || (T._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : i;
                    !C && !a["#"] && n in t ? (g.onTagOpen(o[n] || ""), g.onText(e)) : (c(), l(), I || C || (e = e.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " ")), e = new CKEDITOR.htmlParser.text(e), h(T, e) && this.onTagOpen(s, {}, 0, 1), T.add(e))
                }
            }, g.onCDATA = function (e) {
                T.add(new CKEDITOR.htmlParser.cdata(e))
            }, g.onComment = function (e) {
                c(), l(), T.add(new CKEDITOR.htmlParser.comment(e))
            }, g.parse(a);
            for (c(); T != m;)u(T, T.parent, 1);
            return d(m), m
        }, CKEDITOR.htmlParser.fragment.prototype = {
            type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, add: function (e, t) {
                isNaN(t) && (t = this.children.length);
                var n = 0 < t ? this.children[t - 1] : null;
                if (n) {
                    if (e._.isBlockLike && n.type == CKEDITOR.NODE_TEXT && (n.value = CKEDITOR.tools.rtrim(n.value), 0 === n.value.length))return this.children.pop(), void this.add(e);
                    n.next = e
                }
                e.previous = n, e.parent = this, this.children.splice(t, 0, e), this._.hasInlineStarted || (this._.hasInlineStarted = e.type == CKEDITOR.NODE_TEXT || e.type == CKEDITOR.NODE_ELEMENT && !e._.isBlockLike)
            }, filter: function (e, t) {
                t = this.getFilterContext(t), e.onRoot(t, this), this.filterChildren(e, !1, t)
            }, filterChildren: function (e, t, n) {
                if (this.childrenFilteredBy != e.id)for (n = this.getFilterContext(n), t && !this.parent && e.onRoot(n, this), this.childrenFilteredBy = e.id, t = 0; t < this.children.length; t++)!1 === this.children[t].filter(e, n) && t--
            }, writeHtml: function (e, t) {
                t && this.filter(t), this.writeChildrenHtml(e)
            }, writeChildrenHtml: function (e, t, n) {
                var i = this.getFilterContext();
                for (n && !this.parent && t && t.onRoot(i, this), t && this.filterChildren(t, !1, i), t = 0, n = this.children, i = n.length; t < i; t++)n[t].writeHtml(e)
            }, forEach: function (e, t, n) {
                if (!(n || t && this.type != t))var i = e(this);
                if (!1 !== i) {
                    n = this.children;
                    for (var o = 0; o < n.length; o++)i = n[o], i.type == CKEDITOR.NODE_ELEMENT ? i.forEach(e, t) : t && i.type != t || e(i)
                }
            }, getFilterContext: function (e) {
                return e || {}
            }
        }
    }(),function () {
        function e() {
            this.rules = []
        }

        function t(t, n, i, o) {
            var a, r;
            for (a in n)(r = t[a]) || (r = t[a] = new e), r.add(n[a], i, o)
        }

        CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
            $: function (t) {
                this.id = CKEDITOR.tools.getNextNumber(), this.elementNameRules = new e, this.attributeNameRules = new e, this.elementsRules = {}, this.attributesRules = {}, this.textRules = new e, this.commentRules = new e, this.rootRules = new e, t && this.addRules(t, 10)
            }, proto: {
                addRules: function (e, n) {
                    var i;
                    "number" == typeof n ? i = n : n && "priority" in n && (i = n.priority), "number" != typeof i && (i = 10), "object" != typeof n && (n = {}), e.elementNames && this.elementNameRules.addMany(e.elementNames, i, n), e.attributeNames && this.attributeNameRules.addMany(e.attributeNames, i, n), e.elements && t(this.elementsRules, e.elements, i, n), e.attributes && t(this.attributesRules, e.attributes, i, n), e.text && this.textRules.add(e.text, i, n), e.comment && this.commentRules.add(e.comment, i, n), e.root && this.rootRules.add(e.root, i, n)
                }, applyTo: function (e) {
                    e.filter(this)
                }, onElementName: function (e, t) {
                    return this.elementNameRules.execOnName(e, t)
                }, onAttributeName: function (e, t) {
                    return this.attributeNameRules.execOnName(e, t)
                }, onText: function (e, t, n) {
                    return this.textRules.exec(e, t, n)
                }, onComment: function (e, t, n) {
                    return this.commentRules.exec(e, t, n)
                }, onRoot: function (e, t) {
                    return this.rootRules.exec(e, t)
                }, onElement: function (e, t) {
                    for (var n, i = [this.elementsRules["^"], this.elementsRules[t.name], this.elementsRules.$], o = 0; 3 > o; o++)if (n = i[o]) {
                        if (!1 === (n = n.exec(e, t, this)))return null;
                        if (n && n != t)return this.onNode(e, n);
                        if (t.parent && !t.name)break
                    }
                    return t
                }, onNode: function (e, t) {
                    var n = t.type;
                    return n == CKEDITOR.NODE_ELEMENT ? this.onElement(e, t) : n == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(e, t.value)) : n == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(e, t.value)) : null
                }, onAttribute: function (e, t, n, i) {
                    return (n = this.attributesRules[n]) ? n.exec(e, i, t, this) : i
                }
            }
        }), CKEDITOR.htmlParser.filterRulesGroup = e, e.prototype = {
            add: function (e, t, n) {
                this.rules.splice(this.findIndex(t), 0, {value: e, priority: t, options: n})
            }, addMany: function (e, t, n) {
                for (var i = [this.findIndex(t), 0], o = 0, a = e.length; o < a; o++)i.push({
                    value: e[o],
                    priority: t,
                    options: n
                });
                this.rules.splice.apply(this.rules, i)
            }, findIndex: function (e) {
                for (var t = this.rules, n = t.length - 1; 0 <= n && e < t[n].priority;)n--;
                return n + 1
            }, exec: function (e, t) {
                var n, i, o, a, r = t instanceof CKEDITOR.htmlParser.node || t instanceof CKEDITOR.htmlParser.fragment,
                    s = Array.prototype.slice.call(arguments, 1), l = this.rules, c = l.length;
                for (a = 0; a < c; a++)if (r && (n = t.type, i = t.name), o = l[a], !(e.nonEditable && !o.options.applyToAll || e.nestedEditable && o.options.excludeNestedEditable)) {
                    if (!1 === (o = o.value.apply(null, s)) || r && o && (o.name != i || o.type != n))return o;
                    null != o && (s[0] = t = o)
                }
                return t
            }, execOnName: function (e, t) {
                for (var n, i = 0, o = this.rules, a = o.length; t && i < a; i++)n = o[i], e.nonEditable && !n.options.applyToAll || e.nestedEditable && n.options.excludeNestedEditable || (t = t.replace(n.value[0], n.value[1]));
                return t
            }
        }
    }(),function () {
        function e(e, t) {
            function s(e) {
                return e || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", {"data-cke-bogus": 1})
            }

            function l(e, t) {
                return function (o) {
                    if (o.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var r, l, d = [], u = n(o);
                        if (u)for (c(u, 1) && d.push(u); u;)a(u) && (r = i(u)) && c(r) && ((l = i(r)) && !a(l) ? d.push(r) : (s(h).insertAfter(r), r.remove())), u = u.previous;
                        for (u = 0; u < d.length; u++)d[u].remove();
                        (d = !e || !1 !== ("function" == typeof t ? t(o) : t)) && ((h || CKEDITOR.env.needsBrFiller || o.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) && (h || CKEDITOR.env.needsBrFiller || !(7 < document.documentMode || o.name in CKEDITOR.dtd.tr || o.name in CKEDITOR.dtd.$listItem)) ? (d = n(o), d = !d || "form" == o.name && "input" == d.name) : d = !1), d && o.add(s(e))
                    }
                }
            }

            function c(e, t) {
                if ((!h || CKEDITOR.env.needsBrFiller) && e.type == CKEDITOR.NODE_ELEMENT && "br" == e.name && !e.attributes["data-cke-eol"])return !0;
                var n;
                return !!(e.type == CKEDITOR.NODE_TEXT && (n = e.value.match(E)) && (n.index && (new CKEDITOR.htmlParser.text(e.value.substring(0, n.index)).insertBefore(e), e.value = n[0]), !CKEDITOR.env.needsBrFiller && h && (!t || e.parent.name in f) || !h && ((n = e.previous) && "br" == n.name || !n || a(n))))
            }

            var d, u = {elements: {}}, h = "html" == t, f = CKEDITOR.tools.extend({}, I);
            for (d in f)"#" in T[d] || delete f[d];
            for (d in f)u.elements[d] = l(h, e.config.fillEmptyBlocks);
            return u.root = l(h, !1), u.elements.br = function (e) {
                return function (t) {
                    if (t.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var n = t.attributes;
                        if ("data-cke-bogus" in n || "data-cke-eol" in n) delete n["data-cke-bogus"]; else {
                            for (n = t.next; n && o(n);)n = n.next;
                            var l = i(t);
                            !n && a(t.parent) ? r(t.parent, s(e)) : a(n) && l && !a(l) && s(e).insertBefore(n)
                        }
                    }
                }
            }(h), u
        }

        function t(e, t) {
            return e != CKEDITOR.ENTER_BR && !1 !== t && (e == CKEDITOR.ENTER_DIV ? "div" : "p")
        }

        function n(e) {
            for (e = e.children[e.children.length - 1]; e && o(e);)e = e.previous;
            return e
        }

        function i(e) {
            for (e = e.previous; e && o(e);)e = e.previous;
            return e
        }

        function o(e) {
            return e.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(e.value) || e.type == CKEDITOR.NODE_ELEMENT && e.attributes["data-cke-bookmark"]
        }

        function a(e) {
            return e && (e.type == CKEDITOR.NODE_ELEMENT && e.name in I || e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
        }

        function r(e, t) {
            var n = e.children[e.children.length - 1];
            e.children.push(t), t.parent = e, n && (n.next = t, t.previous = n)
        }

        function s(e) {
            e = e.attributes, "false" != e.contenteditable && (e["data-cke-editable"] = e.contenteditable ? "true" : 1), e.contenteditable = "false"
        }

        function l(e) {
            switch (e = e.attributes, e["data-cke-editable"]) {
                case"true":
                    e.contenteditable = "true";
                    break;
                case"1":
                    delete e.contenteditable
            }
        }

        function c(e) {
            return e.replace(b, function (e, t, n) {
                return "<" + t + n.replace(y, function (e, t) {
                        return K.test(t) && -1 == n.indexOf("data-cke-saved-" + t) ? " data-cke-saved-" + e + " data-cke-" + CKEDITOR.rnd + "-" + e : e
                    }) + ">"
            })
        }

        function d(e, t) {
            return e.replace(t, function (e, t, n) {
                return 0 === e.indexOf("<textarea") && (e = t + f(n).replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</textarea>"), "<cke:encoded>" + encodeURIComponent(e) + "</cke:encoded>"
            })
        }

        function u(e) {
            return e.replace(w, function (e, t) {
                return decodeURIComponent(t)
            })
        }

        function h(e) {
            return e.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g, function (e) {
                return "\x3c!--" + p + "{C}" + encodeURIComponent(e).replace(/--/g, "%2D%2D") + "--\x3e"
            })
        }

        function f(e) {
            return e.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g, function (e, t) {
                return decodeURIComponent(t)
            })
        }

        function g(e, t) {
            var n = t._.dataStore;
            return e.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function (e, t) {
                return decodeURIComponent(t)
            }).replace(/\{cke_protected_(\d+)\}/g, function (e, t) {
                return n && n[t] || ""
            })
        }

        function m(e, t) {
            var n = [], i = t.config.protectedSource, o = t._.dataStore || (t._.dataStore = {id: 1}),
                a = /<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g,
                i = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(i);
            e = e.replace(/\x3c!--[\s\S]*?--\x3e/g, function (e) {
                return "\x3c!--{cke_tempcomment}" + (n.push(e) - 1) + "--\x3e"
            });
            for (var r = 0; r < i.length; r++)e = e.replace(i[r], function (e) {
                return e = e.replace(a, function (e, t, i) {
                    return n[i]
                }), /cke_temp(comment)?/.test(e) ? e : "\x3c!--{cke_temp}" + (n.push(e) - 1) + "--\x3e"
            });
            return e = e.replace(a, function (e, t, i) {
                return "\x3c!--" + p + (t ? "{C}" : "") + encodeURIComponent(n[i]).replace(/--/g, "%2D%2D") + "--\x3e"
            }), e = e.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function (e) {
                return e.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g, function (e, t) {
                    return o[o.id] = decodeURIComponent(t), "{cke_protected_" + o.id++ + "}"
                })
            }), e = e.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function (e, n, i, o) {
                return "<" + n + i + ">" + g(f(o), t) + "</" + n + ">"
            })
        }

        CKEDITOR.htmlDataProcessor = function (n) {
            var i, o, a = this;
            this.editor = n, this.dataFilter = i = new CKEDITOR.htmlParser.filter, this.htmlFilter = o = new CKEDITOR.htmlParser.filter, this.writer = new CKEDITOR.htmlParser.basicWriter, i.addRules(O), i.addRules(D, {applyToAll: !0}), i.addRules(e(n, "data"), {applyToAll: !0}), o.addRules(R), o.addRules(v, {applyToAll: !0}), o.addRules(e(n, "html"), {applyToAll: !0}), n.on("toHtml", function (e) {
                e = e.data;
                var i, o = e.dataValue, o = m(o, n), o = d(o, k), o = c(o), o = d(o, _), o = o.replace(N, "$1cke:$2"),
                    o = o.replace(x, "<cke:$1$2></cke:$1>"), o = o.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"),
                    o = o.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2");
                i = e.context || n.editable().getName();
                var a;
                CKEDITOR.env.ie && 9 > CKEDITOR.env.version && "pre" == i && (i = "div", o = "<pre>" + o + "</pre>", a = 1), i = n.document.createElement(i), i.setHtml("a" + o), o = i.getHtml().substr(1), o = o.replace(new RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), ""), a && (o = o.replace(/^<pre>|<\/pre>$/gi, "")), o = o.replace(S, "$1$2"), o = u(o), o = f(o), i = !1 !== e.fixForBody && t(e.enterMode, n.config.autoParagraph), o = CKEDITOR.htmlParser.fragment.fromHtml(o, e.context, i), i && (a = o, !a.children.length && CKEDITOR.dtd[a.name][i] && (i = new CKEDITOR.htmlParser.element(i), a.add(i))), e.dataValue = o
            }, null, null, 5), n.on("toHtml", function (e) {
                e.data.filter.applyTo(e.data.dataValue, !0, e.data.dontFilter, e.data.enterMode) && n.fire("dataFiltered")
            }, null, null, 6), n.on("toHtml", function (e) {
                e.data.dataValue.filterChildren(a.dataFilter, !0)
            }, null, null, 10), n.on("toHtml", function (e) {
                e = e.data;
                var t = e.dataValue, n = new CKEDITOR.htmlParser.basicWriter;
                t.writeChildrenHtml(n), t = n.getHtml(!0), e.dataValue = h(t)
            }, null, null, 15), n.on("toDataFormat", function (e) {
                var i = e.data.dataValue;
                e.data.enterMode != CKEDITOR.ENTER_BR && (i = i.replace(/^<br *\/?>/i, "")), e.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(i, e.data.context, t(e.data.enterMode, n.config.autoParagraph))
            }, null, null, 5), n.on("toDataFormat", function (e) {
                e.data.dataValue.filterChildren(a.htmlFilter, !0)
            }, null, null, 10), n.on("toDataFormat", function (e) {
                e.data.filter.applyTo(e.data.dataValue, !1, !0)
            }, null, null, 11), n.on("toDataFormat", function (e) {
                var t = e.data.dataValue, i = a.writer;
                i.reset(), t.writeChildrenHtml(i), t = i.getHtml(!0), t = f(t), t = g(t, n), e.data.dataValue = t
            }, null, null, 15)
        }, CKEDITOR.htmlDataProcessor.prototype = {
            toHtml: function (e, t, n, i) {
                var o, a, r, s, l = this.editor;
                return t && "object" == typeof t ? (o = t.context, n = t.fixForBody, i = t.dontFilter, a = t.filter, r = t.enterMode, s = t.protectedWhitespaces) : o = t, o || null === o || (o = l.editable().getName()), l.fire("toHtml", {
                    dataValue: e,
                    context: o,
                    fixForBody: n,
                    dontFilter: i,
                    filter: a || l.filter,
                    enterMode: r || l.enterMode,
                    protectedWhitespaces: s
                }).dataValue
            }, toDataFormat: function (e, t) {
                var n, i, o;
                return t && (n = t.context, i = t.filter, o = t.enterMode), n || null === n || (n = this.editor.editable().getName()), this.editor.fire("toDataFormat", {
                    dataValue: e,
                    filter: i || this.editor.filter,
                    context: n,
                    enterMode: o || this.editor.enterMode
                }).dataValue
            }
        };
        var E = /(?:&nbsp;|\xa0)$/, p = "{cke_protected}", T = CKEDITOR.dtd,
            C = "caption colgroup col thead tfoot tbody".split(" "),
            I = CKEDITOR.tools.extend({}, T.$blockLimit, T.$block), O = {elements: {input: s, textarea: s}}, D = {
                attributeNames: [[/^on/, "data-cke-pa-on"], [/^srcdoc/, "data-cke-pa-srcdoc"], [/^data-cke-expando$/, ""]],
                elements: {
                    iframe: function (e) {
                        if (e.attributes && e.attributes.src) {
                            var t = e.attributes.src.toLowerCase().replace(/[^a-z]/gi, "");
                            0 !== t.indexOf("javascript") && 0 !== t.indexOf("data") || (e.attributes["data-cke-pa-src"] = e.attributes.src, delete e.attributes.src)
                        }
                    }
                }
            }, R = {
                elements: {
                    embed: function (e) {
                        var t = e.parent;
                        if (t && "object" == t.name) {
                            var n = t.attributes.width, t = t.attributes.height;
                            n && (e.attributes.width = n), t && (e.attributes.height = t)
                        }
                    }, a: function (e) {
                        var t = e.attributes;
                        if (!(e.children.length || t.name || t.id || e.attributes["data-cke-saved-name"]))return !1
                    }
                }
            }, v = {
                elementNames: [[/^cke:/, ""], [/^\?xml:namespace$/, ""]],
                attributeNames: [[/^data-cke-(saved|pa)-/, ""], [/^data-cke-.*/, ""], ["hidefocus", ""]],
                elements: {
                    $: function (e) {
                        var t = e.attributes;
                        if (t) {
                            if (t["data-cke-temp"])return !1;
                            for (var n = ["name", "href", "src"], i = 0; i < n.length; i++)"data-cke-saved-" + n[i] in t && delete t[n[i]]
                        }
                        return e
                    }, table: function (e) {
                        e.children.slice(0).sort(function (e, t) {
                            var n, i;
                            return e.type == CKEDITOR.NODE_ELEMENT && t.type == e.type && (n = CKEDITOR.tools.indexOf(C, e.name), i = CKEDITOR.tools.indexOf(C, t.name)), -1 < n && -1 < i && n != i || (n = e.parent ? e.getIndex() : -1, i = t.parent ? t.getIndex() : -1), n > i ? 1 : -1
                        })
                    }, param: function (e) {
                        return e.children = [], e.isEmpty = !0, e
                    }, span: function (e) {
                        "Apple-style-span" == e.attributes.class && delete e.name
                    }, html: function (e) {
                        delete e.attributes.contenteditable, delete e.attributes.class
                    }, body: function (e) {
                        delete e.attributes.spellcheck, delete e.attributes.contenteditable
                    }, style: function (e) {
                        var t = e.children[0];
                        t && t.value && (t.value = CKEDITOR.tools.trim(t.value)), e.attributes.type || (e.attributes.type = "text/css")
                    }, title: function (e) {
                        var t = e.children[0];
                        !t && r(e, t = new CKEDITOR.htmlParser.text), t.value = e.attributes["data-cke-title"] || ""
                    }, input: l, textarea: l
                },
                attributes: {
                    class: function (e) {
                        return CKEDITOR.tools.ltrim(e.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1
                    }
                }
            };
        CKEDITOR.env.ie && (v.attributes.style = function (e) {
            return e.replace(/(^|;)([^\:]+)/g, function (e) {
                return e.toLowerCase()
            })
        });
        var b = /<(a|area|img|input|source)\b([^>]*)>/gi,
            y = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, K = /^(href|src|name)$/i,
            _ = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
            k = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi, w = /<cke:encoded>([^<]*)<\/cke:encoded>/gi,
            N = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,
            S = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, x = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
    }(),CKEDITOR.htmlParser.element = function (e, t) {
        this.name = e, this.attributes = t || {}, this.children = [];
        var n = e || "", i = n.match(/^cke:(.*)/);
        i && (n = i[1]), n = !!(CKEDITOR.dtd.$nonBodyContent[n] || CKEDITOR.dtd.$block[n] || CKEDITOR.dtd.$listItem[n] || CKEDITOR.dtd.$tableContent[n] || CKEDITOR.dtd.$nonEditable[n] || "br" == n), this.isEmpty = !!CKEDITOR.dtd.$empty[e], this.isUnknown = !CKEDITOR.dtd[e], this._ = {
            isBlockLike: n,
            hasInlineStarted: this.isEmpty || !n
        }
    },CKEDITOR.htmlParser.cssStyle = function (e) {
        var t = {};
        return ((e instanceof CKEDITOR.htmlParser.element ? e.attributes.style : e) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (e, n, i) {
            "font-family" == n && (i = i.replace(/["']/g, "")), t[n.toLowerCase()] = i
        }), {
            rules: t, populate: function (e) {
                var t = this.toString();
                t && (e instanceof CKEDITOR.dom.element ? e.setAttribute("style", t) : e instanceof CKEDITOR.htmlParser.element ? e.attributes.style = t : e.style = t)
            }, toString: function () {
                var e, n = [];
                for (e in t)t[e] && n.push(e, ":", t[e], ";");
                return n.join("")
            }
        }
    },function () {
        function e(e) {
            return function (t) {
                return t.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof e ? t.name == e : t.name in e)
            }
        }

        var t = function (e, t) {
            return e = e[0], t = t[0], e < t ? -1 : e > t ? 1 : 0
        }, n = CKEDITOR.htmlParser.fragment.prototype;
        CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_ELEMENT, add: n.add, clone: function () {
                return new CKEDITOR.htmlParser.element(this.name, this.attributes)
            }, filter: function (e, t) {
                var n, i, o = this;
                if (t = o.getFilterContext(t), t.off)return !0;
                for (o.parent || e.onRoot(t, o); ;) {
                    if (n = o.name, !(i = e.onElementName(t, n)))return this.remove(), !1;
                    if (o.name = i, !(o = e.onElement(t, o)))return this.remove(), !1;
                    if (o !== this)return this.replaceWith(o), !1;
                    if (o.name == n)break;
                    if (o.type != CKEDITOR.NODE_ELEMENT)return this.replaceWith(o), !1;
                    if (!o.name)return this.replaceWithChildren(), !1
                }
                n = o.attributes;
                var a, r;
                for (a in n) {
                    for (i = n[a]; ;) {
                        if (!(r = e.onAttributeName(t, a))) {
                            delete n[a];
                            break
                        }
                        if (r == a)break;
                        delete n[a], a = r
                    }
                    r && (!1 === (i = e.onAttribute(t, o, r, i)) ? delete n[r] : n[r] = i)
                }
                return o.isEmpty || this.filterChildren(e, !1, t), !0
            }, filterChildren: n.filterChildren, writeHtml: function (e, n) {
                n && this.filter(n);
                var i, o, a = this.name, r = [], s = this.attributes;
                e.openTag(a, s);
                for (i in s)r.push([i, s[i]]);
                for (e.sortAttributes && r.sort(t), i = 0, o = r.length; i < o; i++)s = r[i], e.attribute(s[0], s[1]);
                e.openTagClose(a, this.isEmpty), this.writeChildrenHtml(e), this.isEmpty || e.closeTag(a)
            }, writeChildrenHtml: n.writeChildrenHtml, replaceWithChildren: function () {
                for (var e = this.children, t = e.length; t;)e[--t].insertAfter(this);
                this.remove()
            }, forEach: n.forEach, getFirst: function (t) {
                if (!t)return this.children.length ? this.children[0] : null;
                "function" != typeof t && (t = e(t));
                for (var n = 0, i = this.children.length; n < i; ++n)if (t(this.children[n]))return this.children[n];
                return null
            }, getHtml: function () {
                var e = new CKEDITOR.htmlParser.basicWriter;
                return this.writeChildrenHtml(e), e.getHtml()
            }, setHtml: function (e) {
                e = this.children = CKEDITOR.htmlParser.fragment.fromHtml(e).children;
                for (var t = 0, n = e.length; t < n; ++t)e[t].parent = this
            }, getOuterHtml: function () {
                var e = new CKEDITOR.htmlParser.basicWriter;
                return this.writeHtml(e), e.getHtml()
            }, split: function (e) {
                for (var t = this.children.splice(e, this.children.length - e), n = this.clone(), i = 0; i < t.length; ++i)t[i].parent = n;
                return n.children = t, t[0] && (t[0].previous = null), 0 < e && (this.children[e - 1].next = null), this.parent.add(n, this.getIndex() + 1), n
            }, find: function (e, t) {
                void 0 === t && (t = !1);
                var n, i = [];
                for (n = 0; n < this.children.length; n++) {
                    var o = this.children[n];
                    "function" == typeof e && e(o) ? i.push(o) : "string" == typeof e && o.name === e && i.push(o), t && o.find && (i = i.concat(o.find(e, t)))
                }
                return i
            }, addClass: function (e) {
                if (!this.hasClass(e)) {
                    var t = this.attributes.class || "";
                    this.attributes.class = t + (t ? " " : "") + e
                }
            }, removeClass: function (e) {
                var t = this.attributes.class;
                t && ((t = CKEDITOR.tools.trim(t.replace(new RegExp("(?:\\s+|^)" + e + "(?:\\s+|$)"), " "))) ? this.attributes.class = t : delete this.attributes.class)
            }, hasClass: function (e) {
                var t = this.attributes.class;
                return !!t && new RegExp("(?:^|\\s)" + e + "(?=\\s|$)").test(t)
            }, getFilterContext: function (e) {
                var t = [];
                if (e || (e = {
                        off: !1,
                        nonEditable: !1,
                        nestedEditable: !1
                    }), e.off || "off" != this.attributes["data-cke-processor"] || t.push("off", !0), e.nonEditable || "false" != this.attributes.contenteditable ? e.nonEditable && !e.nestedEditable && "true" == this.attributes.contenteditable && t.push("nestedEditable", !0) : t.push("nonEditable", !0), t.length) {
                    e = CKEDITOR.tools.copy(e);
                    for (var n = 0; n < t.length; n += 2)e[t[n]] = t[n + 1]
                }
                return e
            }
        }, !0)
    }(),function () {
        var e = /{([^}]+)}/g;
        CKEDITOR.template = function (e) {
            this.source = String(e)
        }, CKEDITOR.template.prototype.output = function (t, n) {
            var i = this.source.replace(e, function (e, n) {
                return void 0 !== t[n] ? t[n] : e
            });
            return n ? n.push(i) : i
        }
    }(),delete CKEDITOR.loadFullCore,CKEDITOR.instances = {},CKEDITOR.document = new CKEDITOR.dom.document(document),CKEDITOR.add = function (e) {
        CKEDITOR.instances[e.name] = e, e.on("focus", function () {
            CKEDITOR.currentInstance != e && (CKEDITOR.currentInstance = e, CKEDITOR.fire("currentInstance"))
        }), e.on("blur", function () {
            CKEDITOR.currentInstance == e && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance"))
        }), CKEDITOR.fire("instance", null, e)
    },CKEDITOR.remove = function (e) {
        delete CKEDITOR.instances[e.name]
    },function () {
        var e = {};
        CKEDITOR.addTemplate = function (t, n) {
            var i = e[t];
            return i || (i = {name: t, source: n}, CKEDITOR.fire("template", i), e[t] = new CKEDITOR.template(i.source))
        }, CKEDITOR.getTemplate = function (t) {
            return e[t]
        }
    }(),function () {
        var e = [];
        CKEDITOR.addCss = function (t) {
            e.push(t)
        }, CKEDITOR.getCss = function () {
            return e.join("\n")
        }
    }(),CKEDITOR.on("instanceDestroyed", function () {
        CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset")
    }),CKEDITOR.TRISTATE_ON = 1,CKEDITOR.TRISTATE_OFF = 2,CKEDITOR.TRISTATE_DISABLED = 0,function () {
        CKEDITOR.inline = function (e, t) {
            if (!CKEDITOR.env.isCompatible)return null;
            if (e = CKEDITOR.dom.element.get(e), e.getEditor())throw'The editor instance "' + e.getEditor().name + '" is already attached to the provided element.';
            var n = new CKEDITOR.editor(t, e, CKEDITOR.ELEMENT_MODE_INLINE), i = e.is("textarea") ? e : null;
            return i ? (n.setData(i.getValue(), null, !0), e = CKEDITOR.dom.element.createFromHtml('<div contenteditable="' + !!n.readOnly + '" class="cke_textarea_inline">' + i.getValue() + "</div>", CKEDITOR.document), e.insertAfter(i), i.hide(), i.$.form && n._attachToForm()) : n.setData(e.getHtml(), null, !0), n.on("loaded", function () {
                n.fire("uiReady"), n.editable(e), n.container = e, n.ui.contentsElement = e, n.setData(n.getData(1)), n.resetDirty(), n.fire("contentDom"), n.mode = "wysiwyg", n.fire("mode"), n.status = "ready", n.fireOnce("instanceReady"), CKEDITOR.fire("instanceReady", null, n)
            }, null, null, 1e4), n.on("destroy", function () {
                i && (n.container.clearCustomData(), n.container.remove(), i.show()), n.element.clearCustomData(), delete n.element
            }), n
        }, CKEDITOR.inlineAll = function () {
            var e, t, n;
            for (n in CKEDITOR.dtd.$editable)for (var i = CKEDITOR.document.getElementsByTag(n), o = 0, a = i.count(); o < a; o++)e = i.getItem(o), "true" == e.getAttribute("contenteditable") && (t = {
                element: e,
                config: {}
            }, !1 !== CKEDITOR.fire("inline", t) && CKEDITOR.inline(e, t.config))
        }, CKEDITOR.domReady(function () {
            !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll()
        })
    }(),CKEDITOR.replaceClass = "ckeditor",function () {
        function e(e, i, o, a) {
            if (!CKEDITOR.env.isCompatible)return null;
            if (e = CKEDITOR.dom.element.get(e), e.getEditor())throw'The editor instance "' + e.getEditor().name + '" is already attached to the provided element.';
            var r = new CKEDITOR.editor(i, e, a);
            return a == CKEDITOR.ELEMENT_MODE_REPLACE && (e.setStyle("visibility", "hidden"), r._.required = e.hasAttribute("required"), e.removeAttribute("required")), o && r.setData(o, null, !0), r.on("loaded", function () {
                n(r), a == CKEDITOR.ELEMENT_MODE_REPLACE && r.config.autoUpdateElement && e.$.form && r._attachToForm(), r.setMode(r.config.startupMode, function () {
                    r.resetDirty(), r.status = "ready", r.fireOnce("instanceReady"), CKEDITOR.fire("instanceReady", null, r)
                })
            }), r.on("destroy", t), r
        }

        function t() {
            var e = this.container, t = this.element;
            e && (e.clearCustomData(), e.remove()), t && (t.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (t.show(), this._.required && t.setAttribute("required", "required")), delete this.element)
        }

        function n(e) {
            var t = e.name, n = e.element, i = e.elementMode, o = e.fire("uiSpace", {space: "top", html: ""}).html,
                a = e.fire("uiSpace", {space: "bottom", html: ""}).html,
                r = new CKEDITOR.template('<{outerEl} id="cke_{name}" class="{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir="{langDir}" lang="{langCode}" role="application"' + (e.title ? ' aria-labelledby="cke_{name}_arialbl"' : "") + ">" + (e.title ? '<span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span>' : "") + '<{outerEl} class="cke_inner cke_reset" role="presentation">{topHtml}<{outerEl} id="{contentId}" class="cke_contents cke_reset" role="presentation"></{outerEl}>{bottomHtml}</{outerEl}></{outerEl}>'),
                t = CKEDITOR.dom.element.createFromHtml(r.output({
                    id: e.id,
                    name: t,
                    langDir: e.lang.dir,
                    langCode: e.langCode,
                    voiceLabel: e.title,
                    topHtml: o ? '<span id="' + e.ui.spaceId("top") + '" class="cke_top cke_reset_all" role="presentation" style="height:auto">' + o + "</span>" : "",
                    contentId: e.ui.spaceId("contents"),
                    bottomHtml: a ? '<span id="' + e.ui.spaceId("bottom") + '" class="cke_bottom cke_reset_all" role="presentation">' + a + "</span>" : "",
                    outerEl: CKEDITOR.env.ie ? "span" : "div"
                }));
            i == CKEDITOR.ELEMENT_MODE_REPLACE ? (n.hide(), t.insertAfter(n)) : n.append(t), e.container = t, e.ui.contentsElement = e.ui.space("contents"), o && e.ui.space("top").unselectable(), a && e.ui.space("bottom").unselectable(), n = e.config.width, i = e.config.height, n && t.setStyle("width", CKEDITOR.tools.cssLength(n)), i && e.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(i)), t.disableContextMenu(), CKEDITOR.env.webkit && t.on("focus", function () {
                e.focus()
            }), e.fireOnce("uiReady")
        }

        CKEDITOR.replace = function (t, n) {
            return e(t, n, null, CKEDITOR.ELEMENT_MODE_REPLACE)
        }, CKEDITOR.appendTo = function (t, n, i) {
            return e(t, n, i, CKEDITOR.ELEMENT_MODE_APPENDTO)
        }, CKEDITOR.replaceAll = function () {
            for (var e = document.getElementsByTagName("textarea"), t = 0; t < e.length; t++) {
                var n = null, i = e[t];
                if (i.name || i.id) {
                    if ("string" == typeof arguments[0]) {
                        if (!new RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)").test(i.className))continue
                    } else if ("function" == typeof arguments[0] && (n = {}, !1 === arguments[0](i, n)))continue;
                    this.replace(i, n)
                }
            }
        }, CKEDITOR.editor.prototype.addMode = function (e, t) {
            (this._.modes || (this._.modes = {}))[e] = t
        }, CKEDITOR.editor.prototype.setMode = function (e, t) {
            var n = this, i = this._.modes;
            if (e != n.mode && i && i[e]) {
                if (n.fire("beforeSetMode", e), n.mode) {
                    var o, a = n.checkDirty(), i = n._.previousModeData, r = 0;
                    n.fire("beforeModeUnload"), n.editable(0), n._.previousMode = n.mode, n._.previousModeData = o = n.getData(1), "source" == n.mode && i == o && (n.fire("lockSnapshot", {forceUpdate: !0}), r = 1), n.ui.space("contents").setHtml(""), n.mode = ""
                } else n._.previousModeData = n.getData(1);
                this._.modes[e](function () {
                    n.mode = e, void 0 !== a && !a && n.resetDirty(), r ? n.fire("unlockSnapshot") : "wysiwyg" == e && n.fire("saveSnapshot"), setTimeout(function () {
                        n.fire("mode"), t && t.call(n)
                    }, 0)
                })
            }
        }, CKEDITOR.editor.prototype.resize = function (e, t, n, i) {
            var o = this.container, a = this.ui.space("contents"),
                r = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement;
            i = i ? this.container.getFirst(function (e) {
                return e.type == CKEDITOR.NODE_ELEMENT && e.hasClass("cke_inner")
            }) : o, i.setSize("width", e, !0), r && (r.style.width = "1%");
            var s = (i.$.offsetHeight || 0) - (a.$.clientHeight || 0), o = Math.max(t - (n ? 0 : s), 0);
            t = n ? t + s : t, a.setStyle("height", o + "px"), r && (r.style.width = "100%"), this.fire("resize", {
                outerHeight: t,
                contentsHeight: o,
                outerWidth: e || i.getSize("width")
            })
        }, CKEDITOR.editor.prototype.getResizable = function (e) {
            return e ? this.ui.space("contents") : this.container
        }, CKEDITOR.domReady(function () {
            CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass)
        })
    }(),CKEDITOR.config.startupMode = "wysiwyg",function () {
        function e(e) {
            var n, o = e.editor, a = e.data.path, s = a.blockLimit, l = e.data.selection, c = l.getRanges()[0];
            (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller) && (l = t(l, a)) && (l.appendBogus(), n = CKEDITOR.env.ie), r(o, a.block, s) && c.collapsed && !c.getCommonAncestor().isReadOnly() && (a = c.clone(), a.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), s = new CKEDITOR.dom.walker(a), s.guard = function (e) {
                return !i(e) || e.type == CKEDITOR.NODE_COMMENT || e.isReadOnly()
            }, !s.checkForward() || a.checkStartOfBlock() && a.checkEndOfBlock()) && (o = c.fixBlock(!0, o.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), CKEDITOR.env.needsBrFiller || (o = o.getFirst(i)) && o.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(o.getText()).match(/^(?:&nbsp;|\xa0)$/) && o.remove(), n = 1, e.cancel()), n && c.select()
        }

        function t(e, t) {
            if (e.isFake)return 0;
            var n = t.block || t.blockLimit, o = n && n.getLast(i);
            return !n || !n.isBlockBoundary() || o && o.type == CKEDITOR.NODE_ELEMENT && o.isBlockBoundary() || n.is("pre") || n.getBogus() ? void 0 : n
        }

        function n(e) {
            var t = e.data.getTarget();
            t.is("input") && ("submit" != (t = t.getAttribute("type")) && "reset" != t || e.data.preventDefault())
        }

        function i(e) {
            return d(e) && u(e)
        }

        function o(e, t) {
            return function (n) {
                var i = n.data.$.toElement || n.data.$.fromElement || n.data.$.relatedTarget;
                (i = i && i.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(i) : null) && (t.equals(i) || t.contains(i)) || e.call(this, n)
            }
        }

        function a(e) {
            function t(e) {
                return function (t, o) {
                    if (o && t.type == CKEDITOR.NODE_ELEMENT && t.is(a) && (n = t), !(o || !i(t) || e && f(t)))return !1
                }
            }

            var n, o = e.getRanges()[0];
            e = e.root;
            var a = {table: 1, ul: 1, ol: 1, dl: 1};
            if (o.startPath().contains(a)) {
                var r = o.clone();
                if (r.collapse(1), r.setStartAt(e, CKEDITOR.POSITION_AFTER_START), e = new CKEDITOR.dom.walker(r), e.guard = t(), e.checkBackward(), n)return r = o.clone(), r.collapse(), r.setEndAt(n, CKEDITOR.POSITION_AFTER_END), e = new CKEDITOR.dom.walker(r), e.guard = t(!0), n = !1, e.checkForward(), n
            }
            return null
        }

        function r(e, t, n) {
            return !1 !== e.config.autoParagraph && e.activeEnterMode != CKEDITOR.ENTER_BR && (e.editable().equals(n) && !t || t && "true" == t.getAttribute("contenteditable"))
        }

        function s(e) {
            return e.activeEnterMode != CKEDITOR.ENTER_BR && !1 !== e.config.autoParagraph && (e.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p")
        }

        function l(e) {
            var t = e.editor;
            t.getSelection().scrollIntoView(), setTimeout(function () {
                t.fire("saveSnapshot")
            }, 0)
        }

        function c(e, t, n) {
            var i = e.getCommonAncestor(t);
            for (t = e = n ? t : e; (e = e.getParent()) && !i.equals(e) && 1 == e.getChildCount();)t = e;
            t.remove()
        }

        var d, u, h, f, g, m, E, p, T, C;
        CKEDITOR.editable = CKEDITOR.tools.createClass({
            base: CKEDITOR.dom.element, $: function (e, t) {
                this.base(t.$ || t), this.editor = e, this.status = "unloaded", this.hasFocus = !1, this.setup()
            }, proto: {
                focus: function () {
                    var e;
                    if (CKEDITOR.env.webkit && !this.hasFocus && (e = this.editor._.previousActive || this.getDocument().getActive(), this.contains(e)))return void e.focus();
                    CKEDITOR.env.edge && 14 < CKEDITOR.env.version && !this.hasFocus && this.getDocument().equals(CKEDITOR.document) && (this.editor._.previousScrollTop = this.$.scrollTop);
                    try {
                        if (!CKEDITOR.env.ie || CKEDITOR.env.edge && 14 < CKEDITOR.env.version || !this.getDocument().equals(CKEDITOR.document))if (CKEDITOR.env.chrome) {
                            var t = this.$.scrollTop;
                            this.$.focus(), this.$.scrollTop = t
                        } else this.$.focus(); else this.$.setActive()
                    } catch (e) {
                        if (!CKEDITOR.env.ie)throw e
                    }
                    CKEDITOR.env.safari && !this.isInline() && (e = CKEDITOR.document.getActive(), e.equals(this.getWindow().getFrame()) || this.getWindow().focus())
                }, on: function (e, t) {
                    var n = Array.prototype.slice.call(arguments, 0);
                    return CKEDITOR.env.ie && /^focus|blur$/.exec(e) && (e = "focus" == e ? "focusin" : "focusout", t = o(t, this), n[0] = e, n[1] = t), CKEDITOR.dom.element.prototype.on.apply(this, n)
                }, attachListener: function (e) {
                    !this._.listeners && (this._.listeners = []);
                    var t = Array.prototype.slice.call(arguments, 1), t = e.on.apply(e, t);
                    return this._.listeners.push(t), t
                }, clearListeners: function () {
                    var e = this._.listeners;
                    try {
                        for (; e.length;)e.pop().removeListener()
                    } catch (e) {
                    }
                }, restoreAttrs: function () {
                    var e, t, n = this._.attrChanges;
                    for (t in n)n.hasOwnProperty(t) && (e = n[t], null !== e ? this.setAttribute(t, e) : this.removeAttribute(t))
                }, attachClass: function (e) {
                    var t = this.getCustomData("classes");
                    this.hasClass(e) || (!t && (t = []), t.push(e), this.setCustomData("classes", t), this.addClass(e))
                }, changeAttr: function (e, t) {
                    var n = this.getAttribute(e);
                    t !== n && (!this._.attrChanges && (this._.attrChanges = {}), e in this._.attrChanges || (this._.attrChanges[e] = n), this.setAttribute(e, t))
                }, insertText: function (e) {
                    this.editor.focus(), this.insertHtml(this.transformPlainTextToHtml(e), "text")
                }, transformPlainTextToHtml: function (e) {
                    var t = this.editor.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode;
                    return CKEDITOR.tools.transformPlainTextToHtml(e, t)
                }, insertHtml: function (e, t, n) {
                    var i = this.editor;
                    i.focus(), i.fire("saveSnapshot"), n || (n = i.getSelection().getRanges()[0]), m(this, t || "html", e, n), n.select(), l(this), this.editor.fire("afterInsertHtml", {})
                }, insertHtmlIntoRange: function (e, t, n) {
                    m(this, n || "html", e, t), this.editor.fire("afterInsertHtml", {intoRange: t})
                }, insertElement: function (e, t) {
                    var n = this.editor;
                    n.focus(), n.fire("saveSnapshot");
                    var o = n.activeEnterMode, n = n.getSelection(), a = e.getName(), a = CKEDITOR.dtd.$block[a];
                    t || (t = n.getRanges()[0]), this.insertElementIntoRange(e, t) && (t.moveToPosition(e, CKEDITOR.POSITION_AFTER_END), a && ((a = e.getNext(function (e) {
                        return i(e) && !f(e)
                    })) && a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$block) ? a.getDtd()["#"] ? t.moveToElementEditStart(a) : t.moveToElementEditEnd(e) : a || o == CKEDITOR.ENTER_BR || (a = t.fixBlock(!0, o == CKEDITOR.ENTER_DIV ? "div" : "p"), t.moveToElementEditStart(a)))), n.selectRanges([t]), l(this)
                }, insertElementIntoSelection: function (e) {
                    this.insertElement(e)
                }, insertElementIntoRange: function (e, t) {
                    var n = this.editor, i = n.config.enterMode, o = e.getName(), a = CKEDITOR.dtd.$block[o];
                    if (t.checkReadOnly())return !1;
                    t.deleteContents(1), t.startContainer.type == CKEDITOR.NODE_ELEMENT && (t.startContainer.is({
                        tr: 1,
                        table: 1,
                        tbody: 1,
                        thead: 1,
                        tfoot: 1
                    }) ? E(t) : t.startContainer.is(CKEDITOR.dtd.$list) && p(t));
                    var r, s;
                    if (a)for (; (r = t.getCommonAncestor(0, 1)) && (s = CKEDITOR.dtd[r.getName()]) && (!s || !s[o]);)r.getName() in CKEDITOR.dtd.span ? t.splitElement(r) : t.checkStartOfBlock() && t.checkEndOfBlock() ? (t.setStartBefore(r), t.collapse(!0), r.remove()) : t.splitBlock(i == CKEDITOR.ENTER_DIV ? "div" : "p", n.editable());
                    return t.insertNode(e), !0
                }, setData: function (e, t) {
                    t || (e = this.editor.dataProcessor.toHtml(e)), this.setHtml(e), this.fixInitialSelection(), "unloaded" == this.status && (this.status = "ready"), this.editor.fire("dataReady")
                }, getData: function (e) {
                    var t = this.getHtml();
                    return e || (t = this.editor.dataProcessor.toDataFormat(t)), t
                }, setReadOnly: function (e) {
                    this.setAttribute("contenteditable", !e)
                }, detach: function () {
                    this.removeClass("cke_editable"), this.status = "detached";
                    var e = this.editor;
                    this._.detach(), delete e.document, delete e.window
                }, isInline: function () {
                    return this.getDocument().equals(CKEDITOR.document)
                }, fixInitialSelection: function () {
                    function e() {
                        var e, n = t.getDocument().$, i = n.getSelection();
                        e:if (i.anchorNode && i.anchorNode == t.$) e = !0; else {
                            if (CKEDITOR.env.webkit && (e = t.getDocument().getActive()) && e.equals(t) && !i.anchorNode) {
                                e = !0;
                                break e
                            }
                            e = void 0
                        }
                        e && (e = new CKEDITOR.dom.range(t), e.moveToElementEditStart(t), n = n.createRange(), n.setStart(e.startContainer.$, e.startOffset), n.collapse(!0), i.removeAllRanges(), i.addRange(n))
                    }

                    var t = this;
                    CKEDITOR.env.ie && (9 > CKEDITOR.env.version || CKEDITOR.env.quirks) ? this.hasFocus && (this.focus(), function () {
                            var e = t.getDocument().$, n = e.selection, i = t.getDocument().getActive();
                            "None" == n.type && i.equals(t) && (n = new CKEDITOR.dom.range(t), e = e.body.createTextRange(), n.moveToElementEditStart(t), n = n.startContainer, n.type != CKEDITOR.NODE_ELEMENT && (n = n.getParent()), e.moveToElementText(n.$), e.collapse(!0), e.select())
                        }()) : this.hasFocus ? (this.focus(), e()) : this.once("focus", function () {
                        e()
                    }, null, null, -999)
                }, getHtmlFromRange: function (e) {
                    return e.collapsed ? new CKEDITOR.dom.documentFragment(e.document) : (e = {
                        doc: this.getDocument(),
                        range: e.clone()
                    }, T.eol.detect(e, this), T.bogus.exclude(e), T.cell.shrink(e), e.fragment = e.range.cloneContents(), T.tree.rebuild(e, this), T.eol.fix(e, this), new CKEDITOR.dom.documentFragment(e.fragment.$))
                }, extractHtmlFromRange: function (e, t) {
                    var n = C, i = {range: e, doc: e.document}, o = this.getHtmlFromRange(e);
                    if (e.collapsed)return e.optimize(), o;
                    e.enlarge(CKEDITOR.ENLARGE_INLINE, 1), n.table.detectPurge(i), i.bookmark = e.createBookmark(), delete i.range;
                    var a = this.editor.createRange();
                    if (a.moveToPosition(i.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START), i.targetBookmark = a.createBookmark(), n.list.detectMerge(i, this), n.table.detectRanges(i, this), n.block.detectMerge(i, this), i.tableContentsRanges ? (n.table.deleteRanges(i), e.moveToBookmark(i.bookmark), i.range = e) : (e.moveToBookmark(i.bookmark), i.range = e, e.extractContents(n.detectExtractMerge(i))), e.moveToBookmark(i.targetBookmark), e.optimize(), n.fixUneditableRangePosition(e), n.list.merge(i, this), n.table.purge(i, this), n.block.merge(i, this), t) {
                        if (n = e.startPath(), i = e.checkStartOfBlock() && e.checkEndOfBlock() && n.block && !e.root.equals(n.block)) {
                            e:{
                                var r, i = n.block.getElementsByTag("span"), a = 0;
                                if (i)for (; r = i.getItem(a++);)if (!u(r)) {
                                    i = !0;
                                    break e
                                }
                                i = !1
                            }
                            i = !i
                        }
                        i && (e.moveToPosition(n.block, CKEDITOR.POSITION_BEFORE_START), n.block.remove())
                    } else n.autoParagraph(this.editor, e), h(e.startContainer) && e.startContainer.appendBogus();
                    return e.startContainer.mergeSiblings(), o
                }, setup: function () {
                    var e = this.editor;
                    if (this.attachListener(e, "beforeGetData", function () {
                            var t = this.getData();
                            this.is("textarea") || !1 !== e.config.ignoreEmptyParagraph && (t = t.replace(g, function (e, t) {
                                return t
                            })), e.setData(t, null, 1)
                        }, this), this.attachListener(e, "getSnapshot", function (e) {
                            e.data = this.getData(1)
                        }, this), this.attachListener(e, "afterSetData", function () {
                            this.setData(e.getData(1))
                        }, this), this.attachListener(e, "loadSnapshot", function (e) {
                            this.setData(e.data, 1)
                        }, this), this.attachListener(e, "beforeFocus", function () {
                            var t = e.getSelection();
                            (t = t && t.getNative()) && "Control" == t.type || this.focus()
                        }, this), this.attachListener(e, "insertHtml", function (e) {
                            this.insertHtml(e.data.dataValue, e.data.mode, e.data.range)
                        }, this), this.attachListener(e, "insertElement", function (e) {
                            this.insertElement(e.data)
                        }, this), this.attachListener(e, "insertText", function (e) {
                            this.insertText(e.data)
                        }, this), this.setReadOnly(e.readOnly), this.attachClass("cke_editable"), e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") : e.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE && e.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || this.attachClass("cke_editable_themed"), this.attachClass("cke_contents_" + e.config.contentsLangDirection), e.keystrokeHandler.blockedKeystrokes[8] = +e.readOnly, e.keystrokeHandler.attach(this), this.on("blur", function () {
                            this.hasFocus = !1
                        }, null, null, -1), this.on("focus", function () {
                            this.hasFocus = !0
                        }, null, null, -1), CKEDITOR.env.webkit && this.on("scroll", function () {
                            e._.previousScrollTop = e.editable().$.scrollTop
                        }, null, null, -1), CKEDITOR.env.edge && 14 < CKEDITOR.env.version) {
                        var t = function () {
                            var n = e.editable();
                            null != e._.previousScrollTop && n.getDocument().equals(CKEDITOR.document) && (n.$.scrollTop = e._.previousScrollTop, e._.previousScrollTop = null, this.removeListener("scroll", t))
                        };
                        this.on("scroll", t)
                    }
                    if (e.focusManager.add(this), this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, e.once("contentDom", function () {
                            e.focusManager.focus(this)
                        }, this)), this.isInline() && this.changeAttr("tabindex", e.tabIndex), !this.is("textarea")) {
                        e.document = this.getDocument(), e.window = this.getWindow();
                        var o = e.document;
                        this.changeAttr("spellcheck", !e.config.disableNativeSpellChecker);
                        var r = e.config.contentsLangDirection;
                        this.getDirection(1) != r && this.changeAttr("dir", r);
                        var s = CKEDITOR.getCss();
                        if (s) {
                            var r = o.getHead(), l = r.getCustomData("stylesheet");
                            l ? s != l.getText() && (CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? l.$.styleSheet.cssText = s : l.setText(s)) : (s = o.appendStyleText(s), s = new CKEDITOR.dom.element(s.ownerNode || s.owningElement), r.setCustomData("stylesheet", s), s.data("cke-temp", 1))
                        }
                        r = o.getCustomData("stylesheet_ref") || 0, o.setCustomData("stylesheet_ref", r + 1), this.setCustomData("cke_includeReadonly", !e.config.disableReadonlyStyling), this.attachListener(this, "click", function (e) {
                            e = e.data;
                            var t = new CKEDITOR.dom.elementPath(e.getTarget(), this).contains("a");
                            t && 2 != e.$.button && t.isReadOnly() && e.preventDefault()
                        });
                        var u = {8: 1, 46: 1};
                        this.attachListener(e, "key", function (t) {
                            if (e.readOnly)return !0;
                            var n, i = t.data.domEvent.getKey();
                            if (t = e.getSelection(), 0 !== t.getRanges().length) {
                                if (i in u) {
                                    var o, r, s, l, c = t.getRanges()[0], h = c.startPath(), i = 8 == i;
                                    CKEDITOR.env.ie && 11 > CKEDITOR.env.version && (o = t.getSelectedElement()) || (o = a(t)) ? (e.fire("saveSnapshot"), c.moveToPosition(o, CKEDITOR.POSITION_BEFORE_START), o.remove(), c.select(), e.fire("saveSnapshot"), n = 1) : c.collapsed && ((r = h.block) && (l = r[i ? "getPrevious" : "getNext"](d)) && l.type == CKEDITOR.NODE_ELEMENT && l.is("table") && c[i ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (e.fire("saveSnapshot"), c[i ? "checkEndOfBlock" : "checkStartOfBlock"]() && r.remove(), c["moveToElementEdit" + (i ? "End" : "Start")](l), c.select(), e.fire("saveSnapshot"), n = 1) : h.blockLimit && h.blockLimit.is("td") && (s = h.blockLimit.getAscendant("table")) && c.checkBoundaryOfElement(s, i ? CKEDITOR.START : CKEDITOR.END) && (l = s[i ? "getPrevious" : "getNext"](d)) ? (e.fire("saveSnapshot"), c["moveToElementEdit" + (i ? "End" : "Start")](l), c.checkStartOfBlock() && c.checkEndOfBlock() ? l.remove() : c.select(), e.fire("saveSnapshot"), n = 1) : (s = h.contains(["td", "th", "caption"])) && c.checkBoundaryOfElement(s, i ? CKEDITOR.START : CKEDITOR.END) && (n = 1))
                                }
                                return !n
                            }
                        }), e.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller && this.attachListener(this, "keyup", function (t) {
                            t.data.getKeystroke() in u && !this.getFirst(i) && (this.appendBogus(), t = e.createRange(), t.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), t.select())
                        }), this.attachListener(this, "dblclick", function (t) {
                            if (e.readOnly)return !1;
                            t = {element: t.data.getTarget()}, e.fire("doubleclick", t)
                        }), CKEDITOR.env.ie && this.attachListener(this, "click", n), CKEDITOR.env.ie && !CKEDITOR.env.edge || this.attachListener(this, "mousedown", function (t) {
                            var n = t.data.getTarget();
                            n.is("img", "hr", "input", "textarea", "select") && !n.isReadOnly() && (e.getSelection().selectElement(n), n.is("input", "textarea", "select") && t.data.preventDefault())
                        }), CKEDITOR.env.edge && this.attachListener(this, "mouseup", function (t) {
                            (t = t.data.getTarget()) && t.is("img") && e.getSelection().selectElement(t)
                        }), CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function (t) {
                            if (2 == t.data.$.button && (t = t.data.getTarget(), !t.getOuterHtml().replace(g, ""))) {
                                var n = e.createRange();
                                n.moveToElementEditStart(t), n.select(!0)
                            }
                        }), CKEDITOR.env.webkit && (this.attachListener(this, "click", function (e) {
                            e.data.getTarget().is("input", "select") && e.data.preventDefault()
                        }), this.attachListener(this, "mouseup", function (e) {
                            e.data.getTarget().is("input", "textarea") && e.data.preventDefault()
                        })), CKEDITOR.env.webkit && this.attachListener(e, "key", function (t) {
                            if (e.readOnly)return !0;
                            var n = t.data.domEvent.getKey();
                            if (n in u && (t = e.getSelection(), 0 !== t.getRanges().length)) {
                                var n = 8 == n, i = t.getRanges()[0];
                                if (t = i.startPath(), i.collapsed)e:{
                                    var o = t.block;
                                    if (o && i[n ? "checkStartOfBlock" : "checkEndOfBlock"]() && i.moveToClosestEditablePosition(o, !n) && i.collapsed) {
                                        if (i.startContainer.type == CKEDITOR.NODE_ELEMENT) {
                                            var a = i.startContainer.getChild(i.startOffset - (n ? 1 : 0));
                                            if (a && a.type == CKEDITOR.NODE_ELEMENT && a.is("hr")) {
                                                e.fire("saveSnapshot"), a.remove(), t = !0;
                                                break e
                                            }
                                        }
                                        if (!(i = i.startPath().block) || i && i.contains(o)) t = void 0; else {
                                            e.fire("saveSnapshot");
                                            var r;
                                            (r = (n ? i : o).getBogus()) && r.remove(), r = e.getSelection(), a = r.createBookmarks(), (n ? o : i).moveChildren(n ? i : o, !1), t.lastElement.mergeSiblings(), c(o, i, !n), r.selectBookmarks(a), t = !0
                                        }
                                    } else t = !1
                                } else n = i, r = t.block, i = n.endPath().block, r && i && !r.equals(i) ? (e.fire("saveSnapshot"), (o = r.getBogus()) && o.remove(), n.enlarge(CKEDITOR.ENLARGE_INLINE), n.deleteContents(), i.getParent() && (i.moveChildren(r, !1), t.lastElement.mergeSiblings(), c(r, i, !0)), n = e.getSelection().getRanges()[0], n.collapse(1), n.optimize(), "" === n.startContainer.getHtml() && n.startContainer.appendBogus(), n.select(), t = !0) : t = !1;
                                if (!t)return;
                                return e.getSelection().scrollIntoView(), e.fire("saveSnapshot"), !1
                            }
                        }, this, null, 100)
                    }
                }
            }, _: {
                detach: function () {
                    this.editor.setData(this.editor.getData(), 0, 1), this.clearListeners(), this.restoreAttrs();
                    var e;
                    if (e = this.removeCustomData("classes"))for (; e.length;)this.removeClass(e.pop());
                    if (!this.is("textarea")) {
                        e = this.getDocument();
                        var t = e.getHead();
                        if (t.getCustomData("stylesheet")) {
                            var n = e.getCustomData("stylesheet_ref");
                            --n ? e.setCustomData("stylesheet_ref", n) : (e.removeCustomData("stylesheet_ref"), t.removeCustomData("stylesheet").remove())
                        }
                    }
                    this.editor.fire("contentDomUnload"), delete this.editor
                }
            }
        }), CKEDITOR.editor.prototype.editable = function (e) {
            var t = this._.editable;
            return t && e ? 0 : (arguments.length && (t = this._.editable = e ? e instanceof CKEDITOR.editable ? e : new CKEDITOR.editable(this, e) : (t && t.detach(), null)), t)
        }, CKEDITOR.on("instanceLoaded", function (t) {
            var n = t.editor;
            n.on("insertElement", function (e) {
                e = e.data, e.type == CKEDITOR.NODE_ELEMENT && (e.is("input") || e.is("textarea")) && ("false" != e.getAttribute("contentEditable") && e.data("cke-editable", e.hasAttribute("contenteditable") ? "true" : "1"), e.setAttribute("contentEditable", !1))
            }), n.on("selectionChange", function (t) {
                if (!n.readOnly) {
                    var i = n.getSelection();
                    i && !i.isLocked && (i = n.checkDirty(), n.fire("lockSnapshot"), e(t), n.fire("unlockSnapshot"), !i && n.resetDirty())
                }
            })
        }), CKEDITOR.on("instanceCreated", function (e) {
            var t = e.editor;
            t.on("mode", function () {
                var e = t.editable();
                if (e && e.isInline()) {
                    var n = t.title;
                    e.changeAttr("role", "textbox"), e.changeAttr("aria-label", n), n && e.changeAttr("title", n);
                    var i = t.fire("ariaEditorHelpLabel", {}).label;
                    if (i && (n = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) {
                        var o = CKEDITOR.tools.getNextId(),
                            i = CKEDITOR.dom.element.createFromHtml('<span id="' + o + '" class="cke_voice_label">' + i + "</span>");
                        n.append(i), e.changeAttr("aria-describedby", o)
                    }
                }
            })
        }), CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}"), d = CKEDITOR.dom.walker.whitespaces(!0), u = CKEDITOR.dom.walker.bookmark(!1, !0), h = CKEDITOR.dom.walker.empty(), f = CKEDITOR.dom.walker.bogus(), g = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi, m = function () {
            function e(e) {
                return e.type == CKEDITOR.NODE_ELEMENT
            }

            function t(n, i) {
                var o, a, r, s, l = [], c = i.range.startContainer;
                o = i.range.startPath();
                for (var c = d[c.getName()], u = 0, h = n.getChildren(), f = h.count(), g = -1, m = -1, E = 0, p = o.contains(d.$list); u < f; ++u)o = h.getItem(u), e(o) ? (r = o.getName(), p && r in CKEDITOR.dtd.$list ? l = l.concat(t(o, i)) : (s = !!c[r], "br" != r || !o.data("cke-eol") || u && u != f - 1 || (E = (a = u ? l[u - 1].node : h.getItem(u + 1)) && (!e(a) || !a.is("br")), a = a && e(a) && d.$block[a.getName()]), -1 != g || s || (g = u), s || (m = u), l.push({
                    isElement: 1,
                    isLineBreak: E,
                    isBlock: o.isBlockBoundary(),
                    hasBlockSibling: a,
                    node: o,
                    name: r,
                    allowed: s
                }), a = E = 0)) : l.push({isElement: 0, node: o, allowed: 1});
                return -1 < g && (l[g].firstNotAllowed = 1), -1 < m && (l[m].lastNotAllowed = 1), l
            }

            function n(t, i) {
                var o, a = [], r = t.getChildren(), s = r.count(), l = 0, c = d[i], u = !t.is(d.$inline) || t.is("br");
                for (u && a.push(" "); l < s; l++)o = r.getItem(l), e(o) && !o.is(c) ? a = a.concat(n(o, i)) : a.push(o);
                return u && a.push(" "), a
            }

            function o(t) {
                return e(t.startContainer) && t.startContainer.getChild(t.startOffset - 1)
            }

            function a(t) {
                return t && e(t) && (t.is(d.$removeEmpty) || t.is("a") && !t.isBlockBoundary())
            }

            function l(t, n, i, o) {
                var a, r, s = t.clone();
                s.setEndAt(n, CKEDITOR.POSITION_BEFORE_END), (a = new CKEDITOR.dom.walker(s).next()) && e(a) && u[a.getName()] && (r = a.getPrevious()) && e(r) && !r.getParent().equals(t.startContainer) && i.contains(r) && o.contains(a) && a.isIdentical(r) && (a.moveChildren(r), a.remove(), l(t, n, i, o))
            }

            function c(t, n) {
                function i(t, n) {
                    if (n.isBlock && n.isElement && !n.node.is("br") && e(t) && t.is("br"))return t.remove(), 1
                }

                var o = n.endContainer.getChild(n.endOffset), a = n.endContainer.getChild(n.endOffset - 1);
                o && i(o, t[t.length - 1]), a && i(a, t[0]) && (n.setEnd(n.endContainer, n.endOffset - 1), n.collapse())
            }

            var d = CKEDITOR.dtd, u = {
                p: 1,
                div: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                ul: 1,
                ol: 1,
                li: 1,
                pre: 1,
                dl: 1,
                blockquote: 1
            }, h = {p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1}, f = CKEDITOR.tools.extend({}, d.$inline);
            return delete f.br, function (u, g, m, E) {
                var p = u.editor, T = !1;
                if ("unfiltered_html" == g && (g = "html", T = !0), !E.checkReadOnly()) {
                    var C = new CKEDITOR.dom.elementPath(E.startContainer, E.root).blockLimit || E.root;
                    u = {
                        type: g,
                        dontFilter: T,
                        editable: u,
                        editor: p,
                        range: E,
                        blockLimit: C,
                        mergeCandidates: [],
                        zombies: []
                    }, g = u.range, E = u.mergeCandidates;
                    var I, O;
                    if ("text" == u.type && g.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (I = CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", g.document), g.insertNode(I), g.setStartAfter(I)), T = new CKEDITOR.dom.elementPath(g.startContainer), u.endPath = C = new CKEDITOR.dom.elementPath(g.endContainer), !g.collapsed) {
                        var p = C.block || C.blockLimit, D = g.getCommonAncestor();
                        p && !p.equals(D) && !p.contains(D) && g.checkEndOfBlock() && u.zombies.push(p), g.deleteContents()
                    }
                    for (; (O = o(g)) && e(O) && O.isBlockBoundary() && T.contains(O);)g.moveToPosition(O, CKEDITOR.POSITION_BEFORE_END);
                    for (l(g, u.blockLimit, T, C), I && (g.setEndBefore(I), g.collapse(), I.remove()), I = g.startPath(), (p = I.contains(a, !1, 1)) && (g.splitElement(p), u.inlineStylesRoot = p, u.inlineStylesPeak = I.lastElement), I = g.createBookmark(), (p = I.startNode.getPrevious(i)) && e(p) && a(p) && E.push(p), (p = I.startNode.getNext(i)) && e(p) && a(p) && E.push(p), p = I.startNode; (p = p.getParent()) && a(p);)E.push(p);
                    if (g.moveToBookmark(I), I = m) {
                        if (I = u.range, "text" == u.type && u.inlineStylesRoot) {
                            for (O = u.inlineStylesPeak, g = O.getDocument().createText("{cke-peak}"), E = u.inlineStylesRoot.getParent(); !O.equals(E);)g = g.appendTo(O.clone()), O = O.getParent();
                            m = g.getOuterHtml().split("{cke-peak}").join(m)
                        }
                        if (O = u.blockLimit.getName(), /^\s+|\s+$/.test(m) && "span" in CKEDITOR.dtd[O]) {
                            var R = '<span data-cke-marker="1">&nbsp;</span>';
                            m = R + m + R
                        }
                        if (m = u.editor.dataProcessor.toHtml(m, {
                                context: null,
                                fixForBody: !1,
                                protectedWhitespaces: !!R,
                                dontFilter: u.dontFilter,
                                filter: u.editor.activeFilter,
                                enterMode: u.editor.activeEnterMode
                            }), O = I.document.createElement("body"), O.setHtml(m), R && (O.getFirst().remove(), O.getLast().remove()), (R = I.startPath().block) && (1 != R.getChildCount() || !R.getBogus()))e:{
                            var v;
                            if (1 == O.getChildCount() && e(v = O.getFirst()) && v.is(h) && !v.hasAttribute("contenteditable")) {
                                for (R = v.getElementsByTag("*"), I = 0, E = R.count(); I < E; I++)if (g = R.getItem(I), !g.is(f))break e;
                                v.moveChildren(v.getParent(1)), v.remove()
                            }
                        }
                        u.dataWrapper = O, I = m
                    }
                    if (I) {
                        v = u.range, I = v.document;
                        var b;
                        O = u.blockLimit, E = 0;
                        var y, K, _, R = [];
                        m = p = 0;
                        var k, w;
                        g = v.startContainer;
                        var N, T = u.endPath.elements[0], C = T.getPosition(g),
                            D = !(!T.getCommonAncestor(g) || C == CKEDITOR.POSITION_IDENTICAL || C & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED);
                        for (g = t(u.dataWrapper, u), c(g, v); E < g.length; E++) {
                            if (C = g[E], b = C.isLineBreak) {
                                b = v, k = O;
                                var S = void 0, x = void 0;
                                C.hasBlockSibling ? b = 1 : (S = b.startContainer.getAscendant(d.$block, 1)) && S.is({
                                    div: 1,
                                    p: 1
                                }) ? (x = S.getPosition(k), x == CKEDITOR.POSITION_IDENTICAL || x == CKEDITOR.POSITION_CONTAINS ? b = 0 : (k = b.splitElement(S), b.moveToPosition(k, CKEDITOR.POSITION_AFTER_START), b = 1)) : b = 0
                            }
                            if (b) m = 0 < E; else {
                                if (b = v.startPath(), !C.isBlock && r(u.editor, b.block, b.blockLimit) && (_ = s(u.editor)) && (_ = I.createElement(_), _.appendBogus(), v.insertNode(_), CKEDITOR.env.needsBrFiller && (y = _.getBogus()) && y.remove(), v.moveToPosition(_, CKEDITOR.POSITION_BEFORE_END)), (b = v.startPath().block) && !b.equals(K) && ((y = b.getBogus()) && (y.remove(), R.push(b)), K = b), C.firstNotAllowed && (p = 1), p && C.isElement) {
                                    for (b = v.startContainer, k = null; b && !d[b.getName()][C.name];) {
                                        if (b.equals(O)) {
                                            b = null;
                                            break
                                        }
                                        k = b, b = b.getParent()
                                    }
                                    if (b) k && (w = v.splitElement(k), u.zombies.push(w), u.zombies.push(k)); else {
                                        k = O.getName(), N = !E, b = E == g.length - 1, k = n(C.node, k);
                                        for (var S = [], x = k.length, A = 0, L = void 0, F = 0, P = -1; A < x; A++)L = k[A], " " == L ? (F || N && !A || (S.push(new CKEDITOR.dom.text(" ")), P = S.length), F = 1) : (S.push(L), F = 0);
                                        b && P == S.length && S.pop(), N = S
                                    }
                                }
                                if (N) {
                                    for (; b = N.pop();)v.insertNode(b);
                                    N = 0
                                } else v.insertNode(C.node);
                                C.lastNotAllowed && E < g.length - 1 && ((w = D ? T : w) && v.setEndAt(w, CKEDITOR.POSITION_AFTER_START), p = 0), v.collapse()
                            }
                        }
                        1 != g.length ? y = !1 : (y = g[0], y = y.isElement && "false" == y.node.getAttribute("contenteditable")), y && (m = !0,
                            b = g[0].node, v.setStartAt(b, CKEDITOR.POSITION_BEFORE_START), v.setEndAt(b, CKEDITOR.POSITION_AFTER_END)), u.dontMoveCaret = m, u.bogusNeededBlocks = R
                    }
                    y = u.range;
                    var B;
                    for (w = u.bogusNeededBlocks, N = y.createBookmark(); K = u.zombies.pop();)K.getParent() && (_ = y.clone(), _.moveToElementEditStart(K), _.removeEmptyBlocksAtEnd());
                    if (w)for (; K = w.pop();)CKEDITOR.env.needsBrFiller ? K.appendBogus() : K.append(y.document.createText(" "));
                    for (; K = u.mergeCandidates.pop();)K.mergeSiblings();
                    if (y.moveToBookmark(N), !u.dontMoveCaret) {
                        for (K = o(y); K && e(K) && !K.is(d.$empty);) {
                            if (K.isBlockBoundary()) y.moveToPosition(K, CKEDITOR.POSITION_BEFORE_END); else {
                                if (a(K) && K.getHtml().match(/(\s|&nbsp;)$/g)) {
                                    B = null;
                                    break
                                }
                                B = y.clone(), B.moveToPosition(K, CKEDITOR.POSITION_BEFORE_END)
                            }
                            K = K.getLast(i)
                        }
                        B && y.moveToRange(B)
                    }
                }
            }
        }(), E = function () {
            function e(e) {
                return e = new CKEDITOR.dom.walker(e), e.guard = function (e, t) {
                    return !t && (e.type == CKEDITOR.NODE_ELEMENT ? e.is(CKEDITOR.dtd.$tableContent) : void 0)
                }, e.evaluator = function (e) {
                    return e.type == CKEDITOR.NODE_ELEMENT
                }, e
            }

            function t(e, t, n) {
                return t = e.getDocument().createElement(t), e.append(t, n), t
            }

            function n(e) {
                var t, n = e.count();
                for (n; 0 < n--;)t = e.getItem(n), CKEDITOR.tools.trim(t.getHtml()) || (t.appendBogus(), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && t.getChildCount() && t.getFirst().remove())
            }

            return function (i) {
                var o = i.startContainer, a = o.getAscendant("table", 1), r = !1;
                n(a.getElementsByTag("td")), n(a.getElementsByTag("th")), a = i.clone(), a.setStart(o, 0), a = e(a).lastBackward(), a || (a = i.clone(), a.setEndAt(o, CKEDITOR.POSITION_BEFORE_END), a = e(a).lastForward(), r = !0), a || (a = o), a.is("table") ? (i.setStartAt(a, CKEDITOR.POSITION_BEFORE_START), i.collapse(!0), a.remove()) : (a.is({
                    tbody: 1,
                    thead: 1,
                    tfoot: 1
                }) && (a = t(a, "tr", r)), a.is("tr") && (a = t(a, a.getParent().is("thead") ? "th" : "td", r)), (o = a.getBogus()) && o.remove(), i.moveToPosition(a, r ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
            }
        }(), p = function () {
            function e(e) {
                return e = new CKEDITOR.dom.walker(e), e.guard = function (e, t) {
                    return !t && (e.type == CKEDITOR.NODE_ELEMENT ? e.is(CKEDITOR.dtd.$list) || e.is(CKEDITOR.dtd.$listItem) : void 0)
                }, e.evaluator = function (e) {
                    return e.type == CKEDITOR.NODE_ELEMENT && e.is(CKEDITOR.dtd.$listItem)
                }, e
            }

            return function (t) {
                var n, i = t.startContainer, o = !1;
                n = t.clone(), n.setStart(i, 0), n = e(n).lastBackward(), n || (n = t.clone(), n.setEndAt(i, CKEDITOR.POSITION_BEFORE_END), n = e(n).lastForward(), o = !0), n || (n = i), n.is(CKEDITOR.dtd.$list) ? (t.setStartAt(n, CKEDITOR.POSITION_BEFORE_START), t.collapse(!0), n.remove()) : ((i = n.getBogus()) && i.remove(), t.moveToPosition(n, o ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END), t.select())
            }
        }(), T = {
            eol: {
                detect: function (e, t) {
                    var n = e.range, i = n.clone(), o = n.clone(),
                        a = new CKEDITOR.dom.elementPath(n.startContainer, t),
                        r = new CKEDITOR.dom.elementPath(n.endContainer, t);
                    i.collapse(1), o.collapse(), a.block && i.checkBoundaryOfElement(a.block, CKEDITOR.END) && (n.setStartAfter(a.block), e.prependEolBr = 1), r.block && o.checkBoundaryOfElement(r.block, CKEDITOR.START) && (n.setEndBefore(r.block), e.appendEolBr = 1)
                }, fix: function (e, t) {
                    var n, i = t.getDocument();
                    e.appendEolBr && (n = this.createEolBr(i), e.fragment.append(n)), !e.prependEolBr || n && !n.getPrevious() || e.fragment.append(this.createEolBr(i), 1)
                }, createEolBr: function (e) {
                    return e.createElement("br", {attributes: {"data-cke-eol": 1}})
                }
            }, bogus: {
                exclude: function (e) {
                    var t = e.range.getBoundaryNodes(), n = t.startNode, t = t.endNode;
                    !t || !f(t) || n && n.equals(t) || e.range.setEndBefore(t)
                }
            }, tree: {
                rebuild: function (e, t) {
                    var n, i = e.range, o = i.getCommonAncestor(), a = new CKEDITOR.dom.elementPath(o, t),
                        r = new CKEDITOR.dom.elementPath(i.startContainer, t),
                        i = new CKEDITOR.dom.elementPath(i.endContainer, t);
                    if (o.type == CKEDITOR.NODE_TEXT && (o = o.getParent()), a.blockLimit.is({tr: 1, table: 1})) {
                        var s = a.contains("table").getParent();
                        n = function (e) {
                            return !e.equals(s)
                        }
                    } else if (a.block && a.block.is(CKEDITOR.dtd.$listItem) && (r = r.contains(CKEDITOR.dtd.$list), i = i.contains(CKEDITOR.dtd.$list), !r.equals(i))) {
                        var l = a.contains(CKEDITOR.dtd.$list).getParent();
                        n = function (e) {
                            return !e.equals(l)
                        }
                    }
                    n || (n = function (e) {
                        return !e.equals(a.block) && !e.equals(a.blockLimit)
                    }), this.rebuildFragment(e, t, o, n)
                }, rebuildFragment: function (e, t, n, i) {
                    for (var o; n && !n.equals(t) && i(n);)o = n.clone(0, 1), e.fragment.appendTo(o), e.fragment = o, n = n.getParent()
                }
            }, cell: {
                shrink: function (e) {
                    e = e.range;
                    var t = e.startContainer, n = e.endContainer, i = e.startOffset, o = e.endOffset;
                    t.type == CKEDITOR.NODE_ELEMENT && t.equals(n) && t.is("tr") && ++i == o && e.shrink(CKEDITOR.SHRINK_TEXT)
                }
            }
        }, C = function () {
            function e(e, t) {
                var n = e.getParent();
                n.is(CKEDITOR.dtd.$inline) && e[t ? "insertBefore" : "insertAfter"](n)
            }

            function t(t, n, i) {
                e(n), e(i, 1);
                for (var o; o = i.getNext();)o.insertAfter(n), n = o;
                h(t) && t.remove()
            }

            function n(e, t) {
                var n = new CKEDITOR.dom.range(e);
                return n.setStartAfter(t.startNode), n.setEndBefore(t.endNode), n
            }

            return {
                list: {
                    detectMerge: function (e, t) {
                        var i = n(t, e.bookmark), o = i.startPath(), a = i.endPath(),
                            r = o.contains(CKEDITOR.dtd.$list), s = a.contains(CKEDITOR.dtd.$list);
                        e.mergeList = r && s && r.getParent().equals(s.getParent()) && !r.equals(s), e.mergeListItems = o.block && a.block && o.block.is(CKEDITOR.dtd.$listItem) && a.block.is(CKEDITOR.dtd.$listItem), (e.mergeList || e.mergeListItems) && (i = i.clone(), i.setStartBefore(e.bookmark.startNode), i.setEndAfter(e.bookmark.endNode), e.mergeListBookmark = i.createBookmark())
                    }, merge: function (e, n) {
                        if (e.mergeListBookmark) {
                            var i = e.mergeListBookmark.startNode, o = e.mergeListBookmark.endNode,
                                a = new CKEDITOR.dom.elementPath(i, n), r = new CKEDITOR.dom.elementPath(o, n);
                            if (e.mergeList) {
                                var s = a.contains(CKEDITOR.dtd.$list), l = r.contains(CKEDITOR.dtd.$list);
                                s.equals(l) || (l.moveChildren(s), l.remove())
                            }
                            e.mergeListItems && (a = a.contains(CKEDITOR.dtd.$listItem), r = r.contains(CKEDITOR.dtd.$listItem), a.equals(r) || t(r, i, o)), i.remove(), o.remove()
                        }
                    }
                }, block: {
                    detectMerge: function (e, t) {
                        if (!e.tableContentsRanges && !e.mergeListBookmark) {
                            var n = new CKEDITOR.dom.range(t);
                            n.setStartBefore(e.bookmark.startNode), n.setEndAfter(e.bookmark.endNode), e.mergeBlockBookmark = n.createBookmark()
                        }
                    }, merge: function (e, n) {
                        if (e.mergeBlockBookmark && !e.purgeTableBookmark) {
                            var i = e.mergeBlockBookmark.startNode, o = e.mergeBlockBookmark.endNode,
                                a = new CKEDITOR.dom.elementPath(i, n), r = new CKEDITOR.dom.elementPath(o, n),
                                a = a.block, r = r.block;
                            a && r && !a.equals(r) && t(r, i, o), i.remove(), o.remove()
                        }
                    }
                }, table: function () {
                    function e(e) {
                        var n, o = [], a = new CKEDITOR.dom.walker(e), r = e.startPath().contains(i),
                            s = e.endPath().contains(i), l = {};
                        return a.guard = function (a, c) {
                            if (a.type == CKEDITOR.NODE_ELEMENT) {
                                var d = "visited_" + (c ? "out" : "in");
                                if (a.getCustomData(d))return;
                                CKEDITOR.dom.element.setMarker(l, a, d, 1)
                            }
                            if (c && r && a.equals(r)) n = e.clone(), n.setEndAt(r, CKEDITOR.POSITION_BEFORE_END), o.push(n); else if (!c && s && a.equals(s)) n = e.clone(), n.setStartAt(s, CKEDITOR.POSITION_AFTER_START), o.push(n); else {
                                if ((d = !c) && (d = a.type == CKEDITOR.NODE_ELEMENT && a.is(i) && (!r || t(a, r)) && (!s || t(a, s))), !d && (d = c))if (a.is(i))var d = r && r.getAscendant("table", !0),
                                    u = s && s.getAscendant("table", !0), h = a.getAscendant("table", !0),
                                    d = d && d.contains(h) || u && u.contains(h); else d = void 0;
                                d && (n = e.clone(), n.selectNodeContents(a), o.push(n))
                            }
                        }, a.lastForward(), CKEDITOR.dom.element.clearAllMarkers(l), o
                    }

                    function t(e, t) {
                        var n = CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED, i = e.getPosition(t);
                        return i !== CKEDITOR.POSITION_IDENTICAL && 0 == (i & n)
                    }

                    var i = {td: 1, th: 1, caption: 1};
                    return {
                        detectPurge: function (e) {
                            var t = e.range, n = t.clone();
                            n.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                            var n = new CKEDITOR.dom.walker(n), o = 0;
                            if (n.evaluator = function (e) {
                                    e.type == CKEDITOR.NODE_ELEMENT && e.is(i) && ++o
                                }, n.checkForward(), 1 < o) {
                                var n = t.startPath().contains("table"), a = t.endPath().contains("table");
                                n && a && t.checkBoundaryOfElement(n, CKEDITOR.START) && t.checkBoundaryOfElement(a, CKEDITOR.END) && (t = e.range.clone(), t.setStartBefore(n), t.setEndAfter(a), e.purgeTableBookmark = t.createBookmark())
                            }
                        }, detectRanges: function (o, a) {
                            var r, s, l = n(a, o.bookmark), c = l.clone(), d = l.getCommonAncestor();
                            d.is(CKEDITOR.dtd.$tableContent) && !d.is(i) && (d = d.getAscendant("table", !0)), s = d, d = new CKEDITOR.dom.elementPath(l.startContainer, s), s = new CKEDITOR.dom.elementPath(l.endContainer, s), d = d.contains("table"), s = s.contains("table"), (d || s) && (d && s && t(d, s) ? (o.tableSurroundingRange = c, c.setStartAt(d, CKEDITOR.POSITION_AFTER_END), c.setEndAt(s, CKEDITOR.POSITION_BEFORE_START), c = l.clone(), c.setEndAt(d, CKEDITOR.POSITION_AFTER_END), r = l.clone(), r.setStartAt(s, CKEDITOR.POSITION_BEFORE_START), r = e(c).concat(e(r))) : d ? s || (o.tableSurroundingRange = c, c.setStartAt(d, CKEDITOR.POSITION_AFTER_END), l.setEndAt(d, CKEDITOR.POSITION_AFTER_END)) : (o.tableSurroundingRange = c, c.setEndAt(s, CKEDITOR.POSITION_BEFORE_START), l.setStartAt(s, CKEDITOR.POSITION_AFTER_START)), o.tableContentsRanges = r || e(l))
                        }, deleteRanges: function (e) {
                            for (var t; t = e.tableContentsRanges.pop();)t.extractContents(), h(t.startContainer) && t.startContainer.appendBogus();
                            e.tableSurroundingRange && e.tableSurroundingRange.extractContents()
                        }, purge: function (e) {
                            if (e.purgeTableBookmark) {
                                var t = e.doc, n = e.range.clone(), t = t.createElement("p");
                                t.insertBefore(e.purgeTableBookmark.startNode), n.moveToBookmark(e.purgeTableBookmark), n.deleteContents(), e.range.moveToPosition(t, CKEDITOR.POSITION_AFTER_START)
                            }
                        }
                    }
                }(), detectExtractMerge: function (e) {
                    return !(e.range.startPath().contains(CKEDITOR.dtd.$listItem) && e.range.endPath().contains(CKEDITOR.dtd.$listItem))
                }, fixUneditableRangePosition: function (e) {
                    e.startContainer.getDtd()["#"] || e.moveToClosestEditablePosition(null, !0)
                }, autoParagraph: function (e, t) {
                    var n, i = t.startPath();
                    r(e, i.block, i.blockLimit) && (n = s(e)) && (n = t.document.createElement(n), n.appendBogus(), t.insertNode(n), t.moveToPosition(n, CKEDITOR.POSITION_AFTER_START))
                }
            }
        }()
    }(),function () {
        function e(e) {
            return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(e)
        }

        function t(t, n) {
            if (0 === t.length || e(t[0].getEnclosedNode()))return !1;
            var i, o;
            if ((i = !n && 1 === t.length) && !(i = t[0].collapsed)) {
                var a = t[0];
                i = a.startContainer.getAscendant({td: 1, th: 1}, !0);
                var r = a.endContainer.getAscendant({td: 1, th: 1}, !0);
                o = CKEDITOR.tools.trim, i && i.equals(r) && !i.findOne("td, th, tr, tbody, table") ? (a = a.cloneContents(), i = !a.getFirst() || o(a.getFirst().getText()) !== o(i.getText())) : i = !1
            }
            if (i)return !1;
            for (o = 0; o < t.length; o++)if (!(i = t[o]._getTableElement()))return !1;
            return !0
        }

        function n(e) {
            var t, n, i = [];
            for (n = 0; n < e.length; n++)t = e[n]._getTableElement(), t.is && t.is({
                td: 1,
                th: 1
            }) ? i.push(t) : i = i.concat(function (e) {
                e = e.find("td, th");
                var t, n = [];
                for (t = 0; t < e.count(); t++)n.push(e.getItem(t));
                return n
            }(t));
            return i
        }

        function i(e) {
            e = n(e);
            var t, i, o = "", a = [];
            for (i = 0; i < e.length; i++)t && !t.equals(e[i].getAscendant("tr")) ? (o += a.join("\t") + "\n", t = e[i].getAscendant("tr"), a = []) : 0 === i && (t = e[i].getAscendant("tr")), a.push(e[i].getText());
            return o += a.join("\t")
        }

        function o(e) {
            var t = this.root.editor, n = t.getSelection(1);
            this.reset(), E = !0, n.root.once("selectionchange", function (e) {
                e.cancel()
            }, null, null, 0), n.selectRanges([e[0]]), n = this._.cache, n.ranges = new CKEDITOR.dom.rangeList(e), n.type = CKEDITOR.SELECTION_TEXT, n.selectedElement = e[0]._getTableElement(), n.selectedText = i(e), n.nativeSel = null, this.isFake = 1, this.rev = I++, t._.fakeSelection = this, E = !1, this.root.fire("selectionchange")
        }

        function a() {
            var n, i = this._.fakeSelection;
            if (i) {
                n = this.getSelection(1);
                var o;
                if (!(o = !n) && (o = !n.isHidden())) {
                    o = i;
                    var a = n.getRanges(), r = o.getRanges(),
                        s = a.length && a[0]._getTableElement() && a[0]._getTableElement().getAscendant("table", !0),
                        l = r.length && r[0]._getTableElement() && r[0]._getTableElement().getAscendant("table", !0),
                        c = 1 === a.length && a[0]._getTableElement() && a[0]._getTableElement().is("table"),
                        d = 1 === r.length && r[0]._getTableElement() && r[0]._getTableElement().is("table");
                    if (e(o.getSelectedElement())) o = !1; else {
                        var u = 1 === a.length && a[0].collapsed, r = t(a, !!CKEDITOR.env.webkit) && t(r);
                        s = !(!s || !l) && (s.equals(l) || l.contains(s)), s && (u || r) ? (c && !d && o.selectRanges(a), o = !0) : o = !1
                    }
                    o = !o
                }
                o && (i.reset(), i = 0)
            }
            (i || (i = n || this.getSelection(1)) && i.getType() != CKEDITOR.SELECTION_NONE) && (this.fire("selectionCheck", i), n = this.elementPath(), n.compare(this._.selectionPreviousPath) || (o = this._.selectionPreviousPath && this._.selectionPreviousPath.blockLimit.equals(n.blockLimit), CKEDITOR.env.webkit && !o && (this._.previousActive = this.document.getActive()), this._.selectionPreviousPath = n, this.fire("selectionChange", {
                selection: i,
                path: n
            })))
        }

        function r() {
            T = !0, p || (s.call(this), p = CKEDITOR.tools.setTimeout(s, 200, this))
        }

        function s() {
            p = null, T && (CKEDITOR.tools.setTimeout(a, 0, this), T = !1)
        }

        function l(e) {
            return !(!R(e) && (e.type != CKEDITOR.NODE_ELEMENT || e.is(CKEDITOR.dtd.$empty)))
        }

        function c(e) {
            function t(t, n) {
                return !(!t || t.type == CKEDITOR.NODE_TEXT) && e.clone()["moveToElementEdit" + (n ? "End" : "Start")](t)
            }

            if (!(e.root instanceof CKEDITOR.editable))return !1;
            var n = e.startContainer, i = e.getPreviousNode(l, null, n), o = e.getNextNode(l, null, n);
            return !(!t(i) && !t(o, 1) && (i || o || n.type == CKEDITOR.NODE_ELEMENT && n.isBlockBoundary() && n.getBogus()))
        }

        function d(e) {
            u(e, !1);
            var t = e.getDocument().createText(O);
            return e.setCustomData("cke-fillingChar", t), t
        }

        function u(e, t) {
            var n = e && e.removeCustomData("cke-fillingChar");
            if (n) {
                if (!1 !== t) {
                    var i = e.getDocument().getSelection().getNative(), o = i && "None" != i.type && i.getRangeAt(0),
                        a = O.length;
                    if (n.getLength() > a && o && o.intersectsNode(n.$)) {
                        var r = [{node: i.anchorNode, offset: i.anchorOffset}, {
                            node: i.focusNode,
                            offset: i.focusOffset
                        }];
                        i.anchorNode == n.$ && i.anchorOffset > a && (r[0].offset -= a), i.focusNode == n.$ && i.focusOffset > a && (r[1].offset -= a)
                    }
                }
                n.setText(h(n.getText(), 1)), r && (n = e.getDocument().$, i = n.getSelection(), n = n.createRange(), n.setStart(r[0].node, r[0].offset), n.collapse(!0), i.removeAllRanges(), i.addRange(n), i.extend(r[1].node, r[1].offset))
            }
        }

        function h(e, t) {
            return t ? e.replace(D, function (e, t) {
                return t ? " " : ""
            }) : e.replace(O, "")
        }

        function f(e, t) {
            var n = t && CKEDITOR.tools.htmlEncode(t) || "&nbsp;",
                n = CKEDITOR.dom.element.createFromHtml('<div data-cke-hidden-sel="1" data-cke-temp="1" style="' + (CKEDITOR.env.ie && 14 > CKEDITOR.env.version ? "display:none" : "position:fixed;top:0;left:-1000px") + '">' + n + "</div>", e.document);
            e.fire("lockSnapshot"), e.editable().append(n);
            var i = e.getSelection(1), o = e.createRange(), a = i.root.on("selectionchange", function (e) {
                e.cancel()
            }, null, null, 0);
            o.setStartAt(n, CKEDITOR.POSITION_AFTER_START), o.setEndAt(n, CKEDITOR.POSITION_BEFORE_END), i.selectRanges([o]), a.removeListener(), e.fire("unlockSnapshot"), e._.hiddenSelectionContainer = n
        }

        function g(e) {
            var t = {37: 1, 39: 1, 8: 1, 46: 1};
            return function (n) {
                var i = n.data.getKeystroke();
                if (t[i]) {
                    var o = e.getSelection().getRanges(), a = o[0];
                    1 == o.length && a.collapsed && (i = a[38 > i ? "getPreviousEditableNode" : "getNextEditableNode"]()) && i.type == CKEDITOR.NODE_ELEMENT && "false" == i.getAttribute("contenteditable") && (e.getSelection().fake(i), n.data.preventDefault(), n.cancel())
                }
            }
        }

        function m(e) {
            for (var t = 0; t < e.length; t++) {
                var n = e[t];
                if (n.getCommonAncestor().isReadOnly() && e.splice(t, 1), !n.collapsed) {
                    if (n.startContainer.isReadOnly())for (var i, o = n.startContainer; o && !((i = o.type == CKEDITOR.NODE_ELEMENT) && o.is("body") || !o.isReadOnly());)i && "false" == o.getAttribute("contentEditable") && n.setStartAfter(o), o = o.getParent();
                    o = n.startContainer, i = n.endContainer;
                    var a = n.startOffset, r = n.endOffset, s = n.clone();
                    o && o.type == CKEDITOR.NODE_TEXT && (a >= o.getLength() ? s.setStartAfter(o) : s.setStartBefore(o)), i && i.type == CKEDITOR.NODE_TEXT && (r ? s.setEndAfter(i) : s.setEndBefore(i)), o = new CKEDITOR.dom.walker(s), o.evaluator = function (i) {
                        if (i.type == CKEDITOR.NODE_ELEMENT && i.isReadOnly()) {
                            var o = n.clone();
                            return n.setEndBefore(i), n.collapsed && e.splice(t--, 1), i.getPosition(s.endContainer) & CKEDITOR.POSITION_CONTAINS || (o.setStartAfter(i), o.collapsed || e.splice(t + 1, 0, o)), !0
                        }
                        return !1
                    }, o.next()
                }
            }
            return e
        }

        var E, p, T, C = "function" != typeof window.getSelection, I = 1, O = CKEDITOR.tools.repeat("​", 7),
            D = new RegExp(O + "( )?", "g"), R = CKEDITOR.dom.walker.invisible(1), v = function () {
                function e(e) {
                    return function (t) {
                        var n = t.editor.createRange();
                        return n.moveToClosestEditablePosition(t.selected, e) && t.editor.getSelection().selectRanges([n]), !1
                    }
                }

                function t(e) {
                    return function (t) {
                        var n, i = t.editor, o = i.createRange();
                        if (!i.readOnly)return (n = o.moveToClosestEditablePosition(t.selected, e)) || (n = o.moveToClosestEditablePosition(t.selected, !e)), n && i.getSelection().selectRanges([o]), i.fire("saveSnapshot"), t.selected.remove(), n || (o.moveToElementEditablePosition(i.editable()), i.getSelection().selectRanges([o])), i.fire("saveSnapshot"), !1
                    }
                }

                var n = e(), i = e(1);
                return {37: n, 38: n, 39: i, 40: i, 8: t(), 46: t(1)}
            }();
        CKEDITOR.on("instanceCreated", function (e) {
            function t() {
                var e = n.getSelection();
                e && e.removeAllRanges()
            }

            var n = e.editor;
            n.on("contentDom", function () {
                function e() {
                    s = new CKEDITOR.dom.selection(n.getSelection()), s.lock()
                }

                function t() {
                    c.removeListener("mouseup", t), f.removeListener("mouseup", t);
                    var e = CKEDITOR.document.$.selection, n = e.createRange();
                    "None" != e.type && n.parentElement() && n.parentElement().ownerDocument == l.$ && n.select()
                }

                function i(e) {
                    if (CKEDITOR.env.ie) {
                        var t = (e = e.getRanges()[0]) ? e.startContainer.getAscendant(function (e) {
                            return e.type == CKEDITOR.NODE_ELEMENT && ("false" == e.getAttribute("contenteditable") || "true" == e.getAttribute("contenteditable"))
                        }, !0) : null;
                        return e && "false" == t.getAttribute("contenteditable") && t
                    }
                }

                var o, s, l = n.document, c = CKEDITOR.document, d = n.editable(), h = l.getBody(),
                    f = l.getDocumentElement(), m = d.isInline();
                if (CKEDITOR.env.gecko && d.attachListener(d, "focus", function (e) {
                        e.removeListener(), 0 !== o && (e = n.getSelection().getNative()) && e.isCollapsed && e.anchorNode == d.$ && (e = n.createRange(), e.moveToElementEditStart(d), e.select())
                    }, null, null, -2), d.attachListener(d, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function () {
                        o && CKEDITOR.env.webkit && (o = n._.previousActive && n._.previousActive.equals(l.getActive())) && null != n._.previousScrollTop && n._.previousScrollTop != d.$.scrollTop && (d.$.scrollTop = n._.previousScrollTop), n.unlockSelection(o), o = 0
                    }, null, null, -1), d.attachListener(d, "mousedown", function () {
                        o = 0
                    }), (CKEDITOR.env.ie || m) && (C ? d.attachListener(d, "beforedeactivate", e, null, null, -1) : d.attachListener(n, "selectionCheck", e, null, null, -1), d.attachListener(d, CKEDITOR.env.webkit ? "DOMFocusOut" : "blur", function () {
                        n.lockSelection(s), o = 1
                    }, null, null, -1), d.attachListener(d, "mousedown", function () {
                        o = 0
                    })), CKEDITOR.env.ie && !m) {
                    var E;
                    if (d.attachListener(d, "mousedown", function (e) {
                            2 == e.data.$.button && ((e = n.document.getSelection()) && e.getType() != CKEDITOR.SELECTION_NONE || (E = n.window.getScrollPosition()))
                        }), d.attachListener(d, "mouseup", function (e) {
                            2 == e.data.$.button && E && (n.document.$.documentElement.scrollLeft = E.x, n.document.$.documentElement.scrollTop = E.y), E = null
                        }), "BackCompat" != l.$.compatMode) {
                        if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) {
                            var p, T;
                            f.on("mousedown", function (e) {
                                function t(e) {
                                    if (e = e.data.$, p) {
                                        var t = h.$.createTextRange();
                                        try {
                                            t.moveToPoint(e.clientX, e.clientY)
                                        } catch (e) {
                                        }
                                        p.setEndPoint(0 > T.compareEndPoints("StartToStart", t) ? "EndToEnd" : "StartToStart", t), p.select()
                                    }
                                }

                                function n() {
                                    f.removeListener("mousemove", t), c.removeListener("mouseup", n), f.removeListener("mouseup", n), p.select()
                                }

                                if (e = e.data, e.getTarget().is("html") && e.$.y < f.$.clientHeight && e.$.x < f.$.clientWidth) {
                                    p = h.$.createTextRange();
                                    try {
                                        p.moveToPoint(e.$.clientX, e.$.clientY)
                                    } catch (e) {
                                    }
                                    T = p.duplicate(), f.on("mousemove", t), c.on("mouseup", n), f.on("mouseup", n)
                                }
                            })
                        }
                        7 < CKEDITOR.env.version && 11 > CKEDITOR.env.version && f.on("mousedown", function (e) {
                            e.data.getTarget().is("html") && (c.on("mouseup", t), f.on("mouseup", t))
                        })
                    }
                }
                if (d.attachListener(d, "selectionchange", a, n), d.attachListener(d, "keyup", r, n), d.attachListener(d, "keydown", function (e) {
                        var t = this.getSelection(1);
                        i(t) && (t.selectElement(i(t)), e.data.preventDefault())
                    }, n), d.attachListener(d, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function () {
                        n.forceNextSelectionCheck(), n.selectionChange(1)
                    }), m && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) {
                    var I;
                    d.attachListener(d, "mousedown", function () {
                        I = 1
                    }), d.attachListener(l.getDocumentElement(), "mouseup", function () {
                        I && r.call(n), I = 0
                    })
                } else d.attachListener(CKEDITOR.env.ie ? d : l.getDocumentElement(), "mouseup", r, n);
                CKEDITOR.env.webkit && d.attachListener(l, "keydown", function (e) {
                    switch (e.data.getKey()) {
                        case 13:
                        case 33:
                        case 34:
                        case 35:
                        case 36:
                        case 37:
                        case 39:
                        case 8:
                        case 45:
                        case 46:
                            d.hasFocus && u(d)
                    }
                }, null, null, -1), d.attachListener(d, "keydown", g(n), null, null, -1)
            }), n.on("setData", function () {
                n.unlockSelection(), CKEDITOR.env.webkit && t()
            }), n.on("contentDomUnload", function () {
                n.unlockSelection()
            }), CKEDITOR.env.ie9Compat && n.on("beforeDestroy", t, null, null, 9), n.on("dataReady", function () {
                delete n._.fakeSelection, delete n._.hiddenSelectionContainer, n.selectionChange(1)
            }), n.on("loadSnapshot", function () {
                var e = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT), t = n.editable().getLast(e);
                t && t.hasAttribute("data-cke-hidden-sel") && (t.remove(), CKEDITOR.env.gecko && (e = n.editable().getFirst(e)) && e.is("br") && e.getAttribute("_moz_editor_bogus_node") && e.remove())
            }, null, null, 100), n.on("key", function (e) {
                if ("wysiwyg" == n.mode) {
                    var t = n.getSelection();
                    if (t.isFake) {
                        var i = v[e.data.keyCode];
                        if (i)return i({editor: n, selected: t.getSelectedElement(), selection: t, keyEvent: e})
                    }
                }
            })
        }), CKEDITOR.env.webkit && CKEDITOR.on("instanceReady", function (e) {
            var t = e.editor;
            t.on("selectionChange", function () {
                var e = t.editable(), n = e.getCustomData("cke-fillingChar");
                n && (n.getCustomData("ready") ? (u(e), e.editor.fire("selectionCheck")) : n.setCustomData("ready", 1))
            }, null, null, -1), t.on("beforeSetMode", function () {
                u(t.editable())
            }, null, null, -1), t.on("getSnapshot", function (e) {
                e.data && (e.data = h(e.data))
            }, t, null, 20), t.on("toDataFormat", function (e) {
                e.data.dataValue = h(e.data.dataValue)
            }, null, null, 0)
        }), CKEDITOR.editor.prototype.selectionChange = function (e) {
            (e ? a : r).call(this)
        }, CKEDITOR.editor.prototype.getSelection = function (e) {
            return !this._.savedSelection && !this._.fakeSelection || e ? (e = this.editable()) && "wysiwyg" == this.mode ? new CKEDITOR.dom.selection(e) : null : this._.savedSelection || this._.fakeSelection
        }, CKEDITOR.editor.prototype.lockSelection = function (e) {
            return e = e || this.getSelection(1), e.getType() != CKEDITOR.SELECTION_NONE && (!e.isLocked && e.lock(), this._.savedSelection = e, !0)
        }, CKEDITOR.editor.prototype.unlockSelection = function (e) {
            var t = this._.savedSelection;
            return !!t && (t.unlock(e), delete this._.savedSelection, !0)
        }, CKEDITOR.editor.prototype.forceNextSelectionCheck = function () {
            delete this._.selectionPreviousPath
        }, CKEDITOR.dom.document.prototype.getSelection = function () {
            return new CKEDITOR.dom.selection(this)
        }, CKEDITOR.dom.range.prototype.select = function () {
            var e = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root);
            return e.selectRanges([this]), e
        }, CKEDITOR.SELECTION_NONE = 1, CKEDITOR.SELECTION_TEXT = 2, CKEDITOR.SELECTION_ELEMENT = 3, CKEDITOR.dom.selection = function (e) {
            if (e instanceof CKEDITOR.dom.selection) {
                var t = e;
                e = e.root
            }
            var n = e instanceof CKEDITOR.dom.element;
            if (this.rev = t ? t.rev : I++, this.document = e instanceof CKEDITOR.dom.document ? e : e.getDocument(), this.root = n ? e : this.document.getBody(), this.isLocked = 0, this._ = {cache: {}}, t)return CKEDITOR.tools.extend(this._.cache, t._.cache), this.isFake = t.isFake, this.isLocked = t.isLocked, this;
            e = this.getNative();
            var i, o;
            if (e)if (e.getRangeAt) i = (o = e.rangeCount && e.getRangeAt(0)) && new CKEDITOR.dom.node(o.commonAncestorContainer); else {
                try {
                    o = e.createRange()
                } catch (e) {
                }
                i = o && CKEDITOR.dom.element.get(o.item && o.item(0) || o.parentElement())
            }
            return (!i || i.type != CKEDITOR.NODE_ELEMENT && i.type != CKEDITOR.NODE_TEXT || !this.root.equals(i) && !this.root.contains(i)) && (this._.cache.type = CKEDITOR.SELECTION_NONE, this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", this._.cache.ranges = new CKEDITOR.dom.rangeList), this
        };
        var b = {
            img: 1,
            hr: 1,
            li: 1,
            table: 1,
            tr: 1,
            td: 1,
            th: 1,
            embed: 1,
            object: 1,
            ol: 1,
            ul: 1,
            a: 1,
            input: 1,
            form: 1,
            select: 1,
            textarea: 1,
            button: 1,
            fieldset: 1,
            thead: 1,
            tfoot: 1
        };
        CKEDITOR.tools.extend(CKEDITOR.dom.selection, {
            _removeFillingCharSequenceString: h,
            _createFillingCharSequenceNode: d,
            FILLING_CHAR_SEQUENCE: O
        }), CKEDITOR.dom.selection.prototype = {
            getNative: function () {
                return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = C ? this.document.$.selection : this.document.getWindow().$.getSelection()
            }, getType: C ? function () {
                var e = this._.cache;
                if (e.type)return e.type;
                var t = CKEDITOR.SELECTION_NONE;
                try {
                    var n = this.getNative(), i = n.type;
                    "Text" == i && (t = CKEDITOR.SELECTION_TEXT), "Control" == i && (t = CKEDITOR.SELECTION_ELEMENT), n.createRange().parentElement() && (t = CKEDITOR.SELECTION_TEXT)
                } catch (e) {
                }
                return e.type = t
            } : function () {
                var e = this._.cache;
                if (e.type)return e.type;
                var t = CKEDITOR.SELECTION_TEXT, n = this.getNative();
                if (n && n.rangeCount) {
                    if (1 == n.rangeCount) {
                        var n = n.getRangeAt(0), i = n.startContainer;
                        i == n.endContainer && 1 == i.nodeType && 1 == n.endOffset - n.startOffset && b[i.childNodes[n.startOffset].nodeName.toLowerCase()] && (t = CKEDITOR.SELECTION_ELEMENT)
                    }
                } else t = CKEDITOR.SELECTION_NONE;
                return e.type = t
            }, getRanges: function () {
                var e = C ? function () {
                    function e(e) {
                        return new CKEDITOR.dom.node(e).getIndex()
                    }

                    var t = function (t, n) {
                        t = t.duplicate(), t.collapse(n);
                        var i = t.parentElement();
                        if (!i.hasChildNodes())return {container: i, offset: 0};
                        for (var o, a, r, s, l = i.children, c = t.duplicate(), d = 0, u = l.length - 1, h = -1; d <= u;)if (h = Math.floor((d + u) / 2), o = l[h], c.moveToElementText(o), 0 < (r = c.compareEndPoints("StartToStart", t))) u = h - 1; else {
                            if (!(0 > r))return {container: i, offset: e(o)};
                            d = h + 1
                        }
                        if (-1 == h || h == l.length - 1 && 0 > r) {
                            if (c.moveToElementText(i), c.setEndPoint("StartToStart", t), c = c.text.replace(/(\r\n|\r)/g, "\n").length, l = i.childNodes, !c)return o = l[l.length - 1], o.nodeType != CKEDITOR.NODE_TEXT ? {
                                container: i,
                                offset: l.length
                            } : {container: o, offset: o.nodeValue.length};
                            for (i = l.length; 0 < c && 0 < i;)a = l[--i], a.nodeType == CKEDITOR.NODE_TEXT && (s = a, c -= a.nodeValue.length);
                            return {container: s, offset: -c}
                        }
                        if (c.collapse(0 < r), c.setEndPoint(0 < r ? "StartToStart" : "EndToStart", t), !(c = c.text.replace(/(\r\n|\r)/g, "\n").length))return {
                            container: i,
                            offset: e(o) + (0 < r ? 0 : 1)
                        };
                        for (; 0 < c;)try {
                            a = o[0 < r ? "previousSibling" : "nextSibling"], a.nodeType == CKEDITOR.NODE_TEXT && (c -= a.nodeValue.length, s = a), o = a
                        } catch (t) {
                            return {container: i, offset: e(o)}
                        }
                        return {container: s, offset: 0 < r ? -c : s.nodeValue.length + c}
                    };
                    return function () {
                        var e = this.getNative(), n = e && e.createRange(), i = this.getType();
                        if (!e)return [];
                        if (i == CKEDITOR.SELECTION_TEXT)return e = new CKEDITOR.dom.range(this.root), i = t(n, !0), e.setStart(new CKEDITOR.dom.node(i.container), i.offset), i = t(n), e.setEnd(new CKEDITOR.dom.node(i.container), i.offset), e.endContainer.getPosition(e.startContainer) & CKEDITOR.POSITION_PRECEDING && e.endOffset <= e.startContainer.getIndex() && e.collapse(), [e];
                        if (i == CKEDITOR.SELECTION_ELEMENT) {
                            for (var i = [], o = 0; o < n.length; o++) {
                                for (var a = n.item(o), r = a.parentNode, s = 0, e = new CKEDITOR.dom.range(this.root); s < r.childNodes.length && r.childNodes[s] != a; s++);
                                e.setStart(new CKEDITOR.dom.node(r), s), e.setEnd(new CKEDITOR.dom.node(r), s + 1), i.push(e)
                            }
                            return i
                        }
                        return []
                    }
                }() : function () {
                    var e, t = [], n = this.getNative();
                    if (!n)return t;
                    for (var i = 0; i < n.rangeCount; i++) {
                        var o = n.getRangeAt(i);
                        e = new CKEDITOR.dom.range(this.root), e.setStart(new CKEDITOR.dom.node(o.startContainer), o.startOffset), e.setEnd(new CKEDITOR.dom.node(o.endContainer), o.endOffset), t.push(e)
                    }
                    return t
                };
                return function (t) {
                    var n = this._.cache, i = n.ranges;
                    return i || (n.ranges = i = new CKEDITOR.dom.rangeList(e.call(this))), t ? m(new CKEDITOR.dom.rangeList(i.slice())) : i
                }
            }(), getStartElement: function () {
                var e = this._.cache;
                if (void 0 !== e.startElement)return e.startElement;
                var t;
                switch (this.getType()) {
                    case CKEDITOR.SELECTION_ELEMENT:
                        return this.getSelectedElement();
                    case CKEDITOR.SELECTION_TEXT:
                        var n = this.getRanges()[0];
                        if (n) {
                            if (n.collapsed) t = n.startContainer, t.type != CKEDITOR.NODE_ELEMENT && (t = t.getParent()); else {
                                for (n.optimize(); t = n.startContainer, n.startOffset == (t.getChildCount ? t.getChildCount() : t.getLength()) && !t.isBlockBoundary();)n.setStartAfter(t);
                                if (t = n.startContainer, t.type != CKEDITOR.NODE_ELEMENT)return t.getParent();
                                if ((t = t.getChild(n.startOffset)) && t.type == CKEDITOR.NODE_ELEMENT)for (n = t.getFirst(); n && n.type == CKEDITOR.NODE_ELEMENT;)t = n, n = n.getFirst(); else t = n.startContainer
                            }
                            t = t.$
                        }
                }
                return e.startElement = t ? new CKEDITOR.dom.element(t) : null
            }, getSelectedElement: function () {
                var e = this._.cache;
                if (void 0 !== e.selectedElement)return e.selectedElement;
                var t = this, n = CKEDITOR.tools.tryThese(function () {
                    return t.getNative().createRange().item(0)
                }, function () {
                    for (var e, n, i = t.getRanges()[0].clone(), o = 2; o && !((e = i.getEnclosedNode()) && e.type == CKEDITOR.NODE_ELEMENT && b[e.getName()] && (n = e)); o--)i.shrink(CKEDITOR.SHRINK_ELEMENT);
                    return n && n.$
                });
                return e.selectedElement = n ? new CKEDITOR.dom.element(n) : null
            }, getSelectedText: function () {
                var e = this._.cache;
                if (void 0 !== e.selectedText)return e.selectedText;
                var t = this.getNative(), t = C ? "Control" == t.type ? "" : t.createRange().text : t.toString();
                return e.selectedText = t
            }, lock: function () {
                this.getRanges(), this.getStartElement(), this.getSelectedElement(), this.getSelectedText(), this._.cache.nativeSel = null, this.isLocked = 1
            }, unlock: function (e) {
                if (this.isLocked) {
                    if (e)var n = this.getSelectedElement(), i = this.getRanges(), a = this.isFake;
                    this.isLocked = 0, this.reset(), e && (e = n || i[0] && i[0].getCommonAncestor()) && e.getAscendant("body", 1) && (t(i) ? o.call(this, i) : a ? this.fake(n) : n ? this.selectElement(n) : this.selectRanges(i))
                }
            }, reset: function () {
                this._.cache = {}, this.isFake = 0;
                var e = this.root.editor;
                if (e && e._.fakeSelection)if (this.rev == e._.fakeSelection.rev) {
                    delete e._.fakeSelection;
                    var t = e._.hiddenSelectionContainer;
                    if (t) {
                        var n = e.checkDirty();
                        e.fire("lockSnapshot"), t.remove(), e.fire("unlockSnapshot"), !n && e.resetDirty()
                    }
                    delete e._.hiddenSelectionContainer
                } else CKEDITOR.warn("selection-fake-reset");
                this.rev = I++
            }, selectElement: function (e) {
                var t = new CKEDITOR.dom.range(this.root);
                t.setStartBefore(e), t.setEndAfter(e), this.selectRanges([t])
            }, selectRanges: function (e) {
                var n = this.root.editor, i = n && n._.hiddenSelectionContainer;
                if (this.reset(), i)for (var a, i = this.root, r = 0; r < e.length; ++r)a = e[r], a.endContainer.equals(i) && (a.endOffset = Math.min(a.endOffset, i.getChildCount()));
                if (e.length)if (this.isLocked) {
                    var s = CKEDITOR.document.getActive();
                    this.unlock(), this.selectRanges(e), this.lock(), s && !s.equals(this.root) && s.focus()
                } else {
                    var l, h, f;
                    if (1 == e.length && !(f = e[0]).collapsed && (l = f.getEnclosedNode()) && l.type == CKEDITOR.NODE_ELEMENT && (f = f.clone(), f.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (h = f.getEnclosedNode()) && h.type == CKEDITOR.NODE_ELEMENT && (l = h), "false" == l.getAttribute("contenteditable")) || (l = void 0), l) this.fake(l); else if (n && n.plugins.tableselection && CKEDITOR.plugins.tableselection.isSupportedEnvironment && t(e) && !E) o.call(this, e); else {
                        if (C) {
                            h = CKEDITOR.dom.walker.whitespaces(!0), l = /\ufeff|\u00a0/, f = {
                                table: 1,
                                tbody: 1,
                                tr: 1
                            }, 1 < e.length && (n = e[e.length - 1], e[0].setEnd(n.endContainer, n.endOffset)), n = e[0], e = n.collapsed;
                            var g, m, p;
                            if ((i = n.getEnclosedNode()) && i.type == CKEDITOR.NODE_ELEMENT && i.getName() in b && (!i.is("a") || !i.getText()))try {
                                return p = i.$.createControlRange(), p.addElement(i.$), void p.select()
                            } catch (e) {
                            }
                            (n.startContainer.type == CKEDITOR.NODE_ELEMENT && n.startContainer.getName() in f || n.endContainer.type == CKEDITOR.NODE_ELEMENT && n.endContainer.getName() in f) && (n.shrink(CKEDITOR.NODE_ELEMENT, !0), e = n.collapsed), p = n.createBookmark(), f = p.startNode, e || (s = p.endNode), p = n.document.$.body.createTextRange(), p.moveToElementText(f.$), p.moveStart("character", 1), s ? (l = n.document.$.body.createTextRange(), l.moveToElementText(s.$), p.setEndPoint("EndToEnd", l), p.moveEnd("character", -1)) : (g = f.getNext(h), m = f.hasAscendant("pre"), g = !(g && g.getText && g.getText().match(l)) && (m || !f.hasPrevious() || f.getPrevious().is && f.getPrevious().is("br")), m = n.document.createElement("span"), m.setHtml("&#65279;"), m.insertBefore(f), g && n.document.createText("\ufeff").insertBefore(f)), n.setStartBefore(f), f.remove(), e ? (g ? (p.moveStart("character", -1), p.select(), n.document.$.selection.clear()) : p.select(), n.moveToPosition(m, CKEDITOR.POSITION_BEFORE_START), m.remove()) : (n.setEndBefore(s), s.remove(), p.select())
                        } else {
                            if (!(s = this.getNative()))return;
                            for (this.removeAllRanges(), p = 0; p < e.length; p++)if (p < e.length - 1 && (g = e[p], m = e[p + 1], l = g.clone(), l.setStart(g.endContainer, g.endOffset), l.setEnd(m.startContainer, m.startOffset), !l.collapsed && (l.shrink(CKEDITOR.NODE_ELEMENT, !0), n = l.getCommonAncestor(), l = l.getEnclosedNode(), n.isReadOnly() || l && l.isReadOnly()))) m.setStart(g.startContainer, g.startOffset), e.splice(p--, 1); else {
                                n = e[p], m = this.document.$.createRange(), n.collapsed && CKEDITOR.env.webkit && c(n) && (l = d(this.root), n.insertNode(l), (g = l.getNext()) && !l.getPrevious() && g.type == CKEDITOR.NODE_ELEMENT && "br" == g.getName() ? (u(this.root), n.moveToPosition(g, CKEDITOR.POSITION_BEFORE_START)) : n.moveToPosition(l, CKEDITOR.POSITION_AFTER_END)), m.setStart(n.startContainer.$, n.startOffset);
                                try {
                                    m.setEnd(n.endContainer.$, n.endOffset)
                                } catch (e) {
                                    if (!(0 <= e.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")))throw e;
                                    n.collapse(1), m.setEnd(n.endContainer.$, n.endOffset)
                                }
                                s.addRange(m)
                            }
                        }
                        this.reset(), this.root.fire("selectionchange")
                    }
                }
            }, fake: function (e, t) {
                var n = this.root.editor;
                void 0 === t && e.hasAttribute("aria-label") && (t = e.getAttribute("aria-label")), this.reset(), f(n, t);
                var i = this._.cache, o = new CKEDITOR.dom.range(this.root);
                o.setStartBefore(e), o.setEndAfter(e), i.ranges = new CKEDITOR.dom.rangeList(o), i.selectedElement = i.startElement = e, i.type = CKEDITOR.SELECTION_ELEMENT, i.selectedText = i.nativeSel = null, this.isFake = 1, this.rev = I++, n._.fakeSelection = this, this.root.fire("selectionchange")
            }, isHidden: function () {
                var e = this.getCommonAncestor();
                return e && e.type == CKEDITOR.NODE_TEXT && (e = e.getParent()), !(!e || !e.data("cke-hidden-sel"))
            }, isInTable: function (e) {
                return t(this.getRanges(), e)
            }, isCollapsed: function () {
                var e = this.getRanges();
                return 1 === e.length && e[0].collapsed
            }, createBookmarks: function (e) {
                return e = this.getRanges().createBookmarks(e), this.isFake && (e.isFake = 1), e
            }, createBookmarks2: function (e) {
                return e = this.getRanges().createBookmarks2(e), this.isFake && (e.isFake = 1), e
            }, selectBookmarks: function (e) {
                for (var n, i = [], o = 0; o < e.length; o++) {
                    var a = new CKEDITOR.dom.range(this.root);
                    a.moveToBookmark(e[o]), i.push(a)
                }
                return e.isFake && ((n = t(i) ? i[0]._getTableElement() : i[0].getEnclosedNode()) && n.type == CKEDITOR.NODE_ELEMENT || (CKEDITOR.warn("selection-not-fake"), e.isFake = 0)), e.isFake && !t(i) ? this.fake(n) : this.selectRanges(i), this
            }, getCommonAncestor: function () {
                var e = this.getRanges();
                return e.length ? e[0].startContainer.getCommonAncestor(e[e.length - 1].endContainer) : null
            }, scrollIntoView: function () {
                this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView()
            }, removeAllRanges: function () {
                if (this.getType() != CKEDITOR.SELECTION_NONE) {
                    var e = this.getNative();
                    try {
                        e && e[C ? "empty" : "removeAllRanges"]()
                    } catch (e) {
                    }
                    this.reset()
                }
            }
        }
    }(),CKEDITOR.STYLE_BLOCK = 1,CKEDITOR.STYLE_INLINE = 2,CKEDITOR.STYLE_OBJECT = 3,function () {
        function e(e, t) {
            for (var n, i; (e = e.getParent()) && !e.equals(t);)if (e.getAttribute("data-nostyle")) n = e; else if (!i) {
                var o = e.getAttribute("contentEditable");
                "false" == o ? n = e : "true" == o && (i = 1)
            }
            return n
        }

        function t(e, t, n, i) {
            return (e.getPosition(t) | i) == i && (!n.childRule || n.childRule(e))
        }

        function n(i) {
            var a = i.document;
            if (i.collapsed) a = p(this, a), i.insertNode(a), i.moveToPosition(a, CKEDITOR.POSITION_BEFORE_END); else {
                var r, s = this.element, l = this._.definition, c = l.ignoreReadonly, d = c || l.includeReadonly;
                null == d && (d = i.root.getCustomData("cke_includeReadonly"));
                var u = CKEDITOR.dtd[s];
                u || (r = !0, u = CKEDITOR.dtd.span), i.enlarge(CKEDITOR.ENLARGE_INLINE, 1), i.trim();
                var h, f = i.createBookmark(), m = f.startNode, E = f.endNode, T = m;
                if (!c) {
                    var C = i.getCommonAncestor(), c = e(m, C), C = e(E, C);
                    c && (T = c.getNextSourceNode(!0)), C && (E = C)
                }
                for (T.getPosition(E) == CKEDITOR.POSITION_FOLLOWING && (T = 0); T;) {
                    if (c = !1, T.equals(E)) T = null, c = !0; else {
                        var I = T.type == CKEDITOR.NODE_ELEMENT ? T.getName() : null,
                            C = I && "false" == T.getAttribute("contentEditable"),
                            O = I && T.getAttribute("data-nostyle");
                        if (I && T.data("cke-bookmark")) {
                            T = T.getNextSourceNode(!0);
                            continue
                        }
                        if (C && d && CKEDITOR.dtd.$block[I])for (var D = T, R = o(D), v = void 0, b = R.length, y = 0, D = b && new CKEDITOR.dom.range(D.getDocument()); y < b; ++y) {
                            var v = R[y], K = CKEDITOR.filter.instances[v.data("cke-filter")];
                            (K ? K.check(this) : 1) && (D.selectNodeContents(v), n.call(this, D))
                        }
                        if (R = I ? !u[I] || O ? 0 : C && !d ? 0 : t(T, E, l, w) : 1) {
                            if (v = T.getParent(), R = l, b = s, y = r, !v || !(v.getDtd() || CKEDITOR.dtd.span)[b] && !y || R.parentRule && !R.parentRule(v)) c = !0; else if (h || I && CKEDITOR.dtd.$removeEmpty[I] && (T.getPosition(E) | w) != w || (h = i.clone(), h.setStartBefore(T)), (I = T.type) == CKEDITOR.NODE_TEXT || C || I == CKEDITOR.NODE_ELEMENT && !T.getChildCount()) {
                                for (var k, I = T; (c = !I.getNext(_)) && (k = I.getParent(), u[k.getName()]) && t(k, m, l, N);)I = k;
                                h.setEndAfter(I)
                            }
                        } else c = !0;
                        T = T.getNextSourceNode(O || C)
                    }
                    if (c && h && !h.collapsed) {
                        for (var S, x, A, c = p(this, a), C = c.hasAttributes(), O = h.getCommonAncestor(), I = {}, R = {}, v = {}, b = {}; c && O;) {
                            if (O.getName() == s) {
                                for (S in l.attributes)!b[S] && (A = O.getAttribute(x)) && (c.getAttribute(S) == A ? R[S] = 1 : b[S] = 1);
                                for (x in l.styles)!v[x] && (A = O.getStyle(x)) && (c.getStyle(x) == A ? I[x] = 1 : v[x] = 1)
                            }
                            O = O.getParent()
                        }
                        for (S in R)c.removeAttribute(S);
                        for (x in I)c.removeStyle(x);
                        C && !c.hasAttributes() && (c = null), c ? (h.extractContents().appendTo(c), h.insertNode(c), g.call(this, c), c.mergeSiblings(), CKEDITOR.env.ie || c.$.normalize()) : (c = new CKEDITOR.dom.element("span"), h.extractContents().appendTo(c), h.insertNode(c), g.call(this, c), c.remove(!0)), h = null
                    }
                }
                i.moveToBookmark(f), i.shrink(CKEDITOR.SHRINK_TEXT), i.shrink(CKEDITOR.NODE_ELEMENT, !0)
            }
        }

        function i(e) {
            function t() {
                for (var e = new CKEDITOR.dom.elementPath(i.getParent()), t = new CKEDITOR.dom.elementPath(d.getParent()), n = null, o = null, a = 0; a < e.elements.length; a++) {
                    var r = e.elements[a];
                    if (r == e.block || r == e.blockLimit)break;
                    u.checkElementRemovable(r, !0) && (n = r)
                }
                for (a = 0; a < t.elements.length && ((r = t.elements[a]) != t.block && r != t.blockLimit); a++)u.checkElementRemovable(r, !0) && (o = r);
                o && d.breakParent(o), n && i.breakParent(n)
            }

            e.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
            var n = e.createBookmark(), i = n.startNode, o = this._.definition.alwaysRemoveElement;
            if (e.collapsed) {
                for (var a, r, s = new CKEDITOR.dom.elementPath(i.getParent(), e.root), l = 0; l < s.elements.length && (r = s.elements[l]) && r != s.block && r != s.blockLimit; l++)if (this.checkElementRemovable(r)) {
                    var c;
                    !o && e.collapsed && (e.checkBoundaryOfElement(r, CKEDITOR.END) || (c = e.checkBoundaryOfElement(r, CKEDITOR.START))) ? (a = r, a.match = c ? "start" : "end") : (r.mergeSiblings(), r.is(this.element) ? f.call(this, r) : m(r, I(this)[r.getName()]))
                }
                if (a) {
                    for (o = i, l = 0; r = s.elements[l], !r.equals(a); l++)r.match || (r = r.clone(), r.append(o), o = r);
                    o["start" == a.match ? "insertBefore" : "insertAfter"](a)
                }
            } else {
                var d = n.endNode, u = this;
                for (t(), s = i; !s.equals(d);)a = s.getNextSourceNode(), s.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(s) && (s.getName() == this.element ? f.call(this, s) : m(s, I(this)[s.getName()]), a.type == CKEDITOR.NODE_ELEMENT && a.contains(i) && (t(), a = i.getNext())), s = a
            }
            e.moveToBookmark(n), e.shrink(CKEDITOR.NODE_ELEMENT, !0)
        }

        function o(e) {
            var t = [];
            return e.forEach(function (e) {
                if ("true" == e.getAttribute("contenteditable"))return t.push(e), !1
            }, CKEDITOR.NODE_ELEMENT, !0), t
        }

        function a(e) {
            var t = e.getEnclosedNode() || e.getCommonAncestor(!1, !0);
            (e = new CKEDITOR.dom.elementPath(t, e.root).contains(this.element, 1)) && !e.isReadOnly() && T(e, this)
        }

        function r(e) {
            var t = e.getCommonAncestor(!0, !0);
            if (e = new CKEDITOR.dom.elementPath(t, e.root).contains(this.element, 1)) {
                var t = this._.definition, n = t.attributes;
                if (n)for (var i in n)e.removeAttribute(i, n[i]);
                if (t.styles)for (var o in t.styles)t.styles.hasOwnProperty(o) && e.removeStyle(o)
            }
        }

        function s(e) {
            var t = e.createBookmark(!0), n = e.createIterator();
            n.enforceRealBlocks = !0, this._.enterMode && (n.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR);
            for (var i, o, a = e.document; i = n.getNextParagraph();)!i.isReadOnly() && (n.activeFilter ? n.activeFilter.check(this) : 1) && (o = p(this, a, i), c(i, o));
            e.moveToBookmark(t)
        }

        function l(e) {
            var t = e.createBookmark(1), n = e.createIterator();
            n.enforceRealBlocks = !0, n.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
            for (var i, o; i = n.getNextParagraph();)this.checkElementRemovable(i) && (i.is("pre") ? ((o = this._.enterMode == CKEDITOR.ENTER_BR ? null : e.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && i.copyAttributes(o), c(i, o)) : f.call(this, i));
            e.moveToBookmark(t)
        }

        function c(e, t) {
            var n = !t;
            n && (t = e.getDocument().createElement("div"), e.copyAttributes(t));
            var i = t && t.is("pre"), o = e.is("pre"), a = !i && o;
            if (i && !o) {
                if (o = t, (a = e.getBogus()) && a.remove(), a = e.getHtml(), a = u(a, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, ""), a = a.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1"), a = a.replace(/([ \t\n\r]+|&nbsp;)/g, " "), a = a.replace(/<br\b[^>]*>/gi, "\n"), CKEDITOR.env.ie) {
                    var r = e.getDocument().createElement("div");
                    r.append(o), o.$.outerHTML = "<pre>" + a + "</pre>", o.copyAttributes(r.getFirst()), o = r.getFirst().remove()
                } else o.setHtml(a);
                t = o
            } else a ? t = h(n ? [e.getHtml()] : d(e), t) : e.moveChildren(t);
            if (t.replace(e), i) {
                var s, n = t;
                (s = n.getPrevious(k)) && s.type == CKEDITOR.NODE_ELEMENT && s.is("pre") && (i = u(s.getHtml(), /\n$/, "") + "\n\n" + u(n.getHtml(), /^\n/, ""), CKEDITOR.env.ie ? n.$.outerHTML = "<pre>" + i + "</pre>" : n.setHtml(i), s.remove())
            } else n && E(t)
        }

        function d(e) {
            var t = [];
            return u(e.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function (e, t, n) {
                return t + "</pre>" + n + "<pre>"
            }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function (e, n) {
                t.push(n)
            }), t
        }

        function u(e, t, n) {
            var i = "", o = "";
            return e = e.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function (e, t, n) {
                return t && (i = t), n && (o = n), ""
            }), i + e.replace(t, n) + o
        }

        function h(e, t) {
            var n;
            1 < e.length && (n = new CKEDITOR.dom.documentFragment(t.getDocument()));
            for (var i = 0; i < e.length; i++) {
                var o = e[i], o = o.replace(/(\r\n|\r)/g, "\n"), o = u(o, /^[ \t]*\n/, ""), o = u(o, /\n$/, ""),
                    o = u(o, /^[ \t]+|[ \t]+$/g, function (e, t) {
                        return 1 == e.length ? "&nbsp;" : t ? " " + CKEDITOR.tools.repeat("&nbsp;", e.length - 1) : CKEDITOR.tools.repeat("&nbsp;", e.length - 1) + " "
                    }), o = o.replace(/\n/g, "<br>"), o = o.replace(/[ \t]{2,}/g, function (e) {
                        return CKEDITOR.tools.repeat("&nbsp;", e.length - 1) + " "
                    });
                if (n) {
                    var a = t.clone();
                    a.setHtml(o), n.append(a)
                } else t.setHtml(o)
            }
            return n || t
        }

        function f(e, t) {
            var n, i = this._.definition, o = i.attributes, i = i.styles, a = I(this)[e.getName()],
                r = CKEDITOR.tools.isEmpty(o) && CKEDITOR.tools.isEmpty(i);
            for (n in o)("class" != n && !this._.definition.fullMatch || e.getAttribute(n) == O(n, o[n])) && (t && "data-" == n.slice(0, 5) || (r = e.hasAttribute(n), e.removeAttribute(n)));
            for (var s in i)this._.definition.fullMatch && e.getStyle(s) != O(s, i[s], !0) || (r = r || !!e.getStyle(s), e.removeStyle(s));
            m(e, a, v[e.getName()]), r && (this._.definition.alwaysRemoveElement ? E(e, 1) : !CKEDITOR.dtd.$block[e.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !e.hasAttributes() ? E(e) : e.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
        }

        function g(e) {
            for (var t, n = I(this), i = e.getElementsByTag(this.element), o = i.count(); 0 <= --o;)t = i.getItem(o), t.isReadOnly() || f.call(this, t, !0);
            for (var a in n)if (a != this.element)for (i = e.getElementsByTag(a), o = i.count() - 1; 0 <= o; o--)t = i.getItem(o), t.isReadOnly() || m(t, n[a])
        }

        function m(e, t, n) {
            if (t = t && t.attributes)for (var i = 0; i < t.length; i++) {
                var o, a = t[i][0];
                if (o = e.getAttribute(a)) {
                    var r = t[i][1];
                    (null === r || r.test && r.test(o) || "string" == typeof r && o == r) && e.removeAttribute(a)
                }
            }
            n || E(e)
        }

        function E(e, t) {
            if (!e.hasAttributes() || t)if (CKEDITOR.dtd.$block[e.getName()]) {
                var n = e.getPrevious(k), i = e.getNext(k);
                !n || n.type != CKEDITOR.NODE_TEXT && n.isBlockBoundary({br: 1}) || e.append("br", 1), !i || i.type != CKEDITOR.NODE_TEXT && i.isBlockBoundary({br: 1}) || e.append("br"), e.remove(!0)
            } else n = e.getFirst(), i = e.getLast(), e.remove(!0), n && (n.type == CKEDITOR.NODE_ELEMENT && n.mergeSiblings(), i && !n.equals(i) && i.type == CKEDITOR.NODE_ELEMENT && i.mergeSiblings())
        }

        function p(e, t, n) {
            var i;
            return i = e.element, "*" == i && (i = "span"), i = new CKEDITOR.dom.element(i, t), n && n.copyAttributes(i), i = T(i, e), t.getCustomData("doc_processing_style") && i.hasAttribute("id") ? i.removeAttribute("id") : t.setCustomData("doc_processing_style", 1), i
        }

        function T(e, t) {
            var n = t._.definition, i = n.attributes, n = CKEDITOR.style.getStyleText(n);
            if (i)for (var o in i)e.setAttribute(o, i[o]);
            return n && e.setAttribute("style", n), e
        }

        function C(e, t) {
            for (var n in e)e[n] = e[n].replace(K, function (e, n) {
                return t[n]
            })
        }

        function I(e) {
            if (e._.overrides)return e._.overrides;
            var t = e._.overrides = {}, n = e._.definition.overrides;
            if (n) {
                CKEDITOR.tools.isArray(n) || (n = [n]);
                for (var i = 0; i < n.length; i++) {
                    var o, a, r = n[i];
                    if ("string" == typeof r ? o = r.toLowerCase() : (o = r.element ? r.element.toLowerCase() : e.element, a = r.attributes), r = t[o] || (t[o] = {}), a) {
                        var s, r = r.attributes = r.attributes || [];
                        for (s in a)r.push([s.toLowerCase(), a[s]])
                    }
                }
            }
            return t
        }

        function O(e, t, n) {
            var i = new CKEDITOR.dom.element("span");
            return i[n ? "setStyle" : "setAttribute"](e, t), i[n ? "getStyle" : "getAttribute"](e)
        }

        function D(e, t) {
            function n(e, t) {
                return "font-family" == t.toLowerCase() ? e.replace(/["']/g, "") : e
            }

            "string" == typeof e && (e = CKEDITOR.tools.parseCssText(e)), "string" == typeof t && (t = CKEDITOR.tools.parseCssText(t, !0));
            for (var i in e)if (!(i in t) || n(t[i], i) != n(e[i], i) && "inherit" != e[i] && "inherit" != t[i])return !1;
            return !0
        }

        function R(e, t, n) {
            var i = e.document, o = e.getRanges();
            t = t ? this.removeFromRange : this.applyToRange;
            var a, r;
            if (e.isFake && e.isInTable())for (a = [], r = 0; r < o.length; r++)a.push(o[r].clone());
            for (var s = o.createIterator(); r = s.getNextRange();)t.call(this, r, n);
            e.selectRanges(a || o), i.removeCustomData("doc_processing_style")
        }

        var v = {
                address: 1,
                div: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                p: 1,
                pre: 1,
                section: 1,
                header: 1,
                footer: 1,
                nav: 1,
                article: 1,
                aside: 1,
                figure: 1,
                dialog: 1,
                hgroup: 1,
                time: 1,
                meter: 1,
                menu: 1,
                command: 1,
                keygen: 1,
                output: 1,
                progress: 1,
                details: 1,
                datagrid: 1,
                datalist: 1
            }, b = {
                a: 1,
                blockquote: 1,
                embed: 1,
                hr: 1,
                img: 1,
                li: 1,
                object: 1,
                ol: 1,
                table: 1,
                td: 1,
                tr: 1,
                th: 1,
                ul: 1,
                dl: 1,
                dt: 1,
                dd: 1,
                form: 1,
                audio: 1,
                video: 1
            }, y = /\s*(?:;\s*|$)/, K = /#\((.+?)\)/g, _ = CKEDITOR.dom.walker.bookmark(0, 1),
            k = CKEDITOR.dom.walker.whitespaces(1);
        CKEDITOR.style = function (e, t) {
            if ("string" == typeof e.type)return new CKEDITOR.style.customHandlers[e.type](e);
            var n = e.attributes;
            n && n.style && (e.styles = CKEDITOR.tools.extend({}, e.styles, CKEDITOR.tools.parseCssText(n.style)), delete n.style), t && (e = CKEDITOR.tools.clone(e), C(e.attributes, t), C(e.styles, t)), n = this.element = e.element ? "string" == typeof e.element ? e.element.toLowerCase() : e.element : "*", this.type = e.type || (v[n] ? CKEDITOR.STYLE_BLOCK : b[n] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE), "object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT), this._ = {definition: e}
        }, CKEDITOR.style.prototype = {
            apply: function (e) {
                if (e instanceof CKEDITOR.dom.document)return R.call(this, e.getSelection());
                if (this.checkApplicable(e.elementPath(), e)) {
                    var t = this._.enterMode;
                    t || (this._.enterMode = e.activeEnterMode), R.call(this, e.getSelection(), 0, e), this._.enterMode = t
                }
            }, remove: function (e) {
                if (e instanceof CKEDITOR.dom.document)return R.call(this, e.getSelection(), 1);
                if (this.checkApplicable(e.elementPath(), e)) {
                    var t = this._.enterMode;
                    t || (this._.enterMode = e.activeEnterMode), R.call(this, e.getSelection(), 1, e), this._.enterMode = t
                }
            }, applyToRange: function (e) {
                return this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? n : this.type == CKEDITOR.STYLE_BLOCK ? s : this.type == CKEDITOR.STYLE_OBJECT ? a : null, this.applyToRange(e)
            }, removeFromRange: function (e) {
                return this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? i : this.type == CKEDITOR.STYLE_BLOCK ? l : this.type == CKEDITOR.STYLE_OBJECT ? r : null, this.removeFromRange(e)
            }, applyToObject: function (e) {
                T(e, this)
            }, checkActive: function (e, t) {
                switch (this.type) {
                    case CKEDITOR.STYLE_BLOCK:
                        return this.checkElementRemovable(e.block || e.blockLimit, !0, t);
                    case CKEDITOR.STYLE_OBJECT:
                    case CKEDITOR.STYLE_INLINE:
                        for (var n, i = e.elements, o = 0; o < i.length; o++)if (n = i[o], this.type != CKEDITOR.STYLE_INLINE || n != e.block && n != e.blockLimit) {
                            if (this.type == CKEDITOR.STYLE_OBJECT) {
                                var a = n.getName();
                                if (!("string" == typeof this.element ? a == this.element : a in this.element))continue
                            }
                            if (this.checkElementRemovable(n, !0, t))return !0
                        }
                }
                return !1
            }, checkApplicable: function (e, t, n) {
                if (t && t instanceof CKEDITOR.filter && (n = t), n && !n.check(this))return !1;
                switch (this.type) {
                    case CKEDITOR.STYLE_OBJECT:
                        return !!e.contains(this.element);
                    case CKEDITOR.STYLE_BLOCK:
                        return !!e.blockLimit.getDtd()[this.element]
                }
                return !0
            }, checkElementMatch: function (e, t) {
                var n = this._.definition;
                if (!e || !n.ignoreReadonly && e.isReadOnly())return !1;
                var i = e.getName();
                if ("string" == typeof this.element ? i == this.element : i in this.element) {
                    if (!t && !e.hasAttributes())return !0;
                    if (i = n._AC) n = i; else {
                        var i = {}, o = 0, a = n.attributes;
                        if (a)for (var r in a)o++, i[r] = a[r];
                        (r = CKEDITOR.style.getStyleText(n)) && (i.style || o++, i.style = r), i._length = o, n = n._AC = i
                    }
                    if (!n._length)return !0;
                    for (var s in n)if ("_length" != s)if (i = e.getAttribute(s) || "", "style" == s ? D(n[s], i) : n[s] == i) {
                        if (!t)return !0
                    } else if (t)return !1;
                    if (t)return !0
                }
                return !1
            }, checkElementRemovable: function (e, t, n) {
                if (this.checkElementMatch(e, t, n))return !0;
                if (t = I(this)[e.getName()]) {
                    var i;
                    if (!(t = t.attributes))return !0;
                    for (n = 0; n < t.length; n++)if (i = t[n][0], i = e.getAttribute(i)) {
                        var o = t[n][1];
                        if (null === o)return !0;
                        if ("string" == typeof o) {
                            if (i == o)return !0
                        } else if (o.test(i))return !0
                    }
                }
                return !1
            }, buildPreview: function (e) {
                var t = this._.definition, n = [], i = t.element;
                "bdo" == i && (i = "span");
                var n = ["<", i], o = t.attributes;
                if (o)for (var a in o)n.push(" ", a, '="', o[a], '"');
                return (o = CKEDITOR.style.getStyleText(t)) && n.push(' style="', o, '"'), n.push(">", e || t.name, "</", i, ">"), n.join("")
            }, getDefinition: function () {
                return this._.definition
            }
        }, CKEDITOR.style.getStyleText = function (e) {
            var t = e._ST;
            if (t)return t;
            var t = e.styles, n = e.attributes && e.attributes.style || "", i = "";
            n.length && (n = n.replace(y, ";"));
            for (var o in t) {
                var a = t[o], r = (o + ":" + a).replace(y, ";");
                "inherit" == a ? i += r : n += r
            }
            return n.length && (n = CKEDITOR.tools.normalizeCssText(n, !0)), e._ST = n + i
        }, CKEDITOR.style.customHandlers = {}, CKEDITOR.style.addCustomHandler = function (e) {
            var t = function (e) {
                this._ = {definition: e}, this.setup && this.setup(e)
            };
            return t.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype), {assignedTo: CKEDITOR.STYLE_OBJECT}, e, !0), this.customHandlers[e.type] = t
        };
        var w = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED,
            N = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
    }(),CKEDITOR.styleCommand = function (e, t) {
        this.requiredContent = this.allowedContent = this.style = e, CKEDITOR.tools.extend(this, t, !0)
    },CKEDITOR.styleCommand.prototype.exec = function (e) {
        e.focus(), this.state == CKEDITOR.TRISTATE_OFF ? e.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && e.removeStyle(this.style)
    },CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"),CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet),CKEDITOR.loadStylesSet = function (e, t, n) {
        CKEDITOR.stylesSet.addExternal(e, t, ""), CKEDITOR.stylesSet.load(e, n)
    },CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        attachStyleStateChange: function (e, t) {
            var n = this._.styleStateChangeCallbacks;
            n || (n = this._.styleStateChangeCallbacks = [], this.on("selectionChange", function (e) {
                for (var t = 0; t < n.length; t++) {
                    var i = n[t],
                        o = i.style.checkActive(e.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
                    i.fn.call(this, o)
                }
            })), n.push({style: e, fn: t})
        }, applyStyle: function (e) {
            e.apply(this)
        }, removeStyle: function (e) {
            e.remove(this)
        }, getStylesSet: function (e) {
            if (this._.stylesDefinitions) e(this._.stylesDefinitions); else {
                var t = this, n = t.config.stylesCombo_stylesSet || t.config.stylesSet;
                if (!1 === n) e(null); else if (n instanceof Array) t._.stylesDefinitions = n, e(n); else {
                    n || (n = "default");
                    var n = n.split(":"), i = n[0];
                    CKEDITOR.stylesSet.addExternal(i, n[1] ? n.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), ""), CKEDITOR.stylesSet.load(i, function (n) {
                        t._.stylesDefinitions = n[i], e(t._.stylesDefinitions)
                    })
                }
            }
        }
    }),CKEDITOR.dom.comment = function (e, t) {
        "string" == typeof e && (e = (t ? t.$ : document).createComment(e)), CKEDITOR.dom.domObject.call(this, e)
    },CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node,CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, {
        type: CKEDITOR.NODE_COMMENT,
        getOuterHtml: function () {
            return "\x3c!--" + this.$.nodeValue + "--\x3e"
        }
    }),function () {
        var e, t = {}, n = {};
        for (e in CKEDITOR.dtd.$blockLimit)e in CKEDITOR.dtd.$list || (t[e] = 1);
        for (e in CKEDITOR.dtd.$block)e in CKEDITOR.dtd.$blockLimit || e in CKEDITOR.dtd.$empty || (n[e] = 1);
        CKEDITOR.dom.elementPath = function (e, i) {
            var o, a = null, r = null, s = [], l = e;
            i = i || e.getDocument().getBody(), l || (l = i);
            do {
                if (l.type == CKEDITOR.NODE_ELEMENT) {
                    if (s.push(l), !this.lastElement && (this.lastElement = l, l.is(CKEDITOR.dtd.$object) || "false" == l.getAttribute("contenteditable")))continue;
                    if (l.equals(i))break;
                    if (!r && (o = l.getName(), "true" == l.getAttribute("contenteditable") ? r = l : !a && n[o] && (a = l), t[o])) {
                        if (o = !a && "div" == o) {
                            e:{
                                o = l.getChildren();
                                for (var c = 0, d = o.count(); c < d; c++) {
                                    var u = o.getItem(c);
                                    if (u.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[u.getName()]) {
                                        o = !0;
                                        break e
                                    }
                                }
                                o = !1
                            }
                            o = !o
                        }
                        o ? a = l : r = l
                    }
                }
            } while (l = l.getParent());
            r || (r = i), this.block = a, this.blockLimit = r, this.root = i, this.elements = s
        }
    }(),CKEDITOR.dom.elementPath.prototype = {
        compare: function (e) {
            var t = this.elements;
            if (!(e = e && e.elements) || t.length != e.length)return !1;
            for (var n = 0; n < t.length; n++)if (!t[n].equals(e[n]))return !1;
            return !0
        }, contains: function (e, t, n) {
            var i, o = 0;
            "string" == typeof e && (i = function (t) {
                return t.getName() == e
            }), e instanceof CKEDITOR.dom.element ? i = function (t) {
                return t.equals(e)
            } : CKEDITOR.tools.isArray(e) ? i = function (t) {
                return -1 < CKEDITOR.tools.indexOf(e, t.getName())
            } : "function" == typeof e ? i = e : "object" == typeof e && (i = function (t) {
                    return t.getName() in e
                });
            var a = this.elements, r = a.length;
            for (t && (n ? o += 1 : --r), n && (a = Array.prototype.slice.call(a, 0), a.reverse()); o < r; o++)if (i(a[o]))return a[o];
            return null
        }, isContextFor: function (e) {
            var t;
            return !(e in CKEDITOR.dtd.$block) || (t = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, !!t.getDtd()[e])
        }, direction: function () {
            return (this.block || this.blockLimit || this.root).getDirection(1)
        }
    },CKEDITOR.dom.text = function (e, t) {
        "string" == typeof e && (e = (t ? t.$ : document).createTextNode(e)), this.$ = e
    },CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node,CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
        type: CKEDITOR.NODE_TEXT,
        getLength: function () {
            return this.$.nodeValue.length
        },
        getText: function () {
            return this.$.nodeValue
        },
        setText: function (e) {
            this.$.nodeValue = e
        },
        split: function (e) {
            var t = this.$.parentNode, n = t.childNodes.length, i = this.getLength(), o = this.getDocument(),
                a = new CKEDITOR.dom.text(this.$.splitText(e), o);
            return t.childNodes.length == n && (e >= i ? (a = o.createText(""), a.insertAfter(this)) : (e = o.createText(""), e.insertAfter(a), e.remove())), a
        },
        substring: function (e, t) {
            return "number" != typeof t ? this.$.nodeValue.substr(e) : this.$.nodeValue.substring(e, t)
        }
    }),function () {
        function e(e, t, n) {
            var i = e.serializable, o = t[n ? "endContainer" : "startContainer"], a = n ? "endOffset" : "startOffset",
                r = i ? t.document.getById(e.startNode) : e.startNode;
            return e = i ? t.document.getById(e.endNode) : e.endNode, o.equals(r.getPrevious()) ? (t.startOffset = t.startOffset - o.getLength() - e.getPrevious().getLength(), o = e.getNext()) : o.equals(e.getPrevious()) && (t.startOffset -= o.getLength(), o = e.getNext()), o.equals(r.getParent()) && t[a]++, o.equals(e.getParent()) && t[a]++, t[n ? "endContainer" : "startContainer"] = o, t
        }

        CKEDITOR.dom.rangeList = function (e) {
            return e instanceof CKEDITOR.dom.rangeList ? e : (e ? e instanceof CKEDITOR.dom.range && (e = [e]) : e = [], CKEDITOR.tools.extend(e, t))
        };
        var t = {
            createIterator: function () {
                var e, t = this, n = CKEDITOR.dom.walker.bookmark(), i = [];
                return {
                    getNextRange: function (o) {
                        e = void 0 === e ? 0 : e + 1;
                        var a = t[e];
                        if (a && 1 < t.length) {
                            if (!e)for (var r = t.length - 1; 0 <= r; r--)i.unshift(t[r].createBookmark(!0));
                            if (o)for (var s = 0; t[e + s + 1];) {
                                var l = a.document;
                                for (o = 0, r = l.getById(i[s].endNode), l = l.getById(i[s + 1].startNode); ;) {
                                    if (r = r.getNextSourceNode(!1), l.equals(r)) o = 1; else if (n(r) || r.type == CKEDITOR.NODE_ELEMENT && r.isBlockBoundary())continue;
                                    break
                                }
                                if (!o)break;
                                s++
                            }
                            for (a.moveToBookmark(i.shift()); s--;)r = t[++e], r.moveToBookmark(i.shift()), a.setEnd(r.endContainer, r.endOffset)
                        }
                        return a
                    }
                }
            }, createBookmarks: function (t) {
                for (var n, i = [], o = 0; o < this.length; o++) {
                    i.push(n = this[o].createBookmark(t, !0));
                    for (var a = o + 1; a < this.length; a++)this[a] = e(n, this[a]), this[a] = e(n, this[a], !0)
                }
                return i
            }, createBookmarks2: function (e) {
                for (var t = [], n = 0; n < this.length; n++)t.push(this[n].createBookmark2(e));
                return t
            }, moveToBookmarks: function (e) {
                for (var t = 0; t < this.length; t++)this[t].moveToBookmark(e[t])
            }
        }
    }(),function () {
        function e() {
            return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/")
        }

        function t(t) {
            var n = CKEDITOR.skin["ua_" + t], i = CKEDITOR.env;
            if (n)for (var o, n = n.split(",").sort(function (e, t) {
                return e > t ? -1 : 1
            }), a = 0; a < n.length; a++)if (o = n[a], i.ie && (o.replace(/^ie/, "") == i.version || i.quirks && "iequirks" == o) && (o = "ie"), i[o]) {
                t += "_" + n[a];
                break
            }
            return CKEDITOR.getUrl(e() + t + ".css")
        }

        function n(e, n) {
            a[e] || (CKEDITOR.document.appendStyleSheet(t(e)), a[e] = 1), n && n()
        }

        function i(e) {
            var t = e.getById(r);
            return t || (t = e.getHead().append("style"), t.setAttribute("id", r), t.setAttribute("type", "text/css")), t
        }

        function o(e, t, n) {
            var i, o, a;
            if (CKEDITOR.env.webkit)for (t = t.split("}").slice(0, -1), o = 0; o < t.length; o++)t[o] = t[o].split("{");
            for (var r = 0; r < e.length; r++)if (CKEDITOR.env.webkit)for (o = 0; o < t.length; o++) {
                for (a = t[o][1], i = 0; i < n.length; i++)a = a.replace(n[i][0], n[i][1]);
                e[r].$.sheet.addRule(t[o][0], a)
            } else {
                for (a = t, i = 0; i < n.length; i++)a = a.replace(n[i][0], n[i][1]);
                CKEDITOR.env.ie && 11 > CKEDITOR.env.version ? e[r].$.styleSheet.cssText += a : e[r].$.innerHTML += a
            }
        }

        var a = {};
        CKEDITOR.skin = {
            path: e, loadPart: function (t, i) {
                CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e() + "skin.js"), function () {
                    n(t, i)
                }) : n(t, i)
            }, getPath: function (e) {
                return CKEDITOR.getUrl(t(e))
            }, icons: {}, addIcon: function (e, t, n, i) {
                e = e.toLowerCase(), this.icons[e] || (this.icons[e] = {path: t, offset: n || 0, bgsize: i || "16px"})
            }, getIconStyle: function (e, t, n, i, o) {
                var a;
                return e && (e = e.toLowerCase(), t && (a = this.icons[e + "-rtl"]), a || (a = this.icons[e])), e = n || a && a.path || "", i = i || a && a.offset, o = o || a && a.bgsize || "16px", e && (e = e.replace(/'/g, "\\'")), e && "background-image:url('" + CKEDITOR.getUrl(e) + "');background-position:0 " + i + "px;background-size:" + o + ";"
            }
        }, CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            getUiColor: function () {
                return this.uiColor
            }, setUiColor: function (e) {
                var t = i(CKEDITOR.document);
                return (this.setUiColor = function (e) {
                    this.uiColor = e;
                    var n = CKEDITOR.skin.chameleon, i = "", a = "";
                    "function" == typeof n && (i = n(this, "editor"), a = n(this, "panel")), e = [[l, e]], o([t], i, e), o(s, a, e)
                }).call(this, e)
            }
        });
        var r = "cke_ui_color", s = [], l = /\$color/g;
        CKEDITOR.on("instanceLoaded", function (e) {
            if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                var t = e.editor;
                e = function (e) {
                    if (e = (e.data[0] || e.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument(), !e.getById("cke_ui_color")) {
                        e = i(e), s.push(e);
                        var n = t.getUiColor();
                        n && o([e], CKEDITOR.skin.chameleon(t, "panel"), [[l, n]])
                    }
                }, t.on("panelShow", e), t.on("menuShow", e), t.config.uiColor && t.setUiColor(t.config.uiColor)
            }
        })
    }(),function () {
        if (CKEDITOR.env.webkit) CKEDITOR.env.hc = !1; else {
            var e = CKEDITOR.dom.element.createFromHtml('<div style="width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"></div>', CKEDITOR.document);
            e.appendTo(CKEDITOR.document.getHead());
            try {
                var t = e.getComputedStyle("border-top-color"), n = e.getComputedStyle("border-right-color");
                CKEDITOR.env.hc = !(!t || t != n)
            } catch (e) {
                CKEDITOR.env.hc = !1
            }
            e.remove()
        }
        if (CKEDITOR.env.hc && (CKEDITOR.env.cssClass += " cke_hc"), CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}"), CKEDITOR.status = "loaded", CKEDITOR.fireOnce("loaded"), e = CKEDITOR._.pending)for (delete CKEDITOR._.pending, t = 0; t < e.length; t++)CKEDITOR.editor.prototype.constructor.apply(e[t][0], e[t][1]), CKEDITOR.add(e[t][0])
    }(),CKEDITOR.skin.name = "moono-lisa",CKEDITOR.skin.ua_editor = "ie,iequirks,ie8,gecko",CKEDITOR.skin.ua_dialog = "ie,iequirks,ie8",CKEDITOR.skin.chameleon = function () {
        var e = function () {
            return function (e, t) {
                for (var n = e.match(/[^#]./g), i = 0; 3 > i; i++) {
                    var o, a = i;
                    o = parseInt(n[i], 16), o = ("0" + (0 > t ? 0 | o * (1 + t) : 0 | o + (255 - o) * t).toString(16)).slice(-2), n[a] = o
                }
                return "#" + n.join("")
            }
        }(), t = {
            editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] "),
            panel: new CKEDITOR.template(".cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
        };
        return function (n, i) {
            var o = e(n.uiColor, .4), o = {
                id: "." + n.id,
                defaultBorder: e(o, -.2),
                toolbarElementsBorder: e(o, -.25),
                defaultBackground: o,
                lightBackground: e(o, .8),
                darkBackground: e(o, -.15),
                ckeButtonOn: e(o, .4),
                ckeResizer: e(o, -.4),
                ckeColorauto: e(o, .8),
                dialogBody: e(o, .7),
                dialogTab: e(o, .65),
                dialogTabSelected: "#FFF",
                dialogTabSelectedBorder: "#FFF",
                elementsPathColor: e(o, -.6),
                menubuttonHover: e(o, .1),
                menubuttonIcon: e(o, .5),
                menubuttonIconHover: e(o, .3)
            };
            return t[i].output(o).replace(/\[/g, "{").replace(/\]/g, "}")
        }
    }(),CKEDITOR.plugins.add("dialogui", {
        onLoad: function () {
            var e = function (e) {
                this._ || (this._ = {}), this._.default = this._.initValue = e.default || "", this._.required = e.required || !1;
                for (var t = [this._], n = 1; n < arguments.length; n++)t.push(arguments[n]);
                return t.push(!0), CKEDITOR.tools.extend.apply(CKEDITOR.tools, t), this._
            }, t = {
                build: function (e, t, n) {
                    return new CKEDITOR.ui.dialog.textInput(e, t, n)
                }
            }, n = {
                build: function (e, t, n) {
                    return new CKEDITOR.ui.dialog[t.type](e, t, n)
                }
            }, i = {
                isChanged: function () {
                    return this.getValue() != this.getInitValue()
                }, reset: function (e) {
                    this.setValue(this.getInitValue(), e)
                }, setInitValue: function () {
                    this._.initValue = this.getValue()
                }, resetInitValue: function () {
                    this._.initValue = this._.default
                }, getInitValue: function () {
                    return this._.initValue
                }
            }, o = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                onChange: function (e, t) {
                    this._.domOnChangeRegistered || (e.on("load", function () {
                        this.getInputElement().on("change", function () {
                            e.parts.dialog.isVisible() && this.fire("change", {value: this.getValue()})
                        }, this)
                    }, this), this._.domOnChangeRegistered = !0), this.on("change", t)
                }
            }, !0), a = /^on([A-Z]\w+)/, r = function (e) {
                for (var t in e)(a.test(t) || "title" == t || "type" == t) && delete e[t];
                return e
            }, s = function (e) {
                e = e.data.getKeystroke(), e == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : e == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl")
            };
            CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                labeledElement: function (t, n, i, o) {
                    if (!(4 > arguments.length)) {
                        var a = e.call(this, n);
                        a.labelId = CKEDITOR.tools.getNextId() + "_label", this._.children = [];
                        var r = {role: n.role || "presentation"};
                        n.includeLabel && (r["aria-labelledby"] = a.labelId), CKEDITOR.ui.dialog.uiElement.call(this, t, n, i, "div", null, r, function () {
                            var e = [], i = n.required ? " cke_required" : ""
                            ;
                            return "horizontal" != n.labelLayout ? e.push('<label class="cke_dialog_ui_labeled_label' + i + '" ', ' id="' + a.labelId + '"', a.inputId ? ' for="' + a.inputId + '"' : "", (n.labelStyle ? ' style="' + n.labelStyle + '"' : "") + ">", n.label, "</label>", '<div class="cke_dialog_ui_labeled_content"', n.controlStyle ? ' style="' + n.controlStyle + '"' : "", ' role="presentation">', o.call(this, t, n), "</div>") : (i = {
                                type: "hbox",
                                widths: n.widths,
                                padding: 0,
                                children: [{
                                    type: "html",
                                    html: '<label class="cke_dialog_ui_labeled_label' + i + '" id="' + a.labelId + '" for="' + a.inputId + '"' + (n.labelStyle ? ' style="' + n.labelStyle + '"' : "") + ">" + CKEDITOR.tools.htmlEncode(n.label) + "</label>"
                                }, {
                                    type: "html",
                                    html: '<span class="cke_dialog_ui_labeled_content"' + (n.controlStyle ? ' style="' + n.controlStyle + '"' : "") + ">" + o.call(this, t, n) + "</span>"
                                }]
                            }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(t, i, e)), e.join("")
                        })
                    }
                }, textInput: function (t, n, i) {
                    if (!(3 > arguments.length)) {
                        e.call(this, n);
                        var o = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput",
                            a = {class: "cke_dialog_ui_input_" + n.type, id: o, type: n.type};
                        n.validate && (this.validate = n.validate), n.maxLength && (a.maxlength = n.maxLength), n.size && (a.size = n.size), n.inputStyle && (a.style = n.inputStyle);
                        var r = this, l = !1;
                        t.on("load", function () {
                            r.getInputElement().on("keydown", function (e) {
                                13 == e.data.getKeystroke() && (l = !0)
                            }), r.getInputElement().on("keyup", function (e) {
                                13 == e.data.getKeystroke() && l && (t.getButton("ok") && setTimeout(function () {
                                    t.getButton("ok").click()
                                }, 0), l = !1), r.bidi && s.call(r, e)
                            }, null, null, 1e3)
                        }), CKEDITOR.ui.dialog.labeledElement.call(this, t, n, i, function () {
                            var e = ['<div class="cke_dialog_ui_input_', n.type, '" role="presentation"'];
                            n.width && e.push('style="width:' + n.width + '" '), e.push("><input "), a["aria-labelledby"] = this._.labelId, this._.required && (a["aria-required"] = this._.required);
                            for (var t in a)e.push(t + '="' + a[t] + '" ');
                            return e.push(" /></div>"), e.join("")
                        })
                    }
                }, textarea: function (t, n, i) {
                    if (!(3 > arguments.length)) {
                        e.call(this, n);
                        var o = this, a = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea", r = {};
                        n.validate && (this.validate = n.validate), r.rows = n.rows || 5, r.cols = n.cols || 20, r.class = "cke_dialog_ui_input_textarea " + (n.class || ""), void 0 !== n.inputStyle && (r.style = n.inputStyle), n.dir && (r.dir = n.dir), o.bidi && t.on("load", function () {
                            o.getInputElement().on("keyup", s)
                        }, o), CKEDITOR.ui.dialog.labeledElement.call(this, t, n, i, function () {
                            r["aria-labelledby"] = this._.labelId, this._.required && (r["aria-required"] = this._.required);
                            var e,
                                t = ['<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea id="', a, '" '];
                            for (e in r)t.push(e + '="' + CKEDITOR.tools.htmlEncode(r[e]) + '" ');
                            return t.push(">", CKEDITOR.tools.htmlEncode(o._.default), "</textarea></div>"), t.join("")
                        })
                    }
                }, checkbox: function (t, n, i) {
                    if (!(3 > arguments.length)) {
                        var o = e.call(this, n, {default: !!n.default});
                        n.validate && (this.validate = n.validate), CKEDITOR.ui.dialog.uiElement.call(this, t, n, i, "span", null, null, function () {
                            var e = CKEDITOR.tools.extend({}, n, {id: n.id ? n.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox"}, !0),
                                i = [], a = CKEDITOR.tools.getNextId() + "_label",
                                s = {class: "cke_dialog_ui_checkbox_input", type: "checkbox", "aria-labelledby": a};
                            return r(e), n.default && (s.checked = "checked"), void 0 !== e.inputStyle && (e.style = e.inputStyle), o.checkbox = new CKEDITOR.ui.dialog.uiElement(t, e, i, "input", null, s), i.push(' <label id="', a, '" for="', s.id, '"' + (n.labelStyle ? ' style="' + n.labelStyle + '"' : "") + ">", CKEDITOR.tools.htmlEncode(n.label), "</label>"), i.join("")
                        })
                    }
                }, radio: function (t, n, i) {
                    if (!(3 > arguments.length)) {
                        e.call(this, n), this._.default || (this._.default = this._.initValue = n.items[0][1]), n.validate && (this.validate = n.validate);
                        var o = [], a = this;
                        n.role = "radiogroup", n.includeLabel = !0, CKEDITOR.ui.dialog.labeledElement.call(this, t, n, i, function () {
                            for (var e = [], i = [], s = (n.id ? n.id : CKEDITOR.tools.getNextId()) + "_radio", l = 0; l < n.items.length; l++) {
                                var c = n.items[l], d = void 0 !== c[2] ? c[2] : c[0],
                                    u = void 0 !== c[1] ? c[1] : c[0], h = CKEDITOR.tools.getNextId() + "_radio_input",
                                    f = h + "_label",
                                    h = CKEDITOR.tools.extend({}, n, {id: h, title: null, type: null}, !0),
                                    d = CKEDITOR.tools.extend({}, h, {title: d}, !0), g = {
                                        type: "radio",
                                        class: "cke_dialog_ui_radio_input",
                                        name: s,
                                        value: u,
                                        "aria-labelledby": f
                                    }, m = [];
                                a._.default == u && (g.checked = "checked"), r(h), r(d), void 0 !== h.inputStyle && (h.style = h.inputStyle), h.keyboardFocusable = !0, o.push(new CKEDITOR.ui.dialog.uiElement(t, h, m, "input", null, g)), m.push(" "), new CKEDITOR.ui.dialog.uiElement(t, d, m, "label", null, {
                                    id: f,
                                    for: g.id
                                }, c[0]), e.push(m.join(""))
                            }
                            return new CKEDITOR.ui.dialog.hbox(t, o, e, i), i.join("")
                        }), this._.children = o
                    }
                }, button: function (t, n, i) {
                    if (arguments.length) {
                        "function" == typeof n && (n = n(t.getParentEditor())), e.call(this, n, {disabled: n.disabled || !1}), CKEDITOR.event.implementOn(this);
                        var o = this;
                        t.on("load", function () {
                            var e = this.getElement();
                            !function () {
                                e.on("click", function (e) {
                                    o.click(), e.data.preventDefault()
                                }), e.on("keydown", function (e) {
                                    e.data.getKeystroke() in {32: 1} && (o.click(), e.data.preventDefault())
                                })
                            }(), e.unselectable()
                        }, this);
                        var a = CKEDITOR.tools.extend({}, n);
                        delete a.style;
                        var r = CKEDITOR.tools.getNextId() + "_label";
                        CKEDITOR.ui.dialog.uiElement.call(this, t, a, i, "a", null, {
                            style: n.style,
                            href: "javascript:void(0)",
                            title: n.label,
                            hidefocus: "true",
                            class: n.class,
                            role: "button",
                            "aria-labelledby": r
                        }, '<span id="' + r + '" class="cke_dialog_ui_button">' + CKEDITOR.tools.htmlEncode(n.label) + "</span>")
                    }
                }, select: function (t, n, i) {
                    if (!(3 > arguments.length)) {
                        var o = e.call(this, n);
                        n.validate && (this.validate = n.validate), o.inputId = CKEDITOR.tools.getNextId() + "_select", CKEDITOR.ui.dialog.labeledElement.call(this, t, n, i, function () {
                            var e = CKEDITOR.tools.extend({}, n, {id: n.id ? n.id + "_select" : CKEDITOR.tools.getNextId() + "_select"}, !0),
                                i = [], a = [], s = {
                                    id: o.inputId,
                                    class: "cke_dialog_ui_input_select",
                                    "aria-labelledby": this._.labelId
                                };
                            i.push('<div class="cke_dialog_ui_input_', n.type, '" role="presentation"'), n.width && i.push('style="width:' + n.width + '" '), i.push(">"), void 0 !== n.size && (s.size = n.size), void 0 !== n.multiple && (s.multiple = n.multiple), r(e);
                            for (var l, c = 0; c < n.items.length && (l = n.items[c]); c++)a.push('<option value="', CKEDITOR.tools.htmlEncode(void 0 !== l[1] ? l[1] : l[0]).replace(/"/g, "&quot;"), '" /> ', CKEDITOR.tools.htmlEncode(l[0]));
                            return void 0 !== e.inputStyle && (e.style = e.inputStyle), o.select = new CKEDITOR.ui.dialog.uiElement(t, e, i, "select", null, s, a.join("")), i.push("</div>"), i.join("")
                        })
                    }
                }, file: function (t, n, i) {
                    if (!(3 > arguments.length)) {
                        void 0 === n.default && (n.default = "");
                        var o = CKEDITOR.tools.extend(e.call(this, n), {definition: n, buttons: []});
                        n.validate && (this.validate = n.validate), t.on("load", function () {
                            CKEDITOR.document.getById(o.frameId).getParent().addClass("cke_dialog_ui_input_file")
                        }), CKEDITOR.ui.dialog.labeledElement.call(this, t, n, i, function () {
                            o.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
                            var e = ['<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" role="presentation" id="', o.frameId, '" title="', n.label, '" src="javascript:void('];
                            return e.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0"), e.push(')"></iframe>'), e.join("")
                        })
                    }
                }, fileButton: function (t, n, i) {
                    var o = this;
                    if (!(3 > arguments.length)) {
                        e.call(this, n), n.validate && (this.validate = n.validate);
                        var a = CKEDITOR.tools.extend({}, n), r = a.onClick;
                        a.className = (a.className ? a.className + " " : "") + "cke_dialog_ui_button", a.onClick = function (e) {
                            var i = n.for;
                            !1 !== (e = !!r && r.call(this, e)) && ("xhr" !== e && t.getContentElement(i[0], i[1]).submit(), this.disable())
                        }, t.on("load", function () {
                            t.getContentElement(n.for[0], n.for[1])._.buttons.push(o)
                        }), CKEDITOR.ui.dialog.button.call(this, t, a, i)
                    }
                }, html: function () {
                    var e = /^\s*<[\w:]+\s+([^>]*)?>/, t = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/, n = /\/$/;
                    return function (i, o, a) {
                        if (!(3 > arguments.length)) {
                            var r = [], s = o.html;
                            "<" != s.charAt(0) && (s = "<span>" + s + "</span>");
                            var l = o.focus;
                            if (l) {
                                var c = this.focus;
                                this.focus = function () {
                                    ("function" == typeof l ? l : c).call(this), this.fire("focus")
                                }, o.isFocusable && (this.isFocusable = this.isFocusable), this.keyboardFocusable = !0
                            }
                            CKEDITOR.ui.dialog.uiElement.call(this, i, o, r, "span", null, null, ""), r = r.join("").match(e), s = s.match(t) || ["", "", ""], n.test(s[1]) && (s[1] = s[1].slice(0, -1), s[2] = "/" + s[2]), a.push([s[1], " ", r[1] || "", s[2]].join(""))
                        }
                    }
                }(), fieldset: function (e, t, n, i, o) {
                    var a = o.label;
                    this._ = {children: t}, CKEDITOR.ui.dialog.uiElement.call(this, e, o, i, "fieldset", null, null, function () {
                        var e = [];
                        a && e.push("<legend" + (o.labelStyle ? ' style="' + o.labelStyle + '"' : "") + ">" + a + "</legend>");
                        for (var t = 0; t < n.length; t++)e.push(n[t]);
                        return e.join("")
                    })
                }
            }, !0), CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement, CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setLabel: function (e) {
                    var t = CKEDITOR.document.getById(this._.labelId);
                    return 1 > t.getChildCount() ? new CKEDITOR.dom.text(e, CKEDITOR.document).appendTo(t) : t.getChild(0).$.nodeValue = e, this
                }, getLabel: function () {
                    var e = CKEDITOR.document.getById(this._.labelId);
                    return !e || 1 > e.getChildCount() ? "" : e.getChild(0).getText()
                }, eventProcessors: o
            }, !0), CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                click: function () {
                    return !this._.disabled && this.fire("click", {dialog: this._.dialog})
                },
                enable: function () {
                    this._.disabled = !1;
                    var e = this.getElement();
                    e && e.removeClass("cke_disabled")
                },
                disable: function () {
                    this._.disabled = !0, this.getElement().addClass("cke_disabled")
                },
                isVisible: function () {
                    return this.getElement().getFirst().isVisible()
                },
                isEnabled: function () {
                    return !this._.disabled
                },
                eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                    onClick: function (e, t) {
                        this.on("click", function () {
                            t.apply(this, arguments)
                        })
                    }
                }, !0),
                accessKeyUp: function () {
                    this.click()
                },
                accessKeyDown: function () {
                    this.focus()
                },
                keyboardFocusable: !0
            }, !0), CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function () {
                    return CKEDITOR.document.getById(this._.inputId)
                }, focus: function () {
                    var e = this.selectParentTab();
                    setTimeout(function () {
                        var t = e.getInputElement();
                        t && t.$.focus()
                    }, 0)
                }, select: function () {
                    var e = this.selectParentTab();
                    setTimeout(function () {
                        var t = e.getInputElement();
                        t && (t.$.focus(), t.$.select())
                    }, 0)
                }, accessKeyUp: function () {
                    this.select()
                }, setValue: function (e) {
                    if (this.bidi) {
                        var t = e && e.charAt(0);
                        (t = "‪" == t ? "ltr" : "‫" == t ? "rtl" : null) && (e = e.slice(1)), this.setDirectionMarker(t)
                    }
                    return e || (e = ""), CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments)
                }, getValue: function () {
                    var e = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);
                    if (this.bidi && e) {
                        var t = this.getDirectionMarker();
                        t && (e = ("ltr" == t ? "‪" : "‫") + e)
                    }
                    return e
                }, setDirectionMarker: function (e) {
                    var t = this.getInputElement();
                    e ? t.setAttributes({
                        dir: e,
                        "data-cke-dir-marker": e
                    }) : this.getDirectionMarker() && t.removeAttributes(["dir", "data-cke-dir-marker"])
                }, getDirectionMarker: function () {
                    return this.getInputElement().data("cke-dir-marker")
                }, keyboardFocusable: !0
            }, i, !0), CKEDITOR.ui.dialog.textarea.prototype = new CKEDITOR.ui.dialog.textInput, CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function () {
                    return this._.select.getElement()
                }, add: function (e, t, n) {
                    var i = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document),
                        o = this.getInputElement().$;
                    return i.$.text = e, i.$.value = void 0 === t || null === t ? e : t, void 0 === n || null === n ? CKEDITOR.env.ie ? o.add(i.$) : o.add(i.$, null) : o.add(i.$, n), this
                }, remove: function (e) {
                    return this.getInputElement().$.remove(e), this
                }, clear: function () {
                    for (var e = this.getInputElement().$; 0 < e.length;)e.remove(0);
                    return this
                }, keyboardFocusable: !0
            }, i, !0), CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                getInputElement: function () {
                    return this._.checkbox.getElement()
                }, setValue: function (e, t) {
                    this.getInputElement().$.checked = e, !t && this.fire("change", {value: e})
                }, getValue: function () {
                    return this.getInputElement().$.checked
                }, accessKeyUp: function () {
                    this.setValue(!this.getValue())
                }, eventProcessors: {
                    onChange: function (e, t) {
                        return !CKEDITOR.env.ie || 8 < CKEDITOR.env.version ? o.onChange.apply(this, arguments) : (e.on("load", function () {
                            var e = this._.checkbox.getElement();
                            e.on("propertychange", function (t) {
                                t = t.data.$, "checked" == t.propertyName && this.fire("change", {value: e.$.checked})
                            }, this)
                        }, this), this.on("change", t), null)
                    }
                }, keyboardFocusable: !0
            }, i, !0), CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setValue: function (e, t) {
                    for (var n, i = this._.children, o = 0; o < i.length && (n = i[o]); o++)n.getElement().$.checked = n.getValue() == e;
                    !t && this.fire("change", {value: e})
                }, getValue: function () {
                    for (var e = this._.children, t = 0; t < e.length; t++)if (e[t].getElement().$.checked)return e[t].getValue();
                    return null
                }, accessKeyUp: function () {
                    var e, t = this._.children;
                    for (e = 0; e < t.length; e++)if (t[e].getElement().$.checked)return void t[e].getElement().focus();
                    t[0].getElement().focus()
                }, eventProcessors: {
                    onChange: function (e, t) {
                        return !CKEDITOR.env.ie || 8 < CKEDITOR.env.version ? o.onChange.apply(this, arguments) : (e.on("load", function () {
                            for (var e = this._.children, t = this, n = 0; n < e.length; n++)e[n].getElement().on("propertychange", function (e) {
                                e = e.data.$, "checked" == e.propertyName && this.$.checked && t.fire("change", {value: this.getAttribute("value")})
                            })
                        }, this), this.on("change", t), null)
                    }
                }
            }, i, !0), CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, i, {
                getInputElement: function () {
                    var e = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
                    return 0 < e.$.forms.length ? new CKEDITOR.dom.element(e.$.forms[0].elements[0]) : this.getElement()
                }, submit: function () {
                    return this.getInputElement().getParent().$.submit(), this
                }, getAction: function () {
                    return this.getInputElement().getParent().$.action
                }, registerEvents: function (e) {
                    var t, n, i = /^on([A-Z]\w+)/;
                    for (n in e)(t = n.match(i)) && (this.eventProcessors[n] ? this.eventProcessors[n].call(this, this._.dialog, e[n]) : function (e, t, n, i) {
                        e.on("formLoaded", function () {
                            e.getInputElement().on(n, i, e)
                        })
                    }(this, this._.dialog, t[1].toLowerCase(), e[n]));
                    return this
                }, reset: function () {
                    function e() {
                        n.$.open();
                        var e = "";
                        i.size && (e = i.size - (CKEDITOR.env.ie ? 7 : 0));
                        var c = t.frameId + "_input";
                        for (n.$.write(['<html dir="' + s + '" lang="' + l + '"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" dir="' + s + '" lang="' + l + '" action="', CKEDITOR.tools.htmlEncode(i.action), '"><label id="', t.labelId, '" for="', c, '" style="display:none">', CKEDITOR.tools.htmlEncode(i.label), '</label><input style="width:100%" id="', c, '" aria-labelledby="', t.labelId, '" type="file" name="', CKEDITOR.tools.htmlEncode(i.id || "cke_upload"), '" size="', CKEDITOR.tools.htmlEncode(0 < e ? e : ""), '" /></form></body></html><script>', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + a + ");", "window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction(" + r + ")}", "<\/script>"].join("")), n.$.close(), e = 0; e < o.length; e++)o[e].enable()
                    }

                    var t = this._, n = CKEDITOR.document.getById(t.frameId).getFrameDocument(), i = t.definition,
                        o = t.buttons, a = this.formLoadedNumber, r = this.formUnloadNumber,
                        s = t.dialog._.editor.lang.dir, l = t.dialog._.editor.langCode;
                    a || (a = this.formLoadedNumber = CKEDITOR.tools.addFunction(function () {
                        this.fire("formLoaded")
                    }, this), r = this.formUnloadNumber = CKEDITOR.tools.addFunction(function () {
                        this.getInputElement().clearCustomData()
                    }, this), this.getDialog()._.editor.on("destroy", function () {
                        CKEDITOR.tools.removeFunction(a), CKEDITOR.tools.removeFunction(r)
                    })), CKEDITOR.env.gecko ? setTimeout(e, 500) : e()
                }, getValue: function () {
                    return this.getInputElement().$.value || ""
                }, setInitValue: function () {
                    this._.initValue = ""
                }, eventProcessors: {
                    onChange: function (e, t) {
                        this._.domOnChangeRegistered || (this.on("formLoaded", function () {
                            this.getInputElement().on("change", function () {
                                this.fire("change", {value: this.getValue()})
                            }, this)
                        }, this), this._.domOnChangeRegistered = !0), this.on("change", t)
                    }
                }, keyboardFocusable: !0
            }, !0), CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button, CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype), CKEDITOR.dialog.addUIElement("text", t), CKEDITOR.dialog.addUIElement("password", t), CKEDITOR.dialog.addUIElement("textarea", n), CKEDITOR.dialog.addUIElement("checkbox", n), CKEDITOR.dialog.addUIElement("radio", n), CKEDITOR.dialog.addUIElement("button", n), CKEDITOR.dialog.addUIElement("select", n), CKEDITOR.dialog.addUIElement("file", n), CKEDITOR.dialog.addUIElement("fileButton", n), CKEDITOR.dialog.addUIElement("html", n), CKEDITOR.dialog.addUIElement("fieldset", {
                build: function (e, t, n) {
                    for (var i, o = t.children, a = [], r = [], s = 0; s < o.length && (i = o[s]); s++) {
                        var l = [];
                        a.push(l), r.push(CKEDITOR.dialog._.uiElementBuilders[i.type].build(e, i, l))
                    }
                    return new CKEDITOR.ui.dialog[t.type](e, r, a, n, t)
                }
            })
        }
    }),CKEDITOR.DIALOG_RESIZE_NONE = 0,CKEDITOR.DIALOG_RESIZE_WIDTH = 1,CKEDITOR.DIALOG_RESIZE_HEIGHT = 2,CKEDITOR.DIALOG_RESIZE_BOTH = 3,CKEDITOR.DIALOG_STATE_IDLE = 1,CKEDITOR.DIALOG_STATE_BUSY = 2,function () {
        function e() {
            for (var e = this._.tabIdList.length, t = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + e, n = t - 1; n > t - e; n--)if (this._.tabs[this._.tabIdList[n % e]][0].$.offsetHeight)return this._.tabIdList[n % e];
            return null
        }

        function t() {
            for (var e = this._.tabIdList.length, t = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), n = t + 1; n < t + e; n++)if (this._.tabs[this._.tabIdList[n % e]][0].$.offsetHeight)return this._.tabIdList[n % e];
            return null
        }

        function n(e, t) {
            for (var n = e.$.getElementsByTagName("input"), i = 0, o = n.length; i < o; i++) {
                var a = new CKEDITOR.dom.element(n[i]);
                "text" == a.getAttribute("type").toLowerCase() && (t ? (a.setAttribute("value", a.getCustomData("fake_value") || ""), a.removeCustomData("fake_value")) : (a.setCustomData("fake_value", a.getAttribute("value")), a.setAttribute("value", "")))
            }
        }

        function i(e, t) {
            var n = this.getInputElement();
            n && (e ? n.removeAttribute("aria-invalid") : n.setAttribute("aria-invalid", !0)), e || (this.select ? this.select() : this.focus()), t && alert(t), this.fire("validated", {
                valid: e,
                msg: t
            })
        }

        function o() {
            var e = this.getInputElement();
            e && e.removeAttribute("aria-invalid")
        }

        function a(e) {
            var t = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", m).output({
                id: CKEDITOR.tools.getNextNumber(),
                editorId: e.id,
                langDir: e.lang.dir,
                langCode: e.langCode,
                editorDialogClass: "cke_editor_" + e.name.replace(/\./g, "\\.") + "_dialog",
                closeTitle: e.lang.common.close,
                hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : ""
            })), n = t.getChild([0, 0, 0, 0, 0]), i = n.getChild(0), o = n.getChild(1);
            return e.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(n), !CKEDITOR.env.ie || CKEDITOR.env.quirks || CKEDITOR.env.edge || (e = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())", CKEDITOR.dom.element.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="' + e + '" tabIndex="-1"></iframe>').appendTo(n.getParent())), i.unselectable(), o.unselectable(), {
                element: t,
                parts: {
                    dialog: t.getChild(0),
                    title: i,
                    close: o,
                    tabs: n.getChild(2),
                    contents: n.getChild([3, 0, 0, 0]),
                    footer: n.getChild([3, 0, 1, 0])
                }
            }
        }

        function r(e, t, n) {
            this.element = t, this.focusIndex = n, this.tabIndex = 0, this.isFocusable = function () {
                return !t.getAttribute("disabled") && t.isVisible()
            }, this.focus = function () {
                e._.currentFocusIndex = this.focusIndex, this.element.focus()
            }, t.on("keydown", function (e) {
                e.data.getKeystroke() in {32: 1, 13: 1} && this.fire("click")
            }), t.on("focus", function () {
                this.fire("mouseover")
            }), t.on("blur", function () {
                this.fire("mouseout")
            })
        }

        function s(e) {
            function t() {
                e.layout()
            }

            var n = CKEDITOR.document.getWindow();
            n.on("resize", t), e.on("hide", function () {
                n.removeListener("resize", t)
            })
        }

        function l(e, t) {
            this._ = {dialog: e}, CKEDITOR.tools.extend(this, t)
        }

        function c(e) {
            function t(t) {
                var n = e.getSize(), l = CKEDITOR.document.getWindow().getViewPaneSize(), c = t.data.$.screenX,
                    d = t.data.$.screenY, u = c - i.x, h = d - i.y;
                i = {
                    x: c,
                    y: d
                }, o.x += u, o.y += h, e.move(o.x + s[3] < r ? -s[3] : o.x - s[1] > l.width - n.width - r ? l.width - n.width + ("rtl" == a.lang.dir ? 0 : s[1]) : o.x, o.y + s[0] < r ? -s[0] : o.y - s[2] > l.height - n.height - r ? l.height - n.height + s[2] : o.y, 1), t.data.preventDefault()
            }

            function n() {
                if (CKEDITOR.document.removeListener("mousemove", t), CKEDITOR.document.removeListener("mouseup", n), CKEDITOR.env.ie6Compat) {
                    var e = D.getChild(0).getFrameDocument();
                    e.removeListener("mousemove", t), e.removeListener("mouseup", n)
                }
            }

            var i = null, o = null, a = e.getParentEditor(), r = a.config.dialog_magnetDistance,
                s = CKEDITOR.skin.margins || [0, 0, 0, 0];
            void 0 === r && (r = 20), e.parts.title.on("mousedown", function (a) {
                if (i = {
                        x: a.data.$.screenX,
                        y: a.data.$.screenY
                    }, CKEDITOR.document.on("mousemove", t), CKEDITOR.document.on("mouseup", n), o = e.getPosition(), CKEDITOR.env.ie6Compat) {
                    var r = D.getChild(0).getFrameDocument();
                    r.on("mousemove", t), r.on("mouseup", n)
                }
                a.data.preventDefault()
            }, e)
        }

        function d(e) {
            function t(t) {
                var n = "rtl" == u.lang.dir, d = c.width, h = c.height,
                    f = d + (t.data.$.screenX - l.x) * (n ? -1 : 1) * (e._.moved ? 1 : 2),
                    g = h + (t.data.$.screenY - l.y) * (e._.moved ? 1 : 2), m = e._.element.getFirst(),
                    m = n && m.getComputedStyle("right"), E = e.getPosition();
                E.y + g > s.height && (g = s.height - E.y), (n ? m : E.x) + f > s.width && (f = s.width - (n ? m : E.x)), o != CKEDITOR.DIALOG_RESIZE_WIDTH && o != CKEDITOR.DIALOG_RESIZE_BOTH || (d = Math.max(i.minWidth || 0, f - a)), o != CKEDITOR.DIALOG_RESIZE_HEIGHT && o != CKEDITOR.DIALOG_RESIZE_BOTH || (h = Math.max(i.minHeight || 0, g - r)), e.resize(d, h), e._.moved || e.layout(), t.data.preventDefault()
            }

            function n() {
                if (CKEDITOR.document.removeListener("mouseup", n), CKEDITOR.document.removeListener("mousemove", t), d && (d.remove(), d = null), CKEDITOR.env.ie6Compat) {
                    var e = D.getChild(0).getFrameDocument();
                    e.removeListener("mouseup", n), e.removeListener("mousemove", t)
                }
            }

            var i = e.definition, o = i.resizable;
            if (o != CKEDITOR.DIALOG_RESIZE_NONE) {
                var a, r, s, l, c, d, u = e.getParentEditor(), h = CKEDITOR.tools.addFunction(function (i) {
                    c = e.getSize();
                    var o = e.parts.contents;
                    o.$.getElementsByTagName("iframe").length && (d = CKEDITOR.dom.element.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>'), o.append(d)), r = c.height - e.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks)), a = c.width - e.parts.contents.getSize("width", 1), l = {
                        x: i.screenX,
                        y: i.screenY
                    }, s = CKEDITOR.document.getWindow().getViewPaneSize(), CKEDITOR.document.on("mousemove", t), CKEDITOR.document.on("mouseup", n), CKEDITOR.env.ie6Compat && (o = D.getChild(0).getFrameDocument(), o.on("mousemove", t), o.on("mouseup", n)), i.preventDefault && i.preventDefault()
                });
                e.on("load", function () {
                    var t = "";
                    o == CKEDITOR.DIALOG_RESIZE_WIDTH ? t = " cke_resizer_horizontal" : o == CKEDITOR.DIALOG_RESIZE_HEIGHT && (t = " cke_resizer_vertical"), t = CKEDITOR.dom.element.createFromHtml('<div class="cke_resizer' + t + " cke_resizer_" + u.lang.dir + '" title="' + CKEDITOR.tools.htmlEncode(u.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + h + ', event )">' + ("ltr" == u.lang.dir ? "◢" : "◣") + "</div>"), e.parts.footer.append(t, 1)
                }), u.on("destroy", function () {
                    CKEDITOR.tools.removeFunction(h)
                })
            }
        }

        function u(e) {
            e.data.preventDefault(1)
        }

        function h(e) {
            var t = CKEDITOR.document.getWindow(), n = e.config, i = CKEDITOR.skinName || e.config.skin,
                o = n.dialog_backgroundCoverColor || ("moono-lisa" == i ? "black" : "white"),
                i = n.dialog_backgroundCoverOpacity, a = n.baseFloatZIndex, n = CKEDITOR.tools.genKey(o, i, a),
                r = R[n];
            r ? r.show() : (a = ['<div tabIndex="-1" style="position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", a, "; top: 0px; left: 0px; ", CKEDITOR.env.ie6Compat ? "" : "background-color: " + o, '" class="cke_dialog_background_cover">'], CKEDITOR.env.ie6Compat && (o = "<html><body style=\\'background-color:" + o + ";\\'></body></html>", a.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:'), a.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + o + "' );document.close();") + "})())"), a.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>')), a.push("</div>"), r = CKEDITOR.dom.element.createFromHtml(a.join("")), r.setOpacity(void 0 !== i ? i : .5), r.on("keydown", u), r.on("keypress", u), r.on("keyup", u), r.appendTo(CKEDITOR.document.getBody()), R[n] = r), e.focusManager.add(r), D = r, e = function () {
                var e = t.getViewPaneSize();
                r.setStyles({width: e.width + "px", height: e.height + "px"})
            };
            var s = function () {
                var e = t.getScrollPosition(), n = CKEDITOR.dialog._.currentTop;
                if (r.setStyles({left: e.x + "px", top: e.y + "px"}), n)do {
                    e = n.getPosition(), n.move(e.x, e.y)
                } while (n = n._.parentDialog)
            };
            if (O = e, t.on("resize", e), e(), CKEDITOR.env.mac && CKEDITOR.env.webkit || r.focus(), CKEDITOR.env.ie6Compat) {
                var l = function () {
                    s(), arguments.callee.prevScrollHandler.apply(this, arguments)
                };
                t.$.setTimeout(function () {
                    l.prevScrollHandler = window.onscroll || function () {
                        }, window.onscroll = l
                }, 0), s()
            }
        }

        function f(e) {
            D && (e.focusManager.remove(D), e = CKEDITOR.document.getWindow(), D.hide(), e.removeListener("resize", O), CKEDITOR.env.ie6Compat && e.$.setTimeout(function () {
                window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null
            }, 0), O = null)
        }

        var g = CKEDITOR.tools.cssLength,
            m = '<div class="cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir="{langDir}" lang="{langCode}" role="dialog" aria-labelledby="cke_dialog_title_{id}"><table class="cke_dialog ' + CKEDITOR.env.cssClass + ' cke_{langDir}" style="position:absolute" role="presentation"><tr><td role="presentation"><div class="cke_dialog_body" role="presentation"><div id="cke_dialog_title_{id}" class="cke_dialog_title" role="presentation"></div><a id="cke_dialog_close_button_{id}" class="cke_dialog_close_button" href="javascript:void(0)" title="{closeTitle}" role="button"><span class="cke_label">X</span></a><div id="cke_dialog_tabs_{id}" class="cke_dialog_tabs" role="tablist"></div><table class="cke_dialog_contents" role="presentation"><tr><td id="cke_dialog_contents_{id}" class="cke_dialog_contents_body" role="presentation"></td></tr><tr><td id="cke_dialog_footer_{id}" class="cke_dialog_footer" role="presentation"></td></tr></table></div></td></tr></table></div>';
        CKEDITOR.dialog = function (n, r) {
            function s() {
                var e = R._.focusList;
                e.sort(function (e, t) {
                    return e.tabIndex != t.tabIndex ? t.tabIndex - e.tabIndex : e.focusIndex - t.focusIndex
                });
                for (var t = e.length, n = 0; n < t; n++)e[n].focusIndex = n
            }

            function l(e) {
                var t = R._.focusList;
                if (e = e || 0, !(1 > t.length)) {
                    var n = R._.currentFocusIndex;
                    R._.tabBarMode && 0 > e && (n = 0);
                    try {
                        t[n].getInputElement().$.blur()
                    } catch (e) {
                    }
                    var i = n, o = 1 < R._.pageCount;
                    do {
                        if (i += e, o && !R._.tabBarMode && (i == t.length || -1 == i))return R._.tabBarMode = !0, R._.tabs[R._.currentTabId][0].focus(), void(R._.currentFocusIndex = -1);
                        if ((i = (i + t.length) % t.length) == n)break
                    } while (e && !t[i].isFocusable());
                    t[i].focus(), "text" == t[i].type && t[i].select()
                }
            }

            function u(i) {
                if (R == CKEDITOR.dialog._.currentTop) {
                    var o = i.data.getKeystroke(), a = "rtl" == n.lang.dir, r = [37, 38, 39, 40];
                    if (f = g = 0, 9 == o || o == CKEDITOR.SHIFT + 9) l(o == CKEDITOR.SHIFT + 9 ? -1 : 1), f = 1; else if (o == CKEDITOR.ALT + 121 && !R._.tabBarMode && 1 < R.getPageCount()) R._.tabBarMode = !0, R._.tabs[R._.currentTabId][0].focus(), R._.currentFocusIndex = -1, f = 1; else if (-1 != CKEDITOR.tools.indexOf(r, o) && R._.tabBarMode) o = -1 != CKEDITOR.tools.indexOf([a ? 39 : 37, 38], o) ? e.call(R) : t.call(R), R.selectPage(o), R._.tabs[o][0].focus(), f = 1; else if (13 != o && 32 != o || !R._.tabBarMode)if (13 == o) o = i.data.getTarget(), o.is("a", "button", "select", "textarea") || o.is("input") && "button" == o.$.type || ((o = this.getButton("ok")) && CKEDITOR.tools.setTimeout(o.click, 0, o), f = 1), g = 1; else {
                        if (27 != o)return;
                        (o = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(o.click, 0, o) : !1 !== this.fire("cancel", {hide: !0}).hide && this.hide(), g = 1
                    } else this.selectPage(this._.currentTabId), this._.tabBarMode = !1, this._.currentFocusIndex = -1, l(1), f = 1;
                    h(i)
                }
            }

            function h(e) {
                f ? e.data.preventDefault(1) : g && e.data.stopPropagation()
            }

            var f, g, m = CKEDITOR.dialog._.dialogDefinitions[r], p = CKEDITOR.tools.clone(E),
                T = n.config.dialog_buttonsOrder || "OS", C = n.lang.dir, O = {};
            if (("OS" == T && CKEDITOR.env.mac || "rtl" == T && "ltr" == C || "ltr" == T && "rtl" == C) && p.buttons.reverse(), m = CKEDITOR.tools.extend(m(n), p), m = CKEDITOR.tools.clone(m), m = new I(this, m), p = a(n), this._ = {
                    editor: n,
                    element: p.element,
                    name: r,
                    contentSize: {width: 0, height: 0},
                    size: {width: 0, height: 0},
                    contents: {},
                    buttons: {},
                    accessKeyMap: {},
                    tabs: {},
                    tabIdList: [],
                    currentTabId: null,
                    currentTabIndex: null,
                    pageCount: 0,
                    lastTab: null,
                    tabBarMode: !1,
                    focusList: [],
                    currentFocusIndex: 0,
                    hasFocus: !1
                }, this.parts = p.parts, CKEDITOR.tools.setTimeout(function () {
                    n.fire("ariaWidget", this.parts.contents)
                }, 0, this), p = {
                    position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed",
                    top: 0,
                    visibility: "hidden"
                }, p["rtl" == C ? "right" : "left"] = 0, this.parts.dialog.setStyles(p), CKEDITOR.event.call(this), this.definition = m = CKEDITOR.fire("dialogDefinition", {
                    name: r,
                    definition: m
                }, n).definition, !("removeDialogTabs" in n._) && n.config.removeDialogTabs) {
                for (p = n.config.removeDialogTabs.split(";"), C = 0; C < p.length; C++)if (T = p[C].split(":"), 2 == T.length) {
                    var D = T[0];
                    O[D] || (O[D] = []), O[D].push(T[1])
                }
                n._.removeDialogTabs = O
            }
            if (n._.removeDialogTabs && (O = n._.removeDialogTabs[r]))for (C = 0; C < O.length; C++)m.removeContents(O[C]);
            m.onLoad && this.on("load", m.onLoad), m.onShow && this.on("show", m.onShow), m.onHide && this.on("hide", m.onHide), m.onOk && this.on("ok", function (e) {
                n.fire("saveSnapshot"), setTimeout(function () {
                    n.fire("saveSnapshot")
                }, 0), !1 === m.onOk.call(this, e) && (e.data.hide = !1)
            }), this.state = CKEDITOR.DIALOG_STATE_IDLE, m.onCancel && this.on("cancel", function (e) {
                !1 === m.onCancel.call(this, e) && (e.data.hide = !1)
            });
            var R = this, v = function (e) {
                var t, n = R._.contents;
                for (t in n)for (var i in n[t])if (e.call(this, n[t][i]))return
            };
            this.on("ok", function (e) {
                v(function (t) {
                    if (t.validate) {
                        var n = t.validate(this), o = "string" == typeof n || !1 === n;
                        return o && (e.data.hide = !1, e.stop()), i.call(t, !o, "string" == typeof n ? n : void 0), o
                    }
                })
            }, this, null, 0), this.on("cancel", function (e) {
                v(function (t) {
                    if (t.isChanged())return n.config.dialog_noConfirmCancel || confirm(n.lang.common.confirmCancel) || (e.data.hide = !1), !0
                })
            }, this, null, 0), this.parts.close.on("click", function (e) {
                !1 !== this.fire("cancel", {hide: !0}).hide && this.hide(), e.data.preventDefault()
            }, this), this.changeFocus = l;
            var b = this._.element;
            for (n.focusManager.add(b, 1), this.on("show", function () {
                b.on("keydown", u, this), CKEDITOR.env.gecko && b.on("keypress", h, this)
            }), this.on("hide", function () {
                b.removeListener("keydown", u), CKEDITOR.env.gecko && b.removeListener("keypress", h), v(function (e) {
                    o.apply(e)
                })
            }), this.on("iframeAdded", function (e) {
                new CKEDITOR.dom.document(e.data.iframe.$.contentWindow.document).on("keydown", u, this, null, 0)
            }), this.on("show", function () {
                s();
                var e = 1 < R._.pageCount;
                n.config.dialog_startupFocusTab && e ? (R._.tabBarMode = !0, R._.tabs[R._.currentTabId][0].focus(), R._.currentFocusIndex = -1) : this._.hasFocus || (this._.currentFocusIndex = e ? -1 : this._.focusList.length - 1, m.onFocus ? (e = m.onFocus.call(this)) && e.focus() : l(1))
            }, this, null, 4294967295), CKEDITOR.env.ie6Compat && this.on("load", function () {
                var e = this.getElement(), t = e.getFirst();
                t.remove(), t.appendTo(e)
            }, this), c(this), d(this), new CKEDITOR.dom.text(m.title, CKEDITOR.document).appendTo(this.parts.title), C = 0; C < m.contents.length; C++)(O = m.contents[C]) && this.addPage(O);
            for (this.parts.tabs.on("click", function (e) {
                var t = e.data.getTarget();
                t.hasClass("cke_dialog_tab") && (t = t.$.id, this.selectPage(t.substring(4, t.lastIndexOf("_"))), this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, l(1)), e.data.preventDefault())
            }, this), C = [], O = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, {
                type: "hbox",
                className: "cke_dialog_footer_buttons",
                widths: [],
                children: m.buttons
            }, C).getChild(), this.parts.footer.setHtml(C.join("")), C = 0; C < O.length; C++)this._.buttons[O[C].id] = O[C]
        }, CKEDITOR.dialog.prototype = {
            destroy: function () {
                this.hide(), this._.element.remove()
            }, resize: function () {
                return function (e, t) {
                    this._.contentSize && this._.contentSize.width == e && this._.contentSize.height == t || (CKEDITOR.dialog.fire("resize", {
                        dialog: this,
                        width: e,
                        height: t
                    }, this._.editor), this.fire("resize", {
                        width: e,
                        height: t
                    }, this._.editor), this.parts.contents.setStyles({
                        width: e + "px",
                        height: t + "px"
                    }), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)), this._.contentSize = {
                        width: e,
                        height: t
                    })
                }
            }(), getSize: function () {
                var e = this._.element.getFirst();
                return {width: e.$.offsetWidth || 0, height: e.$.offsetHeight || 0}
            },
            move: function (e, t, n) {
                var i = this._.element.getFirst(), o = "rtl" == this._.editor.lang.dir,
                    a = "fixed" == i.getComputedStyle("position");
                CKEDITOR.env.ie && i.setStyle("zoom", "100%"), a && this._.position && this._.position.x == e && this._.position.y == t || (this._.position = {
                    x: e,
                    y: t
                }, a || (a = CKEDITOR.document.getWindow().getScrollPosition(), e += a.x, t += a.y), o && (a = this.getSize(), e = CKEDITOR.document.getWindow().getViewPaneSize().width - a.width - e), t = {top: (0 < t ? t : 0) + "px"}, t[o ? "right" : "left"] = (0 < e ? e : 0) + "px", i.setStyles(t), n && (this._.moved = 1))
            }, getPosition: function () {
                return CKEDITOR.tools.extend({}, this._.position)
            }, show: function () {
                var e = this._.element, t = this.definition;
                e.getParent() && e.getParent().equals(CKEDITOR.document.getBody()) ? e.setStyle("display", "block") : e.appendTo(CKEDITOR.document.getBody()), this.resize(this._.contentSize && this._.contentSize.width || t.width || t.minWidth, this._.contentSize && this._.contentSize.height || t.height || t.minHeight), this.reset(), null === this._.currentTabId && this.selectPage(this.definition.contents[0].id), null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex), this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10), null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, h(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2), CKEDITOR.dialog._.currentTop = this), e.on("keydown", b), e.on("keyup", y), this._.hasFocus = !1;
                for (var n in t.contents)if (t.contents[n]) {
                    var e = t.contents[n], i = this._.tabs[e.id], o = e.requiredContent, a = 0;
                    if (i) {
                        for (var r in this._.contents[e.id]) {
                            var l = this._.contents[e.id][r];
                            "hbox" != l.type && "vbox" != l.type && l.getInputElement() && (l.requiredContent && !this._.editor.activeFilter.check(l.requiredContent) ? l.disable() : (l.enable(), a++))
                        }
                        !a || o && !this._.editor.activeFilter.check(o) ? i[0].addClass("cke_dialog_tab_disabled") : i[0].removeClass("cke_dialog_tab_disabled")
                    }
                }
                CKEDITOR.tools.setTimeout(function () {
                    this.layout(), s(this), this.parts.dialog.setStyle("visibility", ""), this.fireOnce("load", {}), CKEDITOR.ui.fire("ready", this), this.fire("show", {}), this._.editor.fire("dialogShow", this), this._.parentDialog || this._.editor.focusManager.lock(), this.foreach(function (e) {
                        e.setInitValue && e.setInitValue()
                    })
                }, 100, this)
            }, layout: function () {
                var e = this.parts.dialog, t = this.getSize(), n = CKEDITOR.document.getWindow().getViewPaneSize(),
                    i = (n.width - t.width) / 2, o = (n.height - t.height) / 2;
                CKEDITOR.env.ie6Compat || (t.height + (0 < o ? o : 0) > n.height || t.width + (0 < i ? i : 0) > n.width ? e.setStyle("position", "absolute") : e.setStyle("position", "fixed")), this.move(this._.moved ? this._.position.x : i, this._.moved ? this._.position.y : o)
            }, foreach: function (e) {
                for (var t in this._.contents)for (var n in this._.contents[t])e.call(this, this._.contents[t][n]);
                return this
            }, reset: function () {
                var e = function (e) {
                    e.reset && e.reset(1)
                };
                return function () {
                    return this.foreach(e), this
                }
            }(), setupContent: function () {
                var e = arguments;
                this.foreach(function (t) {
                    t.setup && t.setup.apply(t, e)
                })
            }, commitContent: function () {
                var e = arguments;
                this.foreach(function (t) {
                    CKEDITOR.env.ie && this._.currentFocusIndex == t.focusIndex && t.getInputElement().$.blur(), t.commit && t.commit.apply(t, e)
                })
            }, hide: function () {
                if (this.parts.dialog.isVisible()) {
                    this.fire("hide", {}), this._.editor.fire("dialogHide", this), this.selectPage(this._.tabIdList[0]);
                    var e = this._.element;
                    for (e.setStyle("display", "none"), this.parts.dialog.setStyle("visibility", "hidden"), _(this); CKEDITOR.dialog._.currentTop != this;)CKEDITOR.dialog._.currentTop.hide();
                    if (this._.parentDialog) {
                        var t = this._.parentDialog.getElement().getFirst();
                        t.setStyle("z-index", parseInt(t.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2))
                    } else f(this._.editor);
                    if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -= 10; else {
                        CKEDITOR.dialog._.currentZIndex = null, e.removeListener("keydown", b), e.removeListener("keyup", y);
                        var n = this._.editor;
                        n.focus(), setTimeout(function () {
                            n.focusManager.unlock(), CKEDITOR.env.iOS && n.window.focus()
                        }, 0)
                    }
                    delete this._.parentDialog, this.foreach(function (e) {
                        e.resetInitValue && e.resetInitValue()
                    }), this.setState(CKEDITOR.DIALOG_STATE_IDLE)
                }
            }, addPage: function (e) {
                if (!e.requiredContent || this._.editor.filter.check(e.requiredContent)) {
                    for (var t = [], n = e.label ? ' title="' + CKEDITOR.tools.htmlEncode(e.label) + '"' : "", i = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
                        type: "vbox",
                        className: "cke_dialog_page_contents",
                        children: e.elements,
                        expand: !!e.expand,
                        padding: e.padding,
                        style: e.style || "width: 100%;"
                    }, t), o = this._.contents[e.id] = {}, a = i.getChild(), r = 0; i = a.shift();)i.notAllowed || "hbox" == i.type || "vbox" == i.type || r++, o[i.id] = i, "function" == typeof i.getChild && a.push.apply(a, i.getChild());
                    r || (e.hidden = !0), t = CKEDITOR.dom.element.createFromHtml(t.join("")), t.setAttribute("role", "tabpanel"), i = CKEDITOR.env, o = "cke_" + e.id + "_" + CKEDITOR.tools.getNextNumber(), n = CKEDITOR.dom.element.createFromHtml(['<a class="cke_dialog_tab"', 0 < this._.pageCount ? " cke_last" : "cke_first", n, e.hidden ? ' style="display:none"' : "", ' id="', o, '"', i.gecko && !i.hc ? "" : ' href="javascript:void(0)"', ' tabIndex="-1" hidefocus="true" role="tab">', e.label, "</a>"].join("")), t.setAttribute("aria-labelledby", o), this._.tabs[e.id] = [n, t], this._.tabIdList.push(e.id), !e.hidden && this._.pageCount++, this._.lastTab = n, this.updateStyle(), t.setAttribute("name", e.id), t.appendTo(this.parts.contents), n.unselectable(), this.parts.tabs.append(n), e.accessKey && (K(this, this, "CTRL+" + e.accessKey, w, k), this._.accessKeyMap["CTRL+" + e.accessKey] = e.id)
                }
            }, selectPage: function (e) {
                if (this._.currentTabId != e && !this._.tabs[e][0].hasClass("cke_dialog_tab_disabled") && !1 !== this.fire("selectPage", {
                        page: e,
                        currentPage: this._.currentTabId
                    })) {
                    for (var t in this._.tabs) {
                        var i = this._.tabs[t][0], o = this._.tabs[t][1];
                        t != e && (i.removeClass("cke_dialog_tab_selected"), o.hide()), o.setAttribute("aria-hidden", t != e)
                    }
                    var a = this._.tabs[e];
                    a[0].addClass("cke_dialog_tab_selected"), CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (n(a[1]), a[1].show(), setTimeout(function () {
                        n(a[1], 1)
                    }, 0)) : a[1].show(), this._.currentTabId = e, this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, e)
                }
            }, updateStyle: function () {
                this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page")
            }, hidePage: function (t) {
                var n = this._.tabs[t] && this._.tabs[t][0];
                n && 1 != this._.pageCount && n.isVisible() && (t == this._.currentTabId && this.selectPage(e.call(this)), n.hide(), this._.pageCount--, this.updateStyle())
            }, showPage: function (e) {
                (e = this._.tabs[e] && this._.tabs[e][0]) && (e.show(), this._.pageCount++, this.updateStyle())
            }, getElement: function () {
                return this._.element
            }, getName: function () {
                return this._.name
            }, getContentElement: function (e, t) {
                var n = this._.contents[e];
                return n && n[t]
            }, getValueOf: function (e, t) {
                return this.getContentElement(e, t).getValue()
            }, setValueOf: function (e, t, n) {
                return this.getContentElement(e, t).setValue(n)
            }, getButton: function (e) {
                return this._.buttons[e]
            }, click: function (e) {
                return this._.buttons[e].click()
            }, disableButton: function (e) {
                return this._.buttons[e].disable()
            }, enableButton: function (e) {
                return this._.buttons[e].enable()
            }, getPageCount: function () {
                return this._.pageCount
            }, getParentEditor: function () {
                return this._.editor
            }, getSelectedElement: function () {
                return this.getParentEditor().getSelection().getSelectedElement()
            }, addFocusable: function (e, t) {
                if (void 0 === t) t = this._.focusList.length, this._.focusList.push(new r(this, e, t)); else {
                    this._.focusList.splice(t, 0, new r(this, e, t));
                    for (var n = t + 1; n < this._.focusList.length; n++)this._.focusList[n].focusIndex++
                }
            }, setState: function (e) {
                if (this.state != e) {
                    if (this.state = e, e == CKEDITOR.DIALOG_STATE_BUSY) {
                        if (!this.parts.spinner) {
                            var t = this.getParentEditor().lang.dir, n = {
                                attributes: {class: "cke_dialog_spinner"},
                                styles: {float: "rtl" == t ? "right" : "left"}
                            };
                            n.styles["margin-" + ("rtl" == t ? "left" : "right")] = "8px", this.parts.spinner = CKEDITOR.document.createElement("div", n), this.parts.spinner.setHtml("&#8987;"), this.parts.spinner.appendTo(this.parts.title, 1)
                        }
                        this.parts.spinner.show(), this.getButton("ok").disable()
                    } else e == CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton("ok").enable());
                    this.fire("state", e)
                }
            }
        }, CKEDITOR.tools.extend(CKEDITOR.dialog, {
            add: function (e, t) {
                this._.dialogDefinitions[e] && "function" != typeof t || (this._.dialogDefinitions[e] = t)
            }, exists: function (e) {
                return !!this._.dialogDefinitions[e]
            }, getCurrent: function () {
                return CKEDITOR.dialog._.currentTop
            }, isTabEnabled: function (e, t, n) {
                return !((e = e.config.removeDialogTabs) && e.match(new RegExp("(?:^|;)" + t + ":" + n + "(?:$|;)", "i")))
            }, okButton: function () {
                var e = function (e, t) {
                    return t = t || {}, CKEDITOR.tools.extend({
                        id: "ok",
                        type: "button",
                        label: e.lang.common.ok,
                        class: "cke_dialog_ui_button_ok",
                        onClick: function (e) {
                            e = e.data.dialog, !1 !== e.fire("ok", {hide: !0}).hide && e.hide()
                        }
                    }, t, !0)
                };
                return e.type = "button", e.override = function (t) {
                    return CKEDITOR.tools.extend(function (n) {
                        return e(n, t)
                    }, {type: "button"}, !0)
                }, e
            }(), cancelButton: function () {
                var e = function (e, t) {
                    return t = t || {}, CKEDITOR.tools.extend({
                        id: "cancel",
                        type: "button",
                        label: e.lang.common.cancel,
                        class: "cke_dialog_ui_button_cancel",
                        onClick: function (e) {
                            e = e.data.dialog, !1 !== e.fire("cancel", {hide: !0}).hide && e.hide()
                        }
                    }, t, !0)
                };
                return e.type = "button", e.override = function (t) {
                    return CKEDITOR.tools.extend(function (n) {
                        return e(n, t)
                    }, {type: "button"}, !0)
                }, e
            }(), addUIElement: function (e, t) {
                this._.uiElementBuilders[e] = t
            }
        }), CKEDITOR.dialog._ = {
            uiElementBuilders: {},
            dialogDefinitions: {},
            currentTop: null,
            currentZIndex: null
        }, CKEDITOR.event.implementOn(CKEDITOR.dialog), CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
        var E = {
            resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
            minWidth: 600,
            minHeight: 400,
            buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton]
        }, p = function (e, t, n) {
            for (var i, o = 0; i = e[o]; o++)if (i.id == t || n && i[n] && (i = p(i[n], t, n)))return i;
            return null
        }, T = function (e, t, n, i, o) {
            if (n) {
                for (var a, r = 0; a = e[r]; r++) {
                    if (a.id == n)return e.splice(r, 0, t), t;
                    if (i && a[i] && (a = T(a[i], t, n, i, !0)))return a
                }
                if (o)return null
            }
            return e.push(t), t
        }, C = function (e, t, n) {
            for (var i, o = 0; i = e[o]; o++) {
                if (i.id == t)return e.splice(o, 1);
                if (n && i[n] && (i = C(i[n], t, n)))return i
            }
            return null
        }, I = function (e, t) {
            this.dialog = e;
            for (var n, i = t.contents, o = 0; n = i[o]; o++)i[o] = n && new l(e, n);
            CKEDITOR.tools.extend(this, t)
        };
        I.prototype = {
            getContents: function (e) {
                return p(this.contents, e)
            }, getButton: function (e) {
                return p(this.buttons, e)
            }, addContents: function (e, t) {
                return T(this.contents, e, t)
            }, addButton: function (e, t) {
                return T(this.buttons, e, t)
            }, removeContents: function (e) {
                C(this.contents, e)
            }, removeButton: function (e) {
                C(this.buttons, e)
            }
        }, l.prototype = {
            get: function (e) {
                return p(this.elements, e, "children")
            }, add: function (e, t) {
                return T(this.elements, e, t, "children")
            }, remove: function (e) {
                C(this.elements, e, "children")
            }
        };
        var O, D, R = {}, v = {}, b = function (e) {
            var t = e.data.$.ctrlKey || e.data.$.metaKey, n = e.data.$.altKey, i = e.data.$.shiftKey,
                o = String.fromCharCode(e.data.$.keyCode);
            (t = v[(t ? "CTRL+" : "") + (n ? "ALT+" : "") + (i ? "SHIFT+" : "") + o]) && t.length && (t = t[t.length - 1], t.keydown && t.keydown.call(t.uiElement, t.dialog, t.key), e.data.preventDefault())
        }, y = function (e) {
            var t = e.data.$.ctrlKey || e.data.$.metaKey, n = e.data.$.altKey, i = e.data.$.shiftKey,
                o = String.fromCharCode(e.data.$.keyCode);
            (t = v[(t ? "CTRL+" : "") + (n ? "ALT+" : "") + (i ? "SHIFT+" : "") + o]) && t.length && (t = t[t.length - 1], t.keyup && (t.keyup.call(t.uiElement, t.dialog, t.key), e.data.preventDefault()))
        }, K = function (e, t, n, i, o) {
            (v[n] || (v[n] = [])).push({
                uiElement: e,
                dialog: t,
                key: n,
                keyup: o || e.accessKeyUp,
                keydown: i || e.accessKeyDown
            })
        }, _ = function (e) {
            for (var t in v) {
                for (var n = v[t], i = n.length - 1; 0 <= i; i--)n[i].dialog != e && n[i].uiElement != e || n.splice(i, 1);
                0 === n.length && delete v[t]
            }
        }, k = function (e, t) {
            e._.accessKeyMap[t] && e.selectPage(e._.accessKeyMap[t])
        }, w = function () {
        };
        !function () {
            CKEDITOR.ui.dialog = {
                uiElement: function (e, t, n, i, o, a, r) {
                    if (!(4 > arguments.length)) {
                        var s = (i.call ? i(t) : i) || "div", l = ["<", s, " "], c = (o && o.call ? o(t) : o) || {},
                            d = (a && a.call ? a(t) : a) || {}, u = (r && r.call ? r.call(this, e, t) : r) || "",
                            h = this.domId = d.id || CKEDITOR.tools.getNextId() + "_uiElement";
                        t.requiredContent && !e.getParentEditor().filter.check(t.requiredContent) && (c.display = "none", this.notAllowed = !0), d.id = h;
                        var f = {};
                        t.type && (f["cke_dialog_ui_" + t.type] = 1), t.className && (f[t.className] = 1), t.disabled && (f.cke_disabled = 1);
                        for (var g = d.class && d.class.split ? d.class.split(" ") : [], h = 0; h < g.length; h++)g[h] && (f[g[h]] = 1);
                        g = [];
                        for (h in f)g.push(h);
                        d.class = g.join(" "), t.title && (d.title = t.title), f = (t.style || "").split(";"), t.align && (g = t.align, c["margin-left"] = "left" == g ? 0 : "auto", c["margin-right"] = "right" == g ? 0 : "auto");
                        for (h in c)f.push(h + ":" + c[h]);
                        for (t.hidden && f.push("display:none"), h = f.length - 1; 0 <= h; h--)"" === f[h] && f.splice(h, 1);
                        0 < f.length && (d.style = (d.style ? d.style + "; " : "") + f.join("; "));
                        for (h in d)l.push(h + '="' + CKEDITOR.tools.htmlEncode(d[h]) + '" ');
                        l.push(">", u, "</", s, ">"), n.push(l.join("")), (this._ || (this._ = {})).dialog = e, "boolean" == typeof t.isChanged && (this.isChanged = function () {
                            return t.isChanged
                        }), "function" == typeof t.isChanged && (this.isChanged = t.isChanged), "function" == typeof t.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function (e) {
                            return function (n) {
                                e.call(this, t.setValue.call(this, n))
                            }
                        })), "function" == typeof t.getValue && (this.getValue = CKEDITOR.tools.override(this.getValue, function (e) {
                            return function () {
                                return t.getValue.call(this, e.call(this))
                            }
                        })), CKEDITOR.event.implementOn(this), this.registerEvents(t), this.accessKeyUp && this.accessKeyDown && t.accessKey && K(this, e, "CTRL+" + t.accessKey);
                        var m = this;
                        e.on("load", function () {
                            var t = m.getInputElement();
                            if (t) {
                                var n = m.type in {
                                    checkbox: 1,
                                    ratio: 1
                                } && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? "cke_dialog_ui_focused" : "";
                                t.on("focus", function () {
                                    e._.tabBarMode = !1, e._.hasFocus = !0, m.fire("focus"), n && this.addClass(n)
                                }), t.on("blur", function () {
                                    m.fire("blur"), n && this.removeClass(n)
                                })
                            }
                        }), CKEDITOR.tools.extend(this, t), this.keyboardFocusable && (this.tabIndex = t.tabIndex || 0, this.focusIndex = e._.focusList.push(this) - 1, this.on("focus", function () {
                            e._.currentFocusIndex = m.focusIndex
                        }))
                    }
                }, hbox: function (e, t, n, i, o) {
                    if (!(4 > arguments.length)) {
                        this._ || (this._ = {});
                        var a, r = this._.children = t, s = o && o.widths || null, l = o && o.height || null,
                            c = {role: "presentation"};
                        o && o.align && (c.align = o.align), CKEDITOR.ui.dialog.uiElement.call(this, e, o || {type: "hbox"}, i, "table", {}, c, function () {
                            var e = ['<tbody><tr class="cke_dialog_ui_hbox">'];
                            for (a = 0; a < n.length; a++) {
                                var t = "cke_dialog_ui_hbox_child", i = [];
                                0 === a && (t = "cke_dialog_ui_hbox_first"), a == n.length - 1 && (t = "cke_dialog_ui_hbox_last"), e.push('<td class="', t, '" role="presentation" '), s ? s[a] && i.push("width:" + g(s[a])) : i.push("width:" + Math.floor(100 / n.length) + "%"), l && i.push("height:" + g(l)), o && void 0 !== o.padding && i.push("padding:" + g(o.padding)), CKEDITOR.env.ie && CKEDITOR.env.quirks && r[a].align && i.push("text-align:" + r[a].align), 0 < i.length && e.push('style="' + i.join("; ") + '" '), e.push(">", n[a], "</td>")
                            }
                            return e.push("</tr></tbody>"), e.join("")
                        })
                    }
                }, vbox: function (e, t, n, i, o) {
                    if (!(3 > arguments.length)) {
                        this._ || (this._ = {});
                        var a = this._.children = t, r = o && o.width || null, s = o && o.heights || null;
                        CKEDITOR.ui.dialog.uiElement.call(this, e, o || {type: "vbox"}, i, "div", null, {role: "presentation"}, function () {
                            var t = ['<table role="presentation" cellspacing="0" border="0" '];
                            t.push('style="'), o && o.expand && t.push("height:100%;"), t.push("width:" + g(r || "100%"), ";"), CKEDITOR.env.webkit && t.push("float:none;"), t.push('"'), t.push('align="', CKEDITOR.tools.htmlEncode(o && o.align || ("ltr" == e.getParentEditor().lang.dir ? "left" : "right")), '" '), t.push("><tbody>");
                            for (var i = 0; i < n.length; i++) {
                                var l = [];
                                t.push('<tr><td role="presentation" '), r && l.push("width:" + g(r || "100%")), s ? l.push("height:" + g(s[i])) : o && o.expand && l.push("height:" + Math.floor(100 / n.length) + "%"), o && void 0 !== o.padding && l.push("padding:" + g(o.padding)), CKEDITOR.env.ie && CKEDITOR.env.quirks && a[i].align && l.push("text-align:" + a[i].align), 0 < l.length && t.push('style="', l.join("; "), '" '), t.push(' class="cke_dialog_ui_vbox_child">', n[i], "</td></tr>")
                            }
                            return t.push("</tbody></table>"), t.join("")
                        })
                    }
                }
            }
        }(), CKEDITOR.ui.dialog.uiElement.prototype = {
            getElement: function () {
                return CKEDITOR.document.getById(this.domId)
            }, getInputElement: function () {
                return this.getElement()
            }, getDialog: function () {
                return this._.dialog
            }, setValue: function (e, t) {
                return this.getInputElement().setValue(e), !t && this.fire("change", {value: e}), this
            }, getValue: function () {
                return this.getInputElement().getValue()
            }, isChanged: function () {
                return !1
            }, selectParentTab: function () {
                for (var e = this.getInputElement(); (e = e.getParent()) && -1 == e.$.className.search("cke_dialog_page_contents"););
                return e ? (e = e.getAttribute("name"), this._.dialog._.currentTabId != e && this._.dialog.selectPage(e), this) : this
            }, focus: function () {
                return this.selectParentTab().getInputElement().focus(), this
            }, registerEvents: function (e) {
                var t, n, i = /^on([A-Z]\w+)/;
                for (n in e)(t = n.match(i)) && (this.eventProcessors[n] ? this.eventProcessors[n].call(this, this._.dialog, e[n]) : function (e, t, n, i) {
                    t.on("load", function () {
                        e.getInputElement().on(n, i, e)
                    })
                }(this, this._.dialog, t[1].toLowerCase(), e[n]));
                return this
            }, eventProcessors: {
                onLoad: function (e, t) {
                    e.on("load", t, this)
                }, onShow: function (e, t) {
                    e.on("show", t, this)
                }, onHide: function (e, t) {
                    e.on("hide", t, this)
                }
            }, accessKeyDown: function () {
                this.focus()
            }, accessKeyUp: function () {
            }, disable: function () {
                var e = this.getElement();
                this.getInputElement().setAttribute("disabled", "true"), e.addClass("cke_disabled")
            }, enable: function () {
                var e = this.getElement();
                this.getInputElement().removeAttribute("disabled"), e.removeClass("cke_disabled")
            }, isEnabled: function () {
                return !this.getElement().hasClass("cke_disabled")
            }, isVisible: function () {
                return this.getInputElement().isVisible()
            }, isFocusable: function () {
                return !(!this.isEnabled() || !this.isVisible())
            }
        }, CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
            getChild: function (e) {
                return 1 > arguments.length ? this._.children.concat() : (e.splice || (e = [e]), 2 > e.length ? this._.children[e[0]] : this._.children[e[0]] && this._.children[e[0]].getChild ? this._.children[e[0]].getChild(e.slice(1, e.length)) : null)
            }
        }, !0), CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox, function () {
            var e = {
                build: function (e, t, n) {
                    for (var i, o = t.children, a = [], r = [], s = 0; s < o.length && (i = o[s]); s++) {
                        var l = [];
                        a.push(l), r.push(CKEDITOR.dialog._.uiElementBuilders[i.type].build(e, i, l))
                    }
                    return new CKEDITOR.ui.dialog[t.type](e, r, a, n, t)
                }
            };
            CKEDITOR.dialog.addUIElement("hbox", e), CKEDITOR.dialog.addUIElement("vbox", e)
        }(), CKEDITOR.dialogCommand = function (e, t) {
            this.dialogName = e, CKEDITOR.tools.extend(this, t, !0)
        }, CKEDITOR.dialogCommand.prototype = {
            exec: function (e) {
                var t = this.tabId;
                e.openDialog(this.dialogName, function (e) {
                    t && e.selectPage(t)
                })
            }, canUndo: !1, editorFocus: 1
        }, function () {
            var e = /^([a]|[^a])+$/, t = /^\d*$/, n = /^\d*(?:\.\d+)?$/, i = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,
                o = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i, a = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
            CKEDITOR.VALIDATE_OR = 1, CKEDITOR.VALIDATE_AND = 2, CKEDITOR.dialog.validate = {
                functions: function () {
                    var e = arguments;
                    return function () {
                        var t, n, i = this && this.getValue ? this.getValue() : e[0], o = CKEDITOR.VALIDATE_AND, a = [];
                        for (n = 0; n < e.length && "function" == typeof e[n]; n++)a.push(e[n]);
                        n < e.length && "string" == typeof e[n] && (t = e[n], n++), n < e.length && "number" == typeof e[n] && (o = e[n]);
                        var r = o == CKEDITOR.VALIDATE_AND;
                        for (n = 0; n < a.length; n++)r = o == CKEDITOR.VALIDATE_AND ? r && a[n](i) : r || a[n](i);
                        return !!r || t
                    }
                }, regex: function (e, t) {
                    return function (n) {
                        return n = this && this.getValue ? this.getValue() : n, !!e.test(n) || t
                    }
                }, notEmpty: function (t) {
                    return this.regex(e, t)
                }, integer: function (e) {
                    return this.regex(t, e)
                }, number: function (e) {
                    return this.regex(n, e)
                }, cssLength: function (e) {
                    return this.functions(function (e) {
                        return o.test(CKEDITOR.tools.trim(e))
                    }, e)
                }, htmlLength: function (e) {
                    return this.functions(function (e) {
                        return i.test(CKEDITOR.tools.trim(e))
                    }, e)
                }, inlineStyle: function (e) {
                    return this.functions(function (e) {
                        return a.test(CKEDITOR.tools.trim(e))
                    }, e)
                }, equals: function (e, t) {
                    return this.functions(function (t) {
                        return t == e
                    }, t)
                }, notEqual: function (e, t) {
                    return this.functions(function (t) {
                        return t != e
                    }, t)
                }
            }, CKEDITOR.on("instanceDestroyed", function (e) {
                if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
                    for (var t; t = CKEDITOR.dialog._.currentTop;)t.hide();
                    for (var n in R)R[n].remove();
                    R = {}
                }
                e = e.editor._.storedDialogs;
                for (var i in e)e[i].destroy()
            })
        }(), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            openDialog: function (e, t) {
                var n = null, i = CKEDITOR.dialog._.dialogDefinitions[e];
                if (null === CKEDITOR.dialog._.currentTop && h(this), "function" == typeof i) n = this._.storedDialogs || (this._.storedDialogs = {}), n = n[e] || (n[e] = new CKEDITOR.dialog(this, e)), t && t.call(n, n), n.show(); else {
                    if ("failed" == i)throw f(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + e + '" failed when loading definition.');
                    "string" == typeof i && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(i), function () {
                        "function" != typeof CKEDITOR.dialog._.dialogDefinitions[e] && (CKEDITOR.dialog._.dialogDefinitions[e] = "failed"), this.openDialog(e, t)
                    }, this, 0, 1)
                }
                return CKEDITOR.skin.loadPart("dialog"), n
            }
        })
    }(),CKEDITOR.plugins.add("dialog", {
        requires: "dialogui", init: function (e) {
            e.on("doubleclick", function (t) {
                t.data.dialog && e.openDialog(t.data.dialog)
            }, null, null, 999)
        }
    }),function () {
        CKEDITOR.plugins.add("a11yhelp", {
            requires: "dialog",
            availableLangs: {
                af: 1,
                ar: 1,
                az: 1,
                bg: 1,
                ca: 1,
                cs: 1,
                cy: 1,
                da: 1,
                de: 1,
                "de-ch": 1,
                el: 1,
                en: 1,
                "en-au": 1,
                "en-gb": 1,
                eo: 1,
                es: 1,
                "es-mx": 1,
                et: 1,
                eu: 1,
                fa: 1,
                fi: 1,
                fo: 1,
                fr: 1,
                "fr-ca": 1,
                gl: 1,
                gu: 1,
                he: 1,
                hi: 1,
                hr: 1,
                hu: 1,
                id: 1,
                it: 1,
                ja: 1,
                km: 1,
                ko: 1,
                ku: 1,
                lt: 1,
                lv: 1,
                mk: 1,
                mn: 1,
                nb: 1,
                nl: 1,
                no: 1,
                oc: 1,
                pl: 1,
                pt: 1,
                "pt-br": 1,
                ro: 1,
                ru: 1,
                si: 1,
                sk: 1,
                sl: 1,
                sq: 1,
                sr: 1,
                "sr-latn": 1,
                sv: 1,
                th: 1,
                tr: 1,
                tt: 1,
                ug: 1,
                uk: 1,
                vi: 1,
                zh: 1,
                "zh-cn": 1
            },
            init: function (e) {
                var t = this;
                e.addCommand("a11yHelp", {
                    exec: function () {
                        var n = e.langCode,
                            n = t.availableLangs[n] ? n : t.availableLangs[n.replace(/-.*/, "")] ? n.replace(/-.*/, "") : "en";
                        CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(t.path + "dialogs/lang/" + n + ".js"), function () {
                            e.lang.a11yhelp = t.langEntries[n], e.openDialog("a11yHelp")
                        })
                    }, modes: {wysiwyg: 1, source: 1}, readOnly: 1, canUndo: !1
                }), e.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp"), CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js"), e.on("ariaEditorHelpLabel", function (t) {
                    t.data.label = e.lang.common.editorHelp
                })
            }
        })
    }(),CKEDITOR.plugins.add("about", {
        requires: "dialog", init: function (e) {
            var t = e.addCommand("about", new CKEDITOR.dialogCommand("about"));
            t.modes = {
                wysiwyg: 1,
                source: 1
            }, t.canUndo = !1, t.readOnly = 1, e.ui.addButton && e.ui.addButton("About", {
                label: e.lang.about.dlgTitle,
                command: "about",
                toolbar: "about"
            }), CKEDITOR.dialog.add("about", this.path + "dialogs/about.js")
        }
    }),CKEDITOR.plugins.add("basicstyles", {
        init: function (e) {
            var t = 0, n = function (n, o, a, r) {
                if (r) {
                    r = new CKEDITOR.style(r);
                    var s = i[a];
                    s.unshift(r), e.attachStyleStateChange(r, function (t) {
                        !e.readOnly && e.getCommand(a).setState(t)
                    }), e.addCommand(a, new CKEDITOR.styleCommand(r, {contentForms: s})), e.ui.addButton && e.ui.addButton(n, {
                        label: o,
                        command: a,
                        toolbar: "basicstyles," + (t += 10)
                    })
                }
            }, i = {
                bold: ["strong", "b", ["span", function (e) {
                    return "bold" == (e = e.styles["font-weight"]) || 700 <= +e
                }]], italic: ["em", "i", ["span", function (e) {
                    return "italic" == e.styles["font-style"]
                }]], underline: ["u", ["span", function (e) {
                    return "underline" == e.styles["text-decoration"]
                }]], strike: ["s", "strike", ["span", function (e) {
                    return "line-through" == e.styles["text-decoration"]
                }]], subscript: ["sub"], superscript: ["sup"]
            }, o = e.config, a = e.lang.basicstyles;
            n("Bold", a.bold, "bold", o.coreStyles_bold), n("Italic", a.italic, "italic", o.coreStyles_italic), n("Underline", a.underline, "underline", o.coreStyles_underline), n("Strike", a.strike, "strike", o.coreStyles_strike), n("Subscript", a.subscript, "subscript", o.coreStyles_subscript), n("Superscript", a.superscript, "superscript", o.coreStyles_superscript), e.setKeystroke([[CKEDITOR.CTRL + 66, "bold"], [CKEDITOR.CTRL + 73, "italic"], [CKEDITOR.CTRL + 85, "underline"]])
        }
    }),CKEDITOR.config.coreStyles_bold = {
        element: "strong",
        overrides: "b"
    },CKEDITOR.config.coreStyles_italic = {
        element: "em",
        overrides: "i"
    },CKEDITOR.config.coreStyles_underline = {element: "u"},CKEDITOR.config.coreStyles_strike = {
        element: "s",
        overrides: "strike"
    },CKEDITOR.config.coreStyles_subscript = {element: "sub"},CKEDITOR.config.coreStyles_superscript = {element: "sup"},function () {
        var e = {
            exec: function (e) {
                var t = e.getCommand("blockquote").state, n = e.getSelection(), i = n && n.getRanges()[0];
                if (i) {
                    var o = n.createBookmarks();
                    if (CKEDITOR.env.ie) {
                        var a, r = o[0].startNode, s = o[0].endNode;
                        if (r && "blockquote" == r.getParent().getName())for (a = r; a = a.getNext();)if (a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary()) {
                            r.move(a, !0);
                            break
                        }
                        if (s && "blockquote" == s.getParent().getName())for (a = s; a = a.getPrevious();)if (a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary()) {
                            s.move(a);
                            break
                        }
                    }
                    var l = i.createIterator();
                    if (l.enlargeBr = e.config.enterMode != CKEDITOR.ENTER_BR, t == CKEDITOR.TRISTATE_OFF) {
                        for (r = []; t = l.getNextParagraph();)r.push(t);
                        for (1 > r.length && (t = e.document.createElement(e.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), s = o.shift(), i.insertNode(t), t.append(new CKEDITOR.dom.text("\ufeff", e.document)), i.moveToBookmark(s), i.selectNodeContents(t), i.collapse(!0), s = i.createBookmark(), r.push(t), o.unshift(s)), a = r[0].getParent(), i = [], s = 0; s < r.length; s++)t = r[s], a = a.getCommonAncestor(t.getParent());
                        for (t = {table: 1, tbody: 1, tr: 1, ol: 1, ul: 1}; t[a.getName()];)a = a.getParent();
                        for (s = null; 0 < r.length;) {
                            for (t = r.shift(); !t.getParent().equals(a);)t = t.getParent();
                            t.equals(s) || i.push(t), s = t
                        }
                        for (; 0 < i.length;)if (t = i.shift(), "blockquote" == t.getName()) {
                            for (s = new CKEDITOR.dom.documentFragment(e.document); t.getFirst();)s.append(t.getFirst().remove()), r.push(s.getLast());
                            s.replace(t)
                        } else r.push(t);
                        for (i = e.document.createElement("blockquote"), i.insertBefore(r[0]); 0 < r.length;)t = r.shift(), i.append(t)
                    } else if (t == CKEDITOR.TRISTATE_ON) {
                        for (s = [], a = {}; t = l.getNextParagraph();) {
                            for (r = i = null; t.getParent();) {
                                if ("blockquote" == t.getParent().getName()) {
                                    i = t.getParent(), r = t;
                                    break
                                }
                                t = t.getParent()
                            }
                            i && r && !r.getCustomData("blockquote_moveout") && (s.push(r), CKEDITOR.dom.element.setMarker(a, r, "blockquote_moveout", !0))
                        }
                        for (CKEDITOR.dom.element.clearAllMarkers(a), t = [], r = [], a = {}; 0 < s.length;)l = s.shift(), i = l.getParent(), l.getPrevious() ? l.getNext() ? (l.breakParent(l.getParent()), r.push(l.getNext())) : l.remove().insertAfter(i) : l.remove().insertBefore(i), i.getCustomData("blockquote_processed") || (r.push(i), CKEDITOR.dom.element.setMarker(a, i, "blockquote_processed", !0)), t.push(l);
                        for (CKEDITOR.dom.element.clearAllMarkers(a), s = r.length - 1; 0 <= s; s--) {
                            i = r[s];
                            e:{
                                a = i;
                                for (var l = 0, c = a.getChildCount(), d = void 0; l < c && (d = a.getChild(l)); l++)if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) {
                                    a = !1;
                                    break e
                                }
                                a = !0
                            }
                            a && i.remove()
                        }
                        if (e.config.enterMode == CKEDITOR.ENTER_BR)for (i = !0; t.length;)if (l = t.shift(), "div" == l.getName()) {
                            for (s = new CKEDITOR.dom.documentFragment(e.document), !i || !l.getPrevious() || l.getPrevious().type == CKEDITOR.NODE_ELEMENT && l.getPrevious().isBlockBoundary() || s.append(e.document.createElement("br")), i = l.getNext() && !(l.getNext().type == CKEDITOR.NODE_ELEMENT && l.getNext().isBlockBoundary()); l.getFirst();)l.getFirst().remove().appendTo(s);
                            i && s.append(e.document.createElement("br")), s.replace(l), i = !1
                        }
                    }
                    n.selectBookmarks(o), e.focus()
                }
            }, refresh: function (e, t) {
                this.setState(e.elementPath(t.block || t.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
            }, context: "blockquote", allowedContent: "blockquote", requiredContent: "blockquote"
        };
        CKEDITOR.plugins.add("blockquote", {
            init: function (t) {
                t.blockless || (t.addCommand("blockquote", e), t.ui.addButton && t.ui.addButton("Blockquote", {
                    label: t.lang.blockquote.toolbar,
                    command: "blockquote",
                    toolbar: "blocks,10"
                }))
            }
        })
    }(),function () {
        function e(e, t) {
            CKEDITOR.tools.extend(this, t, {
                editor: e,
                id: "cke-" + CKEDITOR.tools.getUniqueId(),
                area: e._.notificationArea
            }), t.type || (this.type = "info"), this.element = this._createElement(), e.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element)
        }

        function t(e) {
            var t = this;
            this.editor = e, this.notifications = [], this.element = this._createElement(), this._uiBuffer = CKEDITOR.tools.eventsBuffer(10, this._layout, this), this._changeBuffer = CKEDITOR.tools.eventsBuffer(500, this._layout, this), e.on("destroy", function () {
                t._removeListeners(), t.element.remove()
            })
        }

        CKEDITOR.plugins.add("notification", {
            init: function (e) {
                function n(e) {
                    var t = new CKEDITOR.dom.element("div");
                    t.setStyles({position: "fixed", "margin-left": "-9999px"}), t.setAttributes({
                        "aria-live": "assertive",
                        "aria-atomic": "true"
                    }), t.setText(e), CKEDITOR.document.getBody().append(t), setTimeout(function () {
                        t.remove()
                    }, 100)
                }

                e._.notificationArea = new t(e), e.showNotification = function (t, n, i) {
                    var o, a;
                    return "progress" == n ? o = i : a = i, t = new CKEDITOR.plugins.notification(e, {
                        message: t,
                        type: n,
                        progress: o,
                        duration: a
                    }), t.show(), t
                }, e.on("key", function (t) {
                    if (27 == t.data.keyCode) {
                        var i = e._.notificationArea.notifications;
                        i.length && (n(e.lang.notification.closed), i[i.length - 1].hide(), t.cancel())
                    }
                })
            }
        }), e.prototype = {
            show: function () {
                !1 !== this.editor.fire("notificationShow", {notification: this}) && (this.area.add(this), this._hideAfterTimeout())
            }, update: function (e) {
                var t = !0;
                !1 === this.editor.fire("notificationUpdate", {notification: this, options: e}) && (t = !1);
                var n = this.element, i = n.findOne(".cke_notification_message"),
                    o = n.findOne(".cke_notification_progress"), a = e.type;
                n.removeAttribute("role"), e.progress && "progress" != this.type && (a = "progress"), a && (n.removeClass(this._getClass()), n.removeAttribute("aria-label"), this.type = a, n.addClass(this._getClass()), n.setAttribute("aria-label", this.type), "progress" != this.type || o ? "progress" != this.type && o && o.remove() : (o = this._createProgressElement(), o.insertBefore(i))), void 0 !== e.message && (this.message = e.message, i.setHtml(this.message)), void 0 !== e.progress && (this.progress = e.progress, o && o.setStyle("width", this._getPercentageProgress())), t && e.important && (n.setAttribute("role", "alert"), this.isVisible() || this.area.add(this)), this.duration = e.duration, this._hideAfterTimeout()
            }, hide: function () {
                !1 !== this.editor.fire("notificationHide", {notification: this}) && this.area.remove(this)
            }, isVisible: function () {
                return 0 <= CKEDITOR.tools.indexOf(this.area.notifications, this)
            }, _createElement: function () {
                var e, t, n = this, i = this.editor.lang.common.close;
                return e = new CKEDITOR.dom.element("div"), e.addClass("cke_notification"), e.addClass(this._getClass()), e.setAttributes({
                    id: this.id,
                    role: "alert",
                    "aria-label": this.type
                }), "progress" == this.type && e.append(this._createProgressElement()), t = new CKEDITOR.dom.element("p"), t.addClass("cke_notification_message"), t.setHtml(this.message), e.append(t), t = CKEDITOR.dom.element.createFromHtml('<a class="cke_notification_close" href="javascript:void(0)" title="' + i + '" role="button" tabindex="-1"><span class="cke_label">X</span></a>'), e.append(t), t.on("click", function () {
                    n.editor.focus(), n.hide()
                }), e
            }, _getClass: function () {
                return "progress" == this.type ? "cke_notification_info" : "cke_notification_" + this.type
            }, _createProgressElement: function () {
                var e = new CKEDITOR.dom.element("span");
                return e.addClass("cke_notification_progress"), e.setStyle("width", this._getPercentageProgress()), e
            }, _getPercentageProgress: function () {
                return Math.round(100 * (this.progress || 0)) + "%"
            }, _hideAfterTimeout: function () {
                var e, t = this;
                this._hideTimeoutId && clearTimeout(this._hideTimeoutId), "number" == typeof this.duration ? e = this.duration : "info" != this.type && "success" != this.type || (e = "number" == typeof this.editor.config.notification_duration ? this.editor.config.notification_duration : 5e3), e && (t._hideTimeoutId = setTimeout(function () {
                    t.hide()
                }, e))
            }
        }, t.prototype = {
            add: function (e) {
                this.notifications.push(e), this.element.append(e.element), 1 == this.element.getChildCount() && (CKEDITOR.document.getBody().append(this.element), this._attachListeners()), this._layout()
            }, remove: function (e) {
                var t = CKEDITOR.tools.indexOf(this.notifications, e);
                0 > t || (this.notifications.splice(t, 1), e.element.remove(), this.element.getChildCount() || (this._removeListeners(), this.element.remove()))
            }, _createElement: function () {
                var e = this.editor, t = e.config, n = new CKEDITOR.dom.element("div");
                return n.addClass("cke_notifications_area"), n.setAttribute("id", "cke_notifications_area_" + e.name), n.setStyle("z-index", t.baseFloatZIndex - 2), n
            }, _attachListeners: function () {
                var e = CKEDITOR.document.getWindow(), t = this.editor;
                e.on("scroll", this._uiBuffer.input), e.on("resize", this._uiBuffer.input), t.on("change", this._changeBuffer.input), t.on("floatingSpaceLayout", this._layout, this, null, 20),
                    t.on("blur", this._layout, this, null, 20)
            }, _removeListeners: function () {
                var e = CKEDITOR.document.getWindow(), t = this.editor;
                e.removeListener("scroll", this._uiBuffer.input), e.removeListener("resize", this._uiBuffer.input), t.removeListener("change", this._changeBuffer.input), t.removeListener("floatingSpaceLayout", this._layout), t.removeListener("blur", this._layout)
            }, _layout: function () {
                function e() {
                    o.setStyle("left", m(E + r.width - c - d))
                }

                var t, n, i, o = this.element, a = this.editor, r = a.ui.contentsElement.getClientRect(),
                    s = a.ui.contentsElement.getDocumentPosition(), l = o.getClientRect(), c = this._notificationWidth,
                    d = this._notificationMargin;
                i = CKEDITOR.document.getWindow();
                var u = i.getScrollPosition(), h = i.getViewPaneSize(), f = CKEDITOR.document.getBody(),
                    g = f.getDocumentPosition(), m = CKEDITOR.tools.cssLength;
                c && d || (i = this.element.getChild(0), c = this._notificationWidth = i.getClientRect().width, d = this._notificationMargin = parseInt(i.getComputedStyle("margin-left"), 10) + parseInt(i.getComputedStyle("margin-right"), 10)), a.toolbar && (t = a.ui.space("top"), n = t.getClientRect()), t && t.isVisible() && n.bottom > r.top && n.bottom < r.bottom - l.height ? o.setStyles({
                    position: "fixed",
                    top: m(n.bottom)
                }) : 0 < r.top ? o.setStyles({
                    position: "absolute",
                    top: m(s.y)
                }) : s.y + r.height - l.height > u.y ? o.setStyles({
                    position: "fixed",
                    top: 0
                }) : o.setStyles({position: "absolute", top: m(s.y + r.height - l.height)});
                var E = "fixed" == o.getStyle("position") ? r.left : "static" != f.getComputedStyle("position") ? s.x - g.x : s.x;
                r.width < c + d ? s.x + c + d > u.x + h.width ? e() : o.setStyle("left", m(E)) : s.x + c + d > u.x + h.width ? o.setStyle("left", m(E)) : s.x + r.width / 2 + c / 2 + d > u.x + h.width ? o.setStyle("left", m(E - s.x + u.x + h.width - c - d)) : 0 > r.left + r.width - c - d ? e() : 0 > r.left + r.width / 2 - c / 2 ? o.setStyle("left", m(E - s.x + u.x)) : o.setStyle("left", m(E + r.width / 2 - c / 2 - d / 2))
            }
        }, CKEDITOR.plugins.notification = e
    }(),function () {
        var e = '<a id="{id}" class="cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href=\"javascript:void('{titleJs}')\"") + ' title="{title}" tabindex="-1" hidefocus="true" role="button" aria-labelledby="{id}_label" aria-describedby="{id}_description" aria-haspopup="{hasArrow}" aria-disabled="{ariaDisabled}"';
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (e += ' onkeypress="return false;"'), CKEDITOR.env.gecko && (e += ' onblur="this.style.cssText = this.style.cssText;"');
        var e = e + ' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span class="cke_button_icon cke_button__{iconName}_icon" style="{style}"',
            e = e + '>&nbsp;</span><span id="{id}_label" class="cke_button_label cke_button__{name}_label" aria-hidden="false">{label}</span><span id="{id}_description" class="cke_button_label" aria-hidden="false">{ariaShortcut}</span>{arrowHtml}</a>',
            t = CKEDITOR.addTemplate("buttonArrow", '<span class="cke_button_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : "") + "</span>"),
            n = CKEDITOR.addTemplate("button", e);
        CKEDITOR.plugins.add("button", {
            beforeInit: function (e) {
                e.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler)
            }
        }), CKEDITOR.UI_BUTTON = "button", CKEDITOR.ui.button = function (e) {
            CKEDITOR.tools.extend(this, e, {
                title: e.label, click: e.click || function (t) {
                    t.execCommand(e.command)
                }
            }), this._ = {}
        }, CKEDITOR.ui.button.handler = {
            create: function (e) {
                return new CKEDITOR.ui.button(e)
            }
        }, CKEDITOR.ui.button.prototype = {
            render: function (e, i) {
                function o() {
                    var t = e.mode;
                    t && (t = this.modes[t] ? void 0 !== l[t] ? l[t] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, t = e.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : t, this.setState(t), this.refresh && this.refresh())
                }

                var a, r, s, l = null, c = CKEDITOR.env, d = this._.id = CKEDITOR.tools.getNextId(), u = "",
                    h = this.command;
                this._.editor = e;
                var f = {
                    id: d, button: this, editor: e, focus: function () {
                        CKEDITOR.document.getById(d).focus()
                    }, execute: function () {
                        this.button.click(e)
                    }, attach: function (e) {
                        this.button.attach(e)
                    }
                }, g = CKEDITOR.tools.addFunction(function (e) {
                    if (f.onkey)return e = new CKEDITOR.dom.event(e), !1 !== f.onkey(f, e.getKeystroke())
                }), m = CKEDITOR.tools.addFunction(function (e) {
                    var t;
                    return f.onfocus && (t = !1 !== f.onfocus(f, new CKEDITOR.dom.event(e))), t
                }), E = 0;
                f.clickFn = a = CKEDITOR.tools.addFunction(function () {
                    E && (e.unlockSelection(1), E = 0), f.execute(), c.iOS && e.focus()
                }), this.modes ? (l = {}, e.on("beforeModeUnload", function () {
                    e.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (l[e.mode] = this._.state)
                }, this), e.on("activeFilterChange", o, this), e.on("mode", o, this), !this.readOnly && e.on("readOnly", o, this)) : h && (h = e.getCommand(h)) && (h.on("state", function () {
                        this.setState(h.state)
                    }, this), u += h.state == CKEDITOR.TRISTATE_ON ? "on" : h.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off");
                var p;
                this.directional && e.on("contentDirChanged", function (t) {
                    var n = CKEDITOR.document.getById(this._.id), i = n.getFirst();
                    t = t.data, t != e.lang.dir ? n.addClass("cke_" + t) : n.removeClass("cke_ltr").removeClass("cke_rtl"), i.setAttribute("style", CKEDITOR.skin.getIconStyle(p, "rtl" == t, this.icon, this.iconOffset))
                }, this), h ? (r = e.getCommandKeystroke(h)) && (s = CKEDITOR.tools.keystrokeToString(e.lang.common.keyboard, r)) : u += "off", r = this.name || this.command;
                var T = null, C = this.icon;
                return p = r, this.icon && !/\./.test(this.icon) ? (p = this.icon, C = null) : (this.icon && (T = this.icon), CKEDITOR.env.hidpi && this.iconHiDpi && (T = this.iconHiDpi)), T ? (CKEDITOR.skin.addIcon(T, T), C = null) : T = p, u = {
                    id: d,
                    name: r,
                    iconName: p,
                    label: this.label,
                    cls: this.className || "",
                    state: u,
                    ariaDisabled: "disabled" == u ? "true" : "false",
                    title: this.title + (s ? " (" + s.display + ")" : ""),
                    ariaShortcut: s ? e.lang.common.keyboardShortcut + " " + s.aria : "",
                    titleJs: c.gecko && !c.hc ? "" : (this.title || "").replace("'", ""),
                    hasArrow: this.hasArrow ? "true" : "false",
                    keydownFn: g,
                    focusFn: m,
                    clickFn: a,
                    style: CKEDITOR.skin.getIconStyle(T, "rtl" == e.lang.dir, C, this.iconOffset),
                    arrowHtml: this.hasArrow ? t.output() : ""
                }, n.output(u, i), this.onRender && this.onRender(), f
            }, setState: function (e) {
                if (this._.state == e)return !1;
                this._.state = e;
                var t = CKEDITOR.document.getById(this._.id);
                return !!t && (t.setState(e, "cke_button"), e == CKEDITOR.TRISTATE_DISABLED ? t.setAttribute("aria-disabled", !0) : t.removeAttribute("aria-disabled"), this.hasArrow ? (e = e == CKEDITOR.TRISTATE_ON ? this._.editor.lang.button.selectedLabel.replace(/%1/g, this.label) : this.label, CKEDITOR.document.getById(this._.id + "_label").setText(e)) : e == CKEDITOR.TRISTATE_ON ? t.setAttribute("aria-pressed", !0) : t.removeAttribute("aria-pressed"), !0)
            }, getState: function () {
                return this._.state
            }, toFeature: function (e) {
                if (this._.feature)return this._.feature;
                var t = this;
                return this.allowedContent || this.requiredContent || !this.command || (t = e.getCommand(this.command) || t), this._.feature = t
            }
        }, CKEDITOR.ui.prototype.addButton = function (e, t) {
            this.add(e, CKEDITOR.UI_BUTTON, t)
        }
    }(),function () {
        function e(e) {
            function n() {
                var t, n, i, o = {};
                for (t in e.ui.items)n = e.ui.items[t], i = n.toolbar || "others", i = i.split(","), n = i[0], i = parseInt(i[1] || -1, 10), o[n] || (o[n] = []), o[n].push({
                    name: t,
                    order: i
                });
                for (n in o)o[n] = o[n].sort(function (e, t) {
                    return e.order == t.order ? 0 : 0 > t.order ? -1 : 0 > e.order ? 1 : e.order < t.order ? -1 : 1
                });
                return o
            }

            function i(t, n) {
                if (n.length) {
                    t.items ? t.items.push(e.ui.create("-")) : t.items = [];
                    for (var i; i = n.shift();)i = "string" == typeof i ? i : i.name, o && -1 != CKEDITOR.tools.indexOf(o, i) || (i = e.ui.create(i)) && e.addFeature(i) && t.items.push(i)
                }
            }

            var o = e.config.removeButtons, o = o && o.split(","), a = e.config.toolbar;
            return "string" == typeof a && (a = e.config["toolbar_" + a]), e.toolbar = a ? function (e) {
                var t, n, o, a = [];
                for (t = 0; t < e.length; ++t)n = e[t], o = {}, "/" == n ? a.push(n) : CKEDITOR.tools.isArray(n) ? (i(o, CKEDITOR.tools.clone(n)), a.push(o)) : n.items && (i(o, CKEDITOR.tools.clone(n.items)), o.name = n.name, a.push(o));
                return a
            }(a) : function () {
                for (var o = n(), a = CKEDITOR.tools.clone(e.config.toolbarGroups) || t(e), r = 0; r < a.length; r++) {
                    var s = a[r];
                    if ("/" != s) {
                        "string" == typeof s && (s = a[r] = {name: s});
                        var l, c = s.groups;
                        if (c)for (var d = 0; d < c.length; d++)l = c[d], (l = o[l]) && i(s, l);
                        (l = o[s.name]) && i(s, l)
                    }
                }
                return a
            }()
        }

        function t(e) {
            return e._.toolbarGroups || (e._.toolbarGroups = [{
                    name: "document",
                    groups: ["mode", "document", "doctools"]
                }, {name: "clipboard", groups: ["clipboard", "undo"]}, {
                    name: "editing",
                    groups: ["find", "selection", "spellchecker"]
                }, {name: "forms"}, "/", {name: "basicstyles", groups: ["basicstyles", "cleanup"]}, {
                    name: "paragraph",
                    groups: ["list", "indent", "blocks", "align", "bidi"]
                }, {name: "links"}, {name: "insert"}, "/", {name: "styles"}, {name: "colors"}, {name: "tools"}, {name: "others"}, {name: "about"}])
        }

        var n = function () {
            this.toolbars = [], this.focusCommandExecuted = !1
        };
        n.prototype.focus = function () {
            for (var e, t = 0; e = this.toolbars[t++];)for (var n, i = 0; n = e.items[i++];)if (n.focus)return void n.focus()
        };
        var i = {
            modes: {wysiwyg: 1, source: 1}, readOnly: 1, exec: function (e) {
                e.toolbox && (e.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function () {
                    e.toolbox.focus()
                }, 100) : e.toolbox.focus())
            }
        };
        CKEDITOR.plugins.add("toolbar", {
            requires: "button", init: function (t) {
                var o, a = function (e, n) {
                    var i, r = "rtl" == t.lang.dir, s = t.config.toolbarGroupCycling, l = r ? 37 : 39, r = r ? 39 : 37,
                        s = void 0 === s || s;
                    switch (n) {
                        case 9:
                        case CKEDITOR.SHIFT + 9:
                            for (; !i || !i.items.length;)if (i = 9 == n ? (i ? i.next : e.toolbar.next) || t.toolbox.toolbars[0] : (i ? i.previous : e.toolbar.previous) || t.toolbox.toolbars[t.toolbox.toolbars.length - 1], i.items.length)for (e = i.items[o ? i.items.length - 1 : 0]; e && !e.focus;)(e = o ? e.previous : e.next) || (i = 0);
                            return e && e.focus(), !1;
                        case l:
                            i = e;
                            do {
                                !(i = i.next) && s && (i = e.toolbar.items[0])
                            } while (i && !i.focus);
                            return i ? i.focus() : a(e, 9), !1;
                        case 40:
                            return e.button && e.button.hasArrow ? e.execute() : a(e, 40 == n ? l : r), !1;
                        case r:
                        case 38:
                            i = e;
                            do {
                                !(i = i.previous) && s && (i = e.toolbar.items[e.toolbar.items.length - 1])
                            } while (i && !i.focus);
                            return i ? i.focus() : (o = 1, a(e, CKEDITOR.SHIFT + 9), o = 0), !1;
                        case 27:
                            return t.focus(), !1;
                        case 13:
                        case 32:
                            return e.execute(), !1
                    }
                    return !0
                };
                t.on("uiSpace", function (i) {
                    if (i.data.space == t.config.toolbarLocation) {
                        i.removeListener(), t.toolbox = new n;
                        var o, r, s = CKEDITOR.tools.getNextId(),
                            l = ['<span id="', s, '" class="cke_voice_label">', t.lang.toolbar.toolbars, "</span>", '<span id="' + t.ui.spaceId("toolbox") + '" class="cke_toolbox" role="group" aria-labelledby="', s, '" onmousedown="return false;">'],
                            s = !1 !== t.config.toolbarStartupExpanded;
                        t.config.toolbarCanCollapse && t.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && l.push('<span class="cke_toolbox_main"' + (s ? ">" : ' style="display:none">'));
                        for (var c = t.toolbox.toolbars, d = e(t), u = d.length, h = 0; h < u; h++) {
                            var f, g, m, E = 0, p = d[h], T = "/" !== p && ("/" === d[h + 1] || h == u - 1);
                            if (p)if (o && (l.push("</span>"), r = o = 0), "/" === p) l.push('<span class="cke_toolbar_break"></span>'); else {
                                m = p.items || p;
                                for (var C = 0; C < m.length; C++) {
                                    var I, O = m[C];
                                    if (O) {
                                        var D = function (e) {
                                            e = e.render(t, l), R = E.items.push(e) - 1, 0 < R && (e.previous = E.items[R - 1], e.previous.next = e), e.toolbar = E, e.onkey = a, e.onfocus = function () {
                                                t.toolbox.focusCommandExecuted || t.focus()
                                            }
                                        };
                                        if (O.type == CKEDITOR.UI_SEPARATOR) r = o && O; else {
                                            if (I = !1 !== O.canGroup, !E) {
                                                f = CKEDITOR.tools.getNextId(), E = {
                                                    id: f,
                                                    items: []
                                                }, g = p.name && (t.lang.toolbar.toolbarGroups[p.name] || p.name), l.push('<span id="', f, '" class="cke_toolbar' + (T ? ' cke_toolbar_last"' : '"'), g ? ' aria-labelledby="' + f + '_label"' : "", ' role="toolbar">'), g && l.push('<span id="', f, '_label" class="cke_voice_label">', g, "</span>"), l.push('<span class="cke_toolbar_start"></span>');
                                                var R = c.push(E) - 1;
                                                0 < R && (E.previous = c[R - 1], E.previous.next = E)
                                            }
                                            I ? o || (l.push('<span class="cke_toolgroup" role="presentation">'), o = 1) : o && (l.push("</span>"), o = 0), r && (D(r), r = 0), D(O)
                                        }
                                    }
                                }
                                o && (l.push("</span>"), r = o = 0), E && l.push('<span class="cke_toolbar_end"></span></span>')
                            }
                        }
                        if (t.config.toolbarCanCollapse && l.push("</span>"), t.config.toolbarCanCollapse && t.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                            var v = CKEDITOR.tools.addFunction(function () {
                                t.execCommand("toolbarCollapse")
                            });
                            t.on("destroy", function () {
                                CKEDITOR.tools.removeFunction(v)
                            }), t.addCommand("toolbarCollapse", {
                                readOnly: 1, exec: function (e) {
                                    var t = e.ui.space("toolbar_collapser"), n = t.getPrevious(),
                                        i = e.ui.space("contents"), o = n.getParent(),
                                        a = parseInt(i.$.style.height, 10), r = o.$.offsetHeight,
                                        s = t.hasClass("cke_toolbox_collapser_min");
                                    s ? (n.show(), t.removeClass("cke_toolbox_collapser_min"), t.setAttribute("title", e.lang.toolbar.toolbarCollapse)) : (n.hide(), t.addClass("cke_toolbox_collapser_min"), t.setAttribute("title", e.lang.toolbar.toolbarExpand)), t.getFirst().setText(s ? "▲" : "◀"), i.setStyle("height", a - (o.$.offsetHeight - r) + "px"), e.fire("resize", {
                                        outerHeight: e.container.$.offsetHeight,
                                        contentsHeight: i.$.offsetHeight,
                                        outerWidth: e.container.$.offsetWidth
                                    })
                                }, modes: {wysiwyg: 1, source: 1}
                            }), t.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse"), l.push('<a title="' + (s ? t.lang.toolbar.toolbarCollapse : t.lang.toolbar.toolbarExpand) + '" id="' + t.ui.spaceId("toolbar_collapser") + '" tabIndex="-1" class="cke_toolbox_collapser'), s || l.push(" cke_toolbox_collapser_min"), l.push('" onclick="CKEDITOR.tools.callFunction(' + v + ')">', '<span class="cke_arrow">&#9650;</span>', "</a>")
                        }
                        l.push("</span>"), i.data.html += l.join("")
                    }
                }), t.on("destroy", function () {
                    if (this.toolbox) {
                        var e, t, n, i, o = 0;
                        for (e = this.toolbox.toolbars; o < e.length; o++)for (n = e[o].items, t = 0; t < n.length; t++)i = n[t], i.clickFn && CKEDITOR.tools.removeFunction(i.clickFn), i.keyDownFn && CKEDITOR.tools.removeFunction(i.keyDownFn)
                    }
                }), t.on("uiReady", function () {
                    var e = t.ui.space("toolbox");
                    e && t.focusManager.add(e, 1)
                }), t.addCommand("toolbarFocus", i), t.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus"), t.ui.add("-", CKEDITOR.UI_SEPARATOR, {}), t.ui.addHandler(CKEDITOR.UI_SEPARATOR, {
                    create: function () {
                        return {
                            render: function (e, t) {
                                return t.push('<span class="cke_toolbar_separator" role="separator"></span>'), {}
                            }
                        }
                    }
                })
            }
        }), CKEDITOR.ui.prototype.addToolbarGroup = function (e, n, i) {
            var o = t(this.editor), a = 0 === n, r = {name: e};
            if (i) {
                if (i = CKEDITOR.tools.search(o, function (e) {
                        return e.name == i
                    }))return !i.groups && (i.groups = []), n && 0 <= (n = CKEDITOR.tools.indexOf(i.groups, n)) ? void i.groups.splice(n + 1, 0, e) : void(a ? i.groups.splice(0, 0, e) : i.groups.push(e));
                n = null
            }
            n && (n = CKEDITOR.tools.indexOf(o, function (e) {
                return e.name == n
            })), a ? o.splice(0, 0, e) : "number" == typeof n ? o.splice(n + 1, 0, r) : o.push(e)
        }
    }(),CKEDITOR.UI_SEPARATOR = "separator",CKEDITOR.config.toolbarLocation = "top",function () {
        function e(e, t, n) {
            return t.type || (t.type = "auto"), !(n && !1 === e.fire("beforePaste", t) || !t.dataValue && t.dataTransfer.isEmpty()) && (t.dataValue || (t.dataValue = ""), CKEDITOR.env.gecko && "drop" == t.method && e.toolbox && e.once("afterPaste", function () {
                e.toolbox.focus()
            }), e.fire("paste", t))
        }

        function t(t) {
            function n() {
                var e = t.editable();
                if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) {
                    var n = function (e) {
                        t.getSelection().isCollapsed() || (t.readOnly && "cut" == e.name || m.initPasteDataTransfer(e, t), e.data.preventDefault())
                    };
                    e.on("copy", n), e.on("cut", n), e.on("cut", function () {
                        t.readOnly || t.extractSelectedHtml()
                    }, null, null, 999)
                }
                e.on(m.mainPasteEvent, function (e) {
                    "beforepaste" == m.mainPasteEvent && E || h(e)
                }), "beforepaste" == m.mainPasteEvent && (e.on("paste", function (e) {
                    p || (a(), e.data.preventDefault(), h(e), s("paste"))
                }), e.on("contextmenu", r, null, null, 0), e.on("beforepaste", function (e) {
                    !e.data || e.data.$.ctrlKey || e.data.$.shiftKey || r()
                }, null, null, 0)), e.on("beforecut", function () {
                    !E && l()
                });
                var i;
                e.attachListener(CKEDITOR.env.ie ? e : t.document.getDocumentElement(), "mouseup", function () {
                    i = setTimeout(function () {
                        f()
                    }, 0)
                }), t.on("destroy", function () {
                    clearTimeout(i)
                }), e.on("keyup", f)
            }

            function i(e) {
                return {
                    type: e,
                    canUndo: "cut" == e,
                    startDisabled: !0,
                    fakeKeystroke: "cut" == e ? CKEDITOR.CTRL + 88 : CKEDITOR.CTRL + 67,
                    exec: function () {
                        "cut" == this.type && l();
                        var e, n = this.type;
                        if (CKEDITOR.env.ie) e = s(n); else try {
                            e = t.document.$.execCommand(n, !1, null)
                        } catch (t) {
                            e = !1
                        }
                        return e || t.showNotification(t.lang.clipboard[this.type + "Error"]), e
                    }
                }
            }

            function o() {
                return {
                    canUndo: !1, async: !0, fakeKeystroke: CKEDITOR.CTRL + 86, exec: function (t, n) {
                        function i(n, i) {
                            i = void 0 === i || i, n ? (n.method = "paste", n.dataTransfer || (n.dataTransfer = m.initPasteDataTransfer()), e(t, n, i)) : a && !t._.forcePasteDialog && t.showNotification(l, "info", t.config.clipboard_notificationDuration), t._.forcePasteDialog = !1, t.fire("afterCommandExec", {
                                name: "paste",
                                command: o,
                                returnValue: !!n
                            })
                        }

                        n = void 0 !== n && null !== n ? n : {};
                        var o = this, a = void 0 === n.notification || n.notification, r = n.type,
                            s = CKEDITOR.tools.keystrokeToString(t.lang.common.keyboard, t.getCommandKeystroke(this)),
                            l = "string" == typeof a ? a : t.lang.clipboard.pasteNotification.replace(/%1/, '<kbd aria-label="' + s.aria + '">' + s.display + "</kbd>"),
                            s = "string" == typeof n ? n : n.dataValue;
                        r && !0 !== t.config.forcePasteAsPlainText && "allow-word" !== t.config.forcePasteAsPlainText ? t._.nextPasteType = r : delete t._.nextPasteType, "string" == typeof s ? i({dataValue: s}) : t.getClipboardData(i)
                    }
                }
            }

            function a() {
                p = 1, setTimeout(function () {
                    p = 0
                }, 100)
            }

            function r() {
                E = 1, setTimeout(function () {
                    E = 0
                }, 10)
            }

            function s(e) {
                var n = t.document, i = n.getBody(), o = !1, a = function () {
                    o = !0
                };
                return i.on(e, a), 7 < CKEDITOR.env.version ? n.$.execCommand(e) : n.$.selection.createRange().execCommand(e), i.removeListener(e, a), o
            }

            function l() {
                if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                    var e, n, i, o = t.getSelection();
                    o.getType() == CKEDITOR.SELECTION_ELEMENT && (e = o.getSelectedElement()) && (n = o.getRanges()[0], i = t.document.createText(""), i.insertBefore(e), n.setStartBefore(i), n.setEndAfter(e), o.selectRanges([n]), setTimeout(function () {
                        e.getParent() && (i.remove(), o.selectElement(e))
                    }, 0))
                }
            }

            function c(e, n) {
                var i, o = t.document, a = t.editable(), r = function (e) {
                    e.cancel()
                };
                if (!o.getById("cke_pastebin")) {
                    var s = t.getSelection(), l = s.createBookmarks();
                    CKEDITOR.env.ie && s.root.fire("selectionchange");
                    var c = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !a.is("body") || CKEDITOR.env.ie ? "div" : "body", o);
                    c.setAttributes({id: "cke_pastebin", "data-cke-temp": "1"});
                    var d = 0, o = o.getWindow();
                    CKEDITOR.env.webkit ? (a.append(c), c.addClass("cke_editable"), a.is("body") || (d = "static" != a.getComputedStyle("position") ? a : CKEDITOR.dom.element.get(a.$.offsetParent), d = d.getDocumentPosition().y)) : a.getAscendant(CKEDITOR.env.ie ? "body" : "html", 1).append(c), c.setStyles({
                        position: "absolute",
                        top: o.getScrollPosition().y - d + 10 + "px",
                        width: "1px",
                        height: Math.max(1, o.getViewPaneSize().height - 20) + "px",
                        overflow: "hidden",
                        margin: 0,
                        padding: 0
                    }), CKEDITOR.env.safari && c.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text")), (d = c.getParent().isReadOnly()) ? (c.setOpacity(0), c.setAttribute("contenteditable", !0)) : c.setStyle("ltr" == t.config.contentsLangDirection ? "left" : "right", "-10000px"), t.on("selectionChange", r, null, null, 0), (CKEDITOR.env.webkit || CKEDITOR.env.gecko) && (i = a.once("blur", r, null, null, -100)), d && c.focus(), d = new CKEDITOR.dom.range(c), d.selectNodeContents(c);
                    var u = d.select();
                    CKEDITOR.env.ie && (i = a.once("blur", function () {
                        t.lockSelection(u)
                    }));
                    var h = CKEDITOR.document.getWindow().getScrollPosition().y;
                    setTimeout(function () {
                        CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = h), i && i.removeListener(), CKEDITOR.env.ie && a.focus(), s.selectBookmarks(l), c.remove();
                        var e;
                        CKEDITOR.env.webkit && (e = c.getFirst()) && e.is && e.hasClass("Apple-style-span") && (c = e), t.removeListener("selectionChange", r), n(c.getHtml())
                    }, 0)
                }
            }

            function d() {
                if ("paste" == m.mainPasteEvent)return t.fire("beforePaste", {type: "auto", method: "paste"}), !1;
                t.focus(), a();
                var e = t.focusManager;
                return e.lock(), t.editable().fire(m.mainPasteEvent) && !s("paste") ? (e.unlock(), !1) : (e.unlock(), !0)
            }

            function u(e) {
                if ("wysiwyg" == t.mode)switch (e.data.keyCode) {
                    case CKEDITOR.CTRL + 86:
                    case CKEDITOR.SHIFT + 45:
                        e = t.editable(), a(), "paste" == m.mainPasteEvent && e.fire("beforepaste");
                        break;
                    case CKEDITOR.CTRL + 88:
                    case CKEDITOR.SHIFT + 46:
                        t.fire("saveSnapshot"), setTimeout(function () {
                            t.fire("saveSnapshot")
                        }, 50)
                }
            }

            function h(n) {
                var i = {type: "auto", method: "paste", dataTransfer: m.initPasteDataTransfer(n)};
                i.dataTransfer.cacheData();
                var o = !1 !== t.fire("beforePaste", i);
                o && m.canClipboardApiBeTrusted(i.dataTransfer, t) ? (n.data.preventDefault(), setTimeout(function () {
                    e(t, i)
                }, 0)) : c(n, function (n) {
                    i.dataValue = n.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/gi, ""), o && e(t, i)
                })
            }

            function f() {
                if ("wysiwyg" == t.mode) {
                    var e = g("paste");
                    t.getCommand("cut").setState(g("cut")), t.getCommand("copy").setState(g("copy")), t.getCommand("paste").setState(e), t.fire("pasteState", e)
                }
            }

            function g(e) {
                if (T && e in {paste: 1, cut: 1})return CKEDITOR.TRISTATE_DISABLED;
                if ("paste" == e)return CKEDITOR.TRISTATE_OFF;
                e = t.getSelection();
                var n = e.getRanges();
                return e.getType() == CKEDITOR.SELECTION_NONE || 1 == n.length && n[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF
            }

            var m = CKEDITOR.plugins.clipboard, E = 0, p = 0, T = 0;
            !function () {
                if (t.on("key", u), t.on("contentDom", n), t.on("selectionChange", function (e) {
                        T = e.data.selection.getRanges()[0].checkReadOnly(), f()
                    }), t.contextMenu) {
                    t.contextMenu.addListener(function (e, t) {
                        return T = t.getRanges()[0].checkReadOnly(), {cut: g("cut"), copy: g("copy"), paste: g("paste")}
                    });
                    var e = null;
                    t.on("menuShow", function () {
                        e && (e.removeListener(), e = null);
                        var n = t.contextMenu.findItemByCommandName("paste");
                        n && n.element && (e = n.element.on("touchend", function () {
                            t._.forcePasteDialog = !0
                        }))
                    })
                }
                t.ui.addButton && t.once("instanceReady", function () {
                    t._.pasteButtons && CKEDITOR.tools.array.forEach(t._.pasteButtons, function (e) {
                        (e = t.ui.get(e)) && CKEDITOR.document.getById(e._.id).on("touchend", function () {
                            t._.forcePasteDialog = !0
                        })
                    })
                })
            }(), function () {
                function e(e, n, i, o, a) {
                    var r = t.lang.clipboard[n];
                    t.addCommand(n, i), t.ui.addButton && t.ui.addButton(e, {
                        label: r,
                        command: n,
                        toolbar: "clipboard," + o
                    }), t.addMenuItems && t.addMenuItem(n, {label: r, command: n, group: "clipboard", order: a})
                }

                e("Cut", "cut", i("cut"), 10, 1), e("Copy", "copy", i("copy"), 20, 4), e("Paste", "paste", o(), 30, 8), t._.pasteButtons || (t._.pasteButtons = []), t._.pasteButtons.push("Paste")
            }(), t.getClipboardData = function (e, n) {
                function i(e) {
                    e.removeListener(), e.cancel(), n(e.data)
                }

                function o(e) {
                    e.removeListener(), e.cancel(), n({
                        type: r,
                        dataValue: e.data.dataValue,
                        dataTransfer: e.data.dataTransfer,
                        method: "paste"
                    })
                }

                var a = !1, r = "auto";
                n || (n = e, e = null), t.on("beforePaste", function (e) {
                    e.removeListener(), a = !0, r = e.data.type
                }, null, null, 1e3), t.on("paste", i, null, null, 0), !1 === d() && (t.removeListener("paste", i), t._.forcePasteDialog && a && t.fire("pasteDialog") ? (t.on("pasteDialogCommit", o), t.on("dialogHide", function (e) {
                    e.removeListener(), e.data.removeListener("pasteDialogCommit", o), e.data._.committed || n(null)
                })) : n(null))
            }
        }

        function n(e) {
            if (CKEDITOR.env.webkit) {
                if (!e.match(/^[^<]*$/g) && !e.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi))return "html"
            } else if (CKEDITOR.env.ie) {
                if (!e.match(/^([^<]|<br( ?\/)?>)*$/gi) && !e.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi))return "html"
            } else {
                if (!CKEDITOR.env.gecko)return "html";
                if (!e.match(/^([^<]|<br( ?\/)?>)*$/gi))return "html"
            }
            return "htmlifiedtext"
        }

        function i(e, t) {
            function n(e) {
                return CKEDITOR.tools.repeat("</p><p>", ~~(e / 2)) + (1 == e % 2 ? "<br>" : "")
            }

            return t = t.replace(/\s+/g, " ").replace(/> +</g, "><").replace(/<br ?\/>/gi, "<br>"), t = t.replace(/<\/?[A-Z]+>/g, function (e) {
                return e.toLowerCase()
            }), t.match(/^[^<]$/) ? t : (CKEDITOR.env.webkit && -1 < t.indexOf("<div>") && (t = t.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "<br>").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "<div></div>"), t.match(/<div>(<br>|)<\/div>/) && (t = "<p>" + t.replace(/(<div>(<br>|)<\/div>)+/g, function (e) {
                    return n(e.split("</div><div>").length + 1)
                }) + "</p>"), t = t.replace(/<\/div><div>/g, "<br>"), t = t.replace(/<\/?div>/g, "")), CKEDITOR.env.gecko && e.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (t = t.replace(/^<br><br>$/, "<br>")), -1 < t.indexOf("<br><br>") && (t = "<p>" + t.replace(/(<br>){2,}/g, function (e) {
                    return n(e.length / 4)
                }) + "</p>")), r(e, t))
        }

        function o() {
            function e() {
                var e, t = {};
                for (e in CKEDITOR.dtd)"$" != e.charAt(0) && "div" != e && "span" != e && (t[e] = 1);
                return t
            }

            var t = {};
            return {
                get: function (n) {
                    return "plain-text" == n ? t.plainText || (t.plainText = new CKEDITOR.filter("br")) : "semantic-content" == n ? ((n = t.semanticContent) || (n = new CKEDITOR.filter, n.allow({
                        $1: {
                            elements: e(),
                            attributes: !0,
                            styles: !1,
                            classes: !1
                        }
                    }), n = t.semanticContent = n), n) : n ? new CKEDITOR.filter(n) : null
                }
            }
        }

        function a(e, t, n) {
            t = CKEDITOR.htmlParser.fragment.fromHtml(t);
            var i = new CKEDITOR.htmlParser.basicWriter;
            return n.applyTo(t, !0, !1, e.activeEnterMode), t.writeHtml(i), i.getHtml()
        }

        function r(e, t) {
            return e.enterMode == CKEDITOR.ENTER_BR ? t = t.replace(/(<\/p><p>)+/g, function (e) {
                return CKEDITOR.tools.repeat("<br>", e.length / 7 * 2)
            }).replace(/<\/?p>/g, "") : e.enterMode == CKEDITOR.ENTER_DIV && (t = t.replace(/<(\/)?p>/g, "<$1div>")), t
        }

        function s(e) {
            e.data.preventDefault(), e.data.$.dataTransfer.dropEffect = "none"
        }

        function l(t) {
            var n = CKEDITOR.plugins.clipboard;
            t.on("contentDom", function () {
                function i(n, i, o) {
                    i.select(), e(t, {
                        dataTransfer: o,
                        method: "drop"
                    }, 1), o.sourceEditor.fire("saveSnapshot"), o.sourceEditor.editable().extractHtmlFromRange(n), o.sourceEditor.getSelection().selectRanges([n]), o.sourceEditor.fire("saveSnapshot")
                }

                function o(i, o) {
                    i.select(), e(t, {dataTransfer: o, method: "drop"}, 1), n.resetDragDataTransfer()
                }

                function a(e, n, i) {
                    var o = {$: e.data.$, target: e.data.getTarget()};
                    n && (o.dragRange = n), i && (o.dropRange = i), !1 === t.fire(e.name, o) && e.data.preventDefault()
                }

                function r(e) {
                    return e.type != CKEDITOR.NODE_ELEMENT && (e = e.getParent()), e.getChildCount()
                }

                var s = t.editable(), l = CKEDITOR.plugins.clipboard.getDropTarget(t), c = t.ui.space("top"),
                    d = t.ui.space("bottom");
                n.preventDefaultDropOnElement(c), n.preventDefaultDropOnElement(d), s.attachListener(l, "dragstart", a), s.attachListener(t, "dragstart", n.resetDragDataTransfer, n, null, 1), s.attachListener(t, "dragstart", function (e) {
                    n.initDragDataTransfer(e, t)
                }, null, null, 2), s.attachListener(t, "dragstart", function () {
                    var e = n.dragRange = t.getSelection().getRanges()[0];
                    CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (n.dragStartContainerChildCount = e ? r(e.startContainer) : null, n.dragEndContainerChildCount = e ? r(e.endContainer) : null)
                }, null, null, 100), s.attachListener(l, "dragend", a), s.attachListener(t, "dragend", n.initDragDataTransfer, n, null, 1), s.attachListener(t, "dragend", n.resetDragDataTransfer, n, null, 100), s.attachListener(l, "dragover", function (e) {
                    if (CKEDITOR.env.edge) e.data.preventDefault(); else {
                        var t = e.data.getTarget();
                        t && t.is && t.is("html") ? e.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && e.data.$.dataTransfer.types.contains("Files") && e.data.preventDefault()
                    }
                }), s.attachListener(l, "drop", function (e) {
                    if (!e.data.$.defaultPrevented) {
                        e.data.preventDefault();
                        var i = e.data.getTarget();
                        if (!i.isReadOnly() || i.type == CKEDITOR.NODE_ELEMENT && i.is("html")) {
                            var i = n.getRangeAtDropPosition(e, t), o = n.dragRange;
                            i && a(e, o, i)
                        }
                    }
                }, null, null, 9999), s.attachListener(t, "drop", n.initDragDataTransfer, n, null, 1), s.attachListener(t, "drop", function (e) {
                    if (e = e.data) {
                        var a = e.dropRange, r = e.dragRange, s = e.dataTransfer;
                        s.getTransferType(t) == CKEDITOR.DATA_TRANSFER_INTERNAL ? setTimeout(function () {
                            n.internalDrop(r, a, s, t)
                        }, 0) : s.getTransferType(t) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? i(r, a, s) : o(a, s)
                    }
                }, null, null, 9999)
            })
        }

        var c;
        CKEDITOR.plugins.add("clipboard", {
            requires: "dialog,notification,toolbar", init: function (e) {
                var r, s = o();
                if (e.config.forcePasteAsPlainText ? r = "plain-text" : e.config.pasteFilter ? r = e.config.pasteFilter : !CKEDITOR.env.webkit || "pasteFilter" in e.config || (r = "semantic-content"), e.pasteFilter = s.get(r), t(e), l(e), CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js")), CKEDITOR.env.gecko) {
                    var c, d = ["image/png", "image/jpeg", "image/gif"];
                    e.on("paste", function (t) {
                        var n = t.data, i = n.dataTransfer;
                        if (!n.dataValue && "paste" == n.method && i && 1 == i.getFilesCount() && c != i.id && (i = i.getFile(0), -1 != CKEDITOR.tools.indexOf(d, i.type))) {
                            var o = new FileReader;
                            o.addEventListener("load", function () {
                                t.data.dataValue = '<img src="' + o.result + '" />', e.fire("paste", t.data)
                            }, !1), o.addEventListener("abort", function () {
                                e.fire("paste", t.data)
                            }, !1), o.addEventListener("error", function () {
                                e.fire("paste", t.data)
                            }, !1), o.readAsDataURL(i), c = n.dataTransfer.id, t.stop()
                        }
                    }, null, null, 1)
                }
                e.on("paste", function (t) {
                    if (t.data.dataTransfer || (t.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer), !t.data.dataValue) {
                        var n = t.data.dataTransfer, i = n.getData("text/html");
                        i ? (t.data.dataValue = i, t.data.type = "html") : (i = n.getData("text/plain")) && (t.data.dataValue = e.editable().transformPlainTextToHtml(i), t.data.type = "text")
                    }
                }, null, null, 1), e.on("paste", function (e) {
                    var t = e.data.dataValue, n = CKEDITOR.dtd.$block;
                    if (-1 < t.indexOf("Apple-") && (t = t.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), "html" != e.data.type && (t = t.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function (e, t) {
                            return t.replace(/\t/g, "&nbsp;&nbsp; &nbsp;")
                        })), -1 < t.indexOf('<br class="Apple-interchange-newline">') && (e.data.startsWithEOL = 1, e.data.preSniffing = "html", t = t.replace(/<br class="Apple-interchange-newline">/, "")), t = t.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1")), t.match(/^<[^<]+cke_(editable|contents)/i)) {
                        var i, o, a = new CKEDITOR.dom.element("div");
                        for (a.setHtml(t); 1 == a.getChildCount() && (i = a.getFirst()) && i.type == CKEDITOR.NODE_ELEMENT && (i.hasClass("cke_editable") || i.hasClass("cke_contents"));)a = o = i;
                        o && (t = o.getHtml().replace(/<br>$/i, ""))
                    }
                    CKEDITOR.env.ie ? t = t.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function (t, i) {
                        return i.toLowerCase() in n ? (e.data.preSniffing = "html", "<" + i) : t
                    }) : CKEDITOR.env.webkit ? t = t.replace(/<\/(\w+)><div><br><\/div>$/, function (t, i) {
                        return i in n ? (e.data.endsWithEOL = 1, "</" + i + ">") : t
                    }) : CKEDITOR.env.gecko && (t = t.replace(/(\s)<br>$/, "$1")), e.data.dataValue = t
                }, null, null, 3), e.on("paste", function (t) {
                    t = t.data;
                    var o, r = e._.nextPasteType || t.type, l = t.dataValue,
                        c = e.config.clipboard_defaultContentType || "html", d = t.dataTransfer.getTransferType(e);
                    o = "html" == r || "html" == t.preSniffing ? "html" : n(l), delete e._.nextPasteType, "htmlifiedtext" == o && (l = i(e.config, l)), "text" == r && "html" == o ? l = a(e, l, s.get("plain-text")) : d == CKEDITOR.DATA_TRANSFER_EXTERNAL && e.pasteFilter && !t.dontFilter && (l = a(e, l, e.pasteFilter)), t.startsWithEOL && (l = '<br data-cke-eol="1">' + l), t.endsWithEOL && (l += '<br data-cke-eol="1">'), "auto" == r && (r = "html" == o || "html" == c ? "html" : "text"), t.type = r, t.dataValue = l, delete t.preSniffing, delete t.startsWithEOL, delete t.endsWithEOL
                }, null, null, 6), e.on("paste", function (t) {
                    t = t.data, t.dataValue && (e.insertHtml(t.dataValue, t.type, t.range), setTimeout(function () {
                        e.fire("afterPaste")
                    }, 0))
                }, null, null, 1e3), e.on("pasteDialog", function (t) {
                    setTimeout(function () {
                        e.openDialog("paste", t.data)
                    }, 0)
                })
            }
        }), CKEDITOR.plugins.clipboard = {
            isCustomCopyCutSupported: (!CKEDITOR.env.ie || 16 <= CKEDITOR.env.version) && !CKEDITOR.env.iOS,
            isCustomDataTypesSupported: !CKEDITOR.env.ie || 16 <= CKEDITOR.env.version,
            isFileApiSupported: !CKEDITOR.env.ie || 9 < CKEDITOR.env.version,
            mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ? "beforepaste" : "paste",
            addPasteButton: function (e, t, n) {
                e.ui.addButton && (e.ui.addButton(t, n), e._.pasteButtons || (e._.pasteButtons = []), e._.pasteButtons.push(t))
            },
            canClipboardApiBeTrusted: function (e, t) {
                return !!(e.getTransferType(t) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !e.isEmpty() || CKEDITOR.env.gecko && (e.getData("text/html") || e.getFilesCount()) || CKEDITOR.env.safari && 603 <= CKEDITOR.env.version && !CKEDITOR.env.iOS || CKEDITOR.env.edge && 16 <= CKEDITOR.env.version)
            },
            getDropTarget: function (e) {
                var t = e.editable();
                return CKEDITOR.env.ie && 9 > CKEDITOR.env.version || t.isInline() ? t : e.document
            },
            fixSplitNodesAfterDrop: function (e, t, n, i) {
                function o(e, n, i) {
                    var o = e;
                    if (o.type == CKEDITOR.NODE_TEXT && (o = e.getParent()), o.equals(n) && i != n.getChildCount())return e = t.startContainer.getChild(t.startOffset - 1), n = t.startContainer.getChild(t.startOffset), e && e.type == CKEDITOR.NODE_TEXT && n && n.type == CKEDITOR.NODE_TEXT && (i = e.getLength(), e.setText(e.getText() + n.getText()), n.remove(), t.setStart(e, i), t.collapse(!0)), !0
                }

                var a = t.startContainer;
                "number" == typeof i && "number" == typeof n && a.type == CKEDITOR.NODE_ELEMENT && (o(e.startContainer, a, n) || o(e.endContainer, a, i))
            },
            isDropRangeAffectedByDragRange: function (e, t) {
                var n = t.startContainer, i = t.endOffset;
                return !!(e.endContainer.equals(n) && e.endOffset <= i || e.startContainer.getParent().equals(n) && e.startContainer.getIndex() < i || e.endContainer.getParent().equals(n) && e.endContainer.getIndex() < i)
            },
            internalDrop: function (t, n, i, o) {
                var a, r, s = CKEDITOR.plugins.clipboard, l = o.editable();
                o.fire("saveSnapshot"), o.fire("lockSnapshot", {dontUpdate: 1}), CKEDITOR.env.ie && 10 > CKEDITOR.env.version && this.fixSplitNodesAfterDrop(t, n, s.dragStartContainerChildCount, s.dragEndContainerChildCount), (r = this.isDropRangeAffectedByDragRange(t, n)) || (a = t.createBookmark(!1)), s = n.clone().createBookmark(!1), r && (a = t.createBookmark(!1)), t = a.startNode, n = a.endNode, r = s.startNode, n && t.getPosition(r) & CKEDITOR.POSITION_PRECEDING && n.getPosition(r) & CKEDITOR.POSITION_FOLLOWING && r.insertBefore(t), t = o.createRange(),
                    t.moveToBookmark(a), l.extractHtmlFromRange(t, 1), n = o.createRange(), n.moveToBookmark(s), e(o, {
                    dataTransfer: i,
                    method: "drop",
                    range: n
                }, 1), o.fire("unlockSnapshot")
            },
            getRangeAtDropPosition: function (e, t) {
                var n = e.data.$, i = n.clientX, o = n.clientY, a = t.getSelection(!0).getRanges()[0],
                    r = t.createRange();
                if (e.data.testRange)return e.data.testRange;
                if (document.caretRangeFromPoint && t.document.$.caretRangeFromPoint(i, o)) n = t.document.$.caretRangeFromPoint(i, o), r.setStart(CKEDITOR.dom.node(n.startContainer), n.startOffset), r.collapse(!0); else if (n.rangeParent) r.setStart(CKEDITOR.dom.node(n.rangeParent), n.rangeOffset), r.collapse(!0); else {
                    if (CKEDITOR.env.ie && 8 < CKEDITOR.env.version && a && t.editable().hasFocus)return a;
                    if (!document.body.createTextRange)return null;
                    t.focus(), n = t.document.getBody().$.createTextRange();
                    try {
                        for (var s = !1, l = 0; 20 > l && !s; l++) {
                            if (!s)try {
                                n.moveToPoint(i, o - l), s = !0
                            } catch (e) {
                            }
                            if (!s)try {
                                n.moveToPoint(i, o + l), s = !0
                            } catch (e) {
                            }
                        }
                        if (s) {
                            var c = "cke-temp-" + (new Date).getTime();
                            n.pasteHTML('<span id="' + c + '">​</span>');
                            var d = t.document.getById(c);
                            r.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START), d.remove()
                        } else {
                            var u, h = t.document.$.elementFromPoint(i, o), f = new CKEDITOR.dom.element(h);
                            if (f.equals(t.editable()) || "html" == f.getName())return a && a.startContainer && !a.startContainer.equals(t.editable()) ? a : null;
                            u = f.getClientRect(), i < u.left ? r.setStartAt(f, CKEDITOR.POSITION_AFTER_START) : r.setStartAt(f, CKEDITOR.POSITION_BEFORE_END), r.collapse(!0)
                        }
                    } catch (e) {
                        return null
                    }
                }
                return r
            },
            initDragDataTransfer: function (e, t) {
                var n = e.data.$ ? e.data.$.dataTransfer : null, i = new this.dataTransfer(n, t);
                "dragstart" === e.name && i.storeId(), n ? this.dragData && i.id == this.dragData.id ? i = this.dragData : this.dragData = i : this.dragData ? i = this.dragData : this.dragData = i, e.data.dataTransfer = i
            },
            resetDragDataTransfer: function () {
                this.dragData = null
            },
            initPasteDataTransfer: function (e, t) {
                if (this.isCustomCopyCutSupported) {
                    if (e && e.data && e.data.$) {
                        var n = e.data.$.clipboardData, i = new this.dataTransfer(n, t);
                        return "copy" !== e.name && "cut" !== e.name || i.storeId(), this.copyCutData && i.id == this.copyCutData.id ? (i = this.copyCutData, i.$ = n) : this.copyCutData = i, i
                    }
                    return new this.dataTransfer(null, t)
                }
                return new this.dataTransfer(CKEDITOR.env.edge && e && e.data.$ && e.data.$.clipboardData || null, t)
            },
            preventDefaultDropOnElement: function (e) {
                e && e.on("dragover", s)
            }
        }, c = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? "cke/id" : "Text", CKEDITOR.plugins.clipboard.dataTransfer = function (e, t) {
            e && (this.$ = e), this._ = {
                metaRegExp: /^<meta.*?>/i,
                bodyRegExp: /<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i,
                fragmentRegExp: /\x3c!--(?:Start|End)Fragment--\x3e/g,
                data: {},
                files: [],
                nativeHtmlCache: "",
                normalizeType: function (e) {
                    return e = e.toLowerCase(), "text" == e || "text/plain" == e ? "Text" : "url" == e ? "URL" : e
                }
            }, this._.fallbackDataTransfer = new CKEDITOR.plugins.clipboard.fallbackDataTransfer(this), this.id = this.getData(c), this.id || (this.id = "Text" == c ? "" : "cke-" + CKEDITOR.tools.getUniqueId()), t && (this.sourceEditor = t, this.setData("text/html", t.getSelectedHtml(1)), "Text" == c || this.getData("text/plain") || this.setData("text/plain", t.getSelection().getSelectedText()))
        }, CKEDITOR.DATA_TRANSFER_INTERNAL = 1, CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2, CKEDITOR.DATA_TRANSFER_EXTERNAL = 3, CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
            getData: function (e, t) {
                e = this._.normalizeType(e);
                var n = "text/html" == e && t ? this._.nativeHtmlCache : this._.data[e];
                if (void 0 === n || null === n || "" === n) {
                    if (this._.fallbackDataTransfer.isRequired()) n = this._.fallbackDataTransfer.getData(e, t); else try {
                        n = this.$.getData(e) || ""
                    } catch (e) {
                        n = ""
                    }
                    "text/html" != e || t || (n = this._stripHtml(n))
                }
                if ("Text" == e && CKEDITOR.env.gecko && this.getFilesCount() && "file://" == n.substring(0, 7) && (n = ""), "string" == typeof n)var i = n.indexOf("</html>"),
                    n = -1 !== i ? n.substring(0, i + 7) : n;
                return n
            }, setData: function (e, t) {
                if (e = this._.normalizeType(e), "text/html" == e ? (this._.data[e] = this._stripHtml(t), this._.nativeHtmlCache = t) : this._.data[e] = t, CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "URL" == e || "Text" == e)if ("Text" == c && "Text" == e && (this.id = t), this._.fallbackDataTransfer.isRequired()) this._.fallbackDataTransfer.setData(e, t); else try {
                    this.$.setData(e, t)
                } catch (e) {
                }
            }, storeId: function () {
                "Text" !== c && this.setData(c, this.id)
            }, getTransferType: function (e) {
                return this.sourceEditor ? this.sourceEditor == e ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL
            }, cacheData: function () {
                function e(e) {
                    e = i._.normalizeType(e);
                    var t = i.getData(e);
                    "text/html" == e && (i._.nativeHtmlCache = i.getData(e, !0), t = i._stripHtml(t)), t && (i._.data[e] = t)
                }

                if (this.$) {
                    var t, n, i = this;
                    if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
                        if (this.$.types)for (t = 0; t < this.$.types.length; t++)e(this.$.types[t])
                    } else e("Text"), e("URL");
                    if (n = this._getImageFromClipboard(), this.$ && this.$.files || n) {
                        if (this._.files = [], this.$.files && this.$.files.length)for (t = 0; t < this.$.files.length; t++)this._.files.push(this.$.files[t]);
                        0 === this._.files.length && n && this._.files.push(n)
                    }
                }
            }, getFilesCount: function () {
                return this._.files.length ? this._.files.length : this.$ && this.$.files && this.$.files.length ? this.$.files.length : this._getImageFromClipboard() ? 1 : 0
            }, getFile: function (e) {
                return this._.files.length ? this._.files[e] : this.$ && this.$.files && this.$.files.length ? this.$.files[e] : 0 === e ? this._getImageFromClipboard() : void 0
            }, isEmpty: function () {
                var e, t = {};
                if (this.getFilesCount())return !1;
                if (CKEDITOR.tools.array.forEach(CKEDITOR.tools.objectKeys(this._.data), function (e) {
                        t[e] = 1
                    }), this.$)if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
                    if (this.$.types)for (var n = 0; n < this.$.types.length; n++)t[this.$.types[n]] = 1
                } else t.Text = 1, t.URL = 1;
                "Text" != c && (t[c] = 0);
                for (e in t)if (t[e] && "" !== this.getData(e))return !1;
                return !0
            }, _getImageFromClipboard: function () {
                var e;
                if (this.$ && this.$.items && this.$.items[0])try {
                    if ((e = this.$.items[0].getAsFile()) && e.type)return e
                } catch (e) {
                }
            }, _stripHtml: function (e) {
                if (e && e.length) {
                    e = e.replace(this._.metaRegExp, "");
                    var t = this._.bodyRegExp.exec(e);
                    t && t.length && (e = t[1], e = e.replace(this._.fragmentRegExp, ""))
                }
                return e
            }
        }, CKEDITOR.plugins.clipboard.fallbackDataTransfer = function (e) {
            this._dataTransfer = e, this._customDataFallbackType = "text/html"
        }, CKEDITOR.plugins.clipboard.fallbackDataTransfer._isCustomMimeTypeSupported = null, CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes = [], CKEDITOR.plugins.clipboard.fallbackDataTransfer.prototype = {
            isRequired: function () {
                var e = CKEDITOR.plugins.clipboard.fallbackDataTransfer, t = this._dataTransfer.$;
                if (null === e._isCustomMimeTypeSupported) {
                    if (!t)return !1;
                    e._isCustomMimeTypeSupported = !1;
                    try {
                        t.setData("cke/mimetypetest", "cke test value"), e._isCustomMimeTypeSupported = "cke test value" === t.getData("cke/mimetypetest"), t.clearData("cke/mimetypetest")
                    } catch (e) {
                    }
                }
                return !e._isCustomMimeTypeSupported
            }, getData: function (e, t) {
                var n = this._getData(this._customDataFallbackType, !0);
                if (t)return n;
                var n = this._extractDataComment(n), i = null,
                    i = e === this._customDataFallbackType ? n.content : n.data && n.data[e] ? n.data[e] : this._getData(e, !0);
                return null !== i ? i : ""
            }, setData: function (e, t) {
                var n = e === this._customDataFallbackType;
                n && (t = this._applyDataComment(t, this._getFallbackTypeData()));
                var i = t, o = this._dataTransfer.$;
                try {
                    o.setData(e, i), n && (this._dataTransfer._.nativeHtmlCache = i)
                } catch (t) {
                    if (this._isUnsupportedMimeTypeError(t)) {
                        n = CKEDITOR.plugins.clipboard.fallbackDataTransfer, -1 === CKEDITOR.tools.indexOf(n._customTypes, e) && n._customTypes.push(e);
                        var n = this._getFallbackTypeContent(), a = this._getFallbackTypeData();
                        a[e] = i;
                        try {
                            i = this._applyDataComment(n, a), o.setData(this._customDataFallbackType, i), this._dataTransfer._.nativeHtmlCache = i
                        } catch (e) {
                            i = ""
                        }
                    }
                }
                return i
            }, _getData: function (e, t) {
                var n = this._dataTransfer._.data;
                if (!t && n[e])return n[e];
                try {
                    return this._dataTransfer.$.getData(e)
                } catch (e) {
                    return null
                }
            }, _getFallbackTypeContent: function () {
                var e = this._dataTransfer._.data[this._customDataFallbackType];
                return e || (e = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).content), e
            }, _getFallbackTypeData: function () {
                var e = CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes,
                    t = this._extractDataComment(this._getData(this._customDataFallbackType, !0)).data || {},
                    n = this._dataTransfer._.data;
                return CKEDITOR.tools.array.forEach(e, function (e) {
                    void 0 !== n[e] ? t[e] = n[e] : void 0 !== t[e] && (t[e] = t[e])
                }, this), t
            }, _isUnsupportedMimeTypeError: function (e) {
                return e.message && -1 !== e.message.search(/element not found/gi)
            }, _extractDataComment: function (e) {
                var t = {data: null, content: e || ""};
                if (e && 16 < e.length) {
                    var n;
                    (n = /\x3c!--cke-data:(.*?)--\x3e/g.exec(e)) && n[1] && (t.data = JSON.parse(decodeURIComponent(n[1])), t.content = e.replace(n[0], ""))
                }
                return t
            }, _applyDataComment: function (e, t) {
                var n = "";
                return t && CKEDITOR.tools.objectKeys(t).length && (n = "\x3c!--cke-data:" + encodeURIComponent(JSON.stringify(t)) + "--\x3e"), n + (e && e.length ? e : "")
            }
        }
    }(),CKEDITOR.config.clipboard_notificationDuration = 1e4,function () {
        CKEDITOR.plugins.add("panel", {
            beforeInit: function (e) {
                e.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler)
            }
        }), CKEDITOR.UI_PANEL = "panel", CKEDITOR.ui.panel = function (e, t) {
            t && CKEDITOR.tools.extend(this, t), CKEDITOR.tools.extend(this, {
                className: "",
                css: []
            }), this.id = CKEDITOR.tools.getNextId(), this.document = e, this.isFramed = this.forceIFrame || this.css.length, this._ = {blocks: {}}
        }, CKEDITOR.ui.panel.handler = {
            create: function (e) {
                return new CKEDITOR.ui.panel(e)
            }
        };
        var e = CKEDITOR.addTemplate("panel", '<div lang="{langCode}" id="{id}" dir={dir} class="cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style="z-index:{z-index}" role="presentation">{frame}</div>'),
            t = CKEDITOR.addTemplate("panel-frame", '<iframe id="{id}" class="cke_panel_frame" role="presentation" frameborder="0" src="{src}"></iframe>'),
            n = CKEDITOR.addTemplate("panel-frame-inner", '<!DOCTYPE html><html class="cke_panel_container {env}" dir="{dir}" lang="{langCode}"><head>{css}</head><body class="cke_{dir}" style="margin:0;padding:0" onload="{onload}"></body></html>');
        CKEDITOR.ui.panel.prototype = {
            render: function (i, o) {
                this.getHolderElement = function () {
                    var e = this._.holder;
                    if (!e) {
                        if (this.isFramed) {
                            var e = this.document.getById(this.id + "_frame"), t = e.getParent(),
                                e = e.getFrameDocument();
                            CKEDITOR.env.iOS && t.setStyles({
                                overflow: "scroll",
                                "-webkit-overflow-scrolling": "touch"
                            }), t = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function () {
                                this.isLoaded = !0, this.onLoad && this.onLoad()
                            }, this)), e.write(n.output(CKEDITOR.tools.extend({
                                css: CKEDITOR.tools.buildStyleHtml(this.css),
                                onload: "window.parent.CKEDITOR.tools.callFunction(" + t + ");"
                            }, a))), e.getWindow().$.CKEDITOR = CKEDITOR, e.on("keydown", function (e) {
                                var t = e.data.getKeystroke(), n = this.document.getById(this.id).getAttribute("dir");
                                this._.onKeyDown && !1 === this._.onKeyDown(t) ? e.data.preventDefault() : (27 == t || t == ("rtl" == n ? 39 : 37)) && this.onEscape && !1 === this.onEscape(t) && e.data.preventDefault()
                            }, this), e = e.getBody(), e.unselectable(), CKEDITOR.env.air && CKEDITOR.tools.callFunction(t)
                        } else e = this.document.getById(this.id);
                        this._.holder = e
                    }
                    return e
                };
                var a = {
                    editorId: i.id,
                    id: this.id,
                    langCode: i.langCode,
                    dir: i.lang.dir,
                    cls: this.className,
                    frame: "",
                    env: CKEDITOR.env.cssClass,
                    "z-index": i.config.baseFloatZIndex + 1
                };
                if (this.isFramed) {
                    var r = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : "";
                    a.frame = t.output({id: this.id + "_frame", src: r})
                }
                return r = e.output(a), o && o.push(r), r
            }, addBlock: function (e, t) {
                return t = this._.blocks[e] = t instanceof CKEDITOR.ui.panel.block ? t : new CKEDITOR.ui.panel.block(this.getHolderElement(), t), this._.currentBlock || this.showBlock(e), t
            }, getBlock: function (e) {
                return this._.blocks[e]
            }, showBlock: function (e) {
                e = this._.blocks[e];
                var t = this._.currentBlock,
                    n = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame");
                return t && t.hide(), this._.currentBlock = e, CKEDITOR.fire("ariaWidget", n), e._.focusIndex = -1, this._.onKeyDown = e.onKeyDown && CKEDITOR.tools.bind(e.onKeyDown, e), e.show(), e
            }, destroy: function () {
                this.element && this.element.remove()
            }
        }, CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
            $: function (e, t) {
                this.element = e.append(e.getDocument().createElement("div", {
                    attributes: {
                        tabindex: -1,
                        class: "cke_panel_block"
                    }, styles: {display: "none"}
                })), t && CKEDITOR.tools.extend(this, t), this.element.setAttributes({
                    role: this.attributes.role || "presentation",
                    "aria-label": this.attributes["aria-label"],
                    title: this.attributes.title || this.attributes["aria-label"]
                }), this.keys = {}, this._.focusIndex = -1, this.element.disableContextMenu()
            }, _: {
                markItem: function (e) {
                    -1 != e && (e = this.element.getElementsByTag("a").getItem(this._.focusIndex = e), CKEDITOR.env.webkit && e.getDocument().getWindow().focus(), e.focus(), this.onMark && this.onMark(e))
                }, markFirstDisplayed: function (e) {
                    for (var t, n, i = function (e) {
                        return e.type == CKEDITOR.NODE_ELEMENT && "none" == e.getStyle("display")
                    }, o = this._.getItems(), a = o.count() - 1; 0 <= a; a--)if (t = o.getItem(a), t.getAscendant(i) || (n = t, this._.focusIndex = a), "true" == t.getAttribute("aria-selected")) {
                        n = t, this._.focusIndex = a;
                        break
                    }
                    n && (e && e(), CKEDITOR.env.webkit && n.getDocument().getWindow().focus(), n.focus(), this.onMark && this.onMark(n))
                }, getItems: function () {
                    return this.element.getElementsByTag("a")
                }
            }, proto: {
                show: function () {
                    this.element.setStyle("display", "")
                }, hide: function () {
                    this.onHide && !0 === this.onHide.call(this) || this.element.setStyle("display", "none")
                }, onKeyDown: function (e, t) {
                    var n = this.keys[e];
                    switch (n) {
                        case"next":
                            for (var i, o = this._.focusIndex, n = this.element.getElementsByTag("a"); i = n.getItem(++o);)if (i.getAttribute("_cke_focus") && i.$.offsetWidth) {
                                this._.focusIndex = o, i.focus();
                                break
                            }
                            return !i && !t && (this._.focusIndex = -1, this.onKeyDown(e, 1));
                        case"prev":
                            for (o = this._.focusIndex, n = this.element.getElementsByTag("a"); 0 < o && (i = n.getItem(--o));) {
                                if (i.getAttribute("_cke_focus") && i.$.offsetWidth) {
                                    this._.focusIndex = o, i.focus();
                                    break
                                }
                                i = null
                            }
                            return !i && !t && (this._.focusIndex = n.count(), this.onKeyDown(e, 1));
                        case"click":
                        case"mouseup":
                            return o = this._.focusIndex, (i = 0 <= o && this.element.getElementsByTag("a").getItem(o)) && (i.$[n] ? i.$[n]() : i.$["on" + n]()), !1
                    }
                    return !0
                }
            }
        })
    }(),CKEDITOR.plugins.add("floatpanel", {requires: "panel"}),function () {
        function e(e, n, i, o, a) {
            a = CKEDITOR.tools.genKey(n.getUniqueId(), i.getUniqueId(), e.lang.dir, e.uiColor || "", o.css || "", a || "");
            var r = t[a];
            return r || (r = t[a] = new CKEDITOR.ui.panel(n, o), r.element = i.append(CKEDITOR.dom.element.createFromHtml(r.render(e), n)), r.element.setStyles({
                display: "none",
                position: "absolute"
            })), r
        }

        var t = {};
        CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
            $: function (t, n, i, o) {
                function a() {
                    c.hide()
                }

                i.forceIFrame = 1, i.toolbarRelated && t.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (n = CKEDITOR.document.getById("cke_" + t.name));
                var r = n.getDocument();
                o = e(t, r, n, i, o || 0);
                var s = o.element, l = s.getFirst(), c = this;
                s.disableContextMenu(), this.element = s, this._ = {
                    editor: t,
                    panel: o,
                    parentElement: n,
                    definition: i,
                    document: r,
                    iframe: l,
                    children: [],
                    dir: t.lang.dir,
                    showBlockParams: null
                }, t.on("mode", a), t.on("resize", a), r.getWindow().on("resize", function () {
                    this.reposition()
                }, this)
            }, proto: {
                addBlock: function (e, t) {
                    return this._.panel.addBlock(e, t)
                }, addListBlock: function (e, t) {
                    return this._.panel.addListBlock(e, t)
                }, getBlock: function (e) {
                    return this._.panel.getBlock(e)
                }, showBlock: function (e, t, n, i, o, a) {
                    var r = this._.panel, s = r.showBlock(e);
                    this._.showBlockParams = [].slice.call(arguments), this.allowBlur(!1);
                    var l = this._.editor.editable();
                    this._.returnFocus = l.hasFocus ? l : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement), this._.hideTimeout = 0;
                    var c = this.element, l = this._.iframe,
                        l = CKEDITOR.env.ie && !CKEDITOR.env.edge ? l : new CKEDITOR.dom.window(l.$.contentWindow),
                        d = c.getDocument(), u = this._.parentElement.getPositionedAncestor(),
                        h = t.getDocumentPosition(d), d = u ? u.getDocumentPosition(d) : {x: 0, y: 0},
                        f = "rtl" == this._.dir, g = h.x + (i || 0) - d.x, m = h.y + (o || 0) - d.y;
                    !f || 1 != n && 4 != n ? f || 2 != n && 3 != n || (g += t.$.offsetWidth - 1) : g += t.$.offsetWidth, 3 != n && 4 != n || (m += t.$.offsetHeight - 1), this._.panel._.offsetParentId = t.getId(), c.setStyles({
                        top: m + "px",
                        left: 0,
                        display: ""
                    }), c.setOpacity(0), c.getFirst().removeStyle("width"), this._.editor.focusManager.add(l), this._.blurSet || (CKEDITOR.event.useCapture = !0, l.on("blur", function (e) {
                        function t() {
                            delete this._.returnFocus, this.hide()
                        }

                        this.allowBlur() && e.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(t, 0, this)) : t.call(this))
                    }, this), l.on("focus", function () {
                        this._.focused = !0, this.hideChild(), this.allowBlur(!0)
                    }, this), CKEDITOR.env.iOS && (l.on("touchstart", function () {
                        clearTimeout(this._.hideTimeout)
                    }, this), l.on("touchend", function () {
                        this._.hideTimeout = 0, this.focus()
                    }, this)), CKEDITOR.event.useCapture = !1, this._.blurSet = 1), r.onEscape = CKEDITOR.tools.bind(function (e) {
                        if (this.onEscape && !1 === this.onEscape(e))return !1
                    }, this), CKEDITOR.tools.setTimeout(function () {
                        var e = CKEDITOR.tools.bind(function () {
                            var e = c;
                            if (e.removeStyle("width"), s.autoSize) {
                                var t = s.element.getDocument(),
                                    t = (CKEDITOR.env.webkit || CKEDITOR.env.edge ? s.element : t.getBody()).$.scrollWidth;
                                CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < t && (t += (e.$.offsetWidth || 0) - (e.$.clientWidth || 0) + 3), e.setStyle("width", t + 10 + "px"), t = s.element.$.scrollHeight, CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < t && (t += (e.$.offsetHeight || 0) - (e.$.clientHeight || 0) + 3), e.setStyle("height", t + "px"), r._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                            } else e.removeStyle("height");
                            f && (g -= c.$.offsetWidth), c.setStyle("left", g + "px");
                            var t = r.element.getWindow(), e = c.$.getBoundingClientRect(), t = t.getViewPaneSize(),
                                n = e.width || e.right - e.left, i = e.height || e.bottom - e.top,
                                o = f ? e.right : t.width - e.left, l = f ? t.width - e.right : e.left;
                            f ? o < n && (g = l > n ? g + n : t.width > n ? g - e.left : g - e.right + t.width) : o < n && (g = l > n ? g - n : t.width > n ? g - e.right + t.width : g - e.left), n = e.top, t.height - e.top < i && (m = n > i ? m - i : t.height > i ? m - e.bottom + t.height : m - e.top), CKEDITOR.env.ie && (t = e = new CKEDITOR.dom.element(c.$.offsetParent), "html" == t.getName() && (t = t.getDocument().getBody()), "rtl" == t.getComputedStyle("direction") && (g = CKEDITOR.env.ie8Compat ? g - 2 * c.getDocument().getDocumentElement().$.scrollLeft : g - (e.$.scrollWidth - e.$.clientWidth)));
                            var d, e = c.getFirst();
                            (d = e.getCustomData("activePanel")) && d.onHide && d.onHide.call(this, 1), e.setCustomData("activePanel", this), c.setStyles({
                                top: m + "px",
                                left: g + "px"
                            }), c.setOpacity(1), a && a()
                        }, this);
                        r.isLoaded ? e() : r.onLoad = e, CKEDITOR.tools.setTimeout(function () {
                            var e = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y;
                            this.focus(), s.element.focus(), CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = e), this.allowBlur(!0), CKEDITOR.env.ie ? CKEDITOR.tools.setTimeout(function () {
                                s.markFirstDisplayed ? s.markFirstDisplayed() : s._.markFirstDisplayed()
                            }, 0) : s.markFirstDisplayed ? s.markFirstDisplayed() : s._.markFirstDisplayed(), this._.editor.fire("panelShow", this)
                        }, 0, this)
                    }, CKEDITOR.env.air ? 200 : 0, this), this.visible = 1, this.onShow && this.onShow.call(this)
                }, reposition: function () {
                    var e = this._.showBlockParams;
                    this.visible && this._.showBlockParams && (this.hide(), this.showBlock.apply(this, e))
                }, focus: function () {
                    if (CKEDITOR.env.webkit) {
                        var e = CKEDITOR.document.getActive();
                        e && !e.equals(this._.iframe) && e.$.blur()
                    }
                    (this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus()
                }, blur: function () {
                    var e = this._.iframe.getFrameDocument().getActive();
                    e && e.is("a") && (this._.lastFocused = e)
                }, hide: function (e) {
                    !this.visible || this.onHide && !0 === this.onHide.call(this) || (this.hideChild(), CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur(), this.element.setStyle("display", "none"), this.visible = 0, this.element.getFirst().removeCustomData("activePanel"), (e = e && this._.returnFocus) && (CKEDITOR.env.webkit && e.type && e.getWindow().$.focus(), e.focus()), delete this._.lastFocused, this._.showBlockParams = null, this._.editor.fire("panelHide", this))
                }, allowBlur: function (e) {
                    var t = this._.panel;
                    return void 0 !== e && (t.allowBlur = e), t.allowBlur
                }, showAsChild: function (e, t, n, i, o, a) {
                    this._.activeChild == e && e._.panel._.offsetParentId == n.getId() || (this.hideChild(), e.onHide = CKEDITOR.tools.bind(function () {
                        CKEDITOR.tools.setTimeout(function () {
                            this._.focused || this.hide()
                        }, 0, this)
                    }, this), this._.activeChild = e, this._.focused = !1, e.showBlock(t, n, i, o, a), this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function () {
                        e.element.getChild(0).$.style.cssText += ""
                    }, 100))
                }, hideChild: function (e) {
                    var t = this._.activeChild;
                    t && (delete t.onHide, delete this._.activeChild, t.hide(), e && this.focus())
                }
            }
        }), CKEDITOR.on("instanceDestroyed", function () {
            var e, n = CKEDITOR.tools.isEmpty(CKEDITOR.instances);
            for (e in t) {
                var i = t[e];
                n ? i.destroy() : i.element.hide()
            }
            n && (t = {})
        })
    }(),CKEDITOR.plugins.add("menu", {
        requires: "floatpanel", beforeInit: function (e) {
            for (var t = e.config.menu_groups.split(","), n = e._.menuGroups = {}, i = e._.menuItems = {}, o = 0; o < t.length; o++)n[t[o]] = o + 1;
            e.addMenuGroup = function (e, t) {
                n[e] = t || 100
            }, e.addMenuItem = function (e, t) {
                n[t.group] && (i[e] = new CKEDITOR.menuItem(this, e, t))
            }, e.addMenuItems = function (e) {
                for (var t in e)this.addMenuItem(t, e[t])
            }, e.getMenuItem = function (e) {
                return i[e]
            }, e.removeMenuItem = function (e) {
                delete i[e]
            }
        }
    }),function () {
        function e(e) {
            e.sort(function (e, t) {
                return e.group < t.group ? -1 : e.group > t.group ? 1 : e.order < t.order ? -1 : e.order > t.order ? 1 : 0
            })
        }

        var t = '<span class="cke_menuitem"><a id="{id}" class="cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href="{href}" title="{title}" tabindex="-1" _cke_focus=1 hidefocus="true" role="{role}" aria-label="{label}" aria-describedby="{id}_description" aria-haspopup="{hasPopup}" aria-disabled="{disabled}" {ariaChecked} draggable="false"';
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (t += ' onkeypress="return false;"'), CKEDITOR.env.gecko && (t += ' onblur="this.style.cssText = this.style.cssText;" ondragstart="return false;"');
        var t = t + ' onmouseover="CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout="CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},{index}); return false;">',
            n = CKEDITOR.addTemplate("menuItem", t + '<span class="cke_menubutton_inner"><span class="cke_menubutton_icon"><span class="cke_button_icon cke_button__{iconName}_icon" style="{iconStyle}"></span></span><span class="cke_menubutton_label">{label}</span>{shortcutHtml}{arrowHtml}</span></a><span id="{id}_description" class="cke_voice_label" aria-hidden="false">{ariaShortcut}</span></span>'),
            i = CKEDITOR.addTemplate("menuArrow", '<span class="cke_menuarrow"><span>{label}</span></span>'),
            o = CKEDITOR.addTemplate("menuShortcut", '<span class="cke_menubutton_label cke_menubutton_shortcut">{shortcut}</span>');
        CKEDITOR.menu = CKEDITOR.tools.createClass({
            $: function (e, t) {
                t = this._.definition = t || {}, this.id = CKEDITOR.tools.getNextId(), this.editor = e, this.items = [], this._.listeners = [], this._.level = t.level || 1;
                var n = CKEDITOR.tools.extend({}, t.panel, {
                    css: [CKEDITOR.skin.getPath("editor")],
                    level: this._.level - 1,
                    block: {}
                }), i = n.block.attributes = n.attributes || {};
                !i.role && (i.role = "menu"), this._.panelDefinition = n
            }, _: {
                onShow: function () {
                    var e = this.editor.getSelection(), t = e && e.getStartElement(), n = this.editor.elementPath(),
                        i = this._.listeners;
                    this.removeAll();
                    for (var o = 0; o < i.length; o++) {
                        var a = i[o](t, e, n);
                        if (a)for (var r in a) {
                            var s = this.editor.getMenuItem(r);
                            !s || s.command && !this.editor.getCommand(s.command).state || (s.state = a[r], this.add(s))
                        }
                    }
                }, onClick: function (e) {
                    this.hide(), e.onClick ? e.onClick() : e.command && this.editor.execCommand(e.command)
                }, onEscape: function (e) {
                    var t = this.parent;
                    return t ? t._.panel.hideChild(1) : 27 == e && this.hide(1), !1
                }, onHide: function () {
                    this.onHide && this.onHide()
                }, showSubMenu: function (e) {
                    var t = this._.subMenu, n = this.items[e];
                    if (n = n.getItems && n.getItems()) {
                        t ? t.removeAll() : (t = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, {level: this._.level + 1}, !0)), t.parent = this, t._.onClick = CKEDITOR.tools.bind(this._.onClick, this));
                        for (var i in n) {
                            var o = this.editor.getMenuItem(i);
                            o && (o.state = n[i], t.add(o))
                        }
                        var a = this._.panel.getBlock(this.id).element.getDocument().getById(this.id + String(e));
                        setTimeout(function () {
                            t.show(a, 2)
                        }, 0)
                    } else this._.panel.hideChild(1)
                }
            }, proto: {
                add: function (e) {
                    e.order || (e.order = this.items.length), this.items.push(e)
                }, removeAll: function () {
                    this.items = []
                }, show: function (t, n, i, o) {
                    if (this.parent || (this._.onShow(), this.items.length)) {
                        n = n || ("rtl" == this.editor.lang.dir ? 2 : 1);
                        var a = this.items, r = this.editor, s = this._.panel, l = this._.element;
                        if (!s) {
                            s = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level), s.onEscape = CKEDITOR.tools.bind(function (e) {
                                if (!1 === this._.onEscape(e))return !1
                            }, this), s.onShow = function () {
                                s._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all")
                            }, s.onHide = CKEDITOR.tools.bind(function () {
                                this._.onHide && this._.onHide()
                            }, this), l = s.addBlock(this.id, this._.panelDefinition.block), l.autoSize = !0;
                            var c = l.keys;
                            c[40] = "next", c[9] = "next", c[38] = "prev", c[CKEDITOR.SHIFT + 9] = "prev", c["rtl" == r.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click", c[32] = CKEDITOR.env.ie ? "mouseup" : "click", CKEDITOR.env.ie && (c[13] = "mouseup"), l = this._.element = l.element, c = l.getDocument(), c.getBody().setStyle("overflow", "hidden"), c.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden"), this._.itemOverFn = CKEDITOR.tools.addFunction(function (e) {
                                clearTimeout(this._.showSubTimeout), this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, r.config.menu_subMenuDelay || 400, this, [e])
                            }, this), this._.itemOutFn = CKEDITOR.tools.addFunction(function () {
                                clearTimeout(this._.showSubTimeout)
                            }, this), this._.itemClickFn = CKEDITOR.tools.addFunction(function (e) {
                                var t = this.items[e];
                                t.state == CKEDITOR.TRISTATE_DISABLED ? this.hide(1) : t.getItems ? this._.showSubMenu(e) : this._.onClick(t)
                            }, this)
                        }
                        e(a);
                        for (var c = r.elementPath(), c = ['<div class="cke_menu' + (c && c.direction() != r.lang.dir ? " cke_mixed_dir_content" : "") + '" role="presentation">'], d = a.length, u = d && a[0].group, h = 0; h < d; h++) {
                            var f = a[h];
                            u != f.group && (c.push('<div class="cke_menuseparator" role="separator"></div>'), u = f.group), f.render(this, h, c)
                        }
                        c.push("</div>"), l.setHtml(c.join("")), CKEDITOR.ui.fire("ready", this), this.parent ? this.parent._.panel.showAsChild(s, this.id, t, n, i, o) : s.showBlock(this.id, t, n, i, o), r.fire("menuShow", [s])
                    }
                }, addListener: function (e) {
                    this._.listeners.push(e)
                }, hide: function (e) {
                    this._.onHide && this._.onHide(), this._.panel && this._.panel.hide(e)
                }, findItemByCommandName: function (e) {
                    var t = CKEDITOR.tools.array.filter(this.items, function (t) {
                        return e === t.command
                    });
                    return t.length ? (t = t[0], {item: t, element: this._.element.findOne("." + t.className)}) : null
                }
            }
        }), CKEDITOR.menuItem = CKEDITOR.tools.createClass({
            $: function (e, t, n) {
                CKEDITOR.tools.extend(this, n, {
                    order: 0,
                    className: "cke_menubutton__" + t
                }), this.group = e._.menuGroups[this.group], this.editor = e, this.name = t
            }, proto: {
                render: function (e, t, a) {
                    var r, s, l = e.id + String(t), c = void 0 === this.state ? CKEDITOR.TRISTATE_OFF : this.state,
                        d = "", u = this.editor,
                        h = c == CKEDITOR.TRISTATE_ON ? "on" : c == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off";
                    this.role in {
                        menuitemcheckbox: 1,
                        menuitemradio: 1
                    } && (d = ' aria-checked="' + (c == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"');
                    var f = this.getItems, g = "&#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";",
                        m = this.name;
                    this.icon && !/\./.test(this.icon) && (m = this.icon), this.command && (r = u.getCommand(this.command), (r = u.getCommandKeystroke(r)) && (s = CKEDITOR.tools.keystrokeToString(u.lang.common.keyboard, r))), e = {
                        id: l,
                        name: this.name,
                        iconName: m,
                        label: this.label,
                        cls: this.className || "",
                        state: h,
                        hasPopup: f ? "true" : "false",
                        disabled: c == CKEDITOR.TRISTATE_DISABLED,
                        title: this.label + (s ? " (" + s.display + ")" : ""),
                        ariaShortcut: s ? u.lang.common.keyboardShortcut + " " + s.aria : "",
                        href: "javascript:void('" + (this.label || "").replace("'") + "')",
                        hoverFn: e._.itemOverFn,
                        moveOutFn: e._.itemOutFn,
                        clickFn: e._.itemClickFn,
                        index: t,
                        iconStyle: CKEDITOR.skin.getIconStyle(m, "rtl" == this.editor.lang.dir, m == this.icon ? null : this.icon, this.iconOffset),
                        shortcutHtml: s ? o.output({shortcut: s.display}) : "",
                        arrowHtml: f ? i.output({label: g}) : "",
                        role: this.role ? this.role : "menuitem",
                        ariaChecked: d
                    }, n.output(e, a)
                }
            }
        })
    }(),CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div",CKEDITOR.plugins.add("contextmenu", {
        requires: "menu",
        onLoad: function () {
            CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                base: CKEDITOR.menu, $: function (e) {
                    this.base.call(this, e, {
                        panel: {
                            className: "cke_menu_panel",
                            attributes: {"aria-label": e.lang.contextmenu.options}
                        }
                    })
                }, proto: {
                    addTarget: function (e, t) {
                        if (e.on("contextmenu", function (e) {
                                e = e.data;
                                var i = CKEDITOR.env.webkit ? n : CKEDITOR.env.mac ? e.$.metaKey : e.$.ctrlKey;
                                if (!t || !i) {
                                    if (e.preventDefault(), CKEDITOR.env.mac && CKEDITOR.env.webkit) {
                                        var i = this.editor,
                                            o = new CKEDITOR.dom.elementPath(e.getTarget(), i.editable()).contains(function (e) {
                                                return e.hasAttribute("contenteditable")
                                            }, !0);
                                        o && "false" == o.getAttribute("contenteditable") && i.getSelection().fake(o)
                                    }
                                    var o = e.getTarget().getDocument(),
                                        a = e.getTarget().getDocument().getDocumentElement(),
                                        i = !o.equals(CKEDITOR.document), o = o.getWindow().getScrollPosition(),
                                        r = i ? e.$.clientX : e.$.pageX || o.x + e.$.clientX,
                                        s = i ? e.$.clientY : e.$.pageY || o.y + e.$.clientY;
                                    CKEDITOR.tools.setTimeout(function () {
                                        this.open(a, null, r, s)
                                    }, CKEDITOR.env.ie ? 200 : 0, this)
                                }
                            }, this), CKEDITOR.env.webkit) {
                            var n, i = function () {
                                n = 0
                            };
                            e.on("keydown", function (e) {
                                n = CKEDITOR.env.mac ? e.data.$.metaKey : e.data.$.ctrlKey
                            }), e.on("keyup", i), e.on("contextmenu", i)
                        }
                    }, open: function (e, t, n, i) {
                        !1 !== this.editor.config.enableContextMenu && (this.editor.focus(), e = e || CKEDITOR.document.getDocumentElement(), this.editor.selectionChange(1), this.show(e, t, n, i))
                    }
                }
            })
        },
        beforeInit: function (e) {
            var t = e.contextMenu = new CKEDITOR.plugins.contextMenu(e);
            e.on("contentDom", function () {
                t.addTarget(e.editable(), !1 !== e.config.browserContextMenuOnCtrl)
            }), e.addCommand("contextMenu", {
                exec: function () {
                    e.contextMenu.open(e.document.getBody())
                }
            }), e.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu"), e.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
        }
    }),function () {
        function e(e, n) {
            function o(t) {
                t = l.list[t];
                var n;
                t.equals(e.editable()) || "true" == t.getAttribute("contenteditable") ? (n = e.createRange(), n.selectNodeContents(t), n = n.select()) : (n = e.getSelection(), n.selectElement(t)), CKEDITOR.env.ie && e.fire("selectionChange", {
                    selection: n,
                    path: new CKEDITOR.dom.elementPath(t)
                }), e.focus()
            }

            function a() {
                r && r.setHtml('<span class="cke_path_empty">&nbsp;</span>'), delete l.list
            }

            var r, s = e.ui.spaceId("path"), l = e._.elementsPath, c = l.idBase;
            n.html += '<span id="' + s + '_label" class="cke_voice_label">' + e.lang.elementspath.eleLabel + '</span><span id="' + s + '" class="cke_path" role="group" aria-labelledby="' + s + '_label"><span class="cke_path_empty">&nbsp;</span></span>', e.on("uiReady", function () {
                var t = e.ui.space("path");
                t && e.focusManager.add(t, 1)
            }), l.onClick = o;
            var d = CKEDITOR.tools.addFunction(o), u = CKEDITOR.tools.addFunction(function (t, n) {
                var i, a = l.idBase;
                switch (n = new CKEDITOR.dom.event(n), i = "rtl" == e.lang.dir, n.getKeystroke()) {
                    case i ? 39 : 37:
                    case 9:
                        return (i = CKEDITOR.document.getById(a + (t + 1))) || (i = CKEDITOR.document.getById(a + "0")), i.focus(), !1;
                    case i ? 37 : 39:
                    case CKEDITOR.SHIFT + 9:
                        return (i = CKEDITOR.document.getById(a + (t - 1))) || (i = CKEDITOR.document.getById(a + (l.list.length - 1))), i.focus(), !1;
                    case 27:
                        return e.focus(), !1;
                    case 13:
                    case 32:
                        return o(t), !1
                }
                return !0
            });
            e.on("selectionChange", function (t) {
                for (var n = [], o = l.list = [], a = [], h = l.filters, f = !0, g = t.data.path.elements, m = g.length; m--;) {
                    var E = g[m], p = 0;
                    t = E.data("cke-display-name") ? E.data("cke-display-name") : E.data("cke-real-element-type") ? E.data("cke-real-element-type") : E.getName(), (f = E.hasAttribute("contenteditable") ? "true" == E.getAttribute("contenteditable") : f) || E.hasAttribute("contenteditable") || (p = 1);
                    for (var T = 0; T < h.length; T++) {
                        var C = h[T](E, t);
                        if (!1 === C) {
                            p = 1;
                            break
                        }
                        t = C || t
                    }
                    p || (o.unshift(E), a.unshift(t))
                }
                for (o = o.length, h = 0; h < o; h++)t = a[h], f = e.lang.elementspath.eleTitle.replace(/%1/, t), t = i.output({
                    id: c + h,
                    label: f,
                    text: t,
                    jsTitle: "javascript:void('" + t + "')",
                    index: h,
                    keyDownFn: u,
                    clickFn: d
                }), n.unshift(t);
                r || (r = CKEDITOR.document.getById(s)), a = r, a.setHtml(n.join("") + '<span class="cke_path_empty">&nbsp;</span>'), e.fire("elementsPathUpdate", {space: a})
            }), e.on("readOnly", a), e.on("contentDomUnload", a), e.addCommand("elementsPathFocus", t.toolbarFocus),
                e.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
        }

        var t = {
            toolbarFocus: {
                editorFocus: !1, readOnly: 1, exec: function (e) {
                    (e = CKEDITOR.document.getById(e._.elementsPath.idBase + "0")) && e.focus(CKEDITOR.env.ie || CKEDITOR.env.air)
                }
            }
        }, n = "";
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (n += ' onkeypress="return false;"'), CKEDITOR.env.gecko && (n += ' onblur="this.style.cssText = this.style.cssText;"');
        var i = CKEDITOR.addTemplate("pathItem", '<a id="{id}" href="{jsTitle}" tabindex="-1" class="cke_path_item" title="{label}"' + n + ' hidefocus="true"  onkeydown="return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick="CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role="button" aria-label="{label}">{text}</a>');
        CKEDITOR.plugins.add("elementspath", {
            init: function (t) {
                t._.elementsPath = {
                    idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_",
                    filters: []
                }, t.on("uiSpace", function (n) {
                    "bottom" == n.data.space && e(t, n.data)
                })
            }
        })
    }(),function () {
        function e(e, i) {
            var o, a;
            i.on("refresh", function (e) {
                var i, o = [t];
                for (i in e.data.states)o.push(e.data.states[i]);
                this.setState(CKEDITOR.tools.search(o, n) ? n : t)
            }, i, null, 100), i.on("exec", function (t) {
                o = e.getSelection(), a = o.createBookmarks(1), t.data || (t.data = {}), t.data.done = !1
            }, i, null, 0), i.on("exec", function () {
                e.forceNextSelectionCheck(), o.selectBookmarks(a)
            }, i, null, 100)
        }

        var t = CKEDITOR.TRISTATE_DISABLED, n = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indent", {
            init: function (t) {
                var n = CKEDITOR.plugins.indent.genericDefinition;
                e(t, t.addCommand("indent", new n(!0))), e(t, t.addCommand("outdent", new n)), t.ui.addButton && (t.ui.addButton("Indent", {
                    label: t.lang.indent.indent,
                    command: "indent",
                    directional: !0,
                    toolbar: "indent,20"
                }), t.ui.addButton("Outdent", {
                    label: t.lang.indent.outdent,
                    command: "outdent",
                    directional: !0,
                    toolbar: "indent,10"
                })), t.on("dirChanged", function (e) {
                    var n = t.createRange(), i = e.data.node;
                    n.setStartBefore(i), n.setEndAfter(i);
                    for (var o, a = new CKEDITOR.dom.walker(n); o = a.next();)if (o.type == CKEDITOR.NODE_ELEMENT)if (!o.equals(i) && o.getDirection()) n.setStartAfter(o), a = new CKEDITOR.dom.walker(n); else {
                        var r = t.config.indentClasses;
                        if (r)for (var s = "ltr" == e.data.dir ? ["_rtl", ""] : ["", "_rtl"], l = 0; l < r.length; l++)o.hasClass(r[l] + s[0]) && (o.removeClass(r[l] + s[0]), o.addClass(r[l] + s[1]));
                        r = o.getStyle("margin-right"), s = o.getStyle("margin-left"), r ? o.setStyle("margin-left", r) : o.removeStyle("margin-left"), s ? o.setStyle("margin-right", s) : o.removeStyle("margin-right")
                    }
                })
            }
        }), CKEDITOR.plugins.indent = {
            genericDefinition: function (e) {
                this.isIndent = !!e, this.startDisabled = !this.isIndent
            }, specificDefinition: function (e, t, n) {
                this.name = t, this.editor = e, this.jobs = {}, this.enterBr = e.config.enterMode == CKEDITOR.ENTER_BR, this.isIndent = !!n, this.relatedGlobal = n ? "indent" : "outdent", this.indentKey = n ? 9 : CKEDITOR.SHIFT + 9, this.database = {}
            }, registerCommands: function (e, t) {
                e.on("pluginsLoaded", function () {
                    for (var e in t)!function (e, t) {
                        var n, i = e.getCommand(t.relatedGlobal);
                        for (n in t.jobs)i.on("exec", function (i) {
                            i.data.done || (e.fire("lockSnapshot"), t.execJob(e, n) && (i.data.done = !0), e.fire("unlockSnapshot"), CKEDITOR.dom.element.clearAllMarkers(t.database))
                        }, this, null, n), i.on("refresh", function (i) {
                            i.data.states || (i.data.states = {}), i.data.states[t.name + "@" + n] = t.refreshJob(e, n, i.data.path)
                        }, this, null, n);
                        e.addFeature(t)
                    }(this, t[e])
                })
            }
        }, CKEDITOR.plugins.indent.genericDefinition.prototype = {
            context: "p", exec: function () {
            }
        }, CKEDITOR.plugins.indent.specificDefinition.prototype = {
            execJob: function (e, n) {
                var i = this.jobs[n];
                if (i.state != t)return i.exec.call(this, e)
            }, refreshJob: function (e, n, i) {
                return n = this.jobs[n], e.activeFilter.checkFeature(this) ? n.state = n.refresh.call(this, e, i) : n.state = t, n.state
            }, getContext: function (e) {
                return e.contains(this.context)
            }
        }
    }(),function () {
        function e(e) {
            for (var i, o = this, a = this.database, r = this.context, s = e.getSelection(), s = (s && s.getRanges()).createIterator(); i = s.getNextRange();) {
                for (var l = i.getCommonAncestor(); l && (l.type != CKEDITOR.NODE_ELEMENT || !r[l.getName()]);) {
                    if (e.editable().equals(l)) {
                        l = !1;
                        break
                    }
                    l = l.getParent()
                }
                if (l || (l = i.startPath().contains(r)) && i.setEndAt(l, CKEDITOR.POSITION_BEFORE_END), !l) {
                    var c = i.getEnclosedNode();
                    c && c.type == CKEDITOR.NODE_ELEMENT && c.getName() in r && (i.setStartAt(c, CKEDITOR.POSITION_AFTER_START), i.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), l = c)
                }
                if (l && i.startContainer.type == CKEDITOR.NODE_ELEMENT && i.startContainer.getName() in r && (c = new CKEDITOR.dom.walker(i), c.evaluator = t, i.startContainer = c.next()), l && i.endContainer.type == CKEDITOR.NODE_ELEMENT && i.endContainer.getName() in r && (c = new CKEDITOR.dom.walker(i), c.evaluator = t, i.endContainer = c.previous()), l)return function (t) {
                    for (var s = i.startContainer, l = i.endContainer; s && !s.getParent().equals(t);)s = s.getParent();
                    for (; l && !l.getParent().equals(t);)l = l.getParent();
                    if (!s || !l)return !1;
                    for (var c = [], d = !1; !d;)s.equals(l) && (d = !0), c.push(s), s = s.getNext();
                    if (1 > c.length)return !1;
                    for (s = t.getParents(!0), l = 0; l < s.length; l++)if (s[l].getName && r[s[l].getName()]) {
                        t = s[l];
                        break
                    }
                    for (var s = o.isIndent ? 1 : -1, l = c[0], c = c[c.length - 1], d = CKEDITOR.plugins.list.listToArray(t, a), u = d[c.getCustomData("listarray_index")].indent, l = l.getCustomData("listarray_index"); l <= c.getCustomData("listarray_index"); l++)if (d[l].indent += s, 0 < s) {
                        for (var h = d[l].parent, f = l - 1; 0 <= f; f--)if (d[f].indent === s) {
                            h = d[f].parent;
                            break
                        }
                        d[l].parent = new CKEDITOR.dom.element(h.getName(), h.getDocument())
                    }
                    for (l = c.getCustomData("listarray_index") + 1; l < d.length && d[l].indent > u; l++)d[l].indent += s;
                    if (s = CKEDITOR.plugins.list.arrayToList(d, a, null, e.config.enterMode, t.getDirection()), !o.isIndent) {
                        var g;
                        if ((g = t.getParent()) && g.is("li"))for (var m, c = s.listNode.getChildren(), E = [], l = c.count() - 1; 0 <= l; l--)(m = c.getItem(l)) && m.is && m.is("li") && E.push(m)
                    }
                    if (s && s.listNode.replace(t), E && E.length)for (l = 0; l < E.length; l++) {
                        for (m = t = E[l]; (m = m.getNext()) && m.is && m.getName() in r;)CKEDITOR.env.needsNbspFiller && !t.getFirst(n) && t.append(i.document.createText(" ")), t.append(m);
                        t.insertAfter(g)
                    }
                    return s && e.fire("contentDomInvalidated"), !0
                }(l)
            }
            return 0
        }

        function t(e) {
            return e.type == CKEDITOR.NODE_ELEMENT && e.is("li")
        }

        function n(e) {
            return i(e) && o(e)
        }

        var i = CKEDITOR.dom.walker.whitespaces(!0), o = CKEDITOR.dom.walker.bookmark(!1, !0),
            a = CKEDITOR.TRISTATE_DISABLED, r = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indentlist", {
            requires: "indent", init: function (t) {
                function n(t) {
                    i.specificDefinition.apply(this, arguments), this.requiredContent = ["ul", "ol"], t.on("key", function (e) {
                        var n = t.elementPath();
                        if ("wysiwyg" == t.mode && e.data.keyCode == this.indentKey && n) {
                            var i = this.getContext(n);
                            !i || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context, n, i) || (t.execCommand(this.relatedGlobal), e.cancel())
                        }
                    }, this), this.jobs[this.isIndent ? 10 : 30] = {
                        refresh: this.isIndent ? function (e, t) {
                            var n = this.getContext(t),
                                i = CKEDITOR.plugins.indentList.firstItemInPath(this.context, t, n);
                            return n && this.isIndent && !i ? r : a
                        } : function (e, t) {
                            return !this.getContext(t) || this.isIndent ? a : r
                        }, exec: CKEDITOR.tools.bind(e, this)
                    }
                }

                var i = CKEDITOR.plugins.indent;
                i.registerCommands(t, {
                    indentlist: new n(t, "indentlist", !0),
                    outdentlist: new n(t, "outdentlist")
                }), CKEDITOR.tools.extend(n.prototype, i.specificDefinition.prototype, {context: {ol: 1, ul: 1}})
            }
        }), CKEDITOR.plugins.indentList = {}, CKEDITOR.plugins.indentList.firstItemInPath = function (e, n, i) {
            var o = n.contains(t);
            return i || (i = n.contains(e)), i && o && o.equals(i.getFirst(t))
        }
    }(),function () {
        function e(e, t, n) {
            function i(n) {
                !(l = d[n ? "getFirst" : "getLast"]()) || l.is && l.isBlockBoundary() || !(c = t.root[n ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) || c.is && c.isBlockBoundary({br: 1}) || e.document.createElement("br")[n ? "insertBefore" : "insertAfter"](l)
            }

            for (var o = CKEDITOR.plugins.list.listToArray(t.root, n), a = [], r = 0; r < t.contents.length; r++) {
                var s = t.contents[r];
                (s = s.getAscendant("li", !0)) && !s.getCustomData("list_item_processed") && (a.push(s), CKEDITOR.dom.element.setMarker(n, s, "list_item_processed", !0))
            }
            for (s = null, r = 0; r < a.length; r++)s = a[r].getCustomData("listarray_index"), o[s].indent = -1;
            for (r = s + 1; r < o.length; r++)if (o[r].indent > o[r - 1].indent + 1) {
                for (a = o[r - 1].indent + 1 - o[r].indent, s = o[r].indent; o[r] && o[r].indent >= s;)o[r].indent += a, r++;
                r--
            }
            var l, c,
                d = CKEDITOR.plugins.list.arrayToList(o, n, null, e.config.enterMode, t.root.getAttribute("dir")).listNode;
            i(!0), i(), d.replace(t.root), e.fire("contentDomInvalidated")
        }

        function t(e, t) {
            this.name = e, this.context = this.type = t, this.allowedContent = t + " li", this.requiredContent = t
        }

        function n(e, t, n, i) {
            for (var o, a; o = e[i ? "getLast" : "getFirst"](f);)(a = o.getDirection(1)) !== t.getDirection(1) && o.setAttribute("dir", a), o.remove(), n ? o[i ? "insertBefore" : "insertAfter"](n) : t.append(o, i)
        }

        function i(e) {
            function t(t) {
                var i = e[t ? "getPrevious" : "getNext"](d);
                i && i.type == CKEDITOR.NODE_ELEMENT && i.is(e.getName()) && (n(e, i, null, !t), e.remove(), e = i)
            }

            t(), t(1)
        }

        function o(e) {
            return e.type == CKEDITOR.NODE_ELEMENT && (e.getName() in CKEDITOR.dtd.$block || e.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[e.getName()]["#"]
        }

        function a(e, t, o) {
            e.fire("saveSnapshot"), o.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
            var a = o.extractContents();
            t.trim(!1, !0);
            var s = t.createBookmark(), l = new CKEDITOR.dom.elementPath(t.startContainer), c = l.block,
                l = l.lastElement.getAscendant("li", 1) || c, h = new CKEDITOR.dom.elementPath(o.startContainer),
                f = h.contains(CKEDITOR.dtd.$listItem), h = h.contains(CKEDITOR.dtd.$list);
            for (c ? (c = c.getBogus()) && c.remove() : h && (c = h.getPrevious(d)) && u(c) && c.remove(), (c = a.getLast()) && c.type == CKEDITOR.NODE_ELEMENT && c.is("br") && c.remove(), (c = t.startContainer.getChild(t.startOffset)) ? a.insertBefore(c) : t.startContainer.append(a), f && (a = r(f)) && (l.contains(f) ? (n(a, f.getParent(), f), a.remove()) : l.append(a)); o.checkStartOfBlock() && o.checkEndOfBlock() && (h = o.startPath(), a = h.block);)a.is("li") && (l = a.getParent(), a.equals(l.getLast(d)) && a.equals(l.getFirst(d)) && (a = l)), o.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START), a.remove();
            o = o.clone(), a = e.editable(), o.setEndAt(a, CKEDITOR.POSITION_BEFORE_END), o = new CKEDITOR.dom.walker(o), o.evaluator = function (e) {
                return d(e) && !u(e)
            }, (o = o.next()) && o.type == CKEDITOR.NODE_ELEMENT && o.getName() in CKEDITOR.dtd.$list && i(o), t.moveToBookmark(s), t.select(), e.fire("saveSnapshot")
        }

        function r(e) {
            return (e = e.getLast(d)) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in s ? e : null
        }

        var s = {ol: 1, ul: 1}, l = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(),
            d = function (e) {
                return !(l(e) || c(e))
            }, u = CKEDITOR.dom.walker.bogus();
        CKEDITOR.plugins.list = {
            listToArray: function (e, t, n, i, o) {
                if (!s[e.getName()])return [];
                i || (i = 0), n || (n = []);
                for (var a = 0, r = e.getChildCount(); a < r; a++) {
                    var l = e.getChild(a);
                    if (l.type == CKEDITOR.NODE_ELEMENT && l.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(l, t, n, i + 1), "li" == l.$.nodeName.toLowerCase()) {
                        var c = {parent: e, indent: i, element: l, contents: []};
                        o ? c.grandparent = o : (c.grandparent = e.getParent(), c.grandparent && "li" == c.grandparent.$.nodeName.toLowerCase() && (c.grandparent = c.grandparent.getParent())), t && CKEDITOR.dom.element.setMarker(t, l, "listarray_index", n.length), n.push(c);
                        for (var d, u = 0, h = l.getChildCount(); u < h; u++)d = l.getChild(u), d.type == CKEDITOR.NODE_ELEMENT && s[d.getName()] ? CKEDITOR.plugins.list.listToArray(d, t, n, i + 1, c.grandparent) : c.contents.push(d)
                    }
                }
                return n
            }, arrayToList: function (e, t, n, i, o) {
                if (n || (n = 0), !e || e.length < n + 1)return null;
                for (var a, r, l, u = e[n].parent.getDocument(), h = new CKEDITOR.dom.documentFragment(u), f = null, g = n, m = Math.max(e[n].indent, 0), E = null, p = i == CKEDITOR.ENTER_P ? "p" : "div"; ;) {
                    var T = e[g];
                    if (a = T.grandparent, r = T.element.getDirection(1), T.indent == m) {
                        for (f && e[g].parent.getName() == f.getName() || (f = e[g].parent.clone(!1, 1), o && f.setAttribute("dir", o), h.append(f)), E = f.append(T.element.clone(0, 1)), r != f.getDirection(1) && E.setAttribute("dir", r), a = 0; a < T.contents.length; a++)E.append(T.contents[a].clone(1, 1));
                        g++
                    } else if (T.indent == Math.max(m, 0) + 1) T = e[g - 1].element.getDirection(1), g = CKEDITOR.plugins.list.arrayToList(e, null, g, i, T != r ? r : null), !E.getChildCount() && CKEDITOR.env.needsNbspFiller && 7 >= u.$.documentMode && E.append(u.createText(" ")), E.append(g.listNode), g = g.nextIndex; else {
                        if (-1 != T.indent || n || !a)return null;
                        s[a.getName()] ? (E = T.element.clone(!1, !0), r != a.getDirection(1) && E.setAttribute("dir", r)) : E = new CKEDITOR.dom.documentFragment(u);
                        var C, I, f = a.getDirection(1) != r, O = T.element, D = O.getAttribute("class"),
                            R = O.getAttribute("style"),
                            v = E.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (i != CKEDITOR.ENTER_BR || f || R || D),
                            b = T.contents.length;
                        for (a = 0; a < b; a++)if (C = T.contents[a], c(C) && 1 < b) v ? I = C.clone(1, 1) : E.append(C.clone(1, 1)); else if (C.type == CKEDITOR.NODE_ELEMENT && C.isBlockBoundary()) {
                            f && !C.getDirection() && C.setAttribute("dir", r), l = C;
                            var y = O.getAttribute("style");
                            y && l.setAttribute("style", y.replace(/([^;])$/, "$1;") + (l.getAttribute("style") || "")), D && C.addClass(D), l = null, I && (E.append(I), I = null), E.append(C.clone(1, 1))
                        } else v ? (l || (l = u.createElement(p), E.append(l), f && l.setAttribute("dir", r)), R && l.setAttribute("style", R), D && l.setAttribute("class", D), I && (l.append(I), I = null), l.append(C.clone(1, 1))) : E.append(C.clone(1, 1));
                        I && ((l || E).append(I), I = null), E.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && g != e.length - 1 && (CKEDITOR.env.needsBrFiller && (r = E.getLast()) && r.type == CKEDITOR.NODE_ELEMENT && r.is("br") && r.remove(), (r = E.getLast(d)) && r.type == CKEDITOR.NODE_ELEMENT && r.is(CKEDITOR.dtd.$block) || E.append(u.createElement("br"))), r = E.$.nodeName.toLowerCase(), "div" != r && "p" != r || E.appendBogus(), h.append(E), f = null, g++
                    }
                    if (l = null, e.length <= g || Math.max(e[g].indent, 0) < m)break
                }
                if (t)for (e = h.getFirst(); e;) {
                    if (e.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(t, e), e.getName() in CKEDITOR.dtd.$listItem && (n = e, u = o = i = void 0, i = n.getDirection()))) {
                        for (o = n.getParent(); o && !(u = o.getDirection());)o = o.getParent();
                        i == u && n.removeAttribute("dir")
                    }
                    e = e.getNextSourceNode()
                }
                return {listNode: h, nextIndex: g}
            }
        };
        var h = /^h[1-6]$/, f = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
        t.prototype = {
            exec: function (t) {
                this.refresh(t, t.elementPath());
                var n = t.config, o = t.getSelection(), a = o && o.getRanges();
                if (this.state == CKEDITOR.TRISTATE_OFF) {
                    var r = t.editable();
                    if (r.getFirst(d)) {
                        var l = 1 == a.length && a[0];
                        (n = l && l.getEnclosedNode()) && n.is && this.type == n.getName() && this.setState(CKEDITOR.TRISTATE_ON)
                    } else n.enterMode == CKEDITOR.ENTER_BR ? r.appendBogus() : a[0].fixBlock(1, n.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), o.selectRanges(a)
                }
                for (var n = o.createBookmarks(!0), r = [], c = {}, a = a.createIterator(), u = 0; (l = a.getNextRange()) && ++u;) {
                    var f = l.getBoundaryNodes(), g = f.startNode, m = f.endNode;
                    for (g.type == CKEDITOR.NODE_ELEMENT && "td" == g.getName() && l.setStartAt(f.startNode, CKEDITOR.POSITION_AFTER_START), m.type == CKEDITOR.NODE_ELEMENT && "td" == m.getName() && l.setEndAt(f.endNode, CKEDITOR.POSITION_BEFORE_END), l = l.createIterator(), l.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; f = l.getNextParagraph();)if (!f.getCustomData("list_block")) {
                        CKEDITOR.dom.element.setMarker(c, f, "list_block", 1);
                        for (var E, p = t.elementPath(f), g = p.elements, m = 0, p = p.blockLimit, T = g.length - 1; 0 <= T && (E = g[T]); T--)if (s[E.getName()] && p.contains(E)) {
                            p.removeCustomData("list_group_object_" + u), (g = E.getCustomData("list_group_object")) ? g.contents.push(f) : (g = {
                                root: E,
                                contents: [f]
                            }, r.push(g), CKEDITOR.dom.element.setMarker(c, E, "list_group_object", g)), m = 1;
                            break
                        }
                        m || (m = p, m.getCustomData("list_group_object_" + u) ? m.getCustomData("list_group_object_" + u).contents.push(f) : (g = {
                            root: m,
                            contents: [f]
                        }, CKEDITOR.dom.element.setMarker(c, m, "list_group_object_" + u, g), r.push(g)))
                    }
                }
                for (E = []; 0 < r.length;)if (g = r.shift(), this.state == CKEDITOR.TRISTATE_OFF)if (s[g.root.getName()]) {
                    for (a = t, u = g, g = c, l = E, m = CKEDITOR.plugins.list.listToArray(u.root, g), p = [], f = 0; f < u.contents.length; f++)T = u.contents[f], (T = T.getAscendant("li", !0)) && !T.getCustomData("list_item_processed") && (p.push(T), CKEDITOR.dom.element.setMarker(g, T, "list_item_processed", !0));
                    for (var T = u.root.getDocument(), C = void 0, I = void 0, f = 0; f < p.length; f++) {
                        var O = p[f].getCustomData("listarray_index"), C = m[O].parent;
                        C.is(this.type) || (I = T.createElement(this.type), C.copyAttributes(I, {
                            start: 1,
                            type: 1
                        }), I.removeStyle("list-style-type"), m[O].parent = I)
                    }
                    for (g = CKEDITOR.plugins.list.arrayToList(m, g, null, a.config.enterMode), m = void 0, p = g.listNode.getChildCount(), f = 0; f < p && (m = g.listNode.getChild(f)); f++)m.getName() == this.type && l.push(m);
                    g.listNode.replace(u.root), a.fire("contentDomInvalidated")
                } else {
                    for (m = t, l = g, f = E, p = l.contents, a = l.root.getDocument(), u = [], 1 == p.length && p[0].equals(l.root) && (g = a.createElement("div"), p[0].moveChildren && p[0].moveChildren(g), p[0].append(g), p[0] = g), l = l.contents[0].getParent(), T = 0; T < p.length; T++)l = l.getCommonAncestor(p[T].getParent());
                    for (C = m.config.useComputedState, m = g = void 0, C = void 0 === C || C, T = 0; T < p.length; T++)for (I = p[T]; O = I.getParent();) {
                        if (O.equals(l)) {
                            u.push(I), !m && I.getDirection() && (m = 1), I = I.getDirection(C), null !== g && (g = g && g != I ? null : I);
                            break
                        }
                        I = O
                    }
                    if (!(1 > u.length)) {
                        for (p = u[u.length - 1].getNext(), T = a.createElement(this.type), f.push(T), C = f = void 0; u.length;)f = u.shift(), C = a.createElement("li"), I = f, I.is("pre") || h.test(I.getName()) || "false" == I.getAttribute("contenteditable") ? f.appendTo(C) : (f.copyAttributes(C), g && f.getDirection() && (C.removeStyle("direction"), C.removeAttribute("dir")), f.moveChildren(C), f.remove()), C.appendTo(T);
                        g && m && T.setAttribute("dir", g), p ? T.insertBefore(p) : T.appendTo(l)
                    }
                } else this.state == CKEDITOR.TRISTATE_ON && s[g.root.getName()] && e.call(this, t, g, c);
                for (T = 0; T < E.length; T++)i(E[T]);
                CKEDITOR.dom.element.clearAllMarkers(c), o.selectBookmarks(n), t.focus()
            }, refresh: function (e, t) {
                var n = t.contains(s, 1), i = t.blockLimit || t.root;
                n && i.contains(n) ? this.setState(n.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF)
            }
        }, CKEDITOR.plugins.add("list", {
            requires: "indentlist", init: function (e) {
                e.blockless || (e.addCommand("numberedlist", new t("numberedlist", "ol")), e.addCommand("bulletedlist", new t("bulletedlist", "ul")), e.ui.addButton && (e.ui.addButton("NumberedList", {
                    label: e.lang.list.numberedlist,
                    command: "numberedlist",
                    directional: !0,
                    toolbar: "list,10"
                }), e.ui.addButton("BulletedList", {
                    label: e.lang.list.bulletedlist,
                    command: "bulletedlist",
                    directional: !0,
                    toolbar: "list,20"
                })), e.on("key", function (t) {
                    var n, i = t.data.domEvent.getKey();
                    if ("wysiwyg" == e.mode && i in {8: 1, 46: 1}) {
                        var l = e.getSelection().getRanges()[0], c = l && l.startPath();
                        if (l && l.collapsed) {
                            var h = 8 == i, f = e.editable(), g = new CKEDITOR.dom.walker(l.clone());
                            if (g.evaluator = function (e) {
                                    return d(e) && !u(e)
                                }, g.guard = function (e, t) {
                                    return !(t && e.type == CKEDITOR.NODE_ELEMENT && e.is("table"))
                                }, i = l.clone(), h) {
                                var m;
                                if ((m = c.contains(s)) && l.checkBoundaryOfElement(m, CKEDITOR.START) && (m = m.getParent()) && m.is("li") && (m = r(m)) ? (n = m, m = m.getPrevious(d), i.moveToPosition(m && u(m) ? m : n, CKEDITOR.POSITION_BEFORE_START)) : (g.range.setStartAt(f, CKEDITOR.POSITION_AFTER_START), g.range.setEnd(l.startContainer, l.startOffset), (m = g.previous()) && m.type == CKEDITOR.NODE_ELEMENT && (m.getName() in s || m.is("li")) && (m.is("li") || (g.range.selectNodeContents(m), g.reset(), g.evaluator = o, m = g.previous()), n = m, i.moveToElementEditEnd(n), i.moveToPosition(i.endPath().block, CKEDITOR.POSITION_BEFORE_END))), n) a(e, i, l), t.cancel(); else {
                                    var E = c.contains(s);
                                    E && l.checkBoundaryOfElement(E, CKEDITOR.START) && (n = E.getFirst(d), l.checkBoundaryOfElement(n, CKEDITOR.START) && (m = E.getPrevious(d), r(n) ? m && (l.moveToElementEditEnd(m), l.select()) : e.execCommand("outdent"), t.cancel()))
                                }
                            } else if (n = c.contains("li")) {
                                if (g.range.setEndAt(f, CKEDITOR.POSITION_BEFORE_END), h = (f = n.getLast(d)) && o(f) ? f : n, c = 0, (m = g.next()) && m.type == CKEDITOR.NODE_ELEMENT && m.getName() in s && m.equals(f) ? (c = 1, m = g.next()) : l.checkBoundaryOfElement(h, CKEDITOR.END) && (c = 2), c && m) {
                                    if (l = l.clone(), l.moveToElementEditStart(m), 1 == c && (i.optimize(), !i.startContainer.equals(n))) {
                                        for (n = i.startContainer; n.is(CKEDITOR.dtd.$inline);)E = n, n = n.getParent();
                                        E && i.moveToPosition(E, CKEDITOR.POSITION_AFTER_END)
                                    }
                                    2 == c && (i.moveToPosition(i.endPath().block, CKEDITOR.POSITION_BEFORE_END), l.endPath().block && l.moveToPosition(l.endPath().block, CKEDITOR.POSITION_AFTER_START)), a(e, i, l), t.cancel()
                                }
                            } else g.range.setEndAt(f, CKEDITOR.POSITION_BEFORE_END), (m = g.next()) && m.type == CKEDITOR.NODE_ELEMENT && m.is(s) && (m = m.getFirst(d), c.block && l.checkStartOfBlock() && l.checkEndOfBlock() ? (c.block.remove(), l.moveToElementEditStart(m), l.select()) : r(m) ? (l.moveToElementEditStart(m), l.select()) : (l = l.clone(), l.moveToElementEditStart(m), a(e, i, l)), t.cancel());
                            setTimeout(function () {
                                e.selectionChange(1)
                            })
                        }
                    }
                }))
            }
        })
    }(),function () {
        function e(e, t, n) {
            if (n = e.config.forceEnterMode || n, "wysiwyg" == e.mode) {
                t || (t = e.activeEnterMode);
                var i = e.elementPath();
                i && !i.isContextFor("p") && (t = CKEDITOR.ENTER_BR, n = 1), e.fire("saveSnapshot"), t == CKEDITOR.ENTER_BR ? r(e, t, null, n) : s(e, t, null, n), e.fire("saveSnapshot")
            }
        }

        function t(e) {
            e = e.getSelection().getRanges(!0);
            for (var t = e.length - 1; 0 < t; t--)e[t].deleteContents();
            return e[0]
        }

        function n(e) {
            var t = e.startContainer.getAscendant(function (e) {
                return e.type == CKEDITOR.NODE_ELEMENT && "true" == e.getAttribute("contenteditable")
            }, !0);
            return e.root.equals(t) ? e : (t = new CKEDITOR.dom.range(t), t.moveToRange(e), t)
        }

        CKEDITOR.plugins.add("enterkey", {
            init: function (t) {
                t.addCommand("enter", {
                    modes: {wysiwyg: 1}, editorFocus: !1, exec: function (t) {
                        e(t)
                    }
                }), t.addCommand("shiftEnter", {
                    modes: {wysiwyg: 1}, editorFocus: !1, exec: function (t) {
                        e(t, t.activeShiftEnterMode, 1)
                    }
                }), t.setKeystroke([[13, "enter"], [CKEDITOR.SHIFT + 13, "shiftEnter"]])
            }
        });
        var i = CKEDITOR.dom.walker.whitespaces(), o = CKEDITOR.dom.walker.bookmark();
        CKEDITOR.plugins.enterkey = {
            enterBlock: function (e, a, s, c) {
                if (s = s || t(e)) {
                    s = n(s);
                    var d, u = s.document, h = s.checkStartOfBlock(), f = s.checkEndOfBlock(),
                        g = e.elementPath(s.startContainer), m = g.block, E = a == CKEDITOR.ENTER_DIV ? "div" : "p";
                    if (h && f) {
                        if (m && (m.is("li") || m.getParent().is("li"))) {
                            m.is("li") || (m = m.getParent()), s = m.getParent(), d = s.getParent(), c = !m.hasPrevious();
                            var p = !m.hasNext(), E = e.getSelection(), T = E.createBookmarks(), h = m.getDirection(1),
                                f = m.getAttribute("class"), C = m.getAttribute("style"), I = d.getDirection(1) != h;
                            if (e = e.enterMode != CKEDITOR.ENTER_BR || I || C || f, d.is("li")) c || p ? (c && p && s.remove(), m[p ? "insertAfter" : "insertBefore"](d)) : m.breakParent(d); else {
                                if (e) g.block.is("li") ? (d = u.createElement(a == CKEDITOR.ENTER_P ? "p" : "div"), I && d.setAttribute("dir", h), C && d.setAttribute("style", C), f && d.setAttribute("class", f), m.moveChildren(d)) : d = g.block, c || p ? d[c ? "insertBefore" : "insertAfter"](s) : (m.breakParent(s), d.insertAfter(s)); else if (m.appendBogus(!0), c || p)for (; u = m[c ? "getFirst" : "getLast"]();)u[c ? "insertBefore" : "insertAfter"](s); else for (m.breakParent(s); u = m.getLast();)u.insertAfter(s);
                                m.remove()
                            }
                            return void E.selectBookmarks(T)
                        }
                        if (m && m.getParent().is("blockquote"))return m.breakParent(m.getParent()), m.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || m.getPrevious().remove(), m.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || m.getNext().remove(), s.moveToElementEditStart(m), void s.select()
                    } else if (m && m.is("pre") && !f)return void r(e, a, s, c);
                    if (h = s.splitBlock(E)) {
                        if (a = h.previousBlock, m = h.nextBlock, g = h.wasStartOfBlock, e = h.wasEndOfBlock, m ? (T = m.getParent(), T.is("li") && (m.breakParent(T), m.move(m.getNext(), 1))) : a && (T = a.getParent()) && T.is("li") && (a.breakParent(T), T = a.getNext(), s.moveToElementEditStart(T), a.move(a.getPrevious())), g || e) {
                            if (a ? (a.is("li") || !l.test(a.getName()) && !a.is("pre")) && (d = a.clone()) : m && (d = m.clone()), d ? c && !d.is("li") && d.renameNode(E) : T && T.is("li") ? d = T : (d = u.createElement(E), a && (p = a.getDirection()) && d.setAttribute("dir", p)), u = h.elementPath)for (c = 0, E = u.elements.length; c < E && (T = u.elements[c], !T.equals(u.block) && !T.equals(u.blockLimit)); c++)CKEDITOR.dtd.$removeEmpty[T.getName()] && (T = T.clone(), d.moveChildren(T), d.append(T));
                            d.appendBogus(), d.getParent() || s.insertNode(d), d.is("li") && d.removeAttribute("value"), !CKEDITOR.env.ie || !g || e && a.getChildCount() || (s.moveToElementEditStart(e ? a : d), s.select()), s.moveToElementEditStart(g && !e ? m : d)
                        } else m.is("li") && (d = s.clone(), d.selectNodeContents(m), d = new CKEDITOR.dom.walker(d), d.evaluator = function (e) {
                            return !(o(e) || i(e) || e.type == CKEDITOR.NODE_ELEMENT && e.getName() in CKEDITOR.dtd.$inline && !(e.getName() in CKEDITOR.dtd.$empty))
                        }, (T = d.next()) && T.type == CKEDITOR.NODE_ELEMENT && T.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? u.createElement("br") : u.createText(" ")).insertBefore(T)), m && s.moveToElementEditStart(m);
                        s.select(), s.scrollIntoView()
                    }
                }
            }, enterBr: function (e, n, i, o) {
                if (i = i || t(e)) {
                    var a = i.document, r = i.checkEndOfBlock(),
                        c = new CKEDITOR.dom.elementPath(e.getSelection().getStartElement()), d = c.block,
                        u = d && c.block.getName();
                    o || "li" != u ? (!o && r && l.test(u) ? (r = d.getDirection()) ? (a = a.createElement("div"), a.setAttribute("dir", r), a.insertAfter(d), i.setStart(a, 0)) : (a.createElement("br").insertAfter(d), CKEDITOR.env.gecko && a.createText("").insertAfter(d), i.setStartAt(d.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (e = "pre" == u && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? a.createText("\r") : a.createElement("br"), i.deleteContents(), i.insertNode(e), CKEDITOR.env.needsBrFiller ? (a.createText("\ufeff").insertAfter(e), r && (d || c.blockLimit).appendBogus(), e.getNext().$.nodeValue = "", i.setStartAt(e.getNext(), CKEDITOR.POSITION_AFTER_START)) : i.setStartAt(e, CKEDITOR.POSITION_AFTER_END)), i.collapse(!0), i.select(), i.scrollIntoView()) : s(e, n, i, o)
                }
            }
        };
        var a = CKEDITOR.plugins.enterkey, r = a.enterBr, s = a.enterBlock, l = /^h[1-6]$/
    }(),function () {
        function e(e, t) {
            var n = {}, i = [], o = {nbsp: " ", shy: "­", gt: ">", lt: "<", amp: "&", apos: "'", quot: '"'};
            if (e = e.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function (e, a) {
                    var r = t ? "&" + a + ";" : o[a];
                    return n[r] = t ? o[a] : "&" + a + ";", i.push(r), ""
                }), !t && e) {
                e = e.split(",");
                var a, r = document.createElement("div");
                for (r.innerHTML = "&" + e.join(";&") + ";", a = r.innerHTML, r = null, r = 0; r < a.length; r++) {
                    var s = a.charAt(r);
                    n[s] = "&" + e[r] + ";", i.push(s)
                }
            }
            return n.regex = i.join(t ? "|" : ""), n
        }

        CKEDITOR.plugins.add("entities", {
            afterInit: function (t) {
                function n(e) {
                    return l[e]
                }

                function i(e) {
                    return "force" != o.entities_processNumerical && r[e] ? r[e] : "&#" + e.charCodeAt(0) + ";"
                }

                var o = t.config;
                if (t = (t = t.dataProcessor) && t.htmlFilter) {
                    var a = [];
                    !1 !== o.basicEntities && a.push("nbsp,gt,lt,amp"), o.entities && (a.length && a.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"), o.entities_latin && a.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), o.entities_greek && a.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"), o.entities_additional && a.push(o.entities_additional));
                    var r = e(a.join(",")), s = r.regex ? "[" + r.regex + "]" : "a^";
                    delete r.regex, o.entities && o.entities_processNumerical && (s = "[^ -~]|" + s);
                    var s = new RegExp(s, "g"), l = e("nbsp,gt,lt,amp,shy", !0), c = new RegExp(l.regex, "g");
                    t.addRules({
                        text: function (e) {
                            return e.replace(c, n).replace(s, i)
                        }
                    }, {applyToAll: !0, excludeNestedEditable: !0})
                }
            }
        })
    }(),CKEDITOR.config.basicEntities = !0,CKEDITOR.config.entities = !0,CKEDITOR.config.entities_latin = !0,CKEDITOR.config.entities_greek = !0,CKEDITOR.config.entities_additional = "#39",CKEDITOR.plugins.add("popup"),CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        popup: function (e, t, n, i) {
            t = t || "80%", n = n || "70%", "string" == typeof t && 1 < t.length && "%" == t.substr(t.length - 1, 1) && (t = parseInt(window.screen.width * parseInt(t, 10) / 100, 10)), "string" == typeof n && 1 < n.length && "%" == n.substr(n.length - 1, 1) && (n = parseInt(window.screen.height * parseInt(n, 10) / 100, 10)), 640 > t && (t = 640), 420 > n && (n = 420);
            var o = parseInt((window.screen.height - n) / 2, 10), a = parseInt((window.screen.width - t) / 2, 10);
            i = (i || "location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes") + ",width=" + t + ",height=" + n + ",top=" + o + ",left=" + a;
            var r = window.open("", null, i, !0);
            if (!r)return !1;
            try {
                -1 == navigator.userAgent.toLowerCase().indexOf(" chrome/") && (r.moveTo(a, o), r.resizeTo(t, n)), r.focus(), r.location.href = e
            } catch (t) {
                window.open(e, null, i, !0)
            }
            return !0
        }
    }),function () {
        function e(e) {
            this.editor = e, this.loaders = []
        }

        function t(e, t, i) {
            var o = e.config.fileTools_defaultFileName;
            this.editor = e, this.lang = e.lang, "string" == typeof t ? (this.data = t, this.file = n(this.data), this.loaded = this.total = this.file.size) : (this.data = null, this.file = t, this.total = this.file.size, this.loaded = 0), i ? this.fileName = i : this.file.name ? this.fileName = this.file.name : (e = this.file.type.split("/"), o && (e[0] = o), this.fileName = e.join(".")), this.uploaded = 0, this.responseData = this.uploadTotal = null, this.status = "created", this.abort = function () {
                this.changeStatus("abort")
            }
        }

        function n(e) {
            var t = e.match(i)[1];
            e = e.replace(i, ""), e = atob(e);
            var n, o, a, r, s = [];
            for (n = 0; n < e.length; n += 512) {
                for (o = e.slice(n, n + 512), a = Array(o.length), r = 0; r < o.length; r++)a[r] = o.charCodeAt(r);
                o = new Uint8Array(a), s.push(o)
            }
            return new Blob(s, {type: t})
        }

        CKEDITOR.plugins.add("filetools", {
            beforeInit: function (t) {
                t.uploadRepository = new e(t), t.on("fileUploadRequest", function (e) {
                    var t = e.data.fileLoader;
                    t.xhr.open("POST", t.uploadUrl, !0), e.data.requestData.upload = {file: t.file, name: t.fileName}
                }, null, null, 5), t.on("fileUploadRequest", function (e) {
                    var n = e.data.fileLoader, i = new FormData;
                    e = e.data.requestData;
                    var o, a, r = t.config.fileTools_requestHeaders;
                    for (a in e) {
                        var s = e[a];
                        "object" == typeof s && s.file ? i.append(a, s.file, s.name) : i.append(a, s)
                    }
                    if (i.append("ckCsrfToken", CKEDITOR.tools.getCsrfToken()), r)for (o in r)n.xhr.setRequestHeader(o, r[o]);
                    n.xhr.send(i)
                }, null, null, 999), t.on("fileUploadResponse", function (e) {
                    var t = e.data.fileLoader, n = t.xhr, i = e.data;
                    try {
                        var o = JSON.parse(n.responseText);
                        if (o.error && o.error.message && (i.message = o.error.message), o.uploaded)for (var a in o)i[a] = o[a]; else e.cancel()
                    } catch (o) {
                        i.message = t.lang.filetools.responseError, CKEDITOR.warn("filetools-response-error", {responseText: n.responseText}), e.cancel()
                    }
                }, null, null, 999)
            }
        }), e.prototype = {
            create: function (e, n, i) {
                i = i || t;
                var o = this.loaders.length;
                return e = new i(this.editor, e, n), e.id = o, this.loaders[o] = e, this.fire("instanceCreated", e), e
            }, isFinished: function () {
                for (var e = 0; e < this.loaders.length; ++e)if (!this.loaders[e].isFinished())return !1;
                return !0
            }
        }, t.prototype = {
            loadAndUpload: function (e, t) {
                var n = this;
                this.once("loaded", function (i) {
                    i.cancel(), n.once("update", function (e) {
                        e.cancel()
                    }, null, null, 0), n.upload(e, t)
                }, null, null, 0), this.load()
            }, load: function () {
                var e = this, t = this.reader = new FileReader;
                e.changeStatus("loading"), this.abort = function () {
                    e.reader.abort()
                }, t.onabort = function () {
                    e.changeStatus("abort")
                }, t.onerror = function () {
                    e.message = e.lang.filetools.loadError, e.changeStatus("error")
                }, t.onprogress = function (t) {
                    e.loaded = t.loaded, e.update()
                }, t.onload = function () {
                    e.loaded = e.total, e.data = t.result, e.changeStatus("loaded")
                }, t.readAsDataURL(this.file)
            }, upload: function (e, t) {
                var n = t || {};
                e ? (this.uploadUrl = e, this.xhr = new XMLHttpRequest, this.attachRequestListeners(), this.editor.fire("fileUploadRequest", {
                    fileLoader: this,
                    requestData: n
                }) && this.changeStatus("uploading")) : (this.message = this.lang.filetools.noUrlError, this.changeStatus("error"))
            }, attachRequestListeners: function () {
                function e() {
                    "error" != n.status && (n.message = n.lang.filetools.networkError, n.changeStatus("error"))
                }

                function t() {
                    "abort" != n.status && n.changeStatus("abort")
                }

                var n = this, i = this.xhr;
                n.abort = function () {
                    i.abort(), t()
                }, i.onerror = e, i.onabort = t, i.upload ? (i.upload.onprogress = function (e) {
                    e.lengthComputable && (n.uploadTotal || (n.uploadTotal = e.total), n.uploaded = e.loaded, n.update())
                }, i.upload.onerror = e, i.upload.onabort = t) : (n.uploadTotal = n.total, n.update()), i.onload = function () {
                    if (n.update(), "abort" != n.status)if (n.uploaded = n.uploadTotal, 200 > i.status || 299 < i.status) n.message = n.lang.filetools["httpError" + i.status],
                    n.message || (n.message = n.lang.filetools.httpError.replace("%1", i.status)), n.changeStatus("error"); else {
                        for (var e = {fileLoader: n}, t = ["message", "fileName", "url"], o = n.editor.fire("fileUploadResponse", e), a = 0; a < t.length; a++) {
                            var r = t[a];
                            "string" == typeof e[r] && (n[r] = e[r])
                        }
                        n.responseData = e, delete n.responseData.fileLoader, !1 === o ? n.changeStatus("error") : n.changeStatus("uploaded")
                    }
                }
            }, changeStatus: function (e) {
                this.status = e, "error" != e && "abort" != e && "loaded" != e && "uploaded" != e || (this.abort = function () {
                }), this.fire(e), this.update()
            }, update: function () {
                this.fire("update")
            }, isFinished: function () {
                return !!this.status.match(/^(?:loaded|uploaded|error|abort)$/)
            }
        }, CKEDITOR.event.implementOn(e.prototype), CKEDITOR.event.implementOn(t.prototype);
        var i = /^data:(\S*?);base64,/;
        CKEDITOR.fileTools || (CKEDITOR.fileTools = {}), CKEDITOR.tools.extend(CKEDITOR.fileTools, {
            uploadRepository: e,
            fileLoader: t,
            getUploadUrl: function (e, t) {
                var n = CKEDITOR.tools.capitalize;
                return t && e[t + "UploadUrl"] ? e[t + "UploadUrl"] : e.uploadUrl ? e.uploadUrl : t && e["filebrowser" + n(t, 1) + "UploadUrl"] ? e["filebrowser" + n(t, 1) + "UploadUrl"] + "&responseType=json" : e.filebrowserUploadUrl ? e.filebrowserUploadUrl + "&responseType=json" : null
            },
            isTypeSupported: function (e, t) {
                return !!e.type.match(t)
            },
            isFileUploadSupported: "function" == typeof FileReader && "function" == typeof(new FileReader).readAsDataURL && "function" == typeof FormData && "function" == typeof(new FormData).append && "function" == typeof XMLHttpRequest && "function" == typeof Blob
        })
    }(),function () {
        function e(e, t) {
            var n = [];
            if (!t)return e;
            for (var i in t)n.push(i + "=" + encodeURIComponent(t[i]));
            return e + (-1 != e.indexOf("?") ? "&" : "?") + n.join("&")
        }

        function t(t) {
            return !t.match(/command=QuickUpload/) || t.match(/(\?|&)responseType=json/) ? t : e(t, {responseType: "json"})
        }

        function n(e) {
            return e += "", e.charAt(0).toUpperCase() + e.substr(1)
        }

        function i() {
            var t = this.getDialog(), i = t.getParentEditor();
            i._.filebrowserSe = this;
            var o = i.config["filebrowser" + n(t.getName()) + "WindowWidth"] || i.config.filebrowserWindowWidth || "80%",
                t = i.config["filebrowser" + n(t.getName()) + "WindowHeight"] || i.config.filebrowserWindowHeight || "70%",
                a = this.filebrowser.params || {};
            a.CKEditor = i.name, a.CKEditorFuncNum = i._.filebrowserFn, a.langCode || (a.langCode = i.langCode), a = e(this.filebrowser.url, a), i.popup(a, o, t, i.config.filebrowserWindowFeatures || i.config.fileBrowserWindowFeatures)
        }

        function o(e) {
            var t = new CKEDITOR.dom.element(e.$.form);
            t && ((e = t.$.elements.ckCsrfToken) ? e = new CKEDITOR.dom.element(e) : (e = new CKEDITOR.dom.element("input"), e.setAttributes({
                name: "ckCsrfToken",
                type: "hidden"
            }), t.append(e)), e.setAttribute("value", CKEDITOR.tools.getCsrfToken()))
        }

        function a() {
            var e = this.getDialog();
            return e.getParentEditor()._.filebrowserSe = this, !(!e.getContentElement(this.for[0], this.for[1]).getInputElement().$.value || !e.getContentElement(this.for[0], this.for[1]).getAction())
        }

        function r(t, n, i) {
            var o = i.params || {};
            o.CKEditor = t.name, o.CKEditorFuncNum = t._.filebrowserFn, o.langCode || (o.langCode = t.langCode), n.action = e(i.url, o), n.filebrowser = i
        }

        function s(e, c, u, h) {
            if (h && h.length)for (var f, g = h.length; g--;)if (f = h[g], "hbox" != f.type && "vbox" != f.type && "fieldset" != f.type || s(e, c, u, f.children), f.filebrowser)if ("string" == typeof f.filebrowser && (f.filebrowser = {
                    action: "fileButton" == f.type ? "QuickUpload" : "Browse",
                    target: f.filebrowser
                }), "Browse" == f.filebrowser.action) {
                var m = f.filebrowser.url;
                void 0 === m && void 0 === (m = e.config["filebrowser" + n(c) + "BrowseUrl"]) && (m = e.config.filebrowserBrowseUrl), m && (f.onClick = i, f.filebrowser.url = m, f.hidden = !1)
            } else if ("QuickUpload" == f.filebrowser.action && f.for && (m = f.filebrowser.url, void 0 === m && void 0 === (m = e.config["filebrowser" + n(c) + "UploadUrl"]) && (m = e.config.filebrowserUploadUrl), m)) {
                var E = f.onClick;
                f.onClick = function (n) {
                    var i = n.sender, r = i.getDialog().getContentElement(this.for[0], this.for[1]).getInputElement(),
                        s = CKEDITOR.fileTools && CKEDITOR.fileTools.isFileUploadSupported;
                    return (!E || !1 !== E.call(i, n)) && (!!a.call(i, n) && ("form" !== e.config.filebrowserUploadMethod && s ? (n = e.uploadRepository.create(r.$.files[0]), n.on("uploaded", function (e) {
                            var t = e.sender.responseData;
                            d.call(e.sender.editor, t.url, t.message)
                        }), n.on("error", l.bind(this)), n.on("abort", l.bind(this)), n.loadAndUpload(t(m)), "xhr") : (o(r), !0)))
                }, f.filebrowser.url = m, f.hidden = !1, r(e, u.getContents(f.for[0]).get(f.for[1]), f.filebrowser)
            }
        }

        function l(e) {
            var t = {};
            try {
                t = JSON.parse(e.sender.xhr.response) || {}
            } catch (e) {
            }
            this.enable(), alert(t.error ? t.error.message : e.sender.message)
        }

        function c(e, t, n) {
            if (-1 !== n.indexOf(";")) {
                n = n.split(";");
                for (var i = 0; i < n.length; i++)if (c(e, t, n[i]))return !0;
                return !1
            }
            return (e = e.getContents(t).get(n).filebrowser) && e.url
        }

        function d(e, t) {
            var n = this._.filebrowserSe.getDialog(), i = this._.filebrowserSe.for,
                o = this._.filebrowserSe.filebrowser.onSelect;
            i && n.getContentElement(i[0], i[1]).reset(), "function" == typeof t && !1 === t.call(this._.filebrowserSe) || o && !1 === o.call(this._.filebrowserSe, e, t) || ("string" == typeof t && t && alert(t), e && (i = this._.filebrowserSe, n = i.getDialog(), i = i.filebrowser.target || null) && (i = i.split(":"), (o = n.getContentElement(i[0], i[1])) && (o.setValue(e), n.selectPage(i[0]))))
        }

        CKEDITOR.plugins.add("filebrowser", {
            requires: "popup,filetools", init: function (e) {
                e._.filebrowserFn = CKEDITOR.tools.addFunction(d, e), e.on("destroy", function () {
                    CKEDITOR.tools.removeFunction(this._.filebrowserFn)
                })
            }
        }), CKEDITOR.on("dialogDefinition", function (e) {
            if (e.editor.plugins.filebrowser)for (var t, n = e.data.definition, i = 0; i < n.contents.length; ++i)(t = n.contents[i]) && (s(e.editor, e.data.name, n, t.elements), t.hidden && t.filebrowser && (t.hidden = !c(n, t.id, t.filebrowser)))
        })
    }(),function () {
        function e(e) {
            var i = e.config, o = e.fire("uiSpace", {space: "top", html: ""}).html, a = function () {
                function o(e, t, i) {
                    s.setStyle(t, n(i)), s.setStyle("position", e)
                }

                function r(e) {
                    var t = c.getDocumentPosition();
                    switch (e) {
                        case"top":
                            o("absolute", "top", t.y - f - E);
                            break;
                        case"pin":
                            o("fixed", "top", T);
                            break;
                        case"bottom":
                            o("absolute", "top", t.y + (u.height || u.bottom - u.top) + E)
                    }
                    l = e
                }

                var l, c, d, u, h, f, g, m = i.floatSpaceDockedOffsetX || 0, E = i.floatSpaceDockedOffsetY || 0,
                    p = i.floatSpacePinnedOffsetX || 0, T = i.floatSpacePinnedOffsetY || 0;
                return function (o) {
                    if (c = e.editable()) {
                        var T = o && "focus" == o.name;
                        T && s.show(), e.fire("floatingSpaceLayout", {show: T}), s.removeStyle("left"), s.removeStyle("right"), d = s.getClientRect(), u = c.getClientRect(), h = t.getViewPaneSize(), f = d.height, g = "pageXOffset" in t.$ ? t.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft, l ? (r(f + E <= u.top ? "top" : f + E > h.height - u.bottom ? "pin" : "bottom"), o = h.width / 2, o = i.floatSpacePreferRight ? "right" : 0 < u.left && u.right < h.width && u.width > d.width ? "rtl" == i.contentsLangDirection ? "right" : "left" : o - u.left > u.right - o ? "left" : "right", d.width > h.width ? (o = "left", T = 0) : (T = "left" == o ? 0 < u.left ? u.left : 0 : u.right < h.width ? h.width - u.right : 0) + d.width > h.width && (o = "left" == o ? "right" : "left", T = 0), s.setStyle(o, n(("pin" == l ? p : m) + T + ("pin" == l ? 0 : "left" == o ? g : -g)))) : (l = "pin", r("pin"), a(o))
                    }
                }
            }();
            if (o) {
                var r = new CKEDITOR.template('<div id="cke_{name}" class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir="{langDir}" title="' + (CKEDITOR.env.gecko ? " " : "") + '" lang="{langCode}" role="application" style="{style}"' + (e.title ? ' aria-labelledby="cke_{name}_arialbl"' : " ") + ">" + (e.title ? '<span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span>' : " ") + '<div class="cke_inner"><div id="{topId}" class="cke_top" role="presentation">{content}</div></div></div>'),
                    s = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(r.output({
                        content: o,
                        id: e.id,
                        langDir: e.lang.dir,
                        langCode: e.langCode,
                        name: e.name,
                        style: "display:none;z-index:" + (i.baseFloatZIndex - 1),
                        topId: e.ui.spaceId("top"),
                        voiceLabel: e.title
                    }))), l = CKEDITOR.tools.eventsBuffer(500, a), c = CKEDITOR.tools.eventsBuffer(100, a);
                s.unselectable(), s.on("mousedown", function (e) {
                    e = e.data, e.getTarget().hasAscendant("a", 1) || e.preventDefault()
                }), e.on("focus", function (n) {
                    a(n), e.on("change", l.input), t.on("scroll", c.input), t.on("resize", c.input)
                }), e.on("blur", function () {
                    s.hide(), e.removeListener("change", l.input), t.removeListener("scroll", c.input), t.removeListener("resize", c.input)
                }), e.on("destroy", function () {
                    t.removeListener("scroll", c.input), t.removeListener("resize", c.input), s.clearCustomData(), s.remove()
                }), e.focusManager.hasFocus && s.show(), e.focusManager.add(s, 1)
            }
        }

        var t = CKEDITOR.document.getWindow(), n = CKEDITOR.tools.cssLength;
        CKEDITOR.plugins.add("floatingspace", {
            init: function (t) {
                t.on("loaded", function () {
                    e(this)
                }, null, null, 20)
            }
        })
    }(),CKEDITOR.plugins.add("listblock", {
        requires: "panel", onLoad: function () {
            var e = CKEDITOR.addTemplate("panel-list", '<ul role="presentation" class="cke_panel_list">{items}</ul>'),
                t = CKEDITOR.addTemplate("panel-list-item", '<li id="{id}" class="cke_panel_listItem" role=presentation><a id="{id}_option" _cke_focus=1 hidefocus=true title="{title}" href="javascript:void(\'{val}\')"  {onclick}="CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role="option">{text}</a></li>'),
                n = CKEDITOR.addTemplate("panel-list-group", '<h1 id="{id}" class="cke_panel_grouptitle" role="presentation" >{label}</h1>'),
                i = /\'/g;
            CKEDITOR.ui.panel.prototype.addListBlock = function (e, t) {
                return this.addBlock(e, new CKEDITOR.ui.listBlock(this.getHolderElement(), t))
            }, CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.panel.block, $: function (e, t) {
                    t = t || {};
                    var n = t.attributes || (t.attributes = {});
                    (this.multiSelect = !!t.multiSelect) && (n["aria-multiselectable"] = !0), !n.role && (n.role = "listbox"), this.base.apply(this, arguments), this.element.setAttribute("role", n.role), n = this.keys, n[40] = "next", n[9] = "next", n[38] = "prev", n[CKEDITOR.SHIFT + 9] = "prev", n[32] = CKEDITOR.env.ie ? "mouseup" : "click", CKEDITOR.env.ie && (n[13] = "mouseup"), this._.pendingHtml = [], this._.pendingList = [], this._.items = {}, this._.groups = {}
                }, _: {
                    close: function () {
                        if (this._.started) {
                            var t = e.output({items: this._.pendingList.join("")});
                            this._.pendingList = [], this._.pendingHtml.push(t), delete this._.started
                        }
                    }, getClick: function () {
                        return this._.click || (this._.click = CKEDITOR.tools.addFunction(function (e) {
                            var t = this.toggle(e);
                            this.onClick && this.onClick(e, t)
                        }, this)), this._.click
                    }
                }, proto: {
                    add: function (e, n, o) {
                        var a = CKEDITOR.tools.getNextId();
                        this._.started || (this._.started = 1, this._.size = this._.size || 0), this._.items[e] = a;
                        var r;
                        r = CKEDITOR.tools.htmlEncodeAttr(e).replace(i, "\\'"), e = {
                            id: a,
                            val: r,
                            onclick: CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick",
                            clickFn: this._.getClick(),
                            title: CKEDITOR.tools.htmlEncodeAttr(o || e),
                            text: n || e
                        }, this._.pendingList.push(t.output(e))
                    }, startGroup: function (e) {
                        this._.close();
                        var t = CKEDITOR.tools.getNextId();
                        this._.groups[e] = t, this._.pendingHtml.push(n.output({id: t, label: e}))
                    }, commit: function () {
                        this._.close(), this.element.appendHtml(this._.pendingHtml.join("")), delete this._.size, this._.pendingHtml = []
                    }, toggle: function (e) {
                        var t = this.isMarked(e);
                        return t ? this.unmark(e) : this.mark(e), !t
                    }, hideGroup: function (e) {
                        var t = (e = this.element.getDocument().getById(this._.groups[e])) && e.getNext();
                        e && (e.setStyle("display", "none"), t && "ul" == t.getName() && t.setStyle("display", "none"))
                    }, hideItem: function (e) {
                        this.element.getDocument().getById(this._.items[e]).setStyle("display", "none")
                    }, showAll: function () {
                        var e, t = this._.items, n = this._.groups, i = this.element.getDocument();
                        for (e in t)i.getById(t[e]).setStyle("display", "");
                        for (var o in n)t = i.getById(n[o]), e = t.getNext(), t.setStyle("display", ""), e && "ul" == e.getName() && e.setStyle("display", "")
                    }, mark: function (e) {
                        this.multiSelect || this.unmarkAll(), e = this._.items[e];
                        var t = this.element.getDocument().getById(e);
                        t.addClass("cke_selected"), this.element.getDocument().getById(e + "_option").setAttribute("aria-selected", !0), this.onMark && this.onMark(t)
                    }, markFirstDisplayed: function () {
                        var e = this;
                        this._.markFirstDisplayed(function () {
                            e.multiSelect || e.unmarkAll()
                        })
                    }, unmark: function (e) {
                        var t = this.element.getDocument();
                        e = this._.items[e];
                        var n = t.getById(e);
                        n.removeClass("cke_selected"), t.getById(e + "_option").removeAttribute("aria-selected"), this.onUnmark && this.onUnmark(n)
                    }, unmarkAll: function () {
                        var e, t = this._.items, n = this.element.getDocument();
                        for (e in t) {
                            var i = t[e];
                            n.getById(i).removeClass("cke_selected"), n.getById(i + "_option").removeAttribute("aria-selected")
                        }
                        this.onUnmark && this.onUnmark()
                    }, isMarked: function (e) {
                        return this.element.getDocument().getById(this._.items[e]).hasClass("cke_selected")
                    }, focus: function (e) {
                        this._.focusIndex = -1;
                        var t, n = this.element.getElementsByTag("a"), i = -1;
                        if (e) {
                            for (t = this.element.getDocument().getById(this._.items[e]).getFirst(); e = n.getItem(++i);)if (e.equals(t)) {
                                this._.focusIndex = i;
                                break
                            }
                        } else this.element.focus();
                        t && setTimeout(function () {
                            t.focus()
                        }, 0)
                    }
                }
            })
        }
    }),CKEDITOR.plugins.add("richcombo", {
        requires: "floatpanel,listblock,button", beforeInit: function (e) {
            e.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler)
        }
    }),function () {
        var e = '<span id="{id}" class="cke_combo cke_combo__{name} {cls}" role="presentation"><span id="{id}_label" class="cke_combo_label">{label}</span><a class="cke_combo_button" title="{title}" tabindex="-1"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href=\"javascript:void('{titleJs}')\"") + ' hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="true"';
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (e += ' onkeypress="return false;"'), CKEDITOR.env.gecko && (e += ' onblur="this.style.cssText = this.style.cssText;"');
        var e = e + ' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span id="{id}_text" class="cke_combo_text cke_combo_inlinelabel">{label}</span><span class="cke_combo_open"><span class="cke_combo_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : CKEDITOR.env.air ? "&nbsp;" : "") + "</span></span></a></span>",
            t = CKEDITOR.addTemplate("combo", e);
        CKEDITOR.UI_RICHCOMBO = "richcombo", CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
            $: function (e) {
                CKEDITOR.tools.extend(this, e, {
                    canGroup: !1,
                    title: e.label,
                    modes: {wysiwyg: 1},
                    editorFocus: 1
                }), e = this.panel || {}, delete this.panel, this.id = CKEDITOR.tools.getNextNumber(), this.document = e.parent && e.parent.getDocument() || CKEDITOR.document, e.className = "cke_combopanel", e.block = {
                    multiSelect: e.multiSelect,
                    attributes: e.attributes
                }, e.toolbarRelated = !0, this._ = {panelDefinition: e, items: {}}
            }, proto: {
                renderHtml: function (e) {
                    var t = [];
                    return this.render(e, t), t.join("")
                }, render: function (e, n) {
                    function i() {
                        if (this.getState() != CKEDITOR.TRISTATE_ON) {
                            var t = this.modes[e.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                            e.readOnly && !this.readOnly && (t = CKEDITOR.TRISTATE_DISABLED), this.setState(t), this.setValue(""), t != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh()
                        }
                    }

                    var o = CKEDITOR.env, a = "cke_" + this.id, r = CKEDITOR.tools.addFunction(function (t) {
                        u && (e.unlockSelection(1), u = 0), l.execute(t)
                    }, this), s = this, l = {
                        id: a, combo: this, focus: function () {
                            CKEDITOR.document.getById(a).getChild(1).focus()
                        }, execute: function (t) {
                            var n = s._;
                            if (n.state != CKEDITOR.TRISTATE_DISABLED)if (s.createPanel(e), n.on) n.panel.hide(); else {
                                s.commit();
                                var i = s.getValue();
                                i ? n.list.mark(i) : n.list.unmarkAll(), n.panel.showBlock(s.id, new CKEDITOR.dom.element(t), 4)
                            }
                        }, clickFn: r
                    };
                    e.on("activeFilterChange", i, this), e.on("mode", i, this), e.on("selectionChange", i, this), !this.readOnly && e.on("readOnly", i, this);
                    var c = CKEDITOR.tools.addFunction(function (e, t) {
                        e = new CKEDITOR.dom.event(e);
                        var n = e.getKeystroke();
                        switch (n) {
                            case 13:
                            case 32:
                            case 40:
                                CKEDITOR.tools.callFunction(r, t);
                                break;
                            default:
                                l.onkey(l, n)
                        }
                        e.preventDefault()
                    }), d = CKEDITOR.tools.addFunction(function () {
                        l.onfocus && l.onfocus()
                    }), u = 0;
                    return l.keyDownFn = c, o = {
                        id: a,
                        name: this.name || this.command,
                        label: this.label,
                        title: this.title,
                        cls: this.className || "",
                        titleJs: o.gecko && !o.hc ? "" : (this.title || "").replace("'", ""),
                        keydownFn: c,
                        focusFn: d,
                        clickFn: r
                    }, t.output(o, n), this.onRender && this.onRender(), l
                }, createPanel: function (e) {
                    if (!this._.panel) {
                        var t = this._.panelDefinition, n = this._.panelDefinition.block,
                            i = t.parent || CKEDITOR.document.getBody(), o = "cke_combopanel__" + this.name,
                            a = new CKEDITOR.ui.floatPanel(e, i, t), t = a.addListBlock(this.id, n), r = this;
                        a.onShow = function () {
                            this.element.addClass(o), r.setState(CKEDITOR.TRISTATE_ON), r._.on = 1, r.editorFocus && !e.focusManager.hasFocus && e.focus(), r.onOpen && r.onOpen()
                        }, a.onHide = function (t) {
                            this.element.removeClass(o), r.setState(r.modes && r.modes[e.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), r._.on = 0, !t && r.onClose && r.onClose()
                        }, a.onEscape = function () {
                            a.hide(1)
                        }, t.onClick = function (e, t) {
                            r.onClick && r.onClick.call(r, e, t), a.hide()
                        }, this._.panel = a, this._.list = t, a.getBlock(this.id).onHide = function () {
                            r._.on = 0, r.setState(CKEDITOR.TRISTATE_OFF)
                        }, this.init && this.init()
                    }
                }, setValue: function (e, t) {
                    this._.value = e;
                    var n = this.document.getById("cke_" + this.id + "_text");
                    n && (e || t ? n.removeClass("cke_combo_inlinelabel") : (t = this.label, n.addClass("cke_combo_inlinelabel")), n.setText(void 0 !== t ? t : e))
                }, getValue: function () {
                    return this._.value || ""
                }, unmarkAll: function () {
                    this._.list.unmarkAll()
                }, mark: function (e) {
                    this._.list.mark(e)
                }, hideItem: function (e) {
                    this._.list.hideItem(e)
                }, hideGroup: function (e) {
                    this._.list.hideGroup(e)
                }, showAll: function () {
                    this._.list.showAll()
                }, add: function (e, t, n) {
                    this._.items[e] = n || e, this._.list.add(e, t, n)
                }, startGroup: function (e) {
                    this._.list.startGroup(e)
                }, commit: function () {
                    this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire("ready", this)), this._.committed = 1
                }, setState: function (e) {
                    if (this._.state != e) {
                        var t = this.document.getById("cke_" + this.id);
                        t.setState(e, "cke_combo"), e == CKEDITOR.TRISTATE_DISABLED ? t.setAttribute("aria-disabled", !0) : t.removeAttribute("aria-disabled"), this._.state = e
                    }
                }, getState: function () {
                    return this._.state
                }, enable: function () {
                    this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState)
                }, disable: function () {
                    this._.state != CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED))
                }
            }, statics: {
                handler: {
                    create: function (e) {
                        return new CKEDITOR.ui.richCombo(e)
                    }
                }
            }
        }), CKEDITOR.ui.prototype.addRichCombo = function (e, t) {
            this.add(e, CKEDITOR.UI_RICHCOMBO, t)
        }
    }(),CKEDITOR.plugins.add("format", {
        requires: "richcombo", init: function (e) {
            if (!e.blockless) {
                for (var t = e.config, n = e.lang.format, i = t.format_tags.split(";"), o = {}, a = 0, r = [], s = 0; s < i.length; s++) {
                    var l = i[s], c = new CKEDITOR.style(t["format_" + l]);
                    e.filter.customConfig && !e.filter.check(c) || (a++, o[l] = c, o[l]._.enterMode = e.config.enterMode, r.push(c))
                }
                0 !== a && e.ui.addRichCombo("Format", {
                    label: n.label,
                    title: n.panelTitle,
                    toolbar: "styles,20",
                    allowedContent: r,
                    panel: {
                        css: [CKEDITOR.skin.getPath("editor")].concat(t.contentsCss),
                        multiSelect: !1,
                        attributes: {"aria-label": n.panelTitle}
                    },
                    init: function () {
                        this.startGroup(n.panelTitle);
                        for (var e in o) {
                            var t = n["tag_" + e];
                            this.add(e, o[e].buildPreview(t), t)
                        }
                    },
                    onClick: function (t) {
                        e.focus(), e.fire("saveSnapshot"), t = o[t];
                        var n = e.elementPath();
                        t.checkActive(n, e) || e.applyStyle(t), setTimeout(function () {
                            e.fire("saveSnapshot")
                        }, 0)
                    },
                    onRender: function () {
                        e.on("selectionChange", function (t) {
                            var n = this.getValue();
                            t = t.data.path, this.refresh();
                            for (var i in o)if (o[i].checkActive(t, e))return void(i != n && this.setValue(i, e.lang.format["tag_" + i]));
                            this.setValue("")
                        }, this)
                    },
                    onOpen: function () {
                        this.showAll();
                        for (var t in o)e.activeFilter.check(o[t]) || this.hideItem(t)
                    },
                    refresh: function () {
                        var t = e.elementPath();
                        if (t) {
                            if (t.isContextFor("p"))for (var n in o)if (e.activeFilter.check(o[n]))return;
                            this.setState(CKEDITOR.TRISTATE_DISABLED)
                        }
                    }
                })
            }
        }
    }),CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div",CKEDITOR.config.format_p = {element: "p"},CKEDITOR.config.format_div = {element: "div"},CKEDITOR.config.format_pre = {element: "pre"},CKEDITOR.config.format_address = {element: "address"},CKEDITOR.config.format_h1 = {element: "h1"},CKEDITOR.config.format_h2 = {element: "h2"},CKEDITOR.config.format_h3 = {element: "h3"},CKEDITOR.config.format_h4 = {element: "h4"},CKEDITOR.config.format_h5 = {element: "h5"},CKEDITOR.config.format_h6 = {element: "h6"},function () {
        var e = {
            canUndo: !1, exec: function (e) {
                var t = e.document.createElement("hr");
                e.insertElement(t)
            }, allowedContent: "hr", requiredContent: "hr"
        };
        CKEDITOR.plugins.add("horizontalrule", {
            init: function (t) {
                t.blockless || (t.addCommand("horizontalrule", e), t.ui.addButton && t.ui.addButton("HorizontalRule", {
                    label: t.lang.horizontalrule.toolbar,
                    command: "horizontalrule",
                    toolbar: "insert,40"
                }))
            }
        })
    }(),CKEDITOR.plugins.add("htmlwriter", {
        init: function (e) {
            var t = new CKEDITOR.htmlWriter;
            t.forceSimpleAmpersand = e.config.forceSimpleAmpersand, t.indentationChars = e.config.dataIndentationChars || "\t", e.dataProcessor.writer = t
        }
    }),CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
        base: CKEDITOR.htmlParser.basicWriter, $: function () {
            this.base(), this.indentationChars = "\t", this.selfClosingEnd = " />", this.lineBreakChars = "\n", this.sortAttributes = 1, this._.indent = 0, this._.indentation = "", this._.inPre = 0, this._.rules = {};
            var e, t = CKEDITOR.dtd;
            for (e in CKEDITOR.tools.extend({}, t.$nonBodyContent, t.$block, t.$listItem, t.$tableContent))this.setRules(e, {
                indent: !t[e]["#"],
                breakBeforeOpen: 1,
                breakBeforeClose: !t[e]["#"],
                breakAfterClose: 1,
                needsSpace: e in t.$block && !(e in {li: 1, dt: 1, dd: 1})
            });
            this.setRules("br", {breakAfterOpen: 1}), this.setRules("title", {
                indent: 0,
                breakAfterOpen: 0
            }), this.setRules("style", {indent: 0, breakBeforeClose: 1}), this.setRules("pre", {
                breakAfterOpen: 1,
                indent: 0
            })
        }, proto: {
            openTag: function (e) {
                var t = this._.rules[e];
                this._.afterCloser && t && t.needsSpace && this._.needsSpace && this._.output.push("\n"), this._.indent ? this.indentation() : t && t.breakBeforeOpen && (this.lineBreak(), this.indentation()), this._.output.push("<", e), this._.afterCloser = 0
            }, openTagClose: function (e, t) {
                var n = this._.rules[e];
                t ? (this._.output.push(this.selfClosingEnd), n && n.breakAfterClose && (this._.needsSpace = n.needsSpace)) : (this._.output.push(">"), n && n.indent && (this._.indentation += this.indentationChars)), n && n.breakAfterOpen && this.lineBreak(), "pre" == e && (this._.inPre = 1)
            }, attribute: function (e, t) {
                "string" == typeof t && (this.forceSimpleAmpersand && (t = t.replace(/&amp;/g, "&")), t = CKEDITOR.tools.htmlEncodeAttr(t)), this._.output.push(" ", e, '="', t, '"')
            }, closeTag: function (e) {
                var t = this._.rules[e];
                t && t.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length)), this._.indent ? this.indentation() : t && t.breakBeforeClose && (this.lineBreak(), this.indentation()), this._.output.push("</", e, ">"), "pre" == e && (this._.inPre = 0), t && t.breakAfterClose && (this.lineBreak(), this._.needsSpace = t.needsSpace), this._.afterCloser = 1
            }, text: function (e) {
                this._.indent && (this.indentation(), !this._.inPre && (e = CKEDITOR.tools.ltrim(e))), this._.output.push(e)
            }, comment: function (e) {
                this._.indent && this.indentation(), this._.output.push("\x3c!--", e, "--\x3e")
            }, lineBreak: function () {
                !this._.inPre && 0 < this._.output.length && this._.output.push(this.lineBreakChars), this._.indent = 1
            }, indentation: function () {
                !this._.inPre && this._.indentation && this._.output.push(this._.indentation), this._.indent = 0
            }, reset: function () {
                this._.output = [], this._.indent = 0, this._.indentation = "", this._.afterCloser = 0, this._.inPre = 0, this._.needsSpace = 0
            }, setRules: function (e, t) {
                var n = this._.rules[e];
                n ? CKEDITOR.tools.extend(n, t, !0) : this._.rules[e] = t
            }
        }
    }),function () {
        function e(e, t) {
            if (t || (t = e.getSelection().getSelectedElement()), t && t.is("img") && !t.data("cke-realelement") && !t.isReadOnly())return t
        }

        function t(e) {
            var t = e.getStyle("float");
            return "inherit" != t && "none" != t || (t = 0), t || (t = e.getAttribute("align")), t
        }

        CKEDITOR.plugins.add("image", {
            requires: "dialog", init: function (t) {
                if (!t.plugins.image2) {
                    CKEDITOR.dialog.add("image", this.path + "dialogs/image.js");
                    var n = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
                    CKEDITOR.dialog.isTabEnabled(t, "image", "advanced") && (n = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)"), t.addCommand("image", new CKEDITOR.dialogCommand("image", {
                        allowedContent: n,
                        requiredContent: "img[alt,src]",
                        contentTransformations: [["img{width}: sizeToStyle", "img[width]: sizeToAttribute"], ["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]]
                    })), t.ui.addButton && t.ui.addButton("Image", {
                        label: t.lang.common.image,
                        command: "image",
                        toolbar: "insert,10"
                    }), t.on("doubleclick", function (e) {
                        var t = e.data.element;
                        !t.is("img") || t.data("cke-realelement") || t.isReadOnly() || (e.data.dialog = "image")
                    }), t.addMenuItems && t.addMenuItems({
                        image: {
                            label: t.lang.image.menu,
                            command: "image",
                            group: "image"
                        }
                    }), t.contextMenu && t.contextMenu.addListener(function (n) {
                        if (e(t, n))return {image: CKEDITOR.TRISTATE_OFF}
                    })
                }
            }, afterInit: function (n) {
                function i(i) {
                    var o = n.getCommand("justify" + i);
                    o && ("left" != i && "right" != i || o.on("exec", function (o) {
                        var a, r = e(n);
                        r && (a = t(r), a == i ? (r.removeStyle("float"), i == t(r) && r.removeAttribute("align")) : r.setStyle("float", i), o.cancel())
                    }), o.on("refresh", function (o) {
                        var a = e(n);
                        a && (a = t(a), this.setState(a == i ? CKEDITOR.TRISTATE_ON : "right" == i || "left" == i ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), o.cancel())
                    }))
                }

                n.plugins.image2 || (i("left"), i("right"), i("center"), i("block"))
            }
        })
    }(),CKEDITOR.config.image_removeLinkByEmptyURL = !0,function () {
        function e(e, t) {
            var n = i.exec(e), o = i.exec(t);
            if (n) {
                if (!n[2] && "px" == o[2])return o[1];
                if ("px" == n[2] && !o[2])return o[1] + "px"
            }
            return t
        }

        var t = CKEDITOR.htmlParser.cssStyle, n = CKEDITOR.tools.cssLength, i = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,
            o = {
                elements: {
                    $: function (n) {
                        var i = n.attributes;
                        if ((i = (i = (i = i && i["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(i))) && i.children[0]) && n.attributes["data-cke-resizable"]) {
                            var o = new t(n).rules;
                            n = i.attributes;
                            var a = o.width, o = o.height;
                            a && (n.width = e(n.width, a)), o && (n.height = e(n.height, o))
                        }
                        return i
                    }
                }
            };
        CKEDITOR.plugins.add("fakeobjects", {
            init: function (e) {
                e.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects")
            }, afterInit: function (e) {
                (e = (e = e.dataProcessor) && e.htmlFilter) && e.addRules(o, {applyToAll: !0})
            }
        }), CKEDITOR.editor.prototype.createFakeElement = function (e, i, o, a) {
            var r = this.lang.fakeobjects, r = r[o] || r.unknown;
            return i = {
                class: i,
                "data-cke-realelement": encodeURIComponent(e.getOuterHtml()),
                "data-cke-real-node-type": e.type,
                alt: r,
                title: r,
                align: e.getAttribute("align") || ""
            }, CKEDITOR.env.hc || (i.src = CKEDITOR.tools.transparentImageData), o && (i["data-cke-real-element-type"] = o), a && (i["data-cke-resizable"] = a, o = new t, a = e.getAttribute("width"), e = e.getAttribute("height"), a && (o.rules.width = n(a)), e && (o.rules.height = n(e)), o.populate(i)), this.document.createElement("img", {attributes: i})
        }, CKEDITOR.editor.prototype.createFakeParserElement = function (e, i, o, a) {
            var r, s = this.lang.fakeobjects, s = s[o] || s.unknown;
            return r = new CKEDITOR.htmlParser.basicWriter, e.writeHtml(r), r = r.getHtml(), i = {
                class: i,
                "data-cke-realelement": encodeURIComponent(r),
                "data-cke-real-node-type": e.type,
                alt: s,
                title: s,
                align: e.attributes.align || ""
            }, CKEDITOR.env.hc || (i.src = CKEDITOR.tools.transparentImageData), o && (i["data-cke-real-element-type"] = o), a && (i["data-cke-resizable"] = a, a = e.attributes, e = new t, o = a.width, a = a.height, void 0 !== o && (e.rules.width = n(o)), void 0 !== a && (e.rules.height = n(a)), e.populate(i)), new CKEDITOR.htmlParser.element("img", i)
        }, CKEDITOR.editor.prototype.restoreRealElement = function (t) {
            if (t.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT)return null;
            var n = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(t.data("cke-realelement")), this.document);
            if (t.data("cke-resizable")) {
                var i = t.getStyle("width");
                t = t.getStyle("height"), i && n.setAttribute("width", e(n.getAttribute("width"), i)), t && n.setAttribute("height", e(n.getAttribute("height"), t))
            }
            return n
        }
    }(),function () {
        function e(e) {
            return e.replace(/'/g, "\\$&")
        }

        function t(e) {
            for (var t, n = e.length, i = [], o = 0; o < n; o++)t = e.charCodeAt(o), i.push(t);
            return "String.fromCharCode(" + i.join(",") + ")"
        }

        function n(t, n) {
            var i, o, a = t.plugins.link, r = a.compiledProtectionFunction.params;
            o = [a.compiledProtectionFunction.name, "("];
            for (var s = 0; s < r.length; s++)a = r[s].toLowerCase(), i = n[a], 0 < s && o.push(","), o.push("'", i ? e(encodeURIComponent(n[a])) : "", "'");
            return o.push(")"), o.join("")
        }

        function i(e) {
            e = e.config.emailProtection || "";
            var t;
            return e && "encode" != e && (t = {}, e.replace(/^([^(]+)\(([^)]+)\)$/, function (e, n, i) {
                t.name = n, t.params = [], i.replace(/[^,\s]+/g, function (e) {
                    t.params.push(e)
                })
            })), t
        }

        CKEDITOR.plugins.add("link", {
            requires: "dialog,fakeobjects", onLoad: function () {
                function e(e) {
                    return n.replace(/%1/g, "rtl" == e ? "right" : "left").replace(/%2/g, "cke_contents_" + e)
                }

                var t = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;",
                    n = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + t + "padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{" + t + "width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}";
                CKEDITOR.addCss(e("ltr") + e("rtl"))
            }, init: function (e) {
                var t = "a[!href]";
                CKEDITOR.dialog.isTabEnabled(e, "link", "advanced") && (t = t.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)")), CKEDITOR.dialog.isTabEnabled(e, "link", "target") && (t = t.replace("]", ",target,onclick]")), e.addCommand("link", new CKEDITOR.dialogCommand("link", {
                    allowedContent: t,
                    requiredContent: "a[href]"
                })), e.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", {
                    allowedContent: "a[!name,id]",
                    requiredContent: "a[name]"
                })), e.addCommand("unlink", new CKEDITOR.unlinkCommand), e.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand), e.setKeystroke(CKEDITOR.CTRL + 76, "link"), e.ui.addButton && (e.ui.addButton("Link", {
                    label: e.lang.link.toolbar,
                    command: "link",
                    toolbar: "links,10"
                }), e.ui.addButton("Unlink", {
                    label: e.lang.link.unlink,
                    command: "unlink",
                    toolbar: "links,20"
                }), e.ui.addButton("Anchor", {
                    label: e.lang.link.anchor.toolbar,
                    command: "anchor",
                    toolbar: "links,30"
                })), CKEDITOR.dialog.add("link", this.path + "dialogs/link.js"), CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js"), e.on("doubleclick", function (t) {
                    var n = t.data.element.getAscendant({a: 1, img: 1}, !0);
                    n && !n.isReadOnly() && (n.is("a") ? (t.data.dialog = !n.getAttribute("name") || n.getAttribute("href") && n.getChildCount() ? "link" : "anchor", t.data.link = n) : CKEDITOR.plugins.link.tryRestoreFakeAnchor(e, n) && (t.data.dialog = "anchor"))
                }, null, null, 0), e.on("doubleclick", function (t) {
                    t.data.dialog in {link: 1, anchor: 1} && t.data.link && e.getSelection().selectElement(t.data.link)
                }, null, null, 20), e.addMenuItems && e.addMenuItems({
                    anchor: {
                        label: e.lang.link.anchor.menu,
                        command: "anchor",
                        group: "anchor",
                        order: 1
                    },
                    removeAnchor: {
                        label: e.lang.link.anchor.remove,
                        command: "removeAnchor",
                        group: "anchor",
                        order: 5
                    },
                    link: {label: e.lang.link.menu, command: "link", group: "link", order: 1},
                    unlink: {label: e.lang.link.unlink, command: "unlink", group: "link", order: 5}
                }), e.contextMenu && e.contextMenu.addListener(function (t) {
                    if (!t || t.isReadOnly())return null;
                    if (!(t = CKEDITOR.plugins.link.tryRestoreFakeAnchor(e, t)) && !(t = CKEDITOR.plugins.link.getSelectedLink(e)))return null;
                    var n = {};
                    return t.getAttribute("href") && t.getChildCount() && (n = {
                        link: CKEDITOR.TRISTATE_OFF,
                        unlink: CKEDITOR.TRISTATE_OFF
                    }), t && t.hasAttribute("name") && (n.anchor = n.removeAnchor = CKEDITOR.TRISTATE_OFF), n
                }), this.compiledProtectionFunction = i(e)
            }, afterInit: function (e) {
                e.dataProcessor.dataFilter.addRules({
                    elements: {
                        a: function (t) {
                            return t.attributes.name ? t.children.length ? null : e.createFakeParserElement(t, "cke_anchor", "anchor") : null
                        }
                    }
                });
                var t = e._.elementsPath && e._.elementsPath.filters;
                t && t.push(function (t, n) {
                    if ("a" == n && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(e, t) || t.getAttribute("name") && (!t.getAttribute("href") || !t.getChildCount())))return "anchor"
                })
            }
        });
        var o = /^javascript:/, a = /^mailto:([^?]+)(?:\?(.+))?$/, r = /subject=([^;?:@&=$,\/]*)/i,
            s = /body=([^;?:@&=$,\/]*)/i, l = /^#(.*)$/, c = /^((?:http|https|ftp|news):\/\/)?(.*)$/,
            d = /^(_(?:self|top|parent|blank))$/,
            u = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,
            h = /^javascript:([^(]+)\(([^)]+)\)$/,
            f = /\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,
            g = /(?:^|,)([^=]+)=(\d+|yes|no)/gi, m = {
                id: "advId",
                dir: "advLangDir",
                accessKey: "advAccessKey",
                name: "advName",
                lang: "advLangCode",
                tabindex: "advTabIndex",
                title: "advTitle",
                type: "advContentType",
                class: "advCSSClasses",
                charset: "advCharset",
                style: "advStyles",
                rel: "advRel"
            };
        CKEDITOR.plugins.link = {
            getSelectedLink: function (e, t) {
                var n, i = e.getSelection(), o = i.getSelectedElement(), a = i.getRanges(), r = [];
                if (!t && o && o.is("a"))return o;
                for (o = 0; o < a.length; o++)if (n = i.getRanges()[o],
                        n.shrink(CKEDITOR.SHRINK_ELEMENT, !0, {skipBogus: !0}), (n = e.elementPath(n.getCommonAncestor()).contains("a", 1)) && t) r.push(n); else if (n)return n;
                return t ? r : null
            }, getEditorAnchors: function (e) {
                for (var t, n = e.editable(), i = n.isInline() && !e.plugins.divarea ? e.document : n, n = i.getElementsByTag("a"), i = i.getElementsByTag("img"), o = [], a = 0; t = n.getItem(a++);)(t.data("cke-saved-name") || t.hasAttribute("name")) && o.push({
                    name: t.data("cke-saved-name") || t.getAttribute("name"),
                    id: t.getAttribute("id")
                });
                for (a = 0; t = i.getItem(a++);)(t = this.tryRestoreFakeAnchor(e, t)) && o.push({
                    name: t.getAttribute("name"),
                    id: t.getAttribute("id")
                });
                return o
            }, fakeAnchor: !0, tryRestoreFakeAnchor: function (e, t) {
                if (t && t.data("cke-real-element-type") && "anchor" == t.data("cke-real-element-type")) {
                    var n = e.restoreRealElement(t);
                    if (n.data("cke-saved-name"))return n
                }
            }, parseLinkAttributes: function (e, t) {
                var n, i = t && (t.data("cke-saved-href") || t.getAttribute("href")) || "",
                    E = e.plugins.link.compiledProtectionFunction, p = e.config.emailProtection, T = {};
                if (i.match(o) && ("encode" == p ? i = i.replace(u, function (e, t, n) {
                        return n = n || "", "mailto:" + String.fromCharCode.apply(String, t.split(",")) + n.replace(/\\'/g, "'")
                    }) : p && i.replace(h, function (e, t, n) {
                            if (t == E.name) {
                                T.type = "email", e = T.email = {}, t = /(^')|('$)/g, n = n.match(/[^,\s]+/g);
                                for (var i, o, a = n.length, r = 0; r < a; r++)i = decodeURIComponent, o = n[r].replace(t, "").replace(/\\'/g, "'"), o = i(o), i = E.params[r].toLowerCase(), e[i] = o;
                                e.address = [e.name, e.domain].join("@")
                            }
                        })), !T.type)if (p = i.match(l)) T.type = "anchor", T.anchor = {}, T.anchor.name = T.anchor.id = p[1]; else if (p = i.match(a)) {
                    n = i.match(r), i = i.match(s), T.type = "email";
                    var C = T.email = {};
                    C.address = p[1], n && (C.subject = decodeURIComponent(n[1])), i && (C.body = decodeURIComponent(i[1]))
                } else i && (n = i.match(c)) && (T.type = "url", T.url = {}, T.url.protocol = n[1], T.url.url = n[2]);
                if (t) {
                    if (i = t.getAttribute("target")) T.target = {
                        type: i.match(d) ? i : "frame",
                        name: i
                    }; else if (i = (i = t.data("cke-pa-onclick") || t.getAttribute("onclick")) && i.match(f))for (T.target = {
                        type: "popup",
                        name: i[1]
                    }; p = g.exec(i[2]);)"yes" != p[2] && "1" != p[2] || p[1] in {
                        height: 1,
                        width: 1,
                        top: 1,
                        left: 1
                    } ? isFinite(p[2]) && (T.target[p[1]] = p[2]) : T.target[p[1]] = !0;
                    null !== t.getAttribute("download") && (T.download = !0);
                    var I, i = {};
                    for (I in m)(p = t.getAttribute(I)) && (i[m[I]] = p);
                    (I = t.data("cke-saved-name") || i.advName) && (i.advName = I), CKEDITOR.tools.isEmpty(i) || (T.advanced = i)
                }
                return T
            }, getLinkAttributes: function (i, o) {
                var a = i.config.emailProtection || "", r = {};
                switch (o.type) {
                    case"url":
                        var a = o.url && void 0 !== o.url.protocol ? o.url.protocol : "http://",
                            s = o.url && CKEDITOR.tools.trim(o.url.url) || "";
                        r["data-cke-saved-href"] = 0 === s.indexOf("/") ? s : a + s;
                        break;
                    case"anchor":
                        a = o.anchor && o.anchor.id, r["data-cke-saved-href"] = "#" + (o.anchor && o.anchor.name || a || "");
                        break;
                    case"email":
                        var l = o.email, s = l.address;
                        switch (a) {
                            case"":
                            case"encode":
                                var c = encodeURIComponent(l.subject || ""), d = encodeURIComponent(l.body || ""),
                                    l = [];
                                c && l.push("subject=" + c), d && l.push("body=" + d), l = l.length ? "?" + l.join("&") : "", "encode" == a ? (a = ["javascript:void(location.href='mailto:'+", t(s)], l && a.push("+'", e(l), "'"), a.push(")")) : a = ["mailto:", s, l];
                                break;
                            default:
                                a = s.split("@", 2), l.name = a[0], l.domain = a[1], a = ["javascript:", n(i, l)]
                        }
                        r["data-cke-saved-href"] = a.join("")
                }
                if (o.target)if ("popup" == o.target.type) {
                    for (var a = ["window.open(this.href, '", o.target.name || "", "', '"], u = "resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "), s = u.length, c = function (e) {
                        o.target[e] && u.push(e + "=" + o.target[e])
                    }, l = 0; l < s; l++)u[l] += o.target[u[l]] ? "=yes" : "=no";
                    c("width"), c("left"), c("height"), c("top"), a.push(u.join(","), "'); return false;"), r["data-cke-pa-onclick"] = a.join("")
                } else"notSet" != o.target.type && o.target.name && (r.target = o.target.name);
                if (o.download && (r.download = ""), o.advanced) {
                    for (var h in m)(a = o.advanced[m[h]]) && (r[h] = a);
                    r.name && (r["data-cke-saved-name"] = r.name)
                }
                r["data-cke-saved-href"] && (r.href = r["data-cke-saved-href"]), h = {
                    target: 1,
                    onclick: 1,
                    "data-cke-pa-onclick": 1,
                    "data-cke-saved-name": 1,
                    download: 1
                }, o.advanced && CKEDITOR.tools.extend(h, m);
                for (var f in r)delete h[f];
                return {set: r, removed: CKEDITOR.tools.objectKeys(h)}
            }, showDisplayTextForElement: function (e, t) {
                var n = {img: 1, table: 1, tbody: 1, thead: 1, tfoot: 1, input: 1, select: 1, textarea: 1},
                    i = t.getSelection();
                return !(t.widgets && t.widgets.focused || i && 1 < i.getRanges().length) && (!e || !e.getName || !e.is(n))
            }
        }, CKEDITOR.unlinkCommand = function () {
        }, CKEDITOR.unlinkCommand.prototype = {
            exec: function (e) {
                if (CKEDITOR.env.ie) {
                    var t, n = e.getSelection().getRanges()[0],
                        i = n.getPreviousEditableNode() && n.getPreviousEditableNode().getAscendant("a", !0) || n.getNextEditableNode() && n.getNextEditableNode().getAscendant("a", !0);
                    n.collapsed && i && (t = n.createBookmark(), n.selectNodeContents(i), n.select())
                }
                i = new CKEDITOR.style({
                    element: "a",
                    type: CKEDITOR.STYLE_INLINE,
                    alwaysRemoveElement: 1
                }), e.removeStyle(i), t && (n.moveToBookmark(t), n.select())
            }, refresh: function (e, t) {
                var n = t.lastElement && t.lastElement.getAscendant("a", !0);
                n && "a" == n.getName() && n.getAttribute("href") && n.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
            }, contextSensitive: 1, startDisabled: 1, requiredContent: "a[href]", editorFocus: 1
        }, CKEDITOR.removeAnchorCommand = function () {
        }, CKEDITOR.removeAnchorCommand.prototype = {
            exec: function (e) {
                var t, n = e.getSelection(), i = n.createBookmarks();
                n && (t = n.getSelectedElement()) && (t.getChildCount() ? t.is("a") : CKEDITOR.plugins.link.tryRestoreFakeAnchor(e, t)) ? t.remove(1) : (t = CKEDITOR.plugins.link.getSelectedLink(e)) && (t.hasAttribute("href") ? (t.removeAttributes({
                        name: 1,
                        "data-cke-saved-name": 1
                    }), t.removeClass("cke_anchor")) : t.remove(1)), n.selectBookmarks(i)
            }, requiredContent: "a[name]"
        }, CKEDITOR.tools.extend(CKEDITOR.config, {linkShowAdvancedTab: !0, linkShowTargetTab: !0})
    }(),function () {
        function e(e, t, n) {
            return u(t) && u(n) && n.equals(t.getNext(function (e) {
                    return !(G(e) || X(e) || h(e))
                }))
        }

        function t(e) {
            this.upper = e[0], this.lower = e[1], this.set.apply(this, e.slice(2))
        }

        function n(e) {
            var t = e.element;
            if (t && u(t) && (t = t.getAscendant(e.triggers, !0)) && e.editable.contains(t)) {
                var n = r(t);
                if ("true" == n.getAttribute("contenteditable"))return t;
                if (n.is(e.triggers))return n
            }
            return null
        }

        function i(e, t, n) {
            return I(e, t), I(e, n), e = t.size.bottom, n = n.size.top, e && n ? 0 | (e + n) / 2 : e || n
        }

        function o(e, t, n) {
            return t = t[n ? "getPrevious" : "getNext"](function (t) {
                return t && t.type == CKEDITOR.NODE_TEXT && !G(t) || u(t) && !h(t) && !d(e, t)
            })
        }

        function a(e, t, n) {
            return e > t && e < n
        }

        function r(e, t) {
            if (e.data("cke-editable"))return null;
            for (t || (e = e.getParent()); e && !e.data("cke-editable");) {
                if (e.hasAttribute("contenteditable"))return e;
                e = e.getParent()
            }
            return null
        }

        function s(e) {
            var t = e.doc,
                n = y('<span contenteditable="false" data-cke-magic-line="1" style="' + z + "position:absolute;border-top:1px dashed " + e.boxColor + '"></span>', t),
                i = CKEDITOR.getUrl(this.path + "images/" + (K.hidpi ? "hidpi/" : "") + "icon" + (e.rtl ? "-rtl" : "") + ".png");
            for (v(n, {
                attach: function () {
                    return this.wrap.getParent() || this.wrap.appendTo(e.editable, !0), this
                },
                lineChildren: [v(y('<span title="' + e.editor.lang.magicline.title + '" contenteditable="false">&#8629;</span>', t), {
                    base: z + "height:17px;width:17px;" + (e.rtl ? "left" : "right") + ":17px;background:url(" + i + ") center no-repeat " + e.boxColor + ";cursor:pointer;" + (K.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" : "") + (K.hidpi ? "background-size: 9px 10px;" : ""),
                    looks: ["top:-8px; border-radius: 2px;", "top:-17px; border-radius: 2px 2px 0px 0px;", "top:-1px; border-radius: 0px 0px 2px 2px;"]
                }), v(y(V, t), {
                    base: W + "left:0px;border-left-color:" + e.boxColor + ";",
                    looks: ["border-width:8px 0 8px 8px;top:-8px", "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"]
                }), v(y(V, t), {
                    base: W + "right:0px;border-right-color:" + e.boxColor + ";",
                    looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px"]
                })],
                detach: function () {
                    return this.wrap.getParent() && this.wrap.remove(), this
                },
                mouseNear: function () {
                    I(e, this);
                    var t = e.holdDistance, n = this.size;
                    return !!(n && a(e.mouse.y, n.top - t, n.bottom + t) && a(e.mouse.x, n.left - t, n.right + t))
                },
                place: function () {
                    var t = e.view, n = e.editable, i = e.trigger, o = i.upper, r = i.lower, s = o || r,
                        l = s.getParent(), c = {};
                    this.trigger = i, o && I(e, o, !0), r && I(e, r, !0), I(e, l, !0), e.inInlineMode && O(e, !0), l.equals(n) ? (c.left = t.scroll.x, c.right = -t.scroll.x, c.width = "") : (c.left = s.size.left - s.size.margin.left + t.scroll.x - (e.inInlineMode ? t.editable.left + t.editable.border.left : 0), c.width = s.size.outerWidth + s.size.margin.left + s.size.margin.right + t.scroll.x, c.right = ""), o && r ? c.top = o.size.margin.bottom === r.size.margin.top ? 0 | o.size.bottom + o.size.margin.bottom / 2 : o.size.margin.bottom < r.size.margin.top ? o.size.bottom + o.size.margin.bottom : o.size.bottom + o.size.margin.bottom - r.size.margin.top : o ? r || (c.top = o.size.bottom + o.size.margin.bottom) : c.top = r.size.top - r.size.margin.top, i.is(L) || a(c.top, t.scroll.y - 15, t.scroll.y + 5) ? (c.top = e.inInlineMode ? 0 : t.scroll.y, this.look(L)) : i.is(F) || a(c.top, t.pane.bottom - 5, t.pane.bottom + 15) ? (c.top = e.inInlineMode ? t.editable.height + t.editable.padding.top + t.editable.padding.bottom : t.pane.bottom - 1, this.look(F)) : (e.inInlineMode && (c.top -= t.editable.top + t.editable.border.top), this.look(P)), e.inInlineMode && (c.top--, c.top += t.editable.scroll.top, c.left += t.editable.scroll.left);
                    for (var d in c)c[d] = CKEDITOR.tools.cssLength(c[d]);
                    this.setStyles(c)
                },
                look: function (e) {
                    if (this.oldLook != e) {
                        for (var t, n = this.lineChildren.length; n--;)(t = this.lineChildren[n]).setAttribute("style", t.base + t.looks[0 | e / 2]);
                        this.oldLook = e
                    }
                },
                wrap: new b("span", e.doc)
            }), t = n.lineChildren.length; t--;)n.lineChildren[t].appendTo(n);
            n.look(P), n.appendTo(n.wrap), n.unselectable(), n.lineChildren[0].on("mouseup", function (t) {
                n.detach(), l(e, function (t) {
                    var n = e.line.trigger;
                    t[n.is(N) ? "insertBefore" : "insertAfter"](n.is(N) ? n.lower : n.upper)
                }, !0), e.editor.focus(), K.ie || e.enterMode == CKEDITOR.ENTER_BR || e.hotNode.scrollIntoView(), t.data.preventDefault(!0)
            }), n.on("mousedown", function (e) {
                e.data.preventDefault(!0)
            }), e.line = n
        }

        function l(e, t, n) {
            var i, o = new CKEDITOR.dom.range(e.doc), a = e.editor;
            K.ie && e.enterMode == CKEDITOR.ENTER_BR ? i = e.doc.createText(B) : (i = (i = r(e.element, !0)) && i.data("cke-enter-mode") || e.enterMode, i = new b(w[i], e.doc), i.is("br") || e.doc.createText(B).appendTo(i)), n && a.fire("saveSnapshot"), t(i), o.moveToPosition(i, CKEDITOR.POSITION_AFTER_START), a.getSelection().selectRanges([o]), e.hotNode = i, n && a.fire("saveSnapshot")
        }

        function c(e, t) {
            return {
                canUndo: !0, modes: {wysiwyg: 1}, exec: function () {
                    function i(n) {
                        var i = K.ie && 9 > K.version ? " " : B,
                            o = e.hotNode && e.hotNode.getText() == i && e.element.equals(e.hotNode) && e.lastCmdDirection === !!t;
                        l(e, function (i) {
                            o && e.hotNode && e.hotNode.remove(), i[t ? "insertAfter" : "insertBefore"](n), i.setAttributes({
                                "data-cke-magicline-hot": 1,
                                "data-cke-magicline-dir": !!t
                            }), e.lastCmdDirection = !!t
                        }), K.ie || e.enterMode == CKEDITOR.ENTER_BR || e.hotNode.scrollIntoView(), e.line.detach()
                    }

                    return function (a) {
                        a = a.getSelection().getStartElement();
                        var s;
                        if (a = a.getAscendant(q, 1), !m(e, a) && a && !a.equals(e.editable) && !a.contains(e.editable)) {
                            (s = r(a)) && "false" == s.getAttribute("contenteditable") && (a = s), e.element = a, s = o(e, a, !t);
                            var l;
                            u(s) && s.is(e.triggers) && s.is(H) && (!o(e, s, !t) || (l = o(e, s, !t)) && u(l) && l.is(e.triggers)) ? i(s) : (l = n(e, a), u(l) && (o(e, l, !t) ? (a = o(e, l, !t)) && u(a) && a.is(e.triggers) && i(l) : i(l)))
                        }
                    }
                }()
            }
        }

        function d(e, t) {
            if (!t || t.type != CKEDITOR.NODE_ELEMENT || !t.$)return !1;
            var n = e.line;
            return n.wrap.equals(t) || n.wrap.contains(t)
        }

        function u(e) {
            return e && e.type == CKEDITOR.NODE_ELEMENT && e.$
        }

        function h(e) {
            if (!u(e))return !1;
            var t;
            return (t = f(e)) || (u(e) ? (t = {
                left: 1,
                right: 1,
                center: 1
            }, t = !(!t[e.getComputedStyle("float")] && !t[e.getAttribute("align")])) : t = !1), t
        }

        function f(e) {
            return !!{absolute: 1, fixed: 1}[e.getComputedStyle("position")]
        }

        function g(e, t) {
            return u(t) ? t.is(e.triggers) : null
        }

        function m(e, t) {
            if (!t)return !1;
            for (var n = t.getParents(1), i = n.length; i--;)for (var o = e.tabuList.length; o--;)if (n[i].hasAttribute(e.tabuList[o]))return !0;
            return !1
        }

        function E(e, t, n) {
            return !!(t = t[n ? "getLast" : "getFirst"](function (t) {
                    return e.isRelevant(t) && !t.is($)
                })) && (I(e, t), n ? t.size.top > e.mouse.y : t.size.bottom < e.mouse.y)
        }

        function p(e) {
            var n = e.editable, i = e.mouse, o = e.view, r = e.triggerOffset;
            O(e);
            var s = i.y > (e.inInlineMode ? o.editable.top + o.editable.height / 2 : Math.min(o.editable.height, o.pane.height) / 2),
                n = n[s ? "getLast" : "getFirst"](function (e) {
                    return !(G(e) || X(e))
                });
            return n ? (d(e, n) && (n = e.line.wrap[s ? "getPrevious" : "getNext"](function (e) {
                return !(G(e) || X(e))
            })), u(n) && !h(n) && g(e, n) ? (I(e, n), !s && 0 <= n.size.top && a(i.y, 0, n.size.top + r) ? (e = e.inInlineMode || 0 === o.scroll.y ? L : P, new t([null, n, N, A, e])) : s && n.size.bottom <= o.pane.height && a(i.y, n.size.bottom - r, o.pane.height) ? (e = e.inInlineMode || a(n.size.bottom, o.pane.height - r, o.pane.height) ? F : P, new t([n, null, S, A, e])) : null) : null) : null
        }

        function T(e) {
            var i = e.mouse, r = e.view, s = e.triggerOffset, l = n(e);
            if (!l)return null;
            I(e, l);
            var c, d, s = Math.min(s, 0 | l.size.outerHeight / 2), f = [];
            if (a(i.y, l.size.top - 1, l.size.top + s)) d = !1; else {
                if (!a(i.y, l.size.bottom - s, l.size.bottom + 1))return null;
                d = !0
            }
            if (h(l) || E(e, l, d) || l.getParent().is(M))return null;
            var m = o(e, l, !d);
            if (m) {
                if (m && m.type == CKEDITOR.NODE_TEXT)return null;
                if (u(m)) {
                    if (h(m) || !g(e, m) || m.getParent().is(M))return null;
                    f = [m, l][d ? "reverse" : "concat"]().concat([x, A])
                }
            } else l.equals(e.editable[d ? "getLast" : "getFirst"](e.isRelevant)) ? (O(e), d && a(i.y, l.size.bottom - s, r.pane.height) && a(l.size.bottom, r.pane.height - s, r.pane.height) ? c = F : a(i.y, 0, l.size.top + s) && (c = L)) : c = P, f = [null, l][d ? "reverse" : "concat"]().concat([d ? S : N, A, c, l.equals(e.editable[d ? "getLast" : "getFirst"](e.isRelevant)) ? d ? F : L : P]);
            return 0 in f ? new t(f) : null
        }

        function C(e, t, n, i) {
            for (var o = t.getDocumentPosition(), a = {}, r = {}, s = {}, l = {}, c = Z.length; c--;)a[Z[c]] = parseInt(t.getComputedStyle.call(t, "border-" + Z[c] + "-width"), 10) || 0, s[Z[c]] = parseInt(t.getComputedStyle.call(t, "padding-" + Z[c]), 10) || 0, r[Z[c]] = parseInt(t.getComputedStyle.call(t, "margin-" + Z[c]), 10) || 0;
            return n && !i || D(e, i), l.top = o.y - (n ? 0 : e.view.scroll.y), l.left = o.x - (n ? 0 : e.view.scroll.x), l.outerWidth = t.$.offsetWidth, l.outerHeight = t.$.offsetHeight, l.height = l.outerHeight - (s.top + s.bottom + a.top + a.bottom), l.width = l.outerWidth - (s.left + s.right + a.left + a.right), l.bottom = l.top + l.outerHeight, l.right = l.left + l.outerWidth, e.inInlineMode && (l.scroll = {
                top: t.$.scrollTop,
                left: t.$.scrollLeft
            }), v({border: a, padding: s, margin: r, ignoreScroll: n}, l, !0)
        }

        function I(e, t, n) {
            if (!u(t))return t.size = null;
            if (t.size) {
                if (t.size.ignoreScroll == n && t.size.date > new Date - U)return null
            } else t.size = {};
            return v(t.size, C(e, t, n), {date: +new Date}, !0)
        }

        function O(e, t) {
            e.view.editable = C(e, e.editable, t, !0)
        }

        function D(e, t) {
            e.view || (e.view = {});
            var n = e.view;
            if (!(!t && n && n.date > new Date - U)) {
                var i = e.win, n = i.getScrollPosition(), i = i.getViewPaneSize();
                v(e.view, {
                    scroll: {
                        x: n.x,
                        y: n.y,
                        width: e.doc.$.documentElement.scrollWidth - i.width,
                        height: e.doc.$.documentElement.scrollHeight - i.height
                    }, pane: {width: i.width, height: i.height, bottom: i.height + n.y}, date: +new Date
                }, !0)
            }
        }

        function R(e, n, i, o) {
            for (var a = o, r = o, s = 0, l = !1, c = !1, d = e.view.pane.height, u = e.mouse; u.y + s < d && 0 < u.y - s && (l || (l = n(a, o)), c || (c = n(r, o)), !l && 0 < u.y - s && (a = i(e, {
                x: u.x,
                y: u.y - s
            })), !c && u.y + s < d && (r = i(e, {x: u.x, y: u.y + s})), !l || !c);)s += 2;
            return new t([a, r, null, null])
        }

        CKEDITOR.plugins.add("magicline", {
            init: function (e) {
                var i, a, r, g = e.config, E = g.magicline_triggerOffset || 30, I = {
                    editor: e,
                    enterMode: g.enterMode,
                    triggerOffset: E,
                    holdDistance: 0 | E * (g.magicline_holdDistance || .5),
                    boxColor: g.magicline_color || "#ff0000",
                    rtl: "rtl" == g.contentsLangDirection,
                    tabuList: ["data-cke-hidden-sel"].concat(g.magicline_tabuList || []),
                    triggers: g.magicline_everywhere ? q : {
                        table: 1,
                        hr: 1,
                        div: 1,
                        ul: 1,
                        ol: 1,
                        dl: 1,
                        form: 1,
                        blockquote: 1
                    }
                };
                I.isRelevant = function (e) {
                    return u(e) && !d(I, e) && !h(e)
                }, e.on("contentDom", function () {
                    var u = e.editable(), h = e.document, E = e.window;
                    v(I, {
                        editable: u,
                        inInlineMode: u.isInline(),
                        doc: h,
                        win: E,
                        hotNode: null
                    }, !0), I.boundary = I.inInlineMode ? I.editable : I.doc.getDocumentElement(), u.is(k.$inline) || (I.inInlineMode && !f(u) && u.setStyles({
                        position: "relative",
                        top: null,
                        left: null
                    }), s.call(this, I), D(I), u.attachListener(e, "beforeUndoImage", function () {
                        I.line.detach()
                    }), u.attachListener(e, "beforeGetData", function () {
                        I.line.wrap.getParent() && (I.line.detach(), e.once("getData", function () {
                            I.line.attach()
                        }, null, null, 1e3))
                    }, null, null, 0), u.attachListener(I.inInlineMode ? h : h.getWindow().getFrame(), "mouseout", function (t) {
                        if ("wysiwyg" == e.mode)if (I.inInlineMode) {
                            var n = t.data.$.clientX;
                            t = t.data.$.clientY, D(I), O(I, !0);
                            var i = I.view.editable, o = I.view.scroll;
                            n > i.left - o.x && n < i.right - o.x && t > i.top - o.y && t < i.bottom - o.y || (clearTimeout(r), r = null, I.line.detach())
                        } else clearTimeout(r), r = null, I.line.detach()
                    }), u.attachListener(u, "keyup", function () {
                        I.hiddenMode = 0
                    }), u.attachListener(u, "keydown", function (t) {
                        if ("wysiwyg" == e.mode)switch (t.data.getKeystroke()) {
                            case 2228240:
                            case 16:
                                I.hiddenMode = 1, I.line.detach()
                        }
                    }), u.attachListener(I.inInlineMode ? u : h, "mousemove", function (t) {
                        if (a = !0, "wysiwyg" == e.mode && !e.readOnly && !r) {
                            var n = {x: t.data.$.clientX, y: t.data.$.clientY};
                            r = setTimeout(function () {
                                I.mouse = n, r = I.trigger = null, D(I), a && !I.hiddenMode && e.focusManager.hasFocus && !I.line.mouseNear() && (I.element = j(I, !0)) && ((I.trigger = p(I) || T(I) || Y(I)) && !m(I, I.trigger.upper || I.trigger.lower) ? I.line.attach().place() : (I.trigger = null, I.line.detach()), a = !1)
                            }, 30)
                        }
                    }), u.attachListener(E, "scroll", function () {
                        "wysiwyg" == e.mode && (I.line.detach(), K.webkit && (I.hiddenMode = 1, clearTimeout(i), i = setTimeout(function () {
                            I.mouseDown || (I.hiddenMode = 0)
                        }, 50)))
                    }), u.attachListener(_ ? h : E, "mousedown", function () {
                        "wysiwyg" == e.mode && (I.line.detach(), I.hiddenMode = 1, I.mouseDown = 1)
                    }), u.attachListener(_ ? h : E, "mouseup", function () {
                        I.hiddenMode = 0, I.mouseDown = 0
                    }), e.addCommand("accessPreviousSpace", c(I)), e.addCommand("accessNextSpace", c(I, !0)), e.setKeystroke([[g.magicline_keystrokePrevious, "accessPreviousSpace"], [g.magicline_keystrokeNext, "accessNextSpace"]]), e.on("loadSnapshot", function () {
                        var t, n, i, o;
                        for (o in{
                            p: 1,
                            br: 1,
                            div: 1
                        })for (t = e.document.getElementsByTag(o), i = t.count(); i--;)if ((n = t.getItem(i)).data("cke-magicline-hot"))return I.hotNode = n, void(I.lastCmdDirection = "true" === n.data("cke-magicline-dir"))
                    }), this.backdoor = {
                        accessFocusSpace: l,
                        boxTrigger: t,
                        isLine: d,
                        getAscendantTrigger: n,
                        getNonEmptyNeighbour: o,
                        getSize: C,
                        that: I,
                        triggerEdge: T,
                        triggerEditable: p,
                        triggerExpand: Y
                    })
                }, this)
            }
        });
        var v = CKEDITOR.tools.extend, b = CKEDITOR.dom.element, y = b.createFromHtml, K = CKEDITOR.env,
            _ = CKEDITOR.env.ie && 9 > CKEDITOR.env.version, k = CKEDITOR.dtd, w = {}, N = 128, S = 64, x = 32, A = 16,
            L = 4, F = 2, P = 1, B = " ", M = k.$listItem, $ = k.$tableContent, H = v({}, k.$nonEditable, k.$empty),
            q = k.$block, U = 100,
            z = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;",
            W = z + "border-color:transparent;display:block;border-style:solid;", V = "<span>" + B + "</span>";
        w[CKEDITOR.ENTER_BR] = "br", w[CKEDITOR.ENTER_P] = "p", w[CKEDITOR.ENTER_DIV] = "div", t.prototype = {
            set: function (e, t, n) {
                return this.properties = e + t + (n || P), this
            }, is: function (e) {
                return (this.properties & e) == e
            }
        };
        var j = function () {
                function e(e, t) {
                    var n = e.$.elementFromPoint(t.x, t.y);
                    return n && n.nodeType ? new CKEDITOR.dom.element(n) : null
                }

                return function (t, n, i) {
                    if (!t.mouse)return null;
                    var o = t.doc, a = t.line.wrap;
                    i = i || t.mouse;
                    var r = e(o, i);
                    return n && d(t, r) && (a.hide(), r = e(o, i), a.show()), !r || r.type != CKEDITOR.NODE_ELEMENT || !r.$ || K.ie && 9 > K.version && !t.boundary.equals(r) && !t.boundary.contains(r) ? null : r
                }
            }(), G = CKEDITOR.dom.walker.whitespaces(), X = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT),
            Y = function () {
                function t(t) {
                    var o, r, s, l = t.element;
                    if (!u(l) || l.contains(t.editable) || l.isReadOnly())return null;
                    if (s = R(t, function (e, t) {
                            return !t.equals(e)
                        }, function (e, t) {
                            return j(e, !0, t)
                        }, l), o = s.upper, r = s.lower, e(t, o, r))return s.set(x, 8);
                    if (o && l.contains(o))for (; !o.getParent().equals(l);)o = o.getParent(); else o = l.getFirst(function (e) {
                        return n(t, e)
                    });
                    if (r && l.contains(r))for (; !r.getParent().equals(l);)r = r.getParent(); else r = l.getLast(function (e) {
                        return n(t, e)
                    });
                    if (!o || !r)return null;
                    if (I(t, o), I(t, r), !a(t.mouse.y, o.size.top, r.size.bottom))return null;
                    for (var c, d, h, f, l = Number.MAX_VALUE; r && !r.equals(o) && (d = o.getNext(t.isRelevant));)c = Math.abs(i(t, o, d) - t.mouse.y), c < l && (l = c, h = o, f = d), o = d, I(t, o);
                    return h && f && a(t.mouse.y, h.size.top, f.size.bottom) ? (s.upper = h, s.lower = f, s.set(x, 8)) : null
                }

                function n(e, t) {
                    return !(t && t.type == CKEDITOR.NODE_TEXT || X(t) || h(t) || d(e, t) || t.type == CKEDITOR.NODE_ELEMENT && t.$ && t.is("br"))
                }

                return function (n) {
                    var i, o = t(n);
                    if (i = o) {
                        i = o.upper;
                        var a = o.lower;
                        i = !(!i || !a || h(a) || h(i) || a.equals(i) || i.equals(a) || a.contains(i) || i.contains(a)) && !!(g(n, i) && g(n, a) && e(n, i, a))
                    }
                    return i ? o : null
                }
            }(), Z = ["top", "left", "right", "bottom"]
    }(),CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51,CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52,function () {
        function e(e) {
            if (!e || e.type != CKEDITOR.NODE_ELEMENT || "form" != e.getName())return [];
            for (var t = [], n = ["style", "className"], i = 0; i < n.length; i++) {
                var o = e.$.elements.namedItem(n[i]);
                o && (o = new CKEDITOR.dom.element(o), t.push([o, o.nextSibling]), o.remove())
            }
            return t
        }

        function t(e, t) {
            if (e && e.type == CKEDITOR.NODE_ELEMENT && "form" == e.getName() && 0 < t.length)for (var n = t.length - 1; 0 <= n; n--) {
                var i = t[n][0], o = t[n][1];
                o ? i.insertBefore(o) : i.appendTo(e)
            }
        }

        function n(n, i) {
            var o = e(n), a = {}, r = n.$;
            return i || (a.class = r.className || "", r.className = ""), a.inline = r.style.cssText || "", i || (r.style.cssText = "position: static; overflow: visible"), t(o), a
        }

        function i(n, i) {
            var o = e(n), a = n.$;
            "class" in i && (a.className = i.class), "inline" in i && (a.style.cssText = i.inline), t(o)
        }

        function o(e) {
            if (!e.editable().isInline()) {
                var t, n = CKEDITOR.instances;
                for (t in n) {
                    var i = n[t];
                    "wysiwyg" != i.mode || i.readOnly || (i = i.document.getBody(), i.setAttribute("contentEditable", !1), i.setAttribute("contentEditable", !0))
                }
                e.editable().hasFocus && (e.toolbox.focus(), e.focus())
            }
        }

        CKEDITOR.plugins.add("maximize", {
            init: function (e) {
                function t() {
                    var t = d.getViewPaneSize();
                    e.resize(t.width, t.height, null, !0)
                }

                if (e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var a, r, s, l = e.lang, c = CKEDITOR.document, d = c.getWindow(), u = CKEDITOR.TRISTATE_OFF;
                    e.addCommand("maximize", {
                        modes: {wysiwyg: !CKEDITOR.env.iOS, source: !CKEDITOR.env.iOS},
                        readOnly: 1,
                        editorFocus: !1,
                        exec: function () {
                            var h = e.container.getFirst(function (e) {
                                return e.type == CKEDITOR.NODE_ELEMENT && e.hasClass("cke_inner")
                            }), f = e.ui.space("contents");
                            if ("wysiwyg" == e.mode) {
                                var g = e.getSelection();
                                a = g && g.getRanges(), r = d.getScrollPosition()
                            } else {
                                var m = e.editable().$;
                                a = !CKEDITOR.env.ie && [m.selectionStart, m.selectionEnd], r = [m.scrollLeft, m.scrollTop]
                            }
                            if (this.state == CKEDITOR.TRISTATE_OFF) {
                                for (d.on("resize", t), s = d.getScrollPosition(), g = e.container; g = g.getParent();)g.setCustomData("maximize_saved_styles", n(g)), g.setStyle("z-index", e.config.baseFloatZIndex - 5);
                                f.setCustomData("maximize_saved_styles", n(f, !0)), h.setCustomData("maximize_saved_styles", n(h, !0)), f = {
                                    overflow: CKEDITOR.env.webkit ? "" : "hidden",
                                    width: 0,
                                    height: 0
                                }, c.getDocumentElement().setStyles(f), !CKEDITOR.env.gecko && c.getDocumentElement().setStyle("position", "fixed"), CKEDITOR.env.gecko && CKEDITOR.env.quirks || c.getBody().setStyles(f), CKEDITOR.env.ie ? setTimeout(function () {
                                    d.$.scrollTo(0, 0)
                                }, 0) : d.$.scrollTo(0, 0), h.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute"), h.$.offsetLeft, h.setStyles({
                                    "z-index": e.config.baseFloatZIndex - 5,
                                    left: "0px",
                                    top: "0px"
                                }), h.addClass("cke_maximized"), t(), f = h.getDocumentPosition(), h.setStyles({
                                    left: -1 * f.x + "px",
                                    top: -1 * f.y + "px"
                                }), CKEDITOR.env.gecko && o(e)
                            } else if (this.state == CKEDITOR.TRISTATE_ON) {
                                d.removeListener("resize", t);
                                for (var g = [f, h], E = 0; E < g.length; E++)i(g[E], g[E].getCustomData("maximize_saved_styles")), g[E].removeCustomData("maximize_saved_styles");
                                for (g = e.container; g = g.getParent();)i(g, g.getCustomData("maximize_saved_styles")), g.removeCustomData("maximize_saved_styles");
                                CKEDITOR.env.ie ? setTimeout(function () {
                                    d.$.scrollTo(s.x, s.y)
                                }, 0) : d.$.scrollTo(s.x, s.y), h.removeClass("cke_maximized"), CKEDITOR.env.webkit && (h.setStyle("display", "inline"), setTimeout(function () {
                                    h.setStyle("display", "block")
                                }, 0)), e.fire("resize", {
                                    outerHeight: e.container.$.offsetHeight,
                                    contentsHeight: f.$.offsetHeight,
                                    outerWidth: e.container.$.offsetWidth
                                })
                            }
                            this.toggleState(), (g = this.uiItems[0]) && (f = this.state == CKEDITOR.TRISTATE_OFF ? l.maximize.maximize : l.maximize.minimize, g = CKEDITOR.document.getById(g._.id), g.getChild(1).setHtml(f), g.setAttribute("title", f), g.setAttribute("href", 'javascript:void("' + f + '");')), "wysiwyg" == e.mode ? a ? (CKEDITOR.env.gecko && o(e), e.getSelection().selectRanges(a), (m = e.getSelection().getStartElement()) && m.scrollIntoView(!0)) : d.$.scrollTo(r.x, r.y) : (a && (m.selectionStart = a[0], m.selectionEnd = a[1]), m.scrollLeft = r[0], m.scrollTop = r[1]), a = r = null, u = this.state, e.fire("maximize", this.state)
                        },
                        canUndo: !1
                    }), e.ui.addButton && e.ui.addButton("Maximize", {
                        label: l.maximize.maximize,
                        command: "maximize",
                        toolbar: "tools,10"
                    }), e.on("mode", function () {
                        var t = e.getCommand("maximize");
                        t.setState(t.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : u)
                    }, null, null, 100)
                }
            }
        })
    }(),function () {
        function e(e, t, n) {
            var i = CKEDITOR.cleanWord;
            return i ? n() : (e = CKEDITOR.getUrl(e.config.pasteFromWordCleanupFile || t + "filter/default.js"), CKEDITOR.scriptLoader.load(e, n, null, !0)), !i
        }

        CKEDITOR.plugins.add("pastefromword", {
            requires: "clipboard", init: function (t) {
                function n(e) {
                    var t, n = CKEDITOR.plugins.pastefromword && CKEDITOR.plugins.pastefromword.images, i = [];
                    if (n && e.editor.filter.check("img[src]") && (t = n.extractTagsFromHtml(e.data.dataValue), 0 !== t.length && (n = n.extractFromRtf(e.data.dataTransfer["text/rtf"]), 0 !== n.length && (CKEDITOR.tools.array.forEach(n, function (e) {
                            i.push(e.type ? "data:" + e.type + ";base64," + CKEDITOR.tools.convertBytesToBase64(CKEDITOR.tools.convertHexStringToBytes(e.hex)) : null)
                        }, this), t.length === i.length))))for (n = 0; n < t.length; n++)0 === t[n].indexOf("file://") && i[n] && (e.data.dataValue = e.data.dataValue.replace(t[n], i[n]))
                }

                var i = 0, o = this.path,
                    a = void 0 === t.config.pasteFromWord_inlineImages || t.config.pasteFromWord_inlineImages;
                t.addCommand("pastefromword", {
                    canUndo: !1, async: !0, exec: function (e, t) {
                        i = 1, e.execCommand("paste", {
                            type: "html",
                            notification: !t || void 0 === t.notification || t.notification
                        })
                    }
                }), CKEDITOR.plugins.clipboard.addPasteButton(t, "PasteFromWord", {
                    label: t.lang.pastefromword.toolbar,
                    command: "pastefromword",
                    toolbar: "clipboard,50"
                }), t.on("paste", function (n) {
                    var a = n.data,
                        r = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? a.dataTransfer.getData("text/html", !0) : null,
                        s = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? a.dataTransfer.getData("text/rtf") : null,
                        r = r || a.dataValue, l = {dataValue: r, dataTransfer: {"text/rtf": s}},
                        s = /(class=\"?Mso|style=(?:\"|\')[^\"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/,
                        s = /<meta\s*name=(?:\"|\')?generator(?:\"|\')?\s*content=(?:\"|\')?microsoft/gi.test(r) || s.test(r);
                    if (r && (i || s) && (!1 !== t.fire("pasteFromWord", l) || i)) {
                        a.dontFilter = !0;
                        var c = e(t, o, function () {
                            c ? t.fire("paste", a) : (!t.config.pasteFromWordPromptCleanup || i || confirm(t.lang.pastefromword.confirmCleanup)) && (l.dataValue = CKEDITOR.cleanWord(l.dataValue, t), t.fire("afterPasteFromWord", l), a.dataValue = l.dataValue, !0 === t.config.forcePasteAsPlainText ? a.type = "text" : CKEDITOR.env.ie && "allow-word" === t.config.forcePasteAsPlainText && (a.type = "html")), i = 0
                        });
                        c && n.cancel()
                    }
                }, null, null, 3), CKEDITOR.plugins.clipboard.isCustomDataTypesSupported && a && t.on("afterPasteFromWord", n)
            }
        })
    }(),function () {
        var e = {
            canUndo: !1, async: !0, exec: function (e, t) {
                var n = e.lang,
                    i = CKEDITOR.tools.keystrokeToString(n.common.keyboard, e.getCommandKeystroke(CKEDITOR.env.ie ? e.commands.paste : this)),
                    o = t && void 0 !== t.notification ? t.notification : !t || !t.from || "keystrokeHandler" === t.from && CKEDITOR.env.ie,
                    n = o && "string" == typeof o ? o : n.pastetext.pasteNotification.replace(/%1/, '<kbd aria-label="' + i.aria + '">' + i.display + "</kbd>");
                e.execCommand("paste", {type: "text", notification: !!o && n})
            }
        };
        CKEDITOR.plugins.add("pastetext", {
            requires: "clipboard", init: function (t) {
                var n = CKEDITOR.env.safari ? CKEDITOR.CTRL + CKEDITOR.ALT + CKEDITOR.SHIFT + 86 : CKEDITOR.CTRL + CKEDITOR.SHIFT + 86;
                t.addCommand("pastetext", e), t.setKeystroke(n, "pastetext"), CKEDITOR.plugins.clipboard.addPasteButton(t, "PasteText", {
                    label: t.lang.pastetext.button,
                    command: "pastetext",
                    toolbar: "clipboard,40"
                }), t.config.forcePasteAsPlainText && t.on("beforePaste", function (e) {
                    "html" != e.data.type && (e.data.type = "text")
                }), t.on("pasteState", function (e) {
                    t.getCommand("pastetext").setState(e.data)
                })
            }
        })
    }(),CKEDITOR.plugins.add("removeformat", {
        init: function (e) {
            e.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat), e.ui.addButton && e.ui.addButton("RemoveFormat", {
                label: e.lang.removeformat.toolbar,
                command: "removeFormat",
                toolbar: "cleanup,10"
            })
        }
    }),CKEDITOR.plugins.removeformat = {
        commands: {
            removeformat: {
                exec: function (e) {
                    for (var t, n = e._.removeFormatRegex || (e._.removeFormatRegex = new RegExp("^(?:" + e.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), i = e._.removeAttributes || (e._.removeAttributes = e.config.removeFormatAttributes.split(",")), o = CKEDITOR.plugins.removeformat.filter, a = e.getSelection().getRanges(), r = a.createIterator(), s = function (e) {
                        return e.type == CKEDITOR.NODE_ELEMENT
                    }; t = r.getNextRange();) {
                        t.collapsed || t.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                        var l = t.createBookmark(), c = l.startNode, d = l.endNode, u = function (t) {
                            for (var i, a = e.elementPath(t), r = a.elements, s = 1; (i = r[s]) && !i.equals(a.block) && !i.equals(a.blockLimit); s++)n.test(i.getName()) && o(e, i) && t.breakParent(i)
                        };
                        if (u(c), d)for (u(d), c = c.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); c && !c.equals(d);)if (c.isReadOnly()) {
                            if (c.getPosition(d) & CKEDITOR.POSITION_CONTAINS)break;
                            c = c.getNext(s)
                        } else u = c.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), "img" == c.getName() && c.data("cke-realelement") || !o(e, c) || (n.test(c.getName()) ? c.remove(1) : (c.removeAttributes(i), e.fire("removeFormatCleanup", c))), c = u;
                        t.moveToBookmark(l)
                    }
                    e.forceNextSelectionCheck(), e.getSelection().selectRanges(a)
                }
            }
        }, filter: function (e, t) {
            for (var n = e._.removeFormatFilters || [], i = 0; i < n.length; i++)if (!1 === n[i](t))return !1;
            return !0
        }
    },CKEDITOR.editor.prototype.addRemoveFormatFilter = function (e) {
        this._.removeFormatFilters || (this._.removeFormatFilters = []), this._.removeFormatFilters.push(e)
    },CKEDITOR.config.removeFormatTags = "b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var",CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign",CKEDITOR.plugins.add("resize", {
        init: function (e) {
            function t(t) {
                var n = s.width, o = s.height, l = n + (t.data.$.screenX - r.x) * ("rtl" == a ? -1 : 1);
                t = o + (t.data.$.screenY - r.y), c && (n = Math.max(i.resize_minWidth, Math.min(l, i.resize_maxWidth))), d && (o = Math.max(i.resize_minHeight, Math.min(t, i.resize_maxHeight))), e.resize(c ? n : null, o)
            }

            function n() {
                CKEDITOR.document.removeListener("mousemove", t), CKEDITOR.document.removeListener("mouseup", n), e.document && (e.document.removeListener("mousemove", t), e.document.removeListener("mouseup", n))
            }

            var i = e.config, o = e.ui.spaceId("resizer"), a = e.element ? e.element.getDirection(1) : "ltr";
            if (!i.resize_dir && (i.resize_dir = "vertical"), void 0 === i.resize_maxWidth && (i.resize_maxWidth = 3e3), void 0 === i.resize_maxHeight && (i.resize_maxHeight = 3e3), void 0 === i.resize_minWidth && (i.resize_minWidth = 750), void 0 === i.resize_minHeight && (i.resize_minHeight = 250), !1 !== i.resize_enabled) {
                var r, s, l = null,
                    c = ("both" == i.resize_dir || "horizontal" == i.resize_dir) && i.resize_minWidth != i.resize_maxWidth,
                    d = ("both" == i.resize_dir || "vertical" == i.resize_dir) && i.resize_minHeight != i.resize_maxHeight,
                    u = CKEDITOR.tools.addFunction(function (o) {
                        l || (l = e.getResizable()), s = {
                            width: l.$.offsetWidth || 0,
                            height: l.$.offsetHeight || 0
                        }, r = {
                            x: o.screenX,
                            y: o.screenY
                        }, i.resize_minWidth > s.width && (i.resize_minWidth = s.width), i.resize_minHeight > s.height && (i.resize_minHeight = s.height), CKEDITOR.document.on("mousemove", t), CKEDITOR.document.on("mouseup", n), e.document && (e.document.on("mousemove", t), e.document.on("mouseup", n)), o.preventDefault && o.preventDefault()
                    });
                e.on("destroy", function () {
                    CKEDITOR.tools.removeFunction(u)
                }), e.on("uiSpace", function (t) {
                    if ("bottom" == t.data.space) {
                        var n = "";
                        c && !d && (n = " cke_resizer_horizontal"), !c && d && (n = " cke_resizer_vertical");
                        var i = '<span id="' + o + '" class="cke_resizer' + n + " cke_resizer_" + a + '" title="' + CKEDITOR.tools.htmlEncode(e.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + u + ', event)">' + ("ltr" == a ? "◢" : "◣") + "</span>";
                        "ltr" == a && "ltr" == n ? t.data.html += i : t.data.html = i + t.data.html
                    }
                }, e, null, 100), e.on("maximize", function (t) {
                    e.ui.space("resizer")[t.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]()
                })
            }
        }
    }),CKEDITOR.plugins.add("menubutton", {
        requires: "button,menu", onLoad: function () {
            var e = function (e) {
                var t = this._, n = t.menu
                ;t.state !== CKEDITOR.TRISTATE_DISABLED && (t.on && n ? n.hide() : (t.previousState = t.state, n || (n = t.menu = new CKEDITOR.menu(e, {
                    panel: {
                        className: "cke_menu_panel",
                        attributes: {"aria-label": e.lang.common.options}
                    }
                }), n.onHide = CKEDITOR.tools.bind(function () {
                    var n = this.command ? e.getCommand(this.command).modes : this.modes;
                    this.setState(!n || n[e.mode] ? t.previousState : CKEDITOR.TRISTATE_DISABLED), t.on = 0
                }, this), this.onMenu && n.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON), t.on = 1, setTimeout(function () {
                    n.show(CKEDITOR.document.getById(t.id), 4)
                }, 0)))
            };
            CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.button, $: function (t) {
                    delete t.panel, this.base(t), this.hasArrow = !0, this.click = e
                }, statics: {
                    handler: {
                        create: function (e) {
                            return new CKEDITOR.ui.menuButton(e)
                        }
                    }
                }
            })
        }, beforeInit: function (e) {
            e.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler)
        }
    }),CKEDITOR.UI_MENUBUTTON = "menubutton",CKEDITOR.plugins.add("scayt", {
        requires: "menubutton,dialog",
        tabToOpen: null,
        dialogName: "scaytDialog",
        onLoad: function (e) {
            CKEDITOR.plugins.scayt.onLoadTimestamp = (new Date).getTime(), "moono-lisa" == (CKEDITOR.skinName || e.config.skin) && CKEDITOR.document.appendStyleSheet(this.path + "skins/" + CKEDITOR.skin.name + "/scayt.css"), CKEDITOR.document.appendStyleSheet(this.path + "dialogs/dialog.css")
        },
        init: function (e) {
            var t = this, n = CKEDITOR.plugins.scayt;
            this.bindEvents(e), this.parseConfig(e), this.addRule(e), CKEDITOR.dialog.add(this.dialogName, CKEDITOR.getUrl(this.path + "dialogs/options.js")), this.addMenuItems(e);
            var i = e.lang.scayt, o = CKEDITOR.env;
            e.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
                label: i.text_title,
                title: e.plugins.wsc ? e.lang.wsc.title : i.text_title,
                modes: {wysiwyg: !(o.ie && (8 > o.version || o.quirks))},
                toolbar: "spellchecker,20",
                refresh: function () {
                    var t = e.ui.instances.Scayt.getState();
                    e.scayt && (t = n.state.scayt[e.name] ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF), e.fire("scaytButtonState", t)
                },
                onRender: function () {
                    var t = this;
                    e.on("scaytButtonState", function (e) {
                        void 0 !== typeof e.data && t.setState(e.data)
                    })
                },
                onMenu: function () {
                    var t = e.scayt;
                    e.getMenuItem("scaytToggle").label = e.lang.scayt[t && n.state.scayt[e.name] ? "btn_disable" : "btn_enable"];
                    var i = {
                        scaytToggle: CKEDITOR.TRISTATE_OFF,
                        scaytOptions: t ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                        scaytLangs: t ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                        scaytDict: t ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                        scaytAbout: t ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                        WSC: e.plugins.wsc ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                    };
                    return e.config.scayt_uiTabs[0] || delete i.scaytOptions, e.config.scayt_uiTabs[1] || delete i.scaytLangs, e.config.scayt_uiTabs[2] || delete i.scaytDict, t && !CKEDITOR.plugins.scayt.isNewUdSupported(t) && (delete i.scaytDict, e.config.scayt_uiTabs[2] = 0, CKEDITOR.plugins.scayt.alarmCompatibilityMessage()), i
                }
            }), e.contextMenu && e.addMenuItems && (e.contextMenu.addListener(function (n, i) {
                var o, a, r = e.scayt;
                return r && (a = r.getSelectionNode()) && (o = t.menuGenerator(e, a), r.showBanner("." + e.contextMenu._.definition.panel.className.split(" ").join(" ."))), o
            }), e.contextMenu._.onHide = CKEDITOR.tools.override(e.contextMenu._.onHide, function (t) {
                return function () {
                    var n = e.scayt;
                    return n && n.hideBanner(), t.apply(this)
                }
            }))
        },
        addMenuItems: function (e) {
            var t = this, n = CKEDITOR.plugins.scayt;
            e.addMenuGroup("scaytButton");
            for (var i = e.config.scayt_contextMenuItemsOrder.split("|"), o = 0; o < i.length; o++)i[o] = "scayt_" + i[o];
            if ((i = ["grayt_description", "grayt_suggest", "grayt_control"].concat(i)) && i.length)for (o = 0; o < i.length; o++)e.addMenuGroup(i[o], o - 10);
            e.addCommand("scaytToggle", {
                exec: function (e) {
                    var t = e.scayt;
                    n.state.scayt[e.name] = !n.state.scayt[e.name], !0 === n.state.scayt[e.name] ? t || n.createScayt(e) : t && n.destroy(e)
                }
            }), e.addCommand("scaytAbout", {
                exec: function (e) {
                    e.scayt.tabToOpen = "about", e.lockSelection(), e.openDialog(t.dialogName)
                }
            }), e.addCommand("scaytOptions", {
                exec: function (e) {
                    e.scayt.tabToOpen = "options", e.lockSelection(), e.openDialog(t.dialogName)
                }
            }), e.addCommand("scaytLangs", {
                exec: function (e) {
                    e.scayt.tabToOpen = "langs", e.lockSelection(), e.openDialog(t.dialogName)
                }
            }), e.addCommand("scaytDict", {
                exec: function (e) {
                    e.scayt.tabToOpen = "dictionaries", e.lockSelection(), e.openDialog(t.dialogName)
                }
            }), i = {
                scaytToggle: {label: e.lang.scayt.btn_enable, group: "scaytButton", command: "scaytToggle"},
                scaytAbout: {label: e.lang.scayt.btn_about, group: "scaytButton", command: "scaytAbout"},
                scaytOptions: {label: e.lang.scayt.btn_options, group: "scaytButton", command: "scaytOptions"},
                scaytLangs: {label: e.lang.scayt.btn_langs, group: "scaytButton", command: "scaytLangs"},
                scaytDict: {label: e.lang.scayt.btn_dictionaries, group: "scaytButton", command: "scaytDict"}
            }, e.plugins.wsc && (i.WSC = {
                label: e.lang.wsc.toolbar, group: "scaytButton", onClick: function () {
                    var t = CKEDITOR.plugins.scayt, n = e.scayt,
                        i = e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? e.container.getText() : e.document.getBody().getText();
                    (i = i.replace(/\s/g, "")) ? (n && t.state.scayt[e.name] && n.setMarkupPaused && n.setMarkupPaused(!0), e.lockSelection(), e.execCommand("checkspell")) : alert("Nothing to check!")
                }
            }), e.addMenuItems(i)
        },
        bindEvents: function (e) {
            var t = CKEDITOR.plugins.scayt, n = e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE, i = function () {
                t.destroy(e)
            }, o = function () {
                !t.state.scayt[e.name] || e.readOnly || e.scayt || t.createScayt(e)
            }, a = function () {
                var t = e.editable();
                t.attachListener(t, "focus", function (t) {
                    CKEDITOR.plugins.scayt && !e.scayt && setTimeout(o, 0), t = CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[e.name] && e.scayt;
                    var i, a;
                    if ((n || t) && e._.savedSelection) {
                        t = e._.savedSelection.getSelectedElement(), t = !t && e._.savedSelection.getRanges();
                        for (var r = 0; r < t.length; r++)a = t[r], "string" == typeof a.startContainer.$.nodeValue && ((i = a.startContainer.getText().length) < a.startOffset || i < a.endOffset) && e.unlockSelection(!1)
                    }
                }, this, null, -10)
            }, r = function () {
                n ? e.config.scayt_inlineModeImmediateMarkup ? o() : (e.on("blur", function () {
                    setTimeout(i, 0)
                }), e.on("focus", o), e.focusManager.hasFocus && o()) : o(), a();
                var t = e.editable();
                t.attachListener(t, "mousedown", function (t) {
                    t = t.data.getTarget();
                    var n = e.widgets && e.widgets.getByElement(t);
                    n && (n.wrapper = t.getAscendant(function (e) {
                        return e.hasAttribute("data-cke-widget-wrapper")
                    }, !0))
                }, this, null, -10)
            };
            e.on("contentDom", r), e.on("beforeCommandExec", function (n) {
                var i = e.scayt, o = !1, a = !1, r = !0;
                n.data.name in t.options.disablingCommandExec && "wysiwyg" == e.mode ? i && (t.destroy(e), e.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED)) : "bold" !== n.data.name && "italic" !== n.data.name && "underline" !== n.data.name && "strike" !== n.data.name && "subscript" !== n.data.name && "superscript" !== n.data.name && "enter" !== n.data.name && "cut" !== n.data.name && "language" !== n.data.name || !i || ("cut" === n.data.name && (r = !1, a = !0), "language" === n.data.name && (a = o = !0), e.fire("reloadMarkupScayt", {
                        removeOptions: {
                            removeInside: r,
                            forceBookmark: a,
                            language: o
                        }, timeout: 0
                    }))
            }), e.on("beforeSetMode", function (n) {
                "source" == n.data && ((n = e.scayt) && (t.destroy(e), e.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED)), e.document && e.document.getBody().removeAttribute("_jquid"))
            }), e.on("afterCommandExec", function (n) {
                "wysiwyg" != e.mode || "undo" != n.data.name && "redo" != n.data.name || setTimeout(function () {
                    t.reloadMarkup(e.scayt)
                }, 250)
            }), e.on("readOnly", function (n) {
                var i;
                n && (i = e.scayt, !0 === n.editor.readOnly ? i && i.fire("removeMarkupInDocument", {}) : i ? t.reloadMarkup(i) : "wysiwyg" == n.editor.mode && !0 === t.state.scayt[n.editor.name] && (t.createScayt(e), n.editor.fire("scaytButtonState", CKEDITOR.TRISTATE_ON)))
            }), e.on("beforeDestroy", i), e.on("setData", function () {
                i(), (e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE || e.plugins.divarea) && r()
            }, this, null, 50), e.on("reloadMarkupScayt", function (n) {
                var i = n.data && n.data.removeOptions, o = n.data && n.data.timeout, a = n.data && n.data.language,
                    r = e.scayt;
                r && setTimeout(function () {
                    a && (i.selectionNode = e.plugins.language.getCurrentLangElement(e), i.selectionNode = i.selectionNode && i.selectionNode.$ || null), r.removeMarkupInSelectionNode(i), t.reloadMarkup(r)
                }, o || 0)
            }), e.on("insertElement", function () {
                e.fire("reloadMarkupScayt", {removeOptions: {forceBookmark: !0}})
            }, this, null, 50), e.on("insertHtml", function () {
                e.scayt && e.scayt.setFocused && e.scayt.setFocused(!0), e.fire("reloadMarkupScayt")
            }, this, null, 50), e.on("insertText", function () {
                e.scayt && e.scayt.setFocused && e.scayt.setFocused(!0), e.fire("reloadMarkupScayt")
            }, this, null, 50), e.on("scaytDialogShown", function (t) {
                t.data.selectPage(e.scayt.tabToOpen)
            })
        },
        parseConfig: function (e) {
            var t = CKEDITOR.plugins.scayt;
            if (t.replaceOldOptionsNames(e.config), "boolean" != typeof e.config.scayt_autoStartup && (e.config.scayt_autoStartup = !1), t.state.scayt[e.name] = e.config.scayt_autoStartup, "boolean" != typeof e.config.grayt_autoStartup && (e.config.grayt_autoStartup = !1), "boolean" != typeof e.config.scayt_inlineModeImmediateMarkup && (e.config.scayt_inlineModeImmediateMarkup = !1), t.state.grayt[e.name] = e.config.grayt_autoStartup, e.config.scayt_contextCommands || (e.config.scayt_contextCommands = "ignoreall|add"), e.config.scayt_contextMenuItemsOrder || (e.config.scayt_contextMenuItemsOrder = "suggest|moresuggest|control"), e.config.scayt_sLang || (e.config.scayt_sLang = "en_US"), (void 0 === e.config.scayt_maxSuggestions || "number" != typeof e.config.scayt_maxSuggestions || 0 > e.config.scayt_maxSuggestions) && (e.config.scayt_maxSuggestions = 3), (void 0 === e.config.scayt_minWordLength || "number" != typeof e.config.scayt_minWordLength || 1 > e.config.scayt_minWordLength) && (e.config.scayt_minWordLength = 3), void 0 !== e.config.scayt_customDictionaryIds && "string" == typeof e.config.scayt_customDictionaryIds || (e.config.scayt_customDictionaryIds = ""), void 0 !== e.config.scayt_userDictionaryName && "string" == typeof e.config.scayt_userDictionaryName || (e.config.scayt_userDictionaryName = null), "string" == typeof e.config.scayt_uiTabs && 3 === e.config.scayt_uiTabs.split(",").length) {
                var n = [], i = [];
                e.config.scayt_uiTabs = e.config.scayt_uiTabs.split(","), CKEDITOR.tools.search(e.config.scayt_uiTabs, function (e) {
                    1 === Number(e) || 0 === Number(e) ? (i.push(!0), n.push(Number(e))) : i.push(!1)
                }), null === CKEDITOR.tools.search(i, !1) ? e.config.scayt_uiTabs = n : e.config.scayt_uiTabs = [1, 1, 1]
            } else e.config.scayt_uiTabs = [1, 1, 1];
            if ("string" != typeof e.config.scayt_serviceProtocol && (e.config.scayt_serviceProtocol = null), "string" != typeof e.config.scayt_serviceHost && (e.config.scayt_serviceHost = null), "string" != typeof e.config.scayt_servicePort && (e.config.scayt_servicePort = null), "string" != typeof e.config.scayt_servicePath && (e.config.scayt_servicePath = null), e.config.scayt_moreSuggestions || (e.config.scayt_moreSuggestions = "on"), "string" != typeof e.config.scayt_customerId && (e.config.scayt_customerId = "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2"), "string" != typeof e.config.scayt_customPunctuation && (e.config.scayt_customPunctuation = "-"), "string" != typeof e.config.scayt_srcUrl && (t = document.location.protocol, t = -1 != t.search(/https?:/) ? t : "http:", e.config.scayt_srcUrl = t + "//svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/ckscayt.js"), "boolean" != typeof CKEDITOR.config.scayt_handleCheckDirty && (CKEDITOR.config.scayt_handleCheckDirty = !0), "boolean" != typeof CKEDITOR.config.scayt_handleUndoRedo && (CKEDITOR.config.scayt_handleUndoRedo = !0), CKEDITOR.config.scayt_handleUndoRedo = !!CKEDITOR.plugins.undo && CKEDITOR.config.scayt_handleUndoRedo, "boolean" != typeof e.config.scayt_multiLanguageMode && (e.config.scayt_multiLanguageMode = !1), "object" != typeof e.config.scayt_multiLanguageStyles && (e.config.scayt_multiLanguageStyles = {}), e.config.scayt_ignoreAllCapsWords && "boolean" != typeof e.config.scayt_ignoreAllCapsWords && (e.config.scayt_ignoreAllCapsWords = !1), e.config.scayt_ignoreDomainNames && "boolean" != typeof e.config.scayt_ignoreDomainNames && (e.config.scayt_ignoreDomainNames = !1), e.config.scayt_ignoreWordsWithMixedCases && "boolean" != typeof e.config.scayt_ignoreWordsWithMixedCases && (e.config.scayt_ignoreWordsWithMixedCases = !1), e.config.scayt_ignoreWordsWithNumbers && "boolean" != typeof e.config.scayt_ignoreWordsWithNumbers && (e.config.scayt_ignoreWordsWithNumbers = !1), e.config.scayt_disableOptionsStorage) {
                var t = CKEDITOR.tools.isArray(e.config.scayt_disableOptionsStorage) ? e.config.scayt_disableOptionsStorage : "string" == typeof e.config.scayt_disableOptionsStorage ? [e.config.scayt_disableOptionsStorage] : void 0,
                    o = "all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "),
                    a = ["lang", "ignore-all-caps-words", "ignore-domain-names", "ignore-words-with-mixed-cases", "ignore-words-with-numbers"],
                    r = CKEDITOR.tools.search, s = CKEDITOR.tools.indexOf;
                e.config.scayt_disableOptionsStorage = function (e) {
                    for (var t = [], n = 0; n < e.length; n++) {
                        var i = e[n], l = !!r(e, "options");
                        if (!r(o, i) || l && r(a, function (e) {
                                if ("lang" === e)return !1
                            }))return;
                        if (r(a, i) && a.splice(s(a, i), 1), "all" === i || l && r(e, "lang"))return [];
                        "options" === i && (a = ["lang"])
                    }
                    return t = t.concat(a)
                }(t)
            }
        },
        addRule: function (e) {
            var t = CKEDITOR.plugins.scayt, n = e.dataProcessor, i = n && n.htmlFilter,
                o = e._.elementsPath && e._.elementsPath.filters, n = n && n.dataFilter, a = e.addRemoveFormatFilter,
                r = function (n) {
                    if (e.scayt && (n.hasAttribute(t.options.data_attribute_name) || n.hasAttribute(t.options.problem_grammar_data_attribute)))return !1
                }, s = function (n) {
                    var i = !0;
                    return e.scayt && (n.hasAttribute(t.options.data_attribute_name) || n.hasAttribute(t.options.problem_grammar_data_attribute)) && (i = !1), i
                };
            o && o.push(r), n && n.addRules({
                elements: {
                    span: function (e) {
                        var n = e.hasClass(t.options.misspelled_word_class) && e.attributes[t.options.data_attribute_name],
                            i = e.hasClass(t.options.problem_grammar_class) && e.attributes[t.options.problem_grammar_data_attribute];
                        return t && (n || i) && delete e.name, e
                    }
                }
            }), i && i.addRules({
                elements: {
                    span: function (e) {
                        var n = e.hasClass(t.options.misspelled_word_class) && e.attributes[t.options.data_attribute_name],
                            i = e.hasClass(t.options.problem_grammar_class) && e.attributes[t.options.problem_grammar_data_attribute];
                        return t && (n || i) && delete e.name, e
                    }
                }
            }), a && a.call(e, s)
        },
        scaytMenuDefinition: function (e) {
            var t = this;
            return e = e.scayt, {
                scayt: {
                    scayt_ignore: {
                        label: e.getLocal("btn_ignore"),
                        group: "scayt_control",
                        order: 1,
                        exec: function (e) {
                            e.scayt.ignoreWord()
                        }
                    },
                    scayt_ignoreall: {
                        label: e.getLocal("btn_ignoreAll"),
                        group: "scayt_control",
                        order: 2,
                        exec: function (e) {
                            e.scayt.ignoreAllWords()
                        }
                    },
                    scayt_add: {
                        label: e.getLocal("btn_addWord"), group: "scayt_control", order: 3, exec: function (e) {
                            var t = e.scayt;
                            setTimeout(function () {
                                t.addWordToUserDictionary()
                            }, 10)
                        }
                    },
                    scayt_option: {
                        label: e.getLocal("btn_options"), group: "scayt_control", order: 4, exec: function (e) {
                            e.scayt.tabToOpen = "options", e.lockSelection(), e.openDialog(t.dialogName)
                        }, verification: function (e) {
                            return 1 == e.config.scayt_uiTabs[0]
                        }
                    },
                    scayt_language: {
                        label: e.getLocal("btn_langs"), group: "scayt_control", order: 5, exec: function (e) {
                            e.scayt.tabToOpen = "langs", e.lockSelection(), e.openDialog(t.dialogName)
                        }, verification: function (e) {
                            return 1 == e.config.scayt_uiTabs[1]
                        }
                    },
                    scayt_dictionary: {
                        label: e.getLocal("btn_dictionaries"),
                        group: "scayt_control",
                        order: 6,
                        exec: function (e) {
                            e.scayt.tabToOpen = "dictionaries", e.lockSelection(), e.openDialog(t.dialogName)
                        },
                        verification: function (e) {
                            return 1 == e.config.scayt_uiTabs[2]
                        }
                    },
                    scayt_about: {
                        label: e.getLocal("btn_about"), group: "scayt_control", order: 7, exec: function (e) {
                            e.scayt.tabToOpen = "about", e.lockSelection(), e.openDialog(t.dialogName)
                        }
                    }
                },
                grayt: {
                    grayt_problemdescription: {
                        label: "Grammar problem description",
                        group: "grayt_description",
                        order: 1,
                        state: CKEDITOR.TRISTATE_DISABLED,
                        exec: function (e) {
                        }
                    },
                    grayt_ignore: {
                        label: e.getLocal("btn_ignore"),
                        group: "grayt_control",
                        order: 2,
                        exec: function (e) {
                            e.scayt.ignorePhrase()
                        }
                    },
                    grayt_ignoreall: {
                        label: e.getLocal("btn_ignoreAll"),
                        group: "grayt_control",
                        order: 3,
                        exec: function (e) {
                            e.scayt.ignoreAllPhrases()
                        }
                    }
                }
            }
        },
        buildSuggestionMenuItems: function (e, t, n) {
            var i = {}, o = {}, a = n ? "word" : "phrase", r = n ? "startGrammarCheck" : "startSpellCheck", s = e.scayt;
            if (0 < t.length && "no_any_suggestions" !== t[0])if (n)for (n = 0; n < t.length; n++) {
                var l = "scayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[n].replace(" ", "_");
                e.addCommand(l, this.createCommand(CKEDITOR.plugins.scayt.suggestions[n], a, r)), n < e.config.scayt_maxSuggestions ? (e.addMenuItem(l, {
                    label: t[n],
                    command: l,
                    group: "scayt_suggest",
                    order: n + 1
                }), i[l] = CKEDITOR.TRISTATE_OFF) : (e.addMenuItem(l, {
                    label: t[n],
                    command: l,
                    group: "scayt_moresuggest",
                    order: n + 1
                }), o[l] = CKEDITOR.TRISTATE_OFF, "on" === e.config.scayt_moreSuggestions && (e.addMenuItem("scayt_moresuggest", {
                    label: s.getLocal("btn_moreSuggestions"),
                    group: "scayt_moresuggest",
                    order: 10,
                    getItems: function () {
                        return o
                    }
                }), i.scayt_moresuggest = CKEDITOR.TRISTATE_OFF))
            } else for (n = 0; n < t.length; n++)l = "grayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[n].replace(" ", "_"), e.addCommand(l, this.createCommand(CKEDITOR.plugins.scayt.suggestions[n], a, r)), e.addMenuItem(l, {
                label: t[n],
                command: l,
                group: "grayt_suggest",
                order: n + 1
            }), i[l] = CKEDITOR.TRISTATE_OFF; else i.no_scayt_suggest = CKEDITOR.TRISTATE_DISABLED, e.addCommand("no_scayt_suggest", {
                exec: function () {
                }
            }), e.addMenuItem("no_scayt_suggest", {
                label: s.getLocal("btn_noSuggestions") || "no_scayt_suggest",
                command: "no_scayt_suggest",
                group: "scayt_suggest",
                order: 0
            });
            return i
        },
        menuGenerator: function (e, t) {
            var n, i, o, a = e.scayt, r = this.scaytMenuDefinition(e), s = {},
                l = e.config.scayt_contextCommands.split("|"), c = t.getAttribute(a.getLangAttribute()) || a.getLang();
            if (n = a.isScaytNode(t), i = a.isGraytNode(t), n ? (r = r.scayt, s = t.getAttribute(a.getScaytNodeAttributeName()), a.fire("getSuggestionsList", {
                    lang: c,
                    word: s
                }), s = this.buildSuggestionMenuItems(e, CKEDITOR.plugins.scayt.suggestions, n)) : i && (r = r.grayt, s = t.getAttribute(a.getGraytNodeAttributeName()), o = a.getProblemDescriptionText(s, c), r.grayt_problemdescription && o && (r.grayt_problemdescription.label = o), a.fire("getGrammarSuggestionsList", {
                        lang: c,
                        phrase: s
                    }), s = this.buildSuggestionMenuItems(e, CKEDITOR.plugins.scayt.suggestions, n)), n && "off" == e.config.scayt_contextCommands)return s;
            for (var d in r)n && -1 == CKEDITOR.tools.indexOf(l, d.replace("scayt_", "")) && "all" != e.config.scayt_contextCommands || i && "grayt_problemdescription" !== d && -1 == CKEDITOR.tools.indexOf(l, d.replace("grayt_", "")) && "all" != e.config.scayt_contextCommands || (s[d] = void 0 !== r[d].state ? r[d].state : CKEDITOR.TRISTATE_OFF, "function" != typeof r[d].verification || r[d].verification(e) || delete s[d], e.addCommand(d, {exec: r[d].exec}), e.addMenuItem(d, {
                label: e.lang.scayt[r[d].label] || r[d].label,
                command: d,
                group: r[d].group,
                order: r[d].order
            }));
            return s
        },
        createCommand: function (e, t, n) {
            return {
                exec: function (i) {
                    i = i.scayt;
                    var o = {};
                    o[t] = e, i.replaceSelectionNode(o), "startGrammarCheck" === n && i.removeMarkupInSelectionNode({grammarOnly: !0}), i.fire(n)
                }
            }
        }
    }),CKEDITOR.plugins.scayt = {
        charsToObserve: [{
            charName: "cke-fillingChar", charCode: function () {
                var e, t = CKEDITOR.version.match(/^\d(\.\d*)*/), t = t && t[0];
                if (t) {
                    e = "4.5.7";
                    var n, t = t.replace(/\./g, "");
                    e = e.replace(/\./g, ""), n = t.length - e.length, n = 0 <= n ? n : 0, e = parseInt(t) >= parseInt(e) * Math.pow(10, n)
                }
                return e ? Array(7).join(String.fromCharCode(8203)) : String.fromCharCode(8203)
            }()
        }],
        onLoadTimestamp: "",
        state: {scayt: {}, grayt: {}},
        warningCounter: 0,
        suggestions: [],
        options: {
            disablingCommandExec: {source: !0, newpage: !0, templates: !0},
            data_attribute_name: "data-scayt-word",
            misspelled_word_class: "scayt-misspell-word",
            problem_grammar_data_attribute: "data-grayt-phrase",
            problem_grammar_class: "gramm-problem"
        },
        backCompatibilityMap: {
            scayt_service_protocol: "scayt_serviceProtocol",
            scayt_service_host: "scayt_serviceHost",
            scayt_service_port: "scayt_servicePort",
            scayt_service_path: "scayt_servicePath",
            scayt_customerid: "scayt_customerId"
        },
        alarmCompatibilityMessage: function () {
            5 > this.warningCounter && (console.warn("You are using the latest version of SCAYT plugin for CKEditor with the old application version. In order to have access to the newest features, it is recommended to upgrade the application version to latest one as well. Contact us for more details at support@webspellchecker.net."), this.warningCounter += 1)
        },
        isNewUdSupported: function (e) {
            return !!e.getUserDictionary
        },
        reloadMarkup: function (e) {
            var t;
            e && (t = e.getScaytLangList(), e.reloadMarkup ? e.reloadMarkup() : (this.alarmCompatibilityMessage(), t && t.ltr && t.rtl && e.fire("startSpellCheck, startGrammarCheck")))
        },
        replaceOldOptionsNames: function (e) {
            for (var t in e)t in this.backCompatibilityMap && (e[this.backCompatibilityMap[t]] = e[t], delete e[t])
        },
        createScayt: function (e) {
            var t = this, n = CKEDITOR.plugins.scayt;
            this.loadScaytLibrary(e, function (e) {
                function i(e) {
                    return new SCAYT.CKSCAYT(e, function () {
                    }, function () {
                    })
                }

                var o = e.window && e.window.getFrame() || e.editable();
                if (o) {
                    o = {
                        lang: e.config.scayt_sLang,
                        container: o.$,
                        customDictionary: e.config.scayt_customDictionaryIds,
                        userDictionaryName: e.config.scayt_userDictionaryName,
                        localization: e.langCode,
                        customer_id: e.config.scayt_customerId,
                        customPunctuation: e.config.scayt_customPunctuation,
                        debug: e.config.scayt_debug,
                        data_attribute_name: t.options.data_attribute_name,
                        misspelled_word_class: t.options.misspelled_word_class,
                        problem_grammar_data_attribute: t.options.problem_grammar_data_attribute,
                        problem_grammar_class: t.options.problem_grammar_class,
                        "options-to-restore": e.config.scayt_disableOptionsStorage,
                        focused: e.editable().hasFocus,
                        ignoreElementsRegex: e.config.scayt_elementsToIgnore,
                        ignoreGraytElementsRegex: e.config.grayt_elementsToIgnore,
                        minWordLength: e.config.scayt_minWordLength,
                        multiLanguageMode: e.config.scayt_multiLanguageMode,
                        multiLanguageStyles: e.config.scayt_multiLanguageStyles,
                        graytAutoStartup: e.config.grayt_autoStartup,
                        charsToObserve: n.charsToObserve
                    }, e.config.scayt_serviceProtocol && (o.service_protocol = e.config.scayt_serviceProtocol), e.config.scayt_serviceHost && (o.service_host = e.config.scayt_serviceHost), e.config.scayt_servicePort && (o.service_port = e.config.scayt_servicePort), e.config.scayt_servicePath && (o.service_path = e.config.scayt_servicePath), "boolean" == typeof e.config.scayt_ignoreAllCapsWords && (o["ignore-all-caps-words"] = e.config.scayt_ignoreAllCapsWords), "boolean" == typeof e.config.scayt_ignoreDomainNames && (o["ignore-domain-names"] = e.config.scayt_ignoreDomainNames), "boolean" == typeof e.config.scayt_ignoreWordsWithMixedCases && (o["ignore-words-with-mixed-cases"] = e.config.scayt_ignoreWordsWithMixedCases), "boolean" == typeof e.config.scayt_ignoreWordsWithNumbers && (o["ignore-words-with-numbers"] = e.config.scayt_ignoreWordsWithNumbers);
                    var a;
                    try {
                        a = i(o)
                    } catch (e) {
                        t.alarmCompatibilityMessage(), delete o.charsToObserve, a = i(o)
                    }
                    a.subscribe("suggestionListSend", function (e) {
                        for (var t = {}, n = [], i = 0; i < e.suggestionList.length; i++)t["word_" + e.suggestionList[i]] || (t["word_" + e.suggestionList[i]] = e.suggestionList[i], n.push(e.suggestionList[i]));
                        CKEDITOR.plugins.scayt.suggestions = n
                    }), a.subscribe("selectionIsChanged", function (t) {
                        e.getSelection().isLocked && "restoreSelection" !== t.action && e.lockSelection(), "restoreSelection" === t.action && e.selectionChange(!0)
                    }), a.subscribe("graytStateChanged", function (t) {
                        n.state.grayt[e.name] = t.state
                    }), a.addMarkupHandler && a.addMarkupHandler(function (t) {
                        var n = e.editable(), i = n.getCustomData(t.charName);
                        i && (i.$ = t.node, n.setCustomData(t.charName, i))
                    }), e.scayt = a, e.fire("scaytButtonState", e.readOnly ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_ON)
                } else n.state.scayt[e.name] = !1
            })
        },
        destroy: function (e) {
            e.scayt && e.scayt.destroy(), delete e.scayt, e.fire("scaytButtonState", CKEDITOR.TRISTATE_OFF)
        },
        loadScaytLibrary: function (e, t) {
            var n, i = function () {
                CKEDITOR.fireOnce("scaytReady"), e.scayt || "function" == typeof t && t(e)
            };
            void 0 === window.SCAYT || "function" != typeof window.SCAYT.CKSCAYT ? (n = e.config.scayt_srcUrl + "?" + this.onLoadTimestamp, CKEDITOR.scriptLoader.load(n, function (e) {
                e && i()
            })) : window.SCAYT && "function" == typeof window.SCAYT.CKSCAYT && i()
        }
    },CKEDITOR.on("dialogDefinition", function (e) {
        var t = e.data.name;
        e = e.data.definition.dialog, "scaytDialog" !== t && "checkspell" !== t && (e.on("show", function (e) {
            e = e.sender && e.sender.getParentEditor();
            var t = CKEDITOR.plugins.scayt, n = e.scayt;
            n && t.state.scayt[e.name] && n.setMarkupPaused && n.setMarkupPaused(!0)
        }), e.on("hide", function (e) {
            e = e.sender && e.sender.getParentEditor();
            var t = CKEDITOR.plugins.scayt, n = e.scayt;
            n && t.state.scayt[e.name] && n.setMarkupPaused && n.setMarkupPaused(!1)
        })), "scaytDialog" === t && e.on("cancel", function (e) {
            return !1
        }, this, null, -1), "checkspell" === t && e.on("cancel", function (e) {
            e = e.sender && e.sender.getParentEditor();
            var t = CKEDITOR.plugins.scayt, n = e.scayt;
            n && t.state.scayt[e.name] && n.setMarkupPaused && n.setMarkupPaused(!1), e.unlockSelection()
        }, this, null, -2), "link" === t && e.on("ok", function (e) {
            var t = e.sender && e.sender.getParentEditor();
            t && setTimeout(function () {
                t.fire("reloadMarkupScayt", {removeOptions: {removeInside: !0, forceBookmark: !0}, timeout: 0})
            }, 0)
        }), "replace" === t && e.on("hide", function (e) {
            e = e.sender && e.sender.getParentEditor();
            var t = CKEDITOR.plugins.scayt, n = e.scayt;
            e && setTimeout(function () {
                n && (n.fire("removeMarkupInDocument", {}), t.reloadMarkup(n))
            }, 0)
        })
    }),CKEDITOR.on("scaytReady", function () {
        if (!0 === CKEDITOR.config.scayt_handleCheckDirty) {
            var e = CKEDITOR.editor.prototype;
            e.checkDirty = CKEDITOR.tools.override(e.checkDirty, function (e) {
                return function () {
                    var t = null, n = this.scayt;
                    if (CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt) {
                        if (t = "ready" == this.status)var i = n.removeMarkupFromString(this.getSnapshot()),
                            n = n.removeMarkupFromString(this._.previousValue), t = t && n !== i
                    } else t = e.call(this);
                    return t
                }
            }), e.resetDirty = CKEDITOR.tools.override(e.resetDirty, function (e) {
                return function () {
                    var t = this.scayt;
                    CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt ? this._.previousValue = t.removeMarkupFromString(this.getSnapshot()) : e.call(this)
                }
            })
        }
        if (!0 === CKEDITOR.config.scayt_handleUndoRedo) {
            var e = CKEDITOR.plugins.undo.Image.prototype,
                t = "function" == typeof e.equalsContent ? "equalsContent" : "equals";
            e[t] = CKEDITOR.tools.override(e[t], function (e) {
                return function (t) {
                    var n = t.editor.scayt, i = this.contents, o = t.contents, a = null;
                    return CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[t.editor.name] && t.editor.scayt && (this.contents = n.removeMarkupFromString(i) || "", t.contents = n.removeMarkupFromString(o) || ""), a = e.apply(this, arguments), this.contents = i, t.contents = o, a
                }
            })
        }
    }),function () {
        var e = {
            preserveState: !0, editorFocus: !1, readOnly: 1, exec: function (e) {
                this.toggleState(), this.refresh(e)
            }, refresh: function (e) {
                if (e.document) {
                    var t = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass";
                    e.editable()[t]("cke_show_borders")
                }
            }
        };
        CKEDITOR.plugins.add("showborders", {
            modes: {wysiwyg: 1}, onLoad: function () {
                var e;
                e = (CKEDITOR.env.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}"] : ".%1 table.%2,;.%1 table.%2 > tr > td, .%1 table.%2 > tr > th,;.%1 table.%2 > tbody > tr > td, .%1 table.%2 > tbody > tr > th,;.%1 table.%2 > thead > tr > td, .%1 table.%2 > thead > tr > th,;.%1 table.%2 > tfoot > tr > td, .%1 table.%2 > tfoot > tr > th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g, "cke_show_border").replace(/%1/g, "cke_show_borders "), CKEDITOR.addCss(e)
            }, init: function (t) {
                var n = t.addCommand("showborders", e);
                n.canUndo = !1, !1 !== t.config.startupShowBorders && n.setState(CKEDITOR.TRISTATE_ON), t.on("mode", function () {
                    n.state != CKEDITOR.TRISTATE_DISABLED && n.refresh(t)
                }, null, null, 100), t.on("contentDom", function () {
                    n.state != CKEDITOR.TRISTATE_DISABLED && n.refresh(t)
                }), t.on("removeFormatCleanup", function (e) {
                    e = e.data, t.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && e.is("table") && (!e.hasAttribute("border") || 0 >= parseInt(e.getAttribute("border"), 10)) && e.addClass("cke_show_border")
                })
            }, afterInit: function (e) {
                var t = e.dataProcessor;
                e = t && t.dataFilter, t = t && t.htmlFilter, e && e.addRules({
                    elements: {
                        table: function (e) {
                            e = e.attributes;
                            var t = e.class, n = parseInt(e.border, 10);
                            n && !(0 >= n) || t && -1 != t.indexOf("cke_show_border") || (e.class = (t || "") + " cke_show_border")
                        }
                    }
                }), t && t.addRules({
                    elements: {
                        table: function (e) {
                            e = e.attributes;
                            var t = e.class;
                            t && (e.class = t.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/, ""))
                        }
                    }
                })
            }
        }), CKEDITOR.on("dialogDefinition", function (e) {
            var t = e.data.name;
            "table" != t && "tableProperties" != t || (e = e.data.definition, t = e.getContents("info").get("txtBorder"), t.commit = CKEDITOR.tools.override(t.commit, function (e) {
                return function (t, n) {
                    e.apply(this, arguments);
                    var i = parseInt(this.getValue(), 10);
                    n[!i || 0 >= i ? "addClass" : "removeClass"]("cke_show_border")
                }
            }), (e = (e = e.getContents("advanced")) && e.get("advCSSClasses")) && (e.setup = CKEDITOR.tools.override(e.setup, function (e) {
                return function () {
                    e.apply(this, arguments), this.setValue(this.getValue().replace(/cke_show_border/, ""))
                }
            }), e.commit = CKEDITOR.tools.override(e.commit, function (e) {
                return function (t, n) {
                    e.apply(this, arguments), parseInt(n.getAttribute("border"), 10) || n.addClass("cke_show_border")
                }
            })))
        })
    }(),function () {
        CKEDITOR.plugins.add("sourcearea", {
            init: function (t) {
                function n() {
                    var e = o && this.equals(CKEDITOR.document.getActive());
                    this.hide(), this.setStyle("height", this.getParent().$.clientHeight + "px"), this.setStyle("width", this.getParent().$.clientWidth + "px"), this.show(), e && this.focus()
                }

                if (t.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var i = CKEDITOR.plugins.sourcearea;
                    t.addMode("source", function (i) {
                        var o = t.ui.space("contents").getDocument().createElement("textarea");
                        o.setStyles(CKEDITOR.tools.extend({
                            width: CKEDITOR.env.ie7Compat ? "99%" : "100%",
                            height: "100%",
                            resize: "none",
                            outline: "none",
                            "text-align": "left"
                        }, CKEDITOR.tools.cssVendorPrefix("tab-size", t.config.sourceAreaTabSize || 4))), o.setAttribute("dir", "ltr"), o.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu"), t.ui.space("contents").append(o), o = t.editable(new e(t, o)), o.setData(t.getData(1)), CKEDITOR.env.ie && (o.attachListener(t, "resize", n, o), o.attachListener(CKEDITOR.document.getWindow(), "resize", n, o), CKEDITOR.tools.setTimeout(n, 0, o)), t.fire("ariaWidget", this), i()
                    }), t.addCommand("source", i.commands.source), t.ui.addButton && t.ui.addButton("Source", {
                        label: t.lang.sourcearea.toolbar,
                        command: "source",
                        toolbar: "mode,10"
                    }), t.on("mode", function () {
                        t.getCommand("source").setState("source" == t.mode ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                    });
                    var o = CKEDITOR.env.ie && 9 == CKEDITOR.env.version
                }
            }
        });
        var e = CKEDITOR.tools.createClass({
            base: CKEDITOR.editable, proto: {
                setData: function (e) {
                    this.setValue(e), this.status = "ready", this.editor.fire("dataReady")
                }, getData: function () {
                    return this.getValue()
                }, insertHtml: function () {
                }, insertElement: function () {
                }, insertText: function () {
                }, setReadOnly: function (e) {
                    this[(e ? "set" : "remove") + "Attribute"]("readOnly", "readonly")
                }, detach: function () {
                    e.baseProto.detach.call(this), this.clearCustomData(), this.remove()
                }
            }
        })
    }(),CKEDITOR.plugins.sourcearea = {
        commands: {
            source: {
                modes: {wysiwyg: 1, source: 1},
                editorFocus: !1,
                readOnly: 1,
                exec: function (e) {
                    "wysiwyg" == e.mode && e.fire("saveSnapshot"), e.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED), e.setMode("source" == e.mode ? "wysiwyg" : "source")
                },
                canUndo: !1
            }
        }
    },CKEDITOR.plugins.add("specialchar", {
        availableLangs: {
            af: 1,
            ar: 1,
            az: 1,
            bg: 1,
            ca: 1,
            cs: 1,
            cy: 1,
            da: 1,
            de: 1,
            "de-ch": 1,
            el: 1,
            en: 1,
            "en-au": 1,
            "en-ca": 1,
            "en-gb": 1,
            eo: 1,
            es: 1,
            "es-mx": 1,
            et: 1,
            eu: 1,
            fa: 1,
            fi: 1,
            fr: 1,
            "fr-ca": 1,
            gl: 1,
            he: 1,
            hr: 1,
            hu: 1,
            id: 1,
            it: 1,
            ja: 1,
            km: 1,
            ko: 1,
            ku: 1,
            lt: 1,
            lv: 1,
            nb: 1,
            nl: 1,
            no: 1,
            oc: 1,
            pl: 1,
            pt: 1,
            "pt-br": 1,
            ro: 1,
            ru: 1,
            si: 1,
            sk: 1,
            sl: 1,
            sq: 1,
            sv: 1,
            th: 1,
            tr: 1,
            tt: 1,
            ug: 1,
            uk: 1,
            vi: 1,
            zh: 1,
            "zh-cn": 1
        }, requires: "dialog", init: function (e) {
            var t = this;
            CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js"), e.addCommand("specialchar", {
                exec: function () {
                    var n = e.langCode,
                        n = t.availableLangs[n] ? n : t.availableLangs[n.replace(/-.*/, "")] ? n.replace(/-.*/, "") : "en";
                    CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(t.path + "dialogs/lang/" + n + ".js"), function () {
                        CKEDITOR.tools.extend(e.lang.specialchar, t.langEntries[n]), e.openDialog("specialchar")
                    })
                }, modes: {wysiwyg: 1}, canUndo: !1
            }), e.ui.addButton && e.ui.addButton("SpecialChar", {
                label: e.lang.specialchar.toolbar,
                command: "specialchar",
                toolbar: "insert,50"
            })
        }
    }),
        CKEDITOR.config.specialChars = "! &quot; # $ % &amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ &euro; &lsquo; &rsquo; &ldquo; &rdquo; &ndash; &mdash; &iexcl; &cent; &pound; &curren; &yen; &brvbar; &sect; &uml; &copy; &ordf; &laquo; &not; &reg; &macr; &deg; &sup2; &sup3; &acute; &micro; &para; &middot; &cedil; &sup1; &ordm; &raquo; &frac14; &frac12; &frac34; &iquest; &Agrave; &Aacute; &Acirc; &Atilde; &Auml; &Aring; &AElig; &Ccedil; &Egrave; &Eacute; &Ecirc; &Euml; &Igrave; &Iacute; &Icirc; &Iuml; &ETH; &Ntilde; &Ograve; &Oacute; &Ocirc; &Otilde; &Ouml; &times; &Oslash; &Ugrave; &Uacute; &Ucirc; &Uuml; &Yacute; &THORN; &szlig; &agrave; &aacute; &acirc; &atilde; &auml; &aring; &aelig; &ccedil; &egrave; &eacute; &ecirc; &euml; &igrave; &iacute; &icirc; &iuml; &eth; &ntilde; &ograve; &oacute; &ocirc; &otilde; &ouml; &divide; &oslash; &ugrave; &uacute; &ucirc; &uuml; &yacute; &thorn; &yuml; &OElig; &oelig; &#372; &#374 &#373 &#375; &sbquo; &#8219; &bdquo; &hellip; &trade; &#9658; &bull; &rarr; &rArr; &hArr; &diams; &asymp;".split(" "),function () {
        CKEDITOR.plugins.add("stylescombo", {
            requires: "richcombo", init: function (e) {
                var t = e.config, n = e.lang.stylescombo, i = {}, o = [], a = [];
                e.on("stylesSet", function (n) {
                    if (n = n.data.styles) {
                        for (var r, s, l, c = 0, d = n.length; c < d; c++)r = n[c], e.blockless && r.element in CKEDITOR.dtd.$block || "string" == typeof r.type && !CKEDITOR.style.customHandlers[r.type] || (s = r.name, r = new CKEDITOR.style(r), e.filter.customConfig && !e.filter.check(r)) || (r._name = s, r._.enterMode = t.enterMode, r._.type = l = r.assignedTo || r.type, r._.weight = c + 1e3 * (l == CKEDITOR.STYLE_OBJECT ? 1 : l == CKEDITOR.STYLE_BLOCK ? 2 : 3), i[s] = r, o.push(r), a.push(r));
                        o.sort(function (e, t) {
                            return e._.weight - t._.weight
                        })
                    }
                }), e.ui.addRichCombo("Styles", {
                    label: n.label,
                    title: n.panelTitle,
                    toolbar: "styles,10",
                    allowedContent: a,
                    panel: {
                        css: [CKEDITOR.skin.getPath("editor")].concat(t.contentsCss),
                        multiSelect: !0,
                        attributes: {"aria-label": n.panelTitle}
                    },
                    init: function () {
                        var e, t, i, a, r, s;
                        for (r = 0, s = o.length; r < s; r++)e = o[r], t = e._name, a = e._.type, a != i && (this.startGroup(n["panelTitle" + String(a)]), i = a), this.add(t, e.type == CKEDITOR.STYLE_OBJECT ? t : e.buildPreview(), t);
                        this.commit()
                    },
                    onClick: function (t) {
                        e.focus(), e.fire("saveSnapshot"), t = i[t];
                        var n = e.elementPath();
                        t.group && t.removeStylesFromSameGroup(e) ? e.applyStyle(t) : e[t.checkActive(n, e) ? "removeStyle" : "applyStyle"](t), e.fire("saveSnapshot")
                    },
                    onRender: function () {
                        e.on("selectionChange", function (t) {
                            var n = this.getValue();
                            t = t.data.path.elements;
                            for (var o, a = 0, r = t.length; a < r; a++) {
                                o = t[a];
                                for (var s in i)if (i[s].checkElementRemovable(o, !0, e))return void(s != n && this.setValue(s))
                            }
                            this.setValue("")
                        }, this)
                    },
                    onOpen: function () {
                        var t = e.getSelection(), t = t.getSelectedElement() || t.getStartElement() || e.editable(),
                            t = e.elementPath(t), o = [0, 0, 0, 0];
                        this.showAll(), this.unmarkAll();
                        for (var a in i) {
                            var r = i[a], s = r._.type;
                            r.checkApplicable(t, e, e.activeFilter) ? o[s]++ : this.hideItem(a), r.checkActive(t, e) && this.mark(a)
                        }
                        o[CKEDITOR.STYLE_BLOCK] || this.hideGroup(n["panelTitle" + String(CKEDITOR.STYLE_BLOCK)]), o[CKEDITOR.STYLE_INLINE] || this.hideGroup(n["panelTitle" + String(CKEDITOR.STYLE_INLINE)]), o[CKEDITOR.STYLE_OBJECT] || this.hideGroup(n["panelTitle" + String(CKEDITOR.STYLE_OBJECT)])
                    },
                    refresh: function () {
                        var t = e.elementPath();
                        if (t) {
                            for (var n in i)if (i[n].checkApplicable(t, e, e.activeFilter))return;
                            this.setState(CKEDITOR.TRISTATE_DISABLED)
                        }
                    },
                    reset: function () {
                        i = {}, o = []
                    }
                })
            }
        })
    }(),function () {
        function e(e) {
            return {
                editorFocus: !1, canUndo: !1, modes: {wysiwyg: 1}, exec: function (t) {
                    if (t.editable().hasFocus) {
                        var n, i = t.getSelection();
                        if (n = new CKEDITOR.dom.elementPath(i.getCommonAncestor(), i.root).contains({
                                td: 1,
                                th: 1
                            }, 1)) {
                            var i = t.createRange(), o = CKEDITOR.tools.tryThese(function () {
                                var t = n.getParent().$.cells[n.$.cellIndex + (e ? -1 : 1)];
                                return t.parentNode.parentNode, t
                            }, function () {
                                var t = n.getParent(), t = t.getAscendant("table").$.rows[t.$.rowIndex + (e ? -1 : 1)];
                                return t.cells[e ? t.cells.length - 1 : 0]
                            });
                            if (o || e) {
                                if (!o)return !0;
                                o = new CKEDITOR.dom.element(o), i.moveToElementEditStart(o), i.checkStartOfBlock() && i.checkEndOfBlock() || i.selectNodeContents(o)
                            } else {
                                for (var a = n.getAscendant("table").$, o = n.getParent().$.cells, a = new CKEDITOR.dom.element(a.insertRow(-1), t.document), r = 0, s = o.length; r < s; r++)a.append(new CKEDITOR.dom.element(o[r], t.document).clone(!1, !1)).appendBogus();
                                i.moveToElementEditStart(a)
                            }
                            return i.select(!0), !0
                        }
                    }
                    return !1
                }
            }
        }

        var t = {editorFocus: !1, modes: {wysiwyg: 1, source: 1}}, n = {
            exec: function (e) {
                e.container.focusNext(!0, e.tabIndex)
            }
        }, i = {
            exec: function (e) {
                e.container.focusPrevious(!0, e.tabIndex)
            }
        };
        CKEDITOR.plugins.add("tab", {
            init: function (o) {
                for (var a = !1 !== o.config.enableTabKeyTools, r = o.config.tabSpaces || 0, s = ""; r--;)s += " ";
                s && o.on("key", function (e) {
                    9 == e.data.keyCode && (o.insertText(s), e.cancel())
                }), a && o.on("key", function (e) {
                    (9 == e.data.keyCode && o.execCommand("selectNextCell") || e.data.keyCode == CKEDITOR.SHIFT + 9 && o.execCommand("selectPreviousCell")) && e.cancel()
                }), o.addCommand("blur", CKEDITOR.tools.extend(n, t)), o.addCommand("blurBack", CKEDITOR.tools.extend(i, t)), o.addCommand("selectNextCell", e()), o.addCommand("selectPreviousCell", e(!0))
            }
        })
    }(),CKEDITOR.dom.element.prototype.focusNext = function (e, t) {
        var n, i, o, a, r, s, l = void 0 === t ? this.getTabIndex() : t;
        if (0 >= l)for (r = this.getNextSourceNode(e, CKEDITOR.NODE_ELEMENT); r;) {
            if (r.isVisible() && 0 === r.getTabIndex()) {
                o = r;
                break
            }
            r = r.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT)
        } else for (r = this.getDocument().getBody().getFirst(); r = r.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
            if (!n)if (!i && r.equals(this)) {
                if (i = !0, e) {
                    if (!(r = r.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT)))break;
                    n = 1
                }
            } else i && !this.contains(r) && (n = 1);
            if (r.isVisible() && !(0 > (s = r.getTabIndex()))) {
                if (n && s == l) {
                    o = r;
                    break
                }
                s > l && (!o || !a || s < a) ? (o = r, a = s) : o || 0 !== s || (o = r, a = s)
            }
        }
        o && o.focus()
    },CKEDITOR.dom.element.prototype.focusPrevious = function (e, t) {
        for (var n, i, o, a, r = void 0 === t ? this.getTabIndex() : t, s = 0, l = this.getDocument().getBody().getLast(); l = l.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
            if (!n)if (!i && l.equals(this)) {
                if (i = !0, e) {
                    if (!(l = l.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT)))break;
                    n = 1
                }
            } else i && !this.contains(l) && (n = 1);
            if (l.isVisible() && !(0 > (a = l.getTabIndex())))if (0 >= r) {
                if (n && 0 === a) {
                    o = l;
                    break
                }
                a > s && (o = l, s = a)
            } else {
                if (n && a == r) {
                    o = l;
                    break
                }
                a < r && (!o || a > s) && (o = l, s = a)
            }
        }
        o && o.focus()
    },CKEDITOR.plugins.add("table", {
        requires: "dialog", init: function (e) {
            function t(e) {
                return CKEDITOR.tools.extend(e || {}, {
                    contextSensitive: 1, refresh: function (e, t) {
                        this.setState(t.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                    }
                })
            }

            if (!e.blockless) {
                var n = e.lang.table;
                e.addCommand("table", new CKEDITOR.dialogCommand("table", {
                    context: "table",
                    allowedContent: "table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];" + (e.plugins.dialogadvtab ? "table" + e.plugins.dialogadvtab.allowedContent() : ""),
                    requiredContent: "table",
                    contentTransformations: [["table{width}: sizeToStyle", "table[width]: sizeToAttribute"], ["td: splitBorderShorthand"], [{
                        element: "table",
                        right: function (e) {
                            if (e.styles) {
                                var t;
                                if (e.styles.border) t = CKEDITOR.tools.style.parse.border(e.styles.border); else if (CKEDITOR.env.ie && 8 === CKEDITOR.env.version) {
                                    var n = e.styles;
                                    n["border-left"] && n["border-left"] === n["border-right"] && n["border-right"] === n["border-top"] && n["border-top"] === n["border-bottom"] && (t = CKEDITOR.tools.style.parse.border(n["border-top"]))
                                }
                                t && t.style && "solid" === t.style && t.width && 0 !== parseFloat(t.width) && (e.attributes.border = 1), "collapse" == e.styles["border-collapse"] && (e.attributes.cellspacing = 0)
                            }
                        }
                    }]]
                })), e.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", t())), e.addCommand("tableDelete", t({
                    exec: function (e) {
                        var t = e.elementPath().contains("table", 1);
                        if (t) {
                            var n = t.getParent(), i = e.editable();
                            1 != n.getChildCount() || n.is("td", "th") || n.equals(i) || (t = n), e = e.createRange(), e.moveToPosition(t, CKEDITOR.POSITION_BEFORE_START), t.remove(), e.select()
                        }
                    }
                })), e.ui.addButton && e.ui.addButton("Table", {
                    label: n.toolbar,
                    command: "table",
                    toolbar: "insert,30"
                }), CKEDITOR.dialog.add("table", this.path + "dialogs/table.js"), CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js"), e.addMenuItems && e.addMenuItems({
                    table: {
                        label: n.menu,
                        command: "tableProperties",
                        group: "table",
                        order: 5
                    }, tabledelete: {label: n.deleteTable, command: "tableDelete", group: "table", order: 1}
                }), e.on("doubleclick", function (e) {
                    e.data.element.is("table") && (e.data.dialog = "tableProperties")
                }), e.contextMenu && e.contextMenu.addListener(function () {
                    return {tabledelete: CKEDITOR.TRISTATE_OFF, table: CKEDITOR.TRISTATE_OFF}
                })
            }
        }
    }),function () {
        function e(e, t) {
            function n(e) {
                return !t || t.contains(e) && e.getAscendant("table", !0).equals(t)
            }

            function i(e) {
                0 < o.length || e.type != CKEDITOR.NODE_ELEMENT || !g.test(e.getName()) || e.getCustomData("selected_cell") || (CKEDITOR.dom.element.setMarker(a, e, "selected_cell", !0), o.push(e))
            }

            var o = [], a = {};
            if (!e)return o;
            for (var r = e.getRanges(), s = 0; s < r.length; s++) {
                var l = r[s];
                if (l.collapsed) (l = l.getCommonAncestor().getAscendant({
                    td: 1,
                    th: 1
                }, !0)) && n(l) && o.push(l); else {
                    var c, l = new CKEDITOR.dom.walker(l);
                    for (l.guard = i; c = l.next();)c.type == CKEDITOR.NODE_ELEMENT && c.is(CKEDITOR.dtd.table) || (c = c.getAscendant({
                        td: 1,
                        th: 1
                    }, !0)) && !c.getCustomData("selected_cell") && n(c) && (CKEDITOR.dom.element.setMarker(a, c, "selected_cell", !0), o.push(c))
                }
            }
            return CKEDITOR.dom.element.clearAllMarkers(a), o
        }

        function t(t, n) {
            for (var i = m(t) ? t : e(t), o = i[0], a = o.getAscendant("table"), o = o.getDocument(), r = i[0].getParent(), s = r.$.rowIndex, i = i[i.length - 1], l = i.getParent().$.rowIndex + i.$.rowSpan - 1, i = new CKEDITOR.dom.element(a.$.rows[l]), s = n ? s : l, r = n ? r : i, i = CKEDITOR.tools.buildTableMap(a), a = i[s], s = n ? i[s - 1] : i[s + 1], i = i[0].length, o = o.createElement("tr"), l = 0; a[l] && l < i; l++) {
                var c;
                1 < a[l].rowSpan && s && a[l] == s[l] ? (c = a[l], c.rowSpan += 1) : (c = new CKEDITOR.dom.element(a[l]).clone(), c.removeAttribute("rowSpan"), c.appendBogus(), o.append(c), c = c.$), l += c.colSpan - 1
            }
            return n ? o.insertBefore(r) : o.insertAfter(r), o
        }

        function n(t) {
            if (t instanceof CKEDITOR.dom.selection) {
                var i = t.getRanges(), o = e(t), a = o[0].getAscendant("table"), r = CKEDITOR.tools.buildTableMap(a),
                    s = o[0].getParent().$.rowIndex, o = o[o.length - 1],
                    l = o.getParent().$.rowIndex + o.$.rowSpan - 1, o = [];
                for (t.reset(), t = s; t <= l; t++) {
                    for (var c = r[t], d = new CKEDITOR.dom.element(a.$.rows[t]), u = 0; u < c.length; u++) {
                        var h = new CKEDITOR.dom.element(c[u]), f = h.getParent().$.rowIndex;
                        1 == h.$.rowSpan ? h.remove() : (--h.$.rowSpan, f == t && (f = r[t + 1], f[u - 1] ? h.insertAfter(new CKEDITOR.dom.element(f[u - 1])) : new CKEDITOR.dom.element(a.$.rows[t + 1]).append(h, 1))), u += h.$.colSpan - 1
                    }
                    o.push(d)
                }
                for (r = a.$.rows, i[0].moveToPosition(a, CKEDITOR.POSITION_BEFORE_START), s = new CKEDITOR.dom.element(r[l + 1] || (0 < s ? r[s - 1] : null) || a.$.parentNode), t = o.length; 0 <= t; t--)n(o[t]);
                return a.$.parentNode ? s : (i[0].select(), null)
            }
            return t instanceof CKEDITOR.dom.element && (a = t.getAscendant("table"), 1 == a.$.rows.length ? a.remove() : t.remove()), null
        }

        function i(e) {
            for (var t = e.getParent().$.cells, n = 0, i = 0; i < t.length; i++) {
                var o = t[i], n = n + o.colSpan;
                if (o == e.$)break
            }
            return n - 1
        }

        function o(e, t) {
            for (var n = t ? 1 / 0 : 0, o = 0; o < e.length; o++) {
                var a = i(e[o]);
                (t ? a < n : a > n) && (n = a)
            }
            return n
        }

        function a(t, n) {
            for (var i = m(t) ? t : e(t), a = i[0].getAscendant("table"), r = o(i, 1), i = o(i), s = n ? r : i, l = CKEDITOR.tools.buildTableMap(a), a = [], r = [], i = [], c = l.length, d = 0; d < c; d++)a.push(l[d][s]), r.push(n ? l[d][s - 1] : l[d][s + 1]);
            for (d = 0; d < c; d++)a[d] && (1 < a[d].colSpan && r[d] == a[d] ? (l = a[d], l.colSpan += 1) : (s = new CKEDITOR.dom.element(a[d]), l = s.clone(), l.removeAttribute("colSpan"), l.appendBogus(), l[n ? "insertBefore" : "insertAfter"].call(l, s), i.push(l), l = l.$), d += l.rowSpan - 1);
            return i
        }

        function r(t) {
            CKEDITOR.env.webkit && !t.isFake && (t = function (e) {
                var t, n, i;
                if (t = e.getRanges(), 1 !== t.length)return e;
                if (t = t[0], t.collapsed || 0 !== t.endOffset)return e;
                if (n = t.endContainer, "td" !== (i = n.getName().toLowerCase()) && "th" !== i)return e;
                for ((i = n.getPrevious()) || (i = n.getParent().getPrevious().getLast()); i.type !== CKEDITOR.NODE_TEXT && "br" !== i.getName().toLowerCase();)if (!(i = i.getLast()))return e;
                return t.setEndAt(i, CKEDITOR.POSITION_BEFORE_END), t.select()
            }(t));
            var n, i, o = t.getRanges(), a = e(t), r = a[0], s = a[a.length - 1], a = r.getAscendant("table"),
                l = CKEDITOR.tools.buildTableMap(a), c = [];
            t.reset();
            var d = 0;
            for (t = l.length; d < t; d++)for (var u = 0, h = l[d].length; u < h; u++)void 0 === n && l[d][u] == r.$ && (n = u), l[d][u] == s.$ && (i = u);
            for (d = n; d <= i; d++)for (u = 0; u < l.length; u++)s = l[u], r = new CKEDITOR.dom.element(a.$.rows[u]), s = new CKEDITOR.dom.element(s[d]), s.$ && (1 == s.$.colSpan ? s.remove() : --s.$.colSpan, u += s.$.rowSpan - 1, r.$.cells.length || c.push(r));
            return n = l[0].length - 1 > i ? new CKEDITOR.dom.element(l[0][i + 1]) : n && -1 !== l[0][n - 1].cellIndex ? new CKEDITOR.dom.element(l[0][n - 1]) : new CKEDITOR.dom.element(a.$.parentNode), c.length == t && (o[0].moveToPosition(a, CKEDITOR.POSITION_AFTER_END), o[0].select(), a.remove()), n
        }

        function s(e, t) {
            var n = e.getStartElement().getAscendant({td: 1, th: 1}, !0);
            if (n) {
                var i = n.clone();
                i.appendBogus(), t ? i.insertBefore(n) : i.insertAfter(n)
            }
        }

        function l(t) {
            if (t instanceof CKEDITOR.dom.selection) {
                var n, i = t.getRanges(), o = e(t), a = o[0] && o[0].getAscendant("table");
                e:{
                    var r = 0;
                    n = o.length - 1;
                    for (var s, d, u = {}; s = o[r++];)CKEDITOR.dom.element.setMarker(u, s, "delete_cell", !0);
                    for (r = 0; s = o[r++];)if ((d = s.getPrevious()) && !d.getCustomData("delete_cell") || (d = s.getNext()) && !d.getCustomData("delete_cell")) {
                        CKEDITOR.dom.element.clearAllMarkers(u), n = d;
                        break e
                    }
                    CKEDITOR.dom.element.clearAllMarkers(u), r = o[0].getParent(), (r = r.getPrevious()) ? n = r.getLast() : (r = o[n].getParent(), n = (r = r.getNext()) ? r.getChild(0) : null)
                }
                for (t.reset(), t = o.length - 1; 0 <= t; t--)l(o[t]);
                n ? c(n, !0) : a && (i[0].moveToPosition(a, CKEDITOR.POSITION_BEFORE_START), i[0].select(), a.remove())
            } else t instanceof CKEDITOR.dom.element && (i = t.getParent(), 1 == i.getChildCount() ? i.remove() : t.remove())
        }

        function c(e, t) {
            var n = e.getDocument(), i = CKEDITOR.document;
            CKEDITOR.env.ie && 10 == CKEDITOR.env.version && (i.focus(), n.focus()), n = new CKEDITOR.dom.range(n), n["moveToElementEdit" + (t ? "End" : "Start")](e) || (n.selectNodeContents(e), n.collapse(!t)), n.select(!0)
        }

        function d(e, t, n) {
            if (e = e[t], void 0 === n)return e;
            for (t = 0; e && t < e.length; t++) {
                if (n.is && e[t] == n.$)return t;
                if (t == n)return new CKEDITOR.dom.element(e[t])
            }
            return n.is ? -1 : null
        }

        function u(t, n, i) {
            var o, a = e(t);
            if ((n ? 1 != a.length : 2 > a.length) || (o = t.getCommonAncestor()) && o.type == CKEDITOR.NODE_ELEMENT && o.is("table"))return !1;
            var r;
            t = a[0], o = t.getAscendant("table");
            var s = CKEDITOR.tools.buildTableMap(o), l = s.length, c = s[0].length, u = t.getParent().$.rowIndex,
                h = d(s, u, t);
            if (n) {
                var f;
                try {
                    var g = parseInt(t.getAttribute("rowspan"), 10) || 1;
                    r = parseInt(t.getAttribute("colspan"), 10) || 1, f = s["up" == n ? u - g : "down" == n ? u + g : u]["left" == n ? h - r : "right" == n ? h + r : h]
                } catch (e) {
                    return !1
                }
                if (!f || t.$ == f)return !1;
                a["up" == n || "left" == n ? "unshift" : "push"](new CKEDITOR.dom.element(f))
            }
            n = t.getDocument();
            var m = u, g = f = 0, E = !i && new CKEDITOR.dom.documentFragment(n), p = 0;
            for (n = 0; n < a.length; n++) {
                r = a[n];
                var T = r.getParent(), C = r.getFirst(), I = r.$.colSpan, O = r.$.rowSpan, T = T.$.rowIndex,
                    D = d(s, T, r), p = p + I * O, g = Math.max(g, D - h + I);
                f = Math.max(f, T - u + O), i || (I = r, (O = I.getBogus()) && O.remove(), I.trim(), r.getChildren().count() && (T == m || !C || C.isBlockBoundary && C.isBlockBoundary({br: 1}) || !(m = E.getLast(CKEDITOR.dom.walker.whitespaces(!0))) || m.is && m.is("br") || E.append("br"), r.moveChildren(E)), n ? r.remove() : r.setHtml("")), m = T
            }
            if (i)return f * g == p;
            for (E.moveChildren(t), t.appendBogus(), g >= c ? t.removeAttribute("rowSpan") : t.$.rowSpan = f, f >= l ? t.removeAttribute("colSpan") : t.$.colSpan = g, i = new CKEDITOR.dom.nodeList(o.$.rows), a = i.count(), n = a - 1; 0 <= n; n--)o = i.getItem(n), o.$.cells.length || (o.remove(), a++);
            return t
        }

        function h(t, n) {
            var i = e(t);
            if (1 < i.length)return !1;
            if (n)return !0;
            var o, i = i[0], a = i.getParent(), r = a.getAscendant("table"), s = CKEDITOR.tools.buildTableMap(r),
                l = a.$.rowIndex, c = d(s, l, i), u = i.$.rowSpan;
            if (1 < u) {
                o = Math.ceil(u / 2);
                for (var h, u = Math.floor(u / 2), a = l + o, r = new CKEDITOR.dom.element(r.$.rows[a]), s = d(s, a), a = i.clone(), l = 0; l < s.length; l++) {
                    if (h = s[l], h.parentNode == r.$ && l > c) {
                        a.insertBefore(new CKEDITOR.dom.element(h));
                        break
                    }
                    h = null
                }
                h || r.append(a)
            } else for (u = o = 1, r = a.clone(), r.insertAfter(a), r.append(a = i.clone()), h = d(s, l), c = 0; c < h.length; c++)h[c].rowSpan++;
            return a.appendBogus(), i.$.rowSpan = o, a.$.rowSpan = u, 1 == o && i.removeAttribute("rowSpan"), 1 == u && a.removeAttribute("rowSpan"), a
        }

        function f(t, n) {
            var i = e(t);
            if (1 < i.length)return !1;
            if (n)return !0;
            var i = i[0], o = i.getParent(), a = o.getAscendant("table"), a = CKEDITOR.tools.buildTableMap(a),
                r = d(a, o.$.rowIndex, i), s = i.$.colSpan;
            if (1 < s) o = Math.ceil(s / 2), s = Math.floor(s / 2); else {
                for (var s = o = 1, l = [], c = 0; c < a.length; c++) {
                    var u = a[c];
                    l.push(u[r]), 1 < u[r].rowSpan && (c += u[r].rowSpan - 1)
                }
                for (a = 0; a < l.length; a++)l[a].colSpan++
            }
            return a = i.clone(), a.insertAfter(i), a.appendBogus(), i.$.colSpan = o, a.$.colSpan = s, 1 == o && i.removeAttribute("colSpan"), 1 == s && a.removeAttribute("colSpan"), a
        }

        var g = /^(?:td|th)$/, m = CKEDITOR.tools.isArray;
        CKEDITOR.plugins.tabletools = {
            requires: "table,dialog,contextmenu", init: function (i) {
                function o(e) {
                    return CKEDITOR.tools.extend(e || {}, {
                        contextSensitive: 1, refresh: function (e, t) {
                            this.setState(t.contains({
                                td: 1,
                                th: 1
                            }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                        }
                    })
                }

                function d(e, t) {
                    var n = i.addCommand(e, t);
                    i.addFeature(n)
                }

                var g = i.lang.table, m = CKEDITOR.tools.style.parse;
                d("cellProperties", new CKEDITOR.dialogCommand("cellProperties", o({
                    allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",
                    requiredContent: "table",
                    contentTransformations: [[{
                        element: "td", left: function (e) {
                            return e.styles.background && m.background(e.styles.background).color
                        }, right: function (e) {
                            e.styles["background-color"] = m.background(e.styles.background).color
                        }
                    }, {
                        element: "td", check: "td{vertical-align}", left: function (e) {
                            return e.attributes && e.attributes.valign
                        }, right: function (e) {
                            e.styles["vertical-align"] = e.attributes.valign, delete e.attributes.valign
                        }
                    }], [{
                        element: "tr", check: "td{height}", left: function (e) {
                            return e.styles && e.styles.height
                        }, right: function (e) {
                            CKEDITOR.tools.array.forEach(e.children, function (t) {
                                t.name in {td: 1, th: 1} && (t.attributes["cke-row-height"] = e.styles.height)
                            }), delete e.styles.height
                        }
                    }], [{
                        element: "td", check: "td{height}", left: function (e) {
                            return (e = e.attributes) && e["cke-row-height"]
                        }, right: function (e) {
                            e.styles.height = e.attributes["cke-row-height"], delete e.attributes["cke-row-height"]
                        }
                    }]]
                }))), CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js"), d("rowDelete", o({
                    requiredContent: "table",
                    exec: function (e) {
                        e = e.getSelection(), (e = n(e)) && c(e)
                    }
                })), d("rowInsertBefore", o({
                    requiredContent: "table", exec: function (n) {
                        n = n.getSelection(), n = e(n), t(n, !0)
                    }
                })), d("rowInsertAfter", o({
                    requiredContent: "table", exec: function (n) {
                        n = n.getSelection(), n = e(n), t(n)
                    }
                })), d("columnDelete", o({
                    requiredContent: "table", exec: function (e) {
                        e = e.getSelection(), (e = r(e)) && c(e, !0)
                    }
                })), d("columnInsertBefore", o({
                    requiredContent: "table", exec: function (t) {
                        t = t.getSelection(), t = e(t), a(t, !0)
                    }
                })), d("columnInsertAfter", o({
                    requiredContent: "table", exec: function (t) {
                        t = t.getSelection(), t = e(t), a(t)
                    }
                })), d("cellDelete", o({
                    requiredContent: "table", exec: function (e) {
                        e = e.getSelection(), l(e)
                    }
                })), d("cellMerge", o({
                    allowedContent: "td[colspan,rowspan]",
                    requiredContent: "td[colspan,rowspan]",
                    exec: function (e, t) {
                        t.cell = u(e.getSelection()), c(t.cell, !0)
                    }
                })), d("cellMergeRight", o({
                    allowedContent: "td[colspan]",
                    requiredContent: "td[colspan]",
                    exec: function (e, t) {
                        t.cell = u(e.getSelection(), "right"), c(t.cell, !0)
                    }
                })), d("cellMergeDown", o({
                    allowedContent: "td[rowspan]",
                    requiredContent: "td[rowspan]",
                    exec: function (e, t) {
                        t.cell = u(e.getSelection(), "down"), c(t.cell, !0)
                    }
                })), d("cellVerticalSplit", o({
                    allowedContent: "td[rowspan]",
                    requiredContent: "td[rowspan]",
                    exec: function (e) {
                        c(f(e.getSelection()))
                    }
                })), d("cellHorizontalSplit", o({
                    allowedContent: "td[colspan]",
                    requiredContent: "td[colspan]",
                    exec: function (e) {
                        c(h(e.getSelection()))
                    }
                })), d("cellInsertBefore", o({
                    requiredContent: "table", exec: function (e) {
                        e = e.getSelection(), s(e, !0)
                    }
                })), d("cellInsertAfter", o({
                    requiredContent: "table", exec: function (e) {
                        e = e.getSelection(), s(e)
                    }
                })), i.addMenuItems && i.addMenuItems({
                    tablecell: {
                        label: g.cell.menu,
                        group: "tablecell",
                        order: 1,
                        getItems: function () {
                            var t = i.getSelection(), n = e(t);
                            return {
                                tablecell_insertBefore: CKEDITOR.TRISTATE_OFF,
                                tablecell_insertAfter: CKEDITOR.TRISTATE_OFF,
                                tablecell_delete: CKEDITOR.TRISTATE_OFF,
                                tablecell_merge: u(t, null, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_merge_right: u(t, "right", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_merge_down: u(t, "down", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_split_vertical: f(t, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_split_horizontal: h(t, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_properties: 0 < n.length ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                            }
                        }
                    },
                    tablecell_insertBefore: {
                        label: g.cell.insertBefore,
                        group: "tablecell",
                        command: "cellInsertBefore",
                        order: 5
                    },
                    tablecell_insertAfter: {
                        label: g.cell.insertAfter,
                        group: "tablecell",
                        command: "cellInsertAfter",
                        order: 10
                    },
                    tablecell_delete: {label: g.cell.deleteCell, group: "tablecell", command: "cellDelete", order: 15},
                    tablecell_merge: {label: g.cell.merge, group: "tablecell", command: "cellMerge", order: 16},
                    tablecell_merge_right: {
                        label: g.cell.mergeRight,
                        group: "tablecell",
                        command: "cellMergeRight",
                        order: 17
                    },
                    tablecell_merge_down: {
                        label: g.cell.mergeDown,
                        group: "tablecell",
                        command: "cellMergeDown",
                        order: 18
                    },
                    tablecell_split_horizontal: {
                        label: g.cell.splitHorizontal,
                        group: "tablecell",
                        command: "cellHorizontalSplit",
                        order: 19
                    },
                    tablecell_split_vertical: {
                        label: g.cell.splitVertical,
                        group: "tablecell",
                        command: "cellVerticalSplit",
                        order: 20
                    },
                    tablecell_properties: {
                        label: g.cell.title,
                        group: "tablecellproperties",
                        command: "cellProperties",
                        order: 21
                    },
                    tablerow: {
                        label: g.row.menu, group: "tablerow", order: 1, getItems: function () {
                            return {
                                tablerow_insertBefore: CKEDITOR.TRISTATE_OFF,
                                tablerow_insertAfter: CKEDITOR.TRISTATE_OFF,
                                tablerow_delete: CKEDITOR.TRISTATE_OFF
                            }
                        }
                    },
                    tablerow_insertBefore: {
                        label: g.row.insertBefore,
                        group: "tablerow",
                        command: "rowInsertBefore",
                        order: 5
                    },
                    tablerow_insertAfter: {
                        label: g.row.insertAfter,
                        group: "tablerow",
                        command: "rowInsertAfter",
                        order: 10
                    },
                    tablerow_delete: {label: g.row.deleteRow, group: "tablerow", command: "rowDelete", order: 15},
                    tablecolumn: {
                        label: g.column.menu, group: "tablecolumn", order: 1, getItems: function () {
                            return {
                                tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF,
                                tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF,
                                tablecolumn_delete: CKEDITOR.TRISTATE_OFF
                            }
                        }
                    },
                    tablecolumn_insertBefore: {
                        label: g.column.insertBefore,
                        group: "tablecolumn",
                        command: "columnInsertBefore",
                        order: 5
                    },
                    tablecolumn_insertAfter: {
                        label: g.column.insertAfter,
                        group: "tablecolumn",
                        command: "columnInsertAfter",
                        order: 10
                    },
                    tablecolumn_delete: {
                        label: g.column.deleteColumn,
                        group: "tablecolumn",
                        command: "columnDelete",
                        order: 15
                    }
                }), i.contextMenu && i.contextMenu.addListener(function (e, t, n) {
                    return (e = n.contains({td: 1, th: 1}, 1)) && !e.isReadOnly() ? {
                        tablecell: CKEDITOR.TRISTATE_OFF,
                        tablerow: CKEDITOR.TRISTATE_OFF,
                        tablecolumn: CKEDITOR.TRISTATE_OFF
                    } : null
                })
            }, getCellColIndex: i, insertRow: t, insertColumn: a, getSelectedCells: e
        }, CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
    }(),CKEDITOR.tools.buildTableMap = function (e, t, n, i, o) {
        e = e.$.rows, n = n || 0, i = "number" == typeof i ? i : e.length - 1, o = "number" == typeof o ? o : -1;
        var a = -1, r = [];
        for (t = t || 0; t <= i; t++) {
            a++, !r[a] && (r[a] = []);
            for (var s = -1, l = n; l <= (-1 === o ? e[t].cells.length - 1 : o); l++) {
                var c = e[t].cells[l];
                if (!c)break;
                for (s++; r[a][s];)s++;
                for (var d = isNaN(c.colSpan) ? 1 : c.colSpan, c = isNaN(c.rowSpan) ? 1 : c.rowSpan, u = 0; u < c && !(t + u > i); u++) {
                    r[a + u] || (r[a + u] = []);
                    for (var h = 0; h < d; h++)r[a + u][s + h] = e[t].cells[l]
                }
                if (s += d - 1, -1 !== o && s >= o)break
            }
        }
        return r
    },function () {
        function e(e) {
            return CKEDITOR.plugins.widget && CKEDITOR.plugins.widget.isDomWidget(e)
        }

        function t(e, t) {
            var n, i, o = e.getAscendant("table"), a = t.getAscendant("table"), r = CKEDITOR.tools.buildTableMap(o),
                s = c(e), l = c(t), d = [], u = {};
            for (o.contains(a) && (t = t.getAscendant({
                td: 1,
                th: 1
            }), l = c(t)), s > l && (o = s, s = l, l = o, o = e, e = t, t = o), o = 0; o < r[s].length; o++)if (e.$ === r[s][o]) {
                n = o;
                break
            }
            for (o = 0; o < r[l].length; o++)if (t.$ === r[l][o]) {
                i = o;
                break
            }
            for (n > i && (o = n, n = i, i = o), o = s; o <= l; o++)for (s = n; s <= i; s++)a = new CKEDITOR.dom.element(r[o][s]), a.$ && !a.getCustomData("selected_cell") && (d.push(a), CKEDITOR.dom.element.setMarker(u, a, "selected_cell", !0));
            return CKEDITOR.dom.element.clearAllMarkers(u), d
        }

        function n(e) {
            if (e)return e = e.clone(), e.enlarge(CKEDITOR.ENLARGE_ELEMENT), (e = e.getEnclosedNode()) && e.is && e.is(CKEDITOR.dtd.$tableContent)
        }

        function i(e) {
            return (e = e.editable().findOne(".cke_table-faked-selection")) && e.getAscendant("table")
        }

        function o(e, t) {
            var n, i = e.editable().find(".cke_table-faked-selection");
            for (e.fire("lockSnapshot"), e.editable().removeClass("cke_table-faked-selection-editor"), n = 0; n < i.count(); n++)i.getItem(n).removeClass("cke_table-faked-selection");
            0 < i.count() && i.getItem(0).getAscendant("table").data("cke-table-faked-selection-table", !1), e.fire("unlockSnapshot"), t && (O = {active: !1}, e.getSelection().isInTable() && e.getSelection().reset())
        }

        function a(e, t) {
            var n, i, o = [];
            for (i = 0; i < t.length; i++)n = e.createRange(), n.setStartBefore(t[i]), n.setEndAfter(t[i]), o.push(n);
            e.getSelection().selectRanges(o)
        }

        function r(e) {
            var n = e.editable().find(".cke_table-faked-selection");
            1 > n.count() || (n = t(n.getItem(0), n.getItem(n.count() - 1)), a(e, n))
        }

        function s(n, i, r) {
            var s = p(n.getSelection(!0));
            i = i.is("table") ? null : i;
            var l;
            if ((l = O.active && !O.first) && !(l = i) && (l = n.getSelection().getRanges(), l = !!(1 < s.length || l[0] && !l[0].collapsed)), l) O.first = i || s[0], O.dirty = !i && 1 !== s.length; else if (O.active && i && O.first.getAscendant("table").equals(i.getAscendant("table"))) {
                if (s = t(O.first, i), !O.dirty && 1 === s.length && !e(r.data.getTarget()))return o(n, "mouseup" === r.name);
                O.dirty = !0, O.last = i, a(n, s)
            }
        }

        function l(e) {
            var t, n = (e = e.editor || e.sender.editor) && e.getSelection(), i = n && n.getRanges() || [];
            if (n && (o(e), n.isInTable() && n.isFake)) {
                for (1 === i.length && i[0]._getTableElement() && i[0]._getTableElement().is("table") && (t = i[0]._getTableElement()), t = p(n, t), e.fire("lockSnapshot"), n = 0; n < t.length; n++)t[n].addClass("cke_table-faked-selection");
                0 < t.length && (e.editable().addClass("cke_table-faked-selection-editor"), t[0].getAscendant("table").data("cke-table-faked-selection-table", "")), e.fire("unlockSnapshot")
            }
        }

        function c(e) {
            return e.getAscendant("tr", !0).$.rowIndex
        }

        function d(t) {
            function n(e, t) {
                return !(!e || !t) && (e.equals(t) || e.contains(t) || t.contains(e) || e.getCommonAncestor(t).is(g))
            }

            function a(e) {
                return !e.getAscendant("table", !0) && e.getDocument().equals(l.document)
            }

            if (t.data.getTarget().getName && ("mouseup" === t.name || !e(t.data.getTarget()))) {
                var l = t.editor || t.listenerData.editor, c = l.getSelection(1), u = i(l), h = t.data.getTarget(),
                    f = h && h.getAscendant({td: 1, th: 1}, !0), h = h && h.getAscendant("table", !0),
                    g = {table: 1, thead: 1, tbody: 1, tfoot: 1, tr: 1, td: 1, th: 1};
                (function (e, t, i, o) {
                    return !("mousedown" !== e.name || CKEDITOR.tools.getMouseButton(e) !== CKEDITOR.MOUSE_BUTTON_LEFT && o) || "mouseup" === e.name && !a(e.data.getTarget()) && !n(i, o)
                })(t, c, u, h) && o(l, !0), !O.active && "mousedown" === t.name && CKEDITOR.tools.getMouseButton(t) === CKEDITOR.MOUSE_BUTTON_LEFT && h && (O = {active: !0}, CKEDITOR.document.on("mouseup", d, null, {editor: l})), (f || h) && s(l, f || h, t), "mouseup" === t.name && (CKEDITOR.tools.getMouseButton(t) === CKEDITOR.MOUSE_BUTTON_LEFT && (a(t.data.getTarget()) || n(u, h)) && r(l), O = {active: !1}, CKEDITOR.document.removeListener("mouseup", d))
            }
        }

        function u(e) {
            var t = e.data.getTarget().getAscendant({td: 1, th: 1}, !0);
            t && !t.hasClass("cke_table-faked-selection") && (e.cancel(), e.data.preventDefault())
        }

        function h(e, t) {
            function n(e) {
                e.cancel()
            }

            var i, o, a, r, s = e.getSelection(), l = s.createBookmarks(), c = e.document, d = e.createRange(),
                u = c.getDocumentElement().$, h = CKEDITOR.env.ie && 9 > CKEDITOR.env.version,
                f = e.blockless || CKEDITOR.env.ie ? "span" : "div";
            c.getById("cke_table_copybin") || (i = c.createElement(f), o = c.createElement(f), o.setAttributes({
                id: "cke_table_copybin",
                "data-cke-temp": "1"
            }), i.setStyles({
                position: "absolute",
                width: "1px",
                height: "1px",
                overflow: "hidden"
            }), i.setStyle("ltr" == e.config.contentsLangDirection ? "left" : "right", "-5000px"), i.setHtml(e.getSelectedHtml(!0)), e.fire("lockSnapshot"), o.append(i), e.editable().append(o), r = e.on("selectionChange", n, null, null, 0), h && (a = u.scrollTop), d.selectNodeContents(i), d.select(), h && (u.scrollTop = a), setTimeout(function () {
                o.remove(), s.selectBookmarks(l), r.removeListener(), e.fire("unlockSnapshot"), t && (e.extractSelectedHtml(), e.fire("saveSnapshot"))
            }, 100))
        }

        function f(e) {
            var t = e.editor || e.sender.editor;
            t.getSelection().isInTable() && h(t, "cut" === e.name)
        }

        function g(e) {
            this._reset(), e && this.setSelectedCells(e)
        }

        function m(e, t, n) {
            e.on("beforeCommandExec", function (n) {
                -1 !== CKEDITOR.tools.array.indexOf(t, n.data.name) && (n.data.selectedCells = p(e.getSelection()))
            }), e.on("afterCommandExec", function (i) {
                -1 !== CKEDITOR.tools.array.indexOf(t, i.data.name) && n(e, i.data)
            })
        }

        var E, p, T, C, I, O = {active: !1};
        g.prototype = {}, g.prototype._reset = function () {
            this.cells = {first: null, last: null, all: []}, this.rows = {first: null, last: null}
        }, g.prototype.setSelectedCells = function (e) {
            this._reset(), e = e.slice(0), this._arraySortByDOMOrder(e), this.cells.all = e, this.cells.first = e[0], this.cells.last = e[e.length - 1], this.rows.first = e[0].getAscendant("tr"), this.rows.last = this.cells.last.getAscendant("tr")
        }, g.prototype.getTableMap = function () {
            var e, t = T(this.cells.first);
            e:{
                e = this.cells.last;
                var n, i = e.getAscendant("table"), o = c(e), i = CKEDITOR.tools.buildTableMap(i);
                for (n = 0; n < i[o].length; n++)if (new CKEDITOR.dom.element(i[o][n]).equals(e)) {
                    e = n;
                    break e
                }
                e = void 0
            }
            return CKEDITOR.tools.buildTableMap(this._getTable(), c(this.rows.first), t, c(this.rows.last), e)
        }, g.prototype._getTable = function () {
            return this.rows.first.getAscendant("table")
        }, g.prototype.insertRow = function (e, t, n) {
            if (void 0 === e) e = 1; else if (0 >= e)return;
            for (var i, o = this.cells.first.$.cellIndex, a = this.cells.last.$.cellIndex, r = n ? [] : this.cells.all, s = 0; s < e; s++)i = C(n ? this.cells.all : r, t), i = CKEDITOR.tools.array.filter(i.find("td, th").toArray(), function (e) {
                return !!n || e.$.cellIndex >= o && e.$.cellIndex <= a
            }), r = t ? i.concat(r) : r.concat(i);
            this.setSelectedCells(r)
        }, g.prototype.insertColumn = function (e) {
            function t(e) {
                return (e = c(e)) >= o && e <= a
            }

            if (void 0 === e) e = 1; else if (0 >= e)return;
            for (var n = this.cells, i = n.all, o = c(n.first), a = c(n.last), n = 0; n < e; n++)i = i.concat(CKEDITOR.tools.array.filter(I(i), t));
            this.setSelectedCells(i)
        }, g.prototype.emptyCells = function (e) {
            e = e || this.cells.all;
            for (var t = 0; t < e.length; t++)e[t].setHtml("")
        }, g.prototype._arraySortByDOMOrder = function (e) {
            e.sort(function (e, t) {
                return e.getPosition(t) & CKEDITOR.POSITION_PRECEDING ? -1 : 1
            })
        };
        var D = {
            onPaste: function (e) {
                function i(e) {
                    return Math.max.apply(null, CKEDITOR.tools.array.map(e, function (e) {
                        return e.length
                    }, 0))
                }

                var o, r, s = e.editor, l = s.getSelection(), c = p(l),
                    d = this.findTableInPastedContent(s, e.data.dataValue),
                    u = l.isInTable(!0) && this.isBoundarySelection(l);
                !c.length || 1 === c.length && !n(l.getRanges()[0]) && !u || u && !d || (c = c[0].getAscendant("table"), o = new g(p(l, c)), s.once("afterPaste", function () {
                    var e;
                    if (r) {
                        e = new CKEDITOR.dom.element(r[0][0]);
                        var n = r[r.length - 1];
                        e = t(e, new CKEDITOR.dom.element(n[n.length - 1]))
                    } else e = o.cells.all;
                    a(s, e)
                }), d ? (e.stop(), u ? (o.insertRow(1, 1 === u, !0), l.selectElement(o.rows.first)) : (o.emptyCells(), a(s, o.cells.all)), e = o.getTableMap(), r = CKEDITOR.tools.buildTableMap(d), o.insertRow(r.length - e.length), o.insertColumn(i(r) - i(e)), e = o.getTableMap(), this.pasteTable(o, e, r), s.fire("saveSnapshot"), setTimeout(function () {
                    s.fire("afterPaste")
                }, 0)) : (function (e) {
                    var t = s.createRange();
                    t.selectNodeContents(e), t.select()
                }(o.cells.first), s.once("afterPaste", function () {
                    s.fire("lockSnapshot"), o.emptyCells(o.cells.all.slice(1)), a(s, o.cells.all), s.fire("unlockSnapshot")
                })))
            }, isBoundarySelection: function (e) {
                e = e.getRanges()[0];
                var t = e.endContainer.getAscendant("tr", !0);
                if (t && e.collapsed) {
                    if (e.checkBoundaryOfElement(t, CKEDITOR.START))return 1;
                    if (e.checkBoundaryOfElement(t, CKEDITOR.END))return 2
                }
                return 0
            }, findTableInPastedContent: function (e, t) {
                var n = e.dataProcessor, i = new CKEDITOR.dom.element("body");
                return n || (n = new CKEDITOR.htmlDataProcessor(e)), i.setHtml(n.toHtml(t), {fixForBody: !1}), 1 < i.getChildCount() ? null : i.findOne("table")
            }, pasteTable: function (e, t, n) {
                var i, o, a, r, s, l = T(e.cells.first), c = e._getTable(), d = {};
                for (r = 0; r < n.length; r++)for (o = new CKEDITOR.dom.element(c.$.rows[e.rows.first.$.rowIndex + r]), s = 0; s < n[r].length; s++)a = new CKEDITOR.dom.element(n[r][s]), i = t[r] && t[r][s] ? new CKEDITOR.dom.element(t[r][s]) : null,
                    a && !a.getCustomData("processed") ? (i && i.getParent() ? a.replace(i) : (0 === s || n[r][s - 1]) && ((i = 0 !== s ? new CKEDITOR.dom.element(n[r][s - 1]) : null) && o.equals(i.getParent()) ? a.insertAfter(i) : 0 < l ? o.$.cells[l] ? a.insertAfter(new CKEDITOR.dom.element(o.$.cells[l])) : o.append(a) : o.append(a, !0)), CKEDITOR.dom.element.setMarker(d, a, "processed", !0)) : a.getCustomData("processed") && i && i.remove();
                CKEDITOR.dom.element.clearAllMarkers(d)
            }
        };
        CKEDITOR.plugins.tableselection = {
            getCellsBetween: t, keyboardIntegration: function (e) {
                function t(e) {
                    var t = e.getEnclosedNode();
                    t && t.is({
                        td: 1,
                        th: 1
                    }) ? e.getEnclosedNode().setText("") : e.deleteContents(), CKEDITOR.tools.array.forEach(e._find("td"), function (e) {
                        e.appendBogus()
                    })
                }

                var n = e.editable();
                n.attachListener(n, "keydown", function (e) {
                    function n(t, n) {
                        if (!n.length)return null;
                        var i = e.createRange(), a = CKEDITOR.dom.range.mergeRanges(n);
                        CKEDITOR.tools.array.forEach(a, function (e) {
                            e.enlarge(CKEDITOR.ENLARGE_ELEMENT)
                        });
                        var r = a[0].getBoundaryNodes(), s = r.startNode, r = r.endNode;
                        if (s && s.is && s.is(o)) {
                            for (var l = s.getAscendant("table", !0), c = s.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l), d = !1; c && !function (e) {
                                return !s.contains(e) && e.is && e.is("td", "th")
                            }(c);)c = c.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l);
                            return !c && r && r.is && !r.is("table") && r.getNext() && (c = r.getNext().findOne("td, th"), d = !0), c ? i["moveToElementEdit" + (d ? "Start" : "End")](c) : (i.setStartBefore(s.getAscendant("table", !0)), i.collapse(!0)), a[0].deleteContents(), [i]
                        }
                        return s ? (i.moveToElementEditablePosition(s), [i]) : void 0
                    }

                    var i = {37: 1, 38: 1, 39: 1, 40: 1, 8: 1, 46: 1},
                        o = CKEDITOR.tools.extend({table: 1}, CKEDITOR.dtd.$tableContent);
                    return delete o.td, delete o.th, function (o) {
                        var a, r, s, l, c = o.data.getKey(), d = 37 === c || 38 == c;
                        if (i[c] && (a = e.getSelection()) && a.isInTable() && a.isFake)if (r = a.getRanges(), s = r[0]._getTableElement(), l = r[r.length - 1]._getTableElement(), o.data.preventDefault(), o.cancel(), 8 < c && 46 > c) r[0].moveToElementEditablePosition(d ? s : l, !d), a.selectRanges([r[0]]); else {
                            for (o = 0; o < r.length; o++)t(r[o]);
                            (o = n(s, r)) ? r = o : r[0].moveToElementEditablePosition(s), a.selectRanges(r), e.fire("saveSnapshot")
                        }
                    }
                }(e), null, null, -1), n.attachListener(n, "keypress", function (n) {
                    var i, o = e.getSelection(), a = n.data.$.charCode || 13 === n.data.getKey();
                    if (o && o.isInTable() && o.isFake && a && !(n.data.getKeystroke() & CKEDITOR.CTRL)) {
                        for (n = o.getRanges(), a = n[0].getEnclosedNode().getAscendant({
                            td: 1,
                            th: 1
                        }, !0), i = 0; i < n.length; i++)t(n[i]);
                        a && (n[0].moveToElementEditablePosition(a), o.selectRanges([n[0]]))
                    }
                }, null, null, -1)
            }, isSupportedEnvironment: !(CKEDITOR.env.ie && 11 > CKEDITOR.env.version)
        }, CKEDITOR.plugins.add("tableselection", {
            requires: "clipboard,tabletools", onLoad: function () {
                E = CKEDITOR.plugins.tabletools, p = E.getSelectedCells, T = E.getCellColIndex, C = E.insertRow, I = E.insertColumn, CKEDITOR.document.appendStyleSheet(this.path + "styles/tableselection.css")
            }, init: function (e) {
                CKEDITOR.plugins.tableselection.isSupportedEnvironment && (e.addContentsCss && e.addContentsCss(this.path + "styles/tableselection.css"), e.on("contentDom", function () {
                    var t = e.editable(), n = t.isInline() ? t : e.document, i = {editor: e};
                    t.attachListener(n, "mousedown", d, null, i), t.attachListener(n, "mousemove", d, null, i), t.attachListener(n, "mouseup", d, null, i), t.attachListener(t, "dragstart", u), t.attachListener(e, "selectionCheck", l), CKEDITOR.plugins.tableselection.keyboardIntegration(e), CKEDITOR.plugins.clipboard && !CKEDITOR.plugins.clipboard.isCustomCopyCutSupported && (t.attachListener(t, "cut", f), t.attachListener(t, "copy", f))
                }), e.on("paste", D.onPaste, D), m(e, "rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter".split(" "), function (e, t) {
                    a(e, t.selectedCells)
                }), m(e, ["cellMerge", "cellMergeRight", "cellMergeDown"], function (e, t) {
                    a(e, [t.commandData.cell])
                }), m(e, ["cellDelete"], function (e) {
                    o(e, !0)
                }))
            }
        })
    }(),function () {
        var e = [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90], t = {8: 1, 46: 1};
        CKEDITOR.plugins.add("undo", {
            init: function (t) {
                function i(e) {
                    r.enabled && !1 !== e.data.command.canUndo && r.save()
                }

                function o() {
                    r.enabled = !t.readOnly && "wysiwyg" == t.mode, r.onChange()
                }

                var r = t.undoManager = new n(t), s = r.editingHandler = new a(r), l = t.addCommand("undo", {
                    exec: function () {
                        r.undo() && (t.selectionChange(), this.fire("afterUndo"))
                    }, startDisabled: !0, canUndo: !1
                }), c = t.addCommand("redo", {
                    exec: function () {
                        r.redo() && (t.selectionChange(), this.fire("afterRedo"))
                    }, startDisabled: !0, canUndo: !1
                });
                t.setKeystroke([[e[0], "undo"], [e[1], "redo"], [e[2], "redo"]]), r.onChange = function () {
                    l.setState(r.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), c.setState(r.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                }, t.on("beforeCommandExec", i), t.on("afterCommandExec", i), t.on("saveSnapshot", function (e) {
                    r.save(e.data && e.data.contentOnly)
                }), t.on("contentDom", s.attachListeners, s), t.on("instanceReady", function () {
                    t.fire("saveSnapshot")
                }), t.on("beforeModeUnload", function () {
                    "wysiwyg" == t.mode && r.save(!0)
                }), t.on("mode", o), t.on("readOnly", o), t.ui.addButton && (t.ui.addButton("Undo", {
                    label: t.lang.undo.undo,
                    command: "undo",
                    toolbar: "undo,10"
                }), t.ui.addButton("Redo", {
                    label: t.lang.undo.redo,
                    command: "redo",
                    toolbar: "undo,20"
                })), t.resetUndo = function () {
                    r.reset(), t.fire("saveSnapshot")
                }, t.on("updateSnapshot", function () {
                    r.currentImage && r.update()
                }), t.on("lockSnapshot", function (e) {
                    e = e.data, r.lock(e && e.dontUpdate, e && e.forceUpdate)
                }), t.on("unlockSnapshot", r.unlock, r)
            }
        }), CKEDITOR.plugins.undo = {};
        var n = CKEDITOR.plugins.undo.UndoManager = function (e) {
            this.strokesRecorded = [0, 0], this.locked = null, this.previousKeyGroup = -1, this.limit = e.config.undoStackSize || 20, this.strokesLimit = 25, this.editor = e, this.reset()
        };
        n.prototype = {
            type: function (e, t) {
                var i = n.getKeyGroup(e), o = this.strokesRecorded[i] + 1;
                t = t || o >= this.strokesLimit, this.typing || (this.hasUndo = this.typing = !0, this.hasRedo = !1, this.onChange()), t ? (o = 0, this.editor.fire("saveSnapshot")) : this.editor.fire("change"), this.strokesRecorded[i] = o, this.previousKeyGroup = i
            }, keyGroupChanged: function (e) {
                return n.getKeyGroup(e) != this.previousKeyGroup
            }, reset: function () {
                this.snapshots = [], this.index = -1, this.currentImage = null, this.hasRedo = this.hasUndo = !1, this.locked = null, this.resetType()
            }, resetType: function () {
                this.strokesRecorded = [0, 0], this.typing = !1, this.previousKeyGroup = -1
            }, refreshState: function () {
                this.hasUndo = !!this.getNextImage(!0), this.hasRedo = !!this.getNextImage(!1), this.resetType(), this.onChange()
            }, save: function (e, t, n) {
                var o = this.editor;
                if (this.locked || "ready" != o.status || "wysiwyg" != o.mode)return !1;
                var a = o.editable();
                if (!a || "ready" != a.status)return !1;
                if (a = this.snapshots, t || (t = new i(o)), !1 === t.contents)return !1;
                if (this.currentImage)if (t.equalsContent(this.currentImage)) {
                    if (e || t.equalsSelection(this.currentImage))return !1
                } else!1 !== n && o.fire("change");
                return a.splice(this.index + 1, a.length - this.index - 1), a.length == this.limit && a.shift(), this.index = a.push(t) - 1, this.currentImage = t, !1 !== n && this.refreshState(), !0
            }, restoreImage: function (e) {
                var t, n = this.editor;
                e.bookmarks && (n.focus(), t = n.getSelection()), this.locked = {level: 999}, this.editor.loadSnapshot(e.contents), e.bookmarks ? t.selectBookmarks(e.bookmarks) : CKEDITOR.env.ie && (t = this.editor.document.getBody().$.createTextRange(), t.collapse(!0), t.select()), this.locked = null, this.index = e.index, this.currentImage = this.snapshots[this.index], this.update(), this.refreshState(), n.fire("change")
            }, getNextImage: function (e) {
                var t, n = this.snapshots, i = this.currentImage;
                if (i)if (e) {
                    for (t = this.index - 1; 0 <= t; t--)if (e = n[t], !i.equalsContent(e))return e.index = t, e
                } else for (t = this.index + 1; t < n.length; t++)if (e = n[t], !i.equalsContent(e))return e.index = t, e;
                return null
            }, redoable: function () {
                return this.enabled && this.hasRedo
            }, undoable: function () {
                return this.enabled && this.hasUndo
            }, undo: function () {
                if (this.undoable()) {
                    this.save(!0);
                    var e = this.getNextImage(!0);
                    if (e)return this.restoreImage(e), !0
                }
                return !1
            }, redo: function () {
                if (this.redoable() && (this.save(!0), this.redoable())) {
                    var e = this.getNextImage(!1);
                    if (e)return this.restoreImage(e), !0
                }
                return !1
            }, update: function (e) {
                if (!this.locked) {
                    e || (e = new i(this.editor));
                    for (var t = this.index, n = this.snapshots; 0 < t && this.currentImage.equalsContent(n[t - 1]);)--t;
                    n.splice(t, this.index - t + 1, e), this.index = t, this.currentImage = e
                }
            }, updateSelection: function (e) {
                if (!this.snapshots.length)return !1;
                var t = this.snapshots, n = t[t.length - 1];
                return !(!n.equalsContent(e) || n.equalsSelection(e)) && (this.currentImage = t[t.length - 1] = e, !0)
            }, lock: function (e, t) {
                if (this.locked) this.locked.level++; else if (e) this.locked = {level: 1}; else {
                    var n = null;
                    if (t) n = !0; else {
                        var o = new i(this.editor, !0);
                        this.currentImage && this.currentImage.equalsContent(o) && (n = o)
                    }
                    this.locked = {update: n, level: 1}
                }
            }, unlock: function () {
                if (this.locked && !--this.locked.level) {
                    var e = this.locked.update;
                    if (this.locked = null, !0 === e) this.update(); else if (e) {
                        var t = new i(this.editor, !0);
                        e.equalsContent(t) || this.update()
                    }
                }
            }
        }, n.navigationKeyCodes = {37: 1, 38: 1, 39: 1, 40: 1, 36: 1, 35: 1, 33: 1, 34: 1}, n.keyGroups = {
            PRINTABLE: 0,
            FUNCTIONAL: 1
        }, n.isNavigationKey = function (e) {
            return !!n.navigationKeyCodes[e]
        }, n.getKeyGroup = function (e) {
            var i = n.keyGroups;
            return t[e] ? i.FUNCTIONAL : i.PRINTABLE
        }, n.getOppositeKeyGroup = function (e) {
            var t = n.keyGroups;
            return e == t.FUNCTIONAL ? t.PRINTABLE : t.FUNCTIONAL
        }, n.ieFunctionalKeysBug = function (e) {
            return CKEDITOR.env.ie && n.getKeyGroup(e) == n.keyGroups.FUNCTIONAL
        };
        var i = CKEDITOR.plugins.undo.Image = function (e, t) {
            this.editor = e, e.fire("beforeUndoImage");
            var n = e.getSnapshot();
            CKEDITOR.env.ie && n && (n = n.replace(/\s+data-cke-expando=".*?"/g, "")), this.contents = n, t || (this.bookmarks = (n = n && e.getSelection()) && n.createBookmarks2(!0)), e.fire("afterUndoImage")
        }, o = /\b(?:href|src|name)="[^"]*?"/gi;
        i.prototype = {
            equalsContent: function (e) {
                var t = this.contents;
                return e = e.contents, CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (t = t.replace(o, ""), e = e.replace(o, "")), t == e
            }, equalsSelection: function (e) {
                var t = this.bookmarks;
                if (e = e.bookmarks, t || e) {
                    if (!t || !e || t.length != e.length)return !1;
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n], o = e[n];
                        if (i.startOffset != o.startOffset || i.endOffset != o.endOffset || !CKEDITOR.tools.arrayCompare(i.start, o.start) || !CKEDITOR.tools.arrayCompare(i.end, o.end))return !1
                    }
                }
                return !0
            }
        };
        var a = CKEDITOR.plugins.undo.NativeEditingHandler = function (e) {
            this.undoManager = e, this.ignoreInputEvent = !1, this.keyEventsStack = new r, this.lastKeydownImage = null
        };
        a.prototype = {
            onKeydown: function (t) {
                var o = t.data.getKey();
                229 !== o && (-1 < CKEDITOR.tools.indexOf(e, t.data.getKeystroke()) ? t.data.preventDefault() : (this.keyEventsStack.cleanUp(t), t = this.undoManager, this.keyEventsStack.getLast(o) || this.keyEventsStack.push(o), this.lastKeydownImage = new i(t.editor), (n.isNavigationKey(o) || this.undoManager.keyGroupChanged(o)) && (t.strokesRecorded[0] || t.strokesRecorded[1]) && (t.save(!1, this.lastKeydownImage, !1), t.resetType())))
            }, onInput: function () {
                if (this.ignoreInputEvent) this.ignoreInputEvent = !1; else {
                    var e = this.keyEventsStack.getLast();
                    e || (e = this.keyEventsStack.push(0)), this.keyEventsStack.increment(e.keyCode), this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(e.keyCode, !0), this.keyEventsStack.resetInputs())
                }
            }, onKeyup: function (e) {
                var t = this.undoManager;
                e = e.data.getKey();
                var o = this.keyEventsStack.getTotalInputs();
                this.keyEventsStack.remove(e), n.ieFunctionalKeysBug(e) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new i(t.editor, !0)) || (0 < o ? t.type(e) : n.isNavigationKey(e) && this.onNavigationKey(!0))
            }, onNavigationKey: function (e) {
                var t = this.undoManager;
                !e && t.save(!0, null, !1) || t.updateSelection(new i(t.editor)), t.resetType()
            }, ignoreInputEventListener: function () {
                this.ignoreInputEvent = !0
            }, activateInputEventListener: function () {
                this.ignoreInputEvent = !1
            }, attachListeners: function () {
                var e = this.undoManager.editor, t = e.editable(), i = this;
                t.attachListener(t, "keydown", function (e) {
                    i.onKeydown(e), n.ieFunctionalKeysBug(e.data.getKey()) && i.onInput()
                }, null, null, 999), t.attachListener(t, CKEDITOR.env.ie ? "keypress" : "input", i.onInput, i, null, 999), t.attachListener(t, "keyup", i.onKeyup, i, null, 999), t.attachListener(t, "paste", i.ignoreInputEventListener, i, null, 999), t.attachListener(t, "drop", i.ignoreInputEventListener, i, null, 999), e.on("afterPaste", i.activateInputEventListener, i, null, 999), t.attachListener(t.isInline() ? t : e.document.getDocumentElement(), "click", function () {
                    i.onNavigationKey()
                }, null, null, 999), t.attachListener(this.undoManager.editor, "blur", function () {
                    i.keyEventsStack.remove(9)
                }, null, null, 999)
            }
        };
        var r = CKEDITOR.plugins.undo.KeyEventsStack = function () {
            this.stack = []
        };
        r.prototype = {
            push: function (e) {
                return e = this.stack.push({keyCode: e, inputs: 0}), this.stack[e - 1]
            }, getLastIndex: function (e) {
                if ("number" != typeof e)return this.stack.length - 1;
                for (var t = this.stack.length; t--;)if (this.stack[t].keyCode == e)return t;
                return -1
            }, getLast: function (e) {
                return e = this.getLastIndex(e), -1 != e ? this.stack[e] : null
            }, increment: function (e) {
                this.getLast(e).inputs++
            }, remove: function (e) {
                -1 != (e = this.getLastIndex(e)) && this.stack.splice(e, 1)
            }, resetInputs: function (e) {
                if ("number" == typeof e) this.getLast(e).inputs = 0; else for (e = this.stack.length; e--;)this.stack[e].inputs = 0
            }, getTotalInputs: function () {
                for (var e = this.stack.length, t = 0; e--;)t += this.stack[e].inputs;
                return t
            }, cleanUp: function (e) {
                e = e.data.$, e.ctrlKey || e.metaKey || this.remove(17), e.shiftKey || this.remove(16), e.altKey || this.remove(18)
            }
        }
    }(),function () {
        function e(e, t) {
            CKEDITOR.tools.extend(this, {
                editor: e,
                editable: e.editable(),
                doc: e.document,
                win: e.window
            }, t, !0), this.inline = this.editable.isInline(), this.inline || (this.frame = this.win.getFrame()), this.target = this[this.inline ? "editable" : "doc"]
        }

        function t(e, t) {
            CKEDITOR.tools.extend(this, t, {editor: e}, !0)
        }

        function n(e, t) {
            var n = e.editable();
            CKEDITOR.tools.extend(this, {
                editor: e,
                editable: n,
                inline: n.isInline(),
                doc: e.document,
                win: e.window,
                container: CKEDITOR.document.getBody(),
                winTop: CKEDITOR.document.getWindow()
            }, t, !0), this.hidden = {}, this.visible = {}, this.inline || (this.frame = this.win.getFrame()), this.queryViewport();
            var i = CKEDITOR.tools.bind(this.queryViewport, this), r = CKEDITOR.tools.bind(this.hideVisible, this),
                s = CKEDITOR.tools.bind(this.removeAll, this);
            n.attachListener(this.winTop, "resize", i), n.attachListener(this.winTop, "scroll", i), n.attachListener(this.winTop, "resize", r), n.attachListener(this.win, "scroll", r), n.attachListener(this.inline ? n : this.frame, "mouseout", function (e) {
                var t = e.data.$.clientX;
                e = e.data.$.clientY, this.queryViewport(), (t <= this.rect.left || t >= this.rect.right || e <= this.rect.top || e >= this.rect.bottom) && this.hideVisible(), (0 >= t || t >= this.winTopPane.width || 0 >= e || e >= this.winTopPane.height) && this.hideVisible()
            }, this), n.attachListener(e, "resize", i), n.attachListener(e, "mode", s), e.on("destroy", s), this.lineTpl = new CKEDITOR.template('<div data-cke-lineutils-line="1" class="cke_reset_all" style="{lineStyle}"><span style="{tipLeftStyle}">&nbsp;</span><span style="{tipRightStyle}">&nbsp;</span></div>').output({
                lineStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, a, this.lineStyle, !0)),
                tipLeftStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, o, {
                    left: "0px",
                    "border-left-color": "red",
                    "border-width": "6px 0 6px 6px"
                }, this.tipCss, this.tipLeftStyle, !0)),
                tipRightStyle: CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, o, {
                    right: "0px",
                    "border-right-color": "red",
                    "border-width": "6px 6px 6px 0"
                }, this.tipCss, this.tipRightStyle, !0))
            })
        }

        function i(e) {
            var t;
            return (t = e && e.type == CKEDITOR.NODE_ELEMENT) && (t = !(r[e.getComputedStyle("float")] || r[e.getAttribute("align")])), t && !s[e.getComputedStyle("position")]
        }

        CKEDITOR.plugins.add("lineutils"), CKEDITOR.LINEUTILS_BEFORE = 1, CKEDITOR.LINEUTILS_AFTER = 2, CKEDITOR.LINEUTILS_INSIDE = 4, e.prototype = {
            start: function (e) {
                var t, n, i, o, a = this, r = this.editor, s = this.doc,
                    l = CKEDITOR.tools.eventsBuffer(50, function () {
                        r.readOnly || "wysiwyg" != r.mode || (a.relations = {}, (n = s.$.elementFromPoint(i, o)) && n.nodeType && (t = new CKEDITOR.dom.element(n), a.traverseSearch(t), isNaN(i + o) || a.pixelSearch(t, i, o), e && e(a.relations, i, o)))
                    });
                this.listener = this.editable.attachListener(this.target, "mousemove", function (e) {
                    i = e.data.$.clientX, o = e.data.$.clientY, l.input()
                }), this.editable.attachListener(this.inline ? this.editable : this.frame, "mouseout", function () {
                    l.reset()
                })
            }, stop: function () {
                this.listener && this.listener.removeListener()
            }, getRange: function () {
                var e = {};
                return e[CKEDITOR.LINEUTILS_BEFORE] = CKEDITOR.POSITION_BEFORE_START, e[CKEDITOR.LINEUTILS_AFTER] = CKEDITOR.POSITION_AFTER_END, e[CKEDITOR.LINEUTILS_INSIDE] = CKEDITOR.POSITION_AFTER_START, function (t) {
                    var n = this.editor.createRange();
                    return n.moveToPosition(this.relations[t.uid].element, e[t.type]), n
                }
            }(), store: function () {
                function e(e, t, n) {
                    var i = e.getUniqueId();
                    i in n ? n[i].type |= t : n[i] = {element: e, type: t}
                }

                return function (t, n) {
                    var o;
                    n & CKEDITOR.LINEUTILS_AFTER && i(o = t.getNext()) && o.isVisible() && (e(o, CKEDITOR.LINEUTILS_BEFORE, this.relations), n ^= CKEDITOR.LINEUTILS_AFTER), n & CKEDITOR.LINEUTILS_INSIDE && i(o = t.getFirst()) && o.isVisible() && (e(o, CKEDITOR.LINEUTILS_BEFORE, this.relations), n ^= CKEDITOR.LINEUTILS_INSIDE), e(t, n, this.relations)
                }
            }(), traverseSearch: function (e) {
                var t, n, o;
                do {
                    if (!((o = e.$["data-cke-expando"]) && o in this.relations)) {
                        if (e.equals(this.editable))break;
                        if (i(e))for (t in this.lookups)(n = this.lookups[t](e)) && this.store(e, n)
                    }
                } while ((!e || e.type != CKEDITOR.NODE_ELEMENT || "true" != e.getAttribute("contenteditable")) && (e = e.getParent()))
            }, pixelSearch: function () {
                function e(e, n, o, a, r) {
                    for (var s, l = 0; r(o) && (o += a, 25 != ++l);)if (s = this.doc.$.elementFromPoint(n, o))if (s == e) l = 0; else if (t(e, s) && (l = 0, i(s = new CKEDITOR.dom.element(s))))return s
                }

                var t = CKEDITOR.env.ie || CKEDITOR.env.webkit ? function (e, t) {
                    return e.contains(t)
                } : function (e, t) {
                    return !!(16 & e.compareDocumentPosition(t))
                };
                return function (t, n, o) {
                    var a = this.win.getViewPaneSize().height, r = e.call(this, t.$, n, o, -1, function (e) {
                        return 0 < e
                    });
                    if (n = e.call(this, t.$, n, o, 1, function (e) {
                            return e < a
                        }), r)for (this.traverseSearch(r); !r.getParent().equals(t);)r = r.getParent();
                    if (n)for (this.traverseSearch(n); !n.getParent().equals(t);)n = n.getParent();
                    for (; (r || n) && (r && (r = r.getNext(i)), r && !r.equals(n)) && (this.traverseSearch(r), n && (n = n.getPrevious(i)), n && !n.equals(r));)this.traverseSearch(n)
                }
            }(), greedySearch: function () {
                this.relations = {};
                for (var e, t, n, o = this.editable.getElementsByTag("*"), a = 0; e = o.getItem(a++);)if (!e.equals(this.editable) && e.type == CKEDITOR.NODE_ELEMENT && (e.hasAttribute("contenteditable") || !e.isReadOnly()) && i(e) && e.isVisible())for (n in this.lookups)(t = this.lookups[n](e)) && this.store(e, t);
                return this.relations
            }
        }, t.prototype = {
            locate: function () {
                function e(e, t) {
                    var n = e.element[t === CKEDITOR.LINEUTILS_BEFORE ? "getPrevious" : "getNext"]();
                    return n && i(n) ? (e.siblingRect = n.getClientRect(), t == CKEDITOR.LINEUTILS_BEFORE ? (e.siblingRect.bottom + e.elementRect.top) / 2 : (e.elementRect.bottom + e.siblingRect.top) / 2) : t == CKEDITOR.LINEUTILS_BEFORE ? e.elementRect.top : e.elementRect.bottom
                }

                return function (t) {
                    var n;
                    this.locations = {};
                    for (var i in t)n = t[i], n.elementRect = n.element.getClientRect(), n.type & CKEDITOR.LINEUTILS_BEFORE && this.store(i, CKEDITOR.LINEUTILS_BEFORE, e(n, CKEDITOR.LINEUTILS_BEFORE)), n.type & CKEDITOR.LINEUTILS_AFTER && this.store(i, CKEDITOR.LINEUTILS_AFTER, e(n, CKEDITOR.LINEUTILS_AFTER)), n.type & CKEDITOR.LINEUTILS_INSIDE && this.store(i, CKEDITOR.LINEUTILS_INSIDE, (n.elementRect.top + n.elementRect.bottom) / 2);
                    return this.locations
                }
            }(), sort: function () {
                var e, t, n, i;
                return function (o, a) {
                    e = this.locations, t = [];
                    for (var r in e)for (var s in e[r])if (n = Math.abs(o - e[r][s]), t.length) {
                        for (i = 0; i < t.length; i++)if (n < t[i].dist) {
                            t.splice(i, 0, {uid: +r, type: s, dist: n});
                            break
                        }
                        i == t.length && t.push({uid: +r, type: s, dist: n})
                    } else t.push({uid: +r, type: s, dist: n});
                    return void 0 !== a ? t.slice(0, a) : t
                }
            }(), store: function (e, t, n) {
                this.locations[e] || (this.locations[e] = {}), this.locations[e][t] = n
            }
        };
        var o = {
            display: "block",
            width: "0px",
            height: "0px",
            "border-color": "transparent",
            "border-style": "solid",
            position: "absolute",
            top: "-6px"
        }, a = {height: "0px", "border-top": "1px dashed red", position: "absolute", "z-index": 9999};
        n.prototype = {
            removeAll: function () {
                for (var e in this.hidden)this.hidden[e].remove(), delete this.hidden[e];
                for (e in this.visible)this.visible[e].remove(), delete this.visible[e]
            }, hideLine: function (e) {
                var t = e.getUniqueId();
                e.hide(), this.hidden[t] = e, delete this.visible[t]
            }, showLine: function (e) {
                var t = e.getUniqueId();
                e.show(), this.visible[t] = e, delete this.hidden[t]
            }, hideVisible: function () {
                for (var e in this.visible)this.hideLine(this.visible[e])
            }, placeLine: function (e, t) {
                var n, i, o;
                if (n = this.getStyle(e.uid, e.type)) {
                    for (o in this.visible)if (this.visible[o].getCustomData("hash") !== this.hash) {
                        i = this.visible[o];
                        break
                    }
                    if (!i)for (o in this.hidden)if (this.hidden[o].getCustomData("hash") !== this.hash) {
                        this.showLine(i = this.hidden[o]);
                        break
                    }
                    i || this.showLine(i = this.addLine()), i.setCustomData("hash", this.hash), this.visible[i.getUniqueId()] = i, i.setStyles(n), t && t(i)
                }
            }, getStyle: function (e, t) {
                var n = this.relations[e], i = this.locations[e][t], o = {};
                if (o.width = n.siblingRect ? Math.max(n.siblingRect.width, n.elementRect.width) : n.elementRect.width, o.top = this.inline ? i + this.winTopScroll.y - this.rect.relativeY : this.rect.top + this.winTopScroll.y + i, o.top - this.winTopScroll.y < this.rect.top || o.top - this.winTopScroll.y > this.rect.bottom)return !1;
                this.inline ? o.left = n.elementRect.left - this.rect.relativeX : (0 < n.elementRect.left ? o.left = this.rect.left + n.elementRect.left : (o.width += n.elementRect.left, o.left = this.rect.left), 0 < (n = o.left + o.width - (this.rect.left + this.winPane.width)) && (o.width -= n)), o.left += this.winTopScroll.x;
                for (var a in o)o[a] = CKEDITOR.tools.cssLength(o[a]);
                return o
            }, addLine: function () {
                var e = CKEDITOR.dom.element.createFromHtml(this.lineTpl);
                return e.appendTo(this.container), e
            }, prepare: function (e, t) {
                this.relations = e, this.locations = t, this.hash = Math.random()
            }, cleanup: function () {
                var e, t;
                for (t in this.visible)e = this.visible[t], e.getCustomData("hash") !== this.hash && this.hideLine(e)
            }, queryViewport: function () {
                this.winPane = this.win.getViewPaneSize(), this.winTopScroll = this.winTop.getScrollPosition(), this.winTopPane = this.winTop.getViewPaneSize(), this.rect = this.getClientRect(this.inline ? this.editable : this.frame)
            }, getClientRect: function (e) {
                e = e.getClientRect();
                var t = this.container.getDocumentPosition(), n = this.container.getComputedStyle("position");
                return e.relativeX = e.relativeY = 0, "static" != n && (e.relativeY = t.y, e.relativeX = t.x, e.top -= e.relativeY, e.bottom -= e.relativeY, e.left -= e.relativeX, e.right -= e.relativeX), e
            }
        };
        var r = {left: 1, right: 1, center: 1}, s = {absolute: 1, fixed: 1};
        CKEDITOR.plugins.lineutils = {finder: e, locator: t, liner: n}
    }(),function () {
        function e(e) {
            return e.getName && !e.hasAttribute("data-cke-temp")
        }

        CKEDITOR.plugins.add("widgetselection", {
            init: function (e) {
                if (CKEDITOR.env.webkit) {
                    var t = CKEDITOR.plugins.widgetselection;
                    e.on("contentDom", function (e) {
                        e = e.editor;
                        var n = e.document, i = e.editable();
                        i.attachListener(n, "keydown", function (e) {
                            e.data.getKeystroke() == CKEDITOR.CTRL + 65 && CKEDITOR.tools.setTimeout(function () {
                                t.addFillers(i) || t.removeFillers(i)
                            }, 0)
                        }, null, null, -1), e.on("selectionCheck", function (e) {
                            t.removeFillers(e.editor.editable())
                        }), e.on("paste", function (e) {
                            e.data.dataValue = t.cleanPasteData(e.data.dataValue)
                        }), "selectall" in e.plugins && t.addSelectAllIntegration(e)
                    })
                }
            }
        }), CKEDITOR.plugins.widgetselection = {
            startFiller: null,
            endFiller: null,
            fillerAttribute: "data-cke-filler-webkit",
            fillerContent: "&nbsp;",
            fillerTagName: "div",
            addFillers: function (t) {
                var n = t.editor;
                if (!this.isWholeContentSelected(t) && 0 < t.getChildCount()) {
                    var i = t.getFirst(e), o = t.getLast(e);
                    if (i && i.type == CKEDITOR.NODE_ELEMENT && !i.isEditable() && (this.startFiller = this.createFiller(), t.append(this.startFiller, 1)), o && o.type == CKEDITOR.NODE_ELEMENT && !o.isEditable() && (this.endFiller = this.createFiller(!0), t.append(this.endFiller, 0)), this.hasFiller(t))return n = n.createRange(), n.selectNodeContents(t), n.select(), !0
                }
                return !1
            },
            removeFillers: function (e) {
                if (this.hasFiller(e) && !this.isWholeContentSelected(e)) {
                    var t = e.findOne(this.fillerTagName + "[" + this.fillerAttribute + "=start]"),
                        n = e.findOne(this.fillerTagName + "[" + this.fillerAttribute + "=end]");
                    this.startFiller && t && this.startFiller.equals(t) ? this.removeFiller(this.startFiller, e) : this.startFiller = t, this.endFiller && n && this.endFiller.equals(n) ? this.removeFiller(this.endFiller, e) : this.endFiller = n
                }
            },
            cleanPasteData: function (e) {
                return e && e.length && (e = e.replace(this.createFillerRegex(), "").replace(this.createFillerRegex(!0), "")), e
            },
            isWholeContentSelected: function (e) {
                var t = e.editor.getSelection().getRanges()[0];
                return !(!t || t && t.collapsed) && (t = t.clone(), t.enlarge(CKEDITOR.ENLARGE_ELEMENT), !!(t && e && t.startContainer && t.endContainer && 0 === t.startOffset && t.endOffset === e.getChildCount() && t.startContainer.equals(e) && t.endContainer.equals(e)))
            },
            hasFiller: function (e) {
                return 0 < e.find(this.fillerTagName + "[" + this.fillerAttribute + "]").count()
            },
            createFiller: function (e) {
                var t = new CKEDITOR.dom.element(this.fillerTagName);
                return t.setHtml(this.fillerContent), t.setAttribute(this.fillerAttribute, e ? "end" : "start"), t.setAttribute("data-cke-temp", 1), t.setStyles({
                    display: "block",
                    width: 0,
                    height: 0,
                    padding: 0,
                    border: 0,
                    margin: 0,
                    position: "absolute",
                    top: 0,
                    left: "-9999px",
                    opacity: 0,
                    overflow: "hidden"
                }), t
            },
            removeFiller: function (e, t) {
                if (e) {
                    var n, i, o = t.editor, a = t.editor.getSelection().getRanges()[0].startPath(), r = o.createRange();
                    a.contains(e) && (n = e.getHtml(), i = !0), a = "start" == e.getAttribute(this.fillerAttribute), e.remove(), n && 0 < n.length && n != this.fillerContent ? (t.insertHtmlIntoRange(n, o.getSelection().getRanges()[0]), r.setStartAt(t.getChild(t.getChildCount() - 1), CKEDITOR.POSITION_BEFORE_END), o.getSelection().selectRanges([r])) : i && (a ? r.setStartAt(t.getFirst().getNext(), CKEDITOR.POSITION_AFTER_START) : r.setEndAt(t.getLast().getPrevious(), CKEDITOR.POSITION_BEFORE_END), t.editor.getSelection().selectRanges([r]))
                }
            },
            createFillerRegex: function (e) {
                var t = this.createFiller(e).getOuterHtml().replace(/style="[^"]*"/gi, 'style="[^"]*"').replace(/>[^<]*</gi, ">[^<]*<");
                return new RegExp((e ? "" : "^") + t + (e ? "$" : ""))
            },
            addSelectAllIntegration: function (e) {
                var t = this;
                e.editable().attachListener(e, "beforeCommandExec", function (n) {
                    var i = e.editable();
                    "selectAll" == n.data.name && i && t.addFillers(i)
                }, null, null, 9999)
            }
        }
    }(),function () {
        function e(e) {
            this.editor = e, this.registered = {}, this.instances = {}, this.selected = [], this.widgetHoldingFocusedEditable = this.focused = null, this._ = {
                nextId: 0,
                upcasts: [],
                upcastCallbacks: [],
                filters: {}
            }, b(this), v(this), this.on("checkWidgets", r), this.editor.on("contentDomInvalidated", this.checkWidgets, this), R(this), I(this), O(this), C(this), D(this)
        }

        function t(e, n, i, o, a) {
            var r = e.editor;
            CKEDITOR.tools.extend(this, o, {
                editor: r,
                id: n,
                inline: "span" == i.getParent().getName(),
                element: i,
                data: CKEDITOR.tools.extend({}, "function" == typeof o.defaults ? o.defaults() : o.defaults),
                dataReady: !1,
                inited: !1,
                ready: !1,
                edit: t.prototype.edit,
                focusedEditable: null,
                definition: o,
                repository: e,
                draggable: !1 !== o.draggable,
                _: {downcastFn: o.downcast && "string" == typeof o.downcast ? o.downcasts[o.downcast] : o.downcast}
            }, !0), e.fire("instanceCreated", this), $(this, o), this.init && this.init(), this.inited = !0, (e = this.element.data("cke-widget-data")) && this.setData(JSON.parse(decodeURIComponent(e))), a && this.setData(a), this.data.classes || this.setData("classes", this.getClasses()), this.dataReady = !0, q(this), this.fire("data", this.data), this.isInited() && r.editable().contains(this.wrapper) && (this.ready = !0, this.fire("ready"))
        }

        function n(e, t, n) {
            CKEDITOR.dom.element.call(this, t.$), this.editor = e, this._ = {}, t = this.filter = n.filter, CKEDITOR.dtd[this.getName()].p ? (this.enterMode = t ? t.getAllowedEnterMode(e.enterMode) : e.enterMode, this.shiftEnterMode = t ? t.getAllowedEnterMode(e.shiftEnterMode, !0) : e.shiftEnterMode) : this.enterMode = this.shiftEnterMode = CKEDITOR.ENTER_BR
        }

        function i(e, t) {
            e.addCommand(t.name, {
                exec: function (e, n) {
                    function i() {
                        e.widgets.finalizeCreation(s)
                    }

                    var o = e.widgets.focused;
                    if (o && o.name == t.name) o.edit(); else if (t.insert) t.insert(); else if (t.template) {
                        var a, o = "function" == typeof t.defaults ? t.defaults() : t.defaults,
                            o = CKEDITOR.dom.element.createFromHtml(t.template.output(o)),
                            r = e.widgets.wrapElement(o, t.name),
                            s = new CKEDITOR.dom.documentFragment(r.getDocument());
                        s.append(r), (a = e.widgets.initOn(o, t, n && n.startupData)) ? (o = a.once("edit", function (t) {
                            t.data.dialog ? a.once("dialog", function (t) {
                                t = t.data;
                                var n, o;
                                n = t.once("ok", i, null, null, 20), o = t.once("cancel", function (t) {
                                    t.data && !1 === t.data.hide || e.widgets.destroy(a, !0)
                                }), t.once("hide", function () {
                                    n.removeListener(), o.removeListener()
                                })
                            }) : i()
                        }, null, null, 999), a.edit(), o.removeListener()) : i()
                    }
                },
                allowedContent: t.allowedContent,
                requiredContent: t.requiredContent,
                contentForms: t.contentForms,
                contentTransformations: t.contentTransformations
            })
        }

        function o(e, t) {
            function n(e, n) {
                var i, o, a = t.upcast.split(",");
                for (o = 0; o < a.length; o++)if ((i = a[o]) === e.name)return t.upcasts[i].call(this, e, n);
                return !1
            }

            function i(t, n, i) {
                var o = CKEDITOR.tools.getIndex(e._.upcasts, function (e) {
                    return e[2] > i
                });
                0 > o && (o = e._.upcasts.length), e._.upcasts.splice(o, 0, [CKEDITOR.tools.bind(t, n), n.name, i])
            }

            var o = t.upcast, a = t.upcastPriority || 10;
            o && ("string" == typeof o ? i(n, t, a) : i(o, t, a))
        }

        function a(e, t) {
            if (e.focused = null, t.isInited()) {
                var n = t.editor.checkDirty();
                e.fire("widgetBlurred", {widget: t}), t.setFocused(!1), !n && t.editor.resetDirty()
            }
        }

        function r(e) {
            if (e = e.data, "wysiwyg" == this.editor.mode) {
                var n, i, o, a, r = this.editor.editable(), s = this.instances;
                if (r) {
                    for (n in s)s[n].isReady() && !r.contains(s[n].wrapper) && this.destroy(s[n], !0);
                    if (e && e.initOnlyNew) s = this.initOnAll(); else {
                        var l = r.find(".cke_widget_wrapper"), s = [];
                        for (n = 0, i = l.count(); n < i; n++) {
                            if (o = l.getItem(n), a = !this.getByElement(o, !0)) {
                                e:{
                                    a = m;
                                    for (var c = o; c = c.getParent();)if (a(c)) {
                                        a = !0;
                                        break e
                                    }
                                    a = !1
                                }
                                a = !a
                            }
                            a && r.contains(o) && (o.addClass("cke_widget_new"), s.push(this.initOn(o.getFirst(t.isDomWidgetElement))))
                        }
                    }
                    e && e.focusInited && 1 == s.length && s[0].focus()
                }
            }
        }

        function s(e) {
            if (void 0 !== e.attributes && e.attributes["data-widget"]) {
                var t = l(e), n = c(e), i = !1;
                t && t.value && t.value.match(/^\s/g) && (t.parent.attributes["data-cke-white-space-first"] = 1, t.value = t.value.replace(/^\s/g, "&nbsp;"), i = !0), n && n.value && n.value.match(/\s$/g) && (n.parent.attributes["data-cke-white-space-last"] = 1, n.value = n.value.replace(/\s$/g, "&nbsp;"), i = !0), i && (e.attributes["data-cke-widget-white-space"] = 1)
            }
        }

        function l(e) {
            return e.find(function (e) {
                return 3 === e.type
            }, !0).shift()
        }

        function c(e) {
            return e.find(function (e) {
                return 3 === e.type
            }, !0).pop()
        }

        function d(e, t, n) {
            if (!n.allowedContent && !n.disallowedContent)return null;
            var i = this._.filters[e];
            return i || (this._.filters[e] = i = {}), e = i[t], e || (e = n.allowedContent ? new CKEDITOR.filter(n.allowedContent) : this.editor.filter.clone(), i[t] = e, n.disallowedContent && e.disallow(n.disallowedContent)), e
        }

        function u(e) {
            var n = [], i = e._.upcasts, o = e._.upcastCallbacks;
            return {
                toBeWrapped: n, iterator: function (e) {
                    var a, r, s, l, c;
                    if ("data-cke-widget-wrapper" in e.attributes)return (e = e.getFirst(t.isParserWidgetElement)) && n.push([e]), !1;
                    if ("data-widget" in e.attributes)return n.push([e]), !1;
                    if (c = i.length) {
                        if (e.attributes["data-cke-widget-upcasted"])return !1;
                        for (l = 0, a = o.length; l < a; ++l)if (!1 === o[l](e))return;
                        for (l = 0; l < c; ++l)if (a = i[l], s = {}, r = a[0](e, s))return r instanceof CKEDITOR.htmlParser.element && (e = r), e.attributes["data-cke-widget-data"] = encodeURIComponent(JSON.stringify(s)), e.attributes["data-cke-widget-upcasted"] = 1, n.push([e, a[1]]), !1
                    }
                }
            }
        }

        function h(e, t) {
            return {
                tabindex: -1,
                contenteditable: "false",
                "data-cke-widget-wrapper": 1,
                "data-cke-filter": "off",
                class: "cke_widget_wrapper cke_widget_new cke_widget_" + (e ? "inline" : "block") + (t ? " cke_widget_" + t : "")
            }
        }

        function f(e, t, n) {
            if (e.type == CKEDITOR.NODE_ELEMENT) {
                var i = CKEDITOR.dtd[e.name];
                if (i && !i[n.name]) {
                    var i = e.split(t), o = e.parent;
                    return t = i.getIndex(), e.children.length || (--t, e.remove()), i.children.length || i.remove(), f(o, t, n)
                }
            }
            e.add(n, t)
        }

        function g(e, t) {
            return "boolean" == typeof e.inline ? e.inline : !!CKEDITOR.dtd.$inline[t]
        }

        function m(e) {
            return e.hasAttribute("data-cke-temp")
        }

        function E(e, t, n, i) {
            var o = e.editor;
            o.fire("lockSnapshot"), n ? (i = n.data("cke-widget-editable"), i = t.editables[i], e.widgetHoldingFocusedEditable = t, t.focusedEditable = i, n.addClass("cke_widget_editable_focused"), i.filter && o.setActiveFilter(i.filter), o.setActiveEnterMode(i.enterMode, i.shiftEnterMode)) : (i || t.focusedEditable.removeClass("cke_widget_editable_focused"), t.focusedEditable = null, e.widgetHoldingFocusedEditable = null, o.setActiveFilter(null), o.setActiveEnterMode(null, null)), o.fire("unlockSnapshot")
        }

        function p(e) {
            e.contextMenu && e.contextMenu.addListener(function (t) {
                if (t = e.widgets.getByElement(t, !0))return t.fire("contextMenu", {})
            })
        }

        function T(e, t) {
            return CKEDITOR.tools.trim(t)
        }

        function C(e) {
            var n = e.editor, i = CKEDITOR.plugins.lineutils
            ;n.on("dragstart", function (i) {
                var o = i.data.target;
                t.isDomDragHandler(o) && (o = e.getByElement(o), i.data.dataTransfer.setData("cke/widget-id", o.id), n.focus(), o.focus())
            }), n.on("drop", function (t) {
                var i = t.data.dataTransfer, o = i.getData("cke/widget-id"), a = i.getTransferType(n),
                    i = n.createRange();
                "" !== o && a === CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? t.cancel() : "" !== o && a == CKEDITOR.DATA_TRANSFER_INTERNAL && (o = e.instances[o]) && (i.setStartBefore(o.wrapper), i.setEndAfter(o.wrapper), t.data.dragRange = i, delete CKEDITOR.plugins.clipboard.dragStartContainerChildCount, delete CKEDITOR.plugins.clipboard.dragEndContainerChildCount, t.data.dataTransfer.setData("text/html", n.editable().getHtmlFromRange(i).getHtml()), n.widgets.destroy(o, !0))
            }), n.on("contentDom", function () {
                var o = n.editable();
                CKEDITOR.tools.extend(e, {
                    finder: new i.finder(n, {
                        lookups: {
                            default: function (n) {
                                if (!n.is(CKEDITOR.dtd.$listItem) && n.is(CKEDITOR.dtd.$block) && !t.isDomNestedEditable(n) && !e._.draggedWidget.wrapper.contains(n)) {
                                    var i = t.getNestedEditable(o, n);
                                    if (i) {
                                        if (n = e._.draggedWidget, e.getByElement(i) == n)return;
                                        if (i = CKEDITOR.filter.instances[i.data("cke-filter")], n = n.requiredContent, i && n && !i.check(n))return
                                    }
                                    return CKEDITOR.LINEUTILS_BEFORE | CKEDITOR.LINEUTILS_AFTER
                                }
                            }
                        }
                    }),
                    locator: new i.locator(n),
                    liner: new i.liner(n, {
                        lineStyle: {cursor: "move !important", "border-top-color": "#666"},
                        tipLeftStyle: {"border-left-color": "#666"},
                        tipRightStyle: {"border-right-color": "#666"}
                    })
                }, !0)
            })
        }

        function I(e) {
            var n = e.editor;
            n.on("contentDom", function () {
                var i, o, a = n.editable(), r = a.isInline() ? a : n.document;
                a.attachListener(r, "mousedown", function (a) {
                    var r = a.data.getTarget();
                    i = r instanceof CKEDITOR.dom.element ? e.getByElement(r) : null, o = 0, i && (i.inline && r.type == CKEDITOR.NODE_ELEMENT && r.hasAttribute("data-cke-widget-drag-handler") ? (o = 1, e.focused != i && n.getSelection().removeAllRanges()) : t.getNestedEditable(i.wrapper, r) ? i = null : (a.data.preventDefault(), CKEDITOR.env.ie || i.focus()))
                }), a.attachListener(r, "mouseup", function () {
                    o && i && i.wrapper && (o = 0, i.focus())
                }), CKEDITOR.env.ie && a.attachListener(r, "mouseup", function () {
                    setTimeout(function () {
                        i && i.wrapper && a.contains(i.wrapper) && (i.focus(), i = null)
                    })
                })
            }), n.on("doubleclick", function (n) {
                var i = e.getByElement(n.data.element);
                if (i && !t.getNestedEditable(i.wrapper, n.data.element))return i.fire("doubleclick", {element: n.data.element})
            }, null, null, 1)
        }

        function O(e) {
            e.editor.on("key", function (t) {
                var n, i = e.focused, o = e.widgetHoldingFocusedEditable;
                return i ? n = i.fire("key", {keyCode: t.data.keyCode}) : o && (i = t.data.keyCode, t = o.focusedEditable, i == CKEDITOR.CTRL + 65 ? (i = t.getBogus(), o = o.editor.createRange(), o.selectNodeContents(t), i && o.setEndAt(i, CKEDITOR.POSITION_BEFORE_START), o.select(), n = !1) : 8 == i || 46 == i ? (n = o.editor.getSelection().getRanges(), o = n[0], n = !(1 == n.length && o.collapsed && o.checkBoundaryOfElement(t, CKEDITOR[8 == i ? "START" : "END"]))) : n = void 0), n
            }, null, null, 1)
        }

        function D(e) {
            function t(t) {
                e.focused && k(e.focused, "cut" == t.name)
            }

            var n = e.editor;
            n.on("contentDom", function () {
                var e = n.editable();
                e.attachListener(e, "copy", t), e.attachListener(e, "cut", t)
            })
        }

        function R(e) {
            var n = e.editor;
            n.on("selectionCheck", function () {
                e.fire("checkSelection")
            }), e.on("checkSelection", e.checkSelection, e), n.on("selectionChange", function (i) {
                var o = (i = t.getNestedEditable(n.editable(), i.data.selection.getStartElement())) && e.getByElement(i),
                    a = e.widgetHoldingFocusedEditable;
                a ? a === o && a.focusedEditable.equals(i) || (E(e, a, null), o && i && E(e, o, i)) : o && i && E(e, o, i)
            }), n.on("dataReady", function () {
                y(e).commit()
            }), n.on("blur", function () {
                var t;
                (t = e.focused) && a(e, t), (t = e.widgetHoldingFocusedEditable) && E(e, t, null)
            })
        }

        function v(e) {
            var n = e.editor, i = {};
            n.on("toDataFormat", function (n) {
                var o = CKEDITOR.tools.getNextNumber(), a = [];
                n.data.downcastingSessionId = o, i[o] = a, n.data.dataValue.forEach(function (n) {
                    var i, o = n.attributes;
                    if ("data-cke-widget-white-space" in o) {
                        i = l(n);
                        var r = c(n);
                        i.parent.attributes["data-cke-white-space-first"] && (i.value = i.value.replace(/^&nbsp;/g, " ")), r.parent.attributes["data-cke-white-space-last"] && (r.value = r.value.replace(/&nbsp;$/g, " "))
                    }
                    if ("data-cke-widget-id" in o) (o = e.instances[o["data-cke-widget-id"]]) && (i = n.getFirst(t.isParserWidgetElement), a.push({
                        wrapper: n,
                        element: i,
                        widget: o,
                        editables: {}
                    }), "1" != i.attributes["data-cke-widget-keep-attr"] && delete i.attributes["data-widget"]); else if ("data-cke-widget-editable" in o)return a[a.length - 1].editables[o["data-cke-widget-editable"]] = n, !1
                }, CKEDITOR.NODE_ELEMENT, !0)
            }, null, null, 8), n.on("toDataFormat", function (e) {
                if (e.data.downcastingSessionId) {
                    e = i[e.data.downcastingSessionId];
                    for (var t, n, o, a, r, s; t = e.shift();) {
                        n = t.widget, o = t.element, a = n._.downcastFn && n._.downcastFn.call(n, o);
                        for (s in t.editables)r = t.editables[s], delete r.attributes.contenteditable, r.setHtml(n.editables[s].getData());
                        a || (a = o), t.wrapper.replaceWith(a)
                    }
                }
            }, null, null, 13), n.on("contentDomUnload", function () {
                e.destroyAll(!0)
            })
        }

        function b(e) {
            var n, i, o = e.editor;
            o.on("toHtml", function (i) {
                var o, a = u(e);
                for (i.data.dataValue.forEach(a.iterator, CKEDITOR.NODE_ELEMENT, !0); o = a.toBeWrapped.pop();) {
                    var r = o[0], s = r.parent;
                    s.type == CKEDITOR.NODE_ELEMENT && s.attributes["data-cke-widget-wrapper"] && s.replaceWith(r), e.wrapElement(o[0], o[1])
                }
                n = i.data.protectedWhitespaces ? 3 == i.data.dataValue.children.length && t.isParserWidgetWrapper(i.data.dataValue.children[1]) : 1 == i.data.dataValue.children.length && t.isParserWidgetWrapper(i.data.dataValue.children[0])
            }, null, null, 8), o.on("dataReady", function () {
                if (i)for (var n, a, r = o.editable().find(".cke_widget_wrapper"), s = 0, l = r.count(); s < l; ++s)n = r.getItem(s), a = n.getFirst(t.isDomWidgetElement), a.type == CKEDITOR.NODE_ELEMENT && a.data("widget") ? (a.replace(n), e.wrapElement(a)) : n.remove();
                i = 0, e.destroyAll(!0), e.initOnAll()
            }), o.on("loadSnapshot", function (t) {
                /data-cke-widget/.test(t.data) && (i = 1), e.destroyAll(!0)
            }, null, null, 9), o.on("paste", function (e) {
                e = e.data, e.dataValue = e.dataValue.replace(z, T), e.range && (e = t.getNestedEditable(o.editable(), e.range.startContainer)) && (e = CKEDITOR.filter.instances[e.data("cke-filter")]) && o.setActiveFilter(e)
            }), o.on("afterInsertHtml", function (t) {
                t.data.intoRange ? e.checkWidgets({initOnlyNew: !0}) : (o.fire("lockSnapshot"), e.checkWidgets({
                    initOnlyNew: !0,
                    focusInited: n
                }), o.fire("unlockSnapshot"))
            })
        }

        function y(e) {
            var t = e.selected, n = [], i = t.slice(0), o = null;
            return {
                select: function (e) {
                    return 0 > CKEDITOR.tools.indexOf(t, e) && n.push(e), e = CKEDITOR.tools.indexOf(i, e), 0 <= e && i.splice(e, 1), this
                }, focus: function (e) {
                    return o = e, this
                }, commit: function () {
                    var r, s, l = e.focused !== o;
                    for (e.editor.fire("lockSnapshot"), l && (r = e.focused) && a(e, r); r = i.pop();)t.splice(CKEDITOR.tools.indexOf(t, r), 1), r.isInited() && (s = r.editor.checkDirty(), r.setSelected(!1), !s && r.editor.resetDirty());
                    for (l && o && (s = e.editor.checkDirty(), e.focused = o, e.fire("widgetFocused", {widget: o}), o.setFocused(!0), !s && e.editor.resetDirty()); r = n.pop();)t.push(r), r.setSelected(!0);
                    e.editor.fire("unlockSnapshot")
                }
            }
        }

        function K(e, t, n) {
            var i = 0;
            t = w(t);
            var o, a = e.data.classes || {};
            if (t) {
                for (a = CKEDITOR.tools.clone(a); o = t.pop();)n ? a[o] || (i = a[o] = 1) : a[o] && (delete a[o], i = 1);
                i && e.setData("classes", a)
            }
        }

        function _(e) {
            e.cancel()
        }

        function k(e, t) {
            var n = e.editor, i = n.document, o = CKEDITOR.env.edge && 16 <= CKEDITOR.env.version;
            if (!i.getById("cke_copybin")) {
                var a = !n.blockless && !CKEDITOR.env.ie || o ? "div" : "span", o = i.createElement(a),
                    r = i.createElement(a), a = CKEDITOR.env.ie && 9 > CKEDITOR.env.version;
                r.setAttributes({id: "cke_copybin", "data-cke-temp": "1"}), o.setStyles({
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden"
                }), o.setStyle("ltr" == n.config.contentsLangDirection ? "left" : "right", "-5000px");
                var s = n.createRange();
                s.setStartBefore(e.wrapper), s.setEndAfter(e.wrapper), o.setHtml('<span data-cke-copybin-start="1">​</span>' + n.editable().getHtmlFromRange(s).getHtml() + '<span data-cke-copybin-end="1">​</span>'), n.fire("saveSnapshot"), n.fire("lockSnapshot"), r.append(o), n.editable().append(r);
                var l = n.on("selectionChange", _, null, null, 0),
                    c = e.repository.on("checkSelection", _, null, null, 0);
                if (a)var d = i.getDocumentElement().$, u = d.scrollTop;
                s = n.createRange(), s.selectNodeContents(o), s.select(), a && (d.scrollTop = u), setTimeout(function () {
                    t || e.focus(), r.remove(), l.removeListener(), c.removeListener(), n.fire("unlockSnapshot"), t && !n.readOnly && (e.repository.del(e), n.fire("saveSnapshot"))
                }, 100)
            }
        }

        function w(e) {
            return (e = (e = e.getDefinition().attributes) && e.class) ? e.split(/\s+/) : null
        }

        function N() {
            var e = CKEDITOR.document.getActive(), t = this.editor, n = t.editable();
            (n.isInline() ? n : t.document.getWindow().getFrame()).equals(e) && t.focusManager.focus(n)
        }

        function S() {
            CKEDITOR.env.gecko && this.editor.unlockSelection(), CKEDITOR.env.webkit || (this.editor.forceNextSelectionCheck(), this.editor.selectionChange(1))
        }

        function x(e) {
            var t = null;
            e.on("data", function () {
                var e, n = this.data.classes;
                if (t != n) {
                    for (e in t)n && n[e] || this.removeClass(e);
                    for (e in n)this.addClass(e);
                    t = n
                }
            })
        }

        function A(e) {
            e.on("data", function () {
                if (e.wrapper) {
                    var t = this.getLabel ? this.getLabel() : this.editor.lang.widget.label.replace(/%1/, this.pathName || this.element.getName());
                    e.wrapper.setAttribute("role", "region"), e.wrapper.setAttribute("aria-label", t)
                }
            }, null, null, 9999)
        }

        function L(e) {
            if (e.draggable) {
                var n, i = e.editor, o = e.wrapper.getLast(t.isDomDragHandlerContainer);
                o ? n = o.findOne("img") : (o = new CKEDITOR.dom.element("span", i.document), o.setAttributes({
                    class: "cke_reset cke_widget_drag_handler_container",
                    style: "background:rgba(220,220,220,0.5);background-image:url(" + i.plugins.widget.path + "images/handle.png)"
                }), n = new CKEDITOR.dom.element("img", i.document), n.setAttributes({
                    class: "cke_reset cke_widget_drag_handler",
                    "data-cke-widget-drag-handler": "1",
                    src: CKEDITOR.tools.transparentImageData,
                    width: 15,
                    title: i.lang.widget.move,
                    height: 15,
                    role: "presentation"
                }), e.inline && n.setAttribute("draggable", "true"), o.append(n), e.wrapper.append(o)), e.wrapper.on("dragover", function (e) {
                    e.data.preventDefault()
                }), e.wrapper.on("mouseenter", e.updateDragHandlerPosition, e), setTimeout(function () {
                    e.on("data", e.updateDragHandlerPosition, e)
                }, 50), !e.inline && (n.on("mousedown", F, e), CKEDITOR.env.ie && 9 > CKEDITOR.env.version) && n.on("dragstart", function (e) {
                    e.data.preventDefault(!0)
                }), e.dragHandlerContainer = o
            }
        }

        function F(e) {
            function t() {
                var t;
                for (h.reset(); t = c.pop();)t.removeListener();
                var n = d;
                t = e.sender;
                var i = this.repository.finder, o = this.repository.liner, a = this.editor, r = this.editor.editable();
                CKEDITOR.tools.isEmpty(o.visible) || (n = i.getRange(n[0]), this.focus(), a.fire("drop", {
                    dropRange: n,
                    target: n.startContainer
                })), r.removeClass("cke_widget_dragging"), o.hideVisible(), a.fire("dragend", {target: t})
            }

            if (CKEDITOR.tools.getMouseButton(e) === CKEDITOR.MOUSE_BUTTON_LEFT) {
                var n, i, o = this.repository.finder, a = this.repository.locator, r = this.repository.liner,
                    s = this.editor, l = s.editable(), c = [], d = [];
                this.repository._.draggedWidget = this;
                var u = o.greedySearch(), h = CKEDITOR.tools.eventsBuffer(50, function () {
                    n = a.locate(u), d = a.sort(i, 1), d.length && (r.prepare(u, n), r.placeLine(d[0]), r.cleanup())
                });
                l.addClass("cke_widget_dragging"), c.push(l.on("mousemove", function (e) {
                    i = e.data.$.clientY, h.input()
                })), s.fire("dragstart", {target: e.sender}), c.push(s.document.once("mouseup", t, this)), l.isInline() || c.push(CKEDITOR.document.once("mouseup", t, this))
            }
        }

        function P(e) {
            var t, n, i = e.editables;
            if (e.editables = {}, e.editables)for (t in i)n = i[t], e.initEditable(t, "string" == typeof n ? {selector: n} : n)
        }

        function B(e) {
            if (e.mask) {
                var t = e.wrapper.findOne(".cke_widget_mask");
                t || (t = new CKEDITOR.dom.element("img", e.editor.document), t.setAttributes({
                    src: CKEDITOR.tools.transparentImageData,
                    class: "cke_reset cke_widget_mask"
                }), e.wrapper.append(t)), e.mask = t
            }
        }

        function M(e) {
            if (e.parts) {
                var t, n, i = {};
                for (n in e.parts)t = e.wrapper.findOne(e.parts[n]), i[n] = t;
                e.parts = i
            }
        }

        function $(e, n) {
            H(e), M(e), P(e), B(e), L(e), x(e), A(e), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && e.wrapper.on("dragstart", function (n) {
                var i = n.data.getTarget();
                t.getNestedEditable(e, i) || e.inline && t.isDomDragHandler(i) || n.data.preventDefault()
            }), e.wrapper.removeClass("cke_widget_new"), e.element.addClass("cke_widget_element"), e.on("key", function (t) {
                if (13 == (t = t.data.keyCode)) e.edit(); else {
                    if (t == CKEDITOR.CTRL + 67 || t == CKEDITOR.CTRL + 88)return void k(e, t == CKEDITOR.CTRL + 88);
                    if (t in W || CKEDITOR.CTRL & t || CKEDITOR.ALT & t)return
                }
                return !1
            }, null, null, 999), e.on("doubleclick", function (t) {
                e.edit() && t.cancel()
            }), n.data && e.on("data", n.data), n.edit && e.on("edit", n.edit)
        }

        function H(e) {
            (e.wrapper = e.element.getParent()).setAttribute("data-cke-widget-id", e.id)
        }

        function q(e) {
            e.element.data("cke-widget-data", encodeURIComponent(JSON.stringify(e.data)))
        }

        function U() {
            function e() {
            }

            function n(e, t, n) {
                return !(!n || !this.checkElement(e)) && ((e = n.widgets.getByElement(e, !0)) && e.checkStyleActive(this))
            }

            var i = {};
            CKEDITOR.style.addCustomHandler({
                type: "widget", setup: function (e) {
                    if (this.widget = e.widget, this.group = "string" == typeof e.group ? [e.group] : e.group) {
                        e = this.widget;
                        var t;
                        i[e] || (i[e] = {});
                        for (var n = 0, o = this.group.length; n < o; n++)t = this.group[n], i[e][t] || (i[e][t] = []), i[e][t].push(this)
                    }
                }, apply: function (e) {
                    var t;
                    e instanceof CKEDITOR.editor && this.checkApplicable(e.elementPath(), e) && (t = e.widgets.focused, this.group && this.removeStylesFromSameGroup(e), t.applyStyle(this))
                }, remove: function (e) {
                    e instanceof CKEDITOR.editor && this.checkApplicable(e.elementPath(), e) && e.widgets.focused.removeStyle(this)
                }, removeStylesFromSameGroup: function (e) {
                    var t, n, o = !1;
                    if (!(e instanceof CKEDITOR.editor))return !1;
                    if (n = e.elementPath(), this.checkApplicable(n, e))for (var a = 0, r = this.group.length; a < r; a++) {
                        t = i[this.widget][this.group[a]];
                        for (var s = 0; s < t.length; s++)t[s] !== this && t[s].checkActive(n, e) && (e.widgets.focused.removeStyle(t[s]), o = !0)
                    }
                    return o
                }, checkActive: function (e, t) {
                    return this.checkElementMatch(e.lastElement, 0, t)
                }, checkApplicable: function (e, t) {
                    return t instanceof CKEDITOR.editor && this.checkElement(e.lastElement)
                }, checkElementMatch: n, checkElementRemovable: n, checkElement: function (e) {
                    return !!t.isDomWidgetWrapper(e) && ((e = e.getFirst(t.isDomWidgetElement)) && e.data("widget") == this.widget)
                }, buildPreview: function (e) {
                    return e || this._.definition.name
                }, toAllowedContentRules: function (e) {
                    if (!e)return null;
                    e = e.widgets.registered[this.widget];
                    var t, n = {};
                    return e ? e.styleableElements ? (t = this.getClassesArray()) ? (n[e.styleableElements] = {
                        classes: t,
                        propertiesOnly: !0
                    }, n) : null : e.styleToAllowedContentRules ? e.styleToAllowedContentRules(this) : null : null
                }, getClassesArray: function () {
                    var e = this._.definition.attributes && this._.definition.attributes.class;
                    return e ? CKEDITOR.tools.trim(e).split(/\s+/) : null
                }, applyToRange: e, removeFromRange: e, applyToObject: e
            })
        }

        CKEDITOR.plugins.add("widget", {
            requires: "lineutils,clipboard,widgetselection", onLoad: function () {
                void 0 !== CKEDITOR.document.$.querySelectorAll && (CKEDITOR.addCss(".cke_widget_wrapper{position:relative;outline:none}.cke_widget_inline{display:inline-block}.cke_widget_wrapper:hover>.cke_widget_element{outline:2px solid #ffd25c;cursor:default}.cke_widget_wrapper:hover .cke_widget_editable{outline:2px solid #ffd25c}.cke_widget_wrapper.cke_widget_focused>.cke_widget_element,.cke_widget_wrapper .cke_widget_editable.cke_widget_editable_focused{outline:2px solid #47a4f5}.cke_widget_editable{cursor:text}.cke_widget_drag_handler_container{position:absolute;width:15px;height:0;display:none;opacity:0.75;transition:height 0s 0.2s;line-height:0}.cke_widget_wrapper:hover>.cke_widget_drag_handler_container{height:15px;transition:none}.cke_widget_drag_handler_container:hover{opacity:1}img.cke_widget_drag_handler{cursor:move;width:15px;height:15px;display:inline-block}.cke_widget_mask{position:absolute;top:0;left:0;width:100%;height:100%;display:block}.cke_editable.cke_widget_dragging, .cke_editable.cke_widget_dragging *{cursor:move !important}"), U())
            }, beforeInit: function (t) {
                void 0 !== CKEDITOR.document.$.querySelectorAll && (t.widgets = new e(t))
            }, afterInit: function (e) {
                if (void 0 !== CKEDITOR.document.$.querySelectorAll) {
                    var t, n, i, o = e.widgets.registered;
                    for (n in o)t = o[n], (i = t.button) && e.ui.addButton && e.ui.addButton(CKEDITOR.tools.capitalize(t.name, !0), {
                        label: i,
                        command: t.name,
                        toolbar: "insert,10"
                    });
                    p(e)
                }
            }
        }), e.prototype = {
            MIN_SELECTION_CHECK_INTERVAL: 500, add: function (e, t) {
                return t = CKEDITOR.tools.prototypedCopy(t), t.name = e, t._ = t._ || {}, this.editor.fire("widgetDefinition", t), t.template && (t.template = new CKEDITOR.template(t.template)), i(this.editor, t), o(this, t), this.registered[e] = t
            }, addUpcastCallback: function (e) {
                this._.upcastCallbacks.push(e)
            }, checkSelection: function () {
                var e, n = this.editor.getSelection(), i = n.getSelectedElement(), o = y(this);
                if (i && (e = this.getByElement(i, !0)))return o.focus(e).select(e).commit();
                if (!(n = n.getRanges()[0]) || n.collapsed)return o.commit();
                for (n = new CKEDITOR.dom.walker(n), n.evaluator = t.isDomWidgetWrapper; i = n.next();)o.select(this.getByElement(i));
                o.commit()
            }, checkWidgets: function (e) {
                this.fire("checkWidgets", CKEDITOR.tools.copy(e || {}))
            }, del: function (e) {
                if (this.focused === e) {
                    var t, n = e.editor, i = n.createRange();
                    (t = i.moveToClosestEditablePosition(e.wrapper, !0)) || (t = i.moveToClosestEditablePosition(e.wrapper, !1)), t && n.getSelection().selectRanges([i])
                }
                e.wrapper.remove(), this.destroy(e, !0)
            }, destroy: function (e, t) {
                this.widgetHoldingFocusedEditable === e && E(this, e, null, t), e.destroy(t), delete this.instances[e.id], this.fire("instanceDestroyed", e)
            }, destroyAll: function (e, t) {
                var n, i, o = this.instances;
                if (t && !e) {
                    i = t.find(".cke_widget_wrapper");
                    for (var o = i.count(), a = 0; a < o; ++a)(n = this.getByElement(i.getItem(a), !0)) && this.destroy(n)
                } else for (i in o)n = o[i], this.destroy(n, e)
            }, finalizeCreation: function (e) {
                (e = e.getFirst()) && t.isDomWidgetWrapper(e) && (this.editor.insertElement(e), e = this.getByElement(e), e.ready = !0, e.fire("ready"), e.focus())
            }, getByElement: function () {
                function e(e) {
                    return e.is(t) && e.data("cke-widget-id")
                }

                var t = {div: 1, span: 1};
                return function (t, n) {
                    if (!t)return null;
                    var i = e(t);
                    if (!n && !i) {
                        var o = this.editor.editable();
                        do {
                            t = t.getParent()
                        } while (t && !t.equals(o) && !(i = e(t)))
                    }
                    return this.instances[i] || null
                }
            }(), initOn: function (e, n, i) {
                if (n ? "string" == typeof n && (n = this.registered[n]) : n = this.registered[e.data("widget")], !n)return null;
                var o = this.wrapElement(e, n.name);
                return o ? o.hasClass("cke_widget_new") ? (e = new t(this, this._.nextId++, e, n, i), e.isInited() ? this.instances[e.id] = e : null) : this.getByElement(e) : null
            }, initOnAll: function (e) {
                e = (e || this.editor.editable()).find(".cke_widget_new");
                for (var n, i = [], o = e.count(); o--;)(n = this.initOn(e.getItem(o).getFirst(t.isDomWidgetElement))) && i.push(n);
                return i
            }, onWidget: function (e) {
                var t = Array.prototype.slice.call(arguments);
                t.shift();
                for (var n in this.instances) {
                    var i = this.instances[n];
                    i.name == e && i.on.apply(i, t)
                }
                this.on("instanceCreated", function (n) {
                    n = n.data, n.name == e && n.on.apply(n, t)
                })
            }, parseElementClasses: function (e) {
                if (!e)return null;
                e = CKEDITOR.tools.trim(e).split(/\s+/);
                for (var t, n = {}, i = 0; t = e.pop();)-1 == t.indexOf("cke_") && (n[t] = i = 1);
                return i ? n : null
            }, wrapElement: function (e, t) {
                var n, i, o = null;
                if (e instanceof CKEDITOR.dom.element) {
                    if (t = t || e.data("widget"), !(n = this.registered[t]))return null;
                    if ((o = e.getParent()) && o.type == CKEDITOR.NODE_ELEMENT && o.data("cke-widget-wrapper"))return o;
                    e.hasAttribute("data-cke-widget-keep-attr") || e.data("cke-widget-keep-attr", e.data("widget") ? 1 : 0), e.data("widget", t), (i = g(n, e.getName())) && s(e), o = new CKEDITOR.dom.element(i ? "span" : "div"), o.setAttributes(h(i, t)), o.data("cke-display-name", n.pathName ? n.pathName : e.getName()), e.getParent(!0) && o.replace(e), e.appendTo(o)
                } else if (e instanceof CKEDITOR.htmlParser.element) {
                    if (t = t || e.attributes["data-widget"], !(n = this.registered[t]))return null;
                    if ((o = e.parent) && o.type == CKEDITOR.NODE_ELEMENT && o.attributes["data-cke-widget-wrapper"])return o;
                    "data-cke-widget-keep-attr" in e.attributes || (e.attributes["data-cke-widget-keep-attr"] = e.attributes["data-widget"] ? 1 : 0), t && (e.attributes["data-widget"] = t), (i = g(n, e.name)) && s(e), o = new CKEDITOR.htmlParser.element(i ? "span" : "div", h(i, t)), o.attributes["data-cke-display-name"] = n.pathName ? n.pathName : e.name, n = e.parent;
                    var a;
                    n && (a = e.getIndex(), e.remove()), o.add(e), n && f(n, a, o)
                }
                return o
            }, _tests_createEditableFilter: d
        }, CKEDITOR.event.implementOn(e.prototype), t.prototype = {
            addClass: function (e) {
                this.element.addClass(e), this.wrapper.addClass(t.WRAPPER_CLASS_PREFIX + e)
            }, applyStyle: function (e) {
                K(this, e, 1)
            }, checkStyleActive: function (e) {
                e = w(e);
                var t;
                if (!e)return !1;
                for (; t = e.pop();)if (!this.hasClass(t))return !1;
                return !0
            }, destroy: function (e) {
                if (this.fire("destroy"), this.editables)for (var t in this.editables)this.destroyEditable(t, e);
                e || ("0" == this.element.data("cke-widget-keep-attr") && this.element.removeAttribute("data-widget"), this.element.removeAttributes(["data-cke-widget-data", "data-cke-widget-keep-attr"]), this.element.removeClass("cke_widget_element"), this.element.replace(this.wrapper)), this.wrapper = null
            }, destroyEditable: function (e, t) {
                var n = this.editables[e];
                n.removeListener("focus", S), n.removeListener("blur", N), this.editor.focusManager.remove(n), t || (this.repository.destroyAll(!1, n), n.removeClass("cke_widget_editable"), n.removeClass("cke_widget_editable_focused"), n.removeAttributes(["contenteditable", "data-cke-widget-editable", "data-cke-enter-mode"])), delete this.editables[e]
            }, edit: function () {
                var e = {dialog: this.dialog}, t = this;
                return !(!1 === this.fire("edit", e) || !e.dialog) && (this.editor.openDialog(e.dialog, function (e) {
                        var n, i;
                        !1 !== t.fire("dialog", e) && (n = e.on("show", function () {
                            e.setupContent(t)
                        }), i = e.on("ok", function () {
                            var n, i = t.on("data", function (e) {
                                n = 1, e.cancel()
                            }, null, null, 0);
                            t.editor.fire("saveSnapshot"), e.commitContent(t), i.removeListener(), n && (t.fire("data", t.data), t.editor.fire("saveSnapshot"))
                        }), e.once("hide", function () {
                            n.removeListener(), i.removeListener()
                        }))
                    }), !0)
            }, getClasses: function () {
                return this.repository.parseElementClasses(this.element.getAttribute("class"))
            }, hasClass: function (e) {
                return this.element.hasClass(e)
            }, initEditable: function (e, t) {
                var i = this._findOneNotNested(t.selector);
                return !(!i || !i.is(CKEDITOR.dtd.$editable)) && (i = new n(this.editor, i, {filter: d.call(this.repository, this.name, e, t)}), this.editables[e] = i, i.setAttributes({
                        contenteditable: "true",
                        "data-cke-widget-editable": e,
                        "data-cke-enter-mode": i.enterMode
                    }), i.filter && i.data("cke-filter", i.filter.id), i.addClass("cke_widget_editable"), i.removeClass("cke_widget_editable_focused"), t.pathName && i.data("cke-display-name", t.pathName), this.editor.focusManager.add(i), i.on("focus", S, this), CKEDITOR.env.ie && i.on("blur", N, this), i._.initialSetData = !0, i.setData(i.getHtml()), !0)
            }, _findOneNotNested: function (e) {
                e = this.wrapper.find(e);
                for (var n, i, o = 0; o < e.count(); o++)if (n = e.getItem(o), i = n.getAscendant(t.isDomWidgetWrapper), this.wrapper.equals(i))return n;
                return null
            }, isInited: function () {
                return !(!this.wrapper || !this.inited)
            }, isReady: function () {
                return this.isInited() && this.ready
            }, focus: function () {
                var e = this.editor.getSelection();
                if (e) {
                    var t = this.editor.checkDirty();
                    e.fake(this.wrapper), !t && this.editor.resetDirty()
                }
                this.editor.focus()
            }, removeClass: function (e) {
                this.element.removeClass(e), this.wrapper.removeClass(t.WRAPPER_CLASS_PREFIX + e)
            }, removeStyle: function (e) {
                K(this, e, 0)
            }, setData: function (e, t) {
                var n = this.data, i = 0;
                if ("string" == typeof e) n[e] !== t && (n[e] = t, i = 1); else {
                    var o = e;
                    for (e in o)n[e] !== o[e] && (i = 1, n[e] = o[e])
                }
                return i && this.dataReady && (q(this), this.fire("data", n)), this
            }, setFocused: function (e) {
                return this.wrapper[e ? "addClass" : "removeClass"]("cke_widget_focused"), this.fire(e ? "focus" : "blur"), this
            }, setSelected: function (e) {
                return this.wrapper[e ? "addClass" : "removeClass"]("cke_widget_selected"), this.fire(e ? "select" : "deselect"), this
            }, updateDragHandlerPosition: function () {
                var e = this.editor, t = this.element.$, n = this._.dragHandlerOffset,
                    t = {x: t.offsetLeft, y: t.offsetTop - 15};
                n && t.x == n.x && t.y == n.y || (n = e.checkDirty(), e.fire("lockSnapshot"), this.dragHandlerContainer.setStyles({
                    top: t.y + "px",
                    left: t.x + "px",
                    display: "block"
                }), e.fire("unlockSnapshot"), !n && e.resetDirty(), this._.dragHandlerOffset = t)
            }
        }, CKEDITOR.event.implementOn(t.prototype), t.getNestedEditable = function (e, n) {
            return !n || n.equals(e) ? null : t.isDomNestedEditable(n) ? n : t.getNestedEditable(e, n.getParent())
        }, t.isDomDragHandler = function (e) {
            return e.type == CKEDITOR.NODE_ELEMENT && e.hasAttribute("data-cke-widget-drag-handler")
        }, t.isDomDragHandlerContainer = function (e) {
            return e.type == CKEDITOR.NODE_ELEMENT && e.hasClass("cke_widget_drag_handler_container")
        }, t.isDomNestedEditable = function (e) {
            return e.type == CKEDITOR.NODE_ELEMENT && e.hasAttribute("data-cke-widget-editable")
        }, t.isDomWidgetElement = function (e) {
            return e.type == CKEDITOR.NODE_ELEMENT && e.hasAttribute("data-widget")
        }, t.isDomWidgetWrapper = function (e) {
            return e.type == CKEDITOR.NODE_ELEMENT && e.hasAttribute("data-cke-widget-wrapper")
        }, t.isDomWidget = function (e) {
            return !!e && (this.isDomWidgetWrapper(e) || this.isDomWidgetElement(e))
        }, t.isParserWidgetElement = function (e) {
            return e.type == CKEDITOR.NODE_ELEMENT && !!e.attributes["data-widget"]
        }, t.isParserWidgetWrapper = function (e) {
            return e.type == CKEDITOR.NODE_ELEMENT && !!e.attributes["data-cke-widget-wrapper"]
        }, t.WRAPPER_CLASS_PREFIX = "cke_widget_wrapper_", n.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.dom.element.prototype), {
            setData: function (e) {
                this._.initialSetData || this.editor.widgets.destroyAll(!1, this), this._.initialSetData = !1, e = this.editor.dataProcessor.toHtml(e, {
                    context: this.getName(),
                    filter: this.filter,
                    enterMode: this.enterMode
                }), this.setHtml(e), this.editor.widgets.initOnAll(this)
            }, getData: function () {
                return this.editor.dataProcessor.toDataFormat(this.getHtml(), {
                    context: this.getName(),
                    filter: this.filter,
                    enterMode: this.enterMode
                })
            }
        });
        var z = /^(?:<(?:div|span)(?: data-cke-temp="1")?(?: id="cke_copybin")?(?: data-cke-temp="1")?>)?(?:<(?:div|span)(?: style="[^"]+")?>)?<span [^>]*data-cke-copybin-start="1"[^>]*>.?<\/span>([\s\S]+)<span [^>]*data-cke-copybin-end="1"[^>]*>.?<\/span>(?:<\/(?:div|span)>)?(?:<\/(?:div|span)>)?$/i,
            W = {37: 1, 38: 1, 39: 1, 40: 1, 8: 1, 46: 1};
        CKEDITOR.plugins.widget = t, t.repository = e, t.nestedEditable = n
    }(),function () {
        function e(e, t, n) {
            this.editor = e, this.notification = null, this._message = new CKEDITOR.template(t), this._singularMessage = n ? new CKEDITOR.template(n) : null, this._tasks = [], this._doneTasks = this._doneWeights = this._totalWeights = 0
        }

        function t(e) {
            this._weight = e || 1, this._doneWeight = 0, this._isCanceled = !1
        }

        CKEDITOR.plugins.add("notificationaggregator", {requires: "notification"}), e.prototype = {
            createTask: function (e) {
                e = e || {};
                var t, n = !this.notification;
                return n && (this.notification = this._createNotification()), t = this._addTask(e), t.on("updated", this._onTaskUpdate, this), t.on("done", this._onTaskDone, this), t.on("canceled", function () {
                    this._removeTask(t)
                }, this), this.update(), n && this.notification.show(), t
            }, update: function () {
                this._updateNotification(), this.isFinished() && this.fire("finished")
            }, getPercentage: function () {
                return 0 === this.getTaskCount() ? 1 : this._doneWeights / this._totalWeights
            }, isFinished: function () {
                return this.getDoneTaskCount() === this.getTaskCount()
            }, getTaskCount: function () {
                return this._tasks.length
            }, getDoneTaskCount: function () {
                return this._doneTasks
            }, _updateNotification: function () {
                this.notification.update({message: this._getNotificationMessage(), progress: this.getPercentage()})
            }, _getNotificationMessage: function () {
                var e = this.getTaskCount(),
                    t = {current: this.getDoneTaskCount(), max: e, percentage: Math.round(100 * this.getPercentage())};
                return (1 == e && this._singularMessage ? this._singularMessage : this._message).output(t)
            }, _createNotification: function () {
                return new CKEDITOR.plugins.notification(this.editor, {type: "progress"})
            }, _addTask: function (e) {
                return e = new t(e.weight), this._tasks.push(e), this._totalWeights += e._weight, e
            }, _removeTask: function (e) {
                var t = CKEDITOR.tools.indexOf(this._tasks, e);
                -1 !== t && (e._doneWeight && (this._doneWeights -= e._doneWeight), this._totalWeights -= e._weight, this._tasks.splice(t, 1), this.update())
            }, _onTaskUpdate: function (e) {
                this._doneWeights += e.data, this.update()
            }, _onTaskDone: function () {
                this._doneTasks += 1, this.update()
            }
        }, CKEDITOR.event.implementOn(e.prototype), t.prototype = {
            done: function () {
                this.update(this._weight)
            }, update: function (e) {
                if (!this.isDone() && !this.isCanceled()) {
                    e = Math.min(this._weight, e);
                    var t = e - this._doneWeight;
                    this._doneWeight = e, this.fire("updated", t), this.isDone() && this.fire("done")
                }
            }, cancel: function () {
                this.isDone() || this.isCanceled() || (this._isCanceled = !0, this.fire("canceled"))
            }, isDone: function () {
                return this._weight === this._doneWeight
            }, isCanceled: function () {
                return this._isCanceled
            }
        }, CKEDITOR.event.implementOn(t.prototype), CKEDITOR.plugins.notificationAggregator = e, CKEDITOR.plugins.notificationAggregator.task = t
    }(),function () {
        CKEDITOR.plugins.add("uploadwidget", {
            requires: "widget,clipboard,filetools,notificationaggregator",
            init: function (e) {
                e.filter.allow("*[!data-widget,!data-cke-upload-id]")
            }
        }), CKEDITOR.fileTools || (CKEDITOR.fileTools = {}), CKEDITOR.tools.extend(CKEDITOR.fileTools, {
            addUploadWidget: function (e, t, n) {
                var i = CKEDITOR.fileTools, o = e.uploadRepository, a = n.supportedTypes ? 10 : 20;
                n.fileToElement && e.on("paste", function (n) {
                    n = n.data;
                    var a, r, s = e.widgets.registered[t], l = n.dataTransfer, c = l.getFilesCount(),
                        d = s.loadMethod || "loadAndUpload";
                    if (!n.dataValue && c)for (r = 0; r < c; r++)if (a = l.getFile(r), !s.supportedTypes || i.isTypeSupported(a, s.supportedTypes)) {
                        var u = s.fileToElement(a);
                        a = o.create(a, void 0, s.loaderType), u && (a[d](s.uploadUrl, s.additionalRequestParameters), CKEDITOR.fileTools.markElement(u, t, a.id), "loadAndUpload" != d && "upload" != d || s.skipNotifications || CKEDITOR.fileTools.bindNotifications(e, a), n.dataValue += u.getOuterHtml())
                    }
                }, null, null, a), CKEDITOR.tools.extend(n, {
                    downcast: function () {
                        return new CKEDITOR.htmlParser.text("")
                    }, init: function () {
                        var t, n, i = this, a = this.wrapper.findOne("[data-cke-upload-id]").data("cke-upload-id"),
                            r = o.loaders[a], s = CKEDITOR.tools.capitalize;
                        r.on("update", function (o) {
                            i.wrapper && i.wrapper.getParent() ? (e.fire("lockSnapshot"), o = "on" + s(r.status), "function" == typeof i[o] && !1 === i[o](r) || (n = "cke_upload_" + r.status, i.wrapper && n != t && (t && i.wrapper.removeClass(t), i.wrapper.addClass(n), t = n), "error" != r.status && "abort" != r.status || e.widgets.del(i)), e.fire("unlockSnapshot")) : (e.editable().find('[data-cke-upload-id="' + a + '"]').count() || r.abort(), o.removeListener())
                        }), r.update()
                    }, replaceWith: function (t, n) {
                        if ("" === t.trim()) e.widgets.del(this); else {
                            var i, o, a = this == e.widgets.focused, r = e.editable(), s = e.createRange();
                            a || (o = e.getSelection().createBookmarks()), s.setStartBefore(this.wrapper), s.setEndAfter(this.wrapper), a && (i = s.createBookmark()), r.insertHtmlIntoRange(t, s, n), e.widgets.checkWidgets({initOnlyNew: !0}), e.widgets.destroy(this, !0), a ? (s.moveToBookmark(i), s.select()) : e.getSelection().selectBookmarks(o)
                        }
                    }, _getLoader: function () {
                        var e = this.wrapper.findOne("[data-cke-upload-id]");
                        return e ? this.editor.uploadRepository.loaders[e.data("cke-upload-id")] : null
                    }
                }), e.widgets.add(t, n)
            }, markElement: function (e, t, n) {
                e.setAttributes({"data-cke-upload-id": n, "data-widget": t})
            }, bindNotifications: function (e, t) {
                function n() {
                    (i = e._.uploadWidgetNotificaionAggregator) && !i.isFinished() || (i = e._.uploadWidgetNotificaionAggregator = new CKEDITOR.plugins.notificationAggregator(e, e.lang.uploadwidget.uploadMany, e.lang.uploadwidget.uploadOne), i.once("finished", function () {
                        var t = i.getTaskCount();
                        0 === t ? i.notification.hide() : i.notification.update({
                            message: 1 == t ? e.lang.uploadwidget.doneOne : e.lang.uploadwidget.doneMany.replace("%1", t),
                            type: "success",
                            important: 1
                        })
                    }))
                }

                var i, o = null;
                t.on("update", function () {
                    !o && t.uploadTotal && (n(), o = i.createTask({weight: t.uploadTotal})), o && "uploading" == t.status && o.update(t.uploaded)
                }), t.on("uploaded", function () {
                    o && o.done()
                }), t.on("error", function () {
                    o && o.cancel(), e.showNotification(t.message, "warning")
                }), t.on("abort", function () {
                    o && o.cancel(), e.showNotification(e.lang.uploadwidget.abort, "info")
                })
            }
        })
    }(),function () {
        function e(e) {
            return 9 >= e && (e = "0" + e), String(e)
        }

        function t(t) {
            var i = new Date,
                i = [i.getFullYear(), i.getMonth() + 1, i.getDate(), i.getHours(), i.getMinutes(), i.getSeconds()];
            return n += 1, "image-" + CKEDITOR.tools.array.map(i, e).join("") + "-" + n + "." + t
        }

        var n = 0;
        CKEDITOR.plugins.add("uploadimage", {
            requires: "uploadwidget", onLoad: function () {
                CKEDITOR.addCss(".cke_upload_uploading img{opacity: 0.3}")
            }, init: function (e) {
                if (CKEDITOR.plugins.clipboard.isFileApiSupported) {
                    var n = CKEDITOR.fileTools, i = n.getUploadUrl(e.config, "image");
                    i && (n.addUploadWidget(e, "uploadimage", {
                        supportedTypes: /image\/(jpeg|png|gif|bmp)/, uploadUrl: i, fileToElement: function () {
                            var e = new CKEDITOR.dom.element("img");
                            return e.setAttribute("src", "data:image/gif;base64,R0lGODlhDgAOAIAAAAAAAP///yH5BAAAAAAALAAAAAAOAA4AAAIMhI+py+0Po5y02qsKADs="), e
                        }, parts: {img: "img"}, onUploading: function (e) {
                            this.parts.img.setAttribute("src", e.data)
                        }, onUploaded: function (e) {
                            var t = this.parts.img.$;
                            this.replaceWith('<img src="' + e.url + '" width="' + (e.responseData.width || t.naturalWidth) + '" height="' + (e.responseData.height || t.naturalHeight) + '">')
                        }
                    }), e.on("paste", function (o) {
                        if (o.data.dataValue.match(/<img[\s\S]+data:/i)) {
                            o = o.data;
                            var a, r, s, l = document.implementation.createHTMLDocument(""),
                                l = new CKEDITOR.dom.element(l.body);
                            for (l.data("cke-editable", 1), l.appendHtml(o.dataValue), a = l.find("img"), s = 0; s < a.count(); s++) {
                                r = a.getItem(s);
                                var c = r.getAttribute("src"), d = c && "data:" == c.substring(0, 5),
                                    u = null === r.data("cke-realelement");
                                d && u && !r.data("cke-upload-id") && !r.isReadOnly(1) && (d = (d = c.match(/image\/([a-z]+?);/i)) && d[1] || "jpg", c = e.uploadRepository.create(c, t(d)), c.upload(i), n.markElement(r, "uploadimage", c.id), n.bindNotifications(e, c))
                            }
                            o.dataValue = l.getHtml()
                        }
                    }))
                }
            }
        })
    }(),CKEDITOR.plugins.add("wsc", {
        requires: "dialog", parseApi: function (e) {
            e.config.wsc_onFinish = "function" == typeof e.config.wsc_onFinish ? e.config.wsc_onFinish : function () {
            }, e.config.wsc_onClose = "function" == typeof e.config.wsc_onClose ? e.config.wsc_onClose : function () {
            }
        }, parseConfig: function (e) {
            e.config.wsc_customerId = e.config.wsc_customerId || CKEDITOR.config.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk", e.config.wsc_customDictionaryIds = e.config.wsc_customDictionaryIds || CKEDITOR.config.wsc_customDictionaryIds || "", e.config.wsc_userDictionaryName = e.config.wsc_userDictionaryName || CKEDITOR.config.wsc_userDictionaryName || "", e.config.wsc_customLoaderScript = e.config.wsc_customLoaderScript || CKEDITOR.config.wsc_customLoaderScript, e.config.wsc_interfaceLang = e.config.wsc_interfaceLang, CKEDITOR.config.wsc_cmd = e.config.wsc_cmd || CKEDITOR.config.wsc_cmd || "spell", CKEDITOR.config.wsc_version = "v4.3.0-master-d769233", CKEDITOR.config.wsc_removeGlobalVariable = !0
        }, onLoad: function (e) {
            "moono-lisa" == (CKEDITOR.skinName || e.config.skin) && CKEDITOR.document.appendStyleSheet(this.path + "skins/" + CKEDITOR.skin.name + "/wsc.css")
        }, init: function (e) {
            var t = CKEDITOR.env;
            this.parseConfig(e), this.parseApi(e), e.addCommand("checkspell", new CKEDITOR.dialogCommand("checkspell")).modes = {wysiwyg: !(CKEDITOR.env.opera || CKEDITOR.env.air || document.domain != window.location.hostname || t.ie && (8 > t.version || t.quirks))}, void 0 === e.plugins.scayt && e.ui.addButton && e.ui.addButton("SpellChecker", {
                label: e.lang.wsc.toolbar,
                click: function (e) {
                    var t = e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? e.container.getText() : e.document.getBody().getText();
                    (t = t.replace(/\s/g, "")) ? e.execCommand("checkspell") : alert("Nothing to check!")
                },
                toolbar: "spellchecker,10"
            }), CKEDITOR.dialog.add("checkspell", this.path + (CKEDITOR.env.ie && 7 >= CKEDITOR.env.version ? "dialogs/wsc_ie.js" : window.postMessage ? "dialogs/wsc.js" : "dialogs/wsc_ie.js"))
        }
    }),function () {
        function e(e) {
            function n(e) {
                var t = !1;
                s.attachListener(s, "keydown", function () {
                    var n = o.getBody().getElementsByTag(e);
                    if (!t) {
                        for (var i = 0; i < n.count(); i++)n.getItem(i).setCustomData("retain", !0);
                        t = !0
                    }
                }, null, null, 1), s.attachListener(s, "keyup", function () {
                    var n = o.getElementsByTag(e);
                    t && (1 == n.count() && !n.getItem(0).getCustomData("retain") && CKEDITOR.tools.isEmpty(n.getItem(0).getAttributes()) && n.getItem(0).remove(1), t = !1)
                })
            }

            var i = this.editor, o = e.document, a = o.body, r = o.getElementById("cke_actscrpt");
            r && r.parentNode.removeChild(r), (r = o.getElementById("cke_shimscrpt")) && r.parentNode.removeChild(r), (r = o.getElementById("cke_basetagscrpt")) && r.parentNode.removeChild(r), a.contentEditable = !0, CKEDITOR.env.ie && (a.hideFocus = !0, a.disabled = !0, a.removeAttribute("disabled")), delete this._.isLoadingData, this.$ = a, o = new CKEDITOR.dom.document(o), this.setup(), this.fixInitialSelection();
            var s = this;
            CKEDITOR.env.ie && !CKEDITOR.env.edge && o.getDocumentElement().addClass(o.$.compatMode), CKEDITOR.env.ie && !CKEDITOR.env.edge && i.enterMode != CKEDITOR.ENTER_P ? n("p") : CKEDITOR.env.edge && 15 > CKEDITOR.env.version && i.enterMode != CKEDITOR.ENTER_DIV && n("div"), (CKEDITOR.env.webkit || CKEDITOR.env.ie && 10 < CKEDITOR.env.version) && o.getDocumentElement().on("mousedown", function (e) {
                e.data.getTarget().is("html") && setTimeout(function () {
                    i.editable().focus()
                })
            }), t(i);
            try {
                i.document.$.execCommand("2D-position", !1, !0)
            } catch (e) {
            }
            (CKEDITOR.env.gecko || CKEDITOR.env.ie && "CSS1Compat" == i.document.$.compatMode) && this.attachListener(this, "keydown", function (e) {
                var t = e.data.getKeystroke();
                if (33 == t || 34 == t)if (CKEDITOR.env.ie) setTimeout(function () {
                    i.getSelection().scrollIntoView()
                }, 0); else if (i.window.$.innerHeight > this.$.offsetHeight) {
                    var n = i.createRange();
                    n[33 == t ? "moveToElementEditStart" : "moveToElementEditEnd"](this), n.select(), e.data.preventDefault()
                }
            }), CKEDITOR.env.ie && this.attachListener(o, "blur", function () {
                try {
                    o.$.selection.empty()
                } catch (e) {
                }
            }), CKEDITOR.env.iOS && this.attachListener(o, "touchend", function () {
                e.focus()
            }), a = i.document.getElementsByTag("title").getItem(0), a.data("cke-title", a.getText()), CKEDITOR.env.ie && (i.document.$.title = this._.docTitle), CKEDITOR.tools.setTimeout(function () {
                "unloaded" == this.status && (this.status = "ready"), i.fire("contentDom"), this._.isPendingFocus && (i.focus(), this._.isPendingFocus = !1), setTimeout(function () {
                    i.fire("dataReady")
                }, 0)
            }, 0, this)
        }

        function t(e) {
            function t(e) {
                e.returnValue = !1
            }

            if (CKEDITOR.env.gecko)try {
                var n = e.document.$;
                n.execCommand("enableObjectResizing", !1, !e.config.disableObjectResizing), n.execCommand("enableInlineTableEditing", !1, !e.config.disableNativeTableHandles)
            } catch (e) {
            } else CKEDITOR.env.ie && 11 > CKEDITOR.env.version && e.config.disableObjectResizing && function () {
                var n;
                e.editable().attachListener(e, "selectionChange", function () {
                    var i = e.getSelection().getSelectedElement();
                    i && (n && (n.detachEvent("onresizestart", t), n = null), i.$.attachEvent("onresizestart", t), n = i.$)
                })
            }()
        }

        function n() {
            var e = [];
            if (8 <= CKEDITOR.document.$.documentMode) {
                e.push("html.CSS1Compat [contenteditable=false]{min-height:0 !important}");
                var t, n = [];
                for (t in CKEDITOR.dtd.$removeEmpty)n.push("html.CSS1Compat " + t + "[contenteditable=false]");
                e.push(n.join(",") + "{display:inline-block}")
            } else CKEDITOR.env.gecko && (e.push("html{height:100% !important}"), e.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));
            return e.push("html{cursor:text;*cursor:auto}"), e.push("img,input,textarea{cursor:default}"), e.join("\n")
        }

        var i;
        CKEDITOR.plugins.add("wysiwygarea", {
            init: function (e) {
                e.config.fullPage && e.addFeature({
                    allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]",
                    requiredContent: "body"
                }), e.addMode("wysiwyg", function (t) {
                    function n(n) {
                        n && n.removeListener(), e.editable(new i(e, a.$.contentWindow.document.body)), e.setData(e.getData(1), t)
                    }

                    var o = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();",
                        o = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent(o) + "}())" : "",
                        a = CKEDITOR.dom.element.createFromHtml('<iframe src="' + o + '" frameBorder="0"></iframe>');
                    a.setStyles({
                        width: "100%",
                        height: "100%"
                    }), a.addClass("cke_wysiwyg_frame").addClass("cke_reset"), o = e.ui.space("contents"), o.append(a);
                    var r = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.gecko;
                    r && a.on("load", n);
                    var s = e.title, l = e.fire("ariaEditorHelpLabel", {}).label;
                    if (s && (CKEDITOR.env.ie && l && (s += ", " + l), a.setAttribute("title", s)), l) {
                        var s = CKEDITOR.tools.getNextId(),
                            c = CKEDITOR.dom.element.createFromHtml('<span id="' + s + '" class="cke_voice_label">' + l + "</span>");
                        o.append(c, 1), a.setAttribute("aria-describedby", s)
                    }
                    e.on("beforeModeUnload", function (e) {
                        e.removeListener(), c && c.remove()
                    }), a.setAttributes({
                        tabIndex: e.tabIndex,
                        allowTransparency: "true"
                    }), !r && n(), e.fire("ariaWidget", a)
                })
            }
        }), CKEDITOR.editor.prototype.addContentsCss = function (e) {
            var t = this.config, n = t.contentsCss;
            CKEDITOR.tools.isArray(n) || (t.contentsCss = n ? [n] : []), t.contentsCss.push(e)
        }, i = CKEDITOR.tools.createClass({
            $: function () {
                this.base.apply(this, arguments), this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function (t) {
                    CKEDITOR.tools.setTimeout(e, 0, this, t)
                }, this), this._.docTitle = this.getWindow().getFrame().getAttribute("title")
            }, base: CKEDITOR.editable, proto: {
                setData: function (e, t) {
                    var i = this.editor;
                    if (t) this.setHtml(e), this.fixInitialSelection(), i.fire("dataReady"); else {
                        this._.isLoadingData = !0, i._.dataStore = {id: 1};
                        var o = i.config, a = o.fullPage, r = o.docType,
                            s = CKEDITOR.tools.buildStyleHtml(n()).replace(/<style>/, '<style data-cke-temp="1">');
                        a || (s += CKEDITOR.tools.buildStyleHtml(i.config.contentsCss));
                        var l = o.baseHref ? '<base href="' + o.baseHref + '" data-cke-temp="1" />' : "";
                        a && (e = e.replace(/<!DOCTYPE[^>]*>/i, function (e) {
                            return i.docType = r = e, ""
                        }).replace(/<\?xml\s[^\?]*\?>/i, function (e) {
                            return i.xmlDeclaration = e, ""
                        })), e = i.dataProcessor.toHtml(e), a ? (/<body[\s|>]/.test(e) || (e = "<body>" + e), /<html[\s|>]/.test(e) || (e = "<html>" + e + "</html>"), /<head[\s|>]/.test(e) ? /<title[\s|>]/.test(e) || (e = e.replace(/<head[^>]*>/, "$&<title></title>")) : e = e.replace(/<html[^>]*>/, "$&<head><title></title></head>"), l && (e = e.replace(/<head[^>]*?>/, "$&" + l)), e = e.replace(/<\/head\s*>/, s + "$&"), e = r + e) : e = o.docType + '<html dir="' + o.contentsLangDirection + '" lang="' + (o.contentsLanguage || i.langCode) + '"><head><title>' + this._.docTitle + "</title>" + l + s + "</head><body" + (o.bodyId ? ' id="' + o.bodyId + '"' : "") + (o.bodyClass ? ' class="' + o.bodyClass + '"' : "") + ">" + e + "</body></html>", CKEDITOR.env.gecko && (e = e.replace(/<body/, '<body contenteditable="true" '), 2e4 > CKEDITOR.env.version && (e = e.replace(/<body[^>]*>/, "$&\x3c!-- cke-content-start --\x3e"))), o = '<script id="cke_actscrpt" type="text/javascript"' + (CKEDITOR.env.ie ? ' defer="defer" ' : "") + ">var wasLoaded=0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded=1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "<\/script>", CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (o += '<script id="cke_shimscrpt">window.parent.CKEDITOR.tools.enableHtml5Elements(document)<\/script>'), l && CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (o += '<script id="cke_basetagscrpt">var baseTag = document.querySelector( "base" );baseTag.href = baseTag.href;<\/script>'), e = e.replace(/(?=\s*<\/(:?head)>)/, o), this.clearCustomData(), this.clearListeners(), i.fire("contentDomUnload");
                        var c = this.getDocument();
                        try {
                            c.write(e)
                        } catch (t) {
                            setTimeout(function () {
                                c.write(e)
                            }, 0)
                        }
                    }
                }, getData: function (e) {
                    if (e)return this.getHtml();
                    e = this.editor;
                    var t = e.config, n = t.fullPage, i = n && e.docType, o = n && e.xmlDeclaration,
                        a = this.getDocument(), n = n ? a.getDocumentElement().getOuterHtml() : a.getBody().getHtml();
                    return CKEDITOR.env.gecko && t.enterMode != CKEDITOR.ENTER_BR && (n = n.replace(/<br>(?=\s*(:?$|<\/body>))/, "")), n = e.dataProcessor.toDataFormat(n), o && (n = o + "\n" + n), i && (n = i + "\n" + n), n
                }, focus: function () {
                    this._.isLoadingData ? this._.isPendingFocus = !0 : i.baseProto.focus.call(this)
                }, detach: function () {
                    var e, t = this.editor, n = t.document;
                    try {
                        e = t.window.getFrame()
                    } catch (e) {
                    }
                    i.baseProto.detach.call(this), this.clearCustomData(), n.getDocumentElement().clearCustomData(), CKEDITOR.tools.removeFunction(this._.frameLoadedHandler), e && e.getParent() ? (e.clearCustomData(), (t = e.removeCustomData("onResize")) && t.removeListener(), e.remove()) : CKEDITOR.warn("editor-destroy-iframe")
                }
            }
        })
    }(),CKEDITOR.config.disableObjectResizing = !1,CKEDITOR.config.disableNativeTableHandles = !0,CKEDITOR.config.disableNativeSpellChecker = !0,CKEDITOR.config.plugins = "dialogui,dialog,a11yhelp,about,basicstyles,blockquote,notification,button,toolbar,clipboard,panel,floatpanel,menu,contextmenu,elementspath,indent,indentlist,list,enterkey,entities,popup,filetools,filebrowser,floatingspace,listblock,richcombo,format,horizontalrule,htmlwriter,image,fakeobjects,link,magicline,maximize,pastefromword,pastetext,removeformat,resize,menubutton,scayt,showborders,sourcearea,specialchar,stylescombo,tab,table,tabletools,tableselection,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wsc,wysiwygarea",CKEDITOR.config.skin = "moono-lisa",function () {
        var e = function (e, t) {
            var n = CKEDITOR.getUrl("plugins/" + t);
            e = e.split(",");
            for (var i = 0; i < e.length; i++)CKEDITOR.skin.icons[e[i]] = {path: n, offset: -e[++i], bgsize: e[++i]}
        };
        CKEDITOR.env.hidpi ? e("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,codesnippet,384,,bgcolor,408,,textcolor,432,,copyformatting,456,,creatediv,480,,docprops-rtl,504,,docprops,528,,easyimagealigncenter,552,,easyimagealignleft,576,,easyimagealignright,600,,easyimagealt,624,,easyimagefull,648,,easyimageside,672,,easyimageupload,696,,embed,720,,embedsemantic,744,,find-rtl,768,,find,792,,replace,816,,flash,840,,button,864,,checkbox,888,,form,912,,hiddenfield,936,,imagebutton,960,,radio,984,,select-rtl,1008,,select,1032,,textarea-rtl,1056,,textarea,1080,,textfield-rtl,1104,,textfield,1128,,horizontalrule,1152,,iframe,1176,,image,1200,,indent-rtl,1224,,indent,1248,,outdent-rtl,1272,,outdent,1296,,justifyblock,1320,,justifycenter,1344,,justifyleft,1368,,justifyright,1392,,language,1416,,anchor-rtl,1440,,anchor,1464,,link,1488,,unlink,1512,,bulletedlist-rtl,1536,,bulletedlist,1560,,numberedlist-rtl,1584,,numberedlist,1608,,mathjax,1632,,maximize,1656,,newpage-rtl,1680,,newpage,1704,,pagebreak-rtl,1728,,pagebreak,1752,,pastefromword-rtl,1776,,pastefromword,1800,,pastetext-rtl,1824,,pastetext,1848,,placeholder,1872,,preview-rtl,1896,,preview,1920,,print,1944,,removeformat,1968,,save,1992,,scayt,2016,,selectall,2040,,showblocks-rtl,2064,,showblocks,2088,,smiley,2112,,source-rtl,2136,,source,2160,,sourcedialog-rtl,2184,,sourcedialog,2208,,specialchar,2232,,table,2256,,templates-rtl,2280,,templates,2304,,uicolor,2328,,redo-rtl,2352,,redo,2376,,undo-rtl,2400,,undo,2424,,simplebox,4896,auto,spellchecker,2472,", "icons_hidpi.png") : e("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,codesnippet,384,auto,bgcolor,408,auto,textcolor,432,auto,copyformatting,456,auto,creatediv,480,auto,docprops-rtl,504,auto,docprops,528,auto,easyimagealigncenter,552,auto,easyimagealignleft,576,auto,easyimagealignright,600,auto,easyimagealt,624,auto,easyimagefull,648,auto,easyimageside,672,auto,easyimageupload,696,auto,embed,720,auto,embedsemantic,744,auto,find-rtl,768,auto,find,792,auto,replace,816,auto,flash,840,auto,button,864,auto,checkbox,888,auto,form,912,auto,hiddenfield,936,auto,imagebutton,960,auto,radio,984,auto,select-rtl,1008,auto,select,1032,auto,textarea-rtl,1056,auto,textarea,1080,auto,textfield-rtl,1104,auto,textfield,1128,auto,horizontalrule,1152,auto,iframe,1176,auto,image,1200,auto,indent-rtl,1224,auto,indent,1248,auto,outdent-rtl,1272,auto,outdent,1296,auto,justifyblock,1320,auto,justifycenter,1344,auto,justifyleft,1368,auto,justifyright,1392,auto,language,1416,auto,anchor-rtl,1440,auto,anchor,1464,auto,link,1488,auto,unlink,1512,auto,bulletedlist-rtl,1536,auto,bulletedlist,1560,auto,numberedlist-rtl,1584,auto,numberedlist,1608,auto,mathjax,1632,auto,maximize,1656,auto,newpage-rtl,1680,auto,newpage,1704,auto,pagebreak-rtl,1728,auto,pagebreak,1752,auto,pastefromword-rtl,1776,auto,pastefromword,1800,auto,pastetext-rtl,1824,auto,pastetext,1848,auto,placeholder,1872,auto,preview-rtl,1896,auto,preview,1920,auto,print,1944,auto,removeformat,1968,auto,save,1992,auto,scayt,2016,auto,selectall,2040,auto,showblocks-rtl,2064,auto,showblocks,2088,auto,smiley,2112,auto,source-rtl,2136,auto,source,2160,auto,sourcedialog-rtl,2184,auto,sourcedialog,2208,auto,specialchar,2232,auto,table,2256,auto,templates-rtl,2280,auto,templates,2304,auto,uicolor,2328,auto,redo-rtl,2352,auto,redo,2376,auto,undo-rtl,2400,auto,undo,2424,auto,simplebox,2448,auto,spellchecker,2472,auto", "icons.png")
    }())
}();