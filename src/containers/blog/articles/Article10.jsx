import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import Text from '../../../components/blog/Text';
import Title from '../../../components/blog/Title';
import Code from '../../../components/blog/Code';
import List from '../../../components/blog/List';
import Image from '../../../components/blog/Image';

import { ARTICLE_META_TYPE } from '../../../helper/article';
import { debounce } from '../../../helper/helper';

import backgroundImg from '../../../static/background.jpeg';

const Background = styled.div`
  width: 100%;
  height: 250px;
  margin: 30px 0 0;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  background-attachment: ${({ fixed }) => (fixed && 'fixed') || 'scroll'};
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    margin: 15px 0 0;
  };
`;

const ActivedMode = css`
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: -30px;
    background-image: url(${backgroundImg});
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    filter: blur(5px);
    z-index: -1;
  };
`;

const SimpleFrostedGlass = styled.div`
  width: calc(100% - 50px);
  height: 200px;
  background-color: hsla(0, 0%, 100%, 0.5);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 17px rgba(0, 0, 0, 0.6);
  color: black;
  font-size: 30px;
  ${({ blur }) => blur && 'filter: blur(5px)'};
  ${({ actived }) => actived && ActivedMode};
`;

const Mask = styled.div`
  position: absolute;
  z-index: -1;
  width: ${({ containerWidth }) => `${containerWidth}px`};
  height: ${({ containerHeight }) => `${containerHeight}px`};
  background-image: url(${backgroundImg});
  background-position: center;
  background-size: cover;
  filter: blur(5px);
`;

function Article10() {
  const [coverContainerRect, setCoverContainerRect] = useState({});
  const coverContainerRef = useRef();

  useEffect(() => {
    setCoverContainerRect(coverContainerRef.current.getBoundingClientRect());

    const resize = () => {
      setCoverContainerRect(coverContainerRef.current.getBoundingClientRect());
    };
    const resizeWithDebounce = debounce(resize, 500);

    window.addEventListener('resize', resizeWithDebounce);

    return () => window.removeEventListener('resize', resizeWithDebounce);
  }, []);

  return (
    <>
      <Title>
        CSS 毛玻璃
      </Title>
      <Image src="https://i.imgur.com/gdoyRS6.png" />
      <Text
        meta={[{
          start: 22,
          end: 23,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://ithelp.ithome.com.tw/articles/10208692',
        }]}
      >
        上面這張圖就是毛玻璃效果，起因是偶然看到這篇文章想說也來試試看，將遇到的問題和歷程記錄下來
      </Text>
      <Text>
        所謂的毛玻璃效果就是有點透明模糊的遮罩蓋在圖上，且字體不會模糊的效果，下面是最簡單的毛玻璃
      </Text>
      <Background>
        <SimpleFrostedGlass>
          Frosted Glass
        </SimpleFrostedGlass>
      </Background>
      <Code>
        {`const Background = styled.div'
  width: 100%;
  height: 250px;
  margin: 30px 0 0;
  background-image: url(${backgroundImg});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    margin: 15px 0 0;
  };
';
// html vv
const SimpleFrostedGlass = styled.div'
  width: calc(100% - 50px);
  height: 200px;
  background-color: hsla(0, 0%, 100%, 0.7);
  box-shadow: 0 5px 17px rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 30px;
';

<Background>
  <SimpleFrostedGlass>
    Frosted Glass
  </SimpleFrostedGlass>
</Background>`}
      </Code>
      <Text
        meta={[{
          start: 13,
          end: 30,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 35,
          end: 40,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        會發現背景沒有模糊所以在 SimpleFrostedGlass 加上 filter 屬性
      </Text>
      <Background>
        <SimpleFrostedGlass blur>
          Frosted Glass
        </SimpleFrostedGlass>
      </Background>
      <Text>
        會發現字體也模糊了，所以應該要有單獨一層來達成模糊效果，而且模糊效果不會套用到背景圖片，所以單獨的那一層也要有相同的背景圖片
      </Text>
      <Text
        meta={[{
          start: 43,
          end: 63,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 69,
          end: 73,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 94,
          end: 95,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://www.cnblogs.com/ghost-xyx/p/5677168.html',
        }, {
          start: 105,
          end: 107,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://github.com/aNyMoRe0505/official-site/blob/master/src/containers/blog/articles/Article10.jsx',
        }]}
      >
        其實 google 毛玻璃就會有很多資訊，解法都是利用偽元素和設置相同的背景，並且將 background-attachment 設置成 fixed 讓背景保持一致，先直接顯示一下網路上的教學，詳細的可以直接看原始碼或教學網站
      </Text>
      <Background fixed>
        <SimpleFrostedGlass actived>
          Frosted Glass
        </SimpleFrostedGlass>
      </Background>
      <Text>
        看起來很完美，但就是背景圖會隨著 scroll 改變讓我很不喜歡XD，解決方法也很簡單，抓取最外層 container 的寬跟高設置在偽元素就可以了，因為外層 SimpleFrostedGlass overflow 屬性為 hidden，所以也不會超出，這樣 fixed 就算拔掉背景圖的位置也會跟最外層一致
      </Text>
      <Background ref={coverContainerRef}>
        <SimpleFrostedGlass>
          Frosted Glass
          <Mask
            containerWidth={coverContainerRect.width || 0}
            containerHeight={coverContainerRect.height || 0}
          />
        </SimpleFrostedGlass>
      </Background>
      <Text>
        這樣就大功告成了，非常完美XD，再來想筆記一下有關 z-index 的東西，在製作毛玻璃效果我們會將遮罩層的 z-index 設置成 -1，上層設成 1，但是不太懂為什麼這樣做是會 work 的... (待補)
      </Text>
      <List
        title="參考資料"
        list={[{
          meta: [{
            start: 0,
            end: 15,
            type: ARTICLE_META_TYPE.LINK,
            url: 'https://ithelp.ithome.com.tw/articles/10208692',
          }],
          text: 'Secret 18: 毛玻璃效果',
        }, {
          meta: [{
            start: 0,
            end: 13,
            type: ARTICLE_META_TYPE.LINK,
            url: 'https://www.cnblogs.com/ghost-xyx/p/5677168.html',
          }],
          text: 'CSS技巧收集——毛玻璃效果',
        }]}
      />
    </>
  );
}

export default Article10;
