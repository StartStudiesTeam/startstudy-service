const brevo = require("@getbrevo/brevo");
const compileHtml = require("../../utils/mail/compile");

const SendRegisteredUserEmail = async (name, email, codeToken) => {
  const html = await compileHtml("./src/templates/registered-user.html", {
    name,
    codeToken,
  });

  let apiInstanceMail = new brevo.TransactionalEmailsApi();

  let apiKey = apiInstanceMail.authentications["apiKey"];
  apiKey.apiKey = process.env.EMAIL_PASS;

  let sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "Bem vindo(a) ao StartStudies!";
  sendSmtpEmail.htmlContent = html;
  sendSmtpEmail.sender = {
    name: process.env.EMAIL_NAME,
    email: process.env.EMAIL_FROM,
  };

  sendSmtpEmail.to = [{ email: email, name: name }];
  sendSmtpEmail.replyTo = {
    email: process.env.EMAIL_FROM,
    name: process.env.EMAIL_NAME,
  };

  const responseSendMail = apiInstanceMail.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      return data.response.statusCode;
    },
    function (error) {
      return error;
    }
  );
  return responseSendMail;
};

module.exports = SendRegisteredUserEmail;
