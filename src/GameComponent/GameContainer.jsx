import React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import Game from "./Game";
import {getMotions, getStartPoint, userAnswer, gameCheck} from "../Redux/gameReducer";
import {randomStartPoint, randomMotions} from "../common/randomaiser";
import s from './game.module.css'

class GameContainer extends React.Component {
    componentDidMount() {
        if (!this.props.userIsPlayed) {
            let start = randomStartPoint(this.props.playField)
            this.props.getStartPoint(start)
            let data = randomMotions(start, this.props.playField, this.props.motionsLength)
            this.props.getMotions(data)
        }
    }

    render() {
        return <div className={s.game_container}>
            <Game playField={this.props.playField} motions={this.props.motions}
                  startPointId={this.props.startPointId} currentPointId={this.props.currentPointId}
                  userAnswer={this.props.userAnswer} gameStatus={this.props.gameStatus}
                  gameCheck={this.props.gameCheck} userAnswerPoint={this.props.userAnswerPoint}
                  motionsLength={this.props.motionsLength}/>;
        </div>
    }
}

let mapStateToProps = (state) => {
    return {
        playField: state.gamePage.playField,
        gameStatus: state.gamePage.gameStatus,
        motions: state.gamePage.motions,
        motionsLength: state.gamePage.motionsLength,
        startPoint: state.gamePage.startPoint,
        currentPointId: state.gamePage.currentPointId,
        startPointId: state.gamePage.startPointId,
        userAnswerPoint: state.gamePage.userAnswerPoint,
        userIsPlayed: state.gamePage.userIsPlayed

    }
}

export default compose(
    connect(mapStateToProps, {getStartPoint, getMotions, userAnswer, gameCheck})
)(GameContainer);

