import React from 'react';

function Banner() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.bannerContainer}>
        
        <div style={styles.imageArea}>
          <img
            src="/FIXIicon.png"
            alt="FIXI 배너"
            style={styles.bannerImage}
          />
        </div>

        
        <div style={styles.textArea}>
          <p style={styles.text}>FIXI가 수리를 도와드릴게요</p>
          <p style={styles.subText}>AI챗봇 사용하러 가기 →</p>
        </div>
      </div>

      
      <div style={styles.dots}>
        <div style={{ ...styles.dot, backgroundColor: '#0047BB' }} />
        <div style={styles.dot} />
        <div style={styles.dot} />
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '16px',
  },
  bannerContainer: {
    width: '100%',
    height: '150px',
    borderRadius: '20px',
    backgroundColor: '#001f3f', 
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
  },
  imageArea: {
    flex: '0 0 auto',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  bannerImage: {
    height: '100%',
    width: 'auto',
    objectFit: 'contain',
  },
  textArea: {
    flex: '1',
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#ffffff',
  },
  text: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0,
  },
  subText: {
    fontSize: '14px',
    marginTop: '8px',
    opacity: 0.8,
  },
  dots: {
    marginTop: '12px',
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
  },
  dot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#ccc',
    borderRadius: '50%',
  },
};

export default Banner;
