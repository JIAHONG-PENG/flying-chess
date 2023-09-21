import React, { Component } from "react";

export default class Map extends Component {
  constructor(props) {
    super(props);

    const array = [
      [false, false, false, false, true, true, true, true, true, true],
      [true, true, true, true, true, false, false, false, false, false],
      [true, false, false, false, false, false, false, false, false, false],
      [true, true, true, false, false, false, false, false, false, false],
      [false, false, true, true, true, true, true, true, true, true],
      [false, false, false, false, false, false, false, false, false, true],
      [false, false, true, true, true, true, true, true, true, true],
      [false, false, true, false, false, false, false, false, false, false],
      [false, false, true, true, true, true, true, false, false, false],
      [false, false, false, false, false, false, true, true, true, true],
    ];

    const pool = [
      "亲亲20秒",
      "摸对方大腿15秒",
      "摸对方脸10秒",
      "对视10秒",
      "休息一轮",
      "轻轻打对方屁股6下",
      "抚摸对方乳头10秒",
      "舔对方乳头15秒",
      "亲吻对方脖子",
      "捏对方屁股10秒",
      "亲吻对方耳朵15秒",
      "休息一轮",
      "脱掉对方一件衣服",
      "脱自己一件衣服",
      "手伸对方裤裤随意发挥10秒",
      "为对方吸一颗草莓",
      "为对方按摩脖子 肩膀 背 20秒",
      "下体摩擦对方下体30秒",
      "休息一轮",
    ];

    var poolArray = [];
    for (var i = 0; i < 10; i++) {
      var arr = [];
      for (var j = 0; j < 10; j++) {
        const r = Math.floor(Math.random() * pool.length);
        arr.push(pool[r]);
      }
      poolArray.push(arr);
    }

    this.state = {
      user1: [0, 9],
      turn: "user1",
      user2: [0, 9],
      array: array,
      height: 10,
      width: 10,
      speed: 500,
      user1CanGoDirection: "left",
      user2CanGoDirection: "left",
      user1Color: "#a0d2eb",
      user2Color: "#fbe3e8",
      diceNumber: 0,
      poolArray: poolArray,
      popupMessage: "",
    };
  }

  render() {
    const { array } = this.state;

    return (
      <>
        <div className="board">
          <div className="map-border">
            {array.map((value, idx) =>
              value.map((bool, idx1) => {
                if (idx === 0 && idx1 === 9) {
                  return <div className="map-cell user1Image" key={idx1}></div>;
                } else if (bool) {
                  return (
                    <div className="map-cell" key={idx1}>
                      {this.state.poolArray[idx][idx1]}
                    </div>
                  );
                } else {
                  return (
                    <div className="map-cell not-display" key={idx1}></div>
                  );
                }
              })
            )}
          </div>

          <div className="dice-board">
            <div>
              <div className="dice-num">{this.state.diceNumber} steps</div>
              <div
                className="dice"
                onClick={() => {
                  this.move(this.state.turn, this.state.array);
                }}
              >
                Roll the dice
              </div>
            </div>
            <div className="turn">
              <div>Next round: </div>
              {this.state.turn === "user1" ? (
                <div className="turn-color user1Image"></div>
              ) : (
                <div className="turn-color user2Image"></div>
              )}
            </div>
          </div>
        </div>
        <div className="popup">
          <div className="popupMessage">{this.state.popupMessage}</div>
          <div
            className="close-button"
            onClick={() => {
              this.onClickCloseWindow();
            }}
          >
            Close
          </div>
        </div>
      </>
    );
  }

  move(turn, array) {
    const rollBtn = document.getElementsByClassName("dice")[0];
    // get random number
    rollBtn.style.visibility = "hidden";
    const num = Math.floor(Math.random() * 4 + 1);

    const cells = document.getElementsByClassName("map-cell");
    const popupWindow = document.getElementsByClassName("popup");

    const newCells = [];
    var count = 0;
    for (var i = 0; i < this.state.height; i++) {
      const newArray = [];
      for (var j = 0; j < this.state.width; j++) {
        newArray.push(cells[count]);
        count += 1;
      }
      newCells.push(newArray);
    }

    var position;
    const height = this.state.height;
    const width = this.state.width;
    var color;

    const user1Color = "map-cell user1Image";
    const user2Color = "map-cell user2Image";
    const user1Position = this.state.user1;
    const user2Position = this.state.user2;
    var canGoDirection;

    if (turn === "user1") {
      position = user1Position;
      color = user1Color;
      canGoDirection = this.state.user1CanGoDirection;
    } else {
      position = user2Position;
      color = user2Color;
      canGoDirection = this.state.user2CanGoDirection;
    }

    var x = position[0];
    var y = position[1];
    var previouX = 0;
    var previouY = 9;

    // eslint-disable-next-line
    for (var i = 0; i < num; i++) {
      // eslint-disable-next-line
      setTimeout(() => {
        // can down
        if (x + 1 < height && array[x + 1][y]) {
          previouX = x;
          previouY = y;
          x += 1;
          if (y - 1 >= 0 && array[x][y - 1]) {
            canGoDirection = "left";
          } else {
            canGoDirection = "right";
          }
          console.log(canGoDirection);
        }
        // can left
        else if (y - 1 >= 0 && array[x][y - 1] && canGoDirection === "left") {
          previouX = x;
          previouY = y;
          y -= 1;
        }
        // can right
        else if (
          y + 1 <= width &&
          array[x][y + 1] &&
          canGoDirection === "right"
        ) {
          previouX = x;
          previouY = y;
          y += 1;
        }
        newCells[previouX][previouY].className =
          (turn === "user1" &&
            previouX === user2Position[0] &&
            previouY === user2Position[1]) ||
          (turn === "user2" &&
            previouX === user1Position[0] &&
            previouY === user1Position[1])
            ? turn === "user1"
              ? "map-cell user2Image"
              : "map-cell user1Image"
            : "map-cell";

        newCells[x][y].className = color;
        if (turn === "user1") {
          this.setState({ user1: [x, y] });
        } else {
          this.setState({ user2: [x, y] });
        }

        if (turn === "user1") {
          this.setState({ turn: "user2", user1CanGoDirection: canGoDirection });
        } else {
          this.setState({ turn: "user1", user2CanGoDirection: canGoDirection });
        }
      }, i * this.state.speed);

      this.setState({ diceNumber: num });

      // eslint-disable-next-line
      setTimeout(() => {
        this.setState({
          popupMessage: this.state.poolArray[x][y],
        });
        popupWindow[0].style.display = "block";
        if (turn === "user1") {
          popupWindow[0].className = "popup popupImage1";
        } else {
          popupWindow[0].className = "popup popupImage2";
        }

        // rollBtn.style.visibility = "";
      }, (num + 0.05) * this.state.speed);
    }
  }

  onClickCloseWindow() {
    const popupWindow = document.getElementsByClassName("popup")[0];
    popupWindow.style.display = "none";

    const rollBtn = document.getElementsByClassName("dice")[0];
    rollBtn.style.visibility = "";
  }
}
