declare function perfTest(time: number, callback: (index: number) => void): Promise<void>;
declare namespace perfTest {
    var time: number;
    var progress: (endedNum: number) => void;
    var start: (label: string) => void;
    var end: (label: string) => void;
}
export default perfTest;
