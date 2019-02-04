using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineQuiz.Data
{
    public enum Exam
    {
        csharp,
        html,
        js
    }
    public class QuizData
    {
        public static List<QuestionWithOptions> QuestionList;

        public static List<QuestionAnswer> CorrectAnswers;

        static QuizData()
        {
            QuestionList = new List<QuestionWithOptions>();

            CorrectAnswers = new List<QuestionAnswer>();

            List<string> optionList = new List<string>(3);

            optionList.Add("ToInt16()");

            optionList.Add("ToInt32()");

            optionList.Add("ToInt64()");

            var q1 = new QuestionWithOptions(Exam.csharp, "Which of the following converts a type to an unsigned big type in C#?", optionList.ToArray());

            QuestionList.Add(q1);

            CorrectAnswers.Add(new QuestionAnswer(q1.QuestionId, 2));

            var q2 = new QuestionWithOptions(Exam.csharp, "C# supports multiple inheritance.", new string[] { "True", "False" });

            QuestionList.Add(q2);

            CorrectAnswers.Add(new QuestionAnswer(q2.QuestionId, 1));

            var q3 = new QuestionWithOptions(Exam.csharp, "The System.SystemException class is the base class for all predefined system exception in C#?", new string[] { "True", "False" });

            QuestionList.Add(q3);

            CorrectAnswers.Add(new QuestionAnswer(q3.QuestionId, 0));

            var q4 = new QuestionWithOptions(Exam.html, "Graphics defined by SVG is in which format?", new string[] { "CSS","HTML","XML" });

            QuestionList.Add(q4);

            CorrectAnswers.Add(new QuestionAnswer(q4.QuestionId, 2));

            var q5 = new QuestionWithOptions(Exam.html, "HTML comments start with <!-- and end with --> ", new string[] { "False", "True" });
            QuestionList.Add(q5);

            CorrectAnswers.Add(new QuestionAnswer(q5.QuestionId, 1));

            var q6 = new QuestionWithOptions(Exam.html, "Block elements are normally displayed without starting a new line.", new string[] { "False", "True" });
            QuestionList.Add(q6);

            CorrectAnswers.Add(new QuestionAnswer(q6.QuestionId, 0));

            var q7 = new QuestionWithOptions(Exam.js, "The external JavaScript file must contain the <script> tag.", new string[] { "False", "True" });
            QuestionList.Add(q7);

            CorrectAnswers.Add(new QuestionAnswer(q7.QuestionId, 0));

            var q8 = new QuestionWithOptions(Exam.js, "JavaScript and Java are the same.", new string[] { "False", "True" });
            QuestionList.Add(q8);

            CorrectAnswers.Add(new QuestionAnswer(q8.QuestionId, 0));

            var q9 = new QuestionWithOptions(Exam.js, " What will the following code return: Boolean(10 > 9).", new string[] { "False", "True" });
            QuestionList.Add(q9);

            CorrectAnswers.Add(new QuestionAnswer(q9.QuestionId, 1));

        }
    }

    public class QuestionWithOptions
    {
        public Guid QuestionId { get; private set; }

        public QuestionWithOptions(Exam examType,
            string question,
            string[] options)
        {
            QuestionId = Guid.NewGuid();

            QuestionText = question;

            ExamType = examType;

            Options = options;
        }

        public Exam ExamType { get; private set; }

        public string QuestionText { get; private set; }

        public string[] Options { get; private set; }
    }

    public class QuestionAnswer
    {
        public Guid QuestionId { get; private set; }

        public int CorrectAnswer { get; private set; }

        public QuestionAnswer(Guid questionId, int correctAnswer)
        {
            QuestionId = questionId;

            CorrectAnswer = correctAnswer;
        }
    }

    public class UserAnswer
    {
        public int QuizId { get; set; }

        public Guid QuestionId { get; set; }

        public int Answer { get; set; }

        public UserAnswer(int quizId, Guid questionId, int answer)
        {
            QuizId = quizId;
            QuestionId = questionId;
            Answer = answer;
        }

        public UserAnswer() { }
    }
}
