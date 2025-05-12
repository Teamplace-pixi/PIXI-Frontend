import React from 'react';
import DictionaryScreen from '../components/DictionaryScreen';

function Page3() {
  return (
    <DictionaryScreen
      step={3}
      title="AI 견적"
      mainTitle={<>전자기기의<br />예상 수리비용을<br />AI 기술과 함께</>}
      description="#AI가 분석한 세부적인 원인과 수리가 가능한 수리센터의 정보를 제공해드려요"
      path="/page4"
      titleColor="#FDC500"
    />
  );
}

export default Page3;
