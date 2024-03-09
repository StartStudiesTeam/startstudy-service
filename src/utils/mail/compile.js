const fs = require("fs/promises");
const handlebars = require("handlebars");

const compileHtml = async (file, context) => {
  const html = await fs.readFile(file);

  const compile = handlebars.compile(html.toString());

  const newHtml = compile(context);

  return newHtml;
};

module.exports = compileHtml;
