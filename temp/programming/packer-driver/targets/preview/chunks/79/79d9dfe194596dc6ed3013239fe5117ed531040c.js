System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, input, Input, BoxCollider, RigidBody, KeyCode, v3, Vec3, clamp, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _crd, ccclass, property, PlayerCtrl;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      input = _cc.input;
      Input = _cc.Input;
      BoxCollider = _cc.BoxCollider;
      RigidBody = _cc.RigidBody;
      KeyCode = _cc.KeyCode;
      v3 = _cc.v3;
      Vec3 = _cc.Vec3;
      clamp = _cc.clamp;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b0a639lpJ5H6r0PHEwWTFCu", "PlayerCtrl", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'input', 'Input', 'BoxCollider', 'RigidBody', 'EventKeyboard', 'KeyCode', 'EventMouse', 'v3', 'ICollisionEvent', 'Vec3', 'clamp']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlayerCtrl", PlayerCtrl = (_dec = ccclass('PlayerCtrl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = (_class3 = class PlayerCtrl extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "Player", _descriptor, this);

          _initializerDefineProperty(this, "playerCamera", _descriptor2, this);

          _initializerDefineProperty(this, "GameScene", _descriptor3, this);

          this.RigidBodyComponent = void 0;
          this.ColliderComponent = void 0;
          this.canMovePerspect = false;
          this.canJump = false;
          this.playerAngel = v3();
        }

        start() {
          // ????????????
          PlayerCtrl.instance = this; // ????????????

          this.RigidBodyComponent = this.Player.getComponent(RigidBody);
          this.ColliderComponent = this.Player.getComponent(BoxCollider); // ??????????????????

          input.on(Input.EventType.KEY_DOWN, this.playerStartMove, this);
          input.on(Input.EventType.KEY_PRESSING, this.playerStartMove, this);
          input.on(Input.EventType.KEY_UP, this.playerStopMove, this);
          input.on(Input.EventType.MOUSE_MOVE, this.moveView, this);
          input.on(Input.EventType.MOUSE_DOWN, () => {
            this.canMovePerspect = true; //?????????????????????????????????
          }, this);
          input.on(Input.EventType.MOUSE_UP, () => {
            this.canMovePerspect = false; //?????????????????????????????????
          }, this); // ??????????????????

          this.ColliderComponent.on("onCollisionEnter", this.playerLand, this); // ????????????

          this.playerCamera.worldRotation.getEulerAngles(this.playerAngel);
        }

        moveView(event) {
          //????????????
          if (!this.canMovePerspect) return; //??????????????????????????????

          var delta = event.getDelta(); //?????????????????????????????????        

          var percentage = 0.5; //?????????

          var x = delta.x * percentage;
          var y = delta.y * percentage;

          if (this.playerAngel.y - x > 180) {
            this.playerAngel.y -= 360;
          } else if (this.playerAngel.y - x < -180) {
            this.playerAngel.y += 360;
          }

          this.playerCamera.setWorldRotationFromEuler(clamp(this.playerAngel.x + y, -90, 90), this.playerAngel.y - x, 0);
          this.playerCamera.worldRotation.getEulerAngles(this.playerAngel); //???????????????????????????????????????????????????
        }

        playerLand(event) {
          //????????????
          this.canJump = true;
        } // ??????????????????bug???????????????????????????????????????????????????????????????


        playerStartMove(event) {
          //??????????????????
          var speed = 10;
          var v = v3();
          this.RigidBodyComponent.getLinearVelocity(v);

          switch (event.keyCode) {
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
              if (this.canJump) {
                this.RigidBodyComponent.applyForce(v3(0, 300, 0));
                this.canJump = false;
              }

              break;
          }

          if (event.keyCode != KeyCode.SPACE) {
            Vec3.transformQuat(v, v, this.playerCamera.getWorldRotation());

            if (v.y > 0) {
              v.y = 0;
            }

            this.RigidBodyComponent.setLinearVelocity(v);
          }
        }

        playerStopMove(event) {
          //??????????????????
          switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.KEY_A:
            case KeyCode.KEY_S:
            case KeyCode.KEY_D:
              this.RigidBodyComponent.setLinearVelocity(v3(0, 0, 0));
          }
        }

      }, _class3.instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Player", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "playerCamera", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "GameScene", [_dec4], {
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
//# sourceMappingURL=79d9dfe194596dc6ed3013239fe5117ed531040c.js.map