/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageBtn = styled.button`
  width: 20px;
  height: 20px;
  border: 1px solid black;
  outline: none;
  margin: 0 5px;
  border-radius: 5px;
  font-weight: ${({ actived }) => (actived && 800) || 300};
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

function Page({
  total,
  perPage,
  pageShow,
  currentPage,
  onChange,
}) {
  const [currentGroupPage, setGroupPage] = useState(Math.ceil(currentPage / pageShow));

  useEffect(() => {
    setGroupPage(Math.ceil(currentPage / pageShow));
  }, [currentPage, pageShow]);

  const totalPageNumbers = Math.ceil(total / perPage);
  const pageArray = Array.from(new Array(totalPageNumbers)).map((_, index) => index + 1);

  const toFirstEnable = currentPage > pageShow;
  const toBottomEnable = Math.ceil(currentPage / pageShow) < Math.ceil(pageArray[pageArray.length - 1] / pageShow);

  return (
    <PageWrapper>
      <PageBtn disabled={!toFirstEnable} type="button" onClick={() => onChange(1)}>{'<<'}</PageBtn>
      <PageBtn disabled={currentPage === 1} type="button" onClick={() => onChange(currentPage - 1)}>{'<'}</PageBtn>
      {totalPageNumbers <= pageShow ? (
        <>
          {pageArray.map((pageNum) => (
            <PageBtn
              key={pageNum}
              actived={currentPage === pageNum}
              type="button"
              onClick={() => onChange(pageNum)}
            >
              {pageNum}
            </PageBtn>
          ))}
        </>
      ) : (
        <>
          {pageArray.slice((currentGroupPage - 1) * pageShow, (currentGroupPage - 1) * pageShow + pageShow).map((pageNum) => (
            <PageBtn
              key={pageNum}
              actived={currentPage === pageNum}
              type="button"
              onClick={() => onChange(pageNum)}
            >
              {pageNum}
            </PageBtn>
          ))}
        </>
      )}
      <PageBtn disabled={currentPage === pageArray[pageArray.length]} type="button" onClick={() => onChange(currentPage + 1)}>{'>'}</PageBtn>
      <PageBtn disabled={!toBottomEnable} type="button" onClick={() => onChange(pageArray[pageArray.length - 1])}>{'>>'}</PageBtn>
    </PageWrapper>
  );
}

Page.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageShow: PropTypes.number,
};

Page.defaultProps = {
  pageShow: 10,
};

export default Page;
