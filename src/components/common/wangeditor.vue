<!-- 富文本-->
<template>
  <div class="editor">
    <div ref="toolbar" class="toobar"></div>
    <div ref="editor" class="editor"></div>
  </div>
</template>

<script>
import E from "wangeditor";
import storage from "@/utils/storage";
import axios from "axios";
export default {
  data() {
    return {
      editor: "",
      // 默认有这么多菜单，meanArray有值以meanArray为准
      defaultMeanus: [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "image", // 插入图片
        "table", // 表格
        // 'video', // 插入视频
        "code", // 插入代码
        "undo", // 撤销
        "redo", // 重复
      ],
    };
  },
  methods: {
    init() {
      this.editor = new E(this.$refs.editor);
      var that = this;
      this.editor.config.showLinkImg = false;
      this.editor.config.uploadImgServer =
        "http://121.41.22.93:8118/fileUpload/uploadImage"; // 上传图片的接口地址
      this.editor.config.uploadFileName = "imageFile"; // formdata中的name属性
      this.editor.config.uploadImgHeaders = {
        Authorization: "Bearer" + " " + this.$store.state.token,
      };
      this.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
        //创建一个空对象实例
        var formData = new FormData();
        // let filename = resultFiles[0].name;
        formData.append("files[]", resultFiles[0]);
        formData.append("module", "park");
        axios.post("/api/system/upload", formData).then((res) => {
          console.log(res);
          if (res.status == 200) {
            console.log(res.data);
            insertImgFn(res.data);
          }
        });
      };
      this.setMenus(); //设置菜单
      this.editor.config.onchange = (html) => {
        that.$emit("change", html); // 将内容同步到父组件中
      };
      this.editor.config.height = 400;
      this.editor.config.focus = false;
      this.editor.create(); //创建编辑器
    },
    setMenus() {
      // 设置菜单
      if (this.meanArray) {
        this.editor.config.menus = this.meanArray;
      } else {
        this.editor.config.menus = this.defaultMeanus;
      }
    },
  },
  mounted() {
    let that = this;
    that.$nextTick(function () {
      that.init();
    });
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁

    this.editor.destroy();

    this.editor = null;
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    isClear: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        console.log(val);
        this.editor.txt.clear();
        this.value = null;
      }
    },
    value: function (value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value);
      }
    },
  },
};
</script>
