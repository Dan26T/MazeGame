import React, {useEffect, useState} from 'react'
import {randomMotions, randomStartPoint} from "../common/randomaiser";
import s from './game.module.css'
import {createPlayField, getMotionsLength} from "../Redux/gameReducer.js";

const gameText = (status) => {
    debugger
    if(status === 'Fail'){
        return 'Do you want try again?'
    }else if(status === 'Win'){
        return 'Do you want play again?'
    }else{
        return 'Do you want play?'
    }
}
const gameSubText = (status) => {
    debugger
    if(status === 'Fail'){
        return 'Sorry, you lost..'
    }else if(status === 'Win'){
        return 'Congratulations, you won!!'
    }else{
        return  ''
    }
}


const StartGame = (props) => {
    let [text, setText] = useState( "Do you want play?")
    let [subText, setSubText] = useState("")
    let [lvl, setLvl] = useState("easy")
    useEffect(()=> {
        debugger
        setText(gameText(props.gameStatus))
        setSubText(gameSubText(props.gameStatus))
    }, [props.gameStatus])
    useEffect(()=> {
        debugger
        setLvl(props.lvl)
    }, [props.lvl])

    let restartGame = () => {
        props.startGame(lvl)
        let start = randomStartPoint(createPlayField(lvl))
        props.getStartPoint(start)
        let data = randomMotions(start, createPlayField(lvl), getMotionsLength(lvl))
        props.getMotions(data)
    }
    let changeLvl = (e) => {
        let newLvl = e.target.value
        setLvl(newLvl)
    }
    let changeLvlColor = () => {
        if (lvl==='medium') return s.medium
        if (lvl==='hard') return s.hard
    }


    return <div className={s.startMenu}>
         <div className={s.text_block}>
            <h1 className={s.hello_text}>{subText}</h1>
            <h1 className={s.hello_text}>{text}</h1>
        </div>
        <span className={s.options_block}>
            <h1 style={{marginRight:20+'px'}}>Level</h1>
                <select id="lvl" className={lvl === 'easy' ? s.select : [s.select, changeLvlColor()].join(' ')}
                        onChange={e => changeLvl(e)} defaultValue={props.lvl} >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
        </span>
        {props.userIsPlayed === true ? <span className={s.butt}  onClick={() => {restartGame()}}><a href="#">Start</a></span> :
            <span className={s.butt} onClick={() => {props.startGame(lvl)}}><a href="#">Start</a></span>}

    </div>
}

export default StartGame
