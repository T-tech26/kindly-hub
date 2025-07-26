import nodemailer from 'nodemailer'
import { google } from 'googleapis'

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.GOOGLE_CLIENT_REDIRECT_URI!
);

oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESS_TOKEN })

export const createTransporter = async () => {
  
  const accessToken = await oAuth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAUTH2',
      user: process.env.EMAIL_SMTP_USER!,
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      refreshToken: process.env.GOOGLE_REFRESS_TOKEN!,
      accessToken: accessToken.token!,
    },
  });
};