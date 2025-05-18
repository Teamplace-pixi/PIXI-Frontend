import React, { useState } from 'react';
import './AIHowMuch.css';
import BottomNav from './components/BottomNav';
import { useNavigate } from 'react-router-dom';

const MAX_INPUTS = 4;

const AIHowMuch = () => {
  const [deviceType, setDeviceType] = useState('');
  const [inputs, setInputs] = useState(['']);

  const navigate = useNavigate();

  const handleDeviceTypeChange = (e) => {
    setDeviceType(e.target.value);
    setInputs(['']);
  };

  const handleInputChange = (value, index) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    if (index === inputs.length - 1 && inputs.length < MAX_INPUTS && value.trim() !== '') {
      setInputs([...newInputs, '']);
    }
  };

  const handleSubmitClick = () => {
    navigate('/loading');
  };

  const progressPercent = (inputs.filter(i => i.trim() !== '').length / MAX_INPUTS) * 100;

  return (
    <>
      <div className="survey-wrapper" style={{ paddingBottom: '80px' }}> 
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        <div className="logo-container">
          <img src='HowMuch.png' alt="Logo 1" className="logo-image" />

        </div>

        <h2 className="title">설문지를 작성해주세요.</h2>
        <p className="description">
          수리가격 견적을 확인할 수 있어요<br />
          AI로 분석하여 고장원인과 수리비용을 알려드릴게요!
        </p>

        <div className="radio-group">
          <label><input type="radio" name="device" value="노트북" onChange={handleDeviceTypeChange} /> 노트북</label>
          <label><input type="radio" name="device" value="핸드폰" onChange={handleDeviceTypeChange} /> 핸드폰</label>
          <label><input type="radio" name="device" value="태블릿" onChange={handleDeviceTypeChange} /> 태블릿</label>
        </div>

        {deviceType && (
          <div className="inputs-section">
            {inputs.map((input, index) => (
              <div key={index} className="input-wrapper">
                <label>확인하고 싶은 기기의 종류를 선택해주세요</label>
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                />
              </div>
            ))}
          </div>
        )}

        <button className="submit-btn" onClick={handleSubmitClick}>확인하기</button>
        
      </div>
      <BottomNav /> 
    </>
  );
};

export default AIHowMuch;
