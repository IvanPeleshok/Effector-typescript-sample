import { createDomain } from 'effector';


class ListLogic {
    domain = createDomain('list');

    onChangeValue = this.domain.createEvent<string>();
    onPressEnter = this.domain.createEvent<string>();

    $value = this.domain.createStore("", {name: "$value"})
    .on(this.onChangeValue, (_, value) => value);

    $listValue = this.domain.createStore([], {name: "$listValue"})
    .on(this.onPressEnter, (state, payload) => {
        return [...state, payload];
    });
}

export default new ListLogic();