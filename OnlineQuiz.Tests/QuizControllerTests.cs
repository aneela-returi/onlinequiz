using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using OnlineQuiz.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OnlineQuiz.Tests
{
    [TestClass]
    public class QuizControllerTests
    {
        [TestMethod]
        public void CanCreateQuizController()
        {
            //Arrange
            QuizController quizController = new QuizController();

            //Act

            //Assert
            Assert.IsNotNull(quizController);

        }

        [TestMethod]
        public void Can_Start_A_Quiz()
        {
            //Arrange
            QuizController quizController = new QuizController();

            //Act
            var result = quizController.StartQuiz(Data.Exam.csharp.ToString("g"));
            var okResult = result as OkObjectResult;

            //Assert

            Assert.IsNotNull(okResult);

            Assert.AreEqual(200, okResult.StatusCode);
        }

        [TestMethod]
        public void Can_Get_A_Question()
        {
            //Arrange
            QuizController quizController = new QuizController();

            //Act
            var result = quizController.StartQuiz(Data.Exam.csharp.ToString("g"));

            var okResult = result as OkObjectResult;

            var quizId = Convert.ToInt32(okResult.Value);

            //Assert

            Assert.IsNotNull(okResult);

            Assert.AreEqual(200, okResult.StatusCode);

            var questionResult = quizController.NextQuestion(quizId);

            Assert.IsNotNull(questionResult);
        }

        [TestMethod]
        public void Can_Get_QuizResult()
        {
            //Arrange
            QuizController quizController = new QuizController();

            //Act
            var result = quizController.StartQuiz(Data.Exam.csharp.ToString("g"));

            var okResult = result as OkObjectResult;

            var quizId = Convert.ToInt32(okResult.Value);

            //Assert

            Assert.IsNotNull(okResult);

            Assert.AreEqual(200, okResult.StatusCode);

            var questionResult = quizController.NextQuestion(quizId);
            var jsonResult = questionResult as JsonResult;

            var q = new { QNo = 0, Question = new OnlineQuiz.Data.QuestionWithOptions(Data.Exam.csharp, "", null), isLastQuestion = true };

            var s = JsonConvert.DeserializeAnonymousType(jsonResult.Value.ToString(), q);

            Assert.IsNotNull(jsonResult);


        }

    }
}

