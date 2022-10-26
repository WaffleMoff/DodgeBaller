import React, { PureComponent, useState, useEffect } from "react";
import { AppRegistry, StyleSheet, Text, Dimensions, View, TouchableOpacity, Button, Image} from "react-native";
import { GameLoop } from "react-native-game-engine";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//https://blog.logrocket.com/react-native-game-development-tutorial/
//https://www.w3schools.com/js/js_random.asp
//used this to get a random number

//I tried implementing a few things like having multiple pages so I
//could have a title scene, but that didn't work. I also tried
//async storage for saving a highscore, but I don't think that 
//works well with gameengine.

//https://stackoverflow.com/questions/30266831/hide-show-components-in-react-native
//I used this to have a new game button and score display only
//at the start and when you die

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const RADIUS = 25;
let youdied = "";



export default class BestGameEver extends PureComponent {

  constructor() {
    super();
    this.state = {
      x: WIDTH / 2 - RADIUS,
      y: HEIGHT / 2 - RADIUS,
      x2: -10,
      y2: -10,
      x3: WIDTH + 10,
      y3: HEIGHT + 10,
      lives: 0,
      oldlives: 5,
      x4: WIDTH/4,
      y4: -40,
      dy4: 8,
      x5: 3*WIDTH/4,
      y5: -HEIGHT/2,
      straight: 1,
      x6: -40,
      y6: HEIGHT/4,
      x7: -WIDTH/2,
      y7: -3*HEIGHT/4,
      x8: -100,
      y8: -100,
      dx8: 15,
      dy8: 25,
      x9: -100,
      y9: -100,
      dy9: 5,
      passes: 0,
      stage: 0,
      free: 0,
      x10: -100,
      y10: -100,
      isHidden: false,
      score: 0,

    };
  }
  onPress = () => {
    this.setState({
      isHidden: !this.state.isHidden,
      x: WIDTH / 2 - RADIUS,
      y: HEIGHT / 2 - RADIUS,
      x2: -10,
      y2: -10,
      x3: WIDTH + 10,
      y3: HEIGHT + 10,
      lives: 5,
      oldlives: 5,
      x4: WIDTH/4,
      y4: -40,
      dy4: 8,
      x5: 3*WIDTH/4,
      y5: -HEIGHT/2,
      straight: 1,
      x6: -40,
      y6: HEIGHT/4,
      x7: -WIDTH/2,
      y7: -3*HEIGHT/4,
      x8: -100,
      y8: -100,
      dx8: 15,
      dy8: 25,
      x9: -100,
      y9: -100,
      dy9: 3,
      passes: 0,
      stage: 0,
      free: 0,
      x10: -100,
      y10: -100,
      score: 0,
    });
  }


  updateHandler = ({ touches, screen, layout, time }) => {
    let move = touches.find(x => x.type === "move");
    if (move) {
      this.setState({
        x: this.state.x + move.delta.pageX,
        y: this.state.y + move.delta.pageY
      });
      if (this.state.y + 2*RADIUS > HEIGHT) {
        this.setState({
          y: this.state.y = HEIGHT - 2*RADIUS,
        });
      }
      if (this.state.y < 0) {
        this.setState({
          y: this.state.y = 1,
        }); 
      }
      if (this.state.x + 2*RADIUS > WIDTH) {
        this.setState({
          x: this.state.x = WIDTH - 2*RADIUS,
        });
      }
      if (this.state.x < 0) {
        this.setState({
          x: this.state.x = 1,
        }); 
      }     
    }
    if (this.state.stage == 1) {
      if (this.state.x > this.state.x2 - RADIUS) {
        this.setState({
          x2: this.state.x2 + 5,
        });
      }
      if (this.state.x < this.state.x2 - RADIUS) {
        this.setState({
          x2: this.state.x2 - 5,
        });
      }
      if (this.state.y > this.state.y2 - RADIUS) {
        this.setState({
          y2: this.state.y2 + 5,
        });
      }
      if (this.state.y < this.state.y2 - RADIUS) {
        this.setState({
          y2: this.state.y2 - 5,
        });
      }
      if (Math.abs(this.state.y - this.state.y2 + RADIUS) < 15 && Math.abs(this.state.x - this.state.x2 + RADIUS) < 15) {
        this.setState({
          lives: this.state.lives - 1,
        });
      }
      if (this.state.x > this.state.x3 - RADIUS) {
        this.setState({
          x3: this.state.x3 + 5,
        });
      }
      if (this.state.x < this.state.x3 - RADIUS) {
        this.setState({
          x3: this.state.x3 - 5,
        });
      }
      if (this.state.y > this.state.y3 - RADIUS) {
        this.setState({
          y3: this.state.y3 + 5,
        });
      }
      if (this.state.y < this.state.y3 - RADIUS) {
        this.setState({
          y3: this.state.y3 - 5,
        });
      }
      if (Math.abs(this.state.y - this.state.y3 + RADIUS) < 15 && Math.abs(this.state.x - this.state.x3 + RADIUS) < 15) {
      this.setState({
        lives: this.state.lives - 1,
      });
      }
    }

    this.setState({
      y4: this.state.y4 + this.state.dy4,
    });
    if (this.state.y4 > HEIGHT) {
      this.setState({
        y4: this.state.y4 = 0,
        x4: this.state.x4 = Math.floor(Math.random() * HEIGHT),
        passes: this.state.passes + 1,
        score: this.state.score + 50,

      });
    }
    if (this.state.passes == 10) {
      this.setState({
        stage: this.state.stage = Math.floor(Math.random() * 3) + 1,
        passes: this.state.passes = 0,
        x2: -10,
        y2: -10,
        x3: WIDTH + 10,
        y3: HEIGHT + 10,
        x8: -100,
        y8: -100,
        x9: -100,
        y9: -100,
      })
      if (this.state.stage == 2) {
        this.setState({
          x8: this.state.x8 = 1,
          y8: this.state.y8 = WIDTH/3,
        });
      }
      if (this.state.stage == 3) {
        this.setState({
          x9: WIDTH/2,
          y9: 180,
        })
      }
      if (this.state.free == 1) {
        this.setState({
          free: this.state.free = 0,
          x10: this.state.x10 = -100,
          y10: this.state.y10 = -100,

        })
      }
      if (this.state.free == 0) {
        this.setState({
          free: this.state.free = 1,
          x10: this.state.x10 = Math.floor(Math.random() * (WIDTH-300) + 150),
          y10: this.state.y10 = Math.floor(Math.random() * (HEIGHT-300) + 150),
        });
      }

    }
    if (Math.abs(this.state.y - this.state.y4 + RADIUS/2) < 20 && Math.abs(this.state.x - this.state.x4 + RADIUS/2) < 20) {
      this.setState({
        lives: this.state.lives - 1,
      });
    }
    this.setState({
      y5: this.state.y5 + this.state.dy4,
    });
    if (this.state.y5 > HEIGHT) {
      this.setState({
        y5: this.state.y5 = 0,
        x5: this.state.x5 = Math.floor(Math.random() * HEIGHT),
      });
    }
    if (Math.abs(this.state.y - this.state.y5 + RADIUS/2) < 20 && Math.abs(this.state.x - this.state.x5 + RADIUS/2) < 20) {
      this.setState({
        lives: this.state.lives - 1,
      });
    }
    this.setState({
      x6: this.state.x6 + this.state.dy4,
    });
    if (this.state.x6 > WIDTH) {
      this.setState({
        x6: this.state.x6 = 0,
        y6: this.state.y6 = Math.floor(Math.random() * HEIGHT),
      });
    }
    if (Math.abs(this.state.y - this.state.y6 + RADIUS/2) < 20 && Math.abs(this.state.x - this.state.x6 + RADIUS/2) < 20) {
      this.setState({
        lives: this.state.lives - 1,
      });
    }
    this.setState({
      x7: this.state.x7 + this.state.dy4,
    });
    if (this.state.x7 > WIDTH) {
      this.setState({
        x7: this.state.x7 = 0,
        y7: this.state.y7 = Math.floor(Math.random() * HEIGHT),
      });
    }
    if (Math.abs(this.state.y - this.state.y7 + RADIUS/2) < 20 && Math.abs(this.state.x - this.state.x7 + RADIUS/2) < 20) {
      this.setState({
        lives: this.state.lives - 1,
      });
    }
    if (this.state.stage == 2) {
      this.setState({
        x8: this.state.x8 + this.state.dx8,
        y8: this.state.y8 + this.state.dy8
      });
      if (this.state.x8 > WIDTH-RADIUS || this.state.x8+RADIUS < 0) {
        this.state.dx8 *= -1;
        // cc = Math.floor(Math.random(colorChoice.length)*colorChoice.length);
      }
      if (this.state.y8 > HEIGHT-RADIUS || this.state.y8+RADIUS < 0) {
        this.state.dy8 *= -1;
      }
      if (Math.abs(this.state.y - this.state.y8) < 35 && Math.abs(this.state.x - this.state.x8) < 35) {
        this.setState({
          lives: this.state.lives - 1,
          x8: 1,
          y8: WIDTH/3,
        });
      }
    }
    if (this.state.stage == 3) {
      
      if (this.state.x > this.state.x9) {
        this.setState({
          x9: this.state.x9 + 9,
        });
      }
      if (this.state.x < this.state.x9) {
        this.setState({
          x9: this.state.x9 - 9,
        });
      }

      this.setState({
        y9: this.state.y9 + this.state.dy9,
      });
      if (this.state.y9 + 175 > HEIGHT) {
        this.setState({
          dy9: this.state.dy9*(-1),
        });
      }
      if (this.state.y9 -175 < 0) {
        this.setState({
          dy9: this.state.dy9*(-1),
        })
      }
      if (Math.abs(this.state.y - this.state.y9) < 35 && Math.abs(this.state.x - this.state.x9) < 35) {
        this.setState({
          lives: this.state.lives - 1,
          y9: this.state.y9 = 180,
          dy9: this.state.dy9 = 3,
        });
      }    
    }

    if (Math.abs(this.state.y - this.state.y10) < 35 && Math.abs(this.state.x - this.state.x10) < 35) {
      this.setState({
        lives: this.state.lives + 1,
        score: this.state.score + 200,
        oldlives: this.state.oldlives + 1,
        y10: this.state.y10 = -100,
        x10: this.state.x10 = -100,
      });
    }
    this.setState ({
      y12: this.state.y12 = this.state.y10 + RADIUS/2-2,
      x12: this.state.x12 = this.state.x10,
      x11: this.state.x11 = this.state.x10 + RADIUS/2-2,
      y11: this.state.y11 = this.state.y10,
    });
    if (Math.abs(this.state.y3 - this.state.y2) < 9 && Math.abs(this.state.x3 - this.state.x2) < 9) {
      this.setState({
        x2: 0,
        y2: 0,
        x3: WIDTH - 10,
        y3: HEIGHT - 10,
      });
    }
    if (this.state.oldlives > this.state.lives) {
      if (this.state.oldlives /= 1) {
          this.setState({
          oldlives: this.state.oldlives - 1,
          x: this.state.x = WIDTH / 2 - RADIUS,
          y: this.state.y = HEIGHT / 2 - RADIUS,
          x2: this.state.x2 = -10,
          y2: this.state.y2 = -10,
          x3: this.state.x2 = WIDTH + 10,
          y3: this.state.y3 = HEIGHT + 10,
          x4: WIDTH/4,
          y4: 1,
          dy4: 8,
          x5: 3*WIDTH/4,
          y5: -HEIGHT/2,
          straight: 1,
          x6: 0,
          y6: HEIGHT/4,
          x7: -WIDTH/2,
          y7: -3*HEIGHT/4,

        });
      }
      if (this.state.lives <= 0) {
        this.setState({
          lives: this.state.oldlives = 5,
          oldlives: this.state.oldlives = 5,
          stage: this.state.stage = 0,
          passes: this.state.passes = 0,
          x2: -10,
          y2: -10,
          x3: WIDTH + 10,
          y3: HEIGHT + 10,
          x4: WIDTH/4,
          y4: -40,
          dy4: 0,
          x5: 3*WIDTH/4,
          y5: -HEIGHT/2,
          straight: 1,
          x6: -40,
          y6: HEIGHT/4,
          x7: -WIDTH/2,
          y7: -3*HEIGHT/4,          
          x8: -100,
          y8: -100,
          dx8: 15,
          dy8: 25,
          x9: -100,
          y9: -100,
          dy9: 3,
          passes: 0,
          stage: 0,
          free: 0,
          x10: -100,
          y10: -100,
          isHidden: true,
        });
        youdied = "You Died";
      }
      
    }

  };

  render() {

    return (

      <GameLoop style={styles.container} onUpdate={this.updateHandler}>
        <View style={[styles.player, { left: this.state.x, top: this.state.y }]} />
        <View style={[styles.basic, { left: this.state.x2, top: this.state.y2 }]} />
        <View style={[styles.basic, { left: this.state.x3, top: this.state.y3 }]} />
        <View style={[styles.straight, { left: this.state.x4, top: this.state.y4 }]} />
        <View style={[styles.straight, { left: this.state.x5, top: this.state.y5 }]} />
        <View style={[styles.straight, { left: this.state.x6, top: this.state.y6 }]} />
        <View style={[styles.straight, { left: this.state.x7, top: this.state.y7 }]} />
        <View style={[styles.bounce, { left: this.state.x8, top: this.state.y8 }]} />
        <View style={[styles.cup, { left: this.state.x9, top: this.state.y9 }]} />
        <View style={[styles.free, { left: this.state.x10, top: this.state.y10 }]} />
        <View style={[styles.cross1, { left: this.state.x11, top: this.state.y11 }]} />
        <View style={[styles.cross2, { left: this.state.x12, top: this.state.y12 }]} />
        {this.state.isHidden ? <Button style = {styles.button} title={this.state.isHidden ? "New Game" : "HIDE"} onPress={this.onPress} /> : null}
        {this.state.isHidden ? <Text style = {styles.score}> Current Score {this.state.score} </Text> : null}
        {this.state.isHidden ? <Image source={{uri: "https://i.imgur.com/pjld2WM.jpeg"}} style={styles.dodge} /> : null} 
        {!this.state.isHidden ? <Text style={styles.lives}> {this.state.lives} </Text> : null}       
      </GameLoop>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: 'center',
    alignItems: 'center',
  },
  player: {
    position: "absolute",
    backgroundColor: "pink",
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS * 2
  },
  basic: {
    position: "absolute",
    backgroundColor: "red",
    width: RADIUS/3,
    height: RADIUS/3,
    borderRadius: RADIUS/3
  },
  straight: {
    position: "absolute",
    backgroundColor: "blue",
    width: RADIUS,
    height: RADIUS,
    borderRadius: RADIUS
  },
  bounce: {
    position: "absolute",
    backgroundColor: "cyan",
    width: RADIUS*2,
    height: RADIUS*2,
    borderRadius: RADIUS*2
  },
  cup: {
    position: "absolute",
    backgroundColor: "purple",
    width: RADIUS*2,
    height: RADIUS*2,
    borderRadius: RADIUS*2
  },
  free: {
    position: "absolute",
    backgroundColor: "red",
    width: RADIUS,
    height: RADIUS,
    transform: [{rotate:"45deg"}],
  },
  cross1: {
    position: "absolute",
    backgroundColor: "white",
    height: 25,
    width: 4,
  },
  cross2: {
    backgroundColor: "white",
    height: 4,
    width: 25,
    position: "absolute",
    left: -40,
    top: 40,
  },

  lives: {
    //backgroundColor: '#daa520',
    alignItems: 'left',
    justifyContent: 'center',
    color:"#000",
    padding: 5,
    margin: 5,
    fontSize:80,
  },
  button: {
    borderWidth: 1,
    borderColor: '#575DD9',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 32,
    height: 64,
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 80,
    fontWeight: "300",    
  },
  score: {
    alignItems: 'center',
    color: "#f00",
    fontSize:30,
  },
  dodge: {
    alignItems: 'center',
    width: 475, 
    height: 250,
  }
});

AppRegistry.registerComponent("BestGameEver", () => BestGameEver);