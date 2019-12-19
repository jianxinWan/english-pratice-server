/* eslint-disable eol-last */
/* eslint-disable array-bracket-spacing */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '139.199.104.60',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '520956wjx',
      // 数据库名
      database: 'english-practice',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.cors = {
    origin: ['http://0.0.0.0:10086'],
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1576382884100_1837';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.confusedConfigurations = {
    bodyparser: 'bodyParser',
  };

  return {
    ...config,
    ...userConfig,
  };
};