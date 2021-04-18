import { attach, createDomain, createStore, forward, guard, restore, sample, split } from 'effector';
import { reposController } from '../../api/api';
import { alert, showAlert } from '../../utils/showAlert';

class ReposLogic {
    constructor() {
        forward({from: this.getReposFx.fail, to: this.alertFx});
    }

    label = "Enter profile name on github"; 

    domain = createDomain('forwardDomain');
    submitForm = this.domain.event<string>('submitForm');
    
    event = this.domain.event();
    
    alertFx = this.domain.effect('alertFx', {
        handler: 
            () => alert('This profile does not exist')
    });

    getReposFx = this.domain.effect('getReposFx', {
        handler: 
            async (name: string) => {
                let res = await reposController.getRepos(name);
                return res;
    }});

    // this.getReposFx.use(async (params) => {
    //     try {
    //          let res = await reposController.getRepos(name);
    //          return res;
    // });

    $store = this.domain.store(null, {name: "$store"});
    $defaultName = this.domain.store('zerobias', {name: "$defaultName"});

    // init = () => {
    //     forward({from: this.submitForm, to: this.getReposFx});
    //     forward({from: this.getReposFx.doneData.map(({data}) => data), to: this.$store});
    // };

    // init = () => {
    //     sample({
    //         clock: this.submitForm,
    //         source: createStore('IvanPeleshok'),
    //         fn: (source, clock) => clock,
    //         target: this.getReposFx
    //     });
    //     sample({
    //         clock: this.getReposFx.doneData,
    //         fn: ({data}) => data,
    //         target: this.$store
    //     });
    // //   forward({from: this.getReposFx.doneData.map(({data}) => data), to: this.$store}); // can be replaced with last sample
    // };

    // init = () => {
    //     sample(this.$defaultName, [this.submitForm, this.submitForm], (source, clock) => this.getReposFx(source));
    //     forward({from: this.getReposFx.doneData.map(({data}) => data), to: this.$store});
    // }

    // init = () => {
    //     let createRequest = attach({
    //         effect: this.getReposFx,
    //         source: this.$defaultName,
    //         mapParams: (data: {name: string}, source) => data.name // source 
    //     });
    //     createRequest({name: this.$defaultName.getState()});
    //     forward({from: createRequest.doneData.map(({data}) => data), to: this.$store});
    // };

    // init = () => {
    //     let create = attach({
    //         effect: this.getReposFx,
    //         source: this.$defaultName
    //     });
    //     create();
    //     forward({from: this.getReposFx.doneData.map(({data}) => data), to: this.$store})
    // }

    // init = () => {
    //     let event = guard({
    //         source: this.$store,
    //         filter: (s) => s.length > 10,
    //     });
    //     forward({from: this.$store, to: this.event});
    //     event.watch(() => alert('$store updated'));

    //     forward({from: this.submitForm, to: this.getReposFx});
    //     forward({from: this.getReposFx.doneData.map(({data}) => data), to: this.$store});
    // }

    init = () => {
        // let newEvent = guard({source: sample(this.$defaultName, this.submitForm), filter: (state) => state.length > 10, target: this.getReposFx});
        // let newEvent = guard({source: sample(this.$defaultName, this.submitForm), filter: (state) => state.length < 10, target: this.getReposFx});
        let newEvent = guard({source: this.submitForm, filter: (params) => params.length > 5, target: this.getReposFx});
        forward({from: newEvent.doneData.map(({data}) => data), to: this.$store});
    }   

    // showAlertFx = this.domain.effect('showAlertFx', {
    //     handler: 
    //         (params: string) => {
    //             alert('Unknown parmas: ' + params);
    //         }
    // });

    // init = () => {
    //     split({
    //         source: this.submitForm,
    //         match: {
    //             zerobias: params => params === 'zerobias',
    //         },
    //         cases: {
    //             zerobias: this.getReposFx,
    //             __: this.showAlertFx,
    //         }
    //     });
    // }
   
    // init = () => {
    //     forward({from: this.submitForm, to: this.getReposFx});
    //     const store = restore(this.getReposFx.doneData, null);
    //     forward({from: store.map((store) => store?.data), to: this.$store});
    // }

}

export default new ReposLogic();