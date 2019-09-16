import React, { Component } from 'react';
import * as S from "./Section.style";
import { Text } from "../Text/Text";

class Section extends Component<any, any> {

    render() {

        const children = React.Children.map(this.props.children, child => {
            // if items # is set, space items evenly. Else use flow layout. 
            if (this.props.items) {
                return (
                    <S.Section width={`${100 / this.props.items}%`}>
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