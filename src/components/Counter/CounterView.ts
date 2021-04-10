import { CounterBody } from "./components/Body";
import { CounterButton } from "./components/Button";
import { Container } from "../Common/Container/Container";
import { CounterScore } from "./components/Score";
import { CounterReset } from "./components/Reset";

class RootView {
    container = Container;
    button = CounterButton;
    score = CounterScore;
    body = CounterBody;
    reset = CounterReset;
}

export default new RootView();