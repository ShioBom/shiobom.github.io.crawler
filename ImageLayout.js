/**
 * @description 图片横向瀑布流布局，最大限度保证每张图片完整显示
 * @class ImageLayout
 */
class ImageLayout {
    constructor(images, containerWidth, numberLine = 2, stdRatio) {
      //图片列表
      this.images = JSON.parse(JSON.stringify(images));
      //布局完毕的图片列表
      this.completedImages = [];
      //容器宽度
      this.containerWidth = containerWidth;
      //单行显示的图片数量
      this.numberLine = numberLine;
      //图片标准宽高比
      this.stdRatio = stdRatio;
      //图片撑满整行时标准宽度
      this.stdHeight = this.containerWidth / this.stdRatio;
      this.blockAndLayout();
    }
    /**
     * @description 完整显示这张图片
     * @param {*} image
     * @memberof ImageLayout
     */
    showFullImage(image) {
      console.log(image);
      let ratio = image.width / image.height;
      console.log("ratio", ratio);
      image.height = parseInt(this.containerWidth / ratio);
      image.width = this.containerWidth;
      this.completedImages.push(image);
      console.log(this.completedImages);
    }
  
    /**
     * @description 将图片数量根据单行数量分块并开始计算布局
     * @returns
     * @memberof ImageLayout
     */
  
    blockAndLayout() {
      let images = JSON.parse(JSON.stringify(this.images));
      //当图片只有一张时，完整显示这张图片
      if (images.length === 1) {
        this.showFullImage(this.images[0]);
        return;
      }
      let temp = [];
      for (let i = 0; i < images.length; i++) {
        temp.push(images[i]);
        //当已经是最后一张图片时或当单行图片达到限制数量时
        if ((i + 1) % this.numberLine === 0 || i === images.length - 1) {
          //计算每行的布局
          this.computedImagesLayout(temp);
          //清除上一行已经计算过布局的图片
          temp = [];
        }
      }
    }
    /**
     *
     * @description 根据分组计算每一行图片的布局
     * @param {*} images 每一行的图片数组
     * @memberof ImageLayout
     */
    computedImagesLayout(images) {
      images = JSON.parse(JSON.stringify(images));
      if (images.length === 1) {
        //当分组只有一张图片时
        this.layoutSingleImage(images[0]);
      } else {
        //当分组中有多张图片时
        this.layoutMultipleImages(images);
      }
    }
    /**
     * @description 分组中只有一张图片时，图片的显示
     * @param {*} image
     * @memberof ImageLayout
     */
    layoutSingleImage(image) {
      let ratio = image.width / image.height;
      image.height = this.stdHeight;
      image.width = image.height * ratio;
      this.completedImages.push(image);
    }
    /**
     * @description 分组中有多张图片时候的布局
     * @param {*} images
     * @memberof ImageLayout
     */
    layoutMultipleImages(images) {
      let pictures = JSON.parse(JSON.stringify(images));
      let relateWidths = []; //保存每张图的相对宽度
      let ratios = []; //保存每张图片的宽高比
      pictures.forEach(item => {
        //计算每张图的宽高比
        let ratio = item.width / item.height;
        //根据标准高度计算相对宽度
        let relateWidth = this.stdHeight * ratio;
        relateWidths.push(relateWidth);
        ratios.push(ratio);
      });
      //计算每张图相对宽度的总和
      let totolWidth = relateWidths.reduce((sum, item) => sum+item,0);
      let lineHeight = 0; //行高
      let restWidth = this.containerWidth; //容器剩余宽度，最初等于容器宽度
      pictures.forEach((item, i) => {
        if (i === 0) {
          //根据相对宽度与总宽度的比值计算第一张图片在容器中的实际宽高
          item.width = parseInt(
            this.containerWidth * (relateWidths[0] / totolWidth)
          );
          item.height = lineHeight = parseInt(item.width / ratios[0]);
          //计算第一张布局后的剩余宽度
          restWidth = restWidth - item.width;
        } else if (i === pictures.length - 1) {
          //计算每组中最后一张图片在容器的宽度，宽度为容器剩余宽度。
          item.width = restWidth;
          item.height = lineHeight;
        } else {
          //计算中间图片在容器中的实际宽高
          item.height = lineHeight;
          item.width = parseInt(item.height * ratios[i]);
          restWidth -= item.width;
        }
        this.completedImages.push(item);
      });
    }
  }
  let data =[
    {
      "desc": "奥特曼表情包 [平平淡淡才是真]",
      "src": "./images/6a04b428ly1g19akwia0rg209b09qwgf.gif",
      "origin": "http://wx1.sinaimg.cn/mw690/6a04b428ly1g19akwia0rg209b09qwgf.gif",
      "width":50,
      "height":50
    },
    {
      "desc": "派大星借钱表情包 [听说最近有个叫派大星的到处骗钱]",
      "src": "./images/6a04b428gy1g1crllm55jg208c069glz.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g1crllm55jg208c069glz.gif",
      "width":190,
      "height":190
    },
    {
      "desc": "游戏兔表情包 [老子游戏菜 嘴巴不菜！]",
      "src": "./images/6a04b428ly1g19al5q20ug209k09kgny.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428ly1g19al5q20ug209k09kgny.gif",
      "width":440,
      "height":440
    },
    {
      "desc": "聊天表情包 [按 “F” 进入坦克]",
      "src": "./images/6a04b428ly1g19bv7fek7g20b40etwh9.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428ly1g19bv7fek7g20b40etwh9.gif",
      "width":236,
      "height":285
    },
    {
      "desc": "熊猫人表情包 [最近那个手头有点紧 有点紧]",
      "src": "./images/6a04b428gy1g1crli5ajjg20g20g2acs.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g1crli5ajjg20g20g2acs.gif",
      "width":171,
      "height":152
    },
    {
      "desc": "你好骚啊表情包 [洪世贤：满脑子都是立体环绕你好骚啊]",
      "src": "./images/6a04b428ly1g19aktss1jg208w050b24.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428ly1g19aktss1jg208w050b24.gif",
      "width":58,
      "height":51
    },
    {
      "desc": "不要和我说什么表情包 [老夫玩农药 只为了浪浪浪 看我越塔强杀！]",
      "src": "./images/6a04b428gy1g0zytnfw3wg209q06ydh4.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0zytnfw3wg209q06ydh4.gif",
      "width":690,
      "height":645
    },
    {
      "desc": "日常表情包 [你们是我带过最差的一届奥特曼]",
      "src": "./images/6a04b428gy1g0zyt8offig205i05iq3d.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0zyt8offig205i05iq3d.gif",
      "width":440,
      "height":319
    },
    {
      "desc": "吉娃娃表情包 [我想这是用表情包的最高境界]",
      "src": "./images/6a04b428gy1g101erzdnlg208c098dh2.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g101erzdnlg208c098dh2.gif",
      "width":440,
      "height":311
    },
    {
      "desc": "橘猫表情包 [我妈不让我跟傻子玩]",
      "src": "./images/6a04b428gy1g0zytxacwug208a08675f.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0zytxacwug208a08675f.gif",
      "width":440,
      "height":311
    },
    {
      "desc": "天线宝宝GIF表情包 [很适合哄女朋友开心] 全套100张",
      "src": "./images/6a04b428gy1g0zywiu4q1g204l07wx58.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0zywiu4q1g204l07wx58.gif",
      "width":440,
      "height":319
    },
    {
      "desc": "东北话方言表情包 [学会你就是半个东北人]",
      "src": "./images/6a04b428gy1g0t2ptmtutg202802ojra.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0t2ptmtutg202802ojra.gif",
      "width":200,
      "height":200
    },
    {
      "desc": "蘑菇头表情包 [所有的事情会慢慢地好起来！]",
      "src": "./images/6a04b428gy1g0t20vxcvpg20c80eewg9.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0t20vxcvpg20c80eewg9.gif",
      "width":107,
      "height":83
    },
    {
      "desc": "卑微表情包 [葡萄美酒夜光卑 举卑消愁愁更愁]",
      "src": "./images/6a04b428gy1g0t1xgk4iig206o06o0tg.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0t1xgk4iig206o06o0tg.gif",
      "width":350,
      "height":350
    },
    {
      "desc": "欧阳娜娜表情包 [小时候就是个行走的表情包]",
      "src": "./images/6a04b428gy1g0sd3go9xhg20j60j6agw.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0sd3go9xhg20j60j6agw.gif",
      "width":201,
      "height":201
    },
    {
      "desc": "小黄鸡表情包 [深受女生喜爱的迷你Q版小鹦鹉] 全套200张",
      "src": "./images/6a04b428gy1g0sc3h1j52g202d02sdfs.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0sc3h1j52g202d02sdfs.gif",
      "width":300,
      "height":300
    },
    {
      "desc": "聊天表情包 [后来我都会选择绕过那条街]",
      "src": "./images/6a04b428gy1g0sddpapktg20b40bjdi4.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0sddpapktg20b40bjdi4.gif",
      "width":690,
      "height":690
    },
    {
      "desc": "爱宠大机密表情包GIF [原创高清100张兔子小白动态表情包]",
      "src": "./images/6a04b428gy1g0gva0g5leg205k05kaw0.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0gva0g5leg205k05kaw0.gif",
      "width":500,
      "height":500
    },
    {
      "desc": "简笔画表情包 [看似简单，用起来可有意思了]",
      "src": "./images/6a04b428gy1g0gvwh22khg205l05lt8p.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0gvwh22khg205l05lt8p.gif",
      "width":85,
      "height":100
    },
    {
      "desc": "辛普森一家表情包 [l'm okay l'm not crying]",
      "src": "./images/6a04b428gy1g0gvwed3btg209q09qmyj.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0gvwed3btg209q09qmyj.gif",
      "width":690,
      "height":690
    },
    {
      "desc": "日常表情包 [即使听着苏喂苏喂也心如止水]",
      "src": "./images/6a04b428gy1g0gvw312lxg202z02bt8k.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0gvw312lxg202z02bt8k.gif",
      "width":400,
      "height":415
    },
    {
      "desc": "在吗表情包 [亲爱的你在吗 你在吗 在吗 不在吗 那我走了 再见]",
      "src": "./images/6a04b428gy1g0gvwqzlb5g20u00u018n.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0gvwqzlb5g20u00u018n.gif",
      "width":240,
      "height":240
    },
    {
      "desc": "猫眼三姐妹表情包 [好好鬼混 别谈恋爱]",
      "src": "./images/6a04b428gy1g0gw1sgzhng20dw0dwacc.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0gw1sgzhng20dw0dwacc.gif",
      "width":80,
      "height":96
    },
    {
      "desc": "佛系小黄鸡表情包 [纸醉金迷 庸俗不堪 我去禅房冥个想]",
      "src": "./images/6a04b428gy1g0gvwo509hg208c08ct93.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0gvwo509hg208c08ct93.gif",
      "width":400,
      "height":518
    },
    {
      "desc": "回旋踢表情包 [我是受过严格训练的]",
      "src": "./images/6a04b428gy1g05xdiz1dvg20b00acgny.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g05xdiz1dvg20b00acgny.gif",
      "width":198,
      "height":198
    },
    {
      "desc": "Apeach屁桃君表情包 [24张KakaoTalk的屁桃动态图片]",
      "src": "./images/6a04b428gy1g058ml44r8g207h085mzu.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g058ml44r8g207h085mzu.gif",
      "width":350,
      "height":250
    },
    {
      "desc": "鲨鱼表情包 [你不如鲨了我啊]",
      "src": "./images/6a04b428gy1g0588j8kobg20u00u0asz.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g0588j8kobg20u00u0asz.gif",
      "width":298,
      "height":294
    },
    {
      "desc": "聊天表情包 [答应我，别当舔狗了好吗]",
      "src": "./images/6a04b428gy1g056m8vjp8g20gl0glwju.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g056m8vjp8g20gl0glwju.gif",
      "width":165,
      "height":284
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02sgumofrg20fp04gtvl.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02sgumofrg20fp04gtvl.gif",
      "width":578,
      "height":578
    },
    {
      "desc": "拜年表情包 [给您拜年了]",
      "src": "./images/6a04b428gy1fzy78nqlhng20c808vwgo.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fzy78nqlhng20c808vwgo.gif",
      "width":300,
      "height":225
    },
    {
      "desc": "拜年表情包 [给您拜年了]",
      "src": "./images/6a04b428gy1fzy78nqlhng20c808vwgo.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fzy78nqlhng20c808vwgo.gif",
      "width":565,
      "height":160
    },
    {
      "desc": "拜年表情包 [给您拜年了]",
      "src": "./images/6a04b428gy1fzy78o4zm0g20c808n40q.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fzy78o4zm0g20c808n40q.gif",
      "width":565,
      "height":160
    },
    {
      "desc": "拜年表情包 [给您拜年了]",
      "src": "./images/6a04b428gy1fzy78ok9wag20c808nac4.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fzy78ok9wag20c808nac4.gif",
      "width":565,
      "height":160
    },
    {
      "desc": "拜年表情包 [给您拜年了]",
      "src": "./images/6a04b428gy1fzy78p965qg20c808vq57.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fzy78p965qg20c808vq57.gif",
      "width":565,
      "height":160
    },
    {
      "desc": "开心扭屁股表情包",
      "src": "./images/6a04b428gy1fyrle6bndng206k07xalq.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fyrle6bndng206k07xalq.gif",
      "width":565,
      "height":160
    },
    {
      "desc": "喊小甜甜表情包",
      "src": "./images/6a04b428gy1fyrld3ejisg205a05at8y.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fyrld3ejisg205a05at8y.gif",
      "width":565,
      "height":160
    },
    {
      "desc": "被生活逼到睁不开眼表情包",
      "src": "./images/6a04b428gy1fyrldx8dmrg20c80c8n0g.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fyrldx8dmrg20c80c8n0g.gif",
      "width":565,
      "height":160
    },
    {
      "desc": "吃香肠表情包",
      "src": "./images/6a04b428gy1fyrlf0amk4g201m01f0t9.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fyrlf0amk4g201m01f0t9.gif",
      "width":565,
      "height":160
    },
    {
      "desc": "哈士奇怂炸表情包",
      "src": "./images/6a04b428gy1fyrlelwkm4g204r0480sv.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fyrlelwkm4g204r0480sv.gif",
      "width":565,
      "height":160
    },
    {
      "desc": "我的爱情呢表情包",
      "src": "./images/6a04b428gy1fyrlf2akc4g20u00s2amr.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fyrlf2akc4g20u00s2amr.gif",
      "width":565,
      "height":160
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02sgumofrg20fp04gtvl.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02sgumofrg20fp04gtvl.gif",
      "width":565,
      "height":160
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02sgv5722g20fp04g7r2.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02sgv5722g20fp04g7r2.gif",
      "width":565,
      "height":160
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02sgwnovpg20fp04ge1t.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02sgwnovpg20fp04ge1t.gif",
      "width":396,
      "height":372
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02sgxqhggg20fp04gawf.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02sgxqhggg20fp04gawf.gif",
      "width":527,
      "height":585
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02sh0azh3g20fp04gh8m.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02sh0azh3g20fp04gh8m.gif",
      "width":240,
      "height":240
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02sh1j73lg20fp04gavc.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02sh1j73lg20fp04gavc.gif",
      "width":690,
      "height":690
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02sh2vlzug20fp04g4k1.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02sh2vlzug20fp04g4k1.gif",
      "width":240,
      "height":240
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02sh5m9b6g20fp04g7pl.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02sh5m9b6g20fp04g7pl.gif",
      "width":200,
      "height":200
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02sh7xchlg20fp04g1en.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02sh7xchlg20fp04g1en.gif",
      "width":580,
      "height":580
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02sh74qtgg20fp04gtuv.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02sh74qtgg20fp04gtuv.gif",
      "width":690,
      "height":690
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02shbbma9g20fp04gttl.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02shbbma9g20fp04gttl.gif",
      "width":353,
      "height":352
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02svk5iiog20fp04g4ja.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02svk5iiog20fp04g4ja.gif",
      "width":580,
      "height":551
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02svphym9g20fp04g4jo.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02svphym9g20fp04g4jo.gif",
      "width":471,
      "height":201
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02svraha9g20fp04gqp9.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02svraha9g20fp04gqp9.gif",
      "width":690,
      "height":448
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02svtofmbg20fp04gtus.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02svtofmbg20fp04gtus.gif",
      "width":158,
      "height":158
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02svuu5kjg20fp04g4kt.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02svuu5kjg20fp04g4kt.gif",
      "width":90,
      "height":60
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02svvaongg20fp04gave.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02svvaongg20fp04gave.gif",
      "width":240,
      "height":240
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02svwe8ltg20fp04gkdf.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02svwe8ltg20fp04gkdf.gif",
      "width":690,
      "height":690
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02svx1drqg20fp04gniw.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02svx1drqg20fp04gniw.gif",
      "width":322,
      "height":300
    },
    {
      "desc": "微信阅后即焚表情包 [比撤回消息还实用的文字燃烧] 全套100张",
      "src": "./images/6a04b428gy1g02svy51kvg20fp04g1ea.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g02svy51kvg20fp04g1ea.gif",
      "width":690,
      "height":687
    },
    {
      "src": "./images/006HJgYYgy1ftdtq0kv07g301e01edfm.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/006HJgYYgy1ftdtq0kv07g301e01edfm.gif",
      "width":593,
      "height":184
    },
    {
      "desc": "开心扭屁股表情包",
      "src": "./images/6a04b428gy1fyrle6bndng206k07xalq.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fyrle6bndng206k07xalq.gif",
      "width":247,
      "height":261
    },
    {
      "desc": "喊小甜甜表情包",
      "src": "./images/6a04b428gy1fyrld3ejisg205a05at8y.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fyrld3ejisg205a05at8y.gif",
      "width":631,
      "height":574
    },
    {
      "desc": "被生活逼到睁不开眼表情包",
      "src": "./images/6a04b428gy1fyrldx8dmrg20c80c8n0g.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fyrldx8dmrg20c80c8n0g.gif",
      "width":690,
      "height":536
    },
    {
      "desc": "吃香肠表情包",
      "src": "./images/6a04b428gy1fyrlf0amk4g201m01f0t9.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fyrlf0amk4g201m01f0t9.gif",
      "width":597,
      "height":597
    },
    {
      "desc": "哈士奇怂炸表情包",
      "src": "./images/6a04b428gy1fyrlelwkm4g204r0480sv.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fyrlelwkm4g204r0480sv.gif",
      "width":656,
      "height":656
    },
    {
      "desc": "我的爱情呢表情包",
      "src": "./images/6a04b428gy1fyrlf2akc4g20u00s2amr.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1fyrlf2akc4g20u00s2amr.gif",
      "width":622,
      "height":640
    },
    {
      "desc": "聊天表情包 [答应我，别当舔狗了好吗]",
      "src": "./images/6a04b428gy1g056m8vjp8g20gl0glwju.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g056m8vjp8g20gl0glwju.gif",
      "width":480,
      "height":477
    },
    {
      "desc": "聊天表情包 [答应我，别当舔狗了好吗]",
      "src": "./images/6a04b428gy1g056lwotv8g20en0g9wjt.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g056lwotv8g20en0g9wjt.gif",
      "width":600,
      "height":600
    },
    {
      "desc": "聊天表情包 [答应我，别当舔狗了好吗]",
      "src": "./images/6a04b428gy1g056lxf03cg206o06owew.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g056lxf03cg206o06owew.gif",
      "width":175,
      "height":175
    },
    {
      "desc": "聊天表情包 [答应我，别当舔狗了好吗]",
      "src": "./images/6a04b428gy1g056ly1lr7g20ku0kun3s.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g056ly1lr7g20ku0kun3s.gif",
      "width":272,
      "height":277
    },
    {
      "desc": "聊天表情包 [答应我，别当舔狗了好吗]",
      "src": "./images/6a04b428gy1g056lyt557g206o06o3z1.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g056lyt557g206o06o3z1.gif",
      "width":269,
      "height":293
    },
    {
      "desc": "聊天表情包 [答应我，别当舔狗了好吗]",
      "src": "./images/6a04b428gy1g056lzd08sg205k05k3yz.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g056lzd08sg205k05k3yz.gif",
      "width":300,
      "height":332
    },
    {
      "desc": "聊天表情包 [答应我，别当舔狗了好吗]",
      "src": "./images/6a04b428gy1g056lzz6x3g20g40g4dkk.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g056lzz6x3g20g40g4dkk.gif",
      "width":440,
      "height":319
    },
    {
      "desc": "聊天表情包 [答应我，别当舔狗了好吗]",
      "src": "./images/6a04b428gy1g056m0eknrg20mu0muqc1.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g056m0eknrg20mu0muqc1.gif",
      "width":690,
      "height":690
    },
    {
      "desc": "聊天表情包 [答应我，别当舔狗了好吗]",
      "src": "./images/6a04b428gy1g056m0zstbg209t09s3zp.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g056m0zstbg209t09s3zp.gif",
      "width":690,
      "height":690
    },
    {
      "desc": "聊天表情包 [答应我，别当舔狗了好吗]",
      "src": "./images/6a04b428gy1g056m1kqnsg20g40fbtd9.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g056m1kqnsg20g40fbtd9.gif",
      "width":320,
      "height":180
    },
    {
      "desc": "聊天表情包 [答应我，别当舔狗了好吗]",
      "src": "./images/6a04b428gy1g056m1y5sog20d305ljsk.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g056m1y5sog20d305ljsk.gif",
      "width":335,
      "height":350
    },
    {
      "desc": "聊天表情包 [答应我，别当舔狗了好吗]",
      "src": "./images/6a04b428gy1g056m2fhlgg20jz0cz798.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g056m2fhlgg20jz0cz798.gif",
      "width":344,
      "height":344
    },
    {
      "desc": "聊天表情包 [答应我，别当舔狗了好吗]",
      "src": "./images/6a04b428gy1g056m2tfumg204e04emxd.gif",
      "origin": "http://wx4.sinaimg.cn/mw690/6a04b428gy1g056m2tfumg204e04emxd.gif",
      "width":499,
      "height":533
    }
  ]
      const $box = document.getElementById("waterfall");
      console.log($box.clientWidth);
      let layout = new ImageLayout(data, $box.clientWidth,5,1.55);
      layout.completedImages.forEach(item => {
        let $imageBox = document.createElement("div");
        $imageBox.setAttribute("class", "img-box");
        $imageBox.style.width = item.width + "px";
        $imageBox.style.height = item.height + "px";
        let $img = document.createElement("img");
        // $img.style.width = item.width + "px";
        // $img.style.height = item.height + "px";
        $img.setAttribute("src", item.src);
        $imageBox.appendChild($img);
        $box.appendChild($imageBox);
      });