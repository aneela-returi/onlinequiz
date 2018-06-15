import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = { quizId: -1, question: null, answer: -1, questionNum :0, isLastQuestion: false, endOfTest: false };
        this.nextClick = this.nextClick.bind(this);
        this.handleAnswerOption = this.handleAnswerOption.bind(this);
        this.finishClick = this.finishClick.bind(this);
        this.getResults = this.getResults.bind(this);
    }
    componentDidMount() {
        // ajax call, starttest should return a unique id, 
        // get the next question based on unique id -> isLastQuestion: flag or next question
        axios.get('/api/quiz/start', { params: { exam: this.props.test } })
            .then(res => {
                console.log(res.data);
                this.setState({ quizId: res.data });
                this.loadNextQuestion();
            })
            .catch(error => {
                console.log(error);
            });
    }
    loadNextQuestion() {
        if (!this.state.isLastQuestion) {
            axios.post('/api/quiz/next', "quizNumber=" + this.state.quizId)
                .then(nextResult => {
                    console.log(nextResult.data.question);
                    this.state.question = nextResult.data.question;
                    this.state.isLastQuestion = nextResult.data.isLastQuestion;
                    this.state.questionNum = nextResult.data.qNo;
                    this.setState(this.state);
                })
                .catch(err => { console.log(err); });
        }
    }
    nextClick(e) {
        //if (this.state.endOfTest) return;
        // post answer
        var q = this.state.question;
        axios.post('/api/quiz/answer', { quizId: this.state.quizId, questionId: q.questionId, answer: this.state.answer })
            .then(answerResult => {
                console.log(answerResult.data);

                //clear answer
                this.state.answer = -1;
                //this.state.endOfTest = this.state.isLastQuestion;
                this.loadNextQuestion();
            })
            .catch(err => { console.log(err); });
    }

    handleAnswerOption(e) {
        this.state.answer = e.target.value;
        this.setState(this.state);
    }

    finishClick(e) {
        var q = this.state.question;
        this.state.endOfTest = true;
        axios.post('/api/quiz/answer', { quizId: this.state.quizId, questionId: q.questionId, answer: this.state.answer })
            .then(answerResult => {
                console.log(answerResult.data);

                //clear answer
                this.state.answer = -1;
                this.getResults();
            })
            .catch(err => { console.log(err); });
    }

    getResults() {
        axios.post('/api/quiz/result', "quizNumber=" + this.state.quizId)
            .then(results => {
                console.log(results.data);
                this.state['results'] = results.data;
                this.setState(this.state);
            })
            .catch(err => { console.log(err); });
    }

    render() {
        var options = '';
        var question = '';
        var handleAnswer = this.handleAnswerOption;
        if (this.state.question != null && this.state.question != undefined) {
            question = this.state.question.question;
            options = this.state.question.options.map(
                (o, index) =>
                    <div class='radio'>
                        <label>
                            <input type='radio' name='answer' value={index} checked={this.state.answer == index} onChange={handleAnswer} />{o}
                        </label>
                    </div>
            );
        }
        var results = '';
        var hideFinishBtn = !this.state.isLastQuestion;
        if (this.state.results) {
            hideFinishBtn = true;
            results = 'Total Questions: ' + this.state.results.totalQuestions + ', Correct Answers: ' + this.state.results.correctAnswers;
        }

        return (
            <div>
                <form className="form-horizontal">
                    {!this.state.endOfTest ? (
                        <div>
                            {this.state.questionNum}. {question}
                            <div>
                                {options}
                            </div>
                        </div>) : ''}
                    <br />
                    <div className='col-md-4'>
                        {!this.state.isLastQuestion && <input type='button' onClick={this.nextClick} class="btn btn-default" value="Next" />}
                        {!hideFinishBtn && <input type='button' onClick={this.finishClick} class="btn btn-default" value="Finish" />}
                    </div>
                    <div>
                        {results}
                    </div>
                </form>
            </div>
        );

    }
}