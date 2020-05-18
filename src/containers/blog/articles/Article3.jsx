import React from 'react';
import styled from 'styled-components';

import Text from '../../../components/blog/Text';
import Title from '../../../components/blog/Title';
import Image from '../../../components/blog/Image';
import List from '../../../components/blog/List';

import { ARTICLE_META_TYPE } from '../../../helper/article';

const SmallerImage = styled(Image)`
  max-width: 480px;
`;

function Article3() {
  return (
    <>
      <Title>
        GraphQL Apollo Cache
      </Title>
      <Text>
        之前在用 React Apollo Client 來串接 GraphQL API 碰到了一些有關快取的問題，在這邊筆記一下。
      </Text>
      <Image
        src="https://miro.medium.com/max/1360/1*BzeM8yhiSwERTGvM3h1V4A.jpeg"
      />
      <Text>
        在探討 Apollo Cache 問題之前，要先了解在 Apollo Client 是如何快取 API 回來的資料。
      </Text>
      <Image
        src="https://miro.medium.com/max/1400/1*oj0VzMPDdKdsyT8z_hsw1Q.jpeg"
      />
      <Text
        meta={[{
          start: 52,
          end: 65,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 69,
          end: 78,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 84,
          end: 93,
          type: ARTICLE_META_TYPE.STRONG,
        }]}
      >
        上圖是 log 從 GraphQL 回來的資料，這是拉取文章的 API，Apollo 快取是依據資料的 id(primaryKey) 和 __typename 來進行。__typename 是預設 Apollo 自動加上去的(根據後端設計 API type 所決定)。
      </Text>
      <Text>
        那麼假設現在有隻根據身分證拉取特定會員資料的API
      </Text>
      <Image src="https://miro.medium.com/max/1208/1*e_x9VO7hVmfH0YAp7RzeYw.jpeg" />
      <Text
        meta={[{
          start: 11,
          end: 14,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 46,
          end: 50,
          type: ARTICLE_META_TYPE.STRONG,
        }]}
      >
        上面分別是會員類型的 type 身分證(primaryKey)、姓名、電話 以及前端拉取的 Query 和最後印出來的結果。
      </Text>
      <Text
        meta={[{
          start: 18,
          end: 19,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 24,
          end: 33,
          type: ARTICLE_META_TYPE.STRONG,
        }]}
      >
        前面有提到說 Apollo 是根據 id 以及 __typename 來進行快取，但在這個範例中會員的 idCardNumber 取代了 id 來當作 primayKey，這樣 Apollo 就無法正常的快取會員的資料。
      </Text>
      <Text>
        這時候你可以跑去跟後端拜託能不能把 idCardNumber 改成 id XD 或者是我們可以在前端建立 Apollo Client 時，利用 Apollo 提供的 dataIdFromObject。
      </Text>
      <Image src="https://miro.medium.com/max/1356/1*sDZfx_7Ur3Db8lv9sM1i2Q.jpeg" />
      <Text>
        可以看到我們利用 switch 來根據類型(typename)來決定該類型要用什麼欄位當作快取的依據(id)，在上圖當我們遇到 type 為 Member 時，要以 idCardNumber 來當作快取的依據，這樣一來 Apollo 就能正常快取 Member
      </Text>
      <Text>
        以上就是 Apollo 是如何進行快取的方式，接下來要談的是我之前所遇到的問題，用某篇文章提供的範例來解釋。
      </Text>
      <Text>
        假設現在我們有拉取 Product 的 API，而一個 Product 有多種顏色(Color)，其中某個顏色為該產品的主要顏色。
      </Text>
      <Image src="https://miro.medium.com/max/1400/1*WzXyIolWIBNQs1FyFK5uKw.jpeg" />
      <Text>
        我們預期的結果回是這樣子
      </Text>
      <SmallerImage src="https://miro.medium.com/max/910/1*84RUfZGvBYRNy160ZfcT8w.png" />
      <Text
        meta={[{
          start: 8,
          end: 9,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 14,
          end: 15,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 32,
          end: 46,
          type: ARTICLE_META_TYPE.STRONG,
        }]}
      >
        總共有兩個產品 hi 以及 yo，這兩個產品都有兩個顏色，各自的主要顏色也不一樣(紅色和黃色)，Apollo 會怎麼 cache 呢？
      </Text>
      <Text
        meta={[{
          start: 8,
          end: 12,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 16,
          end: 32,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 38,
          end: 39,
          type: ARTICLE_META_TYPE.STRONG,
        }]}
      >
        首先利用產品的 id(1)、和 typename(Product) 快取產品hi ，然後利用顏色的 id 和 typename(Color) 來快取產品hi的顏色，之後以此類推。
      </Text>
      <Text
        meta={[{
          start: 23,
          end: 27,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 31,
          end: 47,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 53,
          end: 54,
          type: ARTICLE_META_TYPE.STRONG,
        }]}
      >
        之後 Apollo 快取第二個產品，一樣利用 id(2)、和 typename(Product) 快取產品yo，再來移動到第一個顏色，顏色紅色 (id = 1, typename = Color) 由於在產品hi時就有快取了，所以 Apollo 會重複利用該快取！
      </Text>
      <Text>
        所以實際上我們得到的結果會是這樣子
      </Text>
      <SmallerImage src="https://miro.medium.com/max/1170/1*EsdOwmPPCCd7lVvC9NPcUw.png" />
      <Text>
        由於快取的關係導致回來的資料不符合預期，產品yo有了兩個主要顏色(is_primay = true)。我認為 Apollo 快取的方式很合理，正常來講同樣的 id 本應就該得到相同的結果，不然就不叫做 id 了，同樣的身分證就應該要找到同個人！
      </Text>
      <Text>
        在這個問題中最佳的解法應該是後端要更改產品回傳的 schema，將 is_primary 移除，回傳的欄位多新增一個 primaryColor。
      </Text>
      <Image src="https://miro.medium.com/max/1400/1*TkFSI8g4g5EhMPlR4rOEVQ.png" />
      <Text>
        但是有可能後端系統的架構很複雜導致更改困難或者有其他難處，在前端我們可以選擇不要快取 Color，前面提到我們是利用 id 以及 __typename 進行快取，那麼我們只要把 id 或者 __typename 移除就可以了。
      </Text>
      <Image src="https://miro.medium.com/max/1400/1*WUiEb82xXtBp9Gq40Epvvg.png" />
      <Text>
        當初發現這個問題時懊惱了許久XD 後來才發現是快取的問題，在這裡寫下這篇提醒自己不管是在前端或後端，在設計 schema 時要特別注意小心。
      </Text>
      <List
        title="參考資料"
        list={[{
          meta: [{
            start: 0,
            end: 56,
            type: ARTICLE_META_TYPE.LINK,
            url: 'https://kamranicus.com/posts/2018-03-06-graphql-apollo-object-caching',
          }],
          text: 'Elusive Bugs with GraphQL Object Caching in Apollo Client',
        }]}
      />
    </>
  );
}

export default Article3;
