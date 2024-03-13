import { Stretches } from "./kind_exercise/Exercise_2/stretches/stretches"

export const Exercise_1 = (calc_data) => {

}

export const Exercise_2 = (calc_data) => {
    const category = calc_data.kind_exercise.category
    if( category === 'Stretches'){
        const result = Stretches(calc_data)
        return result
    }
}