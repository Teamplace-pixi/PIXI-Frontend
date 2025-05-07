import React from 'react';
import DictionaryScreen from '../components/DictionaryScreen';

function Page2() {
  return (
    <DictionaryScreen
      title="AI 챗봇"
      mainTitle={
        <>
          AI 챗봇을 통해
          <br />
          전자기기의 정보를 한 번에
        </>
      }
      description="#AI 챗봇을 통해 개인형 맞춤 정보를 제공받을 수 있어요"
      path="/page3"
      titleColor="#FDC500"
    />
  );
}

export default Page2;
