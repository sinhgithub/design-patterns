import { POST_TYPES } from "./../constants";
import { valueof } from "../utils";
import { DTOPost } from "./interface";
import Review from "./Review";


type DTOPostConstructor<PostAttr> = new (
  payload: DTOPost<PostAttr> | null
) => DTOPost<PostAttr > & {
  create(): void;
  update(): void;
  delete(ids: string): void;
  get(query: {
    [key: string]: any
  }): void;
};

class PostStrategy {
  static instance: PostStrategy;

  static getInstance() {
    if (!PostStrategy.instance) {
      PostStrategy.instance = new PostStrategy();
    }
    return PostStrategy.instance;
  }

  static postRegistry: {
    [key: valueof<typeof POST_TYPES>]: DTOPostConstructor<any>;
  } = {};

  static regis = (postType: string, classRef: DTOPostConstructor<any>) => {
    PostStrategy.postRegistry[postType] = Object.values(POST_TYPES).includes(
      postType
    )
      ? classRef
      : null;
  };

  private readonly invalidPostType = () => {
    return { error: "Invalid post type" };
  };

  public create = (
    postType: valueof<typeof POST_TYPES>,
    payload: DTOPost<any>
  ) => {
    const classRef = PostStrategy.postRegistry[postType];
    if (classRef) {
      return new classRef(payload).create();
    }
    return this.invalidPostType();
  };
  public update = (
    postType: valueof<typeof POST_TYPES>,
    payload: DTOPost<any>
  ) => {
    const classRef = PostStrategy.postRegistry[postType];
    if (classRef) {
      return new classRef(payload).update();
    }
    return this.invalidPostType();
  };
  public delete = (
    postType: valueof<typeof POST_TYPES>,
    payload: { ids: string }
  ) => {
    const classRef = PostStrategy.postRegistry[postType];
    if (classRef) {
      const { ids } = payload;
      return new classRef(null).delete(ids);
    }
  };
  public get = (postType: valueof<typeof POST_TYPES>, query: {}) => {
    const classRef = PostStrategy.postRegistry[postType];
    if (classRef) {
      return new classRef(null).get(query);
    }
    return this.invalidPostType();
  };
}

const PostsRef = {
  [POST_TYPES.review]: Review,
};

Object.keys(POST_TYPES).forEach((key) => {
  PostStrategy.regis(key, PostsRef[key]);
});

const PostService = PostStrategy.getInstance();

PostService.create(POST_TYPES.review, {
  id: "1",
  name: "Review 1",
  postType: POST_TYPES.review,
  attributes: {
    isActive: true,
  },
});

export default PostService;
