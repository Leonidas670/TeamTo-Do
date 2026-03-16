import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  private serviceId = process.env.EMAILJS_SERVICE_ID || 'service_vmhzjxq';
  private templateId = process.env.EMAILJS_TEMPLATE_ID || 'template_qt9pj5p';
  private publicKey = process.env.EMAILJS_PUBLIC_KEY || 'FlGqkq7QB0bvFuyEq';
  private privateKey = process.env.EMAILJS_PRIVATE_KEY || 'tu-private-key-aqui';

  async sendInvitationEmail(to: string, teamName: string, inviterName: string) {
    const url = 'https://api.emailjs.com/api/v1.0/email/send';
    const data = {
      service_id: this.serviceId,
      template_id: this.templateId,
      user_id: this.publicKey, // Use public key as user_id
      accessToken: this.privateKey, // Add private key for strict mode
      template_params: {
        to_email: to,
        team_name: teamName,
        inviter_name: inviterName,
        message: `Has sido invitado al equipo ${teamName} por ${inviterName}. Inicia sesión para unirte.`,
      },
    };

    console.log('EmailJS Data:', data); // Debug log

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('EmailJS Response Status:', response.status); // Debug log

    if (!response.ok) {
      const errorText = await response.text();
      console.log('EmailJS Error Response:', errorText); // Debug log
      throw new Error(`EmailJS error: ${response.statusText} - ${errorText}`);
    }
  }
}