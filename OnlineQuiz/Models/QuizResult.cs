using System.Collections.Generic;

namespace OnlineQuiz.Models
{
    public class QuizResult
    {
        public class QuestionResult
        {
            public string Question { get; set; }

            public string[] Options { get; set; }

            public int CorrectAnswer { get; set; }

            public int UserAnswer { get; set; }
        }

        public int TotalQuestions { get; set; }

        public int NumberOfCorrectAnswers { get; set; }

        public List<QuestionResult> QuestionResults
        {
            get; set;
        }
    }


}
