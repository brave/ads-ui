import styled from "styled-components";

interface INavTextProps {
  selected: boolean;
}

export const Container = styled("div")`
  @media (min-width: 992px) {
    display: none;
  }
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 62px;
  background-color: white;
  border-top: 2px solid #fafbfa;
`;

export const InnerContainer = styled.div`
  @media (max-width: 768px) {
    max-width: 576px;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    max-width: 768px;
  }
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

export const InnerNav = styled.div``;
export const NavIcon = styled.div`
  width: 30px;
  height: 30px;
  margin: auto;
  fill: purple;
`;
export const NavText = styled.div`
  @media (max-width: 768px) {
    font-size: 13px;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    font-size: 15px;
  }
  ${(props: Partial<INavTextProps>) =>
    props.selected === true &&
    `
    color: #737ADE;
  `}
`;

export const Nav = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
