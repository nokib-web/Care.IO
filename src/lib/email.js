import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendInvoiceEmail = async (booking) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM || '"Care.IO" <noreply@care.io>',
            to: booking.userEmail,
            subject: `Invoice for Booking #${booking._id}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #4F46E5; color: white; padding: 20px; text-align: center;">
                        <h1>Care.IO Invoice</h1>
                    </div>
                    <div style="padding: 20px;">
                        <p>Dear <strong>${booking.userName}</strong>,</p>
                        <p>Thank you for booking with Care.IO. Here are your booking details:</p>
                        
                        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                            <tr style="background-color: #f3f4f6;">
                                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Service</strong></td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${booking.serviceName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date</strong></td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${new Date(booking.bookingDate).toLocaleDateString()}</td>
                            </tr>
                            <tr style="background-color: #f3f4f6;">
                                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Duration</strong></td>
                                <td style="padding: 10px; border: 1px solid #ddd;">${booking.duration} Hours</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Rate</strong></td>
                                <td style="padding: 10px; border: 1px solid #ddd;">$${booking.pricePerUnit}/hr</td>
                            </tr>
                            <tr style="background-color: #f3f4f6;">
                                <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total Cost</strong></td>
                                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; color: #4F46E5;">$${booking.totalCost}</td>
                            </tr>
                        </table>

                        <p style="margin-top: 20px;">
                            <strong>Location:</strong><br/>
                            ${booking.location.address}, ${booking.location.area}, ${booking.location.city}, ${booking.location.district}
                        </p>

                        <p style="margin-top: 30px; font-size: 14px; color: #666;">
                            If you have any questions, please contact our support team.
                        </p>
                    </div>
                    <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #999;">
                        &copy; ${new Date().getFullYear()} Care.IO. All rights reserved.
                    </div>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
};
