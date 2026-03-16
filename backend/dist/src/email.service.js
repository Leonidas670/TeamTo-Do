"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
let EmailService = class EmailService {
    serviceId = process.env.EMAILJS_SERVICE_ID || 'service_vmhzjxq';
    templateId = process.env.EMAILJS_TEMPLATE_ID || 'template_qt9pj5p';
    publicKey = process.env.EMAILJS_PUBLIC_KEY || 'FlGqkq7QB0bvFuyEq';
    privateKey = process.env.EMAILJS_PRIVATE_KEY || 'tu-private-key-aqui';
    async sendInvitationEmail(to, teamName, inviterName) {
        const url = 'https://api.emailjs.com/api/v1.0/email/send';
        const data = {
            service_id: this.serviceId,
            template_id: this.templateId,
            user_id: this.publicKey,
            accessToken: this.privateKey,
            template_params: {
                to_email: to,
                team_name: teamName,
                inviter_name: inviterName,
                message: `Has sido invitado al equipo ${teamName} por ${inviterName}. Inicia sesión para unirte.`,
            },
        };
        console.log('EmailJS Data:', data);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log('EmailJS Response Status:', response.status);
        if (!response.ok) {
            const errorText = await response.text();
            console.log('EmailJS Error Response:', errorText);
            throw new Error(`EmailJS error: ${response.statusText} - ${errorText}`);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);
//# sourceMappingURL=email.service.js.map