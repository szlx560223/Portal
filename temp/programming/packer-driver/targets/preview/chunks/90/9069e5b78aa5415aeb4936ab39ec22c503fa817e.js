System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, BoxCollider, Collider, v3, Quat, Door, DoorCtrl, PlayerCtrl, _dec, _class, _crd, ccclass, trueDoor;

  function _reportPossibleCrUseOfDoor(extras) {
    _reporterNs.report("Door", "./Door", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDoorCtrl(extras) {
    _reporterNs.report("DoorCtrl", "./DoorCtrl", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerCtrl(extras) {
    _reporterNs.report("PlayerCtrl", "./PlayerCtrl", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      BoxCollider = _cc.BoxCollider;
      Collider = _cc.Collider;
      v3 = _cc.v3;
      Quat = _cc.Quat;
    }, function (_unresolved_2) {
      Door = _unresolved_2.Door;
    }, function (_unresolved_3) {
      DoorCtrl = _unresolved_3.DoorCtrl;
    }, function (_unresolved_4) {
      PlayerCtrl = _unresolved_4.PlayerCtrl;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c4b969WxlJLD6JIkay7k7RP", "trueDoor", undefined);

      __checkObsolete__(['_decorator', 'Node', 'BoxCollider', 'Collider', 'v3', 'Quat']);

      ({
        ccclass
      } = _decorator);

      _export("trueDoor", trueDoor = (_dec = ccclass('trueDoor'), _dec(_class = class trueDoor extends (_crd && Door === void 0 ? (_reportPossibleCrUseOfDoor({
        error: Error()
      }), Door) : Door) {
        constructor(door) {
          super(door);
          this.enterDetector = void 0;
          this.teleportDetector = void 0;
          this.wall = void 0;
          this.enterDetector = door.getChildByPath("Door/enterDetect").getComponent(BoxCollider);
          this.teleportDetector = door.getChildByPath("Door/tpDetect").getComponent(BoxCollider);
          this.enterDetector.on("onTriggerEnter", this.enterDetect, this);
          this.enterDetector.on("onTriggerExit", this.leaveDetect, this);
        } //?????????????????????


        enterDetect() {
          //?????????????????????????????????????????????????????????????????????
          this.wall.getComponent(Collider).enabled = false;
        }

        leaveDetect() {
          //???????????????????????????
          this.wall.getComponent(Collider).enabled = true;
        }

        setWall(wall) {
          //????????????
          if (this.wall) {
            //???????????????????????????
            this.wall.layer = 1073741824;
          }

          this.wall = wall; //????????????

          wall.layer = 1; //???????????????????????????????????????????????????
          //default:1073741824
          //a:1
        }

        teleportDetect(door) {
          //??????????????????????????????tp???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          if (!door.wall) {
            //???????????????????????????????????????
            this.wall.getComponent(Collider).enabled = true;
            (_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
              error: Error()
            }), PlayerCtrl) : PlayerCtrl).instance.Player.setWorldPosition(this.position);
            return;
          } // ????????????


          var rts = new Quat();
          door.getCamRts(rts);
          var euler = v3();
          rts.getEulerAngles(euler);
          euler.z = 0; //????????????????????????????????????????????????????????????(???????????????????????????)

          Quat.fromEuler(rts, euler.x, euler.y + 180, euler.z);
          /* ????????????????????????bug???????????????(???????????????????????????)
          //???????????????????????????
          let v0 = v3();
          PlayerCtrl.instance.RigidBodyComponent.getLinearVelocity(v0);
          //??????????????????
          let length = v0.length();
          let v1 = v0.clone().normalize();
          Vec3.transformQuat(v1,v1,rts);
          v1.multiplyScalar(length*2);
          */
          // ?????????????????????????????????

          var pos = v3();
          pos = door.position; // ????????????

          door.door.getChildByPath("Door/tpDetect").getComponent(BoxCollider).enabled = false; //????????????????????????????????????????????????

          (_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
            error: Error()
          }), PlayerCtrl) : PlayerCtrl).instance.Player.setWorldPosition(pos); // PlayerCtrl.instance.RigidBodyComponent.setLinearVelocity(v1);//???bug

          (_crd && DoorCtrl === void 0 ? (_reportPossibleCrUseOfDoorCtrl({
            error: Error()
          }), DoorCtrl) : DoorCtrl).instance.mainCamera.node.setWorldRotation(rts);
          (_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
            error: Error()
          }), PlayerCtrl) : PlayerCtrl).instance.playerCamera.worldRotation.getEulerAngles((_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
            error: Error()
          }), PlayerCtrl) : PlayerCtrl).instance.playerAngel); //???????????????????????????????????????????????????
          //?????????????????????????????????bug(????????????180???????????????????????????????????????)

          (_crd && DoorCtrl === void 0 ? (_reportPossibleCrUseOfDoorCtrl({
            error: Error()
          }), DoorCtrl) : DoorCtrl).instance.mainCamera.node.setWorldRotation(this.camera.worldRotation);
          (_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
            error: Error()
          }), PlayerCtrl) : PlayerCtrl).instance.playerCamera.worldRotation.getEulerAngles((_crd && PlayerCtrl === void 0 ? (_reportPossibleCrUseOfPlayerCtrl({
            error: Error()
          }), PlayerCtrl) : PlayerCtrl).instance.playerAngel); //??????tp???????????????

          this.scheduleOnce(() => {
            door.door.getChildByPath("Door/tpDetect").getComponent(BoxCollider).enabled = true;
          }, 0.5); //tp????????????????????????

          this.wall.getComponent(Collider).enabled = true;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9069e5b78aa5415aeb4936ab39ec22c503fa817e.js.map