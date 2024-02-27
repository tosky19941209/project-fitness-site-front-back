import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const Test = () => {
  const webcamRef = React.useRef(null);
  const canvasRef = useRef(null)
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // You can now use the imageSrc to display or process the captured frame
    // console.log(imageSrc);
  }, [webcamRef]);


  const handle = (e) => {
    const canvas = canvasRef.current
    const video = webcamRef.current.video
    const canvasCtx = canvas.getContext("2d");
    canvasCtx.drawImage(video, 0,0, 300, 300)
  }
  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{
            width:"1000px",
            height:"1000px",
            marginTop:'-300px'
        }}
      />
      <canvas ref = {canvasRef} width = '400px' height='300px' style={{
        backgroundColor:'black'
      }}></canvas>
      <button onClick={handle}>Capture</button>
    </>
  );
};

export default Test;