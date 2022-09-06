System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, v3, director, macro, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, l, CamCtrl;

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
      v3 = _cc.v3;
      director = _cc.director;
      macro = _cc.macro;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3b390dWg/hKW6PFubQHIiyp", "CamCtrl", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'v3', 'Event', 'director', 'macro', 'Quat']);

      ({
        ccclass,
        property
      } = _decorator);
      l = console.log;

      _export("CamCtrl", CamCtrl = (_dec = ccclass('CamCtrl'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = class CamCtrl extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "MainCamera", _descriptor, this);

          _initializerDefineProperty(this, "Door", _descriptor2, this);

          this.distance = v3();
          this.doorPos = v3();
          this.camPos = v3();
          this.rts = v3();
        }

        start() {
          var schedule = director.getScheduler();
          schedule.schedule(() => {
            this.doorPos = this.Door.worldPosition;
            this.camPos = this.MainCamera.worldPosition;
            this.distance = this.camPos.clone().subtract(this.doorPos);
            this.MainCamera.getWorldRotation().getEulerAngles(this.rts);
            this.rts.y = this.rts.y + 180;
            this.distance.y = -this.distance.y;
            this.node.setWorldPosition(this.doorPos.clone().subtract(this.distance));
            this.node.setRotationFromEuler(this.rts.x, this.rts.y, this.rts.z);
          }, this, 0, macro.REPEAT_FOREVER, 0, false);
        }

        logInfo(event) {
          l(this.distance);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "MainCamera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "Door", [_dec3], {
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
//# sourceMappingURL=e930688316a407364b6ab4ff389a2cd6fe7540da.js.map