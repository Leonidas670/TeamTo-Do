import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendInvitationEmail(to: string, teamName: string, inviterName: string) {
    const subject = `Invitación a unirse al equipo ${teamName}`;
    const html = `
      <h1>¡Has sido invitado a un equipo!</h1>
      <p>Hola,</p>
      <p>${inviterName} te ha invitado a unirte al equipo <strong>${teamName}</strong> en Team To-Do.</p>
      <p>Para aceptar la invitación, inicia sesión en la aplicación.</p>
      <p>Saludos,<br>El equipo de Team To-Do</p>
    `;

    await this.transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
    });
  }
}