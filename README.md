# Fourier Visualizer with React Native Skia in Remotion 🎨

This is a fancy project done in [Remotion](https://www.remotion.dev/) and [React Native Skia](https://shopify.github.io/react-native-skia/) with the goal of building SVG Path using the Fourier Transform.

The concept behind this repo is strongly inspired by the following resources:

- [3Blue1Brown](https://twitter.com/3Blue1Brown): ["But what is a Fourier series? From heat flow to drawing with circles"](https://youtu.be/r6sGWTCMz2k)
- [Jezzamon](https://twitter.com/jezzamonn): ["An Interactive Introduction to Fourier Transforms"](https://www.jezzamon.com/fourier/index.html)

The idea behind this project is absolutely not mine, and the algorithms are wrappers of [fft.js](https://www.npmjs.com/package/fft.js).
I simply used the same algorithms to run it using **React Native Skia** and render the output with **Remotion**.

## How to Run

Install the dependencies:

```bash
yarn install
```

Execute in dev mode:

```bash
yarn start
```

Render the video:

```bash
yarn build
```

Before doing that you might want to change the `settings` in the `remotion.config.ts` file.

## How it Works

At its core, a Fourier Transform allows us to express any function (in this case, a path) as a sum of sinusoids (sines and cosines). Each sinusoid has a specific frequency, amplitude, and phase. In the context of this visualizer, think of them as individual contributors that, when combined, recreate the original path.

### The Process

1. **Path to Points**: The `SkPath` is converted into a set of linearly interpolated points using the `generateLinearInterpolatedPoints` function. This function ensures that the path is represented as a series of discrete points that can be processed further.

2. **Preparing for FFT**: For the Fast Fourier Transform (FFT) to work effectively, the number of points must be a power of two. The `fillToPowerOfTwo` function ensures this by possibly adding extra points, guaranteeing compatibility with FFT.

3. **Fast Fourier Transform**: With our points ready, they undergo the FFT process using the `computeFFT` function. The FFT transforms our spatial data (points in space) into frequency data. This is where we identify the sinusoids that best represent our path.

4. **Extraction of Epicycles**: Post-FFT, we use the `extractEpicycles` function to determine the epicycles' properties (frequency, amplitude, phase). These are the circles you see in the visualization.

5. **Visualization**:

   - **Circles (Epicycles)**: As time (`t`) progresses, each epicycle rotates based on its frequency. The radius of the circle represents its amplitude, and its starting position is adjusted by its phase.
   - **Path Tracing**: Starting from the center, each epicycle contributes to a point in space. As we sum the contributions of all epicycles, we trace the original path.

   The visualization involves both showing the rotating circles (epicycles) and the path they trace. The `circlesPath` and `resultPath` are used for these purposes.

6. **Rendering**: Finally, the visualizations are rendered using the Skia paths. The epicycles, the path being traced, and the final traced path are all displayed in real-time as the Fourier Transform evolves.

### The Result

What you witness is a mesmerizing dance of circles, collectively working to draw the original path 🕺🏻.

## Feedback & Contribution

This is a demo project, but if you have suggestions, feedback, or want to show how you've expanded on this idea, feel free to open issues or submit pull requests!

## License

MIT

---
