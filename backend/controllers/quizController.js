const showQuiz = async (req, res) => {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${req.query.amount}&category=${req.query.category}&difficulty=${req.query.difficulty}&type=${req.query.type}`
    );
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes" });
  }
};

module.exports = showQuiz;
