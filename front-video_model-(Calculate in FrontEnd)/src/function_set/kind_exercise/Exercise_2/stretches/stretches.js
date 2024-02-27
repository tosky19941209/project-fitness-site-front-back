const exercise_stretches = require('./exercise_stretches')
export const Stretches = (calc_data) => {
    const exercise = calc_data.kind_exercise.exercise
    if (exercise === 'abdominal-stretch') {
        const result = exercise_stretches.abdominal_stretch(calc_data)
        return result
    }

    if (exercise === 'across-chest-shoulder-stretch') {
        const result = exercise_stretches.across_chest_shoulder_stretch(calc_data)
        return result
    }

    if (exercise === 'adductor-dynamic-stretch') {
        const result = exercise_stretches.adductor_dynamic_stretch(calc_data)
        return result
    }

    if (exercise === 'adductor-stretch-side-standing') {
        return exercise_stretches.adductor_stretch_side_standing(calc_data)
    }

    if (exercise === 'arm-circle')
        return exercise_stretches.arm_circle(calc_data)

    if (exercise === 'backhand-raise')
        return exercise_stretches.backhand_raise(calc_data)

    if (exercise === 'standing-gastrocnemius-stretch')
        return exercise_stretches.standing_gastrocnemius_stretch(calc_data)

    if (exercise === 'back-slaps-wrap-around-stretch')
        return exercise_stretches.back_slaps_wrap_around_stretch(calc_data)

    if (exercise === 'backwards-abdominal-stretch')
        return exercise_stretches.backwards_abdominal_stretch(calc_data)

    if (exercise === 'biceps-stretch-behind-the-back')
        return exercise_stretches.biceps_stretch_behind_the_back(calc_data)

    if (exercise === 'boat-stretch')
        return exercise_stretches.boat_stretch(calc_data)

    if (exercise === 'butterfly-yoga')
        return exercise_stretches.butterfly_yoga(calc_data)

    if (exercise === 'calf-stretch-with-rope')
        return exercise_stretches.calf_stretch_with_rope(calc_data)

    if (exercise === 'calves-stretch-on-stairs')
        return exercise_stretches.calves_stretch_on_stairs(calc_data)

    if (exercise === 'ceiling-look-stretch')
        return exercise_stretches.ceiling_look_stretch(calc_data)

    if (exercise === 'chest-out-hands-behind-hold')
        return exercise_stretches.chest_out_hands_behind_hold(calc_data)

    if (exercise === 'circles-knee-stretch')
        return exercise_stretches.circles_knee_stretch(calc_data)
    
    if (exercise === 'cobra-side-abdominal-stretch')
        return exercise_stretches.cobra_side_abdominal_stretch(calc_data)

    if (exercise === 'cobra-yoga-pose-hold')
        return exercise_stretches.cobra_yoga_pose_hold(calc_data)

    if (exercise === 'crouching-heel-back-calf-stretch')
        return exercise_stretches.crouching_heel_back_calf_stretch(calc_data)

    if (exercise === 'dynamic-arm-swing-back-stretch')
        return exercise_stretches.dynamic_arm_swing_back_stretch(calc_data)

    if (exercise === 'elbow-back-stretch')
        return exercise_stretches.elbow_back_stretch(calc_data)

    if (exercise === 'fixed-bar-stretch')
        return exercise_stretches.fixed_bar_stretch(calc_data)

    if (exercise === 'hamstring-lying-curl-up-stretch')
        return exercise_stretches.hamstring_lying_curl_up_stretch(calc_data)
}

