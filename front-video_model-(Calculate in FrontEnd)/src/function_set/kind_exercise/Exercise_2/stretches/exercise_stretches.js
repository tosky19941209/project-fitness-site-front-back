const { config } = require('../../../config/config')
const { Angle_3_point, Angle_3d } = require('../../basic_function')

const decimal_point = 3
const max_score = 80
const min_score = 20
let counter = 0
let state_counter = true
let prevstatevalue = null
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const abdominal_stretch = (calc_data) => {
    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

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
    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const across_chest_shoulder_stretch = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_wrist
    const landmark2 = config.index_landmark.right_elbow
    const landmark3 = config.index_landmark.right_shoulder

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let accuracy = (170 - angle_1) * 100 / 155
    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }
    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const adductor_dynamic_stretch = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

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
    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const adductor_stretch_side_standing = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_knee
    const landmark2 = config.index_landmark.right_hip
    const landmark3 = config.index_landmark.left_knee

    const landmark4 = config.index_landmark.left_hip
    const landmark5 = config.index_landmark.left_knee
    const landmark6 = config.index_landmark.left_ankle

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let angle_2 = Angle_3_point(pose_data, landmark4, landmark5, landmark6)
    let accuracy1 = 100 - (120 - angle_1) * 100 / 105
    let accuracy2 = (180 - angle_2) * 100 / 70
    let accuracy = (accuracy1 + accuracy2) / 2
    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const arm_circle = (calc_data) => {
    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_wrist
    const landmark2 = config.index_landmark.right_shoulder
    const landmark3 = config.index_landmark.right_hip

    const landmark4 = config.index_landmark.left_wrist
    const landmark5 = config.index_landmark.left_shoulder
    const landmark6 = config.index_landmark.left_hip

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let angle_2 = Angle_3_point(pose_data, landmark4, landmark5, landmark6)

    let accuracy1 = 100 - (140 - angle_1) * 100 / 80
    let accuracy2 = 100 - (140 - angle_2) * 100 / 80
    let accuracy = (accuracy1 + accuracy2) / 2

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const backhand_raise = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_hip
    const landmark2 = config.index_landmark.right_shoulder
    const landmark3 = config.index_landmark.right_wrist

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)

    let accuracy = angle_1 * 100 / 30

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }


}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const standing_gastrocnemius_stretch = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_hip
    const landmark2 = config.index_landmark.right_knee
    const landmark3 = config.index_landmark.right_heel

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)

    let accuracy = 100 - (170 - angle_1) * 100 / 50

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const back_slaps_wrap_around_stretch = (calc_data) => {
    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_wrist
    const landmark2 = config.index_landmark.right_shoulder
    const landmark3 = config.index_landmark.left_shoulder

    const landmark4 = config.index_landmark.left_wrist
    const landmark5 = config.index_landmark.left_shoulder
    const landmark6 = config.index_landmark.right_shoulder

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let angle_2 = Angle_3_point(pose_data, landmark4, landmark5, landmark6)

    let accuracy1 = (180 - angle_1) * 100 / 150
    let accuracy2 = (180 - angle_2) * 100 / 150

    let accuracy = (accuracy1 + accuracy2) / 2
    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const backwards_abdominal_stretch = (calc_data) => {
    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

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
    const landmark3 = config.index_landmark.left_shoulder

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let accuracy = (180 - angle_1) * 100 / 20

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const biceps_stretch_behind_the_back = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.left_wrist
    const landmark2 = config.index_landmark.left_shoulder
    const landmark3 = config.index_landmark.right_shoulder

    const landmark4 = config.index_landmark.right_wrist
    const landmark5 = config.index_landmark.right_shoulder
    const landmark6 = config.index_landmark.left_shoulder

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let angle_2 = Angle_3_point(pose_data, landmark4, landmark5, landmark6)
    let accuracy1 = (100 - angle_1) * 100 / 16
    let accuracy2 = (100 - angle_2) * 100 / 16

    let accuracy = (accuracy1 + accuracy2) / 2

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const boat_stretch = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

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
    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const butterfly_yoga = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_knee
    const landmark2 = config.index_landmark.right_hip
    const landmark3 = config.index_landmark.left_hip

    const landmark4 = config.index_landmark.left_knee
    const landmark5 = config.index_landmark.left_hip
    const landmark6 = config.index_landmark.right_hip

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let angle_2 = Angle_3_point(pose_data, landmark4, landmark5, landmark6)
    let accuracy1 = 100 - (180 - angle_1) * 100 / 50
    let accuracy2 = 100 - (180 - angle_2) * 100 / 50
    let accuracy = (accuracy1 + accuracy2) / 2

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const calf_stretch_with_rope = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_hip
    const landmark2 = config.index_landmark.right_knee
    const landmark3 = config.index_landmark.left_ankle

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let accuracy = 100 - (150 - angle_1) * 100 / 90

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const calves_stretch_on_stairs = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_knee
    const landmark2 = config.index_landmark.right_ankle
    const landmark3 = config.index_landmark.right_foot_index

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let accuracy = (100 - angle_1) * 100 / 10

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ceiling_look_stretch = (calc_data) => {
    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_knee
    const landmark2 = config.index_landmark.right_hip
    const landmark3 = config.index_landmark.right_shoulder

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let accuracy = 100 - (180 - angle_1) * 100 / 80

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const chest_out_hands_behind_hold = (calc_data) => {
    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_wrist
    const landmark2 = config.index_landmark.right_shoulder
    const landmark3 = config.index_landmark.right_hip

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let accuracy = 100 - (40 - angle_1) * 100 / 35

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const circles_knee_stretch = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_hip
    const landmark2 = config.index_landmark.right_knee
    const landmark3 = config.index_landmark.right_ankle

    let angle_1 = Angle_3d(pose_data, landmark1, landmark2, landmark3)
    let accuracy = (140 - angle_1) * 100 / 50

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const cobra_side_abdominal_stretch = (calc_data) => {
    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_knee
    const landmark2 = config.index_landmark.right_hip
    const landmark3 = config.index_landmark.right_shoulder

    let angle_1 = Angle_3d(pose_data, landmark1, landmark2, landmark3)
    let accuracy = (150 - angle_1) * 100 / 30

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const cobra_yoga_pose_hold = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_knee
    const landmark2 = config.index_landmark.right_hip
    const landmark3 = config.index_landmark.right_shoulder

    let angle_1 = Angle_3d(pose_data, landmark1, landmark2, landmark3)
    let accuracy = (180 - angle_1) * 100 / 40

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const crouching_heel_back_calf_stretch = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.left_wrist
    const landmark2 = config.index_landmark.right_shoulder
    const landmark3 = config.index_landmark.right_hip

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let accuracy = angle_1

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}

//////////////////////////////////////////////////////////////////////////////////////////////////

export const dynamic_arm_swing_back_stretch = (calc_data) => {
    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.left_wrist
    const landmark2 = config.index_landmark.left_shoulder
    const landmark3 = config.index_landmark.left_hip

    const landmark4 = config.index_landmark.right_wrist
    const landmark5 = config.index_landmark.right_shoulder
    const landmark6 = config.index_landmark.right_hip

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let angle_2 = Angle_3_point(pose_data, landmark4, landmark5, landmark6)

    let accuracy1 = 100 - (180 - angle_1) * 100 / 180
    let accuracy2 = 100 - (180 - angle_2) * 100 / 180

    let accuracy = (accuracy1 + accuracy2) / 2

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
export const elbow_back_stretch = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

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
    const landmark3 = config.index_landmark.left_shoulder

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)

    let accuracy = (180 - angle_1) * 100 / 20

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }

}

///////////////////////////////////////////////////////////////////////////////////////////////

export const fixed_bar_stretch = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_wrist
    const landmark2 = config.index_landmark.right_elbow
    const landmark3 = config.index_landmark.right_shoulder

    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let accuracy = (140 - angle_1) * 100 / 40

    if (accuracy > 100) accuracy = 100
    else if (accuracy < 0) accuracy = 0

    if (accuracy > max_score && state_counter === false) {
        counter = counter + 1;
        state_counter = true;
    }

    else if (accuracy < min_score) {
        state_counter = false;
    }

    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }

}

//////////////////////////////////////////////////////////////////////////////////////////

export const hamstring_lying_curl_up_stretch = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data

    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }

    const landmark1 = config.index_landmark.right_knee
    const landmark2 = config.index_landmark.right_hip
    const landmark3 = config.index_landmark.right_shoulder

    const landmark4 = config.index_landmark.right_hip
    const landmark5 = config.index_landmark.right_knee
    const landmark6 = config.index_landmark.right_ankle



    let angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    let angle_2 = Angle_3_point(pose_data, landmark4, landmark5, landmark6)

    let accuracy = 0
    if (angle_1 > 80 && angle_1 < 120) {

        accuracy = 100 - (180 - angle_2) * 100 / 90

        if (accuracy > 100) accuracy = 100
        else if (accuracy < 0) accuracy = 0

        if (accuracy > max_score && state_counter === false) {
            counter = counter + 1;
            state_counter = true;
        }

        else if (accuracy < min_score) {
            state_counter = false;
        }
    }



    const new_accuracy = Number(accuracy.toFixed(decimal_point))
    return { accuracy: new_accuracy, counter: counter, state: state_change_exercise }
}

///////////////////////////////////////////////////////////////////////////////////////////////

export const hamstring_lying_straight_leg_stretch = (calc_data) => {
    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data
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

//////////////////////////////////////////////////////////////////////////

export const kneeling_hip_flexor_stretch = (calc_data) => {

    const state_change_exercise = calc_data.state_change_exercise
    const pose_data = calc_data.pose_data
    if (prevstatevalue === state_change_exercise) {
        prevstatevalue = state_change_exercise
    }
    else {
        counter = 0
        state_counter = true
        prevstatevalue = state_change_exercise
    }
    const landmark1 = config.index_landmark.right_knee
    const landmark2 = config.index_landmark.right_hip
    const landmark3 = config.index_landmark.left_knee

    const angle_1 = Angle_3_point(pose_data, landmark1, landmark2, landmark3)
    const accuracy = 100 - (105 - angle_1) * 100 / 10

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