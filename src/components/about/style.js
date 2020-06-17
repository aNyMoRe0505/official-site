import styled, { css } from 'styled-components';

export const FadeIn = css`
  max-height: 100%;
  opacity: 1;
  transition: opacity 0.5s ease;
`;

export const FadeOut = css`
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0s 0.5s, opacity 0.5s ease;
`;

export const MainBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: ${({ first }) => (first && '0px') || '15px 0 0'};
`;

export const BlockWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  ${({ status }) => (status && FadeIn) || FadeOut}
`;

export const BlockTitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 15px;
`;

export const StyledPlusMarkBtn = styled.button`
  width: 26px;
  height: 26px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  padding: 0;
  margin: 0 10px;
  :hover {
    opacity: 0.8
  };
  transform: ${({ status }) => (status ? 'rotate(135deg)' : 'rotate(0deg)')};
  transition-duration: 0.3s;
  transition-property: transform;
  transition-timing-function: ease-in-out;
`;

export const BlockTitle = styled.p`
  margin: 0;
  font-size: 25px;
  font-weight: 300;
  @media (max-width: 768px) {
    font-size: 22px;
  };
`;

export const Card = styled.div`
  width: 99%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0px 0px 4px #80808078;
  margin: 0 0 20px;
  padding: 15px;
  @media (max-width: 768px) {
    flex-direction: column;
  };
`;

export const DescBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 18px;
  font-weight: 300;
  @media (max-width: 768px) {
    align-items: center;
    font-size: 15px;
  };
`;

export const Desc = styled.p`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0 0 10px;
  @media (max-width: 768px) {
    justify-content: center;
  };
`;

export const Logo = styled.img`
  width: 200px;
  margin: 0 15px 0 0;
  @media (max-width: 768px) {
    margin: 0 0 15px;
    flex-direction: column;
  };
`;
