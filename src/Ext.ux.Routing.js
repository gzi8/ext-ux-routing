/**
* @class Ext.ux.Routing
* ExtJS 4.x URL routing support. Example usage:
*
*      // app init
*      Ext.application({
*      name: '...',
*        autoCreateViewport: true,
*        models: ['...'],
*        stores: ['...'],
*        controllers: ['...'],
*        launch: function () {
*          // init routing
*          Ext.ux.Routing.init({
*            // the default route, if none given
*            defaultRoute: '/#!/index',
*            routes: [
*            {
*              pattern: '!/index',
*              handler: function () {
*                // calling a controller from the function handler
*                this.getController('Index').index();
*              }
*            },
*            {
*              pattern: '!/clients',
*              handler: function () {
*                // calling a "non-controller" function in the handler
*                alert('clients');
*              }
*            }, {
*              pattern: '!/clients/{id}',
*              handler: function () {
*                // getting tokens from the arguments in the handler function
*                var args = arguments[0];
*                this.getController('Client').read(args.id);
*              }
*            }
*            ],
*            scope: this
*          });
*        }
*      });
*
* @author: Bostjan Rihter <bostjan.rihter@gmail.com>
* @singleton
*/
Ext.define('Ext.ux.Routing', {
  // #region properties
  // private
  routes: null,
  singleton: true,
  // #endregion
  // #region methods
  /**
  * Initializes the routing.
  * @param {Object} cfg The routing configuration object.
  * @param {String} cfg.defaultRoute The default route to navigate to if there is none given (default controller and action); i.e.: "/#!/index/".
  * @param {Array} cfg.routes The array of route objects. Every route object consists of the following 2 parameters:
  * @param {String} cfg.routes.pattern The route pattern. The dynamic parts of the route (tokens) are written as "{tokenName}"; i.e.: "/#!/article/{articleId}/{articleTitle}".
  * @param {Function} cfg.routes.handler The routes corresponding function handler.
  * @method
  */
  init: function (cfg) {
    var history = Ext.util.History;
    // validate
    if (!Ext.isDefined(cfg)) {
      cfg = {};
    }
    if (!Ext.isDefined(cfg.routes)) {
      cfg.routes = [];
    }
    var routes = this.tokenizeRoutes(cfg.routes);
    cfg.routes = routes;
    Ext.apply(this, cfg);
    history.on('change', this.onRouteChange, this);
    history.init();
    // if no token, use the default route
    if (!history.getToken()) {
      this.navigate(cfg.defaultRoute);
    } else {
      this.onRouteChange(history.getToken());
    }
  },
  // private
  tokenizeRoutes: function (routes) {
    var i,
    routeTokens = null,
    sortedRoutes = new Ext.util.MixedCollection();
    // tokenize
    for (i = 0; i < routes.length; ++i) {
      routeTokens = this.tokenizeRoute(routes[i].pattern);
      sortedRoutes.add(routes[i].pattern, {
        pattern: routes[i].pattern,
        tokens: routeTokens,
        handler: routes[i].handler
      });
    }
    // sort, so hardcoded routes get priority over dynamic ones
    // i.e.: "/clients/new" will have higher priority than "/clients/{id}"
    sortedRoutes.sortByKey();
    return sortedRoutes;
  },
  // private
  tokenizeRoute: function (route) {
    var i,
    tokens = route.split('/'),
      re = /\{(.*?)\}/,
      dynamic,
      tokenizedRoute = [];
    // skip first -> usually /#/ or /!#/
    for (i = 1; i < tokens.length; ++i) {
      // skip empty
      if (tokens[i] === '') continue;
      // is token static || dynamic
      dynamic = re.test(tokens[i]);
      // add to parsed tokens
      tokenizedRoute.push({
        token: tokens[i],
        dynamic: dynamic
      });
    }
    return tokenizedRoute;
  },
  /**
  * Navigates to a specific url.
  * @param {String} url The absolute url, starting with a forward slash; i.e.: "/#!/article/123/lorem-ipsum".
  * @method
  */
  navigate: function (url) {
    window.location.href = url;
  },
  /**
  * Navigates one url back.
  * @method
  */
  back: function () {
    history.go(-1);
  },
  // #endregion
  // #region event handlers
  // private
  onRouteChange: function (route) {
    if (!route) return;
    var tokens,
    routeTokens,
    i,
    match;
    // get the tokenized route
    routeTokens = this.tokenizeRoute(route);
    // check if we have a match
    for (i = 0; i < this.routes.length; ++i) {
      tokens = this.routes.getAt(i).tokens;
      if (routeTokens.length != tokens.length) continue;
      // check every token part if its a route match
      // if the token is dynamic, then treat it as a match
      match = true;
      for (j = 0; j < tokens.length; ++j) {
        if (tokens[j].dynamic) continue;
        if (tokens[j].token != routeTokens[j].token) {
          match = false;
          break;
        }
      }
      if (match) break;
    }
    // no match
    if (!match) return;
    // pass all the dynamic tokens as parameters
    var params = {},
    //tokens = this.routes[i].tokens,
    tokens = this.routes.getAt(i).tokens,
      key;
    for (j = 0; j < tokens.length; ++j) {
      if (tokens[j].dynamic) {
        key = tokens[j].token;
        key = key.substring(1, key.length - 1);
        val = routeTokens[j].token;
        params[key] = val;
      }
    }
    // finally, route
    this.routes.getAt(i).handler.call(this.scope, params);
  }
  // #endregion
});