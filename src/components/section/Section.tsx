import React, { Component } from 'react';
import * as S from "./Section.style";

class Section extends Component<any, any> {

    render() {

        let marginBottom = "56px";
        if (this.props.marginBottom) {
            marginBottom = this.props.marginBottom;
        }

        const children = React.Children.map(this.props.children, child => {
            if (this.props.equalWidthChildren) {
                return (
                    <S.Section marginBottom={marginBottom} width={`${100 / React.Children.count(this.props.children)}%`}>
                        {child}
                    </S.Section>
                )
            }
            else {
                return (
                    <S.Section marginBottom={marginBottom}>
                        {child}
                    </S.Section>
                )
            }
        })
        return (
            <React.Fragment>
                {this.props.header && <S.SectionHeader>{this.props.header}</S.SectionHeader>}
                <S.InnerContainer>{children}</S.InnerContainer>
            </React.Fragment>
        );
    }
}

export default Section;