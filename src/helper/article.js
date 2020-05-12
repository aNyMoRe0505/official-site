import React from 'react';

export const ARTICLE_META_TYPE = {
  STRONG: 'STRONG',
  LINK: 'LINK',
  BLOCK: 'BLOCK',
};

export const metaConverter = (meta, text, darkMode = false) => {
  if (!meta.length) return text;

  const result = [];
  let currentMetaIndex = 0;
  let content = '';
  // example hello world! , llo 要是 strong
  // [h,e,l,l,o, ,w,o,r,l,d,!]
  //      l,l,o < strong
  // expected <span font-weight..>llo</span>
  Array.from(text).forEach((char, index) => {
    if (index === meta[currentMetaIndex].start) {
      // 第一個遇到的為 l
      // 把目前content推到 result (he)
      result.push(content);
      // 並且刷新
      content = '';
    } // end meta start

    content += char;

    if (index === meta[currentMetaIndex].end) {
      // 第一個meta 結尾 (o)
      // 把相對應的結果推到 result => <span font-weight..>llo</span>
      // 並且刷新 content, 檢查是否有下一個meta
      switch (meta[currentMetaIndex].type) {
        case ARTICLE_META_TYPE.STRONG:
          result.push((
            <span key={currentMetaIndex} style={{ fontWeight: 500 }}>
              {content}
            </span>
          ));
          break;

        case ARTICLE_META_TYPE.LINK:
          result.push((
            <a
              className="article_link"
              rel="noopener noreferrer"
              target="_blank"
              style={(darkMode && { color: '#ffa7c4' }) || {}}
              href={meta[currentMetaIndex].url}
              key={currentMetaIndex}
            >
              {`${content}`}
            </a>
          ));
          break;

        case ARTICLE_META_TYPE.BLOCK:
          result.push((
            <span
              style={{
                color: '#bd4147',
                borderRadius: '5px',
                padding: '3px 6px',
                backgroundColor: 'rgb(246, 246, 249)',
                border: '1px solid #e6e6e6',
              }}
              key={currentMetaIndex}
            >
              {`${content}`}
            </span>
          ));
          break;


        default:
          result.push(`${content}${char}`);
          break;
      }

      content = '';

      if (meta[currentMetaIndex + 1]) {
        // 第一個meta處理結束, 切換下一個meta
        currentMetaIndex += 1;
      }
    } // end meta end
  });

  result.push(content); // 將剩餘的推回

  return result;
};
