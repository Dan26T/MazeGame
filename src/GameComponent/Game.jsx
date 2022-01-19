import React, {useEffect, useState} from 'react'
import s from './game.module.css'
import Motion from "./Motion";
import fail from '../common/appIcons/Fail.ico'
import won from '../common/appIcons/Won.ico'
import start from '../common/appIcons/StartPoint.ico'
import user from '../common/appIcons/UserAnswer.ico'

const Game = (props) => {
    let [gameStatus, setGameStatus] = useState('Stopped')
    let [gameGMotions, setGMotions] = useState([])
    let [motionsCounter, setMotionsCounter] = useState(1)
    let checkNewMotionsStop = null
    let timeout = props.motionsLength*1000+300
    useEffect(() => {
        setGameStatus(props.gameStatus)
    }, [props.gameStatus])
    useEffect(() => {
        let vue = null
        if (gameStatus === 'Run' && props.motions.length !== 0 && motionsCounter < props.motions.length) {
            debugger
            vue = setInterval(_ => {
                setGMotions(props.motions.slice(0, motionsCounter))
                setMotionsCounter(motionsCounter += 1)
            }, 1000)
        }
        if (gameStatus === 'Run') {
            checkNewMotionsStop = setTimeout(() => {
                clearInterval(vue)
                if (gameStatus === 'Run' && motionsCounter > props.motions.length) {
                    clearTimeout(checkNewMotionsStop)
                }
            }, timeout)
        }
    }, [gameStatus])

    return <div className={ gameStatus === 'Run' ? [s.container, s.subMargin].join(' '):s.container}>
        <GameBoard playField={props.playField} gameMotions={gameGMotions} userAnswer={props.userAnswer}
                   userAnswerPoint={props.userAnswerPoint} gameCheck={props.gameCheck} gameStatus={props.gameStatus}
                   currentPointId={props.currentPointId} motionsLength={props.motionsLength}/>
    </div>
}

export default Game

const GameBoard = (props) => {
    let [playVField, setVField] = useState([])
    let [gameVMotions, setVMotions] = useState([])
    let checkResults = null
    let gameBoardColor = () => {
        if(props.gameStatus==='Win') return '#7de54f'
        if(props.gameStatus==='Fail') return '#d23f1b'
        return
    }
    useEffect(() => {
        if (props.userAnswerPoint[0] !== undefined) {
            checkResults = setTimeout(() => {
                props.gameCheck()
            }, 3000)
        }
        if (props.gameStatus !== 'Run') {
            console.log('stop')
            clearTimeout(checkResults)
        }
        setVField(props.playField)
    }, [props.playField])
    useEffect(() => {
        setVMotions(props.gameMotions)
    }, [props.gameMotions])

    return <div className={s.game}>
        <div className={s.gameBoard}>
            {playVField.map(r => {
                return <div className={s.rol}>
                    {r.map(c => {
                        return <div className={s.col} style={{background: gameBoardColor()}}
                                    onClick={props.gameStatus === 'Run' ? () => {props.userAnswer(r, c)}
                                    : () => {}}>
                            <Marker status={c.status} gameStatus={props.gameStatus}
                                    currentPointId={props.currentPointId}
                                    fieldId={c.id}/>
                        </div>
                    })
                    }
                </div>

            })
            }
        </div>
        <div className={s.motions}>
            {gameVMotions.map(m => {
                return <Motion type={m.type} length={gameVMotions.length} motionsLength={props.motionsLength}/>
            })
            }
        </div>
    </div>
}

const Marker = (props) => {
    let imgSelector = (fieldStatus) => {
        switch (fieldStatus) {
            case 'StartPoint':
                return start
            case 'UserAnswerPoint':
                return user
            case 'WonPoint':
                return won
            case 'FailPoint':
                return fail
        }
    }
    let fieldsSelector = (fieldStatus, gameStatus, currentPointId, fieldId) => {
        let gameRunningCheck = gameStatus === 'Run'
        switch (gameRunningCheck.toString()) {
            case 'true':
                return <img src={imgSelector(fieldStatus)}/>
            case 'false':
                if (fieldId === currentPointId && fieldStatus !== 'WonPoint') {
                    return <img src={imgSelector('WonPoint')}/>
                } else if (fieldStatus === 'FailPoint') {
                    return <span><img src={imgSelector('FailPoint')}/>
                    <img src={imgSelector('UserAnswerPoint')}/></span>
                }
                return <img src={imgSelector(fieldStatus)}/>

        }
    }
    return <>
        <div>{fieldsSelector(props.status, props.gameStatus, props.currentPointId, props.fieldId)}</div>
    </>
}