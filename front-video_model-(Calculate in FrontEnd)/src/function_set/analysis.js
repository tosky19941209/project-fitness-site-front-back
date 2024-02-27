import {Exercise_1, Exercise_2} from './category'

export const Analysis_exercise = (calc_data) => {
    // console.log(calc_data)
    const pose_data = calc_data.pose_data
    const kind_exercise = calc_data.kind_exercise
    const state_change_exercise = calc_data.state_change_exercise
    // if(kind_exercise.index === 'Exercise_1'){
    //     const result = Exercise_1(calc_data)
    //     // return result
    //  }
     if (kind_exercise.index === 'Exercise_2'){
         const result = Exercise_2(calc_data)
         return result
     }
}