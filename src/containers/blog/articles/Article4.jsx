import React, { memo } from 'react';
import styled from 'styled-components';

import Text from '../../../components/blog/Text';
import Title from '../../../components/blog/Title';
import Reference from '../../../components/blog/Reference';

import { ARTICLE_META_TYPE } from '../../../helper/article';

const Iframe = styled.iframe`
  width: 100%;
  height: 500px;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
  margin: 30px 0 0;
  @media (max-width: 768px) {
    margin: 15px 0 0;
  };
`;

function Article4() {
  return (
    <>
      <Title>
        React - PureComponent
      </Title>
      <Text>
        前陣子有朋友開始學 React 問到 PureComponent 和 Component 的差別在哪裡，剛好順便寫下來做個簡單筆記。
      </Text>
      <Text>
        簡單來講就是 PureComponent 實作 shouldComponentUpdate 這個方法，將 render 進行優化，避免不必要的 render。
      </Text>
      <Text>
        PureComponent 會用 shallow compare 的方式對新進來的 props 或是 state 做比較，如果和之前的 props 或 state 一樣就會跳過 render。
      </Text>
      <Text meta={[{
        start: 28,
        end: 29,
        url: 'https://stackoverflow.com/questions/36084515/how-does-shallow-compare-work-in-react',
        type: ARTICLE_META_TYPE.LINK,
      }]}
      >
        如果對於 shallow compare 不清楚可以參考這裡。
      </Text>
      <Text meta={[{
        start: 20,
        end: 23,
        url: 'https://codesandbox.io/s/pure-component-42dsw?from-embed',
        type: ARTICLE_META_TYPE.LINK,
      }]}
      >
        或許這樣說明不太清楚，我做了一個簡單的 demo 可以自己玩玩看。
      </Text>
      <Iframe
        src="https://codesandbox.io/embed/pure-component-42dsw?fontsize=14&hidenavigation=1"
        title="pure component"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
      <Text meta={[{
        start: 107,
        end: 133,
        type: ARTICLE_META_TYPE.STRONG,
      }]}
      >
        可以觀察看看在 App extend PureComponent 和 Component 時 log 的情形，當使用 PureComponent 時，如果原本的 userName 是 Anymore 那麼當你按下 change user name to Anymore 這個按鈕時是不會有 log 的，因為值一樣都是 Anymore，但 Component 則會有 log。
      </Text>
      <Text>
        那麼什麼時候該用 PureComponent？既然會優化的話是不是每次都用就好了？
      </Text>
      <Text>
        我的原則是，如果你預期到這個元件會很常接收到新的 props 或者是 state 那麼我會選擇使用 Component (function component 則是用 memo)，因為如果接受到新的 props 或 state 的頻率非常高，每次都在進行 shallow compare 不見得效能會比較好，反而有可能是變差的！
      </Text>
      <Text meta={[{
        start: 26,
        end: 33,
        type: ARTICLE_META_TYPE.STRONG,
      }]}
      >
        另外還需要注意避免傳入的 props 是不是每次都是新的物件或是陣列，可以參考相關資料。
      </Text>
      <Reference
        list={[{
          text: 'React.PureComponent’s children',
          url: 'https://blog.cloudboost.io/react-purecomponents-children-979e3da15ba8',
        }, {
          text: 'React, Inline Functions, and Performance',
          url: 'https://cdb.reacttraining.com/react-inline-functions-and-performance-bdff784f5578',
        }, {
          text: 'React 效能優化 — PureComponent',
          url: 'https://medium.com/@xyz030206/react-%E6%95%88%E8%83%BD%E5%84%AA%E5%8C%96-purecomponent-f971fb56f90a',
        }]}
      />
    </>
  );
}

export default memo(Article4);
