import { RootBody } from "./components/Body";
import { RootButton } from "./components/Button";
import { RootContainer } from "./components/Container";
import { RootScore } from "./components/Score";

class RootView {
    container = RootContainer;
    button = RootButton;
    score = RootScore;
    body = RootBody;
}

export default new RootView();