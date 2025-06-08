import React from 'react';
import DictionaryScreen from '../components/DictionaryScreen';

function Page1() {
  return (
    <DictionaryScreen
      step={1}
      title="FIX Finder"
      mainTitle={`실시간으로 업데이트되는\n제품가격 확인`}
      description="#실시간으로 변동되는 제품 가격을 바탕으로 예상 수리 비용 정보를 제공해드려요"
      path="/page2"
      titleColor="#FDC500"
      imageSrc="page1.png" // 원하는 이미지 파일명
    />
  );
}

export default Page1;
