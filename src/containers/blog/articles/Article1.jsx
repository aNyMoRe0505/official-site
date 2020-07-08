import React, { memo } from 'react';

import Text from '../../../components/blog/Text';
import Title from '../../../components/blog/Title';
import Image from '../../../components/blog/Image';
import List from '../../../components/blog/List';

import { ARTICLE_META_TYPE } from '../../../helper/article';

function Article1() {
  return (
    <>
      <Title>
        探討為何 React Hook 的執行順序很重要
      </Title>
      <Text>
        會想記錄是因為之前在看 hooks 的官方文件時，有些疑惑和不懂的地方。
      </Text>
      <Image
        src="https://miro.medium.com/max/1400/1*75I8aGGTcXjuvN4tbQT33w.png"
      />
      <Image
        remark="React 官方文件有關 Hooks 的說明"
        src="https://miro.medium.com/max/1400/1*JHOEOV7gWik1zDQMz1go2g.png"
      />
      <Text>
        可以從圖片中說明得知，hooks 不應該在迴圈或者是特定條件執行，因為這些會有可能造成 component 在每次 render 時，hooks 的執行順序不一樣導致bug。
      </Text>
      <Text>
        為什麼必須確保 hooks 的執行順序在每次 render 時保持一樣？在官方文件中也有給了說明。
      </Text>
      <Image
        src="https://miro.medium.com/max/1400/1*HzYYQNSCYG-9XYU1aHN_3w.png"
      />
      <Text
        meta={[{
          start: 19,
          end: 29,
          type: ARTICLE_META_TYPE.STRONG,
        }]}
      >
        在官方文件中提到，React 是依據 hook 被呼叫的順序知道哪個 state 要對應到哪個 useState，在這個範例中每次 component render，hook 的呼叫順序始終保持一樣(由上至下)。
      </Text>
      <Text>
        如果我們在條件式中使用 hook，將會有可能導致呼叫的順序改變。
      </Text>
      <Image
        remark="條件式造成此 hook 不一定會在每次 render 執行"
        src="https://miro.medium.com/max/1400/1*m6sfTDa0k61OZQLSygS_Ww.png"
      />
      <Image
        remark="造成順序不一樣，所以 hook 會拿不到正確的資料"
        src="https://miro.medium.com/max/1400/1*9kuUDvkgdCOLIj1LRSJ0AQ.png"
      />
      <Text>
        最後官方也提到了如果想要有條件的執行可以這樣寫。
      </Text>
      <Image
        src="https://miro.medium.com/max/1400/1*6obi5NHqKpnw2XujTDDmrw.png"
      />
      <Text
        meta={[{
          start: 23,
          end: 74,
          type: ARTICLE_META_TYPE.STRONG,
        }]}
      >
        看到這邊我能理解為什麼順序很重要，但還是想探討為什麼 React 是依據 hook 被呼叫的順序知道哪個 state 要對應到哪個 useState？研究了一下找到了解答。
      </Text>
      <Text>
        其實 hooks 是使用 array 的方式來管理 state，假設我們使用 useState，其實就是建立了兩個空 array 分別存放 state 以及 setters。
      </Text>
      <Image
        src="https://miro.medium.com/max/1400/1*4GFZTa9Af5HLz0OijnhQnw.png"
      />
      <Text>
        也就是 firstHook 值，其實就是 state[0] 的值，setFirstHook(‘value’) 其實就是更改 state[0] 的值。
      </Text>
      <Text
        meta={[{
          start: 5,
          end: 6,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e',
        }]}
      >
        底下是某篇文章所寫的 pseudocode，用來展示實際情況會是什麼樣子。
      </Text>
      <Image
        src="https://miro.medium.com/max/1400/1*jMybn5q4cgIjUDkdmKQBBg.png"
      />
      <Text
        meta={[{
          start: 16,
          end: 20,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 25,
          end: 31,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 36,
          end: 40,
          type: ARTICLE_META_TYPE.STRONG,
        }]}
      >
        最上方建立了兩個空 array，state 以及 setters，以及 index。
      </Text>
      <Text>
        12 ~ 23 行就是在模擬 useState 在實際 component 中的邏輯。
      </Text>
      <Text
        meta={[{
          start: 89,
          end: 96,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 101,
          end: 112,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 118,
          end: 126,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 156,
          end: 162,
          type: ARTICLE_META_TYPE.STRONG,
        }]}
      >
        如果component 是第一次 render (setters 的長度會等於 index)，我們會將第一個 useState(‘value’) 的 value 當作初始值推進 state[0]，並用 createSetter 建立更改 state[0] 值的 setter(setFirstHook) 並推進 setters，之後第二、第三個 useState 以此類推。
      </Text>
      <Image
        src="https://miro.medium.com/max/1400/1*eGBGN4MUvzmg6f6MN4pXUA.png"
      />
      <Text
        meta={[{
          start: 51,
          end: 55,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 63,
          end: 69,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 78,
          end: 82,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 135,
          end: 139,
          type: ARTICLE_META_TYPE.STRONG,
        }]}
      >
        上面這張圖模擬 component 重新 render 的情況，所以在第二次 render 的情況下，index 重新變回0、setters 的長度不等於 index，setter(setFirstHook) 以及 state (firstHook)會根據順序用當前的 index 取得原本的值。
      </Text>
      <Image
        remark="18 ~ 19 行根據 index 取值"
        src="https://miro.medium.com/max/1400/1*_xKQXwrYa7Ree9xtaipxvw.png"
      />
      <Text meta={[{
        start: 88,
        end: 92,
        type: ARTICLE_META_TYPE.STRONG,
      }]}
      >
        看到這裡應該就能明白為什麼 hooks 的執行順序很重要，如果 hooks 在條件式內執行導致第一次 render 和 後續 render 順序不同，hook 將會使用錯誤的 index 取得錯誤的資料！
      </Text>
      <List
        title="參考資料"
        list={[{
          meta: [{
            start: 0,
            end: 13,
            type: ARTICLE_META_TYPE.LINK,
            url: 'https://reactjs.org/docs/hooks-rules.html',
          }],
          text: 'Rules of Hooks',
        }, {
          meta: [{
            start: 0,
            end: 34,
            type: ARTICLE_META_TYPE.LINK,
            url: 'https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e',
          }],
          text: 'React hooks: not magic, just arrays',
        }]}
      />
    </>
  );
}

export default memo(Article1);
