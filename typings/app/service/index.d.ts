// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportExercise = require('../../../app/service/exercise');
import ExportHome = require('../../../app/service/home');
import ExportSpider = require('../../../app/service/spider');
import ExportStem = require('../../../app/service/stem');
import ExportSubmit = require('../../../app/service/submit');
import ExportUserInfo = require('../../../app/service/user_info');

declare module 'egg' {
  interface IService {
    exercise: AutoInstanceType<typeof ExportExercise>;
    home: AutoInstanceType<typeof ExportHome>;
    spider: AutoInstanceType<typeof ExportSpider>;
    stem: AutoInstanceType<typeof ExportStem>;
    submit: AutoInstanceType<typeof ExportSubmit>;
    userInfo: AutoInstanceType<typeof ExportUserInfo>;
  }
}
