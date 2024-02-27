// import House_exercise_analysis from './category/house_exercise'

const House_exercise_analysis = require('./category/house_exercise')

export const House_exercise = (pose_data, kind_exercise, state_change_exercise) => {
    const exercise = kind_exercise
    if(exercise === 'exercise_1'){
        return House_exercise_analysis.exercise_1(pose_data, state_change_exercise)
    }
    
    if(exercise === 'exercise_2'){
        return House_exercise_analysis.exercise_2(pose_data, state_change_exercise)
    }

    if(exercise === 'exercise_3'){
        return House_exercise_analysis.exercise_3(pose_data, state_change_exercise)
    }

    if(exercise === 'exercise_4'){
        return House_exercise_analysis.exercise_4(pose_data, state_change_exercise)
    }

    if(exercise === 'exercise_5'){
        return House_exercise_analysis.exercise_5(pose_data, state_change_exercise)
    }

    if(exercise === 'exercise_6'){
        return House_exercise_analysis.exercise_6(pose_data, state_change_exercise)
    }   
}

export const Gym_exercise = () => {
    return "ok"    
}