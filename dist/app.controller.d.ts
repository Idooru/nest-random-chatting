import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    root(): {
        data: {
            title: string;
            copyright: string;
        };
        static: {
            css: string;
            js: string;
        };
    };
}
