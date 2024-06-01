const filterSearchParams = (params) => {
  const { title, description, name, nickname } = params;
  const filters = {};

  if (title) filters.title = title;
  if (description) filters.description = description;
  if (name) filters.name = name;
  if (nickname) filters.nickname = nickname;

  return filters;
};

module.exports = filterSearchParams;
