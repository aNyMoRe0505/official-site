import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 30px 0 0;
  @media (max-width: 768px) {
    margin: 15px 0 0;
  };
`;

const StyledImage = styled.img`
  width: 100%;
`;

const StyledRemark = styled.p`
  margin: 8px 0 0;
  color: gray;
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 12px;
  };
`;

function Image({
  src,
  remark,
}) {
  return (
    <ImageWrapper>
      <StyledImage src={src} alt="Article Image" />
      {remark && (
        <StyledRemark>
          {remark}
        </StyledRemark>
      )}
    </ImageWrapper>
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  remark: PropTypes.string,
};

Image.defaultProps = {
  remark: '',
};

export default Image;
