'use strict';

const DefaultTemplateHandler = require('./default_th');

class RouterTemplateHandler extends DefaultTemplateHandler {
  _ignore () {
    return this.props.router !== 'default';
  }
}

module.exports = RouterTemplateHandler;
