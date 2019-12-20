let screenConfig = {
    "A": {
        x: 100,
        y: 100
    }, "B": {
        x: 100,
        y: 100
    }, "X": {
        x: 100,
        y: 100
    }, "Y": {
        x: 100,
        y: 100
    }, "HOME": {
        x: 100,
        y: 100
    }, "LEFT": {
        x: 100,
        y: 100
    }, "RIGHT": {
        x: 100,
        y: 100
    }, "UP": {
        x: 100,
        y: 100
    }, "DOWN": {
        x: 100,
        y: 100
    }, "L": {
        x: 100,
        y: 100
    }, "R": {
        x: 100,
        y: 100
    }
};

function sleep(ms) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, ms);
    })
}
async function nsPress(key, duration) {
    let { x, y } = screenConfig[key];
    press(x, y, duration);
    await sleep(duration);
}
function nsClick(key) {
    let { x, y } = screenConfig[key];
    click(x, y);
}


/**
 * 命令用｜隔开 C
 * @param {String} command 
 */
async function executeCommand(command) {
    let commandList = command.split("|");
    for (let i = 0; i < commandList.length; i++) {
        let cmd = commandList[i];
        if (cmd.startsWith("C_")) {
            let key = cmd.split("_")[1];
            nsClick(key);
        } else if (cmd.startsWith("S_")) {
            let ms = cmd.split("_")[1];
            await sleep(ms);
        } else if (cmd.startsWith("P_")) {
            let [_, key, ms] = cmd.split("_");
            await nsPress(key, ms);
        }
    }
}

async function watts() {
    //第一次打开团战
    let command = "C_A|S_2000|C_A|S_2000|C_A|S_5000|C_HOME|S_100";
    await executeCommand(command);
    while (true) {
        //改时间
        command = "C_A|S_2000|C_A|S_5000|C_HOME|S_100";
        await executeCommand(command);
        //退团
        command = "C_A|S_2000|C_A|S_5000|C_HOME|S_100";
        await executeCommand(command);
        //开团
        command = "C_A|S_2000|C_A|S_5000|C_HOME|S_100";
        await executeCommand(command);
    }
}


