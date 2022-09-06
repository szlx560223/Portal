System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, Quat, v3, _dec, _dec2, _class, _crd, ccclass, executionOrder, Door;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Vec3 = _cc.Vec3;
      Quat = _cc.Quat;
      v3 = _cc.v3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1b8e2y5UqVC96NohZGUrMKG", "Door", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'Quat', 'v3']);

      ({
        ccclass,
        executionOrder
      } = _decorator);

      _export("Door", Door = (_dec = ccclass('Door'), _dec2 = executionOrder(-1), _dec(_class = _dec2(_class = class Door extends Component {
        constructor(door) {
          super();
          this.door = void 0;
          this.camera = void 0;
          this.position = new Vec3();
          this.rotation = new Quat();
          this.door = door;
          this.camera = this.door.getChildByName("Camera");
          this.updateDoorPlace();
        } // 门的节点


        // 获取门的位置
        getDoorPlace(pos, rts) {
          this.door.getWorldPosition(pos);
          this.door.getWorldRotation(rts);
        } // 设置门的位置


        setDoorPlace(pos, rts) {
          this.door.setWorldPosition(pos);
          this.door.setWorldRotation(rts);
          this.updateDoorPlace();
        } // 设置相机的位置


        setCamPlace(pos, rts) {
          this.camera.setWorldPosition(pos);
          this.camera.setWorldRotation(rts);
        } //获取相机朝向


        getCamRts(rts) {
          this.camera.getWorldRotation(rts);
        } // 以门为参数设置门的位置


        setDoorPlaceByDoor(door) {
          this.door.setWorldPosition(door.position);
          this.door.setWorldRotation(door.rotation);
          this.updateDoorPlace();
        } //更新门的位置


        updateDoorPlace() {
          this.door.getWorldPosition(this.position);
          this.door.getWorldRotation(this.rotation);
        } //旋转门


        turnAround() {
          var euler = v3();
          this.rotation.getEulerAngles(euler);
          euler.y -= 180;
          Quat.fromEuler(this.rotation, euler.x, euler.y, euler.z);
          this.setDoorPlace(this.position, this.rotation);
        }

      }) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e1d720613e6b6f9952da6072fef9c6ee9ed4f44a.js.map