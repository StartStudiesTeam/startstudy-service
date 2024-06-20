const compileHtml = require("../../utils/mail/compile");

const SendRegisteredUserEmail = async (name, email, codeToken) => {
  const html = await compileHtml("./src/templates/registered-user.html", {
    name,
    codeToken,
  });

  const brevoApiEndpoint = "https://api.brevo.com/v3/smtp/email";
  const brevoApiKey = process.env.API_KEY;

  const emailData = {
    sender: {
      name: process.env.EMAIL_NAME,
      email: process.env.EMAIL_FROM,
    },
    to: [
      {
        email: email,
      },
    ],
    subject: "Bem vindo(a) ao StartStudies!",
    htmlContent: html,
  };

  if (brevoApiKey) {
    try {
      const response = await fetch(brevoApiEndpoint, {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": brevoApiKey,
          "content-type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      return {
        success: false,
        message:
          "Error sending email: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  } else {
    return {
      success: false,
      message: "No Brevo API key found",
    };
  }
};

module.exports = SendRegisteredUserEmail;
