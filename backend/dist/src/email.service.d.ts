export declare class EmailService {
    private serviceId;
    private templateId;
    private publicKey;
    private privateKey;
    sendInvitationEmail(to: string, teamName: string, inviterName: string): Promise<void>;
}
