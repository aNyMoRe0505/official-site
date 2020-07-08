import React, { memo } from 'react';

import Text from '../../../components/blog/Text';
import Title from '../../../components/blog/Title';
import Image from '../../../components/blog/Image';

import { ARTICLE_META_TYPE } from '../../../helper/article';

function Article2() {
  return (
    <>
      <Title>
        Webpack Config 變化
      </Title>
      <Text>
        會想要寫這篇是因為在公司寫的 webpack config 有些變化，覺得還蠻值得筆記XD
      </Text>
      <Text
        meta={[{
          start: 9,
          end: 14,
          type: ARTICLE_META_TYPE.STRONG,
        }, {
          start: 21,
          end: 32,
          type: ARTICLE_META_TYPE.STRONG,
        }]}
      >
        最主要的改變是在 output 和 多了 optimization，以前寫的 config 會長這樣
      </Text>
      <Image
        remark="以前的設定"
        src="https://miro.medium.com/max/1400/1*lrzxMVgdXNAQxQom0yY7-Q.png"
      />
      <Text>
        也就是說我們會將打包好的東西丟到目錄底下的 dist，並且把打包好的檔案取名叫做 bundle.js，實際運行完之後 dist 底下會是這個樣子。
      </Text>
      <Image src="https://miro.medium.com/max/1072/1*jdyVsoYOJzQmhbbuPRFNEA.png" />
      <Text>
        會發現有 bundle.js 以及其他被打包的資源，為了讓網頁讀取我們會在 index.html 會引入 bundle。
      </Text>
      <Image src="https://miro.medium.com/max/1400/1*jaYY60pWwNjxgi_Cb4BSyw.png" />
      <Text>
        以上是之前的設定，之後的設定變成這樣。
      </Text>
      <Image src="https://miro.medium.com/max/1400/1*4TeFYONeWebJO2-qhAzP3g.png" />
      <Text>
        可以發現到我們不再將打包好的檔案叫做 bundle.js，而是用 hash 的方式去命名(name 預設會是 main)並且多了 optimization。
      </Text>
      <Text>
        先來看看打包完成後 dist 底下會是什麼樣子。
      </Text>
      <Image src="https://miro.medium.com/max/1120/1*9ehVx26eN9X1lHR7VhfOuA.png" />
      <Text>
        會發現我們的打包檔案名稱會變成 main.[hash]，和多了一個 vendor.[hash]
      </Text>
      <Text>
        為什麼要這樣做呢？主要的原因是因為瀏覽器會進行快取，也就是說如果我們打包好的檔案叫做 bundle，使用者第一次進到網頁會將 bundle 下載回來，第二次再進到網頁時因為 bundle 下載過了，就會使用快取的檔案。
      </Text>
      <Text>
        這樣有什麼問題呢？如果今天我們更新了網頁內容但打包輸出的檔案依然叫做 bundle，那使用者再次進到網頁由於快取的關係會看到舊的內容！使用者必須清除快取才能看到最新的內容，這樣其實並不合理，所以我們將輸出的檔案名稱改為 main.[hash]。
      </Text>
      <Text>
        至於 optimization 則是想把 node_modules 切開來，因為 modules 不會很常變動，將它切開讓主體的 bundle 不要那麼肥。也因為瀏覽器會快取，使用者也不用每次都下載節省了流量。
      </Text>
      <Text>
        到這裡或許你會有一個疑問，在之前我們會在 index.html 引入打包好的檔案，那現在名字改變該怎麼辦呢？
      </Text>
      <Text>
        這時候我們會透過一個 html-webpack-plugin 的套件。
      </Text>
      <Image src="https://miro.medium.com/max/1400/1*TaCes2Me5IDZfwtwmAPuAQ.png" />
      <Text>
        這個套件主要的功用就是可以在 index.html 自動引入我們輸出好的檔案，並且能夠選擇以自己寫好的 index.html 來當作 template，加上這個 plugin 後我們打包的資料夾會是這個樣子。
      </Text>
      <Image src="https://miro.medium.com/max/1124/1*TyxN-RVh_5NbJGt4EJd7Kg.png" />
      <Text>
        會發現多了 index.html 而裡面則會自動幫我們引入打包好的檔案！
      </Text>
      <Image src="https://miro.medium.com/max/1400/1*utFvaDKGL6w9XxuC15CDJw.png" />
      <Text>
        這樣以後就不用擔心使用者會讀取到舊的內容了！
      </Text>
    </>
  );
}

export default memo(Article2);
