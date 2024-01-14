const transport = require("../../service/mail/connectionEmail.js");
const compileHtml = require("../../helpers/sendMail/compile.js");

const mailSendUserResgistered = async (name, email, codeToken) => {
  const html = await compileHtml("./src/templates/register.html", {
    name: name,
    token: codeToken,
  });

  transport.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}`,
    to: `${name} <${email}>`,
    subject: `Solicitação de Cadastro no Start Study`,
    html,
  });
};

module.exports = mailSendUserResgistered;
