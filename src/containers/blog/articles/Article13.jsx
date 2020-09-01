import React, { memo } from 'react';

import Text from '../../../components/blog/Text';
import Title from '../../../components/blog/Title';
import Code from '../../../components/blog/Code';
import Reference from '../../../components/blog/Reference';
import ProductMagnifier from '../../../components/blog/article13/ProductMagnifier';

function Article13() {
  return (
    <>
      <Title>
        商城產品放大鏡
      </Title>
      <Text>
        練習一下電子商城很常看到的功能像下面這樣（桌面版）
      </Text>
      <ProductMagnifier blockMode />
      <ProductMagnifier />
      <Text>
        假設放大兩倍，原圖為 350 * 250，放大鏡內圖片的寬高就設置成 700 * 500，並且根據想要的寬高和鼠標位置把放大的圖片根據比例移動位置
      </Text>
      <Text>
        html styled
      </Text>
      <Code>
        {`const ImgWrapper = styled.div'  => 主圖片的wrapper
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 30px 0 0;
  border: 1px solid black;
  @media (max-width: 768px) {
    margin: 15px 0 0;
  };
';

const Img = styled.img'  => 原圖
  width: 100%;
  height: 100%;
';

const MagnifierBlock = styled.div'  => 第一個範例出現的 block, 我打算擷取 100 * 100
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid gray;
  background-color: #80808066;
  top: 0;
  left: 0;
  display: none;  => hover 到圖上才會顯示, 預設為 none
';

const ResultWrapper = styled.div'  => 放大鏡主體 (放大圖片的 wrapper), 放大兩倍維持比例 所以是寬高為擷取框的兩倍
  display: none;  => hover 到圖上才會顯示, 預設為 none
  width: 200px;
  height: 200px;
  border-radius: 100%;
  position: absolute;
  overflow: hidden;
  border: 1px solid black;
  top: 0;
  left: 380px;
';

const ResultImg = styled.img'  => 放大後的圖片. 放大兩倍, 所以寬為 700
  width: 700px;
  position: absolute;
  top: 0;
  left: 0;
';`}
      </Code>
      <Text>
        整體佈局程式碼筆記
      </Text>
      <Code>
        {`function ProductMagnifier({
  blockMode,  => 決定要不要顯示擷取框
}) {
  const oriImgWrapRef = useRef();
  const resultWrapRef = useRef();
  const resultImgRef = useRef();
  const blockRef = useRef();

  useEffect(() => {
    const oriWrapperElement = oriImgWrapRef.current;
    const resultWrapElement = resultWrapRef.current;
    const resultImgElement = resultImgRef.current;
    const blockElement = blockRef.current;

    // 當滑鼠離開區域隱藏擷取匡和放大後的圖片
    const mouseLeave = () => {
      resultWrapElement.style.display = 'none';
      blockElement.style.display = 'none';
    };

    // 滑鼠移到圖片的事件
    const mouseMove = (event) => {
      resultWrapElement.style.display = 'block'; // 顯示放大結果

      const rect = oriWrapperElement.getBoundingClientRect(); // 取得整體原圖 wrapper 的 rect

      // event.clientX 為滑鼠到瀏覽器左邊的距離, 扣掉原圖 wrapper 到瀏覽器左邊的距離
      // 就會等於滑鼠到原圖左邊邊界的距離, top同理
      const left = event.clientX - rect.left;
      const top = event.clientY - rect.top;

      // 超出圖片就取消顯示
      if (
        left < 0
        || left > rect.width
        || top < 0
        || top > rect.height
      ) {
        mouseLeave();
        return;
      }

      // 因為擷取匡是 100 * 100, 讓鼠標維持在中間所以要 -50
      let blockLeft = left - 50;
      let blockTop = top - 50;

      if (blockMode) {
        // 如果是 blockMode (顯示擷取匡), 範圍不能超過原圖 wrapper 大小, 102 是因為 border 左右上下 1px
        blockLeft = Math.min(rect.width - 102, Math.max(0, blockLeft));
        blockTop = Math.min(rect.height - 102, Math.max(0, blockTop));

        // 更新擷取匡 style, 位置
        blockElement.style.display = 'block';
        blockElement.style.left = '{blockLeft}px';
        blockElement.style.top = '{blockTop}px';
      } else {
        // 沒有擷取匡的話我們顯示結果在鼠標上, 因為結果的寬高是200, 維持在鼠標中間所以 -100
        resultWrapElement.style.left = '{left - 100}px';
        resultWrapElement.style.top = '{top - 100}px';
      }

      // 計算擷取範圍在原圖中 left, top 的比例
      const percentLeft = blockLeft / rect.width;
      const percentTop = blockTop / rect.height;

      // 將比例乘上原圖大小並且用 0 減去, 將圖片移置到正確位置
      // 假設 left 比例是 0.5, 也就是說原圖 left 的位置應該要是 -(700 * 0.5 = 350)
      // 這樣放大鏡的結果才是我們想要的擷取畫面
      resultImgElement.style.left = '{0 - percentLeft * resultImgElement.width}px';
      resultImgElement.style.top = '{0 - percentTop * resultImgElement.height}px';
    };

    oriWrapperElement.addEventListener('mousemove', mouseMove);
    oriWrapperElement.addEventListener('mouseleave', mouseLeave);

    return () => {
      oriWrapperElement.addEventListener('mouseenter', mouseMove);
      oriWrapperElement.addEventListener('mouseleave', mouseLeave);
    };
  }, [blockMode]);

  return (
    <ImgWrapper ref={oriImgWrapRef}>
      <MagnifierBlock ref={blockRef} />
      <Img src="https://autos.yahoo.com.tw/p/r/w644/bike-trim/March2019/c81054f52c893134912033056beba46c.jpeg" />
      <ResultWrapper ref={resultWrapRef}>
        <ResultImg src="https://autos.yahoo.com.tw/p/r/w644/bike-trim/March2019/c81054f52c893134912033056beba46c.jpeg" ref={resultImgRef} />
      </ResultWrapper>
    </ImgWrapper>
  );
}`}
      </Code>
      <Reference
        list={[{
          text: '用css实现图片放大镜效果实例详解（图',
          url: 'https://www.php.cn/css-tutorial-360753.html',
        }]}
      />
    </>
  );
}

export default memo(Article13);
