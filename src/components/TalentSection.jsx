import React from 'react';

function TalentSection() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛠️ 능력자를 찾습니다!</h2>
      
    </div>
  );
}

const styles = {
  container: {
    margin: '16px',
    marginBottom: '80px', 
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default TalentSection;
