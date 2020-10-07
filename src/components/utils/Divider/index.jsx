import React from "react";
import { Container, Line, Label } from "./style";

const Divider = props => {

    return (
        <Container>
            <Line/>
            <Label>{props.label}</Label>
            <Line/>
        </Container>
    )
}

export default Divider;