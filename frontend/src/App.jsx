import React, { useState } from 'react'
import axios from 'axios'
import './App.css' // Import the CSS file

function App() {
  const [step, setStep] = useState(1)
  const [nickname, setNickname] = useState('') // State for the nickname
  const [aboutYourself, setAboutYourself] = useState('') // State for about yourself

  const handleNext = async () => {
    if (step === 1) {
      try {
        await axios.post('http://localhost:5000/api/users', { nickname })
        setStep(step + 1)
      } catch (error) {
        console.error('Error adding nickname:', error)
      }
    } else {
      setStep(step + 1)
    }
  }

  const handlePrev = () => {
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${nickname}`, { about_yourself: aboutYourself })
      alert('Data submitted successfully')
    } catch (error) {
      console.error('Error submitting data:', error)
    }
  }

  return (
    <div dir="rtl">
      {step === 1 ? (
        <div>
          <h1>היי, נעים מאוד</h1>
          <p>
            השביעי לאוקטובר תפס אותנו לא מוכנים, ולפעמים קשה להתמודד עם
            המציאות כאן. אנחנו רוצים לעזור. הכנו שאלון קצר במטרה להכיר אתכם
            קצת. השאלון אנונימי ונדרש כ10-20 דקות למלא אותו? לא נוח לכם?
            אפשר לעצור באמצע ולהמשיך כשיתחשק לכם, אין לחץ. בחר לעצמך כינוי?(שם או כינוי, כל מה שאתה רוצה)
          </p>
          <label className="question-label">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </label>
          <button onClick={handleNext}>בואו נכיר קצת</button>
        </div>
      ) : step === 2 ? (
        <div>
          <h1>חלק ראשון- לפני השביעי לאוקטובר</h1>
          <p>
            הרבה אנשים נוטים לחלק את חייהם לחלקים, לפעמים חלוקה כזו עוזרת לנו
            להבין איך אנחנו מרגישים לגבי אירועים מסויימים
          </p>
          <p>שלום {nickname}, ספר על יום שגרתי בחייך לפני השביעי לאוקטובר.</p>
          <label className="question-label">
            <input
              type="text"
              value={aboutYourself}
              onChange={(e) => setAboutYourself(e.target.value)}
            />
          </label>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={handleNext}>הבא</button>
            <button onClick={handlePrev}>קודם</button>
          </div>
        </div>
      ) : step === 3 ? (
        <div>
          <h1>חלק שני- מצב חברתי</h1>
          <p>מהו המצב החברתי שלך, {nickname}?</p>
          <label className="question-label">
            <input
              type="text"
              value={aboutYourself}
              onChange={(e) => setAboutYourself(e.target.value)}
            />
          </label>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={handleNext}>הבא</button>
            <button onClick={handlePrev}>קודם</button>
          </div>
        </div>
      ) : (
        <div>
          <h1>חלק שלישי</h1>
          <p>כאן מופיע הטקסט השלישי</p>
          <p>ענית: {aboutYourself}</p>
          <button onClick={handlePrev}>קודם</button>
          <button onClick={handleSubmit}>שלח</button>
        </div>
      )}
    </div>
  )
}

export default App
