import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	const [steps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	const handlePrev = () => {
		if (!isFirstStep) setActiveIndex(prev => prev - 1);
	};

	const handleNext = () => {
		if (!isLastStep) setActiveIndex(prev => prev + 1);
	};

	const handleReset = () => setActiveIndex(0);

	const handleStepClick = index => setActiveIndex(index);

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((step, index) => {
							let itemClass = styles['steps-item'];
							if (index < activeIndex) itemClass += ` ${styles.done}`;
							if (index === activeIndex) itemClass += ` ${styles.active}`;
							return (
								<li key={step.id} className={itemClass}>
									<button
										className={styles['steps-item-button']}
										onClick={() => handleStepClick(index)}>
										{index + 1}
									</button>
									{step.title}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={handlePrev}
							disabled={isFirstStep}>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={isLastStep ? handleReset : handleNext}>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
