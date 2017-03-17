'use strict';

module.exports = (filesTree) => {
    return getFileLines(filesTree).join('\n');
};

let getFileLines = ({
    name,
    type,
    files
}, depth = 0)=>{
    let unitSpace = '    ', connectSpace = '│   ', adjoinSpace = '│──', lastAdjoinSpace = '└──';

    if(type === 'file') {
        return [name];
    } else if(type === 'directory') {
        let nextDepth = ++depth;

        let nexts = files.map((file) => getFileLines(file, nextDepth));

        let lines = nexts.reduce((prev, next, index) => {
            let space = index === nexts.length - 1? unitSpace : connectSpace;
            return prev.concat(next.map((line, lineIndex) => {
                if(lineIndex === 0){
                    if(index === nexts.length - 1) return lastAdjoinSpace + line;
                    return adjoinSpace + line;
                } else {
                    return space + line;
                }
            }));
        }, []);

        lines.unshift(name);

        return lines;
    }
};
