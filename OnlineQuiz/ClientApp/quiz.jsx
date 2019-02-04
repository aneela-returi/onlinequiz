import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import QuestionAndOptions from './QuestionAndOptions';

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = { quizId: -1, isLastQuestion: false, endOfTest: false };
        this.nextClick = this.nextClick.bind(this);
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
                    this.setState({
                        question: nextResult.data.question,
                        isLastQuestion: nextResult.data.isLastQuestion,
                        questionNum: nextResult.data.qNo
                    });
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
                this.setState({ answer: -1 });
                //this.state.endOfTest = this.state.isLastQuestion;
                this.loadNextQuestion();
            })
            .catch(err => { console.log(err); });
    }

    finishClick(e) {
        var q = this.state.question;
        this.setState({ endOfTest: true });
        axios.post('/api/quiz/answer', { quizId: this.state.quizId, questionId: q.questionId, answer: this.state.answer })
            .then(answerResult => {
                console.log(answerResult.data);

                //clear answer
                this.setState({ answer: -1 });
                this.getResults();
            })
            .catch(err => { console.log(err); });
    }


    getResults() {
        axios.post('/api/quiz/result', "quizNumber=" + this.state.quizId)
            .then(results => {
                console.log(results.data);
                this.setState({ results: results.data });
            })
            .catch(err => { console.log(err); });
    }
    //reviewClick(e) {
    //    var q = this.state.question;
    //    this.state.endOfTest = true;
    //    axios.post('/api/quiz/review', "quizNumber=" + this.state.quizId)
    //        .then(review => {
    //            console.log(review.data);
    //            this.state['review'] = review.data;
    //            this.setState(this.state);
    //        })
    //        .catch(err => { console.log(err); });
    //}

    render() {
       
        var results = '';
        var hideFinishBtn = !this.state.isLastQuestion;
        var questionsReview = '';
        var optionsReview = '';
        if (this.state.results) {
            hideFinishBtn = true;
            results = 'Total Questions: ' + this.state.results.totalQuestions + ', Correct Answers: ' + this.state.results.numberOfCorrectAnswers;
        }

        return (
            <div>
                <form className="form-horizontal">
                    {!this.state.endOfTest ?
                        <div>
                            <QuestionAndOptions questionNum={this.state.questionNum} question={this.state.question}/>
                        </div> : ''}
                    <div> 
                        <input type='button' hidden={this.state.isLastQuestion} onClick={this.nextClick} className="btn-primary" value="Next" />
                        <input type='button' hidden={hideFinishBtn} onClick={this.finishClick} className="btn-primary" value="Finish" />
                    </div>
                    <div>
                        {results}
                    </div>
                    <div>
                        {questionsReview}
                    </div>
                </form>
            </div>
        );

    }
}