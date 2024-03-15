import Camera from './camera/camera'
import Result from './result/result'
import { useEffect, useState } from 'react';
function Analytics() {
  const [stateResultData, setStateResultData] = useState({
    btnStateStart: false,
    iswebcamEnable: false,
    kind_exercise: {
      index: '',
      category: '',
      exercise: ''
    }
  })

  const [exerciseResult, setExerciseResult] = useState({
    year:'',
    month:'',
    date:'',
    day:'',
    hour:'',
    minute:'',
    index: '',
    category: '',
    exercise: '',
    counter: '',
    accuracy: '',
    durtime:''
  })

  return (
    <div className='flex flex-col xl:flex-row justify-start items-center   w-[100%] h-[100%] sm:h-[150%] md:h-[170%] xl:h-[80%]'>
      <Camera setStateResultData={setStateResultData} stateResultData={stateResultData} exerciseResult={exerciseResult} setExerciseResult={setExerciseResult} ></Camera>
      <Result setStateResultData={setStateResultData} stateResultData={stateResultData} exerciseResult={exerciseResult} setExerciseResult={setExerciseResult}></Result>
    </div>
  );
}

export default Analytics;
