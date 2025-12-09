"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const FRONTEND_URL = process.env.FRONTEND_URL;
    if (FRONTEND_URL) {
        app.enableCors({ origin: FRONTEND_URL });
    }
    else {
        app.enableCors();
    }
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map