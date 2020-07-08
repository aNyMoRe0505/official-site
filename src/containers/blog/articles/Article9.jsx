import React, { memo } from 'react';

import Text from '../../../components/blog/Text';
import Title from '../../../components/blog/Title';
import SubTitle from '../../../components/blog/SubTitle';
import Code from '../../../components/blog/Code';
import List from '../../../components/blog/List';
import Image from '../../../components/blog/Image';

import { ARTICLE_META_TYPE } from '../../../helper/article';

function Article9() {
  return (
    <>
      <Title>
        練習 JWT Auth 實作
      </Title>
      <Text>
        以 JWT 為基礎來練習一下認證機制，讓自己順一下 accessToken, refreshToken 流程
      </Text>
      <Text>
        資料庫我使用 MySQL，並使用 Node.js、Sequelize(ORM)、Koa、JWT 來實作
      </Text>
      <List
        prefixType="DOT"
        title="需求"
        list={[{
          text: '註冊',
        }, {
          text: '登入拿取 accessToken, refreshToken',
        }, {
          text: '使用 accessToken 拿取有權限限制的資源',
        }, {
          text: '登出將 refreshToken 註銷',
        }, {
          text: 'accessToken 過期可用 refreshToken 來拿取新的 accessToken',
        }, {
          text: '30天後使用者一定要重新登入',
        }, {
          text: '修改密碼',
        }, {
          text: '最多只能有五台裝置登入',
        }]}
      />
      <Text
        meta={[{
          start: 15,
          end: 16,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://github.com/aNyMoRe0505/JWT_AUTH',
        }]}
      >
        根據需求進行實作，原始碼可以在這裡看到
      </Text>
      <SubTitle strong>
        資料庫
      </SubTitle>
      <Text>
        我建了兩張簡單的資料表 User 和 RefreshToken，User 可以有多個 refreshToken (五台裝置)
      </Text>
      <Code>
        {`  class User extends Model {
    validatePassword = (plainPassword) => bcrypt.compare(plainPassword, this.password);

    accessToken = (role) => jwtSign({
      id: this.id,
      name: this.name,
      role,
    });

    refreshToken = (role) => jwtSignRefreshToken({
      id: this.id,
      name: this.name,
      role,
    });
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(plainPassword) {
        this.setDataValue('password', bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10)));
      },
    },
    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['NORMAL', 'ADMIN'],
    },
  }, { sequelize });

  User.associate = () => {
    User.hasMany(sequelize.models.RefreshToken);
  };`}
      </Code>
      <Text
        meta={[{
          start: 32,
          end: 37,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://www.npmjs.com/package/bcrypt',
        }]}
      >
        在 User 中我定義了幾個 method，使用者的密碼我使用 bcrypt 來加密
      </Text>
      <Text>
        validatePassword 用來驗證密碼是否正確，accessToken, refreshToken 用來簽發 token，實作如下
      </Text>
      <Code>
        {`import jwt from 'jsonwebtoken';

const JWT_TOKEN_SECRET = 'AUTH_PRACTICE_ACCESSTOKEN';
const JWT_REFRESH_TOKEN_SECRET = 'AUTH_PRACTICE_REFRESHTOKEN';

const TOKEN_EXPIRED_SECONDS = 60 * 15; // 15 minutes
const REFRESH_TOKEN_EXPIRED_SECONDS = 60 * 60 * 24 * 30; // 30 days

export function jwtSignRefreshToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRED_SECONDS,
    }, (error, token) => {
      if (error) reject(error);
      resolve(token);
    });
  });
}

export function jwtSign(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_TOKEN_SECRET, {
      expiresIn: TOKEN_EXPIRED_SECONDS,
    }, (error, token) => {
      if (error) reject(error);
      resolve(token);
    });
  });
}`}
      </Code>
      <Text>
        主要就是自己分別定義 Secret 來對 token 進行加密，並且有不同的失效時間，在這裡我設定 accessToken 為15分鐘，refreshToken 則是30天
      </Text>
      <Text>
        剩下的部分就是一些 User 的欄位設定，密碼使用 set 這個 method 讓在寫入資料庫之前將密碼加密，role 部分暫時簡單定義兩個，用註冊的 endpoint 新增的 User 角色為 NORMAL，並且最後和 refreshToken 做關聯
      </Text>
      <Text>
        再來是 RefreshToken
      </Text>
      <Code>
        {`  class RefreshToken extends Model {
  }

  RefreshToken.init({
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { sequelize });

  RefreshToken.associate = () => {
    RefreshToken.belongsTo(sequelize.models.User);
  };`}
      </Code>
      <Text>
        沒什麼好說的XD就只是把 token 存起來並且和 User 做關聯
      </Text>
      <SubTitle strong>
        API
      </SubTitle>
      <Text>
        首先是註冊
      </Text>
      <Code>
        {`router.post('/register', async (ctx) => {
  const {
    name,
    account,
    password,
  } = ctx.request.body;

  if (
    !name
    || !account
    || !password
  ) {
    ctx.throw(400, INVALID_PARAMS);
  }

  const existUser = await db.models.User.findOne({
    where: {
      account,
    },
  });

  if (existUser) ctx.throw(400, DUPLICATED_ACCOUNT);

  const newUser = await db.models.User.create({
    name,
    account,
    password,
    role: 'NORMAL',
  });

  ctx.status = 201;
  ctx.body = {
    id: newUser.id,
    name: newUser.name,
    account: newUser.account,
  };
});`}
      </Code>
      <Text>
        很簡單，吃姓名、帳號、密碼，做一些簡單的檢查，最後在資料表新增該 user
      </Text>
      <Image src="https://i.imgur.com/FaSxyZc.png" />
      <Text>
        再來是登入，吃帳號、密碼，做一些驗證，過了的話就簽發 accessToken 以及 refreshToken
      </Text>
      <Text>
        並且將 refreshToken 存進資料表
      </Text>
      <Text>
        還要檢查目前該 User 的 refreshToken 是否五組了，超過的話要把最早的刪除，也就是最早的登入裝置 refreshToken 會失效，最後將 token 回傳
      </Text>
      <Code>
        {`router.post('/login', async (ctx) => {
  const {
    account,
    password,
  } = ctx.request.body;

  if (!account || !password) ctx.throw(400, INVALID_PARAMS);

  const targetUser = await db.models.User.findOne({
    where: {
      account,
    },
    include: [{
      model: db.models.RefreshToken,
      order: [['createdAt', 'ASC']],
    }],
  });

  if (!targetUser) ctx.throw(400, AUTH_LOGIN_FAILED);

  if (!await targetUser.validatePassword(password)) ctx.throw(400, AUTH_LOGIN_FAILED);

  const promises = [
    targetUser.accessToken(targetUser.role),
    targetUser.refreshToken(targetUser.role),
  ];

  // 最多同時登入五台裝置, 超過將最早之前的刪除
  if (targetUser.RefreshTokens.length >= 5) {
    promises.push(targetUser.RefreshTokens[0].destroy({
      force: true,
    }));
  }

  const [accessToken, refreshToken] = await Promise.all(promises);

  await db.models.RefreshToken.create({
    token: refreshToken,
    UserId: targetUser.id,
  });

  ctx.body = {
    accessToken,
    refreshToken,
  };
});`}
      </Code>
      <Image src="https://i.imgur.com/YCXkyNR.png" />
      <Text>
        登入過後，就可以使用 accessToken 去取的需要權限的資源嚕，使用者將 accessToken 帶在 header 的 authorization，並且加上前綴 Bearer (這只是一個 convention)
      </Text>
      <Text>
        寫了一個 middleware 去判斷每次 request 使用者有沒有帶上 token，有的話就去認證並且將資訊帶到 ctx.req 裡
      </Text>
      <Code>
        {`export default async (ctx, next) => {
  let token = ctx.header.authorization;

  if (!token) {
    ctx.req.member = null;
    await next();
    return;
  }

  token = token.replace('Bearer ', '');

  try {
    const payload = await verifyToken(token);
    ctx.req.member = payload;
  } catch (error) {
    ctx.req.member = null;
  }

  await next();
};`}
      </Code>
      <Code>
        {`export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_TOKEN_SECRET, (error, payload) => {
      if (error) reject(error);
      resolve(payload);
    });
  });
}`}
      </Code>
      <Text>
        我另外寫了一個測試的 endpoint，判斷角色是否為 NORMAL
      </Text>
      <Code>
        {`router.get('/authRequiredEndpoint', async (ctx) => {
  if (!ctx.req.member || ctx.req.member.role !== 'NORMAL') ctx.throw(400, PERMISSION_FAILED);

  ctx.body = {
    ...ctx.req.member,
    expireAt: moment.unix(ctx.req.member.exp).format('YYYY-MM-DD HH:mm:ss'),
    message: 'You Pass!',
  };
});`}
      </Code>
      <Text>
        再來是當使用者 accessToken 過期要使用 refreshToken 來換 token 的部分，檢查該 token 是否有存在資料庫，並且進行驗證(驗證的 method 和上面的一樣，只是 Secret 不同)
      </Text>
      <Text>
        驗證過後之後就簽發新的 accessToken 進行回傳，至於要不要給新的 refreshToken 我自己認為都可以
      </Text>
      <Text>
        如果每次換 token 都換新的 refreshToken 的話我覺得優點是如果 token 被竊取，但使用者剛好權限過期用此 API 換 token，原本被偷的 token 就無效
      </Text>
      <Text>
        缺點的話就是使用者ㄧ定要30天都沒打 request 才會登出, 不然的話使用者永遠不會登出, 不給的話30天後 refreshToken 失效, 使用者一定得重登
      </Text>
      <Text>
        我希望30後一定要重登所以沒有核發新的 refreshToken
      </Text>
      <Code>
        {`router.post('/refreshToken', async (ctx) => {
  const {
    refreshToken,
  } = ctx.request.body;

  if (!refreshToken) ctx.throw(400, INVALID_PARAMS);

  const checkTokenExist = await db.models.RefreshToken.findOne({
    where: {
      token: refreshToken,
    },
    include: [{
      model: db.models.User,
      required: true,
    }],
  });

  if (!checkTokenExist) ctx.throw(400, TOKEN_VERIFY_FAILED);

  try {
    await verifyRefreshToken(refreshToken);
    // 需不需要重給 refreshToken ? 如果給
    // 優點：可能token被竊取 但使用者剛好權限過期 用此 API 換 token, 原本被偷的 token 就無效
    // 缺點：使用者ㄧ定要30天都沒打request才會登出, 不然的話使用者永遠不會登出, 不給的話30天後 refreshToken 失效, 使用者一定得重登
    const accessToken = await checkTokenExist.User.accessToken(checkTokenExist.User.role);
    ctx.body = {
      accessToken,
    };
  } catch {
    ctx.throw(400, TOKEN_VERIFY_FAILED);
  }
});`}
      </Code>
      <Text>
        之後是更改密碼的部分，當使用者察覺自己可能 token 遭到盜用而更改密碼，我們必須把所有 refreshToken 刪除，讓竊取者無法繼續使用 token
      </Text>
      <Code>
        {`router.patch('/editPassword', async (ctx) => {
  if (!ctx.req.member) ctx.throw(400, PERMISSION_FAILED);

  const targetUser = await db.models.User.findByPk(ctx.req.member.id);

  if (!targetUser) ctx.throw(400, PERMISSION_FAILED);

  const {
    originalPwd,
    newPwd,
  } = ctx.request.body;

  if (!originalPwd || !newPwd) ctx.throw(400, INVALID_PARAMS);

  if (!await targetUser.validatePassword(originalPwd)) ctx.throw(400, EDIT_PASSWORD_FAILED);

  // 刪除所有 refreshToken
  await Promise.all([
    targetUser.update({
      password: bcrypt.hashSync(newPwd, bcrypt.genSaltSync(10)),
    }),
    db.models.RefreshToken.destroy({
      where: {
        UserId: targetUser.id,
      },
      force: true,
    }),
  ]);

  ctx.status = 204;
});`}
      </Code>
      <Text>
        最後就是登出，就只是單純的將 refreshToken 刪除
      </Text>
      <Code>
        {`router.post('/logout', async (ctx) => {
  const {
    refreshToken,
  } = ctx.request.body;

  if (!refreshToken) ctx.throw(400, INVALID_PARAMS);

  await db.models.RefreshToken.destroy({
    where: {
      token: refreshToken,
    },
    force: true,
  });

  ctx.status = 204;
});`}
      </Code>
      <Text
        meta={[{
          start: 16,
          end: 17,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://github.com/aNyMoRe0505/JWT_AUTH',
        }]}
      >
        如果對完整程式碼有興趣可以直接把專案 clone 下來～
      </Text>
    </>
  );
}

export default memo(Article9);
