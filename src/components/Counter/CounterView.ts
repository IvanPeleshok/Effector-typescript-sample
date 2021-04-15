import { CounterBody } from "./components/Body";
import { Container } from "../Common/Container/Container";
import { CounterScore } from "./components/Score";
import { CounterReset } from "./components/Reset";
import { Button } from "../Common/Button/Button";

class RootView {
    container = Container;
    button = Button;
    score = CounterScore
    body = CounterBody;
    reset = CounterReset;
}

export default new RootView();