import {Composition} from 'remotion';
import {FourierVisualizerComposition} from './FourierVisualizerComposition';

const FPS = 30;

const SECONDS = 60;

export const durationInFrames = FPS * SECONDS;

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="FourierVisualizer"
				component={FourierVisualizerComposition}
				durationInFrames={durationInFrames}
				fps={FPS}
				width={1920}
				height={1080}
			/>
		</>
	);
};
