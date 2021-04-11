import { Button } from "../Common/Button/Button";
import { Container } from "../Common/Container/Container";
import { Input } from "../Common/Input/Input";
import { Item } from "../Common/Item/Item";

class ForwardView {
    button = Button;
    container = Container;
    itemOfList = Item;
    input = Input;
}

export default new ForwardView();