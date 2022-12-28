<template>
  <div>
    <a-upload
      class="upload-list-inline"
      ref="uploader"
      list-type="picture-card"
      :fileList="fileList"
      :before-upload="beforeUpload"
      :custom-request="() => {}"
      :remove="handleRemove"
      @change="handleChange"
      @preview="handlePreview"
      :multiple="multiple"
    >
      <!-- 单图片上传开启这个 -->
      <div v-if="FileList.length < limit">
        <a-icon type="plus" />
        <div class="ant-upload-text">上传</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
//这里需要引入 图片 处理方法
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
import axios from "axios";

export default {
  name: "UploadPicture",
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [],
    };
  },
  props: {
    //控制多少张图片
    limit: {
      type: Number,
      default: 1,
    },
    // 增加控制是否是多选文件的字段
    multiple: {
      type: Boolean,
      default: false,
    },
    // 接受父组件传递的对象
    FileList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    FileList() {
      console.log(this.fileList);
      if (this.FileList.length > 0) {
        let arr = [];
        this.FileList.map((item, index) => {
          let a = {
            uid: item,
            name: "xxx.png",
            status: "done",
            url: "https://park.cngiantech.com" + item,
          };
          arr.push(a);
          this.fileList = arr;
        });
      } else {
        this.fileList = [];
      }
    },
  },
  methods: {
    // 预览图片(点开小眼睛)
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    // 取消预览图片
    handleCancel() {
      this.previewVisible = false;
    },
    // 上传附件
    handleChange({ file, fileList }) {
      if (file.status !== "removed") {
        const formData = new FormData();
        formData.append("files[]", file);
        formData.append("module", "park");
        axios.post("/api/system/upload", formData).then((res) => {
          this.$emit("upload", res.data[0].path);
        });
      }

      // if (fileList.length > 1) {
      //   fileList.splice(0, 1);
      // }
      // this.fileList = fileList;
      // this.handleUpload();

      // this.$emit("upload", file, fileList);
    },
    // 删除图片
    handleRemove(file) {
      this.$emit("remove", file);
    },
    // 上传文件之前的钩子,参数上传的文件
    beforeUpload(file, fileList) {
      const testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type);
      const isLt10M = file.size / 1024 / 1024 <= 10; // 图片大小不超过10MB
      if (!testmsg) {
        this.$message.error("上传图片格式不对!");
        return Promise.reject(new Error(false));
      }
      if (!isLt10M) {
        this.$message.error("上传图片大小不能超过 10M!");
        return Promise.reject(new Error(false));
      }
      return false;
    },
    handleUpload() {
      console.log("handleUpload", this.fileList);
      const { fileList } = this;
      const formData = new FormData();
      formData.append();
      fileList.forEach((file) => {
        console.log(file);
        formData.append("files[]", file);
        console.log(formData);
      });
      console.log(formData);
      // axios
      //   .post("/api/system/upload", {
      //     files: formData,
      //     module: "park",
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   });
      console.log(fileList);
      this.uploading = true;
    },
  },
};
</script>

<style scoped lang="less"></style>
