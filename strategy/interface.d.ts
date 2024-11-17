import { POST_TYPES } from "../constants";
import { valueof } from "../utils";

export declare type DTOReview = {
  isActive: boolean;
}

export declare interface DTOPost<PostAttr> {
  id: string;
  name: string;
  postType: valueof<typeof POST_TYPES>;
  attributes: PostAttr
}
