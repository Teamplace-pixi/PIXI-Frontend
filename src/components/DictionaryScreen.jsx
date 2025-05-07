import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../MobileLayout.css';

function DictionaryScreen({
  title,
  mainTitle,
  description,
  path,
  titleColor = '#FFD700',
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div className="mobile-wrapper" onClick={handleClick}>
      <div className="mobile-container">
        <p style={{ color: titleColor, fontWeight: 'bold' }}>{title}</p>
        <h1 className="main-title">{mainTitle}</h1>
        <p style={{ color: '#ccc', fontSize: '12px' }}>{description}</p>
      </div>
    </div>
  );
}

export default DictionaryScreen;
