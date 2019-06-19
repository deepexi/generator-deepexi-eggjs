'use strict';

const DefaultTemplateHandler = require('./default_th');

class RouterPlusTemplateHandler extends DefaultTemplateHandler {
  _ignore () {
    return this.props.router !== 'router-plus';
  }
}

module.exports = RouterPlusTemplateHandler;
