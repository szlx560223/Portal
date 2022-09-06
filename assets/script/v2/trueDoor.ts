import { _decorator, Node, BoxCollider, Collider, v3, Quat } from 'cc';
import { Door } from './Door';
import { DoorCtrl } from './DoorCtrl';
import { PlayerCtrl } from './PlayerCtrl';
const { ccclass } = _decorator;

@ccclass('trueDoor')
export class trueDoor extends Door {
    constructor(door:Node){
        super(door);
        this.enterDetector = door.getChildByPath("Door/enterDetect").getComponent(BoxCollider);
        this.teleportDetector = door.getChildByPath("Door/tpDetect").getComponent(BoxCollider);
        this.enterDetector.on("onTriggerEnter",this.enterDetect,this);
        this.enterDetector.on("onTriggerExit",this.leaveDetect,this);
    }
    
    //外部检测碰撞箱
    public enterDetector:BoxCollider;
    //内部检测碰撞箱
    public teleportDetector:BoxCollider;
    //吸附的节点
    public wall:Node;
    enterDetect(){//门前碰撞检测，检测到后关闭附着到的墙壁的碰撞箱
        this.wall.getComponent(Collider).enabled = false;
    }
    leaveDetect(){//离开门，重启碰撞箱
        this.wall.getComponent(Collider).enabled = true;
    }
    setWall(wall:Node){//设置墙面
        if(this.wall){//恢复先前的墙的层级
            this.wall.layer = 1073741824;
        }
        this.wall = wall;//更新墙面
        wall.layer = 1;//设置层级，让他不被门的摄像机渲染到
        //default:1073741824
        //a:1
    }

    teleportDetect(door:trueDoor){//门内检测碰撞，碰撞则tp到另一个门，获取当前速度的向量长度，方向设置为另一个门摄像机的方向。速度大小相同。
        if(!door.wall) {//只放置了一个门时不允许传送
            this.wall.getComponent(Collider).enabled = true;
            PlayerCtrl.instance.Player.setWorldPosition(this.position);
            return;
        }
        
        // 获取方向
        let rts = new Quat();
        door.getCamRts(rts);
        let euler = v3();
        rts.getEulerAngles(euler);
        euler.z = 0;//防止视角倾斜，但是这样会丧失一些位置关系(其实可以做平滑移动)
        Quat.fromEuler(rts,euler.x,euler.y+180,euler.z);
        /* 同步速度的部分有bug，放弃实现(不会算四元数呜呜呜)
        //获取速度向量的长度
        let v0 = v3();
        PlayerCtrl.instance.RigidBodyComponent.getLinearVelocity(v0);
        //设置速度方向
        let length = v0.length();
        let v1 = v0.clone().normalize();
        Vec3.transformQuat(v1,v1,rts);
        v1.multiplyScalar(length*2);
        */
        // 获取另一个传送门的位置
        let pos = v3();
        pos = door.position;
        // 执行传送
        door.door.getChildByPath("Door/tpDetect").getComponent(BoxCollider).enabled = false;//短暂关闭对门的碰撞箱防止无限传送
        PlayerCtrl.instance.Player.setWorldPosition(pos);
        // PlayerCtrl.instance.RigidBodyComponent.setLinearVelocity(v1);//有bug

        DoorCtrl.instance.mainCamera.node.setWorldRotation(rts);
        PlayerCtrl.instance.playerCamera.worldRotation.getEulerAngles(PlayerCtrl.instance.playerAngel);//更新人物角度朝向信息供移动函数使用

        //二次执行抵消莫名其妙的bug(人物旋转180度，找了两天没找到问题在哪)
        DoorCtrl.instance.mainCamera.node.setWorldRotation(this.camera.worldRotation);
        PlayerCtrl.instance.playerCamera.worldRotation.getEulerAngles(PlayerCtrl.instance.playerAngel);


        //重启tp检测碰撞箱
        this.scheduleOnce(()=>{
            door.door.getChildByPath("Door/tpDetect").getComponent(BoxCollider).enabled = true;
        },0.5)

        //tp后重启墙面碰撞箱
        this.wall.getComponent(Collider).enabled = true;
    }
    
}

