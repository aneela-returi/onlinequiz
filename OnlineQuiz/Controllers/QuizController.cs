using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using OnlineQuiz.Data;

namespace OnlineQuiz.Controllers
{
    [Produces("application/json")]
    [Route("api/Quiz")]
    public class QuizController : Controller
    {
        static int quizNumber = 0;

        static Dictionary<int, string> quizList = new Dictionary<int, string>();

        static List<UserAnswer> userAnswerList = new List<UserAnswer>();

        [HttpGet("start")]
        public IActionResult StartQuiz(string exam)
        {
            // create a new test id
            quizNumber++;
            // store the test id and the test type
            quizList.Add(quizNumber, exam);

            // return the test id
            return Ok(quizNumber);
        }

        [HttpPost("answer")]
        public IActionResult Answer([FromBody]UserAnswer answer)
        {
            //TODO: validate answer.quizId
            userAnswerList.Add(answer);
            return Ok();
        }

        [HttpPost("next")]
        public IActionResult NextQuestion(int quizNumber)
        {
            //question, options
            int currentQuestionIndex = userAnswerList.Count(ua => ua.QuizId == quizNumber);
            var questionList = QuizData.QuestionList.Where(q => q.ExamType.ToString("g") == quizList[quizNumber]).ToList();

            //also return a quiz end flag
            var isLastQuestion = (questionList.Count == currentQuestionIndex + 1);

            return new JsonResult(new { QNo = currentQuestionIndex + 1, Question = questionList[currentQuestionIndex], isLastQuestion });
        }

        [HttpPost("result")]
        public IActionResult GetResult(int quizNumber)
        {
            var numberOfCorrectAnswers = 0;
            var userAnswers = userAnswerList.Where(ua => ua.QuizId == quizNumber);

            foreach (var answer in userAnswers)
            {
                var correctAnswer = QuizData.CorrectAnswers.SingleOrDefault(c => c.QuestionId == answer.QuestionId);
                if (correctAnswer.CorrectAnswer == answer.Answer)
                {
                    numberOfCorrectAnswers++;
                }
            }

            return new JsonResult(new { TotalQuestions = userAnswers.Count(), CorrectAnswers = numberOfCorrectAnswers });
        }
    }
}