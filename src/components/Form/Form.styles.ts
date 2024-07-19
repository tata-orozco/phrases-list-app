import styled from "styled-components";
import { baseButtonStyles, baseInputStyles } from "../../GlobalStyles";

export const FormWrapper = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    label {
        font-weight: 700;
        margin-bottom: 1rem;
        @media (min-width: 768px) {
            font-size: 2.5rem;
            margin-bottom: 2rem;
        }
    }
`;

export const TextArea = styled.textarea`
    ${baseInputStyles}
    line-height: 2.2rem;
    resize: none;
    @media (min-width: 768px) {
        height: 15rem;
    }
`;

export const SubmitButton = styled.input.attrs({ type: 'submit' })`
    ${baseButtonStyles}
`;