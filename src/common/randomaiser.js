const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

export const randomStartPoint = (playField) => {
    debugger
    let rowL = playField.length
    let colL = playField[0].length
    return [getRandomInt(0, rowL), getRandomInt(0, colL) ]
}

export const randomMotions = (startPoint, playField, motionsLength) => {
    debugger
    let motions = []
    let cases = []
    let currentPoint = startPoint
    let data = []

    let reqest = (playField, R, C) => {
        if (playField[R][C-1]) {cases.push('left')}
        if (playField[R][C+1]) {cases.push('right')}
        if (playField[R-1]) {cases.push('up')}
        if (playField[R+1]) {cases.push('down')}

    }

    for (let i = 0; i<motionsLength; i++) {
            reqest(playField, currentPoint[0], currentPoint[1])
            let randomCase = cases.length > 1 ? cases[getRandomInt(0, cases.length)] : cases[0]
            motions.push({type: randomCase})
            if (randomCase === 'left') {currentPoint[1] = currentPoint[1] - 1}
            if (randomCase === 'right') {currentPoint[1] = currentPoint[1] + 1}
            if (randomCase === 'up') {currentPoint[0] = currentPoint[0] - 1}
            if (randomCase === 'down') {currentPoint[0] = currentPoint[0] + 1}
            cases = []
    }
    data.push(motions)
    data.push(currentPoint)
    return  data
}