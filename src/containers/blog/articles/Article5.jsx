import React, { memo } from 'react';

import Text from '../../../components/blog/Text';
import Title from '../../../components/blog/Title';
import Image from '../../../components/blog/Image';
import Code from '../../../components/blog/Code';

import { ARTICLE_META_TYPE } from '../../../helper/article';

function Article5() {
  return (
    <>
      <Title>
        React state update on an unmounted component
      </Title>
      <Image remark="這次主題碰到的錯誤訊息" src="https://i.imgur.com/rs8Y9jU.png" />
      <Text>
        這篇文章想記錄的是上面那張圖碰到的錯誤訊息，從字面上來看就是我們在 component unmount 後才去更新 state
      </Text>
      <Text
        meta={[{
          start: 18,
          end: 19,
          url: 'https://anymore0505.github.io/official-site/',
          type: ARTICLE_META_TYPE.LINK,
        }]}
      >
        這樣可能會有點不太明白，所以就直接以首頁的動畫來解釋 (藍色技能波浪)
      </Text>
      <Text
        meta={[{
          start: 67,
          end: 68,
          url: 'https://github.com/aNyMoRe0505/official-site',
          type: ARTICLE_META_TYPE.LINK,
        }]}
      >
        我想要讓波浪動畫執行完一次之後，等待1.5秒後再進行一次波浪動畫，於是我最初寫了一個 custom hook 如下 (相關原始碼可以在這裡看)
      </Text>
      <Code>
        {`export function useRepeatedAnimation(gapTime) {
    const [actived, setActived] = useState(true);
    const animationElement = useRef();

    useEffect(() => {
      const element = animationElement.current;

      const animationEndFunc = () => {
        setActived(false);

        setTimeout(() => {
          setActived(true);
        }, gapTime);
      };

      element.addEventListener('animationend', animationEndFunc);

      return () => {
        element.removeEventListener('animationend', animationEndFunc);
      };
    }, [gapTime]);

    return [animationElement, actived];
  }`}
      </Code>
      <Text>
        方向很簡單，最後一個藍色技能動畫執行結束 =&gt; 將動畫css拔掉 =&gt; 等待幾秒 =&gt; 把動畫css加回去
      </Text>
      <Text>
        gapTime決定要等待幾秒，用 useState(actived) 來當作 flag，並用 useRef 抓取最後一個藍色技能框框
      </Text>
      <Text
        meta={[{
          start: 11,
          end: 19,
          url: 'https://github.com/aNyMoRe0505/official-site/blob/master/src/containers/About.jsx',
          type: ARTICLE_META_TYPE.LINK,
        }]}
      >
        這樣我就能在我想要的 component 使用這個 hook 來決定動畫的拔掉與否了
      </Text>
      <Text>
        雖然看起來很美好，但後來才發現偶爾切換畫面時會噴上面那張圖的錯誤
      </Text>
      <Text>
        原因是因為 11 ~ 13 行，我們利用 setTimeout 在特定的 gapTime 後更新 actived 的狀態
      </Text>
      <Text meta={[{
        start: 2,
        end: 4,
        type: ARTICLE_META_TYPE.STRONG,
      }]}
      >
        由於非同步的關係，所以假設我們設定兩秒後更新狀態，然後在一秒後就離開該 component
      </Text>
      <Text meta={[{
        start: 27,
        end: 64,
        type: ARTICLE_META_TYPE.STRONG,
      }]}
      >
        兩秒後 callback 回來更新狀態，這就是所謂的 state update on an unmounted component
      </Text>
      <Text>
        那該怎麼辦呢？其實也很簡單
      </Text>
      <Code>
        {`export function useRepeatedAnimation(gapTime) {
  const [actived, setActived] = useState(true);
  const animationElement = useRef();

  useEffect(() => {
    let unMounted = false;
    const element = animationElement.current;

    const animationEndFunc = () => {
      setActived(false);

      setTimeout(() => {
        if (!unMounted) setActived(true);
      }, gapTime);
    };

    element.addEventListener('animationend', animationEndFunc);

    return () => {
      unMounted = true;
      element.removeEventListener('animationend', animationEndFunc);
    };
  }, [gapTime]);

  return [animationElement, actived];
}`}
      </Code>
      <Text meta={[{
        start: 17,
        end: 25,
        type: ARTICLE_META_TYPE.STRONG,
      }]}
      >
        可以在第六行發現我們加了一個變數 unMounted
      </Text>
      <Text>
        我們在 component unMount 時將該變數設成 true
      </Text>
      <Text>
        這樣一來即使 setTimeout 執行 callback，13行會擋住更新 state！
      </Text>
      <Text>
        真是可喜可賀 可喜可賀
      </Text>
    </>
  );
}

export default memo(Article5);
