cc.Class({
    extends: cc.Component,

    properties: {
        chatContent : {
            default : null,
            type : cc.Label
        },
        tap : cc.Node,
        diplomacyNode : cc.Node,
        productNode:cc.Node,
        farmerPrefab : cc.Prefab
    },

    start () {
      this.step = 0;
       if(Global.level==0){
            this.guide();
            this.tap.active = true;
       }
       this.productBtn = cc.find('Canvas/ui/product');
       this.node.getChildByName( "ui" ).zIndex = 100;
    },

    initMap(){
        var url = 'map/' + Global.race;
        console.log(url)
        var self = this;
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
            self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        this.bg.active = true;
    },

    guide(){
        var data;
        var self = this;
        cc.loader.loadRes( 'data/chat.json',function ( err , text ){
             data = text.json
             self.chatContent.string =  data.level0.chat1[ self.step ]
             self.step++;
        })
    },

    guideManage(){
        switch (this.step) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                this.guide();
                break;
            case 5:
                 this.guide();
                 this.tap.setPosition( this.productBtn.getPosition() );
                 var scaleUp = cc.scaleTo( 0.5,1.2,1.2 );
                 var scaleDown = cc.scaleTo( 0.5,0.8,0.8 );
                 var seq  = cc.sequence( scaleUp,scaleDown );
                 seq  =  cc.repeatForever( seq );
                 this.tap.runAction( seq )
                 break;
            case 6:
                this.guide();
                this.productNode.active = true;
                this.tap.setPosition( this.productBtn.getPosition().x,this.productBtn.getPosition().y + 80 );
                break;
            case 7:
                this.planteFood();
                this.guide();
                this.tap.setPosition( this.productBtn.getPosition().x,this.productBtn.getPosition().y + 160 );
                break;
            case 8:
                this.guide()
                this.productNode.active = true; 
                break;
            default:
                break;
        }
    },
    //房门口位置：(-580+i*146,30),(-580+i*146,-170)
    planteFood(){
        var farmer = cc.instantiate( this.farmerPrefab );
        var i = Math.floor( Math.random() * 6 );
        var j = Math.floor( Math.random() * 2 );
        if( this.step == 7 ){
            i = 5;
            j = 1;
        }
        farmer.setPosition( -580 + i * 146 , -170 + 200 * j );
        this.node.addChild( farmer )
    },

    clickBTN(event,eventCustomData){
        switch (eventCustomData) {
            //外交
            case 'diplomacy' :
                this.diplomacyNode.active = !this.diplomacyNode.active;
                this.productNode.active = false;
                break;
            case 'product' :
                this.productNode.active = !this.productNode.active;
                this.diplomacyNode.active = false;
                break;
            default:
                break;
        }
    }

});
