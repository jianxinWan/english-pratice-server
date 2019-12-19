// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportSpider = require('../../../app/controller/spider');
import ExportStem = require('../../../app/controller/stem');
import ExportSubmit = require('../../../app/controller/submit');
import ExportUserInfo = require('../../../app/controller/user_info');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    spider: ExportSpider;
    stem: ExportStem;
    submit: ExportSubmit;
    userInfo: ExportUserInfo;
  }
}
