import { _decorator, Component, Node, input, Input, Camera, EventKeyboard, PhysicsSystem, KeyCode, v3, Vec3, Quat, physics } from 'cc';
import { Door } from './Door';
import { trueDoor } from './trueDoor';
const { ccclass, property,executionOrder } = _decorator;

@ccclass('DoorCtrl')
export class DoorCtrl extends Component {
    // 红门
    @property(Node)
    nd_redDoor:Node = null !
    // 蓝门
    @property(Node)
    nd_blueDoor:Node = null !
    // 假红门
    @property(Node)
    nd_virtualRedDoor:Node = null !
    // 假蓝门
    @property(Node)
    nd_virtualBlueDoor:Node = null !
    //主摄像机
    @property(Camera)
    mainCamera:Camera = null !
    //主摄像机世界坐标
    private mainCameraWorldPos:Vec3 = new Vec3();
    //主摄像机世界朝向
    public mainCameraWorldRts:Quat = new Quat();
    //单例
    public static instance:DoorCtrl = null !
    // 四个门
    private redDoor:trueDoor;
    private blueDoor:trueDoor;
    private virtualRedDoor:Door;
    private virtualBlueDoor:Door;

    start() {
        //绑定单例
        DoorCtrl.instance = this;
        //开启按键监听
        input.on(Input.EventType.KEY_DOWN,this.detectRayCollide,this);
        //新建四个门的对象
        this.redDoor = new trueDoor(this.nd_redDoor);
        this.blueDoor = new trueDoor(this.nd_blueDoor);
        this.virtualRedDoor = new Door(this.nd_virtualRedDoor);
        this.virtualBlueDoor = new Door(this.nd_virtualBlueDoor);
        // 开启碰撞检测
        this.redDoor.teleportDetector.on("onTriggerEnter",()=>{
            this.redDoor.teleportDetect(this.blueDoor);
        });
        this.blueDoor.teleportDetector.on("onTriggerEnter",()=>{
            this.blueDoor.teleportDetect(this.redDoor);
        }); 
    }

    update(deltaTime: number) {
        // 1.更新主相机的坐标与朝向
        this.mainCamera.node.getWorldPosition(this.mainCameraWorldPos);
        this.mainCamera.node.getWorldRotation(this.mainCameraWorldRts);
        // 2.设置虚拟门的坐标与自己的门重合，朝向相反（180°）
        this.virtualRedDoor.setDoorPlaceByDoor(this.redDoor);
        this.virtualBlueDoor.setDoorPlaceByDoor(this.blueDoor);
        this.virtualRedDoor.turnAround();
        this.virtualBlueDoor.turnAround();
        // 3.设置虚拟门的摄像机的世界坐标与朝向与主摄像机相同
        this.virtualRedDoor.setCamPlace(this.mainCameraWorldPos,this.mainCameraWorldRts);
        this.virtualBlueDoor.setCamPlace(this.mainCameraWorldPos,this.mainCameraWorldRts);
        // 4.将虚拟门的坐标与朝向设置为对方的门
        this.virtualRedDoor.setDoorPlaceByDoor(this.blueDoor);
        this.virtualBlueDoor.setDoorPlaceByDoor(this.redDoor);
        // 5.将自己的门的摄像机设置为对应虚拟门的摄像机
        this.redDoor.setCamPlace(this.virtualRedDoor.camera.getWorldPosition(),this.virtualRedDoor.camera.getWorldRotation());
        this.blueDoor.setCamPlace(this.virtualBlueDoor.camera.getWorldPosition(),this.virtualBlueDoor.camera.getWorldRotation());
    }


    detectRayCollide(event:EventKeyboard){// 屏幕射线检测
        
        let ray = this.mainCamera.screenPointToRay(960,530);//射线检测点，这里根据屏幕比例可能还需要做额外的调整
        let element:physics.PhysicsRayResult;//射线检测的结果
        let pos:Vec3;//击中的坐标
        let normal:Vec3;//法线向量
        let rts = new Quat();//门的朝向
        if(PhysicsSystem.instance.raycastClosest(ray)){
            element = PhysicsSystem.instance.raycastClosestResult;
            // console.log("founded");
            pos = element.hitPoint;
            normal = element.hitNormal;
            Quat.fromViewUp(rts,normal,v3(0,1,0));//调整视角
             
        }
        else{
            // console.log("not founded");
            return;
        }
        
        switch(event.keyCode){
            case KeyCode.KEY_E:
                // console.log("press E");
                this.redDoor.setDoorPlace(pos,rts);
                this.redDoor.setWall(element.collider.node);
                break;
            case KeyCode.KEY_Q:
                // console.log("press Q");
                this.blueDoor.setDoorPlace(pos,rts);
                this.blueDoor.setWall(element.collider.node);
                break;
        }
    }
}

