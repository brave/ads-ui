import React, { Component } from 'react';
import * as S from "./RadioButton.style";

class RadioButton extends Component<any, any> {
    render() {
        return (
            <>
                {
                    this.props.checked ?

                        <S.CheckedRadioButton onClick={this.props.onClick}>
                            <S.CheckedRadioButtonCenter />
                        </S.CheckedRadioButton>
                        :
                        <S.UncheckedRadioButton onClick={this.props.onClick} />

                }
            </>
        );
    }
}

export default RadioButton;