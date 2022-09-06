import { _decorator, Component, Node, Vec3, Quat, v3 } from 'cc';
const { ccclass,executionOrder } = _decorator;

@ccclass('Door')
@executionOrder(-1)
export class Door extends Component{

    constructor(door:Node){
        super();
        this.door = door;
        this.camera = this.door.getChildByName("Camera");
        this.updateDoorPlace();
    }
    // 门的节点
    public door:Node;
    //相机的节点 
    public camera:Node;
    // 世界坐标
    public position:Vec3 = new Vec3();
    // 世界朝向
    public rotation:Quat = new Quat();
    // 获取门的位置
    public getDoorPlace(pos:Vec3,rts:Quat){
        this.door.getWorldPosition(pos);
        this.door.getWorldRotation(rts);
    }
    // 设置门的位置
    public setDoorPlace(pos:Vec3,rts:Quat){
        this.door.setWorldPosition(pos);
        this.door.setWorldRotation(rts);
        this.updateDoorPlace();
    }
    // 设置相机的位置
    public setCamPlace(pos:Vec3,rts:Quat){
        this.camera.setWorldPosition(pos);
        this.camera.setWorldRotation(rts);
    }
    //获取相机朝向
    public getCamRts(rts:Quat){
        this.camera.getWorldRotation(rts);
    }
    // 以门为参数设置门的位置
    public setDoorPlaceByDoor(door:Door){
        this.door.setWorldPosition(door.position);
        this.door.setWorldRotation(door.rotation);
        this.updateDoorPlace();
    }
    //更新门的位置
    public updateDoorPlace(){
        this.door.getWorldPosition(this.position);
        this.door.getWorldRotation(this.rotation);
        
    }
    //旋转门
    public turnAround(){
        let euler:Vec3 = v3()
        this.rotation.getEulerAngles(euler);
        euler.y-=180;
        Quat.fromEuler(this.rotation,euler.x,euler.y,euler.z);
        this.setDoorPlace(this.position,this.rotation);
    }
}

