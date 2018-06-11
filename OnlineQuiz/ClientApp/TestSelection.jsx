﻿import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

class TestSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedTest: '' };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleClick(e) {
        var test = this.state.selectedTest;
        this.props.history.push({ pathname: '/starttest/' + test });
    }

    handleChange(e) {
        this.setState({ selectedTest: e.target.value });
    }

    render() {
        var isDisabled = '';

        return (
            <div className="container">
                <form className="form-horizontal" role="form">
                    <fieldset>
                        <p className='h3'>Select a test</p>
                        <div className="radio">
                            <label>
                                <div className="col-md-4">
                                    <input type='radio' name='optradio' value='csharp' checked={this.state.selectedTest == 'csharp'} onChange={this.handleChange} />CSharp
                                 </div>
                            </label>

                        </div>
                        <div className="radio">
                            <label>
                                <div className="col-md-4">
                                    <input type='radio' name='optradio' value='html' checked={this.state.selectedTest == 'html'} onChange={this.handleChange} />HTML
                                    </div>
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <div className="col-md-4">
                                    <input type='radio' name='optradio' value='js' checked={this.state.selectedTest == 'js'} onChange={this.handleChange} />JavaScript
                                </div>
                            </label>
                        </div>
                        <br />
                        <div>
                            <div className="col-md-4">
                                <button type="submit" disabled={!this.state.selectedTest} className="btn btn-default btn-md" onClick={this.handleClick}>Start</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}
export default withRouter(TestSelection);
