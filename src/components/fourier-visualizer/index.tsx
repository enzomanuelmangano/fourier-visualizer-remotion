import {
	Path,
	SkPath,
	Skia,
	useComputedValue,
	useValue,
} from '@shopify/react-native-skia';
import React, {useMemo} from 'react';

// Utility functions to manage and transform path points
import {
	fillToPowerOfTwo,
	generateLinearInterpolatedPoints,
	getPoints,
} from './utils/fill';

// Utility functions for Fourier series visualization
import {extractEpicycles} from './utils/extract-epicycles';
import {computeFFT} from './utils/fft';
import {Point} from './utils/types';

type FourierVisualizerProps = {
	t: number;
	strokeWidth?: number;
	path: SkPath;
	onPathUpdate?: (center: Point) => void;
};

const FourierVisualizer: React.FC<FourierVisualizerProps> = ({
	strokeWidth = 1.5,
	t,
	path,
	onPathUpdate,
}) => {
	// Shared value to store epicycles computed from the path
	const epicycles = useMemo(() => {
		// Convert path into linearly interpolated points
		const points = generateLinearInterpolatedPoints(getPoints(path), 10);

		// Ensure the number of points is a power of two for FFT
		const filledPoints = fillToPowerOfTwo(points);

		// Compute the Fast Fourier Transform on the points
		const data = computeFFT(filledPoints);

		return extractEpicycles(data).sort((a, b) => b.amplitude - a.amplitude);
	}, [path]);

	// Paths for visualizing the Fourier series
	const resultPath = useValue(Skia.Path.Make());
	const circlesPath = useValue(Skia.Path.Make());

	// Derive the visualization path based on the time evolution of epicycles
	const drawPath = useComputedValue(() => {
		const skPath = Skia.Path.Make();
		circlesPath.current.reset();

		let x = 0;
		let y = 0;

		// Compute the visualization based on each epicycle
		for (const epicycle of epicycles) {
			const {frequency, amplitude, phase} = epicycle;

			// Visualize the circles around the path
			if (x !== 0 && y !== 0) {
				circlesPath.current.addCircle(x, y, amplitude);
			}

			// Calculate the position on the circle for the current epicycle
			x += amplitude * Math.cos(frequency * t + phase);
			y += amplitude * Math.sin(frequency * t + phase);

			// Connect the path to the new position
			const lastSkiaPathPt = skPath.getLastPt();
			if (lastSkiaPathPt.x === 0 && lastSkiaPathPt.y === 0) {
				skPath.moveTo(x, y);
			} else {
				skPath.lineTo(x, y);
			}

			// Update the center of the visualization
			if (onPathUpdate) {
				onPathUpdate({x, y});
			}
		}

		// Update the resultPath to visualize the overall path over time
		const lastResultPathPt = resultPath.current.getLastPt();
		if (lastResultPathPt.x === 0 && lastResultPathPt.y === 0) {
			resultPath.current.moveTo(x, y);
		} else {
			resultPath.current.lineTo(x, y);
		}

		return skPath;
	}, [t, epicycles, path]);

	return (
		// Render the visualization paths
		<>
			<Path
				path={drawPath}
				strokeWidth={1}
				color="white"
				style="stroke"
				opacity={0.8}
			/>
			<Path
				path={circlesPath}
				strokeWidth={0.7}
				color="white"
				style="stroke"
				opacity={0.6}
				strokeCap="round"
			/>
			<Path
				path={resultPath}
				strokeWidth={strokeWidth}
				color="yellow"
				style="stroke"
			/>
		</>
	);
};

export {FourierVisualizer};
