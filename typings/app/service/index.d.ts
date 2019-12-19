// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome = require('../../../app/service/home');
import ExportSpider = require('../../../app/service/spider');
import ExportStem = require('../../../app/service/stem');
import ExportSubmit = require('../../../app/service/submit');
import ExportUserInfo = require('../../../app/service/user_info');

declare module 'egg' {
  interface IService {
    home: ExportHome;
    spider: ExportSpider;
    stem: ExportStem;
    submit: ExportSubmit;
    userInfo: ExportUserInfo;
  }
}
