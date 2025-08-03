export const ContactEmail = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: auto; background: #f9f9f9; padding: 20px; border-radius: 8px; }
    h1 { color: #2196f3; }
    p { margin-bottom: 16px; }
    .footer { font-size: 12px; color: #777; text-align: center; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>New Contact Form Message</h1>

    <p><strong>Name:</strong> {{ username }}</p>
    <p><strong>Email:</strong> {{ useremail }}</p>
    <p><strong>Phone:</strong> {{ phone }}</p>
    <p><strong>Subject:</strong> {{ subject }}</p>
    <p><strong>Message:</strong></p>
    <p>{{ message }}</p>

    <div class="footer">
      {{ organization_name }} | {{ organization_email }}
    </div>
  </div>
</body>
</html>
`