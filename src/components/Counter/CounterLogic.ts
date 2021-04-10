import { createDomain} from 'effector';
import { alert } from '../../utils/showAlert';

class RootLogic {
    incLabel: string = "+";
    decLabel: string = "-";
    
    // constructor() {
        // this.$store.watch(this.dec, (state, payload) => {
        //     alert(String(state));
        //     alert(String(payload));
        // });

        // this.$info.watch(() => this.$store.updates);
    // }`

    domain = createDomain('counterDomain');

    inc = this.domain.createEvent<number>('inc');
    dec = this.domain.createEvent<number>('dec');
    reset = this.domain.createEvent<void>('reset');
    // Events
        // watch
        // unwatchEvent = this.inc.watch((p) => alert('inc event | payload =' + p));

        // map
        // mapEvent = this.inc.map((payload) => alert('inc.map event | payload =' + payload));

        // prepend
        // prependEvent = this.inc.prepend((_) => 1000); // ??

        // filter
        filterEvent = this.inc.filter({fn: (payload) =>  this.$store.getState() + payload > 2});
        unwatchFilter = this.filterEvent.watch(() => {
            alert('inc.filter event');
            // this.unwatchEvent();
        });

        // filterMap
        filterMapEvent = this.inc.filterMap((payload) => {
            if (this.$store.getState() + payload > 3) return 'inc.filterMap event';
        });
        unwatchFilterMap = this.filterMapEvent.watch(() => this.unwatchFilter());

    // Store
    $store = this.domain.createStore<number>(0, {name: "$store"})
    .on([this.inc, this.inc], (store, payload) => store + payload)
    .on(this.dec, (store) => store - 1)
    .reset([this.reset, this.filterMapEvent]);

    fetchUserReposFx = this.domain.createEffect<any, any>();

    // $info = this.domain.createStore<void>(null, {name: "$info"})
    // .on(merge([this.inc, this.dec]), () => this.requset());

        // watch
        // unwatchStore = this.$store.watch((state) => alert('store update'));
        // unwathcStore = this.$store.wathc(this.inc, (state) => alert('store update'));


    // requset = () => {
    //     this.fetchUserReposFx({name: 'IvanPeleshok'});

    //     this.fetchUserReposFx.use(async (params: any) => {
    //         console.log('fetchUserReposFx called with', params);
    
    //         const url = `https://api.github.com/users/${params.name}/repos`;
    //         const req = await fetch(url);
    //         return req.json();
    //     });

    //     let unsubcribe = this.fetchUserReposFx.done.watch(() => alert('done'));
    //     let unsubcribe1 = this.fetchUserReposFx.doneData.watch(() => alert('doneData'))
    //     let unsubcribe2 = this.fetchUserReposFx.fail.watch(() => alert('fail'));
    //     let unsubcribe3 = this.fetchUserReposFx.failData.watch(() => alert('failData'));
    //     let unsubcribe4 = this.fetchUserReposFx.finally.watch(() => alert('finally'));
    //     let unsubcribe5 = this.fetchUserReposFx.pending.watch(() => alert('pending'));

    //     let unsubcribe6 = this.fetchUserReposFx.pending.watch((payload) => console.log(payload));
    //     let unsubcribe7 = this.fetchUserReposFx.finally.watch((payload) => console.log(payload));
    //     let unsubcribe8 = this.fetchUserReposFx.done.watch((payload) => console.log(payload));
    //     let unsubcribe9 = this.fetchUserReposFx.doneData.watch((payload) => console.log(payload))
    //     let unsubcribe10 = this.fetchUserReposFx.fail.watch((payload) => console.log(payload));
    //     let unsubcribe11 = this.fetchUserReposFx.failData.watch((payload) => console.log(payload));
    //     setTimeout(() => {
    //         unsubcribe();
    //         unsubcribe1();
    //         unsubcribe2();
    //         unsubcribe3();
    //         unsubcribe4();
    //         unsubcribe5();
    //         unsubcribe6();
    //         unsubcribe7();
    //         unsubcribe8();
    //         unsubcribe9();
    //         unsubcribe10();
    //         unsubcribe11();
    //     }, 5000);
    // }
}

export default new RootLogic();