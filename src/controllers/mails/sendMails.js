const transport = require("../../service/mail/connectionEmail.js");
const compileHtml = require("../../helpers/sendMail/compile.js");

const mailSendUserResgistered = async (name, email, codeToken) => {
  const html = await compileHtml("./src/templates/registered-user.html", {
    name,
    codeToken,
  });

  transport.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}`,
    to: `${name} <${email}>`,
    subject: `Bem vindo(a) ao StartStudies!`,
    html,
  });
};

module.exports = mailSendUserResgistered;
