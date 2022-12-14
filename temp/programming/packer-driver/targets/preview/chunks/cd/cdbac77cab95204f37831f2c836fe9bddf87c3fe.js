System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, input, Input, Camera, PhysicsSystem, KeyCode, v3, Vec3, Quat, Door, trueDoor, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _crd, ccclass, property, executionOrder, DoorCtrl;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfDoor(extras) {
    _reporterNs.report("Door", "./Door", _context.meta, extras);
  }

  function _reportPossibleCrUseOftrueDoor(extras) {
    _reporterNs.report("trueDoor", "./trueDoor", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      input = _cc.input;
      Input = _cc.Input;
      Camera = _cc.Camera;
      PhysicsSystem = _cc.PhysicsSystem;
      KeyCode = _cc.KeyCode;
      v3 = _cc.v3;
      Vec3 = _cc.Vec3;
      Quat = _cc.Quat;
    }, function (_unresolved_2) {
      Door = _unresolved_2.Door;
    }, function (_unresolved_3) {
      trueDoor = _unresolved_3.trueDoor;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "07043CAA1xIlp/Ko31rSl3h", "DoorCtrl", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'input', 'Input', 'Camera', 'EventKeyboard', 'PhysicsSystem', 'KeyCode', 'v3', 'Vec3', 'Quat', 'physics']);

      ({
        ccclass,
        property,
        executionOrder
      } = _decorator);

      _export("DoorCtrl", DoorCtrl = (_dec = ccclass('DoorCtrl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Camera), _dec(_class = (_class2 = (_class3 = class DoorCtrl extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "nd_redDoor", _descriptor, this);

          _initializerDefineProperty(this, "nd_blueDoor", _descriptor2, this);

          _initializerDefineProperty(this, "nd_virtualRedDoor", _descriptor3, this);

          _initializerDefineProperty(this, "nd_virtualBlueDoor", _descriptor4, this);

          _initializerDefineProperty(this, "mainCamera", _descriptor5, this);

          this.mainCameraWorldPos = new Vec3();
          this.mainCameraWorldRts = new Quat();
          this.redDoor = void 0;
          this.blueDoor = void 0;
          this.virtualRedDoor = void 0;
          this.virtualBlueDoor = void 0;
        }

        start() {
          //????????????
          DoorCtrl.instance = this; //??????????????????

          input.on(Input.EventType.KEY_DOWN, this.detectRayCollide, this); //????????????????????????

          this.redDoor = new (_crd && trueDoor === void 0 ? (_reportPossibleCrUseOftrueDoor({
            error: Error()
          }), trueDoor) : trueDoor)(this.nd_redDoor);
          this.blueDoor = new (_crd && trueDoor === void 0 ? (_reportPossibleCrUseOftrueDoor({
            error: Error()
          }), trueDoor) : trueDoor)(this.nd_blueDoor);
          this.virtualRedDoor = new (_crd && Door === void 0 ? (_reportPossibleCrUseOfDoor({
            error: Error()
          }), Door) : Door)(this.nd_virtualRedDoor);
          this.virtualBlueDoor = new (_crd && Door === void 0 ? (_reportPossibleCrUseOfDoor({
            error: Error()
          }), Door) : Door)(this.nd_virtualBlueDoor); // ??????????????????

          this.redDoor.teleportDetector.on("onTriggerEnter", () => {
            this.redDoor.teleportDetect(this.blueDoor);
          });
          this.blueDoor.teleportDetector.on("onTriggerEnter", () => {
            this.blueDoor.teleportDetect(this.redDoor);
          });
        }

        update(deltaTime) {
          // 1.?????????????????????????????????
          this.mainCamera.node.getWorldPosition(this.mainCameraWorldPos);
          this.mainCamera.node.getWorldRotation(this.mainCameraWorldRts); // 2.???????????????????????????????????????????????????????????????180?????

          this.virtualRedDoor.setDoorPlaceByDoor(this.redDoor);
          this.virtualBlueDoor.setDoorPlaceByDoor(this.blueDoor);
          this.virtualRedDoor.turnAround();
          this.virtualBlueDoor.turnAround(); // 3.????????????????????????????????????????????????????????????????????????

          this.virtualRedDoor.setCamPlace(this.mainCameraWorldPos, this.mainCameraWorldRts);
          this.virtualBlueDoor.setCamPlace(this.mainCameraWorldPos, this.mainCameraWorldRts); // 4.???????????????????????????????????????????????????

          this.virtualRedDoor.setDoorPlaceByDoor(this.blueDoor);
          this.virtualBlueDoor.setDoorPlaceByDoor(this.redDoor); // 5.???????????????????????????????????????????????????????????????

          this.redDoor.setCamPlace(this.virtualRedDoor.camera.getWorldPosition(), this.virtualRedDoor.camera.getWorldRotation());
          this.blueDoor.setCamPlace(this.virtualBlueDoor.camera.getWorldPosition(), this.virtualBlueDoor.camera.getWorldRotation());
          console.log(this.virtualBlueDoor.camera.getWorldRotation());
        }

        detectRayCollide(event) {
          // ??????????????????
          var ray = this.mainCamera.screenPointToRay(960, 530); //???????????????????????????????????????????????????????????????????????????

          var element; //?????????????????????

          var pos; //???????????????

          var normal; //????????????

          var rts = new Quat(); //????????????

          if (PhysicsSystem.instance.raycastClosest(ray)) {
            element = PhysicsSystem.instance.raycastClosestResult; // console.log("founded");

            pos = element.hitPoint;
            normal = element.hitNormal;
            Quat.fromViewUp(rts, normal, v3(0, 1, 0)); //????????????
          } else {
            // console.log("not founded");
            return;
          }

          switch (event.keyCode) {
            case KeyCode.KEY_E:
              // console.log("press E");
              this.redDoor.setDoorPlace(pos, rts);
              this.redDoor.setWall(element.collider.node);
              break;

            case KeyCode.KEY_Q:
              // console.log("press Q");
              this.blueDoor.setDoorPlace(pos, rts);
              this.blueDoor.setWall(element.collider.node);
              break;
          }
        }

      }, _class3.instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nd_redDoor", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nd_blueDoor", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nd_virtualRedDoor", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nd_virtualBlueDoor", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "mainCamera", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=cdbac77cab95204f37831f2c836fe9bddf87c3fe.js.map