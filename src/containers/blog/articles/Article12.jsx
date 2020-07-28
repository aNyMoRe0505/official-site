import React, { memo } from 'react';

import Text from '../../../components/blog/Text';
import Title from '../../../components/blog/Title';
import Code from '../../../components/blog/Code';
import List from '../../../components/blog/List';
import Image from '../../../components/blog/Image';
import Reference from '../../../components/blog/Reference';

import { ARTICLE_META_TYPE } from '../../../helper/article';

function Article12() {
  return (
    <>
      <Title>
        use-request 開源初體驗
      </Title>
      <Text
        meta={[{
          start: 85,
          end: 96,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://github.com/facebook/react/issues/14259',
        }]}
      >
        一開始會想做這個是因為管理 API 的狀態挺麻煩的 (error, loading, data ...)，而且非同步的狀況下 component 的 state 並不會 batch update，會造成不必要的 re-render，看到公司有寫類似的東西就想說改寫並新增一些功能，當作練習順便體驗如何將專案推到 NPM 給其他人使用～
      </Text>
      <Text
        meta={[{
          start: 15,
          end: 16,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://www.npmjs.com/package/react-axios-use-request',
        }, {
          start: 36,
          end: 37,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://github.com/aNyMoRe0505/react-axios-use-request',
        }, {
          start: 50,
          end: 61,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://github.com/axios/axios#request-config',
        }]}
      >
        這套的介紹和使用方法可以直接在這裡看到，就不在這邊多寫嚕，原始碼也可以在這裡看到，主要就是帶入回傳 axios config 的 function，就可以拿到執行 API 的 function 和相關狀態 (data, loading , error ...)，另外就是還有些快取功能，以及可以自己決定怎麼更新資料等等
      </Text>
      <Text>
        後來才發現其實有蠻多相關的套件的，不過就當作練習吧XD，在製作的過程中也學習到蠻多的，雖然不是多複雜的 code，接下來筆記一下如何將自己的程式碼打包到 NPM 給其他人使用
      </Text>
      <Text
        meta={[{
          start: 20,
          end: 21,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://www.npmjs.com/',
        }]}
      >
        首先我們要有個 NPM 的帳號，就直接到官網申請吧，申請完後點自己的頭貼選擇 package 可以看到所有你上傳的套件
      </Text>
      <Image src="https://i.imgur.com/Q2y10US.png" />
      <Text
        meta={[{
          start: 26,
          end: 34,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        接者必須在自己的電腦上登入 NPM，只要在終端機打 npm login 就行了，然後輸入相關需要的資訊～
      </Text>
      <Text>
        前置步驟都做完了，接下來就是專心製作自己的套件，所以就新建一個資料夾並且執行 npm init 產生 package.json
      </Text>
      <Text>
        要將檔案傳上 NPM 最重要的就是 package.json 了，以下是我的範例
      </Text>
      <Code>
        {`{
  "name": "react-axios-use-request",
  "version": "1.1.0",
  "description": "React hook for managing http requests with axios",
  "main": "lib/useRequest.js",
  "files": [
    "lib"
  ],
  "scripts": {
    "build": "babel src -d lib"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/aNyMoRe0505/react-axios-use-request.git"
  },
  "author": {
    "name": "Paul Wang",
    "email": "anymore0505@gmail.com"
  },
  "keywords": [
    "react",
    "react-hook",
    "hook",
    "axios",
    "request",
    "fetch",
    "api"
  ],
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/aNyMoRe0505/react-axios-use-request/issues"
  },
  "homepage": "https://github.com/aNyMoRe0505/react-axios-use-request#readme",
  "peerDependencies": {
    "axios": "^0.19.0",
    "react": "^16.8.1"
  },
  "devDependencies": {
    "@babel/cli": "^7.10.5",
    "@babel/core": "^7.10.5",
    "@babel/preset-env": "^7.10.4",
    "axios": "^0.19.2",
    "babel-eslint": "^10.1.0",
    "eslint": "7.2.0",
    "eslint-config-airbnb-base": "14.2.0",
    "eslint-plugin-import": "^2.21.2",
    "eslint-plugin-react-hooks": "^4.0.8",
    "react": "^16.13.1"
  }
}
`}
      </Code>
      <List
        prefixType="DOT"
        list={[{
          text: 'name：就是你的開源套件名稱，別人要下載也是使用這個名稱',
        }, {
          meta: [{
            start: 50,
            end: 59,
            type: ARTICLE_META_TYPE.LINK,
            url: 'https://semver.org/lang/zh-TW/',
          }],
          text: 'version：設定開源的版本，如果第一次上傳的版本為 1.0.0，下次就不能是同樣的版本，版本的 convention 可以看這裡',
        }, {
          text: 'description：你開源的描述',
        }, {
          text: 'main：你的程式進入點，這個很重要，也就是別人在 import 你的套件時會是 import 哪個檔案，我會將 build 好的東西放在 lib/useRequest.js 所以才這樣寫',
        }, {
          meta: [{
            start: 65,
            end: 66,
            type: ARTICLE_META_TYPE.LINK,
            url: 'https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package',
          }],
          text: 'files：決定哪些東西會被丟到 NPM 上，我只想要把 build 好的檔案丟上去所以只給 lib，還有一些會自己傳上去的可以看這裡',
        }, {
          text: 'peerDependencies：描述這個套件會需要哪些其他套件，如果使用者在安裝你的套件時沒有這些套件，終端機會跳出提醒',
        }, {
          text: 'devDependencies：開發時才會用到的套件，所以別人在安裝時不會安裝這些套件',
        }]}
      />
      <Text>
        其他的就不列了，應該都很簡單，另外如果有寫 dependencies 的話，使用者在安裝時也會一起安裝你所列的套件，另外因為開發有用到 ES6 的語法，所以我們在 build 時才需要使用 babel 進行編譯，這樣別人才可以正常使用
      </Text>
      <Text>
        最後只要在當前目錄下 npm publish 就可以上傳到 NPM 了，之後就可以試試看可不可以用 npm install 安裝自己的套件了！
      </Text>
      <Text
        meta={[{
          start: 22,
          end: 22,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 26,
          end: 26,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 35,
          end: 36,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://docs.npmjs.com/misc/semver#tilde-ranges-123-12-1',
        }]}
      >
        另外在練習的過程中也順便了解了安裝套件前的 ^ 和 ~ 的差別，詳細看這邊
      </Text>
      <Reference
        list={[{
          text: 'How to publish packages to npm',
          url: 'https://zellwk.com/blog/publish-to-npm/',
        }, {
          text: '看在上帝的份上，不要使用 .npmignore',
          url: 'https://www.zcfy.cc/article/for-the-love-of-god-don-t-use-npmignore',
        }]}
      />
    </>
  );
}

export default memo(Article12);
