import React from 'react';
import * as S from "./styles/Chip.style";

import { Text } from "../Text/Text";

const Chip = props => {
    const { content, selected, marginRight, onClick } = props
    return (
        <S.Chip onClick={onClick} style={{ marginRight }} selected={selected}>
            <Text style={{ margin: "8px" }} content={content} fontFamily={"Muli"} sizes={[14, 14, 14, 14, 14]} />
        </S.Chip>
    );
}

export default Chip;