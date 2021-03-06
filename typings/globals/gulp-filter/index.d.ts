// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/56295f5058cac7ae458540423c50ac2dcf9fc711/gulp-filter/gulp-filter.d.ts
declare module 'gulp-filter' {
  import File = require('vinyl');
  import * as Minimatch from 'minimatch';

  namespace filter {
    interface FileFunction {
      (file: File): boolean;
    }

    interface Options extends Minimatch.IOptions {
      restore?: boolean;
      passthrough?: boolean;
    }

    // A transform stream with a .restore object
    interface Filter extends NodeJS.ReadWriteStream {
      restore: NodeJS.ReadWriteStream
    }
  }

  function filter(pattern: string | string[] | filter.FileFunction, options?: filter.Options): filter.Filter;

  export = filter;
}
