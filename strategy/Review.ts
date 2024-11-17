import PostCommon from "./Comon";
import { DTOPost, DTOReview } from "./interface";

class Review extends PostCommon {
  constructor(...args:  DTOPost<DTOReview>[]) {
    const data = args[0];
    super(data);
  }

  public create(){
    super.create();
  }

  public update(){
   super.update();
  }

  public delete(){
    super.delete();
  }

  public get(){
    super.get();
  }
}

export default Review;