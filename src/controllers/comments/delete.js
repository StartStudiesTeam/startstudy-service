const prisma = require("../../database/prisma");
const sucessMessagesComments = require("../../helpers/codeMessages/commentsSucessMessages");
const errorMessages = require("../../helpers/codeMessages/errorMessages");

const deleteComments = async (req, res) => {
  const { id } = req.body;

  try {
    const exclude = await prisma.comments.delete({
      where: {
        id,
      },
    });

    return res
      .status(204)
      .json({ message: sucessMessagesComments.deletedComments });
  } catch (error) {
    return res
      .status(400)
      .json({ message: errorMessages.errorProcessingThisRequest });
  }
};

module.exports = deleteComments;
