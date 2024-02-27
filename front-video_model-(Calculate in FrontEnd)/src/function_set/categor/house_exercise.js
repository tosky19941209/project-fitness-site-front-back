import {config} from '../config/config'
import { Angle_3_point } from '../kind_exercise/basic_function' 
const decimal_point = 3
let counter = 0
let state_counter = true
let prevstatevalue = null
///////////////////////////////////////////////////////
export const exercise_1 = (pose_data, state_change_exercise) => {
    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }
    const landmark1 = config.index_landmark.right_shoulder
    const landmark2 = config.index_landmark.right_hip
    const landmark3 = config.index_landmark.right_ankle

    const angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    const accuracy = (180 - angle_1) * 100 / 90

    if (accuracy > 80 && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < 20) {
        state_counter = false;
    }
    const new_accuracy = Number(accuracy.toFixed(decimal_point));
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}
////////////////////////////////////////////////
export const exercise_2 = (pose_data, state_change_exercise) => {
    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.left_knee
    const landmark2 = config.index_landmark.left_hip
    const landmark3 = config.index_landmark.nose

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let accuracy = 100 - (angle_1 - 12) * 100 / 12
    if( accuracy > 100 ) accuracy = 100
    else if(accuracy < 0) accuracy = 0
    
    if (accuracy > 80 && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < 20) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}
////////////////////////////////////////////////
export const exercise_3 = (pose_data, state_change_exercise) => {
    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.left_ankle
    const landmark2 = config.index_landmark.left_hip
    const landmark3 = config.index_landmark.right_ankle

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let accuracy = 100 - (angle_1) * 100 / 45
    if( accuracy > 100 ) accuracy = 100
    else if(accuracy < 0) accuracy = 0
    
    if (accuracy > 80 && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < 20) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}

//////////////////////////////////////////////////////////////
export const exercise_4 = (pose_data, state_change_exercise) => {
    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_ankle
    const landmark2 = config.index_landmark.right_knee
    const landmark3 = config.index_landmark.right_hip

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let accuracy = (angle_1 - 50) * 100 / 130
    if( accuracy > 100 ) accuracy = 100
    else if(accuracy < 0) accuracy = 0
    
    if (accuracy > 80 && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < 20) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}

//////////////////////////////////////////////////////
export const exercise_5 = (pose_data, state_change_exercise) => {
    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.nose
    const landmark2 = config.index_landmark.right_hip
    const landmark3 = config.index_landmark.right_ankle

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    // let accuracy = angle_1
    let accuracy = 100 - (angle_1 - 150) * 100 / 30
    if( accuracy > 100 ) accuracy = 100
    else if(accuracy < 0) accuracy = 0
    
    if (accuracy > 80 && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < 20) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}

//////////////////////////////////////////////////////
export const exercise_6 = (pose_data, state_change_exercise) => {
    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.nose
    const landmark2 = config.index_landmark.right_hip
    const landmark3 = config.index_landmark.right_knee

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let accuracy = angle_1
    // let accuracy = 100 - (angle_1 - 150) * 100 / 30
    // if( accuracy > 100 ) accuracy = 100
    // else if(accuracy < 0) accuracy = 0
    
    // if (accuracy > 80 && state_counter === false) {
    //     counter = counter + 1;
    //     state_counter = true;
    // }

    // else if (accuracy < 20) {
    //     state_counter = false;
    // }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}