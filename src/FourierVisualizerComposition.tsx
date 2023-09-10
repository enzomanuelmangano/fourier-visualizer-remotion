import {SkiaCanvas} from '@remotion/skia';
import {Group, Rect} from '@shopify/react-native-skia';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

import {svgPath} from './constants';
import {durationInFrames} from './Root';
import {FourierVisualizer} from './components/fourier-visualizer';
import React from 'react';

export const FourierVisualizerComposition: React.FC = () => {
	const {height, width} = useVideoConfig();

	const frame = useCurrentFrame();

	// Full animation duration is 2 * Math.PI
	const time = interpolate(frame, [0, durationInFrames], [0, 2 * Math.PI]);

	return (
		<SkiaCanvas height={height} width={width}>
			<Rect color="black" x={0} y={0} width={width} height={height} />

			<Group
				transform={[
					{
						scale: (height / svgPath.getBounds().height) * 0.8,
					},
					{
						translateX: width / 2,
					},
					{
						translateY: height / 2,
					},
				]}
				origin={{
					x: width / 2,
					y: height / 2,
				}}
			>
				<FourierVisualizer path={svgPath} t={time} strokeWidth={4.5} />
			</Group>
		</SkiaCanvas>
	);
};
