import css from '../Options/Options.module.css'

export default function Options({
  updateFeedback,
  resetFeedback,
  totalFeedback,
}) {
  return (
    <div>
      <ul className={css.list}>
        <li>
          <button
            type="button"
            className={css.button}
            onClick={() => updateFeedback('good')}
          >
            Good
          </button>
        </li>
        <li>
          <button
            type="button"
            className={css.button}
            onClick={() => updateFeedback('neutral')}
          >
            Neutral
          </button>
        </li>
        <li>
          <button
            type="button"
            className={css.button}
            onClick={() => updateFeedback('bad')}
          >
            Bad
          </button>
        </li>
        <li>
          {totalFeedback !== 0 && (
            <button
              type="button"
              className={css.button}
              onClick={resetFeedback}
            >
              Reset
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
