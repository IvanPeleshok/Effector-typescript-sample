import { createApi, createDomain} from 'effector';
import { alert } from '../../utils/showAlert';

class RootLogic {
    incLabel: string = "+";
    decLabel: string = "-";
    
    domain = createDomain('counterLogic');

    inc = this.domain.event<number>('inc');
    dec = this.domain.event<number>('dec');
    reset = this.domain.event<void>('reset');


    $store = this.domain.store<number>(0, {name: "$store"})
    .on([this.inc], (store, payload) => store + payload)
    .on(this.dec, (store) => store - 1)
    .reset([this.reset]);
    
    // $store = this.domain.createStore<number>(0, {name: "$store", updateFilter: (update, current) => update > 10 ? false : true})
    // .on([this.inc], (store, payload) => store + payload)
    // .on(this.dec, (store) => store - 1)
    // .reset([this.reset]);
    

    // $store = this.domain.store<number>(0, {name: "$store"});
    // api = createApi(this.$store, {
    //     inc: (state, payload: number) => state + payload,
    //     dec: (state) => state - 1,
    //     reset: () => this.$store.defaultState
    // });
}

export default new RootLogic();