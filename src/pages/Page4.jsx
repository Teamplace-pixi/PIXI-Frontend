import React from 'react';
import DictionaryScreen from '../components/DictionaryScreen';

function Page4() {
  return (
    <DictionaryScreen
      title="전자기기 보험"
      mainTitle={<>내 전자기기의 수리가 가능한 <br />근처 수리업체 정보를 <br />확인하고 매칭까지</>}
      description="#근처의 수리업체를 추천받을 수 있고, 희귀 모델까지 수리할 수 있는 수리 고수와 매칭을 할 수 있어요"
      path="/startlogin" 
    />
  );
}

export default Page4;
