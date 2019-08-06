cc.Class({
    extends: cc.Component,

    properties: {
      bg:{
          type:cc.Node,
          default:null
      }
    },

    start () {
       // this.initMap();
    },

    initMap(){
        var url = 'map/' + Global.race;
        console.log(url)
        var self = this;
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
            self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        this.bg.active = true;
    }

});
