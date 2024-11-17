import { DTOPost } from "./interface";

class PostCommon implements DTOPost<any> {
  id: string;
  name: string;
  attributes: any;
  postType: string;

  constructor(data: DTOPost<any>) {
    Object.assign(this, data);
  }
 
  public create() {
    console.log('Review create', this);
  }

  public update() {
    console.log('PostCommon update',this);
  }

  public delete() {
    console.log('PostCommon delete',this);
  }

  public get() {
    console.log('PostCommon get',this);
  }
}

export default PostCommon;