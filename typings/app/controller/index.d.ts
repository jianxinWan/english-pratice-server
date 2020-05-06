// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportExercise = require('../../../app/controller/exercise');
import ExportHome = require('../../../app/controller/home');
import ExportSpider = require('../../../app/controller/spider');
import ExportStem = require('../../../app/controller/stem');
import ExportSubmit = require('../../../app/controller/submit');
import ExportTranslation = require('../../../app/controller/translation');
import ExportUserInfo = require('../../../app/controller/user_info');

declare module 'egg' {
  interface IController {
    exercise: ExportExercise;
    home: ExportHome;
    spider: ExportSpider;
    stem: ExportStem;
    submit: ExportSubmit;
    translation: ExportTranslation;
    userInfo: ExportUserInfo;
  }
}
