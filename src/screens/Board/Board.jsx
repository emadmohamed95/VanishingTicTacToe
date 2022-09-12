import { View, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { Surface, Text, Paragraph, Dialog, Portal, Button, ProgressBar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { initGame, makeAiNextMove, makeNextMove, playAgain, vanishMove } from '../../actions/game';
// import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useCountdown } from 'react-native-countdown-circle-timer'

const Progressbar = ({settings, status, playTimer})=> {

    const dispatch = useDispatch()

    // console.log(playTimer)


    const {

        remainingTime,
        elapsedTime,
    } = useCountdown({
        isPlaying: playTimer, duration: settings.vanishDuration, colors: '#6750A4', onComplete: () => {
            // do your stuff here
            dispatch(vanishMove())
            return { shouldRepeat: true, delay: 1 } // repeat animation in 1.5 seconds
        }
    })

    return (
        <>
        <ProgressBar progress={remainingTime / settings.vanishDuration} color='#6750A4' visible style={styles.progress} />
                    <Text>Vanishing Timer</Text>
        </>

    )
}


const EndDialog = ({ visible, setVisible, status, navigation }) => {

    const dispatch = useDispatch()

    if (status === 'P1WON' || status === 'P2WON' || status === 'DRAW') {
        setVisible(true)
    }


    return (
        <Portal>
            <Dialog style={styles.dialog} visible={visible} onDismiss={() => { setVisible(false) }}>

                {
                    status !== 'DRAW' ? <Image
                        style={styles.dialogImg}
                        source={require('../../assets/Confetti.png')}
                    /> : ''
                }



                <Text style={styles.dialogText}>{status === 'P1WON' ? 'X Won!' : status === 'P2WON' ? 'O Won!' : 'Draw'}</Text>

                <View style={styles.buttonsView}>
                    <Button mode="outlined" textColor={'red'} style={styles.button} onPress={() => {
                        dispatch(playAgain())
                        setVisible(false)
                    }}>
                        Play Again

                    </Button>

                    <Button mode="outlined" style={styles.button} onPress={() => {
                        navigation.goBack()

                        /* 1. Navigate to the Details route with params */
                    }}>
                        Exit
                    </Button>
                </View>



                {/* <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is simple dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={()=>{setVisible(false)}}>Done</Button>
            </Dialog.Actions> */}
            </Dialog>
        </Portal>
    )
}

export const Board = ({ route, navigation }) => {

    const [visible, setVisible] = useState(false);

    const [playTimer, setPlayTimer] = useState(false);

    const { mode } = route.params;


    const game = useSelector(state => state.game)
    const settings = useSelector(state => state.settings)

    const dispatch = useDispatch()

    useEffect(() => {
        setVisible(false)
        dispatch(initGame(mode))
        if(settings.vanishMode){
            setPlayTimer(true)
        }
    }, [mode,settings])

    useEffect(() => {

        if(game.status==="ON_GOING"){
            setPlayTimer(true)
        }else{
            setPlayTimer(false)
        }
    }, [game.status])

    console.log(game)

    // console.log(settings)

    if (game.mode === 'PVE' && !game.p1Turn) {
        // setTimeout(() => {   dispatch(makeAiNextMove())}, 700);

        dispatch(makeAiNextMove())

       
    }

    const onPress = (index) => {
        if (game.mode === 'PVP' || (game.mode === 'PVE' && game.p1Turn)) {
            dispatch(makeNextMove(index))

        }
    }
    //P1WON P2WON DRAW


    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.scorepanel}>



                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                >
                    <Image
                        source={require('../../assets/back.png')}
                    />
                </TouchableOpacity>

                <Image
                    source={require('../../assets/x.png')}
                />

                {/* <Text>{game.status}</Text> */}

                <Text style={styles.score}>{game.score[0]} : {game.score[1]}</Text>

                <Image
                    source={require('../../assets/o.png')}
                />

                <TouchableOpacity
                    onPress={() => { navigation.navigate('Settings'); }}
                >
                    <Image
                        source={require('../../assets/Settings.png')}
                    />
                </TouchableOpacity>



            </View>

            {
                settings.vanishMode ? <View style={styles.timerPanel}>

{/* <Text>{game.p1Turn?'P1':'p2'}
</Text> */}

                    {/* <CountdownCircleTimer
        isPlaying={true}
        duration={10}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[10, 5, 2.5, 0]}
    >
        {({ remainingTime }) => <Text>Vanishing in {remainingTime}</Text>}
    </CountdownCircleTimer> */}
    <Progressbar settings={settings} status={game.status} playTimer={playTimer}/>

                    
                </View> : <></>
            }



            <View style={styles.board}>
                {game.board.map((cell, i) => (

                    // <Surface key={i} style={styles.surface} elevation={0}>
                    <TouchableOpacity
                        key={i}
                        style={styles.cell}
                        onPress={() => { onPress(i) }}
                    >
                        <Image
                            style={styles.cellImg} source={cell ? cell === 'X' ? require('../../assets/bigx.png') : require('../../assets/bigo.png') : ''}
                        />
                        {/* <Text>{cell ? cell : ''}</Text> */}
                    </TouchableOpacity>

                    // </Surface>
                ))}
            </View>

            <Image
                source={require('../../assets/XO.png')}
            />

            <EndDialog visible={visible} setVisible={setVisible} status={game ? game.status : ''} navigation={navigation} />
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor:'#FDF8FD'

    },

    scorepanel: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignContent: 'center',
        // padding: '16px 44px 4px',
        paddingLeft: 35,
        paddingRight: 35,
        gap: '21px',
        marginTop: 48
    },

    timerPanel: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        // padding: '16px 44px 4px',
        // paddingLeft: 35,
        // paddingRight: 35,
        // gap: '21px',
        marginTop: 10
    },

    progress: { width: 250, height: 15, borderRadius: 100, marginBottom: 10 },

    score: {
        // fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 40,
        lineHeight: 48,
    },

    board: {
        display: 'flex',
        // height: '100%',
        width: '100%',
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignContent: 'center',
        flexWrap: 'wrap',
        marginTop: 85
        // borderColor:'red',
        // borderStyle:'solid'
    },

    surface: {
        height: 90,
        width: 90,
        margin: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cell: {
        // width: '100%',
        // height: '100%',
        // borderWidth: 1,
        // borderColor: "#005374",
        height: 90,
        width: 90,
        margin: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 6,
    },

    cellImg: {
        // width:'100%',
        // height:'100%'

    },

    dialog: {
        borderRadius: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        // backgroundColor:'transparent'
        // opacity:0.8


    },

    button: {
        borderStyle: 'solid',
        borderColor: '#6750A4',
        borderRadius: 100,
        // width: 201,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#6750A4'
    },

    buttonsView: {
        display: 'flex',
        // height: '100%',
        width: '70%',
        // alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 15,
        marginBottom: 17
    },

    dialogImg: {
        marginTop: 17.5

    },

    dialogText: {
        marginTop: 8.5,
        // fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 32,
        lineHeight: 32,
        color: '#1C1B1F'

    }
});