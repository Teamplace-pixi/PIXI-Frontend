import React, { useState, useEffect } from 'react';
import './AIHowMuch.css';
import BottomNav from './components/BottomNav';
import { useNavigate } from 'react-router-dom';
import GenericModal from './components/GenericModal';
import api from './api';

const phoneSteps = [
  {
    key: 'brand',
    question: '어떤 브랜드의 제품인가요?',
    options: ['삼성', '애플'],
    type: 'autocomplete',
  },
  {
    key: 'model',
    question: '사용 중인 모델을 선택해주세요.',
    type: 'autocomplete',
    options: [
      '갤럭시 S23',
      '갤럭시 S22',
      '갤럭시 노트 20',
      '갤럭시 Z 플립 5',
      '갤럭시 Z 폴드 5',
      '아이폰 15',
      '아이폰 14',
      '아이폰 13',
      '아이폰 SE 3세대',
    ],
  },
  { key: 'symptom', question: '어떤 문제가 있는지 적어주세요.', type: 'text' },
  {
    key: 'selfCheck',
    question: '자가진단 결과를 입력해주세요.',
    type: 'multiCheck',
    sub: ['카메라', '오디오', '화면터치', '페이스 ID', '블루투스', '유선충전'],
  },
];

const accessorySteps = [
  {
    key: 'accType',
    question: '악세사리 종류를 선택해주세요.',
    options: ['무선 이어폰', '워치', '전자 펜슬'],
  },
  {
    key: 'brand',
    question: '어떤 브랜드의 제품인가요?',
    options: ['삼성', '애플'],
    type: 'autocomplete',
  },
  {
    key: 'model',
    question: '제품 모델을 선택해주세요.',
    options: [
      '에어팟 1세대',
      '에어팟 2세대',
      '에어팟 프로 1세대',
      '애플 펜슬 1세대',
      '애플 펜슬 2세대',
      '애플 펜슬 USB-C',
    ],
    type: 'autocomplete',
  },
  { key: 'symptom', question: '어떤 문제가 있는지 적어주세요.', type: 'text' },
  {
    key: 'occurTime',
    question: '언제부터 문제가 있었나요?',
    options: ['오늘', '일주일 이내', '한달 이내', '그 이상 전부터'],
  },
  {
    key: 'usage',
    question: '평소 사용 상태는?',
    options: [
      '야외/운동시 사용',
      '충격을 받은 적 있음',
      '침수/습기 노출',
      '별다른 문제 없음',
    ],
  },
  {
    key: 'repairHistory',
    question: '이전 수리 이력이 있나요?',
    options: ['예', '아니오'],
  },
];

const AIHowMuch = () => {
  const [step, setStep] = useState(0);
  const [deviceCategory, setDeviceCategory] = useState('');
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  // 여기 구독 여부는 실제 API나 Context에서 받아오면 됨 (현재 예시용)
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 구독 정보 가져오기
        const infoResponse = await api.get('/myPage/paypal');
        setIsSubscribed(infoResponse.data.sub);
        console.log('구독 정보:', infoResponse.data);
      } catch (error) {
        console.error('데이터 요청 실패:', error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const steps = deviceCategory === '휴대폰' ? phoneSteps : accessorySteps;
  const totalSteps = steps.length;
  const percent = (Object.keys(answers).length / totalSteps) * 100;

  const handleDeviceCategory = (category) => {
    setDeviceCategory(category);
    setStep(0);
    setAnswers({});
  };

  const handleAnswer = (key, value) => {
    setAnswers((prev) => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
    if (step < steps.length - 1 && !answers[steps[step + 1].key]) {
      setStep(step + 1);
    }
  };

  const handleMultiCheck = (category, value) => {
    setAnswers((prev) => ({
      ...prev,
      selfCheck: {
        ...prev.selfCheck,
        [category]: value,
      },
    }));
  };

  const handleSubmitClick = () => {
    if (!isSubscribed) {
      setShowModal(true);
      return;
    }
    // payload 구성
    const payload =
      deviceCategory === '휴대폰'
        ? {
            device_type: deviceCategory,
            brand: answers.brand,
            model: answers.model,
            symptom: answers.symptom,
            self_check_results: Object.entries(answers.selfCheck || {}).map(
              ([k, v]) => `${k}: ${v}`
            ),
          }
        : {
            device_type: deviceCategory,
            acc_type: answers.accType,
            brand: answers.brand,
            model: answers.model,
            symptom: answers.symptom,
            occur_time: answers.occurTime,
            usage: answers.usage,
            repair_history: answers.repairHistory,
          };

    // loading 페이지로 이동하며 payload, symptom 전달
    navigate('/loading', {
      state: { payload, symptom: answers.symptom },
    });
  };

  return (
    <>
      <div className="survey-wrapper" style={{ paddingBottom: '80px' }}>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>

        <div className="logo-container">
          <img src="/HowMuch.png" alt="Logo" className="logo-image" />
        </div>

        <p className="description">
          설문지를 작성해주세요.
          <br />
          수리가격 견적을 확인할 수 있어요. AI로 분석하여 고장원인과 수리비용을
          알려드릴게요!
        </p>

        <div
          className="start-select"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <h2 className="title">기기 종류를 선택해주세요.</h2>
          <button
            className={`select-btn ${
              deviceCategory === '휴대폰' ? 'selected' : ''
            }`}
            onClick={() => handleDeviceCategory('휴대폰')}
          >
            휴대폰
          </button>
          <button
            className={`select-btn ${
              deviceCategory === '악세사리' ? 'selected' : ''
            }`}
            onClick={() => handleDeviceCategory('악세사리')}
          >
            악세사리
          </button>
        </div>

        {deviceCategory && (
          <div className="question-box">
            {steps.map(
              (stepItem, index) =>
                index <= step && (
                  <div key={stepItem.key} className="question-section">
                    <h3>{stepItem.question}</h3>

                    {stepItem.type === 'text' ? (
                      <textarea
                        placeholder="내용을 입력하세요"
                        defaultValue={answers[stepItem.key] || ''}
                        onBlur={(e) =>
                          handleAnswer(stepItem.key, e.target.value)
                        }
                      />
                    ) : stepItem.type === 'multiCheck' ? (
                      stepItem.sub.map((item) => (
                        <div key={item} className="multi-check-item">
                          <p>{item}</p>
                          <div className="multi-check-buttons">
                            <button
                              className={`multi-check-option ${
                                answers.selfCheck?.[item] === '이상 있음'
                                  ? 'selected'
                                  : ''
                              }`}
                              onClick={() =>
                                handleMultiCheck(item, '이상 있음')
                              }
                            >
                              이상 있음
                            </button>
                            <button
                              className={`multi-check-option ${
                                answers.selfCheck?.[item] === '이상 없음'
                                  ? 'selected'
                                  : ''
                              }`}
                              onClick={() =>
                                handleMultiCheck(item, '이상 없음')
                              }
                            >
                              이상 없음
                            </button>
                          </div>
                        </div>
                      ))
                    ) : stepItem.type === 'autocomplete' ? (
                      <>
                        <input
                          type="text"
                          className="autocomplete-input"
                          list={`${stepItem.key}-options`}
                          placeholder="입력하세요"
                          defaultValue={answers[stepItem.key] || ''}
                          onChange={(e) => setInputValue(e.target.value)}
                          onBlur={(e) =>
                            handleAnswer(stepItem.key, e.target.value)
                          }
                        />
                        <datalist id={`${stepItem.key}-options`}>
                          {stepItem.options.map((option) => (
                            <option key={option} value={option} />
                          ))}
                        </datalist>
                      </>
                    ) : (
                      <div className="button-options">
                        {stepItem.options.map((option) => (
                          <button
                            key={option}
                            className={`select-btn ${
                              answers[stepItem.key] === option ? 'selected' : ''
                            }`}
                            onClick={() => handleAnswer(stepItem.key, option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
            )}

            {Object.keys(answers).length === totalSteps && (
              <button className="submit-btn" onClick={handleSubmitClick}>
                확인하기
              </button>
            )}
          </div>
        )}
      </div>
      <BottomNav />
      {showModal && (
        <GenericModal
          title="아직 구독을 안하셨네요?"
          onClose={() => setShowModal(false)}
        >
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <img
              src="subscribe-info-image.png"
              alt="구독 안내 이미지"
              style={{ width: '250px', height: '202.2px' }}
            />
          </div>

          <p>월 2900원으로 AI견적을 포함한 다양한 기능을 이용해보세요!</p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '12px',
            }}
          >
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: '#006FFF',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
              onClick={() => {
                setShowModal(false);
                navigate('/subscribe');
              }}
            >
              구독하러 가기
            </button>
          </div>
        </GenericModal>
      )}
    </>
  );
};

export default AIHowMuch;
