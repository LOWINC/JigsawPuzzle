export class Iframe {
  private iframe!: any;
  private iframeId!: string;

  private postMessage = (action: {type: string; payload: any}) => {
    if (!this.iframe) {
      console.error("没有找到iframe");
      return;
    }
    this.iframe.contentWindow.postMessage(action, "*");
  };

  isFind = (id: string) => id === this.iframeId;

  find = (id: string) => {
    const dom = document.getElementById(id);
    if (!dom) {
      console.error("没有找到iframe");
      return;
    }

    this.iframeId = id;
    this.iframe = dom;
  };

  postData = (payload: any) => {
    this.postMessage({
      type: "UPDATE_DATA",
      payload,
    });
  };

  postEvent = (payload: any) => {
    this.postMessage({
      type: "UPDATE_EVENT",
      payload,
    });
  };
}
