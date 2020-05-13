import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../../config/style';
import Button from '../../components/Button';

import {
  NOTIFICATION_REQUESTED,
} from '../../actions/Notification';


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  margin: 0 0 15px;
  font-size: 16px;
  padding: 7px;
  outline: none;
  border-width: 0 0 2px 0px;
  border-style: solid;
  border-color: gray;
  border-radius: 0px;
  :focus {
    border-color: ${styles.mainColor};
  };
  transition-duration: 0.3s;
  transition-property: border-color;
  background-color: transparent;
  color: black;
  transition-timing-function: ease-in-out;
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

function Notification() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.Notification);
  const [message, setMessage] = useState('');

  console.log('notifications', notifications);

  return (
    <Wrapper>
      <StyledInput value={message} onChange={(e) => { setMessage(e.target.value); }} />
      <Button
        onClick={() => {
          if (!message) {
            alert('請輸入訊息');
            return;
          }
          dispatch({ type: NOTIFICATION_REQUESTED, notification: message });
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
    </Wrapper>
  );
}

export default Notification;
