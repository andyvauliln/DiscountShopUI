// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/56295f5058cac7ae458540423c50ac2dcf9fc711/gulp-useref/gulp-useref.d.ts
declare module 'gulp-useref' {
    interface Options {
        searchPath?: string | string[];
        base?: string;
        noAssets?: boolean;
        noconcat?: boolean;
        additionalStreams?: Array<NodeJS.ReadWriteStream>;
        transformPath?: (filePath: string) => void;
    }

    interface Useref {
        (options?: Options, ...transformStreams: NodeJS.ReadWriteStream[]): NodeJS.ReadWriteStream;
    }

    var useref: Useref;
    export = useref;
}
