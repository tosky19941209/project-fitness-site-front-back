import {House_exercise, Gym_exercise} from './category'
export const Analysis_exercise = (calc_data) => {
    const pose_data = calc_data.pose_data
    const kind_exercise = calc_data.kind_exercise
    const state_change_exercise = calc_data.state_change_exercise
    if(kind_exercise.category === 'Gym'){
        const result = Gym_exercise(pose_data, kind_exercise.exercise, state_change_exercise)
        return (result)
     }
     else if (kind_exercise.category === 'House'){
         const result = House_exercise(pose_data, kind_exercise.exercise, state_change_exercise)
         return (result)
     }
}