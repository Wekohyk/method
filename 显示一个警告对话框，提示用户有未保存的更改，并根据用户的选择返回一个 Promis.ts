export const alertUnsavedChanges = () => {
  return new Promise<void>((resolve, reject) => {
    // 弹出对话框，别的项目使用需要更换
    tw.showAlert(
      {
        title: "未保存更改",
        message: "你的更改还未保存，确定要返回吗？",
        style: 1,
        actions: [
          { title: "取消", id: 0, style: 1 },
          { title: "确定", id: 1, style: 0 },
        ],
      },
      (id: number) => {
        if (id === 1) {
          resolve();
          return;
        }
        reject();
      }
    );
  });
};
