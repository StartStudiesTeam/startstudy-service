const errorMessages = {
  invalidToken: "Token inválido!",
  tokenExpired: "Token expirado!",
  invalidEmail: "Email inválido!",
  passwordInvalid: "Senha atual inválida!",
  invalidUser:
    "Credenciais de acesso inválidas! Entre em contato com o suporte.",
  InternalServerError: "Erro interno no Servidor!",
  existingUser: "Já existe usuário cadastrado com o email informado!",
  uniqueNickName: "O Nick Name precisa ser único!",
  unauthorizedUser: "Usuário não autorizado!",
  errorProcessingThisRequest:
    "Erro ao processar esta solicitação. Tente novamente ou entre em contato com suporte.",
  loginErrorEmailNotValidated:
    "Para realizar o Login, o seu email precisa está validado.",
  invalidRefreshToken: "Refresh token inválido.",
  invalidCredentials: "Credenciais de acesso inválidas!",
};

const sucessMessages = {
  checkMailUser: "Verifique o código enviado para o seu e-mail",
};

module.exports = {
  sucessMessages,
  errorMessages,
};
