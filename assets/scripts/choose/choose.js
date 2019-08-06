cc.Class({
    extends: cc.Component,

    properties: {
        singleLineText: {
            default: null,
            type: cc.EditBox,
        },
    },

    start(){
        this.singleLineText.maxLength = 10;
    },

 

  //给国家命名
  inTitle(){
    Global.areaName = this.singleLineText.string;
    if( Global.areaName='' ){
        wx.showToast({
            title:'名字不能为空',
            icon:'none',
            duration:2000
        })
    }
    var self =this;
    wx.cloud.callFunction({
        name:'secCheck',
        data:{
            areaName:Global.areaName
        },
        success(res){
            if(res.result.errCode==0){
                updateData()
                wx.showToast({
                    title:'取名成功',
                    icon:'none',
                    duration:2000
                })
                cc.director.loadScene('home')
            }else{
                wx.showToast({
                    title:'系统错误',
                    icon:'none',
                    duration:2000
                })
            }
        },
        fail(res){
            console.log('error:',res)
            wx.showToast({
                title:'名字含有敏感词，请更换',
                icon:'none',
                duration:2000
            })
        }
    })
  },

  cancelFunc(){
    this.singleLineText.string=''
  }
});
