"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const raw = process.env.FRONTEND_URLS ?? process.env.FRONTEND_URL;
    if (raw) {
        const allowed = raw
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
            .map(s => (s.endsWith('/') ? s.slice(0, -1) : s));
        app.enableCors({
            origin: (origin, callback) => {
                if (!origin)
                    return callback(null, true);
                const normalized = origin.endsWith('/') ? origin.slice(0, -1) : origin;
                if (allowed.includes(normalized))
                    return callback(null, true);
                return callback(new Error('CORS origin denied'));
            },
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        });
    }
    else {
        app.enableCors({
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        });
    }
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map