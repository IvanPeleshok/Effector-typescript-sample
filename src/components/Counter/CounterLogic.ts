import { createApi, createDomain} from 'effector';
import { alert } from '../../utils/showAlert';

class RootLogic {
    incLabel: string = "+";
    decLabel: string = "-";
    
    domain = createDomain('counterDomain');

    inc = this.domain.event<number>('inc');
    dec = this.domain.event<number>('dec');
    reset = this.domain.event<void>('reset');

    // Events
        // watch
        unwatchEvent = this.inc.watch((p) => alert('inc event | payload =' + p));
        // map
        mapEvent = this.inc.map((payload) => alert('inc.map event | payload =' + payload));
        // prepend
        prependEvent = this.inc.prepend(() => {
            alert('inc prepand | payload void');
            return 0;
        });
        // filter
        filterEvent = this.inc.filter({fn: (payload) =>  this.$store.getState() + payload > 2});
        // filterMap
        filterMapEvent = this.inc.filterMap((payload) => {
            if (this.$store.getState() + payload > 5) return 'inc.filterMap event';
        });

    // Store
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

    // 
}

export default new RootLogic();