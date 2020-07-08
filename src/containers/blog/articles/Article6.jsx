import React, { memo } from 'react';

import Text from '../../../components/blog/Text';
import Title from '../../../components/blog/Title';
import Code from '../../../components/blog/Code';
import List from '../../../components/blog/List';

import { ARTICLE_META_TYPE } from '../../../helper/article';

function Article6() {
  return (
    <>
      <Title>
        usePrevious Hook - 探討如何在 function component 取得之前的 props/state
      </Title>
      <Text
        meta={[{
          start: 28,
          end: 45,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://zh-hant.reactjs.org/docs/react-component.html#componentdidupdate',
        }, {
          start: 61,
          end: 71,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        以前在寫 class component 時我們可以在 componentDidUpdate 這個生命週期來取得前一次的 props/state
      </Text>
      <Text
        meta={[{
          start: 6,
          end: 7,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/',
        }]}
      >
        我其實是看到這篇文章寫得很好，想說整理用我的破英文翻譯一下，順便加深記憶XD
      </Text>
      <Text
        meta={[{
          start: 12,
          end: 22,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 29,
          end: 38,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state',
        }]}
      >
        其實關於如何取得之前的 props/state 已經有在 React 官方文件中出現
      </Text>
      <Code>
        {`function Counter() {
  const [count, setCount] = useState(0);

  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });
  const prevCount = prevCountRef.current;

  return <h1>Now: {count}, before: {prevCount}</h1>;
}`}
      </Code>
      <Text
        meta={[{
          start: 26,
          end: 36,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        可以把這段邏輯拆成 hook 來用，也就是標題上的 usePrevious
      </Text>
      <Code>
        {`function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return <h1>Now: {count}, before: {prevCount}</h1>;
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}`}
      </Code>
      <Text>
        至於原理或是如何運作在文件中並沒有提到，所以就來探討一下吧！
      </Text>
      <Text
        meta={[{
          start: 0,
          end: 5,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 65,
          end: 75,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        useRef 不只可以用來做 DOM 的 refs 處理，其實也可以當作變數來使用，並且回傳一個 obj，如果要取值的話可以直接 obj.current 就行了
      </Text>
      <Code>
        {`function Count() {
  const specialVariable = useRef("SPECIAL_VARAIBLE");
  // specialVariable resolves to {current: "SPECIAL_VARIABLE"}

  return null
}`}
      </Code>
      <Text
        meta={[{
          start: 2,
          end: 17,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        那麼specialVariable和一般的變數有什麼差別？
      </Text>
      <Text
        meta={[{
          start: 0,
          end: 14,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 34,
          end: 38,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        specialVariable 這個 ref object 即使在 Count 這個 component re-render 的情況下也不會重複計算，也就是 ref object 即使在 re-render 的情況下都會保持一樣 (the value saved in the ref object is kept the same across re-renders)
      </Text>
      <Text
        meta={[{
          start: 45,
          end: 69,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        這就是為什麼可以取得之前的值最主要的原因。改變 ref current 的值唯一的方法是 ref.current = &apos;NEW VALUE&apos;
      </Text>
      <Text
        meta={[{
          start: 37,
          end: 45,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        我的理解是因為每次 re-render ref object 都是同一個 reference，所以就算直接更改 current 的值對於 component 來說也是同個東西，所以不會造成 re-render，所以也就能取得上一次的值！
      </Text>
      <Text>
        再來我們一步步探討以下這段程式碼
      </Text>
      <Code>
        {`// custom hook for getting previous value 
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// the App where the hook is used 
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count)

  return <h1>Now: {count}, before: {prevCount}</h1>;
}

// How the App is rendered 
<Counter />`}
      </Code>
      <Text
        meta={[{
          start: 3,
          end: 9,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 17,
          end: 24,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 30,
          end: 34,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        首先 Counter 第一次執行 useState 執行將 count 設成0
      </Text>
      <Text>
        再來13行將0帶進 usePrevious 並呼叫
      </Text>
      <Text>
        第3行新增一個 ref object, current 為 undefinded
      </Text>
      <Text strong>
        再來 4-6 行 (useEffect) 並不會馬上執行，會直接執行第七行把 ref 回傳
      </Text>
      <Text
        meta={[{
          start: 22,
          end: 60,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 66,
          end: 72,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        蛤？為什麼 useEffect 被跳過了？ useEffect 會在呼叫他的 component render 完後才執行，也就是 Counter
      </Text>
      <Text
        meta={[{
          start: 3,
          end: 11,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        所以 prevCount 的結果第一次會是 undefinded，並且進行 render
      </Text>
      <Text
        meta={[{
          start: 39,
          end: 65,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        render 完成後我們才會執行剛剛 4-6 行被跳過的 useEffect，將 ref current 的值設成一開始傳進去的 0
      </Text>
      <Text
        meta={[{
          start: 25,
          end: 81,
          type: ARTICLE_META_TYPE.STRONG,
        }]}
      >
        所以如果我們將 count 設置1，重複以上流程，render 的 prevCount 會是上一次的 0，prevCount 的值會在 render 後才更新成1！
      </Text>
      <Text
        meta={[{
          start: 4,
          end: 14,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        這就是 usePrevious 為什麼能取得上一次值的原理
      </Text>
      <List
        title="參考資料"
        list={[{
          meta: [{
            start: 0,
            end: 47,
            url: 'https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/',
            type: ARTICLE_META_TYPE.LINK,
          }],
          text: 'How to get previous props/state with React Hooks (可以看看原文解釋會更清楚)',
        }]}
      />
    </>
  );
}

export default memo(Article6);
