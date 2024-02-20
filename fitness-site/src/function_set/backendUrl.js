exports.Url_BackEnd = (kind_exercise) => {
    const category = kind_exercise.category
    const exercise = kind_exercise.exercise
    if (category === 'Gym') {
        return 'exercise_1'
    }
    else if (category === 'House') {
        return 'exercise_2'
    }
}
