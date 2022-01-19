const GET_START_POINT = 'game/GET_START_POINT'
const GET_MOTIONS = 'game/GET_MOTIONS'
const SET_USER_ANSWER = 'game/SET_USER_ANSWER'
const START_GAME = 'game/START_GAME'
const GAME_CHECK = 'game/GAME_CHECK'


let initialState = {
    playField: [
        [{id: 1, status: ''}, {id: 2, status: ''}, {id: 3, status: ''}],
        [{id: 4, status: ''}, {id: 5, status: ''}, {id: 6, status: ''}],
        [{id: 7, status: ''}, {id: 8, status: ''}, {id: 9, status: ''}]
    ],
    motions: [],
    motionsLength: 10,
    startPoint: [],
    userAnswerPoint: [],
    startPointId: null,
    currentPointId: null,
    gameStatus: 'Stopped',
    userIsPlayed: false,
    lvl: 'easy'
};
export const createPlayField = (lvl) => {
    debugger
    let newState = []
    let rowCount = 0
    let colCount = 0
    if (lvl==='easy'){rowCount = 3; colCount = 3}
    if (lvl==='medium'){rowCount = 4; colCount = 4}
    if (lvl==='hard'){rowCount = 5; colCount = 5}
    for(let r=0; r<rowCount; r++){
        newState.push([])
        for(let c=0; c<colCount; c++){
            if (r===0 && c===0){newState[r].push({id:1, status: ''})
            }else if (r===0){newState[r].push({id:c+1, status: ''})
            }else newState[r].push({id:r*colCount+c+1, status: ''})
        }
    }
    debugger
    return newState
}
export const getMotionsLength = (lvl) => {
    if (lvl==='easy') return 10
    if (lvl==='medium') return 13
    if (lvl==='hard') return 16
}
const fieldChangeStatus = (state, R, C, newStatus) => {
    let newState = [...state]
    newState[R][C].status = newStatus
    return newState
}
const fieldUserAnswerStatus = (state, row, col) => {
    let newState = [...state]
    let R = newState.indexOf(row)
    let C = newState[R].indexOf(col)
    newState[R][C].status = 'UserAnswerPoint'

    return newState
}
const winCheckField = (state, userAnswer, currentPointId) => {
    let newState = [...state]
    let R = userAnswer[0]
    let C = userAnswer[1]
    if (newState[R][C].id === currentPointId) {
        newState[R][C].status = 'WonPoint'
    } else {
        newState[R][C].status = 'FailPoint'
    }
    return newState
}
const winCheckGameStatus = (state, userAnswer) => {
    let R = userAnswer[0]
    let C = userAnswer[1]
    if (state[R][C].status === 'WonPoint') {
        return 'Win'
    } else if (state[R][C].status === 'FailPoint'){
        return 'Fail'
    }
}


const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_START_POINT:
            let startR = action.startPoint[0]
            let startC = action.startPoint[1]
            let startPointId = state.playField[startR][startC].id
            return {
                ...state,
                startPoint: [...action.startPoint],
                startPointId: startPointId,
                playField: fieldChangeStatus(state.playField, startR, startC, 'StartPoint')
            }
        case GET_MOTIONS:
            let currentR = action.data[1][0]
            let currentC = action.data[1][1]
            let currentPointId = state.playField[currentR][currentC].id
            return {
                ...state,
                motions: [...action.data[0]],
                currentPointId: currentPointId
            }
        case SET_USER_ANSWER:
            let playField = fieldUserAnswerStatus(state.playField, action.row, action.col)
            let userAnswerRow = playField.indexOf(action.row)
            let userAnswerCol = playField[userAnswerRow].indexOf(action.col)
            return {
                ...state,
                playField: playField,
                userAnswerPoint: [userAnswerRow, userAnswerCol],

            }
        case GAME_CHECK:
            let playFieldChecked = winCheckField(state.playField, state.userAnswerPoint, state.currentPointId)
            return {
                ...state,
                playField: playFieldChecked,
                gameStatus: winCheckGameStatus(playFieldChecked, state.userAnswerPoint),
                userIsPlayed: true

            }
        case START_GAME:
            return {
                ...state,
                playField: [...createPlayField(action.lvl)],
                motions: [],
                motionsLength: getMotionsLength(action.lvl),
                startPoint: [],
                userAnswerPoint: [],
                startPointId: null,
                currentPointId: null,
                gameStatus: 'Run',
                lvl: action.lvl
            }
        default:
            return state;
    }
}

export const getStartPoint = (startPoint) => ({type: GET_START_POINT, startPoint})
export const getMotions = (data) => ({type: GET_MOTIONS, data})
export const userAnswer = (row, col) => ({type: SET_USER_ANSWER, row, col})
export const startGame = (lvl) => ({type: START_GAME, lvl})
export const gameCheck = () => ({type: GAME_CHECK})


export default gameReducer;