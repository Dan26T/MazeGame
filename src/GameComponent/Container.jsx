import React from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import {getMotions, getStartPoint, startGame} from "../Redux/gameReducer";
import StartGame from "./StartGame";
import GameContainer from "./GameContainer";

class Container extends React.Component {

    render() {
        if (this.props.gameStatus === "Run"){
            return <>
                <GameContainer/>
            </>
        }else if (this.props.gameStatus === "Stopped"){
            return <>
                <StartGame gameStatus={this.props.gameStatus} startGame={this.props.startGame}
                           playField={this.props.playField} getStartPoint={this.props.getStartPoint}
                           getMotions={this.props.getMotions} motionsLength={this.props.motionsLength}
                           userIsPlayed={this.props.userIsPlayed} lvl={this.props.lvl}/>
            </>
        }else{
            return <div style={{marginTop:-180+'px'}}>
                <StartGame gameStatus={this.props.gameStatus} startGame={this.props.startGame}
                           playField={this.props.playField} getStartPoint={this.props.getStartPoint}
                           getMotions={this.props.getMotions} motionsLength={this.props.motionsLength}
                           userIsPlayed={this.props.userIsPlayed} lvl={this.props.lvl}/>
                <GameContainer />
            </div>
        }
    }
}

let mapStateToProps = (state) => {
    return {
        gameStatus: state.gamePage.gameStatus,
        playField: state.gamePage.playField,
        motionsLength: state.gamePage.motionsLength,
        userIsPlayed: state.gamePage.userIsPlayed,
        lvl: state.gamePage.lvl

    }
}

export default compose(
    connect(mapStateToProps, {startGame, getStartPoint, getMotions})
)(Container);

