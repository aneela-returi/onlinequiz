import React, { Component } from 'react'

export class QuestionAndOptions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            answer : -1
        }
        this.handleAnswerOption = this.handleAnswerOption.bind(this);
    }

    handleAnswerOption(e) {
        this.setState({ answer: e.target.value });
    }

    render() {
        var options = '';
        var question = '';
        var handleAnswer = this.handleAnswerOption;
        if (this.props.question !== null && this.props.question !== undefined) {
            question = this.props.question.questionText;
            options = this.props.question.options.map(
                (o, index) =>
                    <div className='radio'>
                        <label>
                            <input type='radio' name='answer' value={index} checked={this.state.answer == index} onChange={handleAnswer} />{o}
                        </label>
                    </div>
            );
        }
      
        return (
            <div>
                {this.props.questionNum}. {question}
                <div>
                    {options}
                </div>
            </div>
        )
    }
}

export default QuestionAndOptions;
