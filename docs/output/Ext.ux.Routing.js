Ext.data.JsonP.Ext_ux_Routing({"tagname":"class","name":"Ext.ux.Routing","extends":"Ext.Base","mixins":[],"alternateClassNames":[],"aliases":{},"singleton":true,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{"author":[": Bostjan Rihter <bostjan.rihter@gmail.com>"]},"private":null,"id":"class-Ext.ux.Routing","code_type":"ext_define","members":{"cfg":[],"property":[{"name":"routes","tagname":"property","owner":"Ext.ux.Routing","meta":{"private":true},"id":"property-routes"}],"method":[{"name":"back","tagname":"method","owner":"Ext.ux.Routing","meta":{},"id":"method-back"},{"name":"init","tagname":"method","owner":"Ext.ux.Routing","meta":{},"id":"method-init"},{"name":"navigate","tagname":"method","owner":"Ext.ux.Routing","meta":{},"id":"method-navigate"},{"name":"onRouteChange","tagname":"method","owner":"Ext.ux.Routing","meta":{"private":true},"id":"method-onRouteChange"},{"name":"tokenizeRoute","tagname":"method","owner":"Ext.ux.Routing","meta":{"private":true},"id":"method-tokenizeRoute"},{"name":"tokenizeRoutes","tagname":"method","owner":"Ext.ux.Routing","meta":{"private":true},"id":"method-tokenizeRoutes"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":1,"files":[{"filename":"Ext.ux.Routing.js","href":"Ext.ux.Routing.html#Ext-ux-Routing"}],"html_meta":{"author":null},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":["Ext.Base"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>Ext.ux.Routing</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/Ext.ux.Routing.html#Ext-ux-Routing' target='_blank'>Ext.ux.Routing.js</a></div></pre><div class='doc-contents'><p>ExtJS 4.x URL routing support. Example usage:</p>\n\n<pre><code> // app init\n Ext.application({\n name: '...',\n   autoCreateViewport: true,\n   models: ['...'],\n   stores: ['...'],\n   controllers: ['...'],\n   launch: function () {\n     // init routing\n     <a href=\"#!/api/Ext.ux.Routing-method-init\" rel=\"Ext.ux.Routing-method-init\" class=\"docClass\">Ext.ux.Routing.init</a>({\n       // the default route, if none given\n       defaultRoute: '/#!/index',\n       routes: [\n       {\n         pattern: '!/index',\n         handler: function () {\n           // calling a controller from the function handler\n           this.getController('Index').index();\n         }\n       },\n       {\n         pattern: '!/clients',\n         handler: function () {\n           // calling a \"non-controller\" function in the handler\n           alert('clients');\n         }\n       }, {\n         pattern: '!/clients/{id}',\n         handler: function () {\n           // getting tokens from the arguments in the handler function\n           var args = arguments[0];\n           this.getController('Client').read(args.id);\n         }\n       }\n       ],\n       scope: this\n     });\n   }\n });\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-routes' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.Routing'>Ext.ux.Routing</span><br/><a href='source/Ext.ux.Routing.html#Ext-ux-Routing-property-routes' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.Routing-property-routes' class='name not-expandable'>routes</a><span> : Object</span><strong class='private signature' >private</strong></div><div class='description'><div class='short'><h1>region properties</h1>\n\n<p>private</p>\n</div><div class='long'><h1>region properties</h1>\n\n<p>private</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-back' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.Routing'>Ext.ux.Routing</span><br/><a href='source/Ext.ux.Routing.html#Ext-ux-Routing-method-back' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.Routing-method-back' class='name expandable'>back</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Navigates one url back. ...</div><div class='long'><p>Navigates one url back.</p>\n</div></div></div><div id='method-init' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.Routing'>Ext.ux.Routing</span><br/><a href='source/Ext.ux.Routing.html#Ext-ux-Routing-method-init' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.Routing-method-init' class='name expandable'>init</a>( <span class='pre'>cfg</span> )</div><div class='description'><div class='short'>Initializes the routing. ...</div><div class='long'><p>Initializes the routing.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>cfg</span> : Object<div class='sub-desc'><p>The routing configuration object.</p>\n<ul><li><span class='pre'>defaultRoute</span> : String<div class='sub-desc'><p>The default route to navigate to if there is none given (default controller and action); i.e.: \"/#!/index/\".</p>\n</div></li><li><span class='pre'>routes</span> : Array<div class='sub-desc'><p>The array of route objects. Every route object consists of the following 2 parameters:</p>\n<ul><li><span class='pre'>pattern</span> : String<div class='sub-desc'><p>The route pattern. The dynamic parts of the route (tokens) are written as \"{tokenName}\"; i.e.: \"/#!/article/{articleId}/{articleTitle}\".</p>\n</div></li><li><span class='pre'>handler</span> : Function<div class='sub-desc'><p>The routes corresponding function handler.</p>\n</div></li></ul></div></li></ul></div></li></ul></div></div></div><div id='method-navigate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.Routing'>Ext.ux.Routing</span><br/><a href='source/Ext.ux.Routing.html#Ext-ux-Routing-method-navigate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.Routing-method-navigate' class='name expandable'>navigate</a>( <span class='pre'>url</span> )</div><div class='description'><div class='short'>Navigates to a specific url. ...</div><div class='long'><p>Navigates to a specific url.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>url</span> : String<div class='sub-desc'><p>The absolute url, starting with a forward slash; i.e.: \"/#!/article/123/lorem-ipsum\".</p>\n</div></li></ul></div></div></div><div id='method-onRouteChange' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.Routing'>Ext.ux.Routing</span><br/><a href='source/Ext.ux.Routing.html#Ext-ux-Routing-method-onRouteChange' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.Routing-method-onRouteChange' class='name expandable'>onRouteChange</a>( <span class='pre'>route</span> )<strong class='private signature' >private</strong></div><div class='description'><div class='short'>endregion\n\nregion event handlers\n\nprivate ...</div><div class='long'><h1>endregion</h1>\n\n<h1>region event handlers</h1>\n\n<p>private</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>route</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-tokenizeRoute' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.Routing'>Ext.ux.Routing</span><br/><a href='source/Ext.ux.Routing.html#Ext-ux-Routing-method-tokenizeRoute' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.Routing-method-tokenizeRoute' class='name expandable'>tokenizeRoute</a>( <span class='pre'>route</span> )<strong class='private signature' >private</strong></div><div class='description'><div class='short'>private ...</div><div class='long'><p>private</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>route</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-tokenizeRoutes' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.ux.Routing'>Ext.ux.Routing</span><br/><a href='source/Ext.ux.Routing.html#Ext-ux-Routing-method-tokenizeRoutes' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.ux.Routing-method-tokenizeRoutes' class='name expandable'>tokenizeRoutes</a>( <span class='pre'>routes</span> )<strong class='private signature' >private</strong></div><div class='description'><div class='short'>private ...</div><div class='long'><p>private</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>routes</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>"});