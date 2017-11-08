var Speaker = require('speaker');

const lame = require("lame");

const fs = require('fs');

var player = {
    flag: 0,
    play: function(){
        var speaker = new Speaker();
        var self = this;
        var buffer = fs.createReadStream('./alert.mp3').pipe(new lame.Decoder());
        // buffer.pipe();
        try{
            buffer.pipe(speaker)
                .on('close', function(){
                    //console.log('stop speaker');
                    // play();
                })
                .on('flush', function(){
                    //console.log('flush data');
                    // play();
                })
                .on('close', function(){
                    //console.log('close player');
                    if(self.flag == 0){
                        self.play();
                    }else{
                        flag = 1;
                    }
                })
        }catch(e){
                console.log(e);
                if(self.flag == 0){
                    self.play();
                }else{
                    flag = 1;
                }
        }
        return this;
    },
    stop:function(){
        this.flag = 1;
        return this;
    }
}

module.exports = player;