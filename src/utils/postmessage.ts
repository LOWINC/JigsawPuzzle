export class Iframe {
  private iframe!: any;

  constructor(id: string) {
    this.find(id);
  }

  private find = (id: string) => {
    this.iframe = document.getElementById(id);
  };

  postMessage = (data: any) => {
    if (this.iframe) {
      this.iframe.contentWindow.postMessage({data}, "*");
      return;
    }
    console.error("没有找到iframe");
  };
}
