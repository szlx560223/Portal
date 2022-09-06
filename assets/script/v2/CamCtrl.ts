// 本文件代码源自https://forum.cocos.org/t/topic/121977
import { _decorator, Component, Camera, MeshRenderer, RenderTexture, Material } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CamCtrl')
export class CamCtrl extends Component {

    // 材质
    @property(MeshRenderer)
    target:MeshRenderer = null;

    start() {
        const renderTex = new RenderTexture();//渲染贴图
        renderTex.reset({//初始化参数
            width: 1024,
            height: 1024
        });
        const cameraComp = this.getComponent(Camera);//获取摄像机
        cameraComp.targetTexture = renderTex;//设置目标贴图
        const pass = this.target.material.passes[0];//设置pass
        const defines = { SAMPLE_FROM_RT: true, ...pass.defines };
        const renderMat = new Material();//材质
        renderMat.initialize({//初始化参数
            effectAsset: this.target.material.effectAsset,
            defines,
        });
        this.target.setMaterial(renderMat, 0);//设置材质
        renderMat.setProperty('mainTexture', renderTex, 0);//设置参数

    }
}

