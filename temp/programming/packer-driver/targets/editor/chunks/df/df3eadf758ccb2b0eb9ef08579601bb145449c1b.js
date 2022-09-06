System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Camera, MeshRenderer, RenderTexture, Material, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, CamCtrl;

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
      Camera = _cc.Camera;
      MeshRenderer = _cc.MeshRenderer;
      RenderTexture = _cc.RenderTexture;
      Material = _cc.Material;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3cb9agZwklLOr3SdPn1Dke/", "CamCtrl", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Camera', 'MeshRenderer', 'RenderTexture', 'Material']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CamCtrl", CamCtrl = (_dec = ccclass('CamCtrl'), _dec2 = property(MeshRenderer), _dec(_class = (_class2 = class CamCtrl extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "target", _descriptor, this);
        }

        start() {
          const renderTex = new RenderTexture(); //渲染贴图

          renderTex.reset({
            //初始化参数
            width: 1024,
            height: 1024
          });
          const cameraComp = this.getComponent(Camera); //获取摄像机

          cameraComp.targetTexture = renderTex; //设置目标贴图

          const pass = this.target.material.passes[0]; //设置pass

          const defines = {
            SAMPLE_FROM_RT: true,
            ...pass.defines
          };
          const renderMat = new Material(); //材质

          renderMat.initialize({
            //初始化参数
            effectAsset: this.target.material.effectAsset,
            defines
          });
          this.target.setMaterial(renderMat, 0); //设置材质

          renderMat.setProperty('mainTexture', renderTex, 0); //设置参数
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=df3eadf758ccb2b0eb9ef08579601bb145449c1b.js.map