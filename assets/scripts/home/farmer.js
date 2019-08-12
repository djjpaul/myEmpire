cc.Class({
    extends: cc.Component,

    properties: {
  
    },

    start () {
        this.farmerAni = this.node.getComponent( cc.Animation )
        this.goToFarmLand();    
    },

    goToFarmLand(){
        var x = 250 - this.node.x;
        var moveRight1 = cc.moveBy( x / 70 , x , 0 );
        var moveRight2 = cc.moveBy( 4 ,320 , 0 );
        var moveUp = cc.moveBy( 1 , 0 , 70 )
        this.node.runAction( moveRight1 );
        this.farmerAni.play( 'farmer' )
        this.scheduleOnce( function() {
            this.node.runAction( moveUp );
            this.scheduleOnce(function(){
                this.node.runAction( moveRight2 )
                this.scheduleOnce( function() {
                    this.farmerAni.play('farming')
                } , 4 )
            } , 1 )
        } , x/70 )

    }

    // update (dt) {},
});
