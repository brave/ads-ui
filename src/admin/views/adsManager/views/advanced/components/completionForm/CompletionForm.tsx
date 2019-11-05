import React, { Component } from 'react';
import Context from "../../../../../../../state/context";
import Confetti from 'react-confetti'

class CompletionForm extends Component<any, any> {
    static contextType = Context;
    constructor(props) {
        super(props);
    }
    public componentDidMount() {
        this.initialize();
    }

    public async initialize() {
        this.context.setLoading(true);
        this.context.setLoading(false);
    }

    // public componentWillUnmount() {
    //     this.context.setLoading(undefined);
    // }
    render() {
        return (
            this.context.loading === false &&
            <div>
                <Confetti colors={["#FB7959", "#4C54D2"]} />
            </div>
        );
    }
}

export default CompletionForm;