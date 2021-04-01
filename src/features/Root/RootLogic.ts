import { createDomain, createEvent } from 'effector';

class RootLogic {
    incLabel: string = "+";
    decLabel: string = "-";

    constructor() {
        this.$store.subscribe(() => console.log('state changed'));
    }

    domain = createDomain('domain');

    inc = createEvent<number>('inc');
    dec = createEvent<number>('dec');

    $store = this.domain.createStore<number>(0, {name: "rootLogic"})
    .on(this.inc, (store, payload: number) => store + payload)
    .on(this.dec, (store) => store - 1);
}

export default new RootLogic();