
cc.Class({
    extends: cc.Component,

    properties: {

    },

    start () {
        if(CC_WECHATGAME){
            initWxCloud();
            getOpenId()
        }

    },

    goToHomeScene(){
        if( Global.areaName != null ){
            cc.director.loadScene('home');
        }else{
            cc.director.loadScene('choose');
        }
       
    }

    // update (dt) {},
});
