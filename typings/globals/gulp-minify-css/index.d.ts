// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/56295f5058cac7ae458540423c50ac2dcf9fc711/gulp-minify-css/gulp-minify-css.d.ts
declare module "gulp-minify-css" {
    import * as CleanCSS from 'clean-css';

    function minifyCSS(options?: CleanCSS.Options): NodeJS.ReadWriteStream;

    namespace minifyCSS {}

    export = minifyCSS;
}
