import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Button';

import {
  NOTIFICATION_REQUESTED,
  NOTIFICATION_REMOVE_REQUEST,
} from '../../actions/Notification';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const DescWrap = styled.div`
  max-width: 400px;
  margin: 15px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const DescBlock = styled.div`
  font-size: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 8px 0;
`;

const NotificationDisplayWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const FadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(300px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
`;

const FadeOut = css`
  opacity: 0;
  transform: translateX(300px);
  transition-property: opacity, transform;
  transition-timing-function: ease;
  transition-duration: 0.5s;
`;

const NotificationBlock = styled.div`
  background-color: rgb(218, 244, 220);
  width: 250px;
  min-height: 50px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  margin: 5px 0;
  animation-name: ${FadeIn};
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  ${({ open }) => !open && FadeOut};
  position: relative;
  @media (max-width: 768px) {
    width: 200px;
  };
`;

const StyledBlcokMarkBtn = styled.button`
  width: 15px;
  height: 15px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  transform: rotate(45deg);
  padding: 0;
  margin: 0 10px;
  position: absolute;
  right: 0px;
  top: 5px;
`;

const PendingText = styled.p`
  margin: 5px 0;
`;

const messageTemplate = [
  '您好，歡迎回來',
  '我的人生',
  '一片空白',
  '你的人生',
  '也是一片空白',
  '原諒我這一生',
  '不羈放縱愛自由',
  '也會怕有一天會跌倒',
  '水啦 跌得好',
  '今天我寒夜裡看雪飄過',
  '野格炸彈',
  '我的最愛',
  '您好，請出去',
];

function Notification() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.Notification.activedNotification);
  const pendingNotifications = useSelector((state) => state.Notification.pendingNotification);

  return (
    <Wrapper>
      <NotificationDisplayWrapper>
        {notifications.map((notification) => (
          <NotificationBlock open={notification.open} key={notification.id}>
            <StyledBlcokMarkBtn
              onClick={() => dispatch({ type: NOTIFICATION_REMOVE_REQUEST, notification })}
            >
              <img style={{ width: '100%' }} alt="plus" src="https://img.icons8.com/ios/80/000000/plus.png" />
            </StyledBlcokMarkBtn>
            {notification.message}
          </NotificationBlock>
        ))}
      </NotificationDisplayWrapper>
      <Button
        onClick={() => {
          const randomNum = Math.floor(Math.random() * messageTemplate.length);
          dispatch({ type: NOTIFICATION_REQUESTED, message: messageTemplate[randomNum] });
        }}
        label="發送"
      />
      <DescWrap>
        <DescBlock>
          ・
          <span style={{ flex: 1 }}>You can request a notification to be displayed</span>
        </DescBlock>
        <DescBlock>
          ・
          <span style={{ flex: 1 }}>You can request a notification to hide</span>
        </DescBlock>
        <DescBlock>
          ・
          <span style={{ flex: 1 }}>A notification should not be displayed more than 4 seconds</span>
        </DescBlock>
        <DescBlock>
          ・
          <span style={{ flex: 1 }}>Multiple notifications can be displayed at the same time</span>
        </DescBlock>
        <DescBlock>
          ・
          <span style={{ flex: 1 }}>No more than 3 notifications can be displayed at the same time</span>
        </DescBlock>
        <DescBlock>
          ・
          <span style={{ flex: 1 }}>If a notification is requested while there are already 3 displayed notifications, then queue/postpone it.</span>
        </DescBlock>
        <DescBlock>
          ・
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/38574266#38574266"
            style={{ flex: 1 }}
          >
            Reference
          </a>
        </DescBlock>
      </DescWrap>
      <p>列隊中通知</p>
      {pendingNotifications.length ? (
        <>
          {pendingNotifications.map((pn) => (
            <PendingText key={pn.id}>{pn.message}</PendingText>
          ))}
        </>
      ) : <PendingText>無</PendingText>}
    </Wrapper>
  );
}

export default Notification;
