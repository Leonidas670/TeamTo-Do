export declare class EmailService {
    private transporter;
    constructor();
    sendInvitationEmail(to: string, teamName: string, inviterName: string): Promise<void>;
}
