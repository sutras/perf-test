class Log {
    label;
    startTime = 0;
    endTime = 0;
    ended = false;
    constructor(label) {
        this.label = label;
    }
    start() {
        this.startTime = performance.now();
    }
    end() {
        this.endTime = performance.now();
        this.ended = true;
    }
    getTime() {
        return this.endTime - this.startTime;
    }
    toObject() {
        return {
            label: this.label,
            time: this.getTime(),
        };
    }
}
const logs = [];
async function perfTest(time, callback) {
    perfTest.time = time;
    perfTest.progress(0);
    for (let i = 0; i < time; i++) {
        callback(i);
    }
}
perfTest.time = 0;
perfTest.progress = (endedNum) => {
    console.clear();
    console.log(`当前进度: [${''.padEnd(endedNum, '=') + ''.padEnd(perfTest.time - endedNum, ' ')}]`);
};
perfTest.start = (label) => {
    const log = new Log(label);
    log.start();
    logs.push(log);
};
perfTest.end = (label) => {
    const log = logs.find((log) => log.label === label);
    if (log) {
        log.end();
        const endedNum = logs.filter((log) => log.ended).length;
        perfTest.progress(endedNum);
        if (endedNum === perfTest.time) {
            console.clear();
            console.log('测试完毕!');
            console.table(logs.map((log) => log.toObject()));
            console.log(`平均时间： ${logs
                .map((log) => log.getTime())
                .reduce((sum, time) => sum + time, 0) / logs.length}ms`);
        }
    }
    else {
        console.error(`[perfTest] 不存在此label: ${label}`);
    }
};
export default perfTest;
