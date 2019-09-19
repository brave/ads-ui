import React, { Component } from 'react';
import * as S from "./Section.style";

class Section extends Component<any, any> {

    render() {

        const children = React.Children.map(this.props.children, child => {
            if (this.props.equalWidthChildren) {
                return (
                    <S.Section width={`${100 / React.Children.count(this.props.children)}%`}>
                        {child}
                    </S.Section>
                )
            }
            else {
                return (
                    <S.Section>
                        {child}
                    </S.Section>
                )
            }
        })
        return (
            <React.Fragment>
                <S.SectionHeader>{this.props.header}</S.SectionHeader>
                <S.InnerContainer>{children}</S.InnerContainer>
            </React.Fragment>
        );
    }
}

export default Section;