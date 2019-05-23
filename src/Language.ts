import {LocaleDescription} from "./LanguageDefinitions";

export type LanguageParams<L extends string> = {
    readonly localeDescriptions: {[lan in L]: LocaleDescription};
    readonly defaultLan: L;
};

export class Language<L extends string> {

    private readonly localeDescriptions: {[lan: string]: LocaleDescription};
    private readonly defaultLan: L;

    public constructor(params: LanguageParams<L>) {
        this.localeDescriptions = Object.freeze({...(params.localeDescriptions as any)});
        this.defaultLan = params.defaultLan;
    }

    public isSupportLanguage(lan: string): lan is L {
        return !!this.localeDescriptions[lan];
    }

    public browserLanguage(): L {
        if (navigator.languages) {
            for (const lan of navigator.languages) {
                if (this.isSupportLanguage(lan)) {
                    return lan;
                }
            }
        }
        return this.defaultLan;
    }

    public getMessages(lan: L, pageName?: string): {[key: string]: string} {
        const {modules, pages} = this.localeDescriptions[lan];
        const result: any = {};

        if (modules) {
            this.flattenAndFill("", result, modules);
        }
        if (pageName && pages[pageName]) {
            this.flattenAndFill("", result, pages[pageName]);
        }
        return Object.freeze(result);
    }

    private flattenAndFill(prefix: string, container: any, target: any): void {
        for (const key in target) {
            const value = target[key];
            const wholeKey = prefix === "" ? key : `${prefix}.${key}`;

            if (typeof value === "object" && value !== null) {
                this.flattenAndFill(wholeKey, container, value);
            } else {
                container[wholeKey] = value;
            }
        }
    }
}
