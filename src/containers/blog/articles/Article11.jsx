import React, { memo } from 'react';
import styled from 'styled-components';

import Text from '../../../components/blog/Text';
import Title from '../../../components/blog/Title';
import Code from '../../../components/blog/Code';
import List from '../../../components/blog/List';
import Image from '../../../components/blog/Image';
import Reference from '../../../components/blog/Reference';

import { ARTICLE_META_TYPE } from '../../../helper/article';

const StyledImage = styled(Image)`
  width: 100px;
`;

function Article11() {
  return (
    <>
      <Title>
        Jest + React Testing Library 測試初體驗
      </Title>
      <Text>
        蠻早之前就想試試看寫測試了，但一直沒有動力去玩玩看，原因是因為我一直覺得前端的測試沒什麼意義，到現在其實也這麼覺得，但我認為只是我還沒碰過大型或者業務邏輯很複雜的專案，也就是說沒有痛過XD
      </Text>
      <Text>
        隨便找一個 open source 一定都會有測試，雖然測試的強大我還不能切身體會，但我相信測試對於軟體開發是很重要的！
      </Text>
      <List
        list={[{
          text: '留下的測試案例可以在團隊討論、交接時更清楚邏輯',
        }, {
          text: '幾個月後就算忘記當初在幹嘛，有了測試也不用胡亂猜測',
        }, {
          text: '程式開發是長遠的，雖然現在寫的看起來很正常，日子一長可能會埋下許多 bug，又或者因為改了其他地方而壞了這裡，寫測試就是為了防止這些事情發生',
        }]}
      />
      <Text
        meta={[{
          start: 23,
          end: 26,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 28,
          end: 48,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 63,
          end: 67,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 69,
          end: 74,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 134,
          end: 135,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://github.com/aNyMoRe0505/official-site',
        }]}
      >
        接下來進入正題，這次自己練習的套件我選擇使用 Jest、react-testing-library，至於為什麼不選擇其他像是 Mocha、Enzyme？沒為什麼，我只是選了幾個比較多人用的，create-react-app 預設也是用這套XD（測試我直接寫在這個網站的專案，有興趣可以直接 clone 下來）
      </Text>
      <List
        title="事前安裝套件"
        list={[{
          meta: [{
            start: 0,
            end: 3,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: 'jest 因為我們使用 jest (?)',
        }, {
          meta: [{
            start: 0,
            end: 9,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: 'babel-jest 因為我們使用 babel，要讓測試時也正常',
        }, {
          meta: [{
            start: 0,
            end: 21,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '@testing-library/react 因為這個專案是 React，我們需要一些 API 來撰寫測試像是 render',
        }, {
          meta: [{
            start: 0,
            end: 26,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '@testing-library/user-event 我們需要再測試時模擬一些操作像是 click',
        }, {
          meta: [{
            start: 0,
            end: 24,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '@testing-library/jest-dom 我們可能需要確保某些元素有被 render，預設 jest 沒有提供，利用這個來拓展功能',
        }]}
      />
      <StyledImage src="https://i.imgur.com/UWuN50Y.png" />
      <Text
        meta={[{
          start: 33,
          end: 41,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 43,
          end: 51,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 53,
          end: 62,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 64,
          end: 74,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        這是我目前 src 目錄底下的檔案，而這次寫測試多的檔案資料夾有 __mocks__、__tests__、jest-setup、jest.config
      </Text>
      <Text
        meta={[{
          start: 6,
          end: 16,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 27,
          end: 30,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://jestjs.io/docs/en/configuration',
        }]}
      >
        首先來看看 jest.config，其他的預設值可以在官方文件中看到
      </Text>
      <Code>
        {`// jest.config
module.exports = {
  bail: true,
  verbose: true,
  moduleFileExtensions: ['jsx', 'js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};
`}
      </Code>
      <List
        prefixType="DOT"
        list={[{
          meta: [{
            start: 0,
            end: 3,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: 'bail 是當碰到一個測試失敗時就結束，不會繼續進行',
        }, {
          meta: [{
            start: 0,
            end: 6,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: 'verbose 是要不要將個別測試的結果在 terminal 印出',
        }, {
          meta: [{
            start: 0,
            end: 19,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: 'moduleFileExtensions 就.. 你寫程式檔案的 extension XDD，官方推薦把最常用的放在最左邊',
        }, {
          meta: [{
            start: 0,
            end: 15,
            type: ARTICLE_META_TYPE.BLOCK,
          }, {
            start: 79,
            end: 80,
            type: ARTICLE_META_TYPE.LINK,
            url: 'https://jestjs.io/docs/en/webpack#a-webpack-example',
          }],
          text: 'moduleNameMapper 在測試中一些靜態資源像是圖片其實是不需要的，我們可以把它 mock out，而且 jest 也無法處理這種檔案，詳細可以看這裡',
        }, {
          meta: [{
            start: 0,
            end: 17,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: 'setupFilesAfterEnv 在開始每次測試之前會執行的 code 可以放這邊，直接看檔案內容',
        }]}
      />
      <Code>
        {`// jest.setup
import '@testing-library/jest-dom';

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
`}
      </Code>
      <Text
        meta={[{
          start: 4,
          end: 28,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 77,
          end: 78,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://stackoverflow.com/questions/57311971/error-not-implemented-window-scrollto-how-do-we-remove-this-error-from-jest-t',
        }]}
      >
        要使用 @testing-library/jest-dom 拓展的功能必須在每個測試的檔案上面引入一次，但這樣很麻煩所以可以寫在這裡，至於下面那兩行可以看這邊。
      </Text>
      <Text>
        最後因為我有用 eslint，預設是看不懂測試語法會噴錯，所以要加上 jest 環境。
      </Text>
      <Code>
        {` "env": {
    "browser": true,
    "es6": true,
    "jest": true
  },`}
      </Code>
      <Text>
        這樣一來事前準備都好了，再來就是開始寫測試了，我自己是先從這個網站上的 header 的連結開始
      </Text>
      <Text>
        測試的目的是為了讓自己對於應用能正常運作更有信心，那我們要測試什麼？我們應該是從使用者的觀點去進行撰寫，所以對使用者來說我們要確保點下每個連結會顯示正確的內容
      </Text>
      <Text
        meta={[{
          start: 19,
          end: 33,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        首先在 __test__ 資料夾建立 Header.test.jsx，並撰寫 Header 的 describe statement (jest所提供)
      </Text>
      <Code>
        {`describe('Header', () => {
  // write some tests
});`}
      </Code>
      <Text>
        其實也可以不用用 describe 包起來，但是包起來有助於分類，termainal 的顯示也會比較美觀(?) 像這樣
      </Text>
      <Image src="https://i.imgur.com/XsoGfJv.png" />
      <Text>
        除了美觀外，每個 describe 會有自己的作用域生命週期，像是 beforeAll、afterAll ... 等等
      </Text>
      <Text
        meta={[{
          start: 89,
          end: 95,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://github.com/aNyMoRe0505/official-site/blob/master/src/App.jsx',
        }]}
      >
        再來因為是要確保點下連結所看到的內容是正確的，我們不能獨立拆開 Header component 做測試，所以利用 testing library 提供的 render 來新增 App.jsx 的 DOM，並用 screen.debug() 看目前 DOM 的結構
      </Text>
      <Code>
        {`import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../App';

describe('Header', () => {
  test('Test about link points to the correct page', () => {
    render(
      <>
        <App />
      </>,
    );
    screen.debug();
  });
});`}
      </Code>
      <Text>
        在這次測試因為每個環節都需要 render App，所以可以在 describe 下 beforeEach (在每個測試執行之前)
      </Text>
      <Code>
        {`describe('Header', () => {
    beforeEach(() => {
      render(
        <>
          <App />
        </>,
      );
    });

    test('Test about link points to the correct page', () => {
      render(
        <>
          <App />
        </>,
      );
      screen.debug();
    });
});`}
      </Code>
      <Text>
        我們在 packge.json 的 script 新增指令 jest --config ./src/jest.config.js 並執行看看
      </Text>
      <Image src="https://i.imgur.com/8fJHX9K.png" remark="可以看到 About 的 a" />
      <Text
        meta={[{
          start: 45,
          end: 46,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://testing-library.com/docs/guide-which-query',
        }]}
      >
        再來就是如何取到該元素，可以利用 screen 提供的一些 query 方法，該用哪種參考這裡的優先順序
      </Text>
      <Text>
        抓取到元素後再利用 @testing-library/user-event 提供的方法模擬 click 的情況
      </Text>
      <Text>
        因為 About 會顯示我的名字 Paul Wang，所以我用這個當作依據來判斷是否正確，所以完整的程式碼如下
      </Text>
      <Code>
        {`import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('Header', () => {
  beforeEach(() => {
    render(
      <>
        <App />
      </>,
    );
  });

  test('Test about link points to the correct page', () => {    
    const link = screen.getByRole('link', { name: 'About' }); => 取得元素
    userEvent.click(link); => 模擬點擊

    const me = screen.getByText('Paul Wang'); => 取得元素
    expect(me).toBeInTheDocument(); => 判斷是否存在
  });
});`}
      </Code>
      <Text>
        剩下的連結就大同小異，如果有Part2 應該會開始嘗試測試 Blog 頁面～
      </Text>
      <Reference
        list={[{
          text: "An in-depth beginner's guide to testing React applications",
          url: 'https://jkettmann.com/beginners-guide-to-testing-react/',
        }, {
          text: 'Day17 | 不知道對不對，就把邏輯通通測起來 feat. Jest',
          url: 'https://ithelp.ithome.com.tw/articles/10222357',
        }]}
      />
    </>
  );
}

export default memo(Article11);
