export type TextDescription = {
    readonly [key: string]: string | TextDescription;
};

export type LocaleDescription = {
    readonly modules: {
        readonly [module: string]: TextDescription;
    };
    readonly pages: {
        readonly [page: string]: TextDescription;
    }
};
