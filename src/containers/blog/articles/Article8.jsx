import React from 'react';

import Text from '../../../components/blog/Text';
import Title from '../../../components/blog/Title';
import SubTitle from '../../../components/blog/SubTitle';
import Code from '../../../components/blog/Code';
import List from '../../../components/blog/List';
import Image from '../../../components/blog/Image';

import { ARTICLE_META_TYPE } from '../../../helper/article';

function Article8() {
  return (
    <>
      <Title>
        CORS & CSRF 筆記
      </Title>
      <Text
        meta={[{
          start: 12,
          end: 16,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 26,
          end: 39,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        因為以前做的案子都是以 Token 來當作驗證機制，Cookie、Session 的機制還不是很熟悉，所以筆記一下，然後提 CSRF 和 CORS
      </Text>
      <SubTitle>
        Session & Cookie
      </SubTitle>
      <Text
        meta={[{
          start: 0,
          end: 34,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://github.com/aszx87410/blog/issues/45',
        }]}
      >
        Session 就是讓 request 變成 stateful 的機制，可以透過網址列來達成，而 Cookie 是最普遍的方式，讓瀏覽器和 Server 交換資料
      </Text>
      <Text
        meta={[{
          start: 14,
          end: 26,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        以驗證來說流程就是使用者打 domainA/login API，Server 驗證完後把使用者的資訊存在 session database，並且利用 session id 來做關聯
      </Text>
      <Text
        meta={[{
          start: 20,
          end: 29,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 65,
          end: 109,
          type: ARTICLE_META_TYPE.STRONG,
        }]}
      >
        結束後回給使用者登入成功的訊息，並且用 Set-Cookie 的方式告訴瀏覽器要將 session id 存在 cookie 中。(session id 要進行加密的動作，因為使用者其實是可以自己更改 cookie 的)
      </Text>
      <Text
        meta={[{
          start: 8,
          end: 14,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        日後使用者對該 domainA 進行 request 的動作時，瀏覽器會將該 cookie 一併帶給 Server，如此一來 Server 就可以利用帶過來的 session id 來判斷你是誰
      </Text>
      <SubTitle>
        CORS & CSRF
      </SubTitle>
      <Text>
        簡單筆記 Session & Cookie 後提個 CSRF (Cross-site request forgery) 跨站請求偽造，因為 CSRF 和 Cookie Session 認證機制很有關係
      </Text>
      <Text
        meta={[{
          start: 12,
          end: 18,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 35,
          end: 37,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        假設今天使用者 A 是 domainA 的管理者，並且有一隻 API GET domainA/delete?id=1 可以將 domainA id 為 1 的文章刪除
      </Text>
      <Text>
        使用者 A 登入後瀏覽器 cookie 就會有 session id，所以 A 發起刪除 request時，瀏覽器會將 cookie 中的 session id 帶給 Server
      </Text>
      <Text>
        Server 就可以做相關認證然後將文章刪除。那 CSRF 是什麼呢？
      </Text>
      <Text
        meta={[{
          start: 0,
          end: 28,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 42,
          end: 48,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        瀏覽器是依據你對哪個網址發出請求帶上相對應的 cookie，假設今天有人心懷不軌在 domainB 插入以下 tag
      </Text>
      <Text
        meta={[{
          start: 0,
          end: 61,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        {'<img src="https://domainA/delete?id=1" width="0" height="0" />'}
      </Text>
      <Text>
        如果進到該網站前 A 已經登入過，進入後會在不知情的情況下將文章給刪除，這就是跨站請求偽造
      </Text>
      <Text
        meta={[{
          start: 59,
          end: 64,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        至於有哪些防禦方式可以看放在下面的參考資料，像是 csrf token，不過最根本的方式應該是檢查請求來源是否為同的 domain
      </Text>
      <Text>
        在 server side 我們可以檢查 header 中的 origin 判斷是不是同個網域，就能確保不是從其他網域發來的 request 來避免 csrf 攻擊
      </Text>
      <Text
        meta={[{
          start: 39,
          end: 46,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        另外還有比較新的防禦方式，server 在 Set-Cookie 時可以加上 SameSite，這樣瀏覽器就只會對同個網域的請求戴上 cookie，這部分也可以到下面的參考資料閱讀
      </Text>
      <Text>
        再來提一下 CORS (Cross-Origin Resource Sharing) 跨來源資源共用，以上提到的 domainB 向 domainA 請求就是跨來源請求
      </Text>
      <Text>
        在開發接 API 的過程中大部分的人都會遇到這個問題
      </Text>
      <Text
        meta={[{
          start: 30,
          end: 31,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS',
        }]}
      >
        當然並不是所有請求都有該限制，像是 img 就不需要，可以到這裡看個詳細，主要是透過程式碼發出的請求就會受到同源政策的限制 (Fetch)
      </Text>
      <Text>
        可能會想說既然有這個限制為什麼還會有 CSRF 呢
      </Text>
      <Text>
        除了上面提到的 img 不需要以外，如果是簡單請求，瀏覽器只會把 server 的回應擋下來，但其實還是會打進 server 的 endpoint
      </Text>
      <Text>
        像是如果我們有一隻 /testCors 的 GET API
      </Text>
      <Code>
        {`testRouter.get('/testCors', async (ctx) => {
  console.log('ctx.headers', ctx.header);
  ctx.body = {
    message: 'hello world',
  }
});`}
      </Code>
      <Text>
        然後我們利用 fetch 去打API，會發現瀏覽器會跳以下錯誤訊息
      </Text>
      <Image remark="CORS" src="https://i.imgur.com/2U0UZdO.png" />
      <Text>
        但其實我們看 server log 其實是有打進該API的
      </Text>
      <Image remark="Server Log" src="https://i.imgur.com/NwfatkZ.png" />
      <Text>
        但如果今天是會觸發預檢請求的 request 的話呢？把 GET 改成 DELETE
      </Text>
      <Code>
        {`testRouter.delete('/testCors', async (ctx) => {
  console.log('ctx.headers', ctx.header);
  ctx.body = {
    message: 'hello world',
  }
});`}
      </Code>
      <Text>
        會發現瀏覽器一樣會跳錯誤訊息，但是 server log 會發現跟之前不同，打進去之前就被擋下來了
      </Text>
      <Text>
        簡單筆記筆記 以後忘記再回來翻
      </Text>
      <List
        title="參考資料"
        list={[{
          meta: [{
            start: 0,
            end: 10,
            type: ARTICLE_META_TYPE.LINK,
            url: 'https://blog.techbridge.cc/2017/02/25/csrf-introduction/',
          }],
          text: '讓我們來談談 CSRF',
        }, {
          meta: [{
            start: 0,
            end: 13,
            type: ARTICLE_META_TYPE.LINK,
            url: 'https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS',
          }],
          text: '跨來源資源共用 (CORS)',
        }, {
          meta: [{
            start: 0,
            end: 18,
            type: ARTICLE_META_TYPE.LINK,
            url: 'https://blog.kalan.dev/cors-and-cookie/',
          }],
          text: '和 CORS 與 cookie 打交道',
        }]}
      />
    </>
  );
}

export default Article8;
