export class Iframe {
  private iframe!: any;

  private postMessage = (action: {type: string; payload: any}) => {
    if (this.iframe) {
      this.iframe.contentWindow.postMessage(action, "*");
      return;
    }
    console.error("没有找到iframe");
  };

  find = (id: string) => {
    this.iframe = document.getElementById(id);
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
