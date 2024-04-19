import css from '../App/App.module.css'
import Options from '../Options/Options';
import Feedback from '../Feedback/Feedback';
import Description from '../Description/Description';
import Advertisement from '../Advertisement/Advertisement'
import { useState, useEffect } from 'react';

export default function App() {
  const [feedbackCount, setFeedbackCount] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  useEffect(() => {
    const savedFeedback = localStorage.getItem('feedbackCount');
    if (savedFeedback !== null) {
      return setFeedbackCount(JSON.parse(savedFeedback));
    }
    return 0;
  }, []);


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


  const positiveFeedback = Math.round(
    (feedbackCount.good / totalFeedback) * 100
  );

  const resetFeedback = () => {
    setFeedbackCount({
      good: 0,
      neutral: 0,
      bad: 0,
    });
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
        <Advertisement/>
      )}
    </>
  );
}