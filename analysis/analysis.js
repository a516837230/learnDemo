var mark=[];

main();

function Annotation(title, author, position, time, content) {
    this.title = title;
    this.author = author;
    this.positon = position;
    this.time = time;
    this.content = content;
}

function analysis() {
    var title = '';
    var author = '';
    var position = '';
    var originalTime = '';
    var time = '';
    var content = '';
    var stringArray = [] ;
    var errorString = '';
    var timeArray= [];
    var am = new RegExp(/上午|AM/);
    var pm = new RegExp(/下午|PM/);
    var temp = '';


    //字符串分割为一条条笔记
    stringArray = sourceString.replace(/(^[\s=]*)|([\s=]*$)/g,' ').split(/={6,}/);
    for(var i = 0;i < stringArray.length; i ++) {
        //匹配中文
        text = stringArray[i];
        //笔记分割成标题、作者、位置、时间、内容
        text = text.match(/\s(\S+|\S+\s\S+\s\S+\s\S+)\s\((.+)\)\n-.*#(\d{2,4})-\d{2,4}.*(\d{4}.\d{1,2}.\d{1,2}.*\d{1,2}:\d{2}:\d{2})\n(.*)/);
        if (text != null) {
            title = text[1];
            author = text[2];
            position = text[3];
            originalTime = text[4];
            content = text[5];
        }
        //24小时制的转换
        timeArray = originalTime.replace(/(^\s*)|(\s*$)/g, '').split(/[^0-9]+/);

        if(am.test(originalTime)){
           for(var j = 0 ;j < 4;j ++){
               if(timeArray[j] < 10)
                    timeArray[j] = '0' + timeArray[j];
           }

        }

        else if(pm.test(originalTime)){
            timeArray[3] = timeArray[3] - 0 + 12 ;
            for(var j = 0 ;j < 4 ;j ++){
                if(timeArray[j] < 10)
                    timeArray[j] = '0' + timeArray[j];
            }
        }
        temp = timeArray[0];
        timeArray[0] = timeArray[2];
        timeArray[2] = timeArray[1];
        timeArray[1] = temp;

        //匹配英文
        text = stringArray[i];
        text = text.match(/\s(.+)\s\((.+)\)\n-\D*(\d{2,4})-\d{2,4}.*,\s(.*\s\d{1,2},\s\d{4}\s\d{1,2}:\d{2}:\d{2}\s.*)\n(.*)/);
        if (text != null) {
            title = text[1];
            author = text[2];
            position = text[3];
            originalTime = text[4];
            content = text[5];
        }

        timeArray = originalTime.replace(/(^\s*)|(\s*$)/g, '').split(/[^0-9a-zA-Z]+/);
        //月份的转换
        switch (timeArray[0]){
            case 'January':
                timeArray[0] = '1';
                break;
            case 'February':
                timeArray[0] = '2';
                break;
            case 'March':
                timeArray[0] = '3';
                break;
            case 'April':
                timeArray[0] = '4';
                break;
            case 'May':
                timeArray[0] = '5';
                break;
            case 'June':
                timeArray[0] = '6';
                break;
            case 'July':
                timeArray[0] = '7';
                break;
            case 'August':
                timeArray[0] = '8';
                break;
            case 'September':
                timeArray[0] = '9';
                break;
            case 'October':
                timeArray[0] = '10';
                break;
            case 'November':
                timeArray[0] = '11';
                break;
            case 'December':
                timeArray[0] = '12';
                break;
        }
        //24小时制的转换
        if(am.test(originalTime)){
            for(var j = 0 ;j < 4;j ++){
                if(timeArray[j] < 10)
                    timeArray[j] = '0' + timeArray[j];
            }

        }

        else if(pm.test(originalTime)){
            timeArray[3] = timeArray[3] - 0 + 12 ;
            for(var j = 0 ;j < 4 ;j ++){
                if(timeArray[j] < 10)
                    timeArray[j] = '0' + timeArray[j];
            }
        }



        time = timeArray[0] + '-' + timeArray[1] + '-' + timeArray[2] + ' ' + timeArray[3] + ':' +timeArray[4] + ':' + timeArray[5];
        author = author.replace(/[())]/g,' ');

        //检查记录是否无效
        if (content == null) {
            errorString = '第' + i + '条记录无效，不添加';
            mark.push(errorString);
        }
        else {
            mark.push(new Annotation(title, author, position, time, content));
        }
    }
}

function main() {
    window.onload = function(){
        analysis();
        var btn = document.getElementById("result");
        btn.addEventListener('click',show,false);
    }
}