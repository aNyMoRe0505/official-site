import React, { useState, memo, useContext } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {
  categories as categoryList,
  tags as tagList,
} from '../../config/blog';
import styles from '../../config/style';
import { CACHE_SEARCHER } from '../../actions/Blog';
import { DarkModeContext } from '../../config/context';

import Button from '../../components/Button';

import hamburger from '../../static/hamburger.png';

const ResetButton = styled(Button)`
  background-color: ${styles.mainRed};
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: 700px;
`;

const FadeIn = css`
  opacity: 1;
  max-height: 100%;
  transition-property: opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`;

const FadeOut = css`
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  padding: 0;
  transition: padding 0s 0.3s, max-height 0s 0.3s, opacity 0.3s ease;
`;

const FilterWrapperDark = css`
  color: white;
  background-color: rgb(38, 44, 60);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  transition-duration: 0.2s;
  transition-property: transform, color, background-color;
  transition-timing-function: ease;
`;

const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 0px 4px #80808078;
  color: white;
  background-color: white;
  ${({ darkMode }) => darkMode && FilterWrapperDark};
  ${({ filterShowed }) => (filterShowed && FadeIn) || FadeOut};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 0 15px 0;
`;

const StyledLabel = styled.span`
  color: ${({ darkMode }) => (darkMode && 'white') || 'black'};
  font-size: 16px;
  width: ${({ width }) => width || '64px'};
`;

const StyledInput = styled.input`
  flex: 1;
  font-size: 16px;
  padding: 7px;
  outline: none;
  border-width: 0 0 2px 0px;
  border-style: solid;
  border-color: gray;
  border-radius: 0px;
  :focus {
    border-color: ${styles.mainColor};
  };
  transition-duration: 0.3s;
  transition-property: border-color;
  background-color: transparent;
  color: ${({ darkMode }) => (darkMode && 'white') || 'black'};
  transition-timing-function: ease-in-out;
`;

const TagCategoryWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin: 0 0 15px 0;
`;

const ListWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`;

const CategoryTagBtn = styled(Button)`
  width: auto;
  height: 30px;
  padding: 0 8px;
  margin: 0 5px 5px;
  background-color: ${({ actived }) => (actived ? styles.mainRed : styles.mainColor)};
`;

const FunctionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HamburgerButton = styled.button`
  width: 40px;
  border: none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ filterShowed }) => (filterShowed ? 'rotate(-90deg)' : 'rotate(0deg)')};
  transition-duration: 0.3s;
  transition-property: transform;
  transition-timing-function: linear;
  margin: 0 0 10px 0;
`;

const Logo = styled.img`
  width: 100%;
`;

function Searcher() {
  const storeKeyword = useSelector((state) => state.Blog.searcherParam.keyword);
  const storeCategories = useSelector((state) => state.Blog.searcherParam.categories);
  const storeTags = useSelector((state) => state.Blog.searcherParam.tags);
  const loading = useSelector((state) => state.Blog.loading);
  const dispatch = useDispatch();
  const darkMode = useContext(DarkModeContext);

  const [filterShowed, setFilterShowed] = useState(true);
  const [keyword, setKeyword] = useState(storeKeyword);
  const [categories, setCategories] = useState(storeCategories);
  const [tags, setTags] = useState(storeTags);

  const handleTagCategoryChange = (id, type) => {
    const setFunc = type === 'category' ? setCategories : setTags;
    const setTargets = type === 'category' ? categories : tags;
    const existIndex = setTargets.findIndex((targetId) => targetId === id);

    if (~existIndex) {
      setFunc([
        ...setTargets.slice(0, existIndex),
        ...setTargets.slice(existIndex + 1),
      ]);
    } else {
      setFunc([
        ...setTargets,
        parseInt(id, 10),
      ]);
    }
  };

  const submit = () => {
    dispatch({
      type: CACHE_SEARCHER,
      params: {
        keyword,
        categories,
        tags,
      },
    });
  };

  return (
    <Wrapper>
      <HamburgerButton
        filterShowed={filterShowed}
        onClick={() => setFilterShowed(!filterShowed)}
        type="button"
      >
        <Logo src={hamburger} alt="hamburger" />
      </HamburgerButton>
      <FilterWrapper darkMode={darkMode} filterShowed={filterShowed}>
        <InputWrapper>
          <StyledLabel darkMode={darkMode}>關鍵字：</StyledLabel>
          <StyledInput
            darkMode={darkMode}
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            type="text"
          />
        </InputWrapper>
        <TagCategoryWrapper>
          <StyledLabel darkMode={darkMode} width="59px">分類：</StyledLabel>
          <ListWrapper>
            {Object.keys(categoryList).map((key) => (
              <CategoryTagBtn
                onClick={() => handleTagCategoryChange(parseInt(key, 10), 'category')}
                actived={~categories.findIndex((categoryId) => categoryId === parseInt(key, 10))}
                label={categoryList[key]}
                key={`category-${key}`}
              />
            ))}
          </ListWrapper>
        </TagCategoryWrapper>
        <TagCategoryWrapper>
          <StyledLabel darkMode={darkMode} width="59px">標籤：</StyledLabel>
          <ListWrapper>
            {Object.keys(tagList).map((key) => (
              <CategoryTagBtn
                onClick={() => handleTagCategoryChange(parseInt(key, 10), 'tag')}
                actived={~tags.findIndex((tagId) => tagId === parseInt(key, 10))}
                label={tagList[key]}
                key={`tag-${key}`}
              />
            ))}
          </ListWrapper>
        </TagCategoryWrapper>
        <FunctionWrapper>
          <Button disabled={loading} onClick={submit} label={loading ? '搜尋中' : '搜尋'} />
          <ResetButton
            onClick={() => {
              setKeyword('');
              setCategories([]);
              setTags([]);
            }}
            label="重置"
          />
        </FunctionWrapper>
      </FilterWrapper>
    </Wrapper>
  );
}

export default memo(Searcher);
