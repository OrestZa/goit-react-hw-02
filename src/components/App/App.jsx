import css from '../App/App.module.css'
import Options from '../Options/Options';
import Feedback from '../Feedback/Feedback';
import Description from '../Description/Description';
import Notification from '../Notification/Notification';
import { useState, useEffect } from 'react';

export default function App() {
  const defaultFeetback = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  const [feedbackCount, setFeedbackCount] = useState(() => {
    const savedFeedback = localStorage.getItem('feedbackCount');
    return savedFeedback ? JSON.parse(savedFeedback) :  defaultFeetback ;
})


  useEffect(() => {
    localStorage.setItem('feedbackCount', JSON.stringify(feedbackCount));
  }, [feedbackCount]);


  const updateFeedback = feedbackType => {
    setFeedbackCount(prevFeedback => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };


  const totalFeedback =
    feedbackCount.good + feedbackCount.neutral + feedbackCount.bad;
  

  const positiveFeedback = totalFeedback !== 0 ? Math.round(
    (feedbackCount.good / totalFeedback) * 100
  ) : 0;

  const resetFeedback = () => {
    setFeedbackCount({...defaultFeetback});
  };

  return (
    <>
      <Description />

      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback ? (
        <Feedback
          feedback={feedbackCount}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}