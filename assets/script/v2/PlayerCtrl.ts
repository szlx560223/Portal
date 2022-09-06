import { _decorator, Component, Node, input, Input, BoxCollider, RigidBody, EventKeyboard, KeyCode, EventMouse, v3, ICollisionEvent, Vec3, clamp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerCtrl')
export class PlayerCtrl extends Component {
    //玩家节点
    @property(Node)
    Player:Node = null !
    //摄像机节点
    @property(Node)
    playerCamera:Node = null !   
    //场景节点
    @property(Node)
    GameScene:Node = null !

    //刚体组件
    public RigidBodyComponent:RigidBody;
    //碰撞箱组件
    private ColliderComponent:BoxCollider;
    //是否可以移动视角
    private canMovePerspect = false;
    //是否可以跳跃
    private canJump = false;
    //玩家视角
    public playerAngel = v3();
    // 单例
    public static instance:PlayerCtrl = null!

    start() {
        // 绑定单例
        PlayerCtrl.instance = this;
        // 获取组件
        this.RigidBodyComponent = this.Player.getComponent(RigidBody);
        this.ColliderComponent = this.Player.getComponent(BoxCollider);
        // 开启按键监听
        input.on(Input.EventType.KEY_DOWN,this.playerStartMove,this);
        input.on(Input.EventType.KEY_PRESSING,this.playerStartMove,this);
        input.on(Input.EventType.KEY_UP,this.playerStopMove,this);
        input.on(Input.EventType.MOUSE_MOVE,this.moveView,this);
        input.on(Input.EventType.MOUSE_DOWN,()=>{
            this.canMovePerspect = true;//按下鼠标后可以移动视角
        },this);
        input.on(Input.EventType.MOUSE_UP,()=>{
            this.canMovePerspect = false;//松开鼠标后不能移动视角
        },this);
        // 开启碰撞检测
        this.ColliderComponent.on("onCollisionEnter",this.playerLand,this);
        // 获取角度
        this.playerCamera.worldRotation.getEulerAngles(this.playerAngel);
    }

    moveView(event:EventMouse){//移动视角
        if(!this.canMovePerspect) return;//判断是否可以移动视角
        let delta = event.getDelta();//鼠标移动距离，右上为正        
        let percentage = 0.5;//灵敏度
        let x = delta.x*percentage;
        let y = delta.y*percentage;
        if(this.playerAngel.y-x>180){
            this.playerAngel.y -= 360;
        }
        else if(this.playerAngel.y-x<-180){
            this.playerAngel.y += 360;
        }
        this.playerCamera.setWorldRotationFromEuler(clamp(this.playerAngel.x+y,-90,90),this.playerAngel.y-x,0);
        this.playerCamera.worldRotation.getEulerAngles(this.playerAngel);//更新人物角度朝向信息供移动函数使用
        
    }

    playerLand(event:ICollisionEvent){//玩家着陆
        this.canJump = true;
    }

    // 这样的实现有bug，一次只能按一个键，按多了就会变得奇奇怪怪
    playerStartMove(event:EventKeyboard){//玩家开始移动
        let speed = 10;
        let v = v3();
        this.RigidBodyComponent.getLinearVelocity(v);
        switch(event.keyCode){
            case KeyCode.KEY_W:
                // console.log("press W");
                v.z = -speed;
                v.x = 0;
                break;
            case KeyCode.KEY_A:
                // console.log("press A");
                v.x = -speed;
                v.z = 0;
                break;
            case KeyCode.KEY_S:
                // console.log("press S");
                v.z = speed;
                v.x = 0;
                break;
            case KeyCode.KEY_D:
                // console.log("press D");
                v.x = speed;
                v.z = 0;
                break;
            case KeyCode.SPACE:
                // console.log("press Space");
                if(this.canJump){
                    this.RigidBodyComponent.applyForce(v3(0,300,0));
                    this.canJump = false;
                }
                break;
        }
        if(event.keyCode!=KeyCode.SPACE){
            Vec3.transformQuat(v,v,this.playerCamera.getWorldRotation());
            if(v.y>0){
                v.y = 0;
            }
            this.RigidBodyComponent.setLinearVelocity(v);
        }
        
    }

    playerStopMove(event:EventKeyboard){//玩家停止移动
        switch(event.keyCode){
            case KeyCode.KEY_W:
            case KeyCode.KEY_A:
            case KeyCode.KEY_S:
            case KeyCode.KEY_D:
                this.RigidBodyComponent.setLinearVelocity(v3(0,0,0));
        }
    }
}
