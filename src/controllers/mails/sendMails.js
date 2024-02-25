const transport = require("../../service/mail/connectionEmail.js");
const compileHtml = require("../../helpers/sendMail/compile.js");
const { mailName, mailFrom } = require("../../../config/env.config.js");

const mailSendUserResgistered = async (name, email, codeToken) => {
  const html = await compileHtml("./src/templates/registered-user.html", {
    name,
    codeToken,
  });

  transport.sendMail({
    from: `${mailName} <${mailFrom}`,
    to: `${name} <${email}>`,
    subject: `Bem vindo(a) ao StartStudies!`,
    html,
  });
};

module.exports = mailSendUserResgistered;
