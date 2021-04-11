import { createDomain, forward } from 'effector';


class SimpleLogic {
    domain = createDomain('forwardDomain');
    click = this.domain.createEvent<string>('click');

    $store = this.domain.createStore('forward ', {name: "$store", updateFilter: (upate,store) => {
        console.log(upate);
        console.log(store);
        return false;
    }});

    unwStore = this.$store.watch(console.log);
    unEvent = this.click.watch(console.log);

    init = () => {
        forward({from: this.click, to: this.$store});
    }
}

export default new SimpleLogic();