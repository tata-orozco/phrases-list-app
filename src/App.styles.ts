import styled from "styled-components"

export const MainWrapper = styled.main`
    @media (min-width: 768px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        max-width: 120rem;
        margin: 0 auto;
    }
`;

export const UpperWrapper = styled.div`
    text-align: right;
    width: 100%;
`
export const Section = styled.section`
    @media (min-width: 768px) {
        width: 48%;
    }
`;
