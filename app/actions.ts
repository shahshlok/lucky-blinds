'use server'

import nodemailer from 'nodemailer';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormState = {
  success: boolean;
  error?: string;
};

export async function sendContactEmail(data: {
  name: string;
  phone: string;
  email: string;
  message: string;
}): Promise<ContactFormState> {
  try {
    // Validate data
    const validatedFields = formSchema.parse(data);

    // Create transporter
    // NOTE: These environment variables need to be set in your project
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your preferred service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'contactluckyblinds@gmail.com',
      subject: `New Contact Form Submission from ${validatedFields.name}`,
      text: `
        Name: ${validatedFields.name}
        Phone: ${validatedFields.phone}
        Email: ${validatedFields.email}
        
        Message:
        ${validatedFields.message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${validatedFields.name}</p>
        <p><strong>Phone:</strong> ${validatedFields.phone}</p>
        <p><strong>Email:</strong> ${validatedFields.email}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedFields.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: 'Failed to send email. Please try again later.' };
  }
}
