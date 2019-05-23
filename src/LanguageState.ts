import {Language} from "./Language";
import {History, LocationState} from "history";

export class LanguageState {

    public static readonly instance: LanguageState = new LanguageState();

    private paddingPathname?: string;
    private language?: Language<any>;
    private currentLan?: string;

    private constructor() {}

    public setPaddingPathname(pathname: string): void {
        this.paddingPathname = pathname;
    }

    public didSetPaddingPathname(): boolean {
        return this.paddingPathname !== undefined;
    }

    public takePaddingPathname(): string | undefined {
        const currentPaddingPathname = this.paddingPathname;
        this.paddingPathname = undefined;
        return currentPaddingPathname;
    }

    public setState(language: Language<any>, currentLan: string): void {
        this.language = language;
        this.currentLan = currentLan;
    }

    public getCurrentLan(): string {
        return this.currentLan!;
    }

    public push(history: History, path: string, state?: LocationState): void {
        history.push(this.pathWithLan(path), state);
    }

    public pathWithLan(path: string): string {
        return `/${this.getCurrentLan()}${path}`;
    }

    public pathReplaceLan(path: string, lan: string): string {
        const pattern = /^\/[a-zA-Z\-]+/i;
        const matcher = path.match(pattern);

        if (matcher && matcher[0]) {
            const lan = matcher[0].replace(/^\//, "");
            if (this.language!.isSupportLanguage(lan)) {
                path = path.replace(pattern, "");
            }
        }
        return `/${lan}${path}`;
    }
}
